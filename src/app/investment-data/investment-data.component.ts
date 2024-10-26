import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import html2pdf from 'html2pdf.js';
import { SharedLayoutComponent } from '../shared-layout/shared-layout.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-investment-data',
  standalone: true,
  imports: [SharedLayoutComponent],
  templateUrl: './investment-data.component.html',
  styleUrl: './investment-data.component.css'
})
export class InvestmentDataComponent {

  constructor(private router: Router) { }

  validate: boolean = true;
  amt80C: any = 0;
  amt80CD: any = 0;
  amt80D: any = 0;
  amt80DD: any = 0;
  amtUS80E: any = 0;
  amtUS80G: any = 0;
  amtUS80U: any = 0;
  amtUS241B: any = 0;
  amtUS80EEA: any = 0;
  amtUS80EEB: any = 0;
  amtOtherIncome: any = 0;
  yearlySalary: any = 0;
  hra_deduction_allowed: any = 0;
  api_json: any = {
    "personal_info": {
      "name": "",
      "designation": ""
    },
    "investments": [],
    "insurance": {
      "self": 0,
      "parents": 0,
      "ss": false
    },
    "donation": 0,
    "other": [],
    "income_source": {
      "salary": 0,
      "bonus": 0,
      "house_property": 0,
      "capital_gain": 0,
      "other": 0
    },
    "hra": {
      "actual_hra": 0,
      "deduction_allowed": 0,
      "metro_city": false
    },
    "tax_planning": {
      "financial_year": "",
      "tax_liability_potential_saving": {
        "current_taxable_income": "",
        "tax_liability_comparison_table": {
          "current": []
        }
      }
    }
  };

  // constructor(private toastr: ToastrService) { }

