import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentModel } from '../shared/studentmodel';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  display = "none";
  formvalue!: FormGroup;
  studentobj: studentModel = new studentModel;
  studentdata: any;
  showAddbutton=false;
  showUpdateButton=false;
  constructor(private frombuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.frombuilder.group({
      name: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      subject: new FormControl('')
    })
    this.getallstudentdata();
  }
  clickAdd(){
    this.formvalue.reset();
   
    
    this.showUpdateButton=false;
  }
  openModal() {
    this.display = "block";
    this.showAddbutton=true;
  }
  onCloseHandled() {
    this.display = "none";
    this.formvalue.reset();
  }
  onSubmit() {

  }
  poststudentdetails(formvalue) {

    this.studentobj.name = this.formvalue.value.name;
    this.studentobj.email = this.formvalue.value.email;
    this.studentobj.mobile = this.formvalue.value.mobile;
    this.studentobj.subject = this.formvalue.value.subject;

    this.api.poststudents(this.studentobj).subscribe({
      next: (res) => {
        console.log(res);
        alert("posted successfully");
        this.getallstudentdata();
        this.formvalue.reset();
      }
    }), err => {
      alert(err.message);
    }
    this.display = "none";
  }
  getallstudentdata() {
    this.api.getstudents().subscribe({
      next: (res) => {
        this.studentdata = res;
        console.log(res);
      }
    })
  }
  deletestudentdata(stu: any) {
    this.api.deletestudents(stu.id).subscribe({
      next: (res) => {
        console.log(res);
        alert("deleted successfully");
        this.getallstudentdata();
      }
    })
  }
  openModalforEdit(){
  }
Editstudents(stu:any){
  this.showAddbutton=false;
  this.showUpdateButton=true;
  this.display="block";
  this.studentobj.id=stu.id;
  this.formvalue.controls['name'].setValue(stu.name);
  this.formvalue.controls['email'].setValue(stu.email);
  this.formvalue.controls['mobile'].setValue(stu.mobile);
  this.formvalue.controls['subject'].setValue(stu.subject);
}
  updatestudentdetails(){
    
    this.studentobj.name = this.formvalue.value.name;
    this.studentobj.email = this.formvalue.value.email;
    this.studentobj.mobile = this.formvalue.value.mobile;
    this.studentobj.subject = this.formvalue.value.subject;
    this.api.updatestudents(this.studentobj,this.studentobj.id).subscribe({next:(res)=>{
      alert("student data updated");
      this.getallstudentdata();
      this.formvalue.reset();
      this.display="none";
    }})

  }
}

