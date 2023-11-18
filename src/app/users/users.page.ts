import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/User.model';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.css'],
})
export class UsersPage implements OnInit {
  toggle: any = 0;
  statusCode: number = 0;
  listUsers: any = [];
  countList: string = '5';
  button: any = [];
  record: string = '5';
  filterText: string = '';
  optionNo: any = [];
  users: User[] = [];

  constructor(private userSrv: UsersService, private router: Router) {
    this.tableData();
    this.optionNo.push(5, 10, 50, 100);
  }

  ngOnInit() {}

  getTog(event: Event) {
    this.toggle = event;
  }

  tableData() {
    this.userSrv.listUsers('1', this.countList).subscribe(
      (result: any) => {
        this.statusCode = result?.statusCode;
        if (this.statusCode === 200) {
          const pageNo = Math.ceil(result?.total_records / result?.records);
          this.listUsers = result?.details;
          this.users = [];
          for (let user of this.listUsers) {
            const items = {
              UserID: user.user_id,
              Name: user.full_name,
              Gender: user.gender,
              Email: user.email_id,
              Image: `data:${user.profile_pic_type};base64,${user.profile_pic}`,
            };
            this.users.push(items);
          }

          for (let i = 1; i <= pageNo; i++) {
            this.button.push({ btn_id: i });
          }
        } else {
          this.button = [];
          this.users = [];
        }
      },
      (err: HttpErrorResponse): void => {
        this.button = [];
        this.users = [];
      }
    );
  }
  redirect(url: string) {
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }
  deleteUser(id: number) {
    this.userSrv.deleteUser(id).subscribe(
      (result: any) => {
        this.statusCode = result?.statusCode;
        this.button = [];
        this.listUsers = [];
        if (this.statusCode === 201) {
          this.router.navigate(['/user']);
          this.tableData();
        } else {
          this.router.navigate(['/user']);
          this.tableData();
        }
      },
      (err: HttpErrorResponse): void => {
        alert('Cannot delete');
        this.tableData();
      }
    );
  }

  displayList(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.userSrv.listUsers('1', val).subscribe(
      (result: any) => {
        this.listUsers = result?.details;
        const pageNo = Math.ceil(result?.total_records / result.records);
        this.listUsers = result?.details;
        this.users = [];
        for (let user of this.listUsers) {
          const items = {
            UserID: user.user_id,
            Name: user.full_name,
            Gender: user.gender,
            Email: user.email_id,
            Image: `data:${user.profile_pic_type};base64,${user.profile_pic}`,
          };
          this.users.push(items);
        }
        this.button = [];
        for (let i = 1; i <= pageNo; i++) {
          this.button.push({ btn_id: i });
        }
      },
      (err: HttpErrorResponse): void => {
        this.listUsers = [];
      }
    );
  }

  displayPageList(event: Event) {
    const val = (event.target as HTMLInputElement).value;

    this.userSrv.listUsers(val, this.record).subscribe(
      (result: any) => {
        this.listUsers = result?.details;
        const pageNo = Math.ceil(result?.total_records / +this.record);
        this.listUsers = result?.details;
        this.users = [];
        for (let user of this.listUsers) {
          const items = {
            UserID: user.user_id,
            Name: user.full_name,
            Gender: user.gender,
            Email: user.email_id,
            Image: `data:${user.profile_pic_type};base64,${user.profile_pic}`,
          };
          this.users.push(items);
        }
        this.button = [];
        for (let i = 1; i <= pageNo; i++) {
          this.button.push({ btn_id: i });
        }
      },
      (err: HttpErrorResponse): void => {
        this.listUsers = [];
      }
    );
  }
}
