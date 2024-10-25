import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  // getData =
  //   {
  //     name: 'Ruthvik Salunke',
  //     designation: 'Software Developer',
  //     new_regime_tax: {
  //       effective_tax_rate: 22.53,
  //       is_recommended: true,
  //       taxable_income: 3922200,
  //       total_tax_payable: 901326
  //     },
  //     old_regime_tax: {
  //       effective_tax_rate: 24.78,
  //       is_recommended: false,
  //       taxable_income: 3798000,
  //       total_tax_payable: 989976
  //     }
  //   }

  getData: any = [];
  isOldRecommended: any;
  recommendedTaxPayable: any;
  recommendedEffectiveTaxRate: any;
  recommendedTaxRegime: any;
  nonRecommendedTaxPayable: any;
  nonRecommendedTaxRate: any;
  nonRecommendedTaxRegime: any;
  recommendedTaxableIncome: any;
  nonRecommendedTaxableIncome: any;

  ngOnInit() {
    this.getTaxData();
  }

  getTaxData() {
    this.getData = localStorage.getItem('data');
    this.isOldRecommended = this.getData.old_regime_tax.is_recommended;
    if (this.isOldRecommended === true) {
      this.recommendedTaxPayable = this.getData.old_regime_tax?.total_tax_payable;
      this.recommendedEffectiveTaxRate = this.getData.old_regime_tax?.effective_tax_rate;
      this.recommendedTaxableIncome = this.getData.old_regime_tax?.taxable_income;
      this.recommendedTaxRegime = 'Old';

      this.nonRecommendedTaxPayable = this.getData.new_regime_tax?.total_tax_payable;
      this.nonRecommendedTaxRate = this.getData.new_regime_tax?.effective_tax_rate;
      this.nonRecommendedTaxableIncome = this.getData.new_regime_tax?.taxable_income;
      this.nonRecommendedTaxRegime = 'New';
    } else {
      this.nonRecommendedTaxPayable = this.getData.old_regime_tax?.total_tax_payable;
      this.nonRecommendedTaxRate = this.getData.old_regime_tax?.effective_tax_rate;
      this.nonRecommendedTaxableIncome = this.getData.old_regime_tax?.taxable_income;
      this.nonRecommendedTaxRegime = 'Old';

      this.recommendedTaxPayable = this.getData.new_regime_tax?.total_tax_payable;
      this.recommendedEffectiveTaxRate = this.getData.new_regime_tax?.effective_tax_rate;
      this.recommendedTaxableIncome = this.getData.new_regime_tax?.taxable_income;
      this.recommendedTaxRegime = 'New';
    }
  }
}
