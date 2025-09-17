'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Link from 'next/link';

export default function MembershipPage() {
  const membershipImage = placeholderImages.find(p => p.id === 'membership-card');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Join Our Membership</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Unlock exclusive benefits and rewards with the PharmaFlow membership program.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3">
            {membershipImage && (
                 <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                        src={membershipImage.imageUrl}
                        alt={membershipImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={membershipImage.imageHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-3xl font-bold">PharmaFlow+</h2>
                        <p className="text-lg">Exclusive Member</p>
                    </div>
                </div>
            )}
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="text-primary"/>
                        Membership Benefits
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                        <p>Free shipping on all orders.</p>
                    </div>
                     <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                        <p>10% off on all over-the-counter products.</p>
                    </div>
                     <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                        <p>Early access to sales and new arrivals.</p>
                    </div>
                     <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                        <p>Personalized health recommendations from our AI.</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/signup">Sign Up for Rs 999/month</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
