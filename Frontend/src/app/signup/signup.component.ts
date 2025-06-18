import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private UserService:UserService,private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignup() {
    console.log('Signup data:', this.signupForm.value);
    if (this.signupForm.valid) {
    this.UserService.signup(this.signupForm.value).subscribe({
      next: res => this.router.navigate(['/user']),
      error: err => alert(err.error.message)
    });
  }
  }
}
