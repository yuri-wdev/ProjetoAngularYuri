import { Routes } from '@angular/router';
// Certifique-se que os caminhos dos arquivos estão corretos conforme sua estrutura de pastas
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  // 1. Rota padrão: Se o caminho for vazio (''), redireciona para o Login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 2. Rotas da Aplicação
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'dashboard', component: Dashboard },

  // 3. (Opcional) Rota Curinga: Qualquer URL desconhecida redireciona para o Login
  { path: '**', redirectTo: '/login' }
];