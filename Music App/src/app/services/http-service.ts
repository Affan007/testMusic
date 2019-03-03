import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  postFormRequest(url: string, data: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.post(url, data, options)
      .pipe(
        map(res => {
          if (res['status'] === 401) {
            this.handleUnauthenticated();
          }

          else if (res['status'] === 200 || res['status'] === 304) {
            return {
              data: res['data'],
              message: res['message'],
            }
          } else {

            throw new Error(res['message']);
          }

        }),
        catchError(err => this.handleError(err))
      );
  }

  putFormRequest(url: string, data: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.put(url, data, options)
      .pipe(
        map(res => {

          if (res['response'] === 401) {
            this.handleUnauthenticated();
          }

          else if (res['response'] === 200 || res['response'] === 304 && res['success'] === 1) {
            return {
              data: res['data'],
              response: res['response'],
              success: res['success'],
              message: res['message'],
            }
          } else {

            throw new Error(res['message']);
          }

        }),
        catchError(this.handleError)
      );
  }

  // handles all GET Requests, sends the whole response/error to component
  getRequest(url, params = {}, showerror = true) {
    return this.http.get(url, { params: params, observe: 'response' })
      .pipe(
        map(res => {
          if (res['status'] === 401) {
            this.handleUnauthenticated();
          }
          else if ((res['status'] === 200 || res['status'] === 304)) {
            return {
              data: res.body['data'],
              message: res.body['message'],
              status:res.body['status'],
            }
          } else if (showerror) {
            throw new Error(res.body['message']);
          }
        }),
        // catchError((err) => {
        //   if (showerror) {
        //     return this.handleError(err)
        //   } else {
        //     err = '';
        //     return this.handleError(err)
        //   }
        // })
        catchError(err => this.handleError(err))
      );
  }

  // handles all POST Requests. Headers are optional, sends the whole response/error to component
  postRequest(url, params, headers = {}) {
    let httpOptions = this.checkHeaders(headers);

    return this.http.post(url, params, { headers: httpOptions })
      .pipe(
        map(res => {
          if (res['response'] === 401) {
            this.handleUnauthenticated();
          }

          else if (res['status'] === 200 || res['status'] === 304) {
            return {
              data: res['data'],
              message: res['message'],
            }
          } 
          else if(res['data'].code=='012'){
            return {
              data: res['data'],
              message: res['message'],
            }
          }
          else {

            throw new Error(res['message']);
          }

        }),
        // catchError((error: HttpErrorResponse) => {
        //   return this.handleError(error);
        // })
        catchError(err => this.handleError(err))
      );
  }

  // handles all POST Requests. Headers are optional, sends the whole response/error to component
  putRequest(url, params, headers = {}) {
    let httpOptions = this.checkHeaders(headers);

    return this.http.put(url, params, { headers: httpOptions })
      .pipe(
        map(res => {
          if (res['response'] === 401) {
            this.handleUnauthenticated();
          }

          else if (res['status'] === 200 || res['status'] === 304) {
            return {
              data: res['data'],
              message: res['message'],
            }
          } 
          else if (res['status'] === '1001') {
            return {
              data: res['data'],
              message: res['message'],
              status:res['status']
            }
          }
          else {
            throw new Error(res['message']);
          }

        }),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  deleteRequest(url, params, headers = {}) {

    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.delete(url, options)
      .pipe(
        map(res => {

          if (res['response'] === 401) {
            this.handleUnauthenticated();
          }

          else if (res['response'] === 200 || res['response'] === 304 && res['success'] === 1) {
            return {
              data: res['data'],
              response: res['response'],
              success: res['success'],
              message: res['message'],
            }
          } else {

            throw new Error(res['message']);
          }

        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      if (error && (error.status === 401)) {
        console.log(error);
        this.handleUnauthenticated('Unaunthenticated');
      }
      // else if(error && (error.status === 0)){
      //   this.showError("enitiy too large","Big File");
      // }
      else {
        if (error.error && error.error.message)
          this.showError(error.error.message);
        else
          this.showError(error);
      }

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    if (error.error)
      return throwError(error.error.message);
    else
      return throwError(error);
  };

  // append headers in http requests
  private checkHeaders(headers) {
    if (Object.keys(headers).length) {
      return headers;
    } else return {
      'Content-Type': 'application/json',
    }
  }

  handleUnauthenticated(msg: string = '') {
    if (msg) this.showError(msg);
    localStorage.removeItem('token');
    return this.router.navigateByUrl('/login');
  }

  // upload image 
  uploadImage(url, fileToUpload: File) {
    // console.log(fileToUpload)
    var fd = new FormData();
    fd.append('image', fileToUpload);
    return this.http.post(url, fd)
      .pipe(
        map(res => {

          if (res['status'] === 401) {

            localStorage.removeItem("user");
            this.router.navigateByUrl('/auth/login');
          }

          return {
            data: res['data'],
            message: res['message'],
          }
        }),
        catchError(err => this.handleError(err))
      );
  }

  showSuccess = (msg, title) => {
    this.toastr.success(msg, title);
  }

  showError = (msg, title = '') => {
    if (msg) {
      this.toastr.error(msg, title, {
        closeButton: true,
        timeOut: 3000
      });
    } 
    // else {
    //   this.toastr.error(null, 'Unable to connect to server.', {
    //     closeButton: true,
    //     timeOut: 3000
    //   });
    // }
  }
}


