import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScRoleService } from './role.service';
import { ModalHelper } from '@delon/theme';
import { ScRoleEditComponent } from './edit/edit.component';
import { ScRoleUserComponent } from './user/user.component';
import { ScRoleGroupComponent } from './group/group.component';
import { ScRoleMenuComponent } from './menu/menu.component';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'system-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.less'],
    providers:[ScRoleService]
})
export class ScRoleComponent implements OnInit, OnDestroy {

    query = {};

    data = '';
    list = [];
    total = 0;
    currentPage = 1;
    pageSize = 10;

    load(){
        this.scRoleService.loadData().then((res: any) =>{
            this.total = res.totalItems;
            this.list = res.list;
        },err=>{
            console.log(err);
        })
    }

    edit(item) {
        this.modalHelper.static(ScRoleEditComponent, { item }).subscribe(() => {
            this.load();
        });
    }

    bindUser(item) {
        this.modalHelper.static(ScRoleUserComponent, { item }).subscribe(() => {
            this.load();
        });
    }

    bindGroup(item) {
        this.modalHelper.static(ScRoleGroupComponent, { item }).subscribe(() => {
            this.load();
        });
    }

    bindMenu(item) {
        this.modalHelper.static(ScRoleMenuComponent, { item },'sm').subscribe(() => {
            this.load();
        });
    }

    delete(item) {
        this.modal.open({
            title: '确认框',
            content: '确认删除？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i].roleId == item.roleId){
                        this.list.splice(i,1);
                    }
                }
                this.msg.success('删除成功!');
            },
            onCancel: () => {

            }
        });
    }

    constructor(public scRoleService:ScRoleService,private modalHelper: ModalHelper,private modal: NzModalService,private msg: NzMessageService) {}

    ngOnInit() {

        this.load();

    }

    ngOnDestroy(): void {
    }
}

