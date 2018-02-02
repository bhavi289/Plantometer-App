import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

    loginurl : string;
    viewPlantsurl : string;
    getCurrenturl : string;
    changeCurrenturl : string;
    dataByDateurl : string;
    updateActuatorurl: string;
    controlActuatorurl: string;
//127.0.0.1:8000
    constructor(public http: Http) {
        console.log('Hello AuthServiceProvider Provider');
        this.http = http;
        this.loginurl = "http://plantometer.pythonanywhere.com/users/api/login/";
        this.viewPlantsurl = "http://plantometer.pythonanywhere.com/users/api/viewPlants/";
        this.getCurrenturl="http://plantometer.pythonanywhere.com/users/api/getCurrent/";
        this.changeCurrenturl="http://plantometer.pythonanywhere.com/users/api/changeCurrent/";
        this.dataByDateurl="http://plantometer.pythonanywhere.com/sensors/api/dataByDate/";
        this.updateActuatorurl="http://plantometer.pythonanywhere.com/users/api/updateActuator/";
        this.controlActuatorurl="http://plantometer.pythonanywhere.com/users/api/actuatorOnOff/";

    }

    login(user_credentials) {
        let body = {
            "login":true,
            "json_data":user_credentials,
        };

        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log(body);
        return this.http.post(this.loginurl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    viewPlants(id){
        let body = {
            "id":id,
        };
        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log("hi id = ",body);
        return this.http.post(this.viewPlantsurl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    getCurrent(id){
        let body = {
            "id":id,
        };

        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log("hi id = ",body);
        return this.http.post(this.getCurrenturl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    changeCurrent(curPlant,id){
        let body = {
            "cp":curPlant,
            "id":id,
        };

        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log("hi id = ",body);
        return this.http.post(this.changeCurrenturl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    dataByDate(option,id,curPlant){
        let body = {
            "option":option,
            "id":id,
            "curPlant":curPlant,
        };

        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log("hi id = ",body);
        return this.http.post(this.dataByDateurl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    updateActuator(mode,curPlant,id){
        let body = {
            "mode":mode,
            "id":id,
            "curPlant":curPlant,
        };

        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log("hi id = ",body);
        return this.http.post(this.updateActuatorurl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    controlActuator(mode,curPlant, link){
        let link2=link;
        let data = {
            "btn":mode,
            "plant_id":curPlant,
        };

        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log("hi id = ",data, link2);
        return this.http.post(link2, data, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    controlActuator2(mode,curPlant, link){
        let body = {
            "mode":mode,
            "curPlant":curPlant,
        };

        let headers = new Headers({
            'Content-Type' : 'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers});
        console.log("hi id = ",body);
        return this.http.post(this.controlActuatorurl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

}

