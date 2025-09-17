import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Stethoscope, Award } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-background');
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover brightness-50"
          />
        )}
        <div className="relative z-10 p-4 space-y-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            Your Health, Delivered.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Discover a seamless pharmacy experience with PharmaFlow. Quality medications, expert advice, and fast delivery right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dosage-tool">
                <Stethoscope className="mr-2" />
                AI Dosage Guide
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#featured-products">
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              placeholder="Search for medicines, vitamins, and more..."
              className="h-12 text-lg pr-12"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </section>

       <section className="container mx-auto px-4">
          <Card className="bg-accent text-accent-foreground border-none">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-3xl font-headline flex items-center gap-2"><Award /> Become a PharmaFlow+ Member</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-accent-foreground/90 text-base mb-6">
                            Join our loyalty program to unlock exclusive perks like free shipping, special discounts, and early access to new products.
                        </CardDescription>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/membership">Learn More</Link>
                        </Button>
                    </CardContent>
                </div>
                 <div className="hidden md:block">
                    <Image src="https://picsum.photos/seed/banner/600/400" alt="Pharmacist holding a box of medicine" width={600} height={400} className="object-cover h-full w-full rounded-r-lg" data-ai-hint="pharmacist medicine" />
                 </div>
            </div>
          </Card>
      </section>

      <section id="featured-products" className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline font-bold">Featured Products</h2>
          <p className="text-muted-foreground">Top picks for your health and wellness</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
