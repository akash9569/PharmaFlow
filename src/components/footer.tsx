import Link from "next/link";
import { Pill, Facebook, Twitter, Instagram } from "lucide-react";
import { products } from "@/lib/products";

export function Footer() {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Pill className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl">PharmaFlow</span>
            </Link>
            <p className="text-sm">Your trusted partner in health and wellness.</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                 <li key={category}><Link href={`/specialized-store?category=${category}`} className="hover:text-primary">{category}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">FAQs</Link></li>
              <li><Link href="#" className="hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary"><Facebook /></a>
              <a href="#" className="hover:text-primary"><Twitter /></a>
              <a href="#" className="hover:text-primary"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PharmaFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
