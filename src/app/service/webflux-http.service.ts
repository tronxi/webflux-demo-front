import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebfluxHttpService {

  constructor(private zone: NgZone,
              private http: HttpClient) { }

  findDemoStream(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource('http://localhost:8080/webflux/demo/parallel/stream');
      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.complete();
        });
      };
    });
  }

  findDemoParallel(): Observable<any> {
    return this.http.get('http://localhost:8080/webflux/demo/parallel');
  }

  findDemo(): Observable<any> {
    return this.http.get('http://localhost:8080/webflux/demo');
  }
}
