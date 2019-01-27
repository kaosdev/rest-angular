import { Injectable } from '@angular/core';
import { GET } from './example1';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleService {

    @GET('examples')
    public getExamples(): Observable<any> {
        return null;
    }
}

fdescribe('Api decorators - experimental', () => {

    it('should log to console', () => {
        const consoleSpy = spyOn(console, 'log').and.callThrough();

        new ExampleService().getExamples();

        expect(consoleSpy).toHaveBeenCalledWith('called');
    });

    it('should log path', () => {
        const consoleSpy = spyOn(console, 'log').and.callThrough();

        new ExampleService().getExamples();

        expect(consoleSpy).toHaveBeenCalledWith('path', 'examples');
    });

    it('should return an observable', () => {
        const exampleService = new ExampleService();

        exampleService.getExamples().subscribe(examples => {
            expect(examples).toBeTruthy();
        });
    });


});
