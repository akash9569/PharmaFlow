import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images.json";
import Image from "next/image";

const reviews = [
  {
    id: "review-1",
    name: "Sarah L.",
    review: "PharmaFlow has been a game-changer for my family. The AI dosage tool is so helpful, and their delivery is always on time. Highly recommended!",
    rating: 5,
    placeholderId: "avatar-1",
  },
  {
    id: "review-2",
    name: "Michael B.",
    review: "I love the convenience of ordering my prescriptions online. The website is easy to navigate, and the specialized store has everything I need.",
    rating: 5,
    placeholderId: "avatar-2",
  },
  {
    id: "review-3",
    name: "Jessica P.",
    review: "The membership program is a great value. I save a lot on products, and the free shipping is a huge plus. The customer service is excellent too.",
    rating: 5,
    placeholderId: "avatar-3",
  },
];

export function ClientReviews() {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline font-bold">What Our Clients Say</h2>
          <p className="text-muted-foreground">Real stories from satisfied customers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => {
            const image = placeholderImages.find(p => p.id === review.placeholderId);
            return (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {image && (
                         <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={image.imageUrl} alt={review.name} />
                            <AvatarFallback>{review.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                    )}
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <div className="flex text-primary">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.review}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