  Calculate() {
    this.validate = true;
    // Personal Details
    this.api_json.personal_info.name = (document.getElementById('name') as HTMLInputElement).value;
    this.api_json.personal_info.designation = (document.getElementById('designation') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const gender = (document.getElementById('gender') as HTMLInputElement).value;
    const seniorcitizen = (document.getElementById('seniorcitizen') as HTMLInputElement).value;
    const pfapplicable = (document.getElementById('pfapplicable') as HTMLInputElement).value;

    this.Income();
    if (this.validate) {
      this.GetUS80C();
      this.GetUS80CCD();
      this.GetUS80D();
      this.GetUS80DD();
      this.GetUS80E();
      this.GetUS80G();
      this.GetUS80U();
      this.GetUS241B();
      this.GetUS80EEA();
      this.GetUS80EEB();
      this.OtherIncome();
      this.CalculateTax();
    }

    // alert('its working name : ' + name + ' ,designation :' + designation + ' ,address : ' + address + ' ,gender : ' + gender + ' ,seniorcitizen : ' + seniorcitizen + ' ,pfapplicable : ' + pfapplicable);
  }


  CalculateTax() {
    // Region Start ::  Salary Components 
    // Determine the percentage based on the total salary
    const percentage = this.yearlySalary >= 360000 ? 0.5 : 1;
    // Calculate the final result and round to two decimal places
    let basicSalary = Math.round(this.yearlySalary * percentage * 100) / 100;
    console.log("Basic salary: " + basicSalary);

    // HRA 
    let hra = this.yearlySalary > 360000 ? (basicSalary / 2) : 0;
    console.log("HRA: " + hra)

    //Special Allowance
    let specialAllowance = this.yearlySalary - (basicSalary + hra);
    console.log("Special Allowance: " + specialAllowance);

    // Bonus Amount
    let bonus = Number((document.getElementById('bonus') as HTMLInputElement).value);


    let Gross = Math.round(bonus) + basicSalary + hra + specialAllowance;
    console.log("Gross Calculated: " + Gross);

    // Region End ::  Salary Components 


    // Region Start ::  Deduction From Salary

    const gender = (document.getElementById('gender') as HTMLInputElement).value;
    let monthlysalary = (this.yearlySalary < 0 || this.yearlySalary == 0) ? 0 : (this.yearlySalary / 12);
    monthlysalary = monthlysalary < 0 ? 0 : monthlysalary;

    let pt = gender == "male" ? (monthlysalary < 10000 ? 2100 : 2500) : (monthlysalary > 25000 ? 2500 : 0);
    pt = pt < 0 ? 0 : pt;
    console.log("PT :" + pt);

    let epf = Number((document.getElementById('epf') as HTMLInputElement).value);
    epf = epf < 0 ? 0 : epf;
    console.log("Epf :" + epf);

    let standard_exemption = Gross > 0 ? 50000 : 0;
    standard_exemption = standard_exemption < 0 ? 0 : standard_exemption;

    let hra_benifits = this.hra_deduction_allowed;
    hra_benifits = hra_benifits < 0 ? 0 : hra_benifits;

    console.log("HRAbenifits : " + hra_benifits);

    // Region End ::  Deduction From Salary

    // Region Start ::  Total Tax exemption 
    let total_tax_exemption_oldR = pt + epf + standard_exemption + hra_benifits;
    let total_tax_exemption_newR = standard_exemption;
    console.log("Total Tax Exemption for Old : " + total_tax_exemption_oldR + "  total_tax_exemption_new : " + total_tax_exemption_newR);
    // Region End ::  Total Tax exemption 

    // Region Start ::  Total Income From Salary

    let total_incomefromsalary_oldR = Gross > total_tax_exemption_oldR ? (Gross - total_tax_exemption_oldR) : 0;
    let total_incomefromsalary_newR = Gross > total_tax_exemption_newR ? (Gross - total_tax_exemption_newR) : 0;
    const houseproperty = Number((document.getElementById('houseproperty') as HTMLInputElement).value);
    const capitalgain = Number((document.getElementById('capitalgain') as HTMLInputElement).value);
    const othersource = Number((document.getElementById('othersource') as HTMLInputElement).value);

    // Region End ::  Total Income From Salary

    // Region Start :: Taxable Income 

    let gross_taxable_income_old = total_incomefromsalary_oldR + houseproperty + capitalgain + othersource;
    let gross_taxable_income_new = total_incomefromsalary_newR + houseproperty + capitalgain + othersource;

    console.log("Gross Taxable income OLD: " + gross_taxable_income_old + "Gross Taxable income NEW: " + gross_taxable_income_new);


    let OldDeductionAvailable = this.amt80C + this.amt80D + this.amt80CD + this.amt80DD + this.amtUS80E
      + this.amtUS80G + this.amtUS80U + this.amtUS241B + this.amtUS80EEA + this.amtUS80EEB + this.amtOtherIncome;

    console.log("amt80C = ", this.amt80C);
    console.log("amt80D = ", this.amt80D);
    console.log("amt80CD = ", this.amt80CD);
    console.log("amt80DD = ", this.amt80DD);
    console.log("amtUS80E = ", this.amtUS80E);
    console.log("amtUS80G = ", this.amtUS80G);
    console.log("amtUS80U = ", this.amtUS80U);
    console.log("amtUS241B = ", this.amtUS241B);
    console.log("amtUS80EEA = ", this.amtUS80EEA);
    console.log("amtUS80EEB = ", this.amtUS80EEB);
    console.log("amtOtherIncome = ", this.amtOtherIncome);

    console.log("Old Deduction Available: " + OldDeductionAvailable);
    let deductionOldR = OldDeductionAvailable;
    let deductionNewR = this.amt80CD;

    console.log("Deduction Old : " + deductionOldR + " New : " + deductionNewR);

    let total_taxableincome_old = total_incomefromsalary_oldR > deductionOldR ? (gross_taxable_income_old - deductionOldR) : 0;
    let total_taxableincome_new = total_incomefromsalary_newR > deductionNewR ? (gross_taxable_income_new - deductionNewR) : 0;

    console.log("Total Taxable income OLD: " + total_taxableincome_old + "Total Taxable income NEW: " + total_taxableincome_new);

    // Region End :: Taxable Income 


    // Region Start :: Calculate Tax Amount as per Tax Slab and Tax Rate for Old as well as New 

    let tax_slab0 = 0;

    let tax_slab1_old = (50000 - total_taxableincome_old) < 0 ? 2500 : 0;
    let tax_slab1_new = 0;

    let tax_slab2_old = (50000 - total_taxableincome_old) < 0 ? 10000 : 0;
    let tax_slab2_new = (70000 - total_taxableincome_new) < 0 ? 10000 : 0;

    let tax_slab3_old = (60000 - total_taxableincome_old) < 0 ? 20000 : (Math.max(0, (total_taxableincome_old - 500000) * 0.2));
    let tax_slab3_new = (70000 - total_taxableincome_new) < 0 ? 5000 : 0;

    let tax_slab4_old = (90000 - total_taxableincome_old) < 0 ? 60000 : (Math.max(0, (total_taxableincome_old - 600000) * 0.2));
    let tax_slab4_new = (90000 - total_taxableincome_new) < 0 ? 30000 : (total_taxableincome_new < 70000 ? 0 : Math.max(0, (total_taxableincome_new - 600000) * 0.1));

    let tax_slab5_old = (1000000 - total_taxableincome_old) < 0 ? 20000 : (Math.max(0, (total_taxableincome_old - 900000) * 0.2));
    let tax_slab5_new = (1000000 - total_taxableincome_new) < 0 ? 15000 : (Math.max(0, (total_taxableincome_new - 900000) * 0.15));

    let tax_slab6_old = (1200000 - total_taxableincome_old) < 0 ? 60000 : (Math.max(0, (total_taxableincome_old - 1000000) * 0.3));
    let tax_slab6_new = (1200000 - total_taxableincome_new) < 0 ? 30000 : (Math.max(0, (total_taxableincome_new - 1000000) * 0.15));

    let tax_slab7_old = (1500000 - total_taxableincome_old) < 0 ? 90000 : (Math.max(0, (total_taxableincome_old - 1200000) * 0.3));
    let tax_slab7_new = (1500000 - total_taxableincome_new) < 0 ? 60000 : (Math.max(0, (total_taxableincome_new - 1200000) * 0.2));

    let tax_slab8_old = (total_taxableincome_old) > 1500000 ? (total_taxableincome_old - 1500000) * 0.3 : 0;
    let tax_slab8_new = total_taxableincome_new < 1500000 ? 0 : (total_taxableincome_new - 1500000) * 0.3;

    let MarginalRelief_OR = 0;
    let MarginalRelief_NR = (total_taxableincome_new < 700000 ? 0 : (total_taxableincome_new > 727779 ? 0 : ((total_taxableincome_new - 700000) - (tax_slab1_new + tax_slab2_new + tax_slab3_new + tax_slab4_new))));


    let GrossPayableTaxOld = Math.round(tax_slab1_old + tax_slab2_old + tax_slab3_old + tax_slab4_old + tax_slab5_old + tax_slab6_old + tax_slab7_old + tax_slab8_old);
    let GrossPayableTaxNew = Math.round(tax_slab1_new + tax_slab2_new + tax_slab3_new + tax_slab4_new + tax_slab5_new + tax_slab6_new + tax_slab7_new + tax_slab8_new + MarginalRelief_NR);

    console.log("Gross Payable Tax Old Regim : " + GrossPayableTaxOld + " Gross Payable Tax New Regim : " + GrossPayableTaxNew);
    // Region End :: Calculate Tax Amount as per Tax Slab and Tax Rate for Old as well as New 

    let education_cess_old = Math.round(GrossPayableTaxOld * 4 / 100);
    let education_cess_new = Math.round(GrossPayableTaxNew * 4 / 100);

    let net_tax_payable_old = GrossPayableTaxOld + education_cess_old;
    let net_tax_payable_new = GrossPayableTaxNew + education_cess_new;

    let recommanded = net_tax_payable_old < net_tax_payable_new ? "old" : "new";

    // Calculate the effective tax rate
    const effectiveTaxRateOld = net_tax_payable_old / total_taxableincome_old;
    const effectiveTaxRateNew = net_tax_payable_new / total_taxableincome_new;

    const effectiveTaxRateOldPer = ((effectiveTaxRateOld * 100).toFixed(2) + '%');
    const effectiveTaxRateNewPer = ((effectiveTaxRateNew * 100).toFixed(2) + '%'); // Output 

    let json = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      pdf_base64: "",
      designation: (document.getElementById('designation') as HTMLInputElement).value,
      new_regime_tax: {
        effective_tax_rate: effectiveTaxRateNewPer,
        is_recommended: recommanded == "new" ? true : false,
        taxable_income: total_taxableincome_new,
        total_tax_payable: net_tax_payable_new
      },
      old_regime_tax: {
        effective_tax_rate: effectiveTaxRateOldPer,
        is_recommended: recommanded == "old" ? true : false,
        taxable_income: total_taxableincome_old,
        total_tax_payable: net_tax_payable_old
      }
    };

    this.api_json.tax_planning.tax_liability_potential_saving.tax_liability_comparison_table.current.push({
      "tax_regime": "Old",
      "tax_liability": "",
      "total_tax_payable": net_tax_payable_old.toString(),
      "taxable_income": total_taxableincome_old.toString(),
      "effective_tax_rate": effectiveTaxRateOldPer.toString(),
      "deductions": deductionOldR.toString(),
      "percentage": effectiveTaxRateOldPer.toString(),
      "recommended": recommanded == "old" ? true : false,

    });

    this.api_json.tax_planning.tax_liability_potential_saving.tax_liability_comparison_table.current.push({
      "tax_regime": "New",
      "tax_liability": "",
      "total_tax_payable": net_tax_payable_new.toString(),
      "taxable_income": total_taxableincome_new.toString(),
      "effective_tax_rate": effectiveTaxRateNewPer.toString(),
      "deductions": deductionNewR.toString(),
      "percentage": effectiveTaxRateNewPer.toString(),
      "recommended": recommanded == "new" ? true : false,

    });

    console.log("JSON Report", this.api_json);

    localStorage.setItem("data", JSON.stringify(json));
    this.router.navigate(['/tax']);


  }

