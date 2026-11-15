import {
  BusinessLogicException,
  NotFoundException,
} from '../common/business-logic.exception.js';

export class CartItemNotFoundException extends NotFoundException {
  constructor(productId: number) {
    super(`Product '${productId}' is not in the cart.`);
  }
}

export class CartItemQuantityInvalidException extends BusinessLogicException {
  constructor() {
    super('Quantity of a product in the cart must be greater than zero.');
  }
}
