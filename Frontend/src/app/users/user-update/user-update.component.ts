import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userForm!: FormGroup;
  id: string | null = null;
  countries = ['India', 'USA', 'UK'];
  departments = ['Engineering', 'HR', 'Marketing'];
  statusOptions = ['Active', 'Inactive'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initializeForm();

    if (this.id) {
      this.userService.getUserById(this.id).subscribe(user => {
        this.patchForm(user);
      });
    }
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
      skills: this.fb.array([]),
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

  addSkill(skill: string = ''): void {
    this.skills.push(this.fb.control(skill));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  patchForm(user: any): void {
    this.userForm.patchValue({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      department: user.department,
      position: user.position,
      bio: user.bio,
      salary: user.salary,
      country: user.country,
      address: user.address,
      zipCode: user.zipCode,
      status: user.status,
      startDate: user.startDate
    });

    this.skills.clear();
    if (user.skills && user.skills.length) {
      user.skills.forEach((skill: string) => this.addSkill(skill));
    } else {
      this.addSkill(); 
    }
  }

  submitForm(): void {
    if (this.userForm.valid && this.id) {
      this.userService.updateUser(this.id, this.userForm.value).subscribe({
        next: res => {
          alert('User updated successfully!');
          this.router.navigate(['/user']);
        },
        error: err => alert('Update failed!')
      });
    }
  }
}
