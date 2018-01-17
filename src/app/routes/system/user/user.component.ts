import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScUserService } from './user.service';
import { ModalHelper } from '@delon/theme';
import { ScUserEditComponent } from './edit/edit.component';
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

    constructor(public scUserService:ScUserService,private modalHelper: ModalHelper) {}

    ngOnInit() {

        this.load();

    }

    ngOnDestroy(): void {
    }
}

