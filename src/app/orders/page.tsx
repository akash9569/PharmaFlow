import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-10-26",
    status: "Delivered",
    total: 45.98,
  },
  {
    id: "ORD-002",
    date: "2023-10-28",
    status: "Shipped",
    total: 12.49,
  },
  {
    id: "ORD-003",
    date: "2023-11-01",
    status: "Processing",
    total: 101.50,
  },
  {
    id: "ORD-004",
    date: "2023-11-02",
    status: "Delivered",
    total: 22.78,
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Delivered":
      return "default";
    case "Shipped":
      return "secondary";
    case "Processing":
      return "outline";
    default:
      return "default";
  }
};

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Order History</CardTitle>
          <CardDescription>View your past orders and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status) as any}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
