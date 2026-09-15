const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding A1 Luxury Furniture Database ---');

  // Clean existing
  await prisma.webhookEvent.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Users
  const vipCustomer = await prisma.user.create({
    data: {
      name: 'Vikramaditya Singhania',
      email: 'vikram.singhania@heritage.in',
      phone: '+91 98200 12345',
      role: 'CUSTOMER',
      addresses: {
        create: {
          fullName: 'Vikramaditya Singhania',
          phone: '+91 98200 12345',
          line1: 'Villa 7, The Oberoi Enclave, Altamount Road',
          line2: 'Near Cumballa Hill Hospital',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400026',
          country: 'India',
          isDefault: true,
        },
      },
    },
    include: { addresses: true },
  });

  const storeAdmin = await prisma.user.create({
    data: {
      name: 'Aarya Merchant',
      email: 'admin@a1furniture.com',
      phone: '+91 99300 54321',
      role: 'ADMIN',
    },
  });

  console.log(`Created Users: ${vipCustomer.name} (VIP) and ${storeAdmin.name} (Admin)`);

  // 2. Seed Luxury Products with rich variants
  const products = [
    {
      slug: 'augustus-grande-chesterfield-sofa',
      name: 'The Augustus Grande Chesterfield',
      tagline: 'Hand-tufted heirloom sofa in full-grain Italian leather',
      description: 'Handcrafted by master artisans in Bologna, the Augustus Grande is an icon of timeless majesty. Deep diamond button tufting, antiqued brass studs hand-hammered along sweeping rolled arms, and an eight-way hand-tied spring foundation engineered for generations of sovereign comfort.',
      category: 'Living',
      dimensions: 'W: 245cm | D: 105cm | H: 85cm | Seat Depth: 62cm | Weight: 98kg',
      warranty: '15 Years Master Artisan Structural Warranty',
      careInstructions: 'Nourish quarterly with beeswax leather balm. Vacuum crevices gently with a horsehair brush attachment.',
      featured: true,
      basePrice: 285000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
      ]),
      variants: [
        {
          sku: 'AUG-SOF-CGN-LTH',
          colorName: 'Cognac Saddle',
          colorHex: '#8B4513',
          material: 'Top-Grain Tuscan Leather',
          priceOverride: 285000,
          stock: 4,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
        },
        {
          sku: 'AUG-SOF-OBS-VEL',
          colorName: 'Obsidian Velvet',
          colorHex: '#1E1E22',
          material: 'Genoese Silk-Cotton Velvet',
          priceOverride: 265000,
          stock: 2,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        },
        {
          sku: 'AUG-SOF-IVR-BOU',
          colorName: 'Alabaster Bouclé',
          colorHex: '#EAE6DF',
          material: 'Heavyweight Alpine Wool Bouclé',
          priceOverride: 295000,
          stock: 1,
          image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
        },
      ],
      reviews: [
        {
          authorName: 'Rohan Mehra, Architect',
          rating: 5,
          comment: 'The depth of the hand-tufting and the aromatic Italian leather are truly exceptional. Delivered with white-glove assembly in South Mumbai without a scratch.',
          verifiedPurchase: true,
          status: 'APPROVED',
        },
        {
          authorName: 'Gayatri Devi',
          rating: 5,
          comment: 'The centerpiece of our drawing room. Impeccable weight and proportion.',
          verifiedPurchase: true,
          status: 'APPROVED',
        },
      ],
    },
    {
      slug: 'solarium-carrara-marble-dining-table',
      name: 'The Solarium Carrara Dining Table',
      tagline: 'Book-matched Tuscan marble resting on sculptural brushed bronze',
      description: 'Each Solarium slab is extracted from the storied quarries of Carrara, Italy. Hand-finished with a feather-soft honed patina and supported by monolithic cast-brass pillars with hand-chiseled fluting.',
      category: 'Dining',
      dimensions: 'L: 280cm | W: 115cm | H: 76cm | Tabletop Thickness: 45mm | Weight: 240kg',
      warranty: 'Lifetime Marble Integrity & Structural Guarantee',
      careInstructions: 'Seal annually with breathable fluoropolymer sealer. Wipe spills promptly with pH-neutral stone wash.',
      featured: true,
      basePrice: 395000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1600&q=80',
      ]),
      variants: [
        {
          sku: 'SOL-DIN-CAR-BRZ',
          colorName: 'Statuario White & Bronze',
          colorHex: '#F0EEE9',
          material: 'Carrara Marble & Brushed Cast Bronze',
          priceOverride: 395000,
          stock: 3,
          image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&q=80',
        },
        {
          sku: 'SOL-DIN-NER-GLD',
          colorName: 'Nero Marquina & Burnished Gold',
          colorHex: '#1F1F1F',
          material: 'Spanish Black Marble & Gold Leaf Accents',
          priceOverride: 430000,
          stock: 2,
          image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1600&q=80',
        },
      ],
      reviews: [
        {
          authorName: 'Sanjay Kapur',
          rating: 5,
          comment: 'We host dinners for 10 people comfortably. The book-matching on the marble veins is mesmerizing.',
          verifiedPurchase: true,
          status: 'APPROVED',
        },
      ],
    },
    {
      slug: 'elysee-swivel-armchair',
      name: 'The Élysée Sculptural Lounge Chair',
      tagline: 'Curvilinear cocoon in textured bouclé on a concealed 360° pivot',
      description: 'An architectural silhouette designed to catch light from every angle. Built around a precision steel skeleton wrapped in molded high-density memory foam, creating fluid ergonomic grace.',
      category: 'Living',
      dimensions: 'W: 94cm | D: 90cm | H: 78cm | Seat Height: 44cm | Weight: 34kg',
      warranty: '10 Years Mechanical Swivel & Frame Warranty',
      careInstructions: 'Spot clean bouclé with organic dry foam shampoo.',
      featured: true,
      basePrice: 125000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1580481077195-c3f25e406385?auto=format&fit=crop&w=1600&q=80',
      ]),
      variants: [
        {
          sku: 'ELY-CHR-IVR-BOU',
          colorName: 'Ivory Bouclé',
          colorHex: '#EFEAE1',
          material: 'Belgian Bouclé & Smoked Oak Base',
          priceOverride: 125000,
          stock: 5,
          image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80',
        },
        {
          sku: 'ELY-CHR-TER-VEL',
          colorName: 'Terracotta Rust',
          colorHex: '#9E4733',
          material: 'Mohair Velvet & Brushed Brass',
          priceOverride: 135000,
          stock: 3,
          image: 'https://images.unsplash.com/photo-1580481077195-c3f25e406385?auto=format&fit=crop&w=1600&q=80',
        },
        {
          sku: 'ELY-CHR-EMR-VEL',
          colorName: 'Forest Emerald',
          colorHex: '#1B3B2B',
          material: 'Silk-Blend Velvet & Bronze Base',
          priceOverride: 138000,
          stock: 1,
          image: 'https://images.unsplash.com/photo-1580481077195-c3f25e406385?auto=format&fit=crop&w=1600&q=80',
        },
      ],
      reviews: [
        {
          authorName: 'Priyamvada Rao',
          rating: 5,
          comment: 'The 360 swivel is completely silent and buttery smooth. It is my favorite reading nook.',
          verifiedPurchase: true,
          status: 'APPROVED',
        },
      ],
    },
    {
      slug: 'aurelia-king-platform-bed',
      name: 'The Aurelia Sanctuary Platform Bed',
      tagline: 'Floating Japanese cedar silhouette with padded linen headboard',
      description: 'Crafted with mortise-and-tenon joinery requiring zero visible fasteners. The Aurelia integrates softly recessed ambient LED channel routing and an inclined ergonomic headboard upholstered in natural Belgian flax linen.',
      category: 'Bedroom',
      dimensions: 'L: 228cm | W: 204cm | Headboard H: 110cm | Platform H: 26cm | Weight: 115kg',
      warranty: '20 Years Solid Hardwood Structural Guarantee',
      careInstructions: 'Dust with soft lint-free cloth. Condition wood annually with organic citrus wax.',
      featured: true,
      basePrice: 245000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1600&q=80',
      ]),
      variants: [
        {
          sku: 'AUR-BED-NAT-LIN',
          colorName: 'Natural Flax & Smoked Cedar',
          colorHex: '#D3C8B4',
          material: 'Belgian Linen & Japanese Cedar',
          priceOverride: 245000,
          stock: 3,
          image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
        },
        {
          sku: 'AUR-BED-CHA-OAK',
          colorName: 'Charcoal Linen & Blackened Oak',
          colorHex: '#2B2B2D',
          material: 'Charcoal Flax & Rift-Cut White Oak',
          priceOverride: 260000,
          stock: 2,
          image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1600&q=80',
        },
      ],
      reviews: [
        {
          authorName: 'Dr. Kabir Sen',
          rating: 5,
          comment: 'The solid wood joinery is museum grade. No squeaks, rock solid, and breathtaking craftsmanship.',
          verifiedPurchase: true,
          status: 'APPROVED',
        },
      ],
    },
    {
      slug: 'monolith-executive-writing-desk',
      name: 'The Monolith Executive Writing Desk',
      tagline: 'Quarter-sawn American Walnut with wireless hideaway charging ports',
      description: 'An executive centerpiece carved from sustainable old-growth American Black Walnut. Features discreet soft-close drawers lined in burgundy calfskin, integrated cable conduit chambers, and hand-patinated solid bronze handles.',
      category: 'Executive',
      dimensions: 'W: 195cm | D: 85cm | H: 76cm | Knee Clearance: 68cm | Weight: 92kg',
      warranty: '10 Years Joinery & Hardware Warranty',
      careInstructions: 'Avoid direct prolonged sunlight. Clean with pure walnut oil cleaner.',
      featured: true,
      basePrice: 210000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
      ]),
      variants: [
        {
          sku: 'MON-DSK-WAL-BRZ',
          colorName: 'Rich Walnut & Warm Bronze',
          colorHex: '#5C3A21',
          material: 'American Walnut & Hand-Patinated Bronze',
          priceOverride: 210000,
          stock: 4,
          image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80',
        },
        {
          sku: 'MON-DSK-EBO-CHR',
          colorName: 'Ebony Stained & Brushed Chrome',
          colorHex: '#1A1816',
          material: 'Smoked Ash & Solid Chrome Hardware',
          priceOverride: 225000,
          stock: 1,
          image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
        },
      ],
      reviews: [
        {
          authorName: 'Aman Singhal, VC Partner',
          rating: 5,
          comment: 'The calfskin drawer liners and secret cable compartments keep my workspace completely pristine. Truly worth every rupee.',
          verifiedPurchase: true,
          status: 'APPROVED',
        },
      ],
    },
    {
      slug: 'seraphina-fluted-credenza-sideboard',
      name: 'The Seraphina Fluted Credenza',
      tagline: 'Architectural tambour doors with polished Calacatta Viola marble crown',
      description: 'A grand statement storage console featuring rhythmically fluted tambour sliding doors that conceal adjustable shelves and twin velvet-lined silverware trays. Topped with a rare violet-veined Calacatta Viola marble slab.',
      category: 'Dining',
      dimensions: 'W: 210cm | D: 50cm | H: 82cm | Weight: 130kg',
      warranty: '10 Years Structural Warranty',
      careInstructions: 'Wipe marble with damp cloth; polish tambour wood with microfibre cloth.',
      featured: false,
      basePrice: 320000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80',
      ]),
      variants: [
        {
          sku: 'SER-CRD-CAL-OAK',
          colorName: 'Calacatta Viola & White Oak',
          colorHex: '#D8CFBC',
          material: 'Natural White Oak & Calacatta Viola Marble',
          priceOverride: 320000,
          stock: 2,
          image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80',
        },
      ],
      reviews: [],
    },
  ];

  for (const item of products) {
    const { variants, reviews, ...prodData } = item;
    const createdProduct = await prisma.product.create({
      data: {
        ...prodData,
        variants: {
          create: variants,
        },
        reviews: {
          create: reviews,
        },
      },
    });
    console.log(`Created product: ${createdProduct.name} (${variants.length} variants)`);
  }

  // 3. Seed Promotional Coupons (§13-A)
  const now = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(now.getFullYear() + 1);

  await prisma.coupon.createMany({
    data: [
      {
        code: 'LUXURY10',
        discountType: 'PERCENT',
        value: 10,
        minOrderValue: 50000,
        maxDiscount: 40000,
        validFrom: now,
        validTo: nextYear,
        usageLimit: 500,
        timesUsed: 12,
        isActive: true,
      },
      {
        code: 'ROYAL5000',
        discountType: 'FLAT',
        value: 5000,
        minOrderValue: 100000,
        maxDiscount: 5000,
        validFrom: now,
        validTo: nextYear,
        usageLimit: 200,
        timesUsed: 7,
        isActive: true,
      },
      {
        code: 'ARCHITECTVIP',
        discountType: 'PERCENT',
        value: 15,
        minOrderValue: 200000,
        maxDiscount: 75000,
        validFrom: now,
        validTo: nextYear,
        usageLimit: 50,
        timesUsed: 3,
        isActive: true,
      },
    ],
  });
  console.log('Seeded promotional coupons: LUXURY10, ROYAL5000, ARCHITECTVIP');

  // 4. Seed Existing Order for VIP user to test Tracking, Invoicing, and Address reuse (§9-A, §21-B, §21-C)
  const firstProduct = await prisma.product.findFirst({
    include: { variants: true },
  });

  if (firstProduct && firstProduct.variants.length > 0) {
    const variant = firstProduct.variants[0];
    const subtotal = variant.priceOverride || firstProduct.basePrice;
    const discount = 28500; // 10%
    const taxable = subtotal - discount;
    const cgst = taxable * 0.09;
    const sgst = taxable * 0.09;
    const totalAmount = taxable + cgst + sgst;

    const sampleOrder = await prisma.order.create({
      data: {
        orderNumber: 'A1-2026-89412',
        userId: vipCustomer.id,
        status: 'PROCESSING',
        subtotal: subtotal,
        discount: discount,
        gstRate: 0.18,
        cgst: cgst,
        sgst: sgst,
        igst: 0,
        totalAmount: totalAmount,
        razorpayOrderId: 'order_test_994821a',
        razorpayPaymentId: 'pay_test_884920412',
        razorpaySignature: 'sig_mock_verified_89412',
        trackingNumber: 'BLUEDART-APEX-948102',
        courierName: 'BlueDart Apex White-Glove Logistics',
        shippingAddress: JSON.stringify({
          fullName: 'Vikramaditya Singhania',
          phone: '+91 98200 12345',
          line1: 'Villa 7, The Oberoi Enclave, Altamount Road',
          line2: 'Near Cumballa Hill Hospital',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400026',
          country: 'India',
        }),
        buyerGstin: '27AABCU9603R1ZM',
        items: {
          create: {
            productId: firstProduct.id,
            variantId: variant.id,
            productName: firstProduct.name,
            variantSummary: `${variant.colorName} • ${variant.material}`,
            quantity: 1,
            unitPrice: subtotal,
            totalPrice: subtotal,
          },
        },
      },
    });

    console.log(`Created sample Order: ${sampleOrder.orderNumber} (Status: ${sampleOrder.status})`);
  }

  console.log('--- Seeding completed successfully! ---');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
