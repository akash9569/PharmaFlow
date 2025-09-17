export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  dosage: string;
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
