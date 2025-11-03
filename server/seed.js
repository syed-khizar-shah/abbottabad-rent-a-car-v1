const path = require('path');
const fs = require('fs');
// Try .env.local first (Next.js convention), then .env
const envLocalPath = path.resolve(__dirname, '../.env.local');
const envPath = path.resolve(__dirname, '../.env');
const envFile = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
require('dotenv').config({ path: envFile });
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Category = require('./models/Category');
const Car = require('./models/Car');
const HomepageContent = require('./models/HomepageContent');
const TourRoutesContent = require('./models/TourRoutesContent');
const AboutContent = require('./models/AboutContent');

// Debug: Check if env vars are loaded
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set. Please check your .env file in the root directory.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear existing data
    await Admin.deleteMany({});
    await Category.deleteMany({});
    await Car.deleteMany({});
    await HomepageContent.deleteMany({});
    await TourRoutesContent.deleteMany({});
    await AboutContent.deleteMany({});

    console.log('📦 Seeding database...');

    // Seed Admin
    const admin = await Admin.create({
      email: 'admin@abbottabadrentacar.com',
      password: 'admin123' // Not hashed as requested
    });
    console.log('✅ Admin created:', admin.email);

    // Seed Categories
    const categories = await Category.create([
      {
        name: 'Economy',
        slug: 'economy',
        description: 'Perfect for budget-conscious travelers',
        icon: 'Car',
        features: ['Fuel Efficient', 'Easy to Drive', 'Affordable Rates'],
        priceFrom: 70,
        image: '/economy-car-compact.jpg',
        order: 1
      },
      {
        name: 'Middle Class',
        slug: 'middle-class',
        description: 'Comfort meets affordability',
        icon: 'Users',
        features: ['Spacious Interior', 'Modern Features', 'Great Value'],
        priceFrom: 90,
        image: '/sedan-car-comfortable.jpg',
        order: 2
      },
      {
        name: 'Premium',
        slug: 'premium',
        description: 'Luxury and performance combined',
        icon: 'Award',
        features: ['Premium Interior', 'Advanced Tech', 'Superior Comfort'],
        priceFrom: 120,
        image: '/luxury-sedan-premium.jpg',
        order: 3
      },
      {
        name: 'SUV',
        slug: 'suv',
        description: 'Adventure-ready vehicles',
        icon: 'Gauge',
        features: ['All-Terrain', 'Spacious', 'Family Friendly'],
        priceFrom: 150,
        image: '/suv-adventure-vehicle.jpg',
        order: 4
      }
    ]);
    console.log('✅ Categories created:', categories.length);

    // Seed Cars
    const economyCategory = categories.find(c => c.slug === 'economy');
    const middleCategory = categories.find(c => c.slug === 'middle-class');
    const premiumCategory = categories.find(c => c.slug === 'premium');
    const suvCategory = categories.find(c => c.slug === 'suv');

    const cars = await Car.create([
      {
        name: 'Hyundai Elantra',
        slug: 'hyundai-elantra',
        category: middleCategory._id,
        categoryName: 'Middle Class',
        price: 110,
        pricing: {
          '1-3': 120,
          '4-9': 110,
          '10-25': 100,
          '26+': 90
        },
        image: '/silver-hyundai-elantra-2022.jpg',
        specs: {
          passengers: 5,
          transmission: 'AT',
          fuel: '8 L / 100 km',
          engine: '1.6 L 128 hp',
          drive: 'Front',
          year: 2022,
          seats: 5
        },
        features: ['Bluetooth', 'USB Charging', 'Air Conditioning'],
        rating: 4.8,
        reviews: 4,
        isFeatured: true
      },
      {
        name: 'Toyota Corolla',
        slug: 'toyota-corolla',
        category: economyCategory._id,
        categoryName: 'Economy',
        price: 90,
        pricing: {
          '1-3': 100,
          '4-9': 90,
          '10-25': 80,
          '26+': 70
        },
        image: '/white-toyota-corolla-2023.jpg',
        specs: {
          passengers: 5,
          transmission: 'AT',
          fuel: '7 L / 100 km',
          engine: '1.8 L 140 hp',
          drive: 'Front',
          year: 2023,
          seats: 5
        },
        features: ['Fuel Efficient', 'Reliable', 'Comfortable'],
        rating: 4.9,
        reviews: 12,
        isFeatured: true
      },
      {
        name: 'Honda Civic',
        slug: 'honda-civic',
        category: premiumCategory._id,
        categoryName: 'Premium',
        price: 130,
        pricing: {
          '1-3': 150,
          '4-9': 140,
          '10-25': 130,
          '26+': 120
        },
        image: '/black-honda-civic-2023.jpg',
        specs: {
          passengers: 5,
          transmission: 'CVT',
          fuel: '7.5 L / 100 km',
          engine: '1.5 L Turbo 180 hp',
          drive: 'Front',
          year: 2023,
          seats: 5
        },
        features: ['Turbo Engine', 'Premium Audio', 'Sport Mode'],
        rating: 5.0,
        reviews: 8,
        isFeatured: true
      },
      {
        name: 'Rolls-Royce Phantom',
        slug: 'rolls-royce-phantom',
        category: premiumCategory._id,
        categoryName: 'Premium',
        price: 1500,
        pricing: {
          '1-3': 1500,
          '4-9': 1450,
          '10-25': 1400,
          '26+': 1350
        },
        image: '/black-rolls-royce-phantom-luxury-car.jpg',
        specs: {
          passengers: 5,
          transmission: 'Automatic',
          fuel: 'Premium',
          power: '563 HP',
          engine: '6.75L V12',
          drive: 'RWD',
          year: 2023,
          seats: 5
        },
        features: [
          'Chauffeur Service Available',
          'Starlight Headliner',
          'Bespoke Audio System',
          'Rear Executive Seating',
          'Champagne Cooler'
        ],
        rating: 5.0,
        reviews: 28
      },
      {
        name: 'Bentley Continental GT',
        slug: 'bentley-continental-gt',
        category: premiumCategory._id,
        categoryName: 'Premium',
        price: 1200,
        pricing: {
          '1-3': 1200,
          '4-9': 1150,
          '10-25': 1100,
          '26+': 1050
        },
        image: '/white-bentley-continental-gt-luxury-sports-car.jpg',
        specs: {
          passengers: 4,
          transmission: 'Automatic',
          fuel: 'Premium',
          power: '626 HP',
          engine: '6.0L W12',
          drive: 'AWD',
          year: 2023,
          seats: 4
        },
        features: ['W12 Engine', 'Rotating Display', 'Diamond Quilted Leather', 'Sport Mode', 'Naim Audio'],
        rating: 5.0,
        reviews: 34
      },
      {
        name: 'Mercedes-Benz S-Class',
        slug: 'mercedes-benz-s-class',
        category: premiumCategory._id,
        categoryName: 'Premium',
        price: 800,
        pricing: {
          '1-3': 800,
          '4-9': 750,
          '10-25': 700,
          '26+': 650
        },
        image: '/silver-mercedes-s-class-luxury-sedan.jpg',
        specs: {
          passengers: 5,
          transmission: 'Automatic',
          fuel: 'Premium',
          power: '429 HP',
          engine: '3.0L V6 Turbo',
          drive: 'RWD',
          year: 2023,
          seats: 5
        },
        features: ['MBUX Infotainment', 'Executive Rear Seats', 'Air Suspension', 'Burmester Sound', 'Ambient Lighting'],
        rating: 4.9,
        reviews: 52
      },
      {
        name: 'BMW 7 Series',
        slug: 'bmw-7-series',
        category: premiumCategory._id,
        categoryName: 'Premium',
        price: 750,
        pricing: {
          '1-3': 750,
          '4-9': 700,
          '10-25': 650,
          '26+': 600
        },
        image: '/black-bmw-7-series-luxury-sedan.jpg',
        specs: {
          passengers: 5,
          transmission: 'Automatic',
          fuel: 'Premium',
          power: '523 HP',
          engine: '4.4L V8 Turbo',
          drive: 'AWD',
          year: 2023,
          seats: 5
        },
        features: [
          'Executive Lounge Seating',
          'Gesture Control',
          'Laser Headlights',
          'Sky Lounge Panoramic Roof',
          'Bowers & Wilkins Audio'
        ],
        rating: 4.9,
        reviews: 41
      },
      {
        name: 'Porsche 911 Turbo S',
        slug: 'porsche-911-turbo-s',
        category: premiumCategory._id,
        categoryName: 'Premium',
        price: 1100,
        pricing: {
          '1-3': 1100,
          '4-9': 1050,
          '10-25': 1000,
          '26+': 950
        },
        image: '/red-porsche-911-turbo-sports-car.jpg',
        specs: {
          passengers: 4,
          transmission: 'PDK',
          fuel: 'Premium',
          power: '640 HP',
          engine: '3.8L Twin Turbo',
          drive: 'AWD',
          year: 2023,
          seats: 4
        },
        features: ['Sport Chrono Package', 'Active Suspension', 'Carbon Ceramic Brakes', 'Sport Exhaust', 'Launch Control'],
        rating: 5.0,
        reviews: 19
      },
      {
        name: 'Range Rover Autobiography',
        slug: 'range-rover-autobiography',
        category: suvCategory._id,
        categoryName: 'SUV',
        price: 950,
        pricing: {
          '1-3': 950,
          '4-9': 900,
          '10-25': 850,
          '26+': 800
        },
        image: '/white-range-rover-autobiography-suv.jpg',
        specs: {
          passengers: 7,
          transmission: 'Automatic',
          fuel: 'Premium',
          power: '518 HP',
          engine: '5.0L V8 Supercharged',
          drive: 'AWD',
          year: 2023,
          seats: 7
        },
        features: [
          'Terrain Response 2',
          'Executive Class Seating',
          'Meridian Signature Sound',
          'Air Suspension',
          'Panoramic Roof'
        ],
        rating: 4.9,
        reviews: 38
      },
      {
        name: 'Mercedes-Benz GLS Maybach',
        slug: 'mercedes-benz-gls-maybach',
        category: suvCategory._id,
        categoryName: 'SUV',
        price: 1300,
        pricing: {
          '1-3': 1300,
          '4-9': 1250,
          '10-25': 1200,
          '26+': 1150
        },
        image: '/black-mercedes-gls-maybach-luxury-suv.jpg',
        specs: {
          passengers: 7,
          transmission: 'Automatic',
          fuel: 'Premium',
          power: '550 HP',
          engine: '4.0L V8 Biturbo',
          drive: 'AWD',
          year: 2023,
          seats: 7
        },
        features: [
          'Maybach Executive Seats',
          'MBUX Rear Tablet',
          'Burmester 4D Sound',
          'Active Multicontour Seats',
          'Refrigerator'
        ],
        rating: 5.0,
        reviews: 15
      }
    ]);
    console.log('✅ Cars created:', cars.length);

    // Seed Homepage Content
    const homepageContent = await HomepageContent.create({
      heroTitle: 'Excellence in Every',
      heroTitleAccent: 'Mile',
      heroSubtitle: 'Experience the pinnacle of luxury automotive rentals. Hand-selected premium vehicles, impeccable service, and unforgettable journeys await.',
      heroBadge: 'Abbottabad\'s Premier Luxury Car Rental',
      heroImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop',
      heroPrimaryCTA: 'Explore Premium Fleet',
      heroSecondaryCTA: 'Schedule Consultation',
      stats: [
        { value: '5,000+', label: 'Happy Customers', icon: 'Users' },
        { value: '50+', label: 'Premium Vehicles', icon: 'Car' },
        { value: '15+', label: 'Years Experience', icon: 'Award' },
        { value: '4.9/5', label: 'Average Rating', icon: 'Star' }
      ],
      categoriesSectionTitle: 'Choose Your Class',
      categoriesSectionSubtitle: 'From economical to premium, discover the perfect vehicle category tailored to your journey and preferences',
      categoriesSectionBadge: 'Our Vehicle Categories',
      offersSectionTitle: 'Special Promotions',
      offersSectionSubtitle: 'Limited-time offers designed to enhance your rental experience',
      offersSectionBadge: 'Exclusive Offers',
      offers: [
        {
          title: 'Weekend Special',
          description: 'Get 20% off on all weekend rentals',
          discount: '20% OFF',
          icon: 'Gift',
          color: 'bg-blue-500'
        },
        {
          title: 'Long Term Rental',
          description: 'Rent for 26+ days and save big',
          discount: 'Up to 30% OFF',
          icon: 'TrendingUp',
          color: 'bg-green-500'
        },
        {
          title: 'Wedding Package',
          description: 'Special rates for wedding events',
          discount: 'Custom Pricing',
          icon: 'Sparkles',
          color: 'bg-purple-500'
        },
        {
          title: 'Corporate Deals',
          description: 'Exclusive rates for businesses',
          discount: 'Volume Discounts',
          icon: 'Tag',
          color: 'bg-orange-500'
        }
      ],
      brandsSectionTitle: 'Trusted Brands in Our Premium Fleet',
      brandsSectionSubtitle: 'Premium automotive brands trusted by thousands',
      brands: ['Toyota', 'Honda', 'Hyundai', 'Suzuki', 'KIA', 'Nissan'],
      featuredSectionTitle: 'Featured Vehicles',
      featuredSectionSubtitle: 'Curated selection of premium vehicles offering the perfect fusion of luxury, performance, and exceptional value',
      featuredSectionBadge: 'Popular Choices',
      testimonialsSectionTitle: 'Trusted by Thousands',
      testimonialsSectionSubtitle: 'Hear from our valued customers who have experienced the premium difference',
      testimonialsSectionBadge: 'Client Testimonials',
      testimonials: [
        {
          name: 'Ahmed Khan',
          role: 'Business Executive',
          rating: 5,
          text: 'Exceptional service from start to finish. The luxury vehicle exceeded expectations, and the team\'s attention to detail made our corporate event truly memorable.',
          image: '/placeholder-user.jpg'
        },
        {
          name: 'Fatima Ali',
          role: 'Wedding Planner',
          rating: 5,
          text: 'We\'ve used Abbottabad Rent A Car for multiple weddings. Their premium fleet and professional service always impress our clients. Highly recommended!',
          image: '/placeholder-user.jpg'
        },
        {
          name: 'Hassan Malik',
          role: 'Tour Operator',
          rating: 5,
          text: 'The perfect partner for our tour operations. Reliable vehicles, excellent customer support, and competitive pricing. Our clients love the experience.',
          image: '/placeholder-user.jpg'
        }
      ],
      benefitsSectionTitle: 'Unmatched Excellence',
      benefitsSectionSubtitle: 'Every detail crafted to deliver a premium experience that exceeds expectations',
      benefitsSectionBadge: 'Why Choose Us',
      benefits: [
        {
          icon: 'Shield',
          title: 'Fully Insured',
          description: 'Comprehensive coverage on all vehicles for your peace of mind'
        },
        {
          icon: 'Clock',
          title: '24/7 Support',
          description: 'Round-the-clock customer service for any assistance you need'
        },
        {
          icon: 'Award',
          title: 'Premium Selection',
          description: 'Meticulously maintained fleet of quality automobiles'
        },
        {
          icon: 'Star',
          title: 'Best Service',
          description: 'Professional service from booking to return'
        }
      ],
      ctaTitle: 'Begin Your Luxury Journey',
      ctaSubtitle: 'Our dedicated team is ready to curate the perfect rental experience tailored to your needs',
      ctaBadge: 'Experience Premium Service',
      ctaPrimaryButton: 'Schedule Your Rental',
      ctaSecondaryButton: '+92 300 1234567',
      ctaPhone: '+92 300 1234567',
      ctaEmail: 'info@abbottabadrentacar.com',
      ctaAddress: 'Main Mansehra Road, Abbottabad, KPK, Pakistan'
    });
    console.log('✅ Homepage content created');

    // Seed Tour Routes Content
    await TourRoutesContent.create({
      heroTitle: 'Tour Routes & Destinations',
      heroSubtitle: 'Explore Pakistan\'s most beautiful destinations with Abbottabad Rent A Car',
      heroBadge: 'Travel Destinations',
      heroImage: '/scenic-mountain-road-pakistan.jpg',
      heroPrimaryCTA: 'Call for Rates',
      heroSecondaryCTA: 'WhatsApp Us',
      heroPhone: '+923001234567',
      heroWhatsApp: '923001234567',
      popularDestinationsTitle: 'Popular Destinations',
      popularDestinations: [
        'Naran Kaghan',
        'Hunza',
        'Skardu',
        'Swat',
        'Kashmir',
        'Neelum Valley',
        'Murree',
        'Nathiagali',
        'Gilgit',
        'Chitral',
        'Shogran',
        'Saiful Muluk',
      ],
      routes: [
        {
          category: 'From Islamabad',
          routes: [
            { destination: 'Abbottabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Mansehra', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Murree', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Nathiagali', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Kashmir', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Neelum Valley', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Swat', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Naran Kaghan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Hunza', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Skardu', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Gilgit', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Lahore', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Multan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Faisalabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Chitral', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Shogran', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Saiful Muluk', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Peshawar', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Sukkur', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Karachi', oneWay: 'On Call', twoWay: 'On Call' },
          ],
        },
        {
          category: 'From Rawalpindi',
          routes: [
            { destination: 'Abbottabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Mansehra', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Murree', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Nathiagali', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Kashmir', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Neelum Valley', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Swat', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Naran Kaghan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Hunza', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Skardu', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Gilgit', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Lahore', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Multan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Faisalabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Chitral', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Shogran', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Peshawar', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Saiful Muluk', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Sukkur', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Karachi', oneWay: 'On Call', twoWay: 'On Call' },
          ],
        },
        {
          category: 'From Abbottabad',
          routes: [
            { destination: 'Islamabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Islamabad Airport', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Murree', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Nathiagali', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Lahore', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Multan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Faisalabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Peshawar', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Mardan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Karachi', oneWay: 'On Call', twoWay: 'On Call' },
          ],
        },
        {
          category: 'From Mansehra',
          routes: [
            { destination: 'Islamabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Islamabad Airport', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Murree', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Nathiagali', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Lahore', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Multan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Faisalabad', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Peshawar', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Mardan', oneWay: 'On Call', twoWay: 'On Call' },
            { destination: 'Karachi', oneWay: 'On Call', twoWay: 'On Call' },
          ],
        },
      ],
      ctaTitle: 'Ready to Start Your Journey?',
      ctaSubtitle: 'Contact us today to get customized rates for your destination. We offer competitive pricing and flexible packages for all routes.',
      ctaPrimaryButton: 'Call Now',
      ctaSecondaryButton: 'View All Services',
      ctaPhone: '+923001234567',
    });
    console.log('✅ Tour routes content created');

    // Seed About Content
    await AboutContent.create({
      heroBadge: 'Our Story',
      heroTitle: 'Redefining Luxury Travel',
      heroSubtitle: 'For over 15 years, we\'ve been the trusted choice for discerning clients seeking the finest automotive experiences',
      heroImage: '/professional-luxury-car-rental-service-team.jpg',
      stats: [
        { label: 'Years of Excellence', value: '15+' },
        { label: 'Luxury Vehicles', value: '50+' },
        { label: 'Happy Clients', value: '5,000+' },
        { label: 'Customer Rating', value: '4.9/5' },
      ],
      storyTitle: 'A Legacy of Excellence',
      storyParagraphs: [
        'Founded in 2010, Abbottabad Rent a Car began with a simple yet ambitious vision: to bring world-class luxury automotive experiences to our beautiful city and surrounding regions.',
        'What started as a small collection of premium vehicles has grown into the region\'s most prestigious luxury car rental service, featuring an exclusive fleet of the world\'s finest automobiles.',
        'Today, we\'re proud to serve thousands of satisfied clients annually, from business executives and wedding parties to tourists seeking an unforgettable journey through Pakistan\'s stunning landscapes.',
      ],
      storyImage: '/luxury-car-showroom-elegant-interior.jpg',
      storyButtonText: 'Explore Our Fleet',
      valuesTitle: 'Our Core Values',
      valuesSubtitle: 'The principles that guide everything we do',
      values: [
        {
          icon: 'Award',
          title: 'Excellence',
          description: 'We maintain the highest standards in vehicle quality, service delivery, and customer experience.',
        },
        {
          icon: 'Shield',
          title: 'Trust & Safety',
          description: 'Your safety is paramount. All vehicles are fully insured and maintained to manufacturer specifications.',
        },
        {
          icon: 'Users',
          title: 'Personalized Service',
          description: 'Our concierge team provides white-glove service tailored to your unique requirements.',
        },
        {
          icon: 'Clock',
          title: '24/7 Support',
          description: 'Round-the-clock assistance ensures you\'re never alone on your journey.',
        },
      ],
      timelineTitle: 'Our Journey',
      timelineSubtitle: 'Key milestones in our story of growth and excellence',
      milestones: [
        {
          year: '2010',
          title: 'Founded',
          description: 'Started with a vision to bring world-class luxury car rentals to Abbottabad',
        },
        {
          year: '2015',
          title: 'Fleet Expansion',
          description: 'Expanded to include ultra-luxury brands like Rolls-Royce and Bentley',
        },
        {
          year: '2020',
          title: '5,000 Clients',
          description: 'Reached milestone of serving over 5,000 satisfied customers',
        },
        {
          year: '2025',
          title: 'Industry Leader',
          description: 'Recognized as the premier luxury car rental service in the region',
        },
      ],
      teamTitle: 'Meet Our Team',
      teamSubtitle: 'Dedicated professionals committed to your exceptional experience',
      team: [
        {
          name: 'Ahmed Khan',
          role: 'Founder & CEO',
          image: '/placeholder.svg?key=team1',
          bio: '15+ years in luxury automotive industry',
        },
        {
          name: 'Sarah Ali',
          role: 'Fleet Manager',
          image: '/placeholder.svg?key=team2',
          bio: 'Expert in premium vehicle maintenance',
        },
        {
          name: 'Hassan Malik',
          role: 'Concierge Director',
          image: '/placeholder.svg?key=team3',
          bio: 'Hospitality professional with luxury brand experience',
        },
      ],
      certificationsTitle: 'Certifications & Standards',
      certificationsSubtitle: 'Committed to the highest industry standards',
      certifications: [
        'ISO 9001 Certified',
        'Luxury Vehicle Specialist',
        'Comprehensive Insurance Partner',
        '24/7 Roadside Assistance',
        'Professional Chauffeur Services',
        'Corporate Account Management',
      ],
      ctaTitle: 'Experience the Difference',
      ctaSubtitle: 'Join thousands of satisfied clients who trust us for their luxury automotive needs',
      ctaPrimaryButton: 'Get in Touch',
      ctaSecondaryButton: 'View Fleet',
    });
    console.log('✅ About content created');

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📧 Admin login: ${admin.email} / admin123`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

