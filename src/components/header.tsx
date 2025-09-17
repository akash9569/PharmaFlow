"use client";

import Link from "next/link";
import { Pill, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart-context";
import { CartSheet } from "./cart-sheet";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#featured-products", label: "Products" },
  { href: "/dosage-tool", label: "Dosage Tool" },
  { href: "/membership", label: "Membership" },
  { href: "/orders", label: "My Orders" },
  { href: "/contact", label: "Contact Us"},
];

export function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Pill className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">PharmaFlow</span>
          </Link>

          <div className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)}>
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="sr-only">Open cart</span>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
            
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium mt-8">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Pill className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline">PharmaFlow</span>
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                        href="/login"
                        className="transition-colors hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login / Sign Up
                      </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
