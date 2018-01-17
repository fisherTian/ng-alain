import { Router } from '@angular/router';
import { Injectable, Injector,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private injector: Injector,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) { }

    private goLogin() {
        const router = this.injector.get(Router);
        this.injector.get(Router).navigate([ '/access/login' ]);
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            let user = this.tokenService.get().user==null?null:JSON.parse(this.tokenService.get().user);
            let role = this.tokenService.get().role;
            let menu = this.tokenService.get().menu==null?[]:JSON.parse(this.tokenService.get().menu);

            if(user==null || menu.length==0){
                this.goLogin();
                resolve(null);
            }else{
                // 初始化菜单
                this.menuService.clear();
                this.menuService.add(menu);
                if(user){
                    //设置用户信息
                    this.settingService.setUser({
                        name: user.name,
                        email: user.mail,
                        avatar:user.avatar
                    });
                }
                // ACL：设置权限为全量
                if(role){
                    this.aclService.setRole([role]);
                    this.menuService.resume((item) => {
                        item.hide = item.acl && !this.aclService.can(item.acl);
                    });
                }
            }

            this.httpClient.get('assets/app-data.json')
                           .subscribe((res: any) => {

                               // 应用信息：包括站点名、描述、年份
                                this.settingService.setApp(res.app);
                                // 用户信息：包括姓名、头像、邮箱地址
                                //this.settingService.setUser(res.user);
                                // ACL：设置权限为全量
                                //this.aclService.setFull(false);
                                // 设置页面标题的后缀
                                this.titleService.suffix = res.app.name;
                                // 用户信息：包括姓名、头像、邮箱地址
                                resolve(res);
                            }, (err: HttpErrorResponse) => {
                                resolve(null);
                            });
        });
    }
}
