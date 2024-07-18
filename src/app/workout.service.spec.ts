import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let httpMock: HttpTestingController;
  let storageSpy: jasmine.Spy;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutService]
    });

    service = TestBed.inject(WorkoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 // src/app/workout.service.spec.ts

it('should add a new user and store it in localStorage', () => {
    const name = 'John Doe';
    const workout = { type: 'Running', minutes: 30 };

    // Call the method
    service.addOrUpdateUser(name, workout);

    // Check localStorage.setItem was called with the correct arguments
    const callArgs = storageSpy.calls.mostRecent().args;
    const userData = JSON.parse(callArgs[1]);
    expect(callArgs[0]).toBe(WorkoutService.STORAGE_KEY);

    // Check if the user data is added correctly
    expect(userData.length).toBeGreaterThan(0); // Ensure there is at least one user

    const addedUser = userData.find((user: { name: string; }) => user.name.toLowerCase() === name.toLowerCase());
    expect(addedUser).toBeTruthy();
    expect(addedUser.workouts).toContain(workout);

    // Optionally check the id field if you want to validate its presence
    expect(addedUser.id).toBeDefined(); // Ensure id is defined
  });


  it('should get users', () => {
    const userData = [{ id: 1, name: 'John Doe', workouts: [] }];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userData));
    const result = service.getUsers();

    expect(result).toEqual(userData);
  });

  it('should update user workouts', () => {
    const userId = 1;
    const newWorkouts = [{ type: 'Swimming', minutes: 45 }];

    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(service, 'getUsers').and.returnValue([{ id: userId, name: 'John Doe', workouts: [] }]);

    service.updateUserWorkouts(userId, newWorkouts);

    expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify([{
      id: userId,
      name: 'John Doe',
      workouts: newWorkouts
    }]));
  });

  it('should remove user', () => {
    const userId = 1;

    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(service, 'getUsers').and.returnValue([{ id: userId, name: 'John Doe', workouts: [] }]);

    service.removeUser(userId);

    expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify([]));
  });
});
