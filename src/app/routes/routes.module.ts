import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { environment } from '../../environments/environment';

import { routes } from './routes';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
import { ProUserLoginComponent } from './pro/user/login/login.component';
import { ExtrasPoiComponent } from './poi/poi.component';
import { ExtrasPoiEditComponent } from './poi/edit/edit.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, { useHash: environment.useHash }),
        PagesModule
    ],
    declarations: [
        DashboardWorkplaceComponent,
        ProUserLoginComponent,
        ExtrasPoiComponent,
        ExtrasPoiEditComponent
    ],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {}
