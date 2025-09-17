
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function SpecializedStoreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';
  const allCategories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(
    (product) => selectedCategory === 'All' || product.category === selectedCategory
  );

  const handleCategoryChange = (category: string) => {
    router.push(`/specialized-store?category=${category}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h1>
        <div className="w-full md:w-auto md:min-w-[250px]">
          <Select onValueChange={handleCategoryChange} defaultValue={selectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function SpecializedStorePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SpecializedStoreContent />
        </Suspense>
    )
}
