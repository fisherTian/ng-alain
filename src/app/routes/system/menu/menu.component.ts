import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScMenuService } from './menu.service';
import { ModalHelper } from '@delon/theme';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'system-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less'],
    providers:[ScMenuService]
})
export class ScMenuComponent implements OnInit, OnDestroy {

    nodes = [];
    menu: any = {};
    query = {};

    list = [];
    total = 0;
    currentPage = 1;
    pageSize = 10;

    options = [
        { value: 'menu', label: 'menu' },
        { value: 'dirt', label: 'dirt' }
    ];

    load(){
        this.scMenuService.loadData().then((res: any) =>{
            this.nodes = res;
        },err=>{
            console.log(err);
        })
    }

    loadBtn(){
        this.scMenuService.loadBtnData().then((res: any) =>{
            this.total = res.totalItems;
            this.list = res.list;
        },err=>{
            console.log(err);
        })
    }

    onEvent(ev: any) {
        console.log('line', 'onEvent', ev);
    }

    submit(){
        console.log(this.menu);
    }

    constructor(public scMenuService:ScMenuService,private modalHelper: ModalHelper,private modal: NzModalService,private msg: NzMessageService) {}

    ngOnInit() {

        this.load();
        this.loadBtn();

    }

    ngOnDestroy(): void {
    }
}

