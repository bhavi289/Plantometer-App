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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { GraphsPage } from '../graphs/graphs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, storage, authService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.key = [];
        this.value = [];
        this.dict = [];
        this.isToggled = false;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "<div>Refreshing</div>",
            duration: 100000000
        });
        loading.present();
        this.storage.get('userData').then(function (val) {
            _this.authService.getCurrent(val['id']).subscribe(function (jsonResponse) {
                _this.curPlant = jsonResponse.id;
                console.log("Current Plant is", _this.curPlant);
                _this.storage.set("curPlant", _this.curPlant);
                _this.actuatorcontrol = jsonResponse.actuatorcontrol;
                _this.actuatorstatus = jsonResponse.actuatorstatus;
                _this.actuatorlink = jsonResponse.actuatorlink;
                console.log("actuator", _this.actuatorlink);
                if (_this.actuatorstatus == 1) {
                    _this.isToggled = true;
                }
                else {
                    _this.isToggled = false;
                }
            });
        });
        console.log('ionViewDidLoad HomePage', this.actuator);
        this.storage.get('userData').then(function (val) {
            _this.name = val['name'];
            //this.curPlant=val['currentplant'];  
            console.log(_this.curPlant);
            _this.authService.viewPlants(val['id']).subscribe(function (jsonResponse) {
                var i = 0;
                console.log(jsonResponse);
                for (var prop in jsonResponse) {
                    _this.key[i] = prop;
                    _this.value[i] = jsonResponse[_this.key[i]];
                    _this.dict[i] = [_this.key[i], _this.value[i]];
                    i = i + 1;
                }
                console.log("pages", _this.key);
                console.log("pages2", _this.value);
            });
        });
        loading.dismiss();
    };
    HomePage.prototype.logout = function () {
        // this.storage.remove('userData');
        //      this.storage.set('isLoggedIn',false);
        //      this.storage.remove('userData');
        this.navCtrl.setRoot(LoginPage);
    };
    HomePage.prototype.notify = function () {
        var _this = this;
        console.log("Toggled: " + this.isToggled, this.actuatorlink);
        if (this.isToggled == true) {
            this.str = "true";
        }
        else if (this.isToggled == false) {
            this.str = "false";
        }
        this.storage.get('curPlant').then(function (val) {
            _this.authService.controlActuator2(_this.str, val, _this.actuatorlink).subscribe(function (jsonResponse) {
                //this.actuatorstatus=jsonResponse.actuatorstatus;
                console.log(_this.actuatorstatus, jsonResponse);
            });
        });
    };
    HomePage.prototype.graphs = function (selectedPlant) {
        console.log("selected plant is", selectedPlant);
        this.navCtrl.push(GraphsPage, { "plant": selectedPlant });
    };
    HomePage.prototype.onSelectChange = function (selectedValue) {
        var _this = this;
        console.log('Selected', selectedValue);
        this.storage.set('curPlant', selectedValue);
        this.authService.changeCurrent(selectedValue, 5).subscribe(function (jsonResponse) {
            _this.actuatorcontrol = jsonResponse.actuatorcontrol;
            _this.actuatorstatus = jsonResponse.actuatorstatus;
            _this.actuatorlink = jsonResponse.actuatorlink;
            _this.refresh();
        });
    };
    HomePage.prototype.onSelectChange2 = function (selectedValue) {
        var _this = this;
        this.storage.get('curPlant').then(function (val) {
            _this.authService.updateActuator(selectedValue, val, 5).subscribe(function (jsonResponse) {
                _this.refresh();
            });
        });
    };
    HomePage.prototype.refresh = function () {
        console.log("refreshing");
        //this.ionViewDidLoad();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, AuthServiceProvider, LoadingController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map