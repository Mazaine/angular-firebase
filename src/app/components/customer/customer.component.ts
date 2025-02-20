import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customer.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customerList: CustomerModel[] = []

  constructor(private dataService: DataService){

  }

  ngOnInit(): void {
    // this.dataService.getCustomersWithGetDocs().subscribe(customer => {
    //   this.customerList = customer
    // })

    this.dataService.getDocuments<CustomerModel>('custumer').subscribe({
      next: (data) => {
        this.customerList = data;
        console.log('Customers:', data);
      },
      error: (err) => console.error('Error fetching actors:', err)
    });
  }

}