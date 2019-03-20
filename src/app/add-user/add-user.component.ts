import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/User';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: []
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  users_list: IUser[];
  user_keyed: IUser;
  filtered_users_list: IUser[];
  editable: boolean;
  edit_id: any;
  search_key: string;
  error: string;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    // private filterUserPipe: FilterUserPipe
    ) { }

  ngOnInit() {
    this.createForm();
    this.getUsersList();
  }

  createForm() {
    this.addUserForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      employeeId: [null, Validators.required],
    });
  }

  onSubmit() {
    console.log('user submitted');
    this.user_keyed = this.addUserForm.value;
    console.log(this.user_keyed);
    this.userService.addUser(this.user_keyed).subscribe(data => {
      this.addUserForm.reset();
      this.getUsersList();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error)
    });
  }

  getUsersList() {
    this.users_list = [];
    this.userService.getusers().subscribe(data => {
      this.users_list = data;
      this.filtered_users_list = this.users_list;
      // console.log(this.users_list)
    }, error => {
      console.log(error);
    });
  }

  sort(basis) {
    // sort by employeeId
    if (basis == 'employeeId') {
      this.filtered_users_list.sort((a, b) => {
        return +a.employeeId - +b.employeeId;
      });
    } else if (basis == 'firstName') {
      // sort by firstName
      this.filtered_users_list.sort((a, b) => {
        var nameA = a.firstName.toUpperCase();
        var nameB = b.firstName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      // sort by lastName
      this.filtered_users_list.sort((a, b) => {
        var nameA = a.lastName.toUpperCase();
        var nameB = b.lastName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
  }

  onDelete(user:IUser) {
    console.log(user)
    this.userService.deleteUser(user).subscribe(data => {
      this.getUsersList();
    }, error => {
      console.log(error);
    });
  }

  onEdit(user:IUser) {
    console.log('on edit user' + user);
    this.userService.getuser(user.id).subscribe(result => {
    this.addUserForm.setValue({
        "firstName": result[0].firstName,
        "lastName": result[0].lastName,
      "employeeId": result[0].employeeId
      });
      this.editable = true;
      this.edit_id = user.id;
    }, error => {
      console.log(error);
    });
  }

  onEditSave() {
    this.user_keyed.firstName = this.addUserForm.get('firstName').value;
    this.user_keyed.lastName = this.addUserForm.get('lastName').value;
    this.user_keyed.employeeId = this.addUserForm.get('employeeId').value;
    this.user_keyed.id = this.edit_id;
    console.log(this.user_keyed);
    this.userService.updateuser(this.user_keyed).subscribe(data => {
      this.editable = false;
      this.edit_id = null;
      this.addUserForm.reset();
      this.getUsersList();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error)
    });
  }

  cancelEdit() {
    this.addUserForm.reset();
    this.editable = false;
    this.edit_id = null;
    this.error = null;
  }

  clearFilter() {
    this.search_key = null;
    this.getUsersList();
  }

  onSearch(text) {
    // this.filtered_users_list = this.filterUserPipe.transform(this.users_list, text)
  }

}