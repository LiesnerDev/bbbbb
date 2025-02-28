import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeeRequest } from '../../core/models/employee-request.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  employeeRequest: EmployeeRequest = {
    employeeID: null,
    employeeName: '',
    employeeAge: null,
    employeeAddress: ''
  };

  constructor(private employeeService: EmployeeService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.employeeService.addEmployee(this.employeeRequest).subscribe(
        response => {
          if (response.success) {
            alert('Employee record has been successfully added.');
            form.resetForm();
          } else {
            alert('Failed to add employee record.');
          }
        },
        error => {
          alert('An error occurred while adding the employee record.');
        }
      );
    }
  }
}