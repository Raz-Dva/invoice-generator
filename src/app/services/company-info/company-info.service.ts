import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
type CompanyData = { name: string; address: string; phones: string[]; }

@Injectable({
    providedIn: 'root'
})
export class CompanyInfoService {
    infoCompanyURL = 'https://node-express-vercel-mauve.vercel.app/info';
    constructor( private _http: HttpClient) { }

    getCompanyInfo(): Observable<CompanyData>{
        return this._http.get<CompanyData>(this.infoCompanyURL)
    }
}
