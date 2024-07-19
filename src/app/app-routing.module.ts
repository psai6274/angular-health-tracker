import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-workout', pathMatch: 'full' },
  { path: 'workouts', component: WorkoutListComponent },
  { path: 'add-workout', component: UserInputComponent },
  { path: 'charts', component: ChartComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
