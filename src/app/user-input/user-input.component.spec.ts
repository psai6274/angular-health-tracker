import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserInputComponent } from './user-input.component';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';
import { WorkoutListComponent } from '../workout-list/workout-list.component';

class MockWorkoutService {
  addOrUpdateUser(userName: string, workout: { type: string; minutes: number }) {}
}

class MockRouter {
  navigate(commands: any[]) {}
}

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;
  let workoutService: WorkoutService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UserInputComponent, WorkoutListComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addOrUpdateUser and resetForm on onSubmit', () => {
    spyOn(workoutService, 'addOrUpdateUser');
    spyOn(component, 'resetForm');

    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.onSubmit();

    expect(workoutService.addOrUpdateUser).toHaveBeenCalledWith('John Doe', { type: 'Running', minutes: 30 });
    expect(component.resetForm).toHaveBeenCalled();
  });

  it('should reset form fields on resetForm', () => {
    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.resetForm();

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBe(0);
  });

  it('should navigate to workout list', () => {
    spyOn(router, 'navigate');

    component.navigateToWorkoutList();

    expect(router.navigate).toHaveBeenCalledWith(['/workouts']);
  });
});
