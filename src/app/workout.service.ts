import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  public static readonly STORAGE_KEY = 'userData';


  constructor(private http: HttpClient) { }

  

 
  


  /**
   * Adds a new user along with their initial workout entry.
   * @param name User's name
   * @param workouts Array of workout objects
   */
  addOrUpdateUser(name: string, workout: { type: string; minutes: number }): void {
    let userData = this.getUsers();
    const userIndex = userData.findIndex(user => user.name.toLowerCase() === name.toLowerCase());

    if (userIndex !== -1) {
      const existingUser = userData[userIndex];
      const workoutIndex = existingUser.workouts.findIndex(w => w.type === workout.type);

      if (workoutIndex !== -1) {
        // Update existing workout type
        existingUser.workouts[workoutIndex].minutes += workout.minutes;
      } else {
        // Add new workout type
        existingUser.workouts.push(workout);
      }
    } else {
      // Add new user
      userData.push({
        id: Date.now(), // Simple ID generation using timestamp
        name,
        workouts: [workout]
      });
    }

    localStorage.setItem(WorkoutService.STORAGE_KEY, JSON.stringify(userData));
  }

  /**
   * Retrieves all users and their workouts from localStorage.
   * @returns Array of user objects
   */
  getUsers(): { id: number; name: string; workouts: { type: string; minutes: number }[] }[] {
    const userDataString = localStorage.getItem(WorkoutService.STORAGE_KEY);
    return userDataString ? JSON.parse(userDataString) : [];
  }

  /**
   * Updates an existing user's workout entries.
   * This method finds the user by ID and replaces their workouts array.
   * @param userId User's unique identifier
   * @param newWorkouts Updated array of workout objects
   */
  updateUserWorkouts(userId: number, newWorkouts: { type: string; minutes: number }[]): void {
    let userData = this.getUsers();
    const userIndex = userData.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
      userData[userIndex].workouts = newWorkouts;
      localStorage.setItem(WorkoutService.STORAGE_KEY, JSON.stringify(userData));
    }
  }

  /**
   * Removes a user and their workouts from storage.
   * @param userId User's unique identifier
   */
  removeUser(userId: number): void {
    let userData = this.getUsers();
    userData = userData.filter(user => user.id !== userId);
    localStorage.setItem(WorkoutService.STORAGE_KEY, JSON.stringify(userData));
  }

  
  
}
