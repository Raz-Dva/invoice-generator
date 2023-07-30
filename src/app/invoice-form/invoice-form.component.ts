import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-invoice-form',
    templateUrl: './invoice-form.component.html',
    styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent {

  form = this.fb.group({
      invoiceForm: this.fb.array( new Array(this.createFormGroup() ))
  });

  get invoiceForm(): FormArray {
      return this.form.controls.invoiceForm as FormArray;
  }

  constructor(private fb: FormBuilder, private router:Router, private _snackBar: MatSnackBar) { }

  addFormGroup(): void{
      this.invoiceForm.push(this.createFormGroup());
  }

  deleteFormGroup(lessonIndex: number): void{
      this.invoiceForm.removeAt(lessonIndex);
  }

  createFormGroup(): FormGroup{
      return this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
          count: ['1', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(100)]],
          price: ['0', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(1000000)]],
      })
  }

  submit(): void{
      if (this.form.valid && this.invoiceForm.length) {
          this.router.navigateByUrl('/preview', { state: this.form.value });
      }
      if (!this.invoiceForm.length) {
          this._snackBar.open('Please add items', 'Ok')
      }
  }
}
