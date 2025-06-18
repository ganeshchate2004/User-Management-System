
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatTableModule, } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../shared/services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';

import { inject } from '@angular/core';

import { DeleteConfirmationDialogComponent } from '../../shared/diaglog/delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatIconModule,
    MatDialogModule,
     MatMenuModule ,MatButtonModule

  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email', 'department', 'position', 'status', 'id'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {

    this.userService.getAllUsers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }



  deleteUser(id: string) {

    this.userService.deleteUser(id).subscribe(data => {

      this.fetchUsers();
    });


  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  clearSearch() {
    this.filterInput.nativeElement.value = '';
    this.dataSource.filter = '';
  }


  private dialog = inject(MatDialog);
  userData: any;

  openDeleteDialog(id: string): void {
    this.userService.getUserById(id).subscribe(data => {
      this.userData = data
    });
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { name: this.userData.fullName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });


  }




}






