import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currency: Currency;

  constructor(private angularFirestore: AngularFirestore) { }

  /* Function to get all currencies of the table in Firebase order */
  public readCurrency(collection) {
    return this.angularFirestore.collection(collection).snapshotChanges();
  }

  /* Function to get currency by ID  */
  public readCurrencyById(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).snapshotChanges();
  }

  /* Function to get all currencies order by country name */
  public readCurrencyByCountry(collection) {
    const dataCollection: AngularFirestoreCollection<Currency> =
      this.angularFirestore.collection<Currency>(collection,
        ref => ref.orderBy('country', 'asc'));
    return dataCollection.snapshotChanges();
  }

  /* Function to get all currencies order by country symbol */
  public readCurrencyBySymbol(collection) {
    const dataCollection: AngularFirestoreCollection<Currency> =
      this.angularFirestore.collection<Currency>(collection,
        ref => ref.orderBy('symbol', 'asc'));
    return dataCollection.snapshotChanges();
  }

  /* Function to insert a new currency */
  public createCurrency(collection, data) {
    return this.angularFirestore.collection(collection).add(data);
  }

  /* Currency to update a currency */
  public updateCurrency(collection, documentId, data) {
    return this.angularFirestore.collection(collection).doc(documentId).set(data);
  }

  /* Function to delete a currency */
  public deleteCurrency(collection, documentId) {
    return this.angularFirestore.collection(collection).doc(documentId).delete();
  }
}
