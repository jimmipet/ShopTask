import { Component, computed, input } from '@angular/core';
import { type FieldTree, FormField } from '@angular/forms/signals';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-text-field',
  imports: [FormField, MatFormField, MatLabel, MatError, MatInput],
  template: `
    <mat-form-field class="text-field" appearance="outline">
      <mat-label>{{ label() }}</mat-label>
      @if (multiline()) {
        <textarea matInput rows="5" [formField]="control()"></textarea>
      } @else {
        <input matInput [type]="type()" [formField]="control()" />
      }
      <mat-error>{{ control()().errors()[0]?.message }}</mat-error>
    </mat-form-field>
  `,
  styles: `
    :host {
      display: block;
    }
    .text-field {
      width: 100%;
    }
  `,
})
export class TextField {
  public readonly label = input.required<string>();
  public readonly field = input.required<FieldTree<string> | FieldTree<number>>();
  public readonly type = input<'text' | 'number' | 'url'>('text');
  public readonly multiline = input(false);

  protected readonly control = computed(() => this.field() as FieldTree<string>);
}
