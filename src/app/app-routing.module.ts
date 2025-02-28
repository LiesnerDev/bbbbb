import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
// Import other components as needed

const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent },
  // Define other routes here
  { path: '', redirectTo: '/add-employee', pathMatch: 'full' },
  { path: '**', redirectTo: '/add-employee' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }