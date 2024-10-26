import { Component } from '@angular/core';
import { SharedLayoutComponent } from '../shared-layout/shared-layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tax-help',
  standalone: true,
  imports: [SharedLayoutComponent, FormsModule, CommonModule],
  templateUrl: './tax-help.component.html',
  styleUrl: './tax-help.component.css'
})
export class TaxHelpComponent {

  questionText = '';
  isResponse: boolean = false;
  getResponse: any;
  //private apiUrl = 'https://dummyjson.com/posts/1';

  constructor(private http: HttpClient) { }

  autoResize(event: any): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = `54px`; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight

    if (textarea.value.trim() === '') {
      this.isResponse = false;
    }
  }

  // autoResponseResize(event: Event): void {
  //   const textarea = event.target as HTMLTextAreaElement;
  //   textarea.style.height = `100px`; // Reset height
  //   textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
  // }

  callApi(event: Event): void {
    event.preventDefault();
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    if (this.questionText.trim()) {


      console.log("Question =>" + this.questionText);
      const taxKeywords = ['tax', 'deduction', 'refund', 'credit', 'income', 'VAT', 'GST'];
      const userInput = this.questionText.trim().toLowerCase();

      const isTaxRelated = taxKeywords.some(keyword => userInput.includes(keyword));
      if (!isTaxRelated) {
        alert("Please ask a tax-related question.");
        return;
      }

      this.http.get('http://localhost:8000/tax-suggest/advice?text=' + userInput).subscribe({
        next: (response: any) => {
          this.isResponse = true;
          console.log('API Response:', response);
          this.getResponse = response.data;
        },
        error: (error) => {
          console.error('API Error:', error);
          this.getResponse = 'An error occurred';
        }
      });

      this.isResponse = true;

      // this.getResponse = "Thank you for your question! \nWe're currently in the process of setting up our AI to assist with tax inquiries. Please check back soon, and we appreciate your patience! \n "
      // this.getResponse = ` &lt;h2&gt;Tax Slabs for an Income of INR 12,00,000&lt;/h2&gt; &lt;table border="1" style="width: 100%;"&gt; &lt;thead&gt; &lt;tr&gt; &lt;th&gt;Tax Regime&lt;/th&gt; &lt;th&gt;Tax Slab&lt;/th&gt; &lt;th&gt;Applicable Tax&lt;/th&gt; &lt;/tr&gt; &lt;/thead&gt; &lt;tbody&gt; &lt;tr&gt; &lt;td&gt;&lt;strong&gt;Old Tax Regime&lt;/strong&gt;&lt;/td&gt; &lt;td&gt;INR 3,00,000 - INR 10,00,000&lt;/td&gt; &lt;td&gt;30% (on INR 3,00,000 - INR 10,00,000) + Cess @ 4%&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;&lt;strong&gt;New Tax Regime&lt;/strong&gt;&lt;/td&gt; &lt;td&gt;INR 3,00,000 - INR 15,00,000&lt;/td&gt; &lt;td&gt;15% (on INR 3,00,000 - INR 15,00,000) + Cess @ 4%&lt;/td&gt; &lt;/tr&gt; &lt;/tbody&gt; &lt;/table&gt; &lt;p&gt;&lt;strong&gt;Note:&lt;/strong&gt;&lt;/p&gt; &lt;ul&gt; &lt;li&gt;The above table shows the tax slabs based on your income of INR 12,00,000 per annum.&lt;/li&gt; &lt;li&gt;You need to choose either the Old Tax Regime or the New Tax Regime based on which is more beneficial for you.&lt;/li&gt; &lt;li&gt;The cess of 4% is levied on the total income tax calculated under both the regimes.&lt;/li&gt; &lt;li&gt;The tax calculations exclude any deductions and exemptions available under the respective regimes.&lt;/li&gt; &lt;li&gt;It is advisable to consult a tax professional for specific advice on your tax obligations.&lt;/li&gt; &lt;/ul&gt; `;
      (document.getElementById("dynamicContent") as HTMLInputElement).value = this.getResponse;



    } else {
      this.isResponse = false;
    }
  }
}
