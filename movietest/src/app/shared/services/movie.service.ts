import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getMovies(): Observable<any> {
    const url = `${environment.URL}/movies`;
    const headers = this.authService.getHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  getMoviesId(id: string) {
    const url = `${environment.URL}/movies/${id}`;
    const headers = this.authService.getHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  getMoviesSearch(id: string) {
    const url = `${environment.URL}/movies/search/${id}`;
    const headers = this.authService.getHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    });

    return throwError(errorMessage);
  }
}
