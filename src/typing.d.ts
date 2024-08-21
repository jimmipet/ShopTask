interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }

export default Product;

export interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  count: number;
}

export interface CardItemDto {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  id?: number; 
}