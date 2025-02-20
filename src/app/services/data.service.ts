import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, getDocs } from '@angular/fire/firestore';
import { catchError, from, map, Observable, of } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private firestore: Firestore) { }

  // private get customersCollectionRef() {
  //   return collection(this.firestore, 'customer');
  // }

  // getData(): Observable<CustomerModel[]>{
  //   const ref = collection(this.firestore, 'customer');
  //   return collectionData(ref, {idField: 'id'}) as Observable<CustomerModel[]>;
  // }

  // getCustomersWithGetDocs(): Observable<CustomerModel[]> {
  //   return from(getDocs(this.customersCollectionRef)).pipe(
  //     map((snapshot) => {
  //       return snapshot.docs.map((doc) => ({
  //         ...doc.data() as CustomerModel,
  //         id: doc.id
  //       }));
  //     })
  //   );
  // }

  getDocuments<T>(collectionName: string): Observable<T[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return from(getDocs(collectionRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as T;
        (data as any).id = doc.id; // Az ID hozzáadása
        return data;
      })),
      catchError(error => {
        console.error(`Error fetching docs from ${collectionName}: `, error);
        return of([]);
      })
    );
  }

}
