import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardListItemService } from '../../utils/services/api/card-list-item.service';
import Product from '../../../typing';

@Component({
  standalone: true,
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
  imports: [ReactiveFormsModule, CommonModule]
})

export class AddEditProductComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input({required: true}) product?: Product;
  
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly cardListItemService: CardListItemService = inject(CardListItemService);
  private fb = inject(FormBuilder);

  public productForm: FormGroup = this.fb.group({
    title: [''],
    image: [''],
    description: [''],
    category: [''],
    price: ['0', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add';
      
      if (this.mode === 'edit' && params['productId']) {
        this.cardListItemService.getProductById$(params['productId']).subscribe(product => {
          this.product = product;
          this.productForm.patchValue({
            title: product.title,
            image: product.image,
            description: product.description,
            category: product.category,
            price: product.price
          });
        });
      }
    });
  }

  public onSubmit() {
    if (this.productForm.valid) {
      if (this.mode === 'add') {
        this.cardListItemService.addNewProduct(this.productForm.value).subscribe({
          next : () => {
            this.router.navigate(['']);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
      else if (this.mode === 'edit' && this.product) {
        const updatedProduct = { ...this.productForm.value };
        this.cardListItemService.updateProduct(this.product.id, updatedProduct).subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    }
  }

  public onCancel() {
    this.router.navigate(['']);
    this.productForm.reset();
  }
}