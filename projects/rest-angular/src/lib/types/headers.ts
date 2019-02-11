export type RestHeaders = RestHeader[];

export interface RestHeader {
  Authorization: string;
  [headerName: string]: string;
}