  GetUS80C() {
    let total_allowed = 150000;
    let actual_amount = 0;
    const ppfGpf = Number((document.getElementById('ppfGpf') as HTMLInputElement).value);
    console.log("ppfGpf", ppfGpf);
    if (ppfGpf != 0) {
      this.api_json.investments.push({
        "title": "PPF/GPF",
        "value": ppfGpf.toString()

      })
    }

    const rentarrears = Number((document.getElementById('rentarrears') as HTMLInputElement).value);
    if (rentarrears != 0) {
      this.api_json.investments.push({
        "title": "Rent Arrears",
        "value": rentarrears.toString()

      })
    }
    const sukanyadeposit = Number((document.getElementById('sukanyadeposit') as HTMLInputElement).value);
    if (sukanyadeposit != 0) {
      this.api_json.investments.push({
        "title": "Sukanya deposit",
        "value": sukanyadeposit.toString()

      })
    }
    const lic = Number((document.getElementById('lic') as HTMLInputElement).value);
    if (lic != 0) {
      this.api_json.investments.push({
        "title": "LIC",
        "value": lic.toString()

      })
    }
    const gisncs = Number((document.getElementById('gisncs') as HTMLInputElement).value);
    if (gisncs != 0) {
      this.api_json.investments.push({
        "title": "GIS/NCS",
        "value": gisncs.toString()

      })
    }

    const tutionfees = Number((document.getElementById('tutionfees') as HTMLInputElement).value);
    if (tutionfees != 0) {
      this.api_json.investments.push({
        "title": "Tuition Fee ",
        "value": tutionfees.toString()

      })
    }

    const postoffice = Number((document.getElementById('postoffice') as HTMLInputElement).value);
    if (postoffice != 0) {
      this.api_json.investments.push({
        "title": "Post office time deposits",
        "value": postoffice.toString()

      })
    }
    const other = Number((document.getElementById('other') as HTMLInputElement).value);
    if (other != 0) {
      this.api_json.investments.push({
        "title": "Other",
        "value": other.toString()

      })
    }
    const npsoffice = Number((document.getElementById('npsoffice') as HTMLInputElement).value);
    if (npsoffice != 0) {
      this.api_json.investments.push({
        "title": "NPS (other than reimbursed by office)",
        "value": npsoffice.toString()

      })
    }

    actual_amount = (ppfGpf + rentarrears + sukanyadeposit + gisncs + tutionfees + postoffice + other + lic + other + npsoffice);

    this.amt80C = actual_amount;

  }

