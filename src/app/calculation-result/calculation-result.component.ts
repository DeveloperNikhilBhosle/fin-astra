import { Component } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-calculation-result',
  standalone: true,
  imports: [],
  templateUrl: './calculation-result.component.html',
  styleUrl: './calculation-result.component.css'
})
export class CalculationResultComponent {
  currentdate: any;

  constructor() {
    this.GetCurrentDate();
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

  GetCurrentDate() {

    const today = new Date();
    const day = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    this.currentdate = day + this.getOrdinalSuffix(day) + ' ' + month + ' ' + year;

  }

  // Function to get the ordinal suffix (st, nd, rd, th)
  getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return 'th'; // special case for numbers between 4 and 20
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

}
