import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number | null = null;
  chartData: ChartData[] = [];
  
  public view: [number, number] = [700, 300];
  public colorScheme = 'cool';
  public showLegend: boolean = true;
  public gradient: boolean = false;
  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Workout Type';
  public showYAxisLabel: boolean = true;
  public yAxisLabel: string = 'Minutes';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.users = this.workoutService.getUsers();
  }

 

  onUserSelect(userId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.chartData = user.workouts.map((workout: { type: any; minutes: any; }) => ({
        name: workout.type,
        value: workout.minutes
      }));
  }
}
}
