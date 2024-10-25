import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedLayoutComponent } from '../shared-layout/shared-layout.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedLayoutComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router) { }
  redirectToInvestmentCalculatorPage() {
    this.router.navigate(['/investment-data']);
  }
}
