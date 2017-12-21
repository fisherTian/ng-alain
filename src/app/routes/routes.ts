import { LayoutComponent } from '../layout/layout.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
import { ProUserLoginComponent } from './pro/user/login/login.component';
import { ProUserLayoutComponent } from '../layout/pro/user/user.component';
export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard/workplace', pathMatch: 'full' },
            { path: 'dashboard/workplace', component: DashboardWorkplaceComponent, data: { translate: '工作台' } },
            { path: 'logics', loadChildren: './logics/logics.module#LogicsModule' }
        ]
    },
    // 全屏布局
    {
        path: 'data-v',
        component: LayoutFullScreenComponent,
        children: [
            { path: '', loadChildren: './data-v/data-v.module#DataVModule' }
        ]
    },
    // pro 单页，存在此原因是体验更好，这样不必在首次Angular运行后还需要下载模块文件才会渲染成功
    {
        path: 'pro/user',
        component: ProUserLayoutComponent,
        children: [
            { path: 'login', component: ProUserLoginComponent }
        ]
    },
    // 单页不包裹Layout
    /*{ path: 'login', component: LoginComponent, data: { title: 'login' } },*/

];
