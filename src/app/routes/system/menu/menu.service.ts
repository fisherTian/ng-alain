import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }    from '@angular/core';
@Injectable()
export class ScMenuService {

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

    public loadBtnData() {
        return new Promise((resolve, reject) => {
            let data = {
                totalItems:3,
                list:[
                    {id:'1',code:'31',type:'button',name:'新增',address:'/add',reqType:'post',desc:'新增按钮'},
                    {id:'2',code:'32',type:'button',name:'删除',address:'/delete',reqType:'post',desc:'删除按钮'},
                    {id:'3',code:'33',type:'button',name:'修改',address:'/update',reqType:'post',desc:'修改按钮'}
                ]
            };
            resolve(data);
        });
    }

}
