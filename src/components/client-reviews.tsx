
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";

const initialReviews = [
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
  {
    id: "review-4",
    name: "Emily R.",
    review: "The checkout process was so smooth and simple. I received my order the next day! I'll definitely be a returning customer.",
    rating: 5,
    placeholderId: "avatar-1",
  },
  {
    id: "review-5",
    name: "David T.",
    review: "Great selection of products and competitive prices. The AI dosage recommendation tool gave me peace of mind.",
    rating: 5,
    placeholderId: "avatar-2",
  },
];

const reviewFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  review: z.string().min(10, { message: "Review must be at least 10 characters." }),
  rating: z.coerce.number().min(1).max(5),
});

type Review = typeof initialReviews[0];

export function ClientReviews() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [reviews, setReviews] = React.useState<Review[]>(initialReviews);

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
      rating: 5,
    },
  });

  function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      name: values.name,
      review: values.review,
      rating: values.rating,
      placeholderId: `avatar-${Math.ceil(Math.random() * 3)}`,
    };
    setReviews([newReview, ...reviews]);
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    });
    form.reset();
    setOpen(false);
  }

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline font-bold">What Our Clients Say</h2>
          <p className="text-muted-foreground">Real stories from satisfied customers.</p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: reviews.length > 2,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent>
            {reviews.map((review) => {
              const image = placeholderImages.find(p => p.id === review.placeholderId);
              return (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 h-full">
                    <Card className="h-full flex flex-col">
                      <CardContent className="p-6 flex flex-col justify-between flex-grow">
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
                        <p className="text-muted-foreground text-sm">{review.review}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-center mt-8">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Leave a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
                <DialogDescription>
                  We'd love to hear your feedback about our products and services.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Review</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us what you think..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-6 w-6 cursor-pointer",
                                field.value >= star ? "text-primary fill-primary" : "text-gray-300"
                              )}
                              onClick={() => field.onChange(star)}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Submit Review</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
