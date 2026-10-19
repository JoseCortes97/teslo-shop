import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { statusAuthConst } from '../../../shared/utils/auth';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  authService = inject(AuthService);
  authStatus = statusAuthConst;
}
