import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserDetailsComponent],
      providers: [
        UserService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 1 } } }
        }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch and display user details based on the provided route parameter', () => {
    const mockUser: User = { id: 1, name: 'User 1', email: 'user1@example.com' };

    spyOn(userService, 'getUserById').and.returnValue(of(mockUser));
    component.ngOnInit();
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('h2');
    const emailElement = fixture.nativeElement.querySelector('p');

    expect(nameElement.textContent).toContain(mockUser.name);
    expect(emailElement.textContent).toContain(mockUser.email);
  });

  it('should handle invalid IDs gracefully', () => {
    spyOn(userService, 'getUserById').and.returnValue(of(null as unknown as User));
    component.ngOnInit();
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('h2');
    const emailElement = fixture.nativeElement.querySelector('p');

    expect(nameElement).toBeNull();
    expect(emailElement).toBeNull();
  });
});
