import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { adminId, password } = await req.json();

    if (!adminId || !password) {
      return NextResponse.json(
        { error: 'Both Admin ID and Password are required.' },
        { status: 400 }
      );
    }

    const cleanId = String(adminId).trim().toLowerCase();
    const cleanPass = String(password).trim();

    // Valid Admin ID & Password matching
    const isValidAdmin =
      (cleanId === 'admin' || cleanId === 'admin@a1furniture.com' || cleanId === 'director@a1furniture.com') &&
      (cleanPass === 'admin123' || cleanPass === 'a1luxury2026' || cleanPass === process.env.ADMIN_PASSWORD);

    if (!isValidAdmin) {
      return NextResponse.json(
        { error: 'Invalid Admin ID or Password. Access denied.' },
        { status: 401 }
      );
    }

    // Find or create the Admin user in Prisma
    let adminUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: 'admin@a1furniture.com' },
          { role: 'ADMIN' },
        ],
      },
    });

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          name: 'Aarya Merchant (Atelier Director)',
          email: 'admin@a1furniture.com',
          phone: '+91 99300 54321',
          role: 'ADMIN',
        },
      });
    } else if (adminUser.role !== 'ADMIN') {
      adminUser = await prisma.user.update({
        where: { id: adminUser.id },
        data: { role: 'ADMIN' },
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        name: adminUser.name || 'Atelier Director',
        email: adminUser.email || 'admin@a1furniture.com',
        phone: adminUser.phone || '',
        role: 'ADMIN',
      },
    });
  } catch (error: any) {
    console.error('Admin authentication error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error during admin authentication' },
      { status: 500 }
    );
  }
}
