import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Importação correta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  
})

export class Login {

  usuario = '';
  senha = '';

  constructor(private router: Router) {}

  fazerLogin() {
    if (this.usuario === 'admin' && this.senha === '12345') {
      console.log('Login autorizado! A redirecionar...');
      this.router.navigate(['/home']);
    } else {
      alert('usuário ou senha incorretos');
      this.senha = ''; 
    }
  }
}