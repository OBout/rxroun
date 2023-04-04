import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from './user';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user by ID', () => {
    const mockUser: User = { id: 1, name: 'User 1', email: 'user1@example.com' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
