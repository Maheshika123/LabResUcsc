import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import { Profile } from 'selenium-webdriver/firefox';
import {JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LabService {
  authToken:any;
  lab:any;
  constructor(
    private http:Http
  ) { }
  
  registerLab(lab){
    console.log('t');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labs/Newlab',lab,{headers:headers})
    .pipe(map(res => res.json()));

  }
 
  getAllLabs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/labs/alllabs',{headers:headers})
      .pipe(map(res => res.json()));
  }

  deletelab(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/labs/'+id,{headers:headers})
      .pipe(map(res => res.json()));
  }
editlab(id){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.delete('http://localhost:3000/labs/editelab'+id,{headers:headers})
  .pipe(map(res => res.json()));
  
}

}


