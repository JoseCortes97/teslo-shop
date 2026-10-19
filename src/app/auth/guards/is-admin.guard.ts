import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  // Espera a que se resuelva la sesión (ajusta al método que tengas)
  await firstValueFrom(authService.checkSession());

  // Redirige a una ruta que NO tenga este guard
  return authService.isAdmin();
};
