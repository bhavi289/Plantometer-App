import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    Nav,
    MenuController,
    ToastController,
    LoadingController

  } from 'ionic-angular';

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

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name: string;
  key: any =[];
  value: any =[];
  dict: any =[];
  public curPlant;
  public actuator;
  public isToggled=false;
  public actuatorcontrol;
  public actuatorstatus;
  public actuatorlink;
  public str;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public authService: AuthServiceProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
                content: "<div>Refreshing</div>",
                duration: 100000000
    });
    loading.present();
    this.storage.get('userData').then((val) => {
      this.authService.getCurrent(val['id']).subscribe((jsonResponse) => {
        this.curPlant=jsonResponse.id;
        console.log("Current Plant is",this.curPlant);
        this.storage.set("curPlant",this.curPlant);
        this.actuatorcontrol=jsonResponse.actuatorcontrol;
        this.actuatorstatus=jsonResponse.actuatorstatus;
        this.actuatorlink=jsonResponse.actuatorlink;

        console.log("actuator",this.actuatorlink);
        if(this.actuatorstatus==1){
          this.isToggled=true;
        }
        else{
          this.isToggled=false;
        }
      });
    });

    console.log('ionViewDidLoad HomePage',this.actuator);
    this.storage.get('userData').then((val) => {
    	this.name=val['name'];
    	//this.curPlant=val['currentplant'];  
    	console.log(this.curPlant);
      this.authService.viewPlants(val['id']).subscribe((jsonResponse) => {
      var i=0;
      console.log(jsonResponse);
      for (let prop in jsonResponse) {
        this.key[i]=prop;
        this.value[i]=jsonResponse[this.key[i]];
        this.dict[i]=[this.key[i],this.value[i]];
        i=i+1;

    }
      console.log("pages",this.key);
      console.log("pages2",this.value);
      });
    	
    })
    loading.dismiss();

    
    
  }
  logout(){
  	// this.storage.remove('userData');
   //      this.storage.set('isLoggedIn',false);
   //      this.storage.remove('userData');

        this.navCtrl.setRoot(LoginPage);
  }
  public notify() {  
    console.log("Toggled: "+ this.isToggled,this.actuatorlink);
    if(this.isToggled==true){
      this.str="true";
    }
    else if(this.isToggled==false){
      this.str="false";
    }
    
    this.storage.get('curPlant').then((val) => {

      this.authService.controlActuator2(this.str,val,this.actuatorlink).subscribe((jsonResponse) => {
        
        //this.actuatorstatus=jsonResponse.actuatorstatus;
        console.log(this.actuatorstatus,jsonResponse);
      });
    })
  }

  graphs(selectedPlant: number){
    console.log("selected plant is",selectedPlant);
    this.navCtrl.push(GraphsPage, {"plant":selectedPlant});
  }

  onSelectChange(selectedValue: number) {
    console.log('Selected', selectedValue);
    this.storage.set('curPlant',selectedValue);
    this.authService.changeCurrent(selectedValue,5).subscribe((jsonResponse) => {
      this.actuatorcontrol=jsonResponse.actuatorcontrol;
      this.actuatorstatus=jsonResponse.actuatorstatus;
      this.actuatorlink=jsonResponse.actuatorlink;
      this.refresh();
    });
    
  }

  onSelectChange2(selectedValue:number){
    this.storage.get('curPlant').then((val) => {
      this.authService.updateActuator(selectedValue,val,5).subscribe((jsonResponse) => {
        this.refresh();
      });
    })
  }
  
  refresh(){
    console.log("refreshing")
    //this.ionViewDidLoad();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
