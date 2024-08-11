
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
  }

export default Product;


export interface CartItem {
  product: Product;
  quantity: number;
  }