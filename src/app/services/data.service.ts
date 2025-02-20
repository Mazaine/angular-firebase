import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private FireStore: Firestore) { }
  getData(): Observable<CustomerModel[]>{
    const ref = collection(this.FireStore, 'custumer');
    return collectionData(ref, {idField: 'id'}) as Observable<CustomerModel[]>; 
  }
}
