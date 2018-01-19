import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'system-role-edit',
    templateUrl: './edit.component.html'
})
export class ScRoleEditComponent implements OnInit {
    item: any;

    constructor(
        private modalHelper: ModalHelper,
        private subject: NzModalSubject,
        public msgSrv: NzMessageService) { }

    ngOnInit() {
        console.log(this.item);
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