  GetUS80CCD() {
    let total_allowed = 50000;
    let actual_amount = Number((document.getElementById('nps') as HTMLInputElement).value);
    this.amt80CD = actual_amount;
    if (actual_amount != 0) {
      this.api_json.investments.push({
        "title": "NPS",
        "value": actual_amount.toString()

      })
    }
  }

  GetUS80D() {
    let total_allowed = 25000;
    let actual_amount = 0;
    let considered_amount = 0;
    const selfInsurance = Number((document.getElementById('selfInsurance') as HTMLInputElement).value);
    const parentsInsuranceBelow60 = (document.getElementById('parentsIsAbove60') as HTMLInputElement).value;
    const parentsInsurance = Number((document.getElementById('parentsInsurance') as HTMLInputElement).value);

    this.api_json.insurance.self = selfInsurance;
    this.api_json.insurance.parents = parentsInsurance;

    total_allowed = total_allowed + (parentsInsuranceBelow60 == "true" ? 50000 : 25000);
    actual_amount = (selfInsurance + parentsInsurance);
    considered_amount = (selfInsurance > 25000 ? 25000 : selfInsurance < 0 ? 0 : selfInsurance);
    considered_amount = considered_amount + (parentsInsuranceBelow60 == "true" ? (parentsInsurance > 50000 ? 50000 : parentsInsurance < 0 ? 0 : parentsInsurance) :
      (parentsInsurance > 25000 ? 25000 : parentsInsurance < 0 ? 0 : parentsInsurance));

    // alert("total_allowed = " + total_allowed + " actual_amount = " + actual_amount + " considered_amount = " + considered_amount)
    this.amt80D = considered_amount;

  }

