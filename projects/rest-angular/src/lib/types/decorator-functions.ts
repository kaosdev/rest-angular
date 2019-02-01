import {RestAngularClient} from '../rest-angular-client';

export type RestMethodDecorator = (
    target: RestAngularClient,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => void | PropertyDescriptor;

export type RestParameterDecorator = (
    target: RestAngularClient,
    propertyKey: string,
    index: number
) => void;

export type RestParameterFunction = (
    target: RestAngularClient,
    index: number
) => void;
