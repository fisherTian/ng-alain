import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }    from '@angular/core';
@Injectable()
export class WorkplaceService {

    constructor(private http: HttpClient) { }

    public loadData() {
        return new Promise((resolve, reject) => {
           this.http.get('/test/data')
            .subscribe((res: any) => {
                resolve(res);
            }, (err: HttpErrorResponse) => {
                resolve(null);
            });
        });

    }

}
