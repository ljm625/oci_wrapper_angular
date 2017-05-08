import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {QueryApi} from "../../services/api/api/QueryApi";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Router} from "@angular/router";
@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    @Input() username:string = '';
    @Input() password:string = '';
    loginFailed:boolean=false;
    @ViewChild('myModal') modalRef;

    constructor(private query: QueryApi,private cookie:CookieService,private router:Router) {

    }

    ngOnInit(): void {

    }
    public show(){
        this.modalRef.show();
    }
    validate(){
        console.log(this.cookie.getAll());
        this.query.login(this.username,this.password).subscribe(resp=>{
            console.log(resp);
            if(resp===401){
                console.log("Login Failed");
            }
            else{
                this.cookieSave();
                console.log(this.cookie.getAll());
                this.router.navigateByUrl('/');
            }
        },(err)=>{
            if (err === 'Unauthorized'){
                console.log("Front End Knew that it is unauthorized");
                this.loginFailed=true;
                this.password='';
            }
        })
    }
    cookieSave(){
        this.cookie.put('oci_session',btoa(this.username+':'+this.password))
    }
}
