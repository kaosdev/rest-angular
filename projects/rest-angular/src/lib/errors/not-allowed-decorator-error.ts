export class NotAllowedDecoratorError extends Error {
  constructor(notAllowed: string, on: string) {
    super(`@${notAllowed} decorator is not allowed on @${on}`);
  }
}
