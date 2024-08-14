import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import Product from "../../../../typing";


@Injectable({providedIn: 'root'})

export class CardListItemService {
    private readonly baseUrl: string = 'http://localhost:5008/products';
    
    private readonly httClient: HttpClient = inject(HttpClient)
  
    public getProducts(): Observable<Product[]> {
      return this.httClient.get<Product []>(this.baseUrl);
      
    }
  
    public getProductById$(id: number): Observable<Product> {
      return this.httClient.get<Product>(`${this.baseUrl}/${id}`);
    }
}