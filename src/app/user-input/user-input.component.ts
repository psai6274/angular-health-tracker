import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})

export class UserInputComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService, private router: Router) {}

  onSubmit(): void {
    this.workoutService.addOrUpdateUser(this.userName, {type: this.workoutType, minutes: this.workoutMinutes});
    this.resetForm();
  }

  resetForm(): void {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }

  navigateToWorkoutList(): void {
    this.router.navigate(['/workouts']);
  }
}
