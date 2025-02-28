import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeeRequest } from '../../core/models/employee-request.model';

@Component({
  selector: 'app-employee-insert',
  templateUrl: './employee-insert.component.html',
  styleUrls: ['./employee-insert.component.scss']
})
export class EmployeeInsertComponent {
  employeeForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,20}$/)]],
      age: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]{1,30}$/)]]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: EmployeeRequest = this.employeeForm.value;
      this.employeeService.addEmployee(employee).subscribe({
        next: (response) => {
          this.successMessage = 'Employee record added successfully.';
          this.employeeForm.reset();
          // Optionally, you can navigate away or perform other actions here
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while adding the employee.';
        }
      });
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
    }
  }
}