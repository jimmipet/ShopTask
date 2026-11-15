import { HttpClient, type HttpResourceRef, httpResource } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Product, ProductDraft } from './product.model';

const BASE_URL = `${environment.apiBaseUrl}/products`;

@Service()
export class ProductsService {
  private readonly http = inject(HttpClient);

  public list(): HttpResourceRef<readonly Product[]> {
    return httpResource<readonly Product[]>(() => BASE_URL, { defaultValue: [] });
  }

  public get(id: () => string | undefined): HttpResourceRef<Product | undefined> {
    return httpResource<Product>(() => {
      const productId = id();
      return productId === undefined ? undefined : `${BASE_URL}/${productId}`;
    });
  }

  public save(id: string | undefined, draft: ProductDraft): Observable<unknown> {
    const body = { ...draft, image: draft.image.trim() || null };
    return id === undefined
      ? this.http.post(BASE_URL, body)
      : this.http.put(`${BASE_URL}/${id}`, body);
  }
}
