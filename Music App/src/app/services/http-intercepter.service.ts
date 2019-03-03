import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
    from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private jwtToken = null;
    private isAuthenticated = false;
    private tokenSubscription;
    private isAuthenticatedSubscription;
    constructor() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // this.authService.onTokenChange()
        //   .subscribe((token: NbAuthJWTToken) => {

        //     if (token.isValid()) { {
        //       this.testuser = token.getPayload(); 
        //       console.log(this.testuser)
        //     }

        //   });
        if (JSON.parse(localStorage.getItem('token'))) {
            this.jwtToken = JSON.parse(localStorage.getItem('token'));
            // console.log(this.jwtToken);
          }
        //   else if(JSON.parse(localStorage.getItem('tempToken'))){
        //     this.jwtToken = JSON.parse(localStorage.getItem('tempToken'));
        //   }
        // this.tokenSubscription = this.service.getToken().subscribe(token => this.jwtToken = token);
        // this.isAuthenticatedSubscription = this.service.isAuthenticated().subscribe(value => this.isAuthenticated = value);
        if (this.jwtToken) {
            req = req.clone({
                setHeaders: {
                    token: this.jwtToken
                }
            });
        }
        return next.handle(req);
    }
}