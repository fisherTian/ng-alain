import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
        public http:HttpClient,
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
                    this.tokenService.set({
                        token:res.token
                    });
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
