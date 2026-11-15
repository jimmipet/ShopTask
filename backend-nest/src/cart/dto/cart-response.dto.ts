export interface CartItemResponseDto {
  productId: number;
  title: string;
  description: string;
  image: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface CartResponseDto {
  items: CartItemResponseDto[];
  totalQuantity: number;
  totalPrice: number;
}
