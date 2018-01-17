import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }    from '@angular/core';
@Injectable()
export class ScUserService {

    constructor(private http: HttpClient) { }

    public loadData() {
        return new Promise((resolve, reject) => {
            let data = {
                totalItems:3,
                list:[
                    {userId:'11003101',deptId:'31',orgId:'1',name:'小明',account:'xiaoming',password:'123456',phone:'18013976666'},
                    {userId:'11003102',deptId:'31',orgId:'1',name:'小红',account:'xiaohong',password:'123456',phone:'18013977777'},
                    {userId:'11003103',deptId:'31',orgId:'1',name:'小王',account:'xiaowang',password:'123456',phone:'18013978888'}
                ]
            };
            resolve(data);
        });
    }

}
