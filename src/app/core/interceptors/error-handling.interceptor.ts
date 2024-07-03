import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError,throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor{
  constructor(private toast:ToastrService,private router:Router){}
  //TODO handle errors
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error){
          const base = error.error;
          switch(base.StatusCode){

            case 401:
                this.toast.error(base?.Message);
              break;

            case 404:
                this.router.navigateByUrl('/notFound');
                this.toast.error(base?.Message);
                break;

            case 500:
              this.router.navigateByUrl('/serverError');
              this.toast.error(base?.Message);
              break;

            default:
              this.toast.error(base?.Message);
              break;
          }
        }
        return throwError(()=>{
          console.log(error);
          return error;
        });
      })
    );
  }
}
