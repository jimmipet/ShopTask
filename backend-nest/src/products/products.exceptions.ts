import { NotFoundException } from '../common/business-logic.exception.js';

export class ProductNotFoundException extends NotFoundException {
  constructor(productId: number) {
    super(`Product '${productId}' was not found.`);
  }
}
