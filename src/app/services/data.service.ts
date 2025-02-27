import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
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

  getDocumentById<T>(collectionName: string, id: string | null): Observable<T | undefined>{
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return from(getDoc(docRef)).pipe(
      map(docSnap => {
        if(!docSnap.exists()){
          console.log('Nincs ilyen dokumentumunk');
          return undefined;
        }
        else{
          const data = docSnap.data() as T;
          (data as any).id = docSnap.id;
          return data;
        }
      }),
      catchError(error => {
        console.log(`Nem találtunk ilyen dokumentumot ${collectionName}: `, error);
        return of(undefined)
      })
    );
  }

  deleteCustomer(customerId: string): Observable<void>{
    const customerDoc = doc(this.firestore, `customer/${customerId}`);
    return from(deleteDoc(customerDoc));
  }

  updateCustomer(customer: CustomerModel): Observable<void>{
    const customerDoc = doc(this.firestore, `customer/${customer.id}`);
    return from(setDoc(customerDoc, customer));
  }

  addCustomer(customer: CustomerModel): Observable<DocumentData>{
    const customerRef = collection(this.firestore, 'customer');
    return from(addDoc(customerRef, customer));
  }

}