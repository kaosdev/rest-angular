export interface RestHeaders {
  Authorization?: string | string[];
  [headerName: string]: string | string[];
}
