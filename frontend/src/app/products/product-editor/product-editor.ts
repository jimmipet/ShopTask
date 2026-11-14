import { Component, inject, input, linkedSignal } from '@angular/core';
import {
  FormRoot,
  type TreeValidationResult,
  form,
  min,
  required,
  validate,
} from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiErrorPipe } from '../../core/api';
import { TextField } from '../../shared/text-field';
import { type ProductDraft, ProductsApi } from '../products-api';

@Component({
  selector: 'app-product-editor',
  imports: [
    FormRoot,
    RouterLink,
    ApiErrorPipe,
    MatButton,
    MatCard,
    MatIcon,
    MatProgressSpinner,
    TextField,
  ],
  templateUrl: './product-editor.html',
  styleUrl: './product-editor.scss',
})
export default class ProductEditor {
  private readonly api = inject(ProductsApi);
  private readonly router = inject(Router);
  public readonly id = input<string>();
  protected readonly product = this.api.get(this.id);

  protected readonly draft = linkedSignal<ProductDraft>(() => {
    if (!this.product.hasValue()) {
      return { title: '', price: 0, category: '', description: '', image: '' };
    }
    const { title, price, category, description, image } = this.product.value();
    return { title, price, category, description, image: image ?? '' };
  });

  protected readonly productForm = form(
    this.draft,
    (path) => {
      required(path.title, { message: 'Укажите название товара' });
      required(path.category, { message: 'Укажите категорию' });
      required(path.price, { message: 'Укажите цену' });
      min(path.price, 0, { message: 'Цена не может быть отрицательной' });
      validate(path.price, ({ value }) =>
        Math.abs(value() * 100 - Math.round(value() * 100)) < 1e-9
          ? undefined
          : { kind: 'priceFraction', message: 'Не больше двух знаков после запятой' },
      );
    },
    { submission: { action: () => this.save() } },
  );

  private async save(): Promise<TreeValidationResult> {
    try {
      await firstValueFrom(this.api.save(this.id(), this.draft()));
    } catch {
      return { kind: 'server', message: 'Не удалось сохранить товар. Попробуйте ещё раз.' };
    }
    await this.router.navigate(['/products']);
    return undefined;
  }
}
