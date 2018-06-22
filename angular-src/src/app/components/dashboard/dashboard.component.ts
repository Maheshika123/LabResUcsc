import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {Router} from '@angular/router'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  labname:String;
  description:String;
  lablist = [];

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    
  ) { }

  ngOnInit() {
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });
    this.labname='';
    this.description='';
    
  }

  onLabSubmit(){
    const lab = {
      labname:this.labname,
      description:this.description
     
    }
    console.log(lab); 
    if(!this.validateService.validateLab(lab)){
        console.log(lab.labname);
        console.log(lab.description);
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Please fill Requied Fields"], 
           dismissible: true, 
           timeout: 5000,
           type: 'danger'
         });
         return false;
      }

      this.labService.registerLab(lab).subscribe(data => {
        if(data.success) {
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Lab has been entered Successfully"], 
            dismissible: true, 
            timeout: 5000,
            type: 'success'
         }); 
          this.ngOnInit();
          this.router.navigate(['/dashboard']); 
          
        
  
        } else {
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Something went wrong"], 
           dismissible: true, 
           timeout: 5000,
           type: 'danger'
         });  
         this.router.navigate(['/dashboard']); 
        }
      });
      
      
    
}

  
onLabDelete(id) {
  this.labService.deletelab(id).subscribe(data =>{
    if(data.success){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Lab has been deleted Successfully"], 
        dismissible: true, 
        timeout: 5000,
        type: 'success'
     }); 
     this.ngOnInit();
    } else {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Something went wrong"], 
        dismissible: true, 
        timeout: 5000,
        type: 'danger'
     }); 
    }
  })
}
  

}
