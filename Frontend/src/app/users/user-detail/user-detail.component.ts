import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,DatePipe,
    RouterLink,
   
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  id: string | null = '';
  userData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      
           if (this.id) {
        this.fetchUsers(this.id);
      }
    });
  }

  fetchUsers(id: string) {
         this.userService. getUserById(id).subscribe(data => {
    this.userData = data
  });


  }



// In your component class
getStatusIcon(status: string): string {
  switch(status?.toLowerCase()) {
    case 'active': return 'check_circle';
    case 'inactive': return 'pause_circle';
    case 'on leave': return 'beach_access';
    default: return 'help';
  }
}

editProfile() {
  
}





 
}


