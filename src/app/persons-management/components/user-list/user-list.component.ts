import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  sectionTrigger: boolean = false;
  user: User = {} as User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (jsonResponse) => {
        this.users = jsonResponse.data;
        this.sectionTrigger = false;
      },
      error: (error) => {
        alert(error.error.errors[0]);
      }
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (jsonResponse) => {
        this.user = jsonResponse.data;
        this.sectionTrigger = true;
      },
      error: (error) => {
        alert(error.error.errors[0]);
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (jsonResponse) => {
        console.log(jsonResponse);
        this.getAllUsers();
      },
      error: (error) => {
        alert(error.error.errors[0]);
      }
    });
  }

  changeSection(id: number = 0) {
    if (id > 0) {
      this.getUserById(id);
    } else {
      this.user = {} as User;
      this.sectionTrigger = true;
    }
  };

  backSection(){
    this.getAllUsers();
  }
}
