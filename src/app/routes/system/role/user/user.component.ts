import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ModalHelper } from '@delon/theme';
import { ScRoleUserService } from './user.service';
@Component({
    selector: 'system-role-user',
    templateUrl: './user.component.html',
    providers:[ScRoleUserService]
})
export class ScRoleUserComponent implements OnInit {
    item: any;

    query = {};

    data = '';
    list = [];
    total = 0;
    currentPage = 1;
    pageSize = 10;

    _allChecked = false;

    load(){
        this.scRoleUserService.loadData().then((res: any) =>{
            this.total = res.totalItems;
            this.list = res.list;
        },err=>{
            console.log(err);
        })
    }

    _checkAll(){
        for(let item of this.list){
            item.checked = this._allChecked;
        }
    }

    _refreshStatus(){
        let flag = true;
        for(let item of this.list){
            if(!item.checked){
                flag = false;
            }
        }
        this._allChecked = flag;
    }

    constructor(
        private modalHelper: ModalHelper,
        private subject: NzModalSubject,
        private scRoleUserService:ScRoleUserService,
        public msgSrv: NzMessageService) { }

    ngOnInit() {
        console.log(this.item);
        this.load();
    }

    save() {

        this.msgSrv.success('保存成功');
        this.subject.next('true');
        this.close();

    }

    close() {
        this.subject.destroy();
    }
}
