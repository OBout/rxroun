import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  goToUserDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
