import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
      include: { addresses: { where: { isDefault: true } } },
    });

    if (!user) {
      // Determine role based on email or default to CUSTOMER
      const role = email.includes('admin') ? 'ADMIN' : 'CUSTOMER';
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          role,
        },
        include: { addresses: { where: { isDefault: true } } },
      });
    }

    const defaultAddress = user.addresses?.[0] || null;

    return NextResponse.json({
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
    console.error('Google auth error', e);
    return NextResponse.json({ error: e.message || 'Authentication failed' }, { status: 500 });
  }
}
