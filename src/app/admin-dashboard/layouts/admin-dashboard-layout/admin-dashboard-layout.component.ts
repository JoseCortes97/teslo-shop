import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet],
  templateUrl: './admin-dashboard-layout.component.html',
})
export class AdminDashboardLayoutComponent {
  authService = inject(AuthService);
}
