import { PaginatePipe } from './paginate.pipe';
import { TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { FormsModule } from '@angular/forms';

describe('PaginatePipe', () => {
  let pipe: PaginatePipe;

  beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [WorkoutListComponent, PaginatePipe], // Declare the pipe here
    imports: [FormsModule] 
  });
  pipe = new PaginatePipe();
});

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should paginate correctly', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const config = { itemsPerPage: 3, currentPage: 1 };
    const result = pipe.transform(data, config);
    expect(result).toEqual([1, 2, 3]);
  });

  

  it('should paginate correctly for different pages', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const config = { itemsPerPage: 3, currentPage: 2 };
    const result = pipe.transform(data, config);
    expect(result).toEqual([4, 5, 6]);
  });

  it('should handle edge cases', () => {
    const data = [1, 2, 3, 4, 5];
    
    // Testing with an out of range page number
    const configOutOfRange = { itemsPerPage: 10, currentPage: 2 };
    const resultOutOfRange = pipe.transform(data, configOutOfRange);
    expect(resultOutOfRange).toEqual([]);

    // Testing with an empty array
    const configEmptyArray = { itemsPerPage: 3, currentPage: 1 };
    const resultEmptyArray = pipe.transform([], configEmptyArray);
    expect(resultEmptyArray).toEqual([]);
    
    // Testing with itemsPerPage of 0
    const configZeroItemsPerPage = { itemsPerPage: 0, currentPage: 1 };
    const resultZeroItemsPerPage = pipe.transform(data, configZeroItemsPerPage);
    expect(resultZeroItemsPerPage).toEqual([]);
  });
});
