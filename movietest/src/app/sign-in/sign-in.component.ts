import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../shared/datamodel/user.model';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  User: any = {
    email: '',
    password: '',
  };
  user$: Observable<User>;
  error$: Observable<string | null>;
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authservice:AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.HandlingError();
  }

  get f() {
    return this.loginForm.controls;
  }

  HandlingError() {
    /* this.error$ = this.store.pipe(
     select(getError),
     map((error: any) => {
       if (
         error &&
         (error.code === 'auth/user-not-found' ||
           error.code === 'auth/wrong-password')
       ) {
         return 'Error en Email o Contraseña';
       } else {
         return null;
       }
     })
   ); */
 }

 onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Porfavor ingrese un email y password valido (el password consta al menos de 5 digitos)!'
    });
    return;
  }

  this.User.email = this.loginForm.value.email;
  this.User.password = this.loginForm.value.password;
  if (this.loginForm.valid) {
   
    this.authservice.loginService(this.loginForm.value.email, this.loginForm.value.password);
    
  }
}

}
