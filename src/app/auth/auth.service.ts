import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {UserModel} from './user.model';
import {Router} from '@angular/router';

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
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errMessage = 'An Unknown Error occurred!';
    console.log('Error Handling:HTTP: ', errorRes);
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
      .pipe(catchError(AuthService.handleError), tap(resData => {
        const {email, localId, idToken, expiresIn} = resData;
        this.handleAuthentication(email, localId, idToken, +expiresIn);
      }));
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
      .pipe(catchError(AuthService.handleError), tap(resData => {
        const {email, localId, idToken, expiresIn} = resData;
        this.handleAuthentication(email, localId, idToken, +expiresIn);
      }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['./auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,

    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const {
      email,
      id,
      _token,
      _tokenExpirationDate,
    } = userData;
    const loadedUser = new UserModel(email, id, _token, new Date(_tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new UserModel(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
