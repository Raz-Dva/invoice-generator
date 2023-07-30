import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyInfoService } from 'src/app/services/company-info/company-info.service';

type ItemInvoice = { name: string; price: string; count: string; '#': number };
type FormValueInvoice = { invoiceForm: ItemInvoice[] }
type CompanyInfo = { name: string; address: string; phones: string[]; }

@Component({
    selector: 'app-preview-invoice',
    templateUrl: './preview-invoice.component.html',
    styleUrls: ['./preview-invoice.component.css']
})
export class PreviewInvoiceComponent implements OnInit {
  dataSource: ItemInvoice[] = [];
  displayedColumns: string[] = [];
  invoiceData: FormValueInvoice | undefined;
  companyInfo: CompanyInfo;

  constructor(private router: Router, private serviceInfo: CompanyInfoService) {
      this.invoiceData = this.router.getCurrentNavigation()?.extras.state as FormValueInvoice;
  }

  ngOnInit(): void {
      this.getDataTable();
      this.getCompanyInfo()
  }

  getTotalCost(): number {
      return this.dataSource
          .map(invoice => Number(invoice.price) * Number(invoice.count))
          .reduce((acc, value) => Number(acc) + Number(value), 0);
  }

  getDataTable(): void {
      if (this.invoiceData) {
          this.invoiceData.invoiceForm.forEach((invoice: ItemInvoice, index) => {

              if (!this.displayedColumns.length) {
                  const invoiceKeys = Object.keys(invoice);
                  this.displayedColumns.push('#')
                  this.displayedColumns.push(...invoiceKeys)
              }
              const hashSymbol = { '#': index + 1 }
              this.dataSource.push({ ...hashSymbol, ...invoice })
          })
      }
  }

  getCompanyInfo(): void {
      this.serviceInfo.getCompanyInfo().subscribe({
          next: (companyData) => {
              this.companyInfo = companyData;
          },
          error: (err) => {
              alert('Error from server')
              console.log(err)
          }
      })
  }
}
