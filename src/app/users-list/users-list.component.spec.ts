import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsersListComponent } from './users-list.component';
import { UserService } from '../user.service';
import { User } from '../user';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let userService: UserService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [UsersListComponent],
      providers: [UserService]
    }).compileComponents();

    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch and display users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' }
    ];

    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));
    component.ngOnInit();
    fixture.detectChanges();

    const userElements = fixture.nativeElement.querySelectorAll('li');
    expect(userElements.length).toEqual(mockUsers.length);
    expect(userElements[0].textContent).toContain(mockUsers[0].name);
    expect(userElements[1].textContent).toContain(mockUsers[1].name);
  });

  it('should navigate to user details when a user is clicked', () => {
    spyOn(router, 'navigate');

    const userId = 1;
    component.goToUserDetails(userId);
    expect(router.navigate).toHaveBeenCalledWith(['/user', userId]);
  });
});
