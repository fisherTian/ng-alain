import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScDeptService } from './dept.service';
import { ModalHelper } from '@delon/theme';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'system-dept',
    templateUrl: './dept.component.html',
    styleUrls: ['./dept.component.less'],
    providers:[ScDeptService]
})
export class ScDeptComponent implements OnInit, OnDestroy {

    nodes = [];
    dept: any = {};

    load(){
        this.scDeptService.loadData().then((res: any) =>{
            this.nodes = res;
        },err=>{
            console.log(err);
        })
    }

    onEvent(ev: any) {
        console.log('line', 'onEvent', ev);
    }

    submit(){
        console.log(this.dept);
    }

    constructor(public scDeptService:ScDeptService,private modalHelper: ModalHelper,private modal: NzModalService,private msg: NzMessageService) {}

    ngOnInit() {

        this.load();

    }

    ngOnDestroy(): void {
    }
}

