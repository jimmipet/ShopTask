export interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly category: string;
  readonly description: string;
  readonly image: string | null;
}

export type ProductDraft = Omit<Product, 'id' | 'image'> & { readonly image: string };
