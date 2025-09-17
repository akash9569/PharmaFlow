"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <ShoppingCart className="h-24 w-24 text-muted-foreground" />
        <h1 className="text-3xl font-bold mt-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mt-2">You have no items in your shopping cart to check out.</p>
        <Button asChild className="mt-6">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  const handlePlaceOrder = () => {
    alert("Order placed successfully! (This is a simulation)");
    clearCart();
    // In a real app, you would redirect to an order confirmation page.
    window.location.href = '/orders';
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Shipping Address</Label>
              <Input id="address" placeholder="123 Main St, Anytown, USA" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
            </div>
          </CardContent>
          <CardFooter>
             <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                Place Order
              </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden bg-secondary">
                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">Rs {(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>Rs {cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>Rs 50.00</p>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>Rs {(cartTotal + 50.00).toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
