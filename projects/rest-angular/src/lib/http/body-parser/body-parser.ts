export interface BodyParser {
  getBodyFromArgs(args: any[]): any;
}

export class StandardBodyParser implements BodyParser {

  constructor(private paramIndex: number) {
  }

  getBodyFromArgs(args: any[]): any {
    return args[this.paramIndex];
  }
}
