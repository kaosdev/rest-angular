import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Constructor<T> {
    new (...args: any[]): T;
}

export function GET(path: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const ctor = target.constructor as Constructor<any>;
        // ctor.prototype.httpClient

        descriptor.value = () => {
            console.log('called');
            console.log('path', path);

            return of({
                hello: 'world'
            });
        };
    };
}
