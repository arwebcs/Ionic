import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../globals/variables';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(API_LINKS.LOGIN_URL, data).pipe(take(1));
  }

  isLoggedIn() {
    return (
      localStorage.getItem('username') != null &&
      localStorage.getItem('name') != null
    );
  }

  listUsers(pageNo: string = '', records: string = '') {
    const param = new HttpParams()
      .set('page_no', pageNo)
      .set('records', records);
    return this.http.get(API_LINKS.USER_URL, { params: param }).pipe(take(1));
  }

  listUsersByID(id: number) {
    const param = new HttpParams().set('id', id);
    return this.http.get(API_LINKS.USER_URL, { params: param }).pipe(take(1));
  }

  addUser(data: any) {
    return this.http.post(API_LINKS.USER_URL, data).pipe(take(1));
  }

  editUser(id: number, data: any) {
    const param = new HttpParams().set('id', id);
    return this.http
      .post(API_LINKS.USER_URL, data, { params: param })
      .pipe(take(1));
  }

  deleteUser(id: number) {
    const param = new HttpParams().set('id', id);
    return this.http
      .delete(API_LINKS.USER_URL, { params: param })
      .pipe(take(1));
  }
}
