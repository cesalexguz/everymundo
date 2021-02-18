import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Currency } from 'src/app/interfaces/currency';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  arrayCurrenciesCollection: any = [{
    id: '',
    data: {} as Currency
  }];

  arrayCurrenciesCollectionTemp: any = [{
    id: '',
    data: {} as Currency
  }];

  country: string;
  symbol: string;
  cents: boolean;
  currencyBefore: boolean;
  decimalSeparator: string;
  thousandSeparator: string;
  fare: string;
  fareWhole: any = [];
  fareSpaces: any = [];
  fareDecimal: string;
  fareThousand: string;
  fareHundred: string;
  fareComplete: string;
  letters: boolean;

  constructor(
    private currencyService: CurrencyService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getCurrencies();
  }

  /* Function to get all data of the table with the default order of Firebase */
  getCurrencies(){
    this.currencyService.readCurrency('currency').subscribe((result) => {
      this.arrayCurrenciesCollection = [];
      result.forEach((currencyData: any) => {
        this.arrayCurrenciesCollection.push({
          id: currencyData.payload.doc.id,
          data: currencyData.payload.doc.data()
        });
      });
    });
  }

  /* Function to select the country to show the format fare */
  selectCountry(country){
    if (this.fare === null || this.fare === undefined) {
      this.fareAlert();
    } else if (this.letterFilter(this.fare)) {
      this.fareLetterAlert();
    } else {
      this.arrayCurrenciesCollectionTemp = this.arrayCurrenciesCollection;
      this.arrayCurrenciesCollectionTemp = this.arrayCurrenciesCollectionTemp.filter(data => {
        if (data.data.country === country.detail.value) {
          this.country = data.data.country;
          this.symbol = data.data.symbol;
          this.cents = data.data.cents;
          this.currencyBefore = data.data.currencyBefore;
          this.decimalSeparator = data.data.decimalSeparator;
          this.thousandSeparator = data.data.thousandSeparator;
          this.setFormat('' + this.fare + '', this.decimalSeparator, this.thousandSeparator, this.cents);
        }
      });
    }
  }

  /* Function to set the format of the selected country */
  setFormat(fare, decimalSeparator, thousandSeparator, cents){
    let thousands = '';
    this.fareSpaces = fare.replaceAll(',', ' ');
    this.fareSpaces = this.fareSpaces.replaceAll('.', ' ');
    this.fareWhole = this.fareSpaces.split(' ');
    thousands = this.fareWhole[0];
    if (this.fareWhole[0].length > 3) {
      this.fareThousand = thousands.slice(0, this.fareWhole[0].length - 3);
      this.fareHundred = this.fareWhole[0].slice(this.fareWhole[0].length - 3, this.fareWhole[0].length);
      if (this.fareWhole[1] === undefined || this.fareWhole[1] === null || this.fareWhole[1] === '') {
        this.fareDecimal = '00';
      } else {
        if (this.fareWhole[1].length > 2 ) {
          this.fareDecimal = this.fareWhole[1].substr(0, 2);
        } else {
          this.fareDecimal = this.fareWhole[1];
        }
      }
      if (cents === true) {
        this.fareComplete = this.fareThousand + thousandSeparator + this.fareHundred + decimalSeparator + this.fareDecimal;
      } else {
        this.fareComplete = this.fareThousand + thousandSeparator + this.fareHundred;
      }
    } else {
      if (this.fareWhole.length > 2) {
        this.fareThousand = this.fareWhole[0];
        this.fareHundred = this.fareWhole[1];
        if (this.fareWhole[2] === undefined || this.fareWhole[2] === null || this.fareWhole[2] === '') {
          this.fareDecimal = '00';
        } else {
          if (this.fareWhole[2].length > 2 ) {
            this.fareDecimal = this.fareWhole[2].substr(0, 2);
          } else {
            this.fareDecimal = this.fareWhole[2];
          }
        }
        if (cents === true) {
          this.fareComplete = this.fareThousand + thousandSeparator + this.fareHundred + decimalSeparator + this.fareDecimal;
        } else {
          this.fareComplete = this.fareThousand + thousandSeparator + this.fareHundred;
        }
      } else {
        this.fareHundred = this.fareWhole[0];
        if (this.fareWhole[1] === undefined || this.fareWhole[1] === null || this.fareWhole[1] === '') {
          this.fareDecimal = '00';
        } else {
          if (this.fareWhole[1].length > 2 ) {
            this.fareDecimal = this.fareWhole[1].substr(0, 2);
          } else {
            this.fareDecimal = this.fareWhole[1];
          }
        }
        if (cents === true) {
          this.fareComplete = this.fareHundred + decimalSeparator + this.fareDecimal;
        } else {
          this.fareComplete = this.fareHundred;
        }
      }
    }
  }

  /* Function to avoid the user type letters in the input field */
  letterFilter(fare){
    this.letters = false;
    for (let x = 0; x < fare.length; x++) {
      const c = fare.charAt(x);
      if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === ' ' || c === '$')) {
          this.letters = false;
      } else {
        this.letters = true;
        break;
      }
    }
    return this.letters;
  }

  /* Function to show an alert */
  async fareAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'EveryMundo',
      message: 'Please, first enter a fare.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }

  /* Function to show an alert */
  async fareLetterAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'EveryMundo',
      message: 'Please, enter a valid format, letters are not allowed.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }

}
