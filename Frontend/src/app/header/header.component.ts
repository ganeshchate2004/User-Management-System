import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatNavList,
    RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) { }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }






}





// !null → true

// !someString → false

// !!value negates the negation, converting any value to a boolean:

// !!null → false

// !!'abc123' → true











