# Health Tracker

## Overview

Health Tracker is a web application designed to help users manage their workouts and track their progress. The app allows users to input workout details, view a list of workouts, filter and search through the list, and visualize data using charts.

## Live Demo

Check out the live demo [here](https://angular-health-tracker.netlify.app/add-workout).

  - Demo Data
    
    To fully experience the application, you need to provide at least six workout inputs. This is necessary to populate the workout list and chart functionalities.

## Features

- **User Input:** Add or update workout information with user names, workout types, and minutes.
- **Workout List:** View and filter a list of workouts. Paginate through the list and adjust the number of items per page.
- **Charts:** View workout data in a bar chart format with types on the X-axis and minutes on the Y-axis.

## Technologies Used

- **Angular 14+**: For building the single-page application.
- **ngx-pagination**: For pagination functionality.
- **ngx-charts**: For chart visualization.

## Setup

To get started with the project, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/health-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd health-tracker
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200` to see the application in action.

## Components

### UserInputComponent

- **Purpose**: Handles user input for adding or updating workouts.
- **Functionality**: Submits workout data to the `WorkoutService` and resets the form.

### WorkoutListComponent

- **Purpose**: Displays a list of workouts with filtering, searching, and pagination.
- **Functionality**: Allows users to view and filter workout data. Supports pagination and adjusting the number of items per page.

### ChartComponent

- **Purpose**: Displays workout data in a bar chart.
- **Functionality**: Allows users to select a user and view their workout data as a bar chart.

## Routes

- `/workouts`: Displays the workout list.
- `/add-workout`: Displays the form for adding or updating workouts.
- `/charts`: Displays the workout data in a bar chart.

## Testing

### Unit Test Coverage

https://img.shields.io/badge/%20!%5BCoverage%20Badge%5D(https%3A%2F%2Fimg.shields.io%2Fbadge%2FCoverage-76.08%2525-brightgreen)?style=for-the-badge&logo=slug

Run the tests using:

```bash
ng test


## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

Feel free to modify this template according to the specifics of your project and its requirements.
```
