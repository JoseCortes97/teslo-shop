import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  const route = inject(Router);
  const isAuthenticated = await firstValueFrom(authService.checkSession());
  if (isAuthenticated) {
    route.navigateByUrl('/');
    return false;
  }
  return true;
};
