import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customer.model';
import { DataService } from '../../services/data.service';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customerList: CustomerModel[] = []

  constructor(private dataService: DataService, private firestore: Firestore){

  }

  ngOnInit(): void {
    // this.dataService.getCustomersWithGetDocs().subscribe(customer => {
    //   this.customerList = customer
    // })

    this.dataService.getDocuments<CustomerModel>('customer').subscribe({
      next: (data) => {
        this.customerList = data;
        console.log('Customers:', data);
      },
      error: (err) => console.error('Error fetching actors:', err)
    });
  }

  loadCustomers(){
    this.dataService.getDocuments<CustomerModel>('customer').subscribe({
      next: (data) => {
        this.customerList = data;
        console.log('Customers:', data);
      },
      error: (err) => console.error('Error fetching actors:', err)
    });
  }

  addCustomer(customer: CustomerModel): void{
    this.dataService.addCustomer(customer);
    console.log(customer);
    this.loadCustomers();
  }
  deleteCustomer(customerId: string): void{
    this.dataService.deleteCustomer(customerId).subscribe(() => {
      this.loadCustomers();
      alert('Customer deleted successfully');
    });
  }

  addProduct(customer: any): Promise<void> {
    const id = doc(collection(this.firestore, 'customer')).id;
    return setDoc(doc(this.firestore, 'customer', id), customer);
    }
    
    clearCustomers(): void {
      this.customerList = [];
    }
}