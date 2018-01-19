import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }    from '@angular/core';
@Injectable()
export class ScRoleService {

    constructor(private http: HttpClient) { }

    public loadData() {
        return new Promise((resolve, reject) => {
            let data = {
                totalItems:3,
                list:[
                    {roleId:'11003101',orgId:'1',name:'角色A',desc:'本机构角色A'},
                    {roleId:'11003102',orgId:'1',name:'角色B',desc:'本机构角色B'},
                    {roleId:'11003103',orgId:'1',name:'角色C',desc:'本机构角色C'}
                ]
            };
            resolve(data);
        });
    }

}
