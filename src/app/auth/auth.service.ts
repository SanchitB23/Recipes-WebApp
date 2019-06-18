import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_KEY: string = 'AIzaSyAvQVW4EIUujO-vsG7XOW1fm8YjkUhjk3w ';

  constructor(private http: HttpClient) {
  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errMessage: string = 'An Unknown Error occurred!';
    if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
      return throwError(errMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This Email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'This Email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'The password is invalid';
        break;
      case 'USER_DISABLED':
        errMessage = 'The user account has been disabled by an administrator';
        break;
      default:
        errMessage = 'An Unknown Error occurred!';
    }
    return throwError(errMessage);
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${this.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(AuthService.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(AuthService.handleError));
  }

}
