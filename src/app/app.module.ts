import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for forms
// import { ChartsModule } from 'ngx-charts'
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartComponent } from './chart/chart.component';
import { UserInputComponent } from './user-input/user-input.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { PaginatePipe } from './paginate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    UserInputComponent,
    WorkoutListComponent,
    PaginatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule
    // ChartsModule
  ],
  // exports: [PaginatePipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
