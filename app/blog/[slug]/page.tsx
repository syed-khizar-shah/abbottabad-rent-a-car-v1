import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Mock blog data - in a real app, this would come from a database or CMS
const blogPosts = {
  "1": {
    id: "1",
    title:
      "The Ultimate Guide to Planning a Luxury Wedding in Northern Pakistan",
    excerpt:
      "Discover how to create an unforgettable wedding experience in the breathtaking landscapes of northern Pakistan, complete with luxury transportation that matches the grandeur of your special day.",
    content: `
      <p>Planning a wedding in the stunning landscapes of Northern Pakistan is a dream come true for many couples. The majestic mountains, pristine valleys, and rich cultural heritage provide the perfect backdrop for a celebration that will be remembered for a lifetime.</p>

      <h2>Choosing the Perfect Location</h2>
      <p>Northern Pakistan offers numerous breathtaking venues for your special day. From the serene valleys of Hunza to the picturesque landscapes of Naran and Kaghan, each location brings its own unique charm. Consider factors like accessibility, accommodation options for guests, and the season when making your choice.</p>

      <h3>Popular Wedding Destinations</h3>
      <ul>
        <li><strong>Hunza Valley:</strong> Known for its stunning mountain views and hospitable locals</li>
        <li><strong>Naran Kaghan:</strong> Perfect for summer weddings with lush green meadows</li>
        <li><strong>Swat Valley:</strong> The "Switzerland of Pakistan" offers diverse venues</li>
        <li><strong>Murree:</strong> Accessible year-round with excellent facilities</li>
      </ul>

      <h2>Luxury Transportation: Making an Entrance</h2>
      <p>Your wedding day transportation sets the tone for the entire celebration. Arriving in a luxury vehicle not only makes a statement but also ensures comfort and style throughout your special day.</p>

      <h3>Choosing the Right Vehicle</h3>
      <p>For weddings in Northern Pakistan, we recommend vehicles that combine luxury with practicality. Our fleet includes:</p>
      <ul>
        <li><strong>Rolls-Royce Phantom:</strong> The ultimate in luxury and prestige</li>
        <li><strong>Mercedes S-Class:</strong> Perfect blend of comfort and elegance</li>
        <li><strong>Range Rover:</strong> Ideal for mountain terrain while maintaining luxury</li>
        <li><strong>Bentley Continental:</strong> For couples who want to make a grand entrance</li>
      </ul>

      <h2>Planning Timeline</h2>
      <p>A destination wedding requires careful planning. Here's a recommended timeline:</p>
      <ul>
        <li><strong>12 months before:</strong> Choose location and book venue</li>
        <li><strong>9 months before:</strong> Reserve luxury transportation and accommodation</li>
        <li><strong>6 months before:</strong> Send save-the-dates to guests</li>
        <li><strong>3 months before:</strong> Finalize all vendor contracts</li>
        <li><strong>1 month before:</strong> Confirm all arrangements and create detailed schedule</li>
      </ul>

      <h2>Guest Transportation</h2>
      <p>Don't forget about your guests! Arrange comfortable transportation for them as well. We offer fleet packages that can accommodate wedding parties of all sizes, ensuring everyone arrives in style and comfort.</p>

      <h2>Weather Considerations</h2>
      <p>Northern Pakistan's weather can be unpredictable. The best months for weddings are:</p>
      <ul>
        <li><strong>April to June:</strong> Pleasant weather with blooming flowers</li>
        <li><strong>September to October:</strong> Clear skies and comfortable temperatures</li>
      </ul>

      <h2>Making It Memorable</h2>
      <p>A luxury wedding in Northern Pakistan is about creating unforgettable moments. From the scenic drive to your venue in a premium vehicle to the stunning mountain backdrop for your photos, every detail contributes to the magic of your special day.</p>

      <p>At Abbottabad Rent A Car, we understand the importance of your wedding day. Our experienced team ensures that your luxury transportation is flawless, allowing you to focus on celebrating your love story in one of the most beautiful regions in the world.</p>

      <h2>Contact Us</h2>
      <p>Ready to plan your dream wedding in Northern Pakistan? Contact us today to discuss your luxury transportation needs. We offer customized packages for weddings and can help you create the perfect experience for your special day.</p>
    `,
    category: "Events & Weddings",
    author: "Sarah Khan",
    authorBio:
      "Wedding planner and luxury event specialist with over 10 years of experience in destination weddings.",
    date: "2025-01-20",
    readTime: "8 min read",
    image: "/luxury-wedding-northern-pakistan-mountains.jpg",
    featured: true,
  },
  "2": {
    id: "2",
    title: "Top 5 Scenic Routes in Pakistan Perfect for Luxury Car Tours",
    content: `
      <p>Pakistan is home to some of the world's most spectacular driving routes. From the legendary Karakoram Highway to the coastal beauty of Makran, these roads offer experiences that are best enjoyed in a luxury vehicle.</p>

      <h2>1. The Karakoram Highway</h2>
      <p>Often called the "Eighth Wonder of the World," the Karakoram Highway is a 1,300 km marvel of engineering that connects Pakistan with China. This high-altitude road offers breathtaking views of some of the world's highest peaks.</p>
      
      <h3>Best Time to Visit</h3>
      <p>May to October, when the road is fully accessible and weather conditions are favorable.</p>

      <h3>Recommended Vehicle</h3>
      <p>Range Rover or Land Cruiser for comfort and capability on mountain terrain.</p>

      <h2>2. Naran to Babusar Top</h2>
      <p>This route takes you through lush green valleys, alongside crystal-clear rivers, and up to the stunning Babusar Pass at 4,173 meters. The journey offers diverse landscapes and numerous photo opportunities.</p>

      <h2>3. Islamabad to Murree via Expressway</h2>
      <p>A perfect route for those who want to enjoy luxury driving on well-maintained roads. The Murree Expressway offers smooth sailing with beautiful views of the Margalla Hills.</p>

      <h2>4. Coastal Highway (Makran)</h2>
      <p>Experience the unique beauty of Pakistan's coastline. This route offers dramatic cliffs, pristine beaches, and the mesmerizing Arabian Sea.</p>

      <h2>5. Swat Valley Circuit</h2>
      <p>Known as the "Switzerland of Pakistan," Swat Valley offers a complete circuit of natural beauty, historical sites, and cultural experiences.</p>

      <h2>Tips for Luxury Road Trips</h2>
      <ul>
        <li>Plan your route and book accommodations in advance</li>
        <li>Choose a vehicle appropriate for the terrain</li>
        <li>Pack emergency supplies and ensure your vehicle is well-maintained</li>
        <li>Allow extra time for photo stops and unexpected delays</li>
        <li>Respect local customs and environment</li>
      </ul>
    `,
    category: "Travel Guides",
    author: "Ahmed Hassan",
    authorBio:
      "Travel enthusiast and automotive journalist specializing in luxury road trips.",
    date: "2025-01-18",
    readTime: "6 min read",
    image: "/karakoram-highway-scenic-mountain-road.jpg",
  },
};

const relatedPosts = [
  {
    id: "3",
    title: "Rolls-Royce vs Bentley: Choosing the Perfect Ultra-Luxury Vehicle",
    category: "Luxury Lifestyle",
    image: "/rolls-royce-bentley-comparison.jpg",
  },
  {
    id: "4",
    title: "First-Time Luxury Car Rental: Everything You Need to Know",
    category: "Rental Tips",
    image: "/luxury-car-rental-guide.jpg",
  },
  {
    id: "5",
    title: "Corporate Travel: Why Executives Choose Luxury Car Rentals",
    category: "Luxury Lifestyle",
    image: "/executive-business-luxury-car.jpg",
  },
];

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <Card className="p-6 sm:p-8 lg:p-12 mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium">Share:</span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 bg-transparent"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div
              className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>

          {/* Author Bio */}
          <Card className="p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <User className="h-8 w-8 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">About {post.author}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.authorBio}
                </p>
              </div>
            </div>
          </Card>

          {/* Related Posts */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-shadow h-full">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-bold text-sm line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="p-8 sm:p-12 text-center bg-accent text-accent-foreground">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Browse our premium fleet and book your perfect luxury vehicle
              today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/fleet">View Our Fleet</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </div>
      </article>
    </div>
  );
}
