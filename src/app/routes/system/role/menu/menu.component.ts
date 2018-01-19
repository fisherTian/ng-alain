import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ModalHelper } from '@delon/theme';
import { ScRoleMenuService } from './menu.service';
@Component({
    selector: 'system-role-menu',
    templateUrl: './menu.component.html',
    providers:[ScRoleMenuService]
})
export class ScRoleMenuComponent implements OnInit {
    item: any;
    nodes = [];
    load(){
        this.scRoleMenuService.loadData().then((res: any) =>{
            this.nodes = res;
        },err=>{
            console.log(err);
        })
    }

    onEvent(ev: any) {
        console.log('line', 'onEvent', ev);
    }

    constructor(
        private modalHelper: ModalHelper,
        private subject: NzModalSubject,
        private scRoleMenuService:ScRoleMenuService,
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