  GetUS80DD() {
    let total_allowed = 0;
    let actual_amount = 0;
    const handicappedDependent = Number((document.getElementById('handicappedDependent') as HTMLInputElement).value);
    const disabilityPercentage = Number((document.getElementById('disabilityPercentage') as HTMLInputElement).value);

    if (handicappedDependent != 0) {
      this.api_json.other.push({
        "title": "Treatment of Handicapped dependent",
        "value": handicappedDependent.toString()

      })
    }

    actual_amount = handicappedDependent;
    total_allowed = disabilityPercentage < 0 ? 0 :
      disabilityPercentage < 80 ? (handicappedDependent < 0 ? 0 : handicappedDependent > 75000 ? 75000 : handicappedDependent) :
        (handicappedDependent < 0 ? 0 : handicappedDependent > 125000 ? 125000 : handicappedDependent);
    this.amt80DD = actual_amount;
    // alert('GetUS80DD : Actual amount ' + actual_amount + ' Total allowed ' + total_allowed + ' Disability Percentage ' + disabilityPercentage);

  }

  DisabilityPerchangeValidate() {
    const disabilityPercentage = Number((document.getElementById('disabilityPercentage') as HTMLInputElement).value);
    let val = disabilityPercentage < 0 ? 0 : disabilityPercentage > 100 ? 100 : disabilityPercentage;

    (document.getElementById("disabilityPercentage") as HTMLInputElement).value = val.toString();
  }

  GetUS80E() {
    const educationLoanInterest = Number((document.getElementById('educationLoanInterest') as HTMLInputElement).value);
    this.amtUS80E = educationLoanInterest;
    if (educationLoanInterest != 0) {
      this.api_json.other.push({
        "title": "Education Loan Interest",
        "value": educationLoanInterest.toString()

      })
    }
  }

  GetUS80G() {
    const donation = Number((document.getElementById('donation') as HTMLInputElement).value);
    this.amtUS80G = donation;
    this.api_json.donation = donation;
    if (donation != 0) {
      this.api_json.other.push({
        "title": "Donation",
        "value": donation.toString()

      })
    }
  }

  GetUS80U() {
    let total_allowed = 0;
    let actual_amount = 0;
    const physicalDisability = Number((document.getElementById('physicalDisability') as HTMLInputElement).value);
    const physicalDisabilityPer = ((document.getElementById('physicalDisabilityPer') as HTMLInputElement).value);

    actual_amount = physicalDisability;
    total_allowed = physicalDisabilityPer == "true" ?
      (physicalDisability < 0 ? 0 : physicalDisability > 125000 ? 125000 : physicalDisability) :
      (physicalDisability < 0 ? 0 : physicalDisability > 75000 ? 75000 : physicalDisability);
    this.amtUS80U = total_allowed;

    if (physicalDisability != 0) {
      this.api_json.other.push({
        "title": "Physical Disability",
        "value": physicalDisability.toString()

      })
    }

    // alert('GetUS80U : Actual amount ' + actual_amount + ' Total allowed ' + total_allowed + ' Disability Percentage ' + physicalDisabilityPer);

  }

