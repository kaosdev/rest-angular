export class MultipleDecoratorsError extends Error {
  constructor(decoratorName: string, targetName: string) {
    super(`Only one '@${decoratorName}()' decorator for each ${targetName} is supported`);
  }
}
