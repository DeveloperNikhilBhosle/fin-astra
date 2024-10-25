import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InvestmentDataComponent } from './investment-data/investment-data.component';
import { CalculationResultComponent } from './calculation-result/calculation-result.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'investment-data', component: InvestmentDataComponent },
    { path: 'calculation-result', component: CalculationResultComponent },
];