  GetUS241B() {
    let total_allowed = 0;
    let actual_amount = 0;
    const housingLoanInterest = Number((document.getElementById('housingLoanInterest') as HTMLInputElement).value);
    const seniorcitizen = (document.getElementById('seniorcitizen') as HTMLInputElement).value;

    if (housingLoanInterest != 0) {
      this.api_json.other.push({
        "title": "Interest on Housing Loan",
        "value": housingLoanInterest.toString()

      })
    }

    actual_amount = housingLoanInterest;
    total_allowed = housingLoanInterest < 0 ? 0 : seniorcitizen == "yes" ?
      (housingLoanInterest > 300000 ? 300000 : housingLoanInterest)
      : (housingLoanInterest > 200000 ? 200000 : housingLoanInterest);

    this.amtUS241B = total_allowed;
    // alert('GetUS241B : Actual amount ' + actual_amount + ' Total allowed ' + total_allowed + ' Cinier Citizen  ' + seniorcitizen);

  }

  GetUS80EEA() {
    let total_allowed = 150000;
    let actual_amount = 0;
    const additionalHomeLoanInterest = Number((document.getElementById('additionalHomeLoanInterest') as HTMLInputElement).value);
    actual_amount = additionalHomeLoanInterest < 0 ? 0 : additionalHomeLoanInterest > total_allowed ? total_allowed : additionalHomeLoanInterest;
    this.amtUS80EEA = actual_amount;
    if (additionalHomeLoanInterest != 0) {
      this.api_json.other.push({
        "title": "Additional Deduction on Loan",
        "value": additionalHomeLoanInterest.toString()

      })
    }
  }

  GetUS80EEB() {
    let total_allowed = 150000;
    let actual_amount = 0;
    const electricVehicleLoanInterest = Number((document.getElementById('electricVehicleLoanInterest') as HTMLInputElement).value);
    actual_amount = electricVehicleLoanInterest < 0 ? 0 : electricVehicleLoanInterest > total_allowed ? total_allowed : electricVehicleLoanInterest;
    this.amtUS80EEB = actual_amount;
    if (actual_amount != 0) {
      this.api_json.other.push({
        "title": "Electrical Vehicle Loan Interest",
        "value": actual_amount.toString()

      })
    }
  }

  GetUS80GG() {
    let total_allowed = 0;
    let actual_amount = 0;
    const excessRentPaid = (document.getElementById('excessRentPaid') as HTMLInputElement).value;
  }

  OtherIncome() {
    const otherIncome = Number((document.getElementById('otherIncome') as HTMLInputElement).value);
    this.amtOtherIncome = otherIncome;
  }

  Income() {
    let total_allowed = 0;
    let actual_amount = 0;
    const yearlySalary = Number((document.getElementById('yearlySalary') as HTMLInputElement).value);
    const bonus = Number((document.getElementById('bonus') as HTMLInputElement).value);
    const houseproperty = Number((document.getElementById('houseproperty') as HTMLInputElement).value);
    const capitalgain = Number((document.getElementById('capitalgain') as HTMLInputElement).value);
    const othersource = Number((document.getElementById('othersource') as HTMLInputElement).value);
    this.yearlySalary = yearlySalary;
    actual_amount = yearlySalary + bonus + houseproperty + capitalgain + othersource;
    if (actual_amount < 90000) {
      alert("Minimum Income Value should be 90000");
      this.validate = false;
      // this.toastr.error("Minimum Income Value should be 90000");
    }

    this.api_json.income_source.salary = yearlySalary;
    this.api_json.income_source.bonus = bonus;
    this.api_json.income_source.house_property = houseproperty;
    this.api_json.income_source.capital_gain = capitalgain;
    this.api_json.income_source.other = othersource;

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
    this.api_json.hra.actual_hra = hra;

    var actualrent = Number((document.getElementById('actualRent') as HTMLInputElement).value);

    var tenper_ofactualrent = actualrent == 0 ? 0 : (actualrent - (calculatebasic * 10 / 100));
    tenper_ofactualrent = tenper_ofactualrent < 0 ? 0 : tenper_ofactualrent;
    (document.getElementById("actualRentPaid") as HTMLInputElement).value = tenper_ofactualrent.toString();

    var min_hra = Math.min(tenper_ofactualrent, actualrent, hra, x);

    (document.getElementById("deductionAllowed") as HTMLInputElement).value = min_hra.toString();
    this.hra_deduction_allowed = min_hra;
    this.api_json.hra.deduction_allowed = min_hra;
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
