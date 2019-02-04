import 'reflect-metadata';

export interface Metadata<T> {
  updateMetadata(metadataKey: string, mapFn: (metadataValue: T) => T);

  defineMetadata(metadataKey: string, metadataValue: T);

  getMetadata(metadataKey: string): T;
}

export class MetadataTarget implements Metadata<any> {
  constructor(
    private target: any
  ) {
  }

  updateMetadata<T>(metadataKey: string, mapFn: (metadataValue: T) => T) {
    const metadataValue: T = this.getMetadata(metadataKey);
    const mappedMetadataValue = mapFn(metadataValue);
    this.defineMetadata(metadataKey, mappedMetadataValue);
  }

  defineMetadata<T>(metadataKey: string, metadataValue: T) {
    Reflect.defineMetadata(metadataKey, metadataValue, this.target);
  }

  getMetadata<T>(metadataKey: string): T {
    return Reflect.getMetadata(metadataKey, this.target);
  }
}

