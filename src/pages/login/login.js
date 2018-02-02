var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, toastCtrl, authService, storage, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.storage = storage;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.login = {};
        this.submitted = false;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            var loading_1 = this.loadingCtrl.create({
                content: "<div>Login wait...</div>",
                duration: 100000000
            });
            loading_1.present();
            console.log(this.login);
            this.authService.login(this.login).subscribe(function (jsonResponse) {
                loading_1.dismiss();
                console.log(jsonResponse);
                if (jsonResponse.pass == "true") {
                    _this.storage.set('isLoggedIn', true);
                    _this.storage.set('userData', jsonResponse);
                    _this.navCtrl.setRoot(HomePage);
                    _this.showToast("Successfull Login");
                }
                else {
                    _this.showToast("Wrong username or Password");
                    _this.storage.set('isLoggedIn', false);
                    console.log("HIIIII", jsonResponse);
                }
            });
            console.log(this.login);
        }
    };
    LoginPage.prototype.showToast = function (response_message) {
        var toast = this.toastCtrl.create({
            message: response_message,
            duration: 2200
        });
        toast.present();
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController, AuthServiceProvider, Storage, Events, LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map