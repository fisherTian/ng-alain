import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

@Component({
    selector: 'pro-user-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ],
    providers: [ SocialService ]
})
export class ProUserLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private settingService: SettingsService,
        public http:HttpClient,
        public aclServ:ACLService,
        private menuSrv: MenuService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, Validators.required]
        });
    }

    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }

    // endregion

    private reMenu() {
        this.menuSrv.resume((item) => {
            item.hide = item.acl && !this.aclServ.can(item.acl);
        });
    }

    submit() {
        this.error = '';
        this.userName.markAsDirty();
        this.password.markAsDirty();

        // mock http
        this.loading = true;
        let body = {account:this.userName.value,password:this.password.value};
        console.log(body);
        this.http.post('/login/in',null,{params:body})
            .subscribe((res: any) => {
                this.loading = false;
                if(res.auth){

                    let user = JSON.stringify(res.user);

                    //存储token,用户信息以及角色
                    this.tokenService.set({
                        token:res.token,
                        user:user,
                        role:res.role
                    });

                    //设置用户信息
                    this.settingService.setUser({
                        name: res.user.name,
                        email: res.user.mail,
                        avatar:res.user.avatar
                    });

                    //初始化菜单权限
                    this.aclServ.setRole([res.role]);
                    this.reMenu();

                    this.router.navigate(['/']);
                }else{
                    this.error = `账号或密码错误`;
                };
            }, (err: HttpErrorResponse) => {
                this.loading = false;
                this.error = `服务器错误`;
                console.log(err);
            });

        /*setTimeout(() => {
            this.loading = false;
            if (this.type === 0) {
                if (this.userName.value !== 'admin' || this.password.value !== '888888') {
                    this.error = `账户或密码错误`;
                    return;
                }
            }

            this.tokenService.set({
                token: '123456789',
                name: this.userName.value,
                email: `cipchk@qq.com`,
                id: 10000,
                time: +new Date
            });
            this.router.navigate(['/']);
        }, 1000);*/
    }

    ngOnDestroy(): void {

    }
}
