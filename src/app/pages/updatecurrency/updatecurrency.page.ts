import { Component, OnInit } from '@angular/core';
import { Currency } from '../../interfaces/currency';
import { CurrencyService } from '../../services/currency.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatecurrency',
  templateUrl: './updatecurrency.page.html',
  styleUrls: ['./updatecurrency.page.scss'],
})
export class UpdatecurrencyPage implements OnInit {

  currency: Currency;
  currencyForm: FormGroup;
  isSubmitted = false;
  idDoc: string;
  tempCurrency: any = {
    id: '',
    data: {} as Currency
  };

  constructor(
    private currencyService: CurrencyService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private formBuilder: FormBuilder) {
    this.currency = {} as Currency;
  }

  async ngOnInit() {
    this.idDoc = this.route.snapshot.paramMap.get('id');


    this.currencyForm = this.formBuilder.group({
      country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]{2,50}')]],
      symbol: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern('[a-zA-Z ]{2,5}')]],
      decimalSeparator: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[,.]')]],
      thousandSeparator: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[,.]')]],
      cents: [null, [ Validators.required ]],
      currencyBefore: [null, [ Validators.required ]]
    });

    await this.currencyService.readCurrencyById('currency', this.idDoc).subscribe((currencyData) => {
      this.tempCurrency.id = currencyData.payload.id;
      this.tempCurrency.data = currencyData.payload.data();

      this.currencyForm.setValue(this.tempCurrency.data);
    });

  }

  /* Function to get the errors of the validation */
  get errorControl() {
    return this.currencyForm.controls;
  }

  /* Function to update the currency */
  async updateCurrency() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'loading',
      message: 'Loading...',
    });
    await loading.present();

    this.isSubmitted = true;
    if (!this.currencyForm.valid) {
      return false;
    } else {
      if (this.currencyForm.value.decimalSeparator === this.currencyForm.value.thousandSeparator) {
        this.failSameInsertAlert();
        loading.dismiss();
      } else {
        this.currency.country = this.currencyForm.value.country;
        this.currency.symbol = this.currencyForm.value.symbol;
        this.currency.decimalSeparator = this.currencyForm.value.decimalSeparator;
        this.currency.thousandSeparator = this.currencyForm.value.thousandSeparator;
        this.currency.cents = this.currencyForm.value.cents;
        this.currency.currencyBefore = this.currencyForm.value.currencyBefore;
        this.currencyService.updateCurrency('currency', this.tempCurrency.id, this.currency).then(() => {
          this.okInsertAlert();
          this.currency = {} as Currency;
          loading.dismiss();
        }, (error) => {
          this.failInsertAlert();
          loading.dismiss();
          console.error(error);
        });
      }
    }
  }

  /* Function to show an alert */
  async okInsertAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'EveryMundo',
      message: 'Currency updated!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['tabs/config']);
          }
        }
      ]
    });

    await alert.present();
  }

  /* Function to show an alert */
  async failInsertAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'EveryMundo',
      message: 'Sorry! We have an error. Please, try again later.',
      buttons: ['OK']
    });

    await alert.present();
  }

  /* Function to show an alert */
  async failSameInsertAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'EveryMundo',
      message: 'The Decimal Separator and the Thousand Separator cannot be the same',
      buttons: ['OK']
    });

    await alert.present();
  }
}
