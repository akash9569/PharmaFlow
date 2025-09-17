
'use client';

import { products } from "@/lib/products";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Utensils, Stethoscope, Wind, Syringe, ShieldPlus } from "lucide-react";
import React from "react";

const categoryIcons: { [key: string]: React.ElementType } = {
    "Pain Relief": Stethoscope,
    "Vitamins & Supplements": ShieldPlus,
    "Cold & Flu": Wind,
    "Allergy": Wind,
    "Digestive Health": Utensils,
    default: Syringe,
};

export function CategoryShowcase() {
    const categories = [...new Set(products.map((p) => p.category))];
    
    return (
        <section className="bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-headline font-bold">Shop by Category</h2>
                    <p className="text-muted-foreground">Find what you need from our wide range of products.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {categories.map((category) => {
                        const Icon = categoryIcons[category] || categoryIcons.default;
                        return (
                            <Link href={`/specialized-store?category=${category}`} key={category} className="flex">
                                <Card className="text-center p-4 hover:shadow-lg transition-shadow hover:bg-card w-full flex flex-col">
                                    <CardContent className="p-2 flex flex-col items-center justify-center gap-2 flex-grow">
                                        <Icon className="h-10 w-10 text-primary" />
                                        <h3 className="font-semibold text-sm md:text-base">{category}</h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
