
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
    const loginImage = placeholderImages.find(p => p.id === 'login-hero');
    const { user, signInWithGoogle } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (user) {
        router.push('/');
      }
    }, [user, router]);

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
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" placeholder="John Doe" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled>
                        Create Account
                    </Button>
                    <Button variant="outline" className="w-full" onClick={signInWithGoogle} type="button">
                        Sign up with Google
                    </Button>
                </form>
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
