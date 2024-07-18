import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';


interface User {
  id: number;
  name: string;
  workouts: { type: string; minutes: number }[];
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.scss'
})

export class WorkoutListComponent implements OnInit {
  searchTerm = '';
  selectedType = '';
  uniqueTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  users: User[] = [];
  filteredUsers: User[] = [];
  currentPage = 1; // Start from 1 instead of 0 for user-friendliness
  itemsPerPage = 5;
  totalPages = 0;
  selectedUserWorkouts: { type: string; minutes: number }[] = [];
  itemsPerPageOptions = [1, 2, 3, 4, 5];



constructor(private workoutService: WorkoutService,  private router: Router) {
    this.users = this.workoutService.getUsers();
    this.filteredUsers = [...this.users];
    this.calculateTotalPages();
}

ngOnInit(): void {
    this.calculateTotalPages();
}


public calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const nameMatches = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const typeMatches = !this.selectedType || user.workouts.some(workout => workout.type === this.selectedType);
      return nameMatches && typeMatches;
    });
    this.currentPage = 1; // Reset to first page after filtering
    this.calculateTotalPages();
   
    
  }
  
 




nextPage(): void {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
    }
}

prevPage(): void {
    if (this.currentPage > 1) {
        this.currentPage--;
    }
}



changeItemsPerPage(itemsPerPage: number): void {
    const oldItemsPerPage = this.itemsPerPage;
    this.itemsPerPage = Number(itemsPerPage);
    this.calculateTotalPages();
    const firstItemIndex = (this.currentPage - 1) * oldItemsPerPage;
    this.currentPage = Math.floor(firstItemIndex / this.itemsPerPage) + 1;
  }

   navigateToChart(): void {
    this.router.navigate(['/charts']);
  }


}



  
