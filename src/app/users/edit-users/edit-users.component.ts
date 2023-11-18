import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'],
})
export class EditUsersComponent implements OnInit {
  toggle: any = 0;
  editUser!: FormGroup;
  userID: number = 0;
  statusCode: number = 0;
  gender: any = [];
  nameErr: string = '';
  genderErr: string = '';
  emailErr: string = '';
  profilepicErr: string = '';
  propic!: File;
  message: string = '';
  color: string = '';

  constructor(
    private userSrv: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.gender = ['Male', 'Female'];
    this.activatedRoute.params.subscribe((params) => {
      this.userID = params['userID'];
    });

    this.userSrv.listUsersByID(this.userID).subscribe(
      (result: any) => {
        const [data] = result.details;
        console.log(data);
        this.editUser = new FormGroup({
          full_name: new FormControl(data.full_name),
          email_id: new FormControl(data.email_id),
          gender: new FormControl(data.gender),
        });
      },
      (err: HttpErrorResponse) => {
        alert(err.error.message);
      }
    );
    this.formInit();
  }

  ngOnInit() {}

  getTog(event: Event) {
    this.toggle = event;
  }
  formInit() {
    this.editUser = new FormGroup({
      full_name: new FormControl(''),
      email_id: new FormControl(''),
      gender: new FormControl(''),
    });
  }

  uploadFiles(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.propic = file;
  }

  save() {
    var sendData: any = new FormData();

    sendData.append('data', JSON.stringify(this.editUser.value));
    sendData.append('profile_img', this.propic ?? new File([], ''));

    this.userSrv.editUser(this.userID, sendData).subscribe(
      (result: any) => {
        this.message = '';
        this.nameErr = '';
        this.genderErr = '';
        this.emailErr = '';
        this.profilepicErr = '';
        this.message = result.message;
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
          console.log(this.profilepicErr);
        }
      }
    );
  }
}
