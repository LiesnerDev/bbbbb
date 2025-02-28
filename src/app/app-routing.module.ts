import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeInsertComponent } from './pages/employee-insert/employee-insert.component';

const routes: Routes = [
  { path: 'insert-employee', component: EmployeeInsertComponent },
  // ... other routes
  { path: '', redirectTo: '/insert-employee', pathMatch: 'full' },
  { path: '**', redirectTo: '/insert-employee' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }