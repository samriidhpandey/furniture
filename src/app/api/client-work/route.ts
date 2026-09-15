import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Initial curated client site works in Jodhpur
const initialCuratedProjects = [
  {
    title: 'The Umaid Heritage Royal Villa Curation',
    clientName: 'Maharaja Gaj Singhji Estate Circle / Rathore Residence',
    location: 'Umaid Heritage, Jodhpur',
    city: 'Jodhpur',
    roomType: 'Grand Living Sanctuary & Royal Foyer',
    scope: 'Custom 14-seater Solarium Carrara table with hand-carved Jodhpur sandstone & cast bronze pedestals, dual Augustus Grande Chesterfields in cognac Tuscan leather, bespoke fluted teakwood wall paneling.',
    artisanSupervisor: 'Maestro Lorenzo Moretti & Master Artisan Om Prakash Suthar',
    completionDate: 'February 2026',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
    ]),
    featured: true, // Pinned Masterwork
    clientReview: 'The on-site 3D laser calibration and marble trunk consultation in our courtyard allowed every piece to blend flawlessly with the Marwar architecture. World-class execution.',
  },
  {
    title: 'Ratanada Heritage Bungalow Fitment',
    clientName: 'Dr. Digvijay & Meenakshi Bhati',
    location: 'Circuit House Road, Ratanada, Jodhpur',
    city: 'Jodhpur',
    roomType: 'Bespoke Dining Sanctuary & Veranda Lounge',
    scope: 'Book-matched Italian Calacatta marble dining centerpiece with beveled chamfer edges, 10 ergonomic sculpted high-back dining armchairs in olive bouclé, solid Sheesham credenza.',
    artisanSupervisor: 'Senior Master Artisan Devendra Sharma',
    completionDate: 'January 2026',
    beforeImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    ]),
    featured: true, // Pinned Masterwork
    clientReview: 'Our private in-home visit with the physical stone trunk sealed the decision. Evaluating Carrara marble under Jodhpur’s golden hour sun was an extraordinary experience.',
  },
  {
    title: 'Shastri Nagar Private Residence Suite',
    clientName: 'Surendra Singh Mertia, Industrialist',
    location: 'Shastri Nagar, Jodhpur',
    city: 'Jodhpur',
    roomType: 'Executive Study & Master Suite',
    scope: 'Kyoto-finished solid walnut executive desk with concealed brass charging channels, floating platform bed in Belgian flax linen with integrated warm LED floor glow.',
    artisanSupervisor: 'Master Joiner K. V. Suthar',
    completionDate: 'March 2026',
    beforeImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1000&q=80',
    ]),
    featured: false,
    clientReview: 'The mortise-and-tenon craftsmanship and 1mm laser floor alignment make this private suite an absolute sanctuary.',
  },
  {
    title: 'Sardarpura Penthouse Living Gallery',
    clientName: 'Advocate Aniruddh Kalla',
    location: 'Sardarpura 9th C Road, Jodhpur',
    city: 'Jodhpur',
    roomType: 'Modern Penthouse Living Gallery',
    scope: 'Curved sculptural modular sofa in woven ivory chenille, titanium brushed nesting tables, hand-woven wool-silk floor rug, custom acoustic entryway panels.',
    artisanSupervisor: 'Senior Atelier Lead Tarun Verma',
    completionDate: 'April 2026',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
    ]),
    featured: false,
    clientReview: 'The installation crew treated our residence with absolute reverence. Protected our heritage flooring and leveled every piece to perfection.',
  },
];

export async function GET() {
  try {
    let projects = await (prisma as any).clientProject.findMany({
      orderBy: [
        { featured: 'desc' }, // Pinned / Featured projects always appear on TOP
        { createdAt: 'desc' },
      ],
    });

    // Auto-seed if database table is currently empty
    if (projects.length === 0) {
      for (const proj of initialCuratedProjects) {
        await (prisma as any).clientProject.create({ data: proj });
      }
      projects = await (prisma as any).clientProject.findMany({
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' },
        ],
      });
    }

    return NextResponse.json({ projects, success: true });
  } catch (error: any) {
    console.error('Error fetching client projects:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch client projects', projects: initialCuratedProjects },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      clientName,
      location,
      city,
      roomType,
      scope,
      artisanSupervisor,
      completionDate,
      beforeImage,
      images,
      featured,
      clientReview,
    } = body;

    if (!title || !clientName) {
      return NextResponse.json(
        { error: 'Title and client name are mandatory fields.' },
        { status: 400 }
      );
    }

    const imagesArray = Array.isArray(images)
      ? JSON.stringify(images)
      : typeof images === 'string' && images.startsWith('[')
      ? images
      : JSON.stringify([
          images ||
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        ]);

    const newProject = await (prisma as any).clientProject.create({
      data: {
        title,
        clientName,
        location: location || `${city || 'Jodhpur'}, Rajasthan`,
        city: city || 'Jodhpur',
        roomType: roomType || 'Living Room Sanctuary',
        scope: scope || 'Bespoke in-home spatial curation and custom installation.',
        artisanSupervisor: artisanSupervisor || 'Senior Master Artisan A1 (Jodhpur)',
        completionDate: completionDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        beforeImage: beforeImage || null,
        images: imagesArray,
        featured: Boolean(featured),
        clientReview: clientReview || null,
      },
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating client project:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to record client installation' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, featured } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const updated = await (prisma as any).clientProject.update({
      where: { id },
      data: {
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    console.error('Error updating client project:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update client project' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await (prisma as any).clientProject.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting client project:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete client project' },
      { status: 500 }
    );
  }
}
