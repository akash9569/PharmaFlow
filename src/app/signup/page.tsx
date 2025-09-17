
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignupPage() {
    const loginImage = placeholderImages.find(p => p.id === 'login-hero');
    const { user, signUpWithEmailAndPassword, signInWithGoogle } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        fullName: "",
        email: "",
        password: "",
      },
    });

    useEffect(() => {
      if (user) {
        router.push('/');
      }
    }, [user, router]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      await signUpWithEmailAndPassword(values.email, values.password, values.fullName);
      setIsLoading(false);
    }

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-8rem)] lg:grid-cols-2 xl:min-h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold font-headline">Sign Up</h1>
                    <p className="text-balance text-muted-foreground">
                        Create an account to get started.
                    </p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="full-name">Full Name</Label>
                            <FormControl>
                              <Input id="full-name" placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="email">Email</Label>
                            <FormControl>
                              <Input id="email" type="email" placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="password">Password</Label>
                            <FormControl>
                              <Input id="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Create Account
                      </Button>
                      <Button variant="outline" className="w-full" onClick={signInWithGoogle} type="button" disabled={isLoading}>
                          Sign up with Google
                      </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
        <div className="hidden bg-muted lg:block relative">
            {loginImage && (
                <Image
                    src={loginImage.imageUrl}
                    alt={loginImage.description}
                    data-ai-hint={loginImage.imageHint}
                    fill
                    className="object-cover"
                />
            )}
      </div>
    </div>
  );
}
