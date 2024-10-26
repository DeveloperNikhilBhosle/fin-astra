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
  private apiUrl = 'https://dummyjson.com/posts/1';

  constructor(private http: HttpClient) {}

  autoResize(event: any): void {
    debugger
    if(event.data == '' || event.data == null) {
      this.isResponse = false;
    }
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = `54px`; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
  }

  // autoResponseResize(event: Event): void {
  //   const textarea = event.target as HTMLTextAreaElement;
  //   textarea.style.height = `100px`; // Reset height
  //   textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
  // }

  callApi(event: Event): void {
    event.preventDefault();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.questionText.trim()) {
      this.http.post(this.apiUrl, {headers}).subscribe({
        next: (response: any) => {
          this.isResponse = true;
          console.log('API Response:', response);
        },
        error: (error) => {
          console.error('API Error:', error);
          this.getResponse = 'An error occurred';
        }
      });
      this.isResponse = true;
      this.getResponse = "ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRERUIUYT RESWTUYTREDRTY DFYUYTRERTUUYTRERTYUYTRDUYTREHFD ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER vc ASDFGHJKLKJHGF LUYREWERUIOIUYTRE UYTREWEOOIUYTRTYUIUYTR WTYUIUYTRERTOIUYTR YTRERIUYTRER"
    } else {
      this.isResponse = false;
    }
  }
}
