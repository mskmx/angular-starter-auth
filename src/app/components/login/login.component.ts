import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private _userService: UsuarioService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ingresar() {
    if (this.username == '' || this.password == '') {
      this._snackBar.open('Todos los campos son obligatorios', 'Error', {
        duration: 2000,
      });
      return;
    }

    // Creamos el body
    const user: User = {
      usuario: this.username,
      password: this.password,
    };

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('token', data.accessToken);
        this._router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this._snackBar.open('Usuario/Password incorrect', 'Error', {
          duration: 2000,
        });
        this.loading = false;
      },
    });
  }
}
