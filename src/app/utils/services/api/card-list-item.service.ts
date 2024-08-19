import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable} from "rxjs";
import Product, { CartItem } from "../../../../typing";


@Injectable({providedIn: 'root'})

export class CardListItemService {
    private readonly baseUrl: string = 'http://localhost:5240/products';
    
    private readonly httpClient: HttpClient = inject(HttpClient)
  
    public getProducts(): Observable<Product[]> {
      return this.httpClient.get<Product []>(this.baseUrl);
    }
  
    public getProductById$(id: number): Observable<Product> {
      return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
    }

    public addProductToCart(productId: number): Observable<string> {
      return this.httpClient.post(`${this.baseUrl}/${productId}/addtocart`, null, { responseType: 'text' });
    }
  
    public getProductCart(): Observable<CartItem[]> {
      return this.httpClient.get<CartItem[]>(`${this.baseUrl}/cart`);
    }

    public removeProductCart(productId: number): Observable<string> {
      return this.httpClient.delete(`${this.baseUrl}/${productId}/removefromcart`, { responseType: 'text' })
    }

    public increaseQuantity(productId: number): Observable<string> {
      return this.httpClient.post<string>(`${this.baseUrl}/${productId}/increasequantity`, { responseType: 'text' });
    }
  
    public decreaseQuantity(productId: number): Observable<string> {
      return this.httpClient.post<string>(`${this.baseUrl}/${productId}/decreasequantity`, { responseType: 'text' });
    }
}