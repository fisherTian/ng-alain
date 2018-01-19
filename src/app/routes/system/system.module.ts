import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ScUserComponent } from './user/user.component';
import { ScUserEditComponent } from './user/edit/edit.component';
import { ScDeptComponent } from './dept/dept.component';
import { ScMenuComponent } from './menu/menu.component';
import { ScGroupComponent } from './group/group.component';
import { ScGroupEditComponent } from './group/edit/edit.component';
import { ScGroupUserComponent } from './group/user/user.component';
import { NzTreeModule } from 'ng-tree-antd';
const routes: Routes = [
    { path: 'user', component: ScUserComponent },
    { path: 'dept', component: ScDeptComponent },
    { path: 'menu', component: ScMenuComponent },
    { path: 'group', component: ScGroupComponent }
];

const COMPONENTS_NOROUNT = [ ScUserEditComponent,ScGroupEditComponent,ScGroupUserComponent ];

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
        ScMenuComponent,
        ScGroupComponent,
        ...COMPONENTS_NOROUNT
    ],
    exports: [
        RouterModule
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class SystemModule { }
