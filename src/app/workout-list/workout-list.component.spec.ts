import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../workout.service';

class MockWorkoutService {
  getUsers() {
    return [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Doe', workouts: [{ type: 'Yoga', minutes: 45 }] }
    ];
  }
}

class MockRouter {
  navigate(commands: any[]) {}
}

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutService: WorkoutService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutListComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users based on searchTerm and selectedType', () => {
    component.searchTerm = 'John';
    component.selectedType = 'Running';
    component.applyFilters();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });

  it('should paginate users correctly', () => {
    component.itemsPerPage = 1;
    component.applyFilters();
    expect(component.totalPages).toBe(2);

    component.nextPage();
    expect(component.currentPage).toBe(2);

    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should change items per page and update pagination', () => {
    component.itemsPerPage = 1;
    component.applyFilters();
    expect(component.totalPages).toBe(2);

    component.changeItemsPerPage(2);
    expect(component.itemsPerPage).toBe(2);
    expect(component.totalPages).toBe(1);
  });

  it('should navigate to charts page', () => {
    spyOn(router, 'navigate');
    component.navigateToChart();
    expect(router.navigate).toHaveBeenCalledWith(['/charts']);
  });
});
