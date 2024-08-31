import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-investment-data',
  standalone: true,
  imports: [],
  templateUrl: './investment-data.component.html',
  styleUrl: './investment-data.component.css'
})
export class InvestmentDataComponent {

  // constructor(private toastr: ToastrService) { }

  calculateTax() {
    // Personal Details
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const designation = (document.getElementById('designation') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const gender = (document.getElementById('gender') as HTMLInputElement).value;
    const seniorcitizen = (document.getElementById('seniorcitizen') as HTMLInputElement).value;
    const pfapplicable = (document.getElementById('pfapplicable') as HTMLInputElement).value;

    this.Income();

    // alert('its working name : ' + name + ' ,designation :' + designation + ' ,address : ' + address + ' ,gender : ' + gender + ' ,seniorcitizen : ' + seniorcitizen + ' ,pfapplicable : ' + pfapplicable);
  }

  GetUS80C() {
    let total_allowed = 0;
    let actual_amount = 0;
    const ppfGpf = (document.getElementById('ppfGpf') as HTMLInputElement).value;
    const rentarrears = (document.getElementById('rentarrears') as HTMLInputElement).value;
    const sukanyadeposit = (document.getElementById('sukanyadeposit') as HTMLInputElement).value;
    const lic = (document.getElementById('lic') as HTMLInputElement).value;
    const gisncs = (document.getElementById('gisncs') as HTMLInputElement).value;
    const postoffice = (document.getElementById('postoffice') as HTMLInputElement).value;
    const other = (document.getElementById('other') as HTMLInputElement).value;
    const npsoffice = (document.getElementById('npsoffice') as HTMLInputElement).value;

  }

  GetUS80CCD() {
    let total_allowed = 0;
    let actual_amount = 0;
    const nps = (document.getElementById('nps') as HTMLInputElement).value;
  }

  GetUS80D() {
    let total_allowed = 0;
    let actual_amount = 0;
    const selfInsurance = (document.getElementById('selfInsurance') as HTMLInputElement).value;
    const parentsInsuranceBelow60 = (document.getElementById('parentsInsuranceBelow60') as HTMLInputElement).value;
    const parentsIsAbove60 = (document.getElementById('parentsIsAbove60') as HTMLInputElement).value;


  }

  GetUS80DD() {
    let total_allowed = 0;
    let actual_amount = 0;
    const handicappedDependent = (document.getElementById('handicappedDependent') as HTMLInputElement).value;
  }

  GetUS80E() {
    let total_allowed = 0;
    let actual_amount = 0;
    const educationLoanInterest = (document.getElementById('educationLoanInterest') as HTMLInputElement).value;
  }

  GetUS80G() {
    let total_allowed = 0;
    let actual_amount = 0;
    const donation = (document.getElementById('donation') as HTMLInputElement).value;
  }

  GetUS80U() {
    let total_allowed = 0;
    let actual_amount = 0;
    const physicalDisability = (document.getElementById('physicalDisability') as HTMLInputElement).value;
  }

  GetUS241B() {
    let total_allowed = 0;
    let actual_amount = 0;
    const housingLoanInterest = (document.getElementById('housingLoanInterest') as HTMLInputElement).value;
  }

  GetUS80EEA() {
    let total_allowed = 0;
    let actual_amount = 0;
    const additionalHomeLoanInterest = (document.getElementById('additionalHomeLoanInterest') as HTMLInputElement).value;
  }

  GetUS80EEB() {
    let total_allowed = 0;
    let actual_amount = 0;
    const electricVehicleLoanInterest = (document.getElementById('electricVehicleLoanInterest') as HTMLInputElement).value;
  }

  GetUS80GG() {
    let total_allowed = 0;
    let actual_amount = 0;
    const excessRentPaid = (document.getElementById('excessRentPaid') as HTMLInputElement).value;
  }

  Income() {
    let total_allowed = 0;
    let actual_amount = 0;
    const yearlySalary = Number((document.getElementById('yearlySalary') as HTMLInputElement).value);
    const bonus = Number((document.getElementById('bonus') as HTMLInputElement).value);
    const houseproperty = Number((document.getElementById('houseproperty') as HTMLInputElement).value);
    const capitalgain = Number((document.getElementById('capitalgain') as HTMLInputElement).value);
    const othersource = Number((document.getElementById('othersource') as HTMLInputElement).value);

    actual_amount = yearlySalary + bonus + houseproperty + capitalgain + othersource;
    if (actual_amount < 90000) {
      alert("Minimum Income Value should be 90000");
      // this.toastr.error("Minimum Income Value should be 90000");
    }
  }

}
