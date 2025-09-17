import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Truck } from "lucide-react";

export function Statistics() {
  return (
    <section className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline font-bold">Our Impact in Numbers</h2>
          <p className="text-muted-foreground">Trusted by thousands for their health needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-2">
                <Users className="h-10 w-10 text-primary" />
                <span>10,000+</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Happy Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-2">
                <Package className="h-10 w-10 text-primary" />
                <span>500+</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Products Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-2">
                <Truck className="h-10 w-10 text-primary" />
                <span>50,000+</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Orders Delivered</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
