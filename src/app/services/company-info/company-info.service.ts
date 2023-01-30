import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
type CompanyData = { name: string; address: string; phones: string[]; }

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor( private _http: HttpClient) { }

  getCompanyInfo(): Observable<CompanyData>{
    return this._http.get<CompanyData>('https://node-express-vercel-7uk3vqi9x-raz-dva.vercel.app/info')
  }
}
