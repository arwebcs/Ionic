import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent implements OnInit {
  toggle: any = 0;
  addUser!: FormGroup;
  statusCode: number = 0;
  nameErr: string = '';
  genderErr: string = '';
  emailErr: string = '';
  profilepicErr: string = '';
  propic!: File;
  message: string = '';
  color: string = '';

  constructor(private userSrv: UsersService) {}

  getTog(event: Event) {
    this.toggle = event;
  }

  formInit() {
    this.addUser = new FormGroup({
      full_name: new FormControl(''),
      email_id: new FormControl(''),
      gender: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.formInit();
  }

  uploadFiles(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.propic = file;
  }

  save() {
    var sendData: any = new FormData();

    sendData.append('data', JSON.stringify(this.addUser.value));
    sendData.append('profile_img', this.propic ?? new File([], ''));

    this.userSrv.addUser(sendData).subscribe(
      (result: any) => {
        this.message = '';
        this.nameErr = '';
        this.genderErr = '';
        this.emailErr = '';
        this.profilepicErr = '';
        this.message = result.message;
        this.formInit();
        this.color = 'color:green';
      },
      (err: HttpErrorResponse) => {
        this.color = 'color:red';
        this.statusCode = err.error.statusCode;
        if (this.statusCode == 500) {
          this.message = '';
          this.nameErr = '';
          this.genderErr = '';
          this.emailErr = '';
          this.profilepicErr = '';
          this.message = err.error.message;
        } else {
          this.message = '';
          this.nameErr = '';
          this.genderErr = '';
          this.emailErr = '';
          this.profilepicErr = '';

          this.nameErr = err.error.errors?.full_name;
          this.genderErr = err.error.errors?.gender;
          this.emailErr = err.error.errors?.email_id;
          this.profilepicErr = err.error.errors?.profile_img;

          this.message = err.error.message;
        }
      }
    );
  }
}
