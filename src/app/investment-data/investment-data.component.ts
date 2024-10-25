import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import html2pdf from 'html2pdf.js';

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

  CalculateBasicSalary() {
    const yearlySalary = Number((document.getElementById('yearlySalary') as HTMLInputElement).value);


    var s = ((yearlySalary) * (yearlySalary > 360000 ? 50 : 100));
    var calculatebasic = s > 0 ? (s / 100) : 0;
    var hra = (yearlySalary > 360000 ? (calculatebasic / 2) : 0);
    var specialAllowance = yearlySalary - (calculatebasic + hra);

    (document.getElementById("basicSalary") as HTMLInputElement).value = calculatebasic.toString();

    (document.getElementById("hra") as HTMLInputElement).value = hra.toString();

    (document.getElementById("special_allowance") as HTMLInputElement).value = specialAllowance.toString();


    const metrocity = (document.getElementById('metrocity') as HTMLInputElement).value;
    var x = calculatebasic * (metrocity == "yes" ? 0.5 : 0.4);
    (document.getElementById("basicSalary40") as HTMLInputElement).value = x.toString();
    (document.getElementById("actualHra") as HTMLInputElement).value = hra.toString();


    var actualrent = Number((document.getElementById('actualRent') as HTMLInputElement).value);

    var tenper_ofactualrent = actualrent == 0 ? 0 : (actualrent - (calculatebasic * 10 / 100));
    tenper_ofactualrent = tenper_ofactualrent < 0 ? 0 : tenper_ofactualrent;
    (document.getElementById("actualRentPaid") as HTMLInputElement).value = tenper_ofactualrent.toString();

    var min_hra = Math.min(tenper_ofactualrent, actualrent, hra, x);

    (document.getElementById("deductionAllowed") as HTMLInputElement).value = min_hra.toString();

  }

  downloadPage() {
    const element = document.getElementById('datacalculator');
    const options = {
      margin: 1,
      filename: 'investments_data.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (element) {
      html2pdf(element).from(element).set(options).save();
    } else {
      console.error('Element not found!');
    }
  }

}
