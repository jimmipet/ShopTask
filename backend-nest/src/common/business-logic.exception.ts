export abstract class BusinessLogicException extends Error {
  public get code(): string {
    return this.constructor.name;
  }
}

export abstract class NotFoundException extends BusinessLogicException {}
