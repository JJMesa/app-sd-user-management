import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent  implements OnInit {
  @Input() user: User = {} as User;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder
    , private userService: UserService)
  {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fillForm();
  }

  async fillForm(){
    this.userForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
    });

  }

  onSubmit() {
    var formValue = this.userForm.value;

    const employeeData: User = {
      userId: this.user.userId === undefined ? 0 : this.user.userId,
      name: formValue.name,
      lastName: formValue.lastName
    };

    if (this.user.userId === 0 || this.user.userId === undefined) {
      this.createUser(employeeData);
    }else{
      this.updateUser(employeeData);
    }
  }

  createUser(userData: User) {
    this.userService.createUser(userData).subscribe({
      next: (json) => {
        alert('Usuario creado correctamente');
        this.closeModal.emit();
      },
      error: (error) => {
        alert(error.error.errors[0]);
      }
    });
  }

  updateUser(userData: User) {
    this.userService.updateUser(this.user.userId, userData).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.closeModal.emit();
      },
      error: (error) => {
        alert(error.error.errors[0]);
      }
    });
  }

  closeSection(){
    this.closeModal.emit();
  }
}
