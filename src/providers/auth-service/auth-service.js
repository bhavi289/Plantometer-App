var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var AuthServiceProvider = /** @class */ (function () {
    //127.0.0.1:8000
    function AuthServiceProvider(http) {
        this.http = http;
        console.log('Hello AuthServiceProvider Provider');
        this.http = http;
        this.loginurl = "https://www.plantometer.pythonanywhere.com/users/api/login/";
        this.viewPlantsurl = "https://www.plantometer.pythonanywhere.com/users/api/viewPlants/";
        this.getCurrenturl = "https://www.plantometer.pythonanywhere.com/users/api/getCurrent/";
        this.changeCurrenturl = "https://www.plantometer.pythonanywhere.com/users/api/changeCurrent/";
        this.dataByDateurl = "https://www.plantometer.pythonanywhere.com/sensors/api/dataByDate/";
        this.updateActuatorurl = "https://www.plantometer.pythonanywhere.com/users/api/updateActuator/";
        this.controlActuatorurl = "https://www.plantometer.pythonanywhere.com/users/api/actuatorOnOff/";
    }
    AuthServiceProvider.prototype.login = function (user_credentials) {
        var body = {
            "login": true,
            "json_data": user_credentials,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log(body);
        return this.http.post(this.loginurl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.viewPlants = function (id) {
        var body = {
            "id": id,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log("hi id = ", body);
        return this.http.post(this.viewPlantsurl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.getCurrent = function (id) {
        var body = {
            "id": id,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log("hi id = ", body);
        return this.http.post(this.getCurrenturl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.changeCurrent = function (curPlant, id) {
        var body = {
            "cp": curPlant,
            "id": id,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log("hi id = ", body);
        return this.http.post(this.changeCurrenturl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.dataByDate = function (option, id, curPlant) {
        var body = {
            "option": option,
            "id": id,
            "curPlant": curPlant,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log("hi id = ", body);
        return this.http.post(this.dataByDateurl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.updateActuator = function (mode, curPlant, id) {
        var body = {
            "mode": mode,
            "id": id,
            "curPlant": curPlant,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log("hi id = ", body);
        return this.http.post(this.updateActuatorurl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.controlActuator = function (mode, curPlant, link) {
        var link2 = link;
        var data = {
            "btn": mode,
            "plant_id": curPlant,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log("hi id = ", data, link2);
        return this.http.post(link2, data, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.controlActuator2 = function (mode, curPlant, link) {
        var body = {
            "mode": mode,
            "curPlant": curPlant,
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        });
        var options = new RequestOptions({ headers: headers });
        console.log("hi id = ", body);
        return this.http.post(this.controlActuatorurl, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthServiceProvider.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    };
    AuthServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map