import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { FooterComponent } from './Layers/footer/footer.component';
import { NavbarComponent } from './Layers/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
//breadCrumb
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { BreadcrumbsComponent } from './Layers/breadcrumbs/breadcrumbs.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { AuthJWTTokenInterceptor } from './interceptors/auth-jwttoken.interceptor';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    NgxSpinnerModule.forRoot({
      type:'square-jelly-box'
    })
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    NgxSpinnerModule],
    providers:[
      {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthJWTTokenInterceptor,
        multi:true
      }, 
      {
        provide:HTTP_INTERCEPTORS,
        useClass:ErrorHandlingInterceptor,
        multi:true
      },      
      {
        provide:HTTP_INTERCEPTORS,
        useClass:LoadingInterceptor,
        multi:true
      }
    ]
})
export class CoreModule { }
