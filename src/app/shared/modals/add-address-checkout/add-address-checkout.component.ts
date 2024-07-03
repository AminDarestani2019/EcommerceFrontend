import { Component, EventEmitter,OnInit, Output, forwardRef } from '@angular/core';
import { AccountService } from '../../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { IAddress } from '../../model/user';

@Component({
  selector: 'app-add-address-checkout',
  templateUrl: './add-address-checkout.component.html',
  styleUrl: './add-address-checkout.component.scss',
})
export class AddAddressCheckoutComponent implements OnInit{
  title: string = 'ثبت آدرس جدید';
  closeBtnName: string = 'بستن';
  @Output() newAddress = new EventEmitter<IAddress>();
  
  constructor(public bsModalRef:BsModalRef,private accountService:AccountService,private toast:ToastrService){}

  ngOnInit(): void {
    
    
  }

  form = new UntypedFormGroup(
    {
      number: new UntypedFormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
      isMain: new UntypedFormControl(true),
      state: new UntypedFormControl('',[Validators.required,Validators.minLength(3)]),
      city: new UntypedFormControl('',[Validators.required,Validators.minLength(3)]),
      firstName:  new UntypedFormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      lastName : new UntypedFormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      fullAddress:  new UntypedFormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]),
      postalCode:  new UntypedFormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
    }
  );
  onSubmit(){
    
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.accountService.addAddress(this.form.value).subscribe((newAddress)=>{
      this.newAddress.emit(newAddress);
      this.toast.success('آدرس با موفقیت اضافه گردید');
      this.bsModalRef.hide();
    });
  }
}
