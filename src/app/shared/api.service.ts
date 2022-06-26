import { HttpClient } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { studentModel } from './studentmodel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  poststudents(data:any){
    return this.http.post<any>('http://localhost:3000/posts',data).pipe(map((res:any)=>
    {
      return res;
    }))

  }
  getstudents(){
    return this.http.get<any>('http://localhost:3000/posts').pipe(map((res:any)=>{
      return res;
    }))
  }
  updatestudents(data:any,id:number){
    return this.http.put<any>('http://localhost:3000/posts/'+id,data).pipe(map((res:any)=>
    {
      return res;
    }))
  }
  deletestudents(id:number){
    return this.http.delete<any>('http://localhost:3000/posts/'+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
