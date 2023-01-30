import {Routes} from "@angular/router";
import {PreviewInvoiceComponent} from "src/app/preview-invoice/preview-invoice.component";
import {InvoiceFormComponent} from "src/app/invoice-form/invoice-form.component";

export const appRoutes: Routes =[
  { path: '', component: InvoiceFormComponent},
  { path: 'preview', component: PreviewInvoiceComponent},
];
