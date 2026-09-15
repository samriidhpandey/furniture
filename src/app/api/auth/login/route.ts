import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone number is required to sign in.' },
        { status: 400 }
      );
    }

    let user = null;
    if (email) {
      user = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() },
        include: { addresses: { where: { isDefault: true } } },
      });
    } else if (phone) {
      user = await prisma.user.findUnique({
        where: { phone: phone.trim() },
        include: { addresses: { where: { isDefault: true } } },
      });
    }

    if (!user) {
      // Create new user account
      const cleanEmail = email ? email.trim().toLowerCase() : null;
      const cleanPhone = phone ? phone.trim() : null;
      const userName = name && name.trim() ? name.trim() : cleanEmail ? cleanEmail.split('@')[0] : 'Valued Patron';

      user = await prisma.user.create({
        data: {
          name: userName,
          email: cleanEmail,
          phone: cleanPhone,
          role: 'CUSTOMER',
        },
        include: { addresses: { where: { isDefault: true } } },
      });
    } else if (name && name.trim() && user.name !== name.trim()) {
      // Update name if provided and changed
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name: name.trim() },
        include: { addresses: { where: { isDefault: true } } },
      });
    }

    const defaultAddress = user.addresses?.[0] || null;

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        defaultAddress,
      },
    });
  } catch (e: any) {
    console.error('User auth error:', e);
    return NextResponse.json(
      { error: e.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
