import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScGroupService } from './group.service';
import { ModalHelper } from '@delon/theme';
import { ScGroupEditComponent } from './edit/edit.component';
import { ScGroupUserComponent } from './user/user.component';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'system-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.less'],
    providers:[ScGroupService]
})
export class ScGroupComponent implements OnInit, OnDestroy {

    query = {};

    data = '';
    list = [];
    total = 0;
    currentPage = 1;
    pageSize = 10;

    load(){
        this.scGroupService.loadData().then((res: any) =>{
            this.total = res.totalItems;
            this.list = res.list;
        },err=>{
            console.log(err);
        })
    }

    edit(item) {
        this.modalHelper.static(ScGroupEditComponent, { item }).subscribe(() => {
            this.load();
        });
    }

    bindUser(item) {
        this.modalHelper.static(ScGroupUserComponent, { item }).subscribe(() => {
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
                    if(this.list[i].groupId == item.groupId){
                        this.list.splice(i,1);
                    }
                }
                this.msg.success('删除成功!');
            },
            onCancel: () => {

            }
        });
    }

    constructor(public scGroupService:ScGroupService,private modalHelper: ModalHelper,private modal: NzModalService,private msg: NzMessageService) {}

    ngOnInit() {

        this.load();

    }

    ngOnDestroy(): void {
    }
}

