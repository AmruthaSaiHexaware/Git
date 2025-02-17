import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiSandboxInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request.clone({
      setHeaders: {
        "X-SDBXAZ-API-KEY":"academy-83265CED-62D0-4383-AD32-2EEE4A7C73AD"
      }
    }));
  }
}
