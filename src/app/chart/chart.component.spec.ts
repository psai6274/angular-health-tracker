import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { WorkoutService } from '../workout.service';

class MockWorkoutService {
  getUsers() {
    return [
      {
        id: 1,
        name: 'User 1',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'User 2',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Yoga', minutes: 90 }
        ]
      }
    ];
  }
}

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [{ provide: WorkoutService, useClass: MockWorkoutService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users on ngOnInit', () => {
    component.ngOnInit();
    expect(component.users.length).toBe(2);
    expect(component.users[0].id).toBe(1);
    expect(component.users[1].id).toBe(2);
  });

  it('should update chartData on user selection', () => {
    component.onUserSelect(1);
    expect(component.chartData.length).toBe(2);
    expect(component.chartData[0].name).toBe('Running');
    expect(component.chartData[0].value).toBe(30);
    expect(component.chartData[1].name).toBe('Cycling');
    expect(component.chartData[1].value).toBe(45);
  });

  it('should handle invalid user selection', () => {
    component.onUserSelect(999); // Non-existent user ID
    expect(component.chartData.length).toBe(0);
  });
});
