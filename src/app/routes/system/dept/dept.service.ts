import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }    from '@angular/core';
@Injectable()
export class ScDeptService {

    constructor(private http: HttpClient) { }

    public loadData() {
        return new Promise((resolve, reject) => {
            let data = [
                { name: "信息部", id: 1,children:[
                    { name: "信息A部", id: 3},
                    { name: "信息B部", id: 4},
                    { name: "信息C部", id: 5}
                ]},
                { name: "文艺部", id: 2,children:[]}
            ];
            resolve(data);
        });
    }

}
