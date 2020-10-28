import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string) {
    localStorage.setItem('oauth', JSON.stringify(token));
    localStorage.setItem('isAuthenticated', '1');
  }

  getToken(): string {
     let token = {
      token_type: '',
      access_token: '',
    };
     const check = localStorage.getItem('oauth');
     if (check !== undefined && check !== '' && check !== null ) {
      token = JSON.parse(check);
      //
    }
     console.log(token);
     return token.token_type + ' ' + token.access_token;
  }

  getHeaders() {
    console.log(this.getToken());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoib2NhaW5ndGVjQGdtYWlsLmNvbSIsImlhdCI6MTYwMzg5NjczMSwiZXhwIjoxNjAzOTgzMTMxfQ.s2bS2QXUGmQU4EKAg0mA02-2dzfmDYq9OSJqbYlZJXM'
    });
    return headers;
  }


  loginService(email:string,password:string): Observable<any>{
    const url = `${environment.URL}/auth`;
    let params = new HttpParams().set('email', email); // create params object
    params = params.append('password', password); // add a new param, creating a new object
    let token = {
      token_type: '',
      access_token: '',
    };
    this.http.post<any>(url, params).subscribe(data =>{
      console.log(data);
      if(data){
        token.token_type = 'Bearer';
        token.access_token = data.Token;
      }
      console.log(token);
      this.setToken(`{
        'token_type': '${token.token_type}',
        'access_token': '${token.access_token}'
      }`);
      Swal.fire(
        'Entramos!',
        'Genial busquemos tu pelicula favorita',
        'success'
      );
      this.router.navigateByUrl('home');
    })
    return this.http.post<any>(url, params);
  }

}
