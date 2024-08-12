import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password-generator';
  uppercase: boolean = false;
  number: boolean = false;
  symbol: boolean = false;
  characterLength: number = 12;
  password: string = this.generatePassword();


  generatePassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = lowercaseChars;
    let mandatoryChars = ''; 
    if (this.uppercase) {
      allChars += uppercaseChars;
      mandatoryChars += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (this.number) {
      allChars += numberChars;
      mandatoryChars += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (this.symbol) {
      allChars += symbolChars;
      mandatoryChars += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    let generatedPassword = mandatoryChars;

    for (let i = mandatoryChars.length; i < this.characterLength; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    // Mélanger le mot de passe pour éviter que les caractères obligatoires ne soient toujours au début
    this.password = this.shufflePassword(generatedPassword);
    return this.password;
  }
  // Fonction pour mélanger le mot de passe
  shufflePassword(password: string): string {
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }

  onSlideChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.characterLength = +inputElement.value;
    this.generatePassword()
  }

  copyPassword() {
    if (this.password) {
      navigator.clipboard.writeText(this.password).then(() => {
        alert('Mot de passe copié dans le presse papier !');
      }).catch(err => {
        console.error('Une erreure est survenue: ', err);
      });
    } else {
      alert('Une erreure est survenue');
    }
  }


  generateWithUppercase() {
    if (this.uppercase) {
      this.uppercase = !this.uppercase
    } else {
      this.uppercase = !this.uppercase
    }
    this.generatePassword()
  }

  generateWithNumber() {
    if (this.number) {
      this.number = !this.number
    } else {
      this.number = !this.number
    }
    this.generatePassword()
  }

  generateWithSymbol() {
    if (this.symbol) {
      this.symbol = !this.symbol
    } else {
      this.symbol = !this.symbol
    }
    this.generatePassword()
  }
}
