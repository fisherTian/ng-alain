import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }    from '@angular/core';
@Injectable()
export class ScRoleGroupService {

    constructor(private http: HttpClient) { }

    public loadData() {
        return new Promise((resolve, reject) => {
            let data = {
                totalItems:3,
                list:[
                    {groupId:'11003101',orgId:'1',name:'用户组A',desc:'本机构用户组A'},
                    {groupId:'11003102',orgId:'1',name:'用户组B',desc:'本机构用户组B'},
                    {groupId:'11003103',orgId:'1',name:'用户组C',desc:'本机构用户组C'}
                ]
            };
            resolve(data);
        });
    }

}
