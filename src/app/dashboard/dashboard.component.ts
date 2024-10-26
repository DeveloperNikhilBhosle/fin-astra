import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  constructor(private http: HttpClient) { }

  getData: any;
  isOldRecommended: any;
  recommendedTaxPayable: any;
  recommendedEffectiveTaxRate: any;
  recommendedTaxRegime: any;
  nonRecommendedTaxPayable: any;
  nonRecommendedTaxRate: any;
  nonRecommendedTaxRegime: any;
  recommendedTaxableIncome: any;
  nonRecommendedTaxableIncome: any;
  pdf_link: any;

  ngOnInit() {
    this.getTaxData();
  }

  getTaxData() {
    this.getData = localStorage.getItem('data');
    this.getData = JSON.parse(this.getData);
    console.log(this.getData, "data");
    this.isOldRecommended = this.getData.old_regime_tax.is_recommended;
    this.pdf_link = this.getData.pdf_base64;
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

  async ViewReport() {
    const json = localStorage.getItem('api_data');
    console.log(json, 'json data')
    await this.http.post("http://localhost:8000/fwp-latest/pdf", { data: json }).subscribe({
      next: (response: any) => {
        console.log(response, "response");
        const pdfBlob = this.base64ToBlob(response.base64, 'application/pdf');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank'); // Open in a new tab

        window.open("Users/nikhilbhosle/Desktop/NIKHIL/fin-astra-backend/fin-astra-backend/pdf_files/fwp_pdf/output.pdf");
      },
      error: (e) => {
        alert("Something went wrong, Please try again");

      }
    });
  }

  base64ToBlob(base64: string, type: string): Blob {
    const binaryString = window.atob(base64); // Decode Base64 to binary string
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new Blob([bytes], { type });
  }
}
