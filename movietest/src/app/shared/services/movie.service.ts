import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getMovies(): Observable<any> {
    const url = `${environment.URL}/movies`;
    const headers = this.authService.getHeaders();
    return this.http
      .get<any>(url, { headers });
  }

  getMoviesId(id: string) {
    const url = `${environment.URL}/movies/${id}`;
    const headers = this.authService.getHeaders();
    return this.http
      .get<any>(url, { headers });
  }

  getMoviesSearch(id: string) {
    const url = `${environment.URL}/movies/search/${id}`;
    const headers = this.authService.getHeaders();
    
    return this.http
      .get<any>(url, { headers });
  }

}
