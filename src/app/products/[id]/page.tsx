"use client";

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
      <div className="bg-card p-4 rounded-lg shadow-sm flex items-center justify-center">
        <div className="relative aspect-square w-full max-w-md">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div>
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mt-2">Rs {product.price.toFixed(2)}</p>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        
        <Separator />
        
        <div>
            <h2 className="font-semibold text-lg mb-2">Dosage Information</h2>
            <p className="text-muted-foreground text-sm">{product.dosage}</p>
        </div>

        <div className="flex items-center space-x-4">
          <p className="font-semibold">Quantity:</p>
          <div className="flex items-center gap-2 border rounded-md p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={decrement}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={increment}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button onClick={handleAddToCart} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <ShoppingCart className="mr-2" /> Add to Cart
        </Button>

        <div className="text-sm text-muted-foreground">
            {product.stock > 0 ? `In Stock: ${product.stock} units available` : 'Out of Stock'}
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <ProductDetailsClient product={product} />
    </div>
  );
}
