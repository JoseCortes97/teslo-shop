import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-front',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './store-front.component.html',
})
export class StoreFrontComponent {}
