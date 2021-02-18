import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Currency } from '../../interfaces/currency';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  arrayCurrenciesCollection: any = [{
    id: '',
    data: {} as Currency
   }];

  searchParameter = null;

  constructor(
    private router: Router,
    private currencyService: CurrencyService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.getCurrencies();
  }

  /* Redirect function */
  gotoInsertCurrency() {
    this.router.navigate(['tabs/insertcurrency']);
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

  /* Function to get all data of the table, order by country name */
  getCurrenciesByCountry(){
    this.currencyService.readCurrencyByCountry('currency').subscribe((result) => {
      this.arrayCurrenciesCollection = [];
      result.forEach((currencyData: any) => {
        this.arrayCurrenciesCollection.push({
          id: currencyData.payload.doc.id,
          data: currencyData.payload.doc.data()
        });
      });
    });
  }

  /* Function to get all data of the table, order by country symbol */
  getCurrenciesBySymbol(){
    this.currencyService.readCurrencyBySymbol('currency').subscribe((result) => {
      this.arrayCurrenciesCollection = [];
      result.forEach((currencyData: any) => {
        this.arrayCurrenciesCollection.push({
          id: currencyData.payload.doc.id,
          data: currencyData.payload.doc.data()
        });
      });
    });
  }

  /* Function to select the order on the view */
  orderBy(order){
    if (order.detail.value === 'country') {
      this.getCurrenciesByCountry();
    } else if (order.detail.value === 'symbol') {
      this.getCurrenciesBySymbol();
    } else {
      this.getCurrencies();
    }
  }

  /* Function to search currencies by country name */
  async filtrerCurrencies(evt){
    this.searchParameter = null;
    const searchTerm = evt.srcElement.value;
    this.searchParameter = searchTerm;
    if (!searchTerm) {
      await this.getCurrencies();
    }
    this.arrayCurrenciesCollection = this.arrayCurrenciesCollection.filter(data => {
      if (data.data.country && searchTerm) {
        return (data.data.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 );
      }
    });
  }

  /* Function to delete the selected currency */
  deleteCurrency(id){
    this.currencyService.deleteCurrency('currency', id).then(() => {
      this.getCurrencies();
    });
  }

  /* Function to update the selected currency */
  updateCurrency(id){
    this.navCtrl.navigateForward('updatecurrency/' + id);
  }

  /* Function to show an alert */
  async okDeleteAlert(id){
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'EveryMundo',
      message: 'Are you sure you want to delete this currency?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteCurrency(id);
          }
        }
      ]
    });

    await alert.present();
  }
}
