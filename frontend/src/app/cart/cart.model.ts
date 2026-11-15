export interface CartItem {
  readonly productId: number;
  readonly title: string;
  readonly description: string;
  readonly image: string | null;
  readonly unitPrice: number;
  readonly quantity: number;
  readonly lineTotal: number;
}

export interface Cart {
  readonly items: readonly CartItem[];
  readonly totalQuantity: number;
  readonly totalPrice: number;
}
