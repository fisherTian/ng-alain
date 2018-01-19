import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }    from '@angular/core';
@Injectable()
export class ScRoleMenuService {

    constructor(private http: HttpClient) { }

    public loadData() {
        return new Promise((resolve, reject) => {
            let data = [
                { name: "仪表盘", id: 1,children:[
                    { name: "工作台", id: 3}
                ]},
                { name: "文艺部", id: 2,children:[
                    { name: "人员管理", id: 4},
                    { name: "部门管理", id: 5},
                    { name: "菜单管理", id: 6}
                ]}
            ];
            resolve(data);
        });
    }

}
