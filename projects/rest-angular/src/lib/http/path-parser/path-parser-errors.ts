export class PathParamNotFoundError extends Error {
  constructor(
    private paramName: string,
    private path: string
  ) {
    super(`Path parameter '${paramName}' was not found in the path '${path}'`);
  }
}
