import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ScUserComponent } from './user/user.component';
import { ScUserEditComponent } from './user/edit/edit.component';
import { ScDeptComponent } from './dept/dept.component';
import { NzTreeModule } from 'ng-tree-antd';
const routes: Routes = [
    { path: 'user', component: ScUserComponent },
    { path: 'dept', component: ScDeptComponent }
];

const COMPONENTS_NOROUNT = [ ScUserEditComponent ];

@NgModule({
    imports: [
        SharedModule,
        NzTreeModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    declarations: [
        ScUserComponent,
        ScDeptComponent,
        ...COMPONENTS_NOROUNT
    ],
    exports: [
        RouterModule
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class SystemModule { }
