import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import Product from "../../typing";


@Injectable({providedIn: 'root'})

export class CardListItemService {
    private baseUrl = 'https://fakestoreapi.com/products';

    private readonly httClient = inject(HttpClient)
  
    getProducts(): Observable<Product[]> {
      return this.httClient.get<Product []>(this.baseUrl);
      
    }
  
    getProduct(id: number): Observable<Product> {
      return this.httClient.get<Product>('${this.baseUrl}/${id}');

    }
}