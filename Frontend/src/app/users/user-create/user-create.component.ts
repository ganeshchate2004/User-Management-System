import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  countries = ['India', 'USA', 'UK'];
  departments = ['Engineering', 'HR', 'Marketing'];
  statusOptions = ['Active', 'Inactive'];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      skills: this.fb.array([this.fb.control('')]),
      bio: [''],
      salary: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: res => {
          alert('User created!');
          this.initializeForm();
          this.router.navigate(['/user']);
        },
        error: err => alert('Error saving user!')
      });
    }
  }
}








