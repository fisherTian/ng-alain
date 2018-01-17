import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ScUserComponent } from './user/user.component';
import { ScUserEditComponent } from './user/edit/edit.component';
const routes: Routes = [
    { path: 'user', component: ScUserComponent }
];

const COMPONENTS_NOROUNT = [ ScUserEditComponent ];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    declarations: [
        ScUserComponent,
        ...COMPONENTS_NOROUNT
    ],
    exports: [
        RouterModule
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class SystemModule { }
