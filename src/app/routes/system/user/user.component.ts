import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScUserService } from './user.service';
import { ModalHelper } from '@delon/theme';
import { ScUserEditComponent } from './edit/edit.component';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'system-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less'],
    providers:[ScUserService]
})
export class ScUserComponent implements OnInit, OnDestroy {

    query = {};

    data = '';
    list = [];
    total = 0;
    currentPage = 1;
    pageSize = 10;

    load(){
        this.scUserService.loadData().then((res: any) =>{
            this.total = res.totalItems;
            this.list = res.list;
        },err=>{
            console.log(err);
        })
    }

    edit(item) {
        console.log(item);
        this.modalHelper.static(ScUserEditComponent, { item }).subscribe(() => {
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
                    if(this.list[i].userId == item.userId){
                        this.list.splice(i,1);
                    }
                }
                this.msg.success('删除成功!');
            },
            onCancel: () => {

            }
        });
    }

    constructor(public scUserService:ScUserService,private modalHelper: ModalHelper,private modal: NzModalService,private msg: NzMessageService) {}

    ngOnInit() {

        this.load();

    }

    ngOnDestroy(): void {
    }
}

