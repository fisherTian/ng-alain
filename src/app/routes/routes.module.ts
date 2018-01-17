import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { environment } from '../../environments/environment';

import { routes } from './routes';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
import { LoginComponent } from './access/login/login.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, { useHash: environment.useHash })
    ],
    declarations: [
        DashboardWorkplaceComponent,
        LoginComponent
    ],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {}
