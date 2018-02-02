import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html',
})
export class GraphsPage {
 
   
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('lineCanvas2') lineCanvas2;
    @ViewChild('lineCanvas3') lineCanvas3;
    @ViewChild('lineCanvas4') lineCanvas4;

    
    public i=1;
   
    plant:any;

    date:any;
    distance:any;
    humidity:any;
    soilmoist:any;
    temp:any;
    time:any;

    lineChart4: any;
    lineChart3: any;
    lineChart2: any;
    lineChart1: any;
    label:any;
 
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public authService: AuthServiceProvider, public loadingCtrl: LoadingController) {
        
        this.plant=navParams.get("plant")
    }
 
    ionViewDidLoad() {
        console.log("graphs.ts")
        console.log(this.plant);
        console.log(this.distance,this.soilmoist)
        let loading = this.loadingCtrl.create({
                content: "<div>Data is Loading.</div>",
                duration: 10000000000000
            });
        loading.present();
        this.authService.dataByDate(this.i ,5, this.plant).subscribe((jsonResponse) => {
         console.log("Response=",jsonResponse);
         this.date=jsonResponse.date;
         this.distance=jsonResponse.distance;
         this.humidity=jsonResponse.humidity;
         this.soilmoist=jsonResponse.soilmoist;
         this.temp=jsonResponse.temp;
         this.time=jsonResponse.time;

         if(this.i==1){
           this.label=[1,'',2,'',3,'',4,'',5,'',6,'',7,'',8,'',9,'',10];
         }
         else if(this.i==2){
           this.label=[1,2,3,4,5,6,7];
         }
         else if(this.i==3){
           this.label=[1,'',3,'',5,'',7,'',9,'',11,'',13];
         }
         else if(this.i==4){
           this.label=[1,'',3,'',5,'',7,'',9,'',11,'',13,'',15,'',17,'',19,'',21,'',23,'',25,'',27,'',29];
         }

         this.plotGraph(this.label,this.temp,this.distance,this.humidity,this.soilmoist);
         loading.dismiss();
         console.log("label array=",this.label);
         console.log(this.date, this.distance, this.humidity, this.soilmoist, this.temp, this.time);
        });

      /*this.authService.waterLevel().subscribe((jsonResponse) => {

      });*/
 
 
        
 
    }
    refresh(){
    this.ionViewDidLoad();
  }

    plotGraph(label:any,temp:any,distance:any,humidity:any,soilmoist:any){
     // console.log("canvas=",this.lineCanvas.nativeElement);
      if(this.lineChart1){
        console.log("hi im destroying",this.lineChart1);

        this.lineChart1.destroy();
      }
      this.lineChart1 = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: label,
                datasets: [
                    {
                        label: "Temperature",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,0,0,0.4)",
                        borderColor: "rgba(255,0,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: temp,
                        spanGaps: false,
                    }
                ]
            }
 
        });
        //this.lineChart.destroy();
        if(this.lineChart2){
          console.log("hi im destroying",this.lineChart2);

          this.lineChart2.destroy();
        }
        this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
 
            type: 'line',
            data: {
                labels: label,
                datasets: [
                    {
                        label: "Soil Moisture",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(0, 181, 81,0.4)",
                        borderColor: "rgba(0, 181, 81,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(0, 181, 81,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: soilmoist,
                        spanGaps: false,
                    }
                ]
            }
 
        });
        if(this.lineChart3){
          console.log("hi im destroying",this.lineChart3);

          this.lineChart3.destroy();
        }

        this.lineChart3 = new Chart(this.lineCanvas3.nativeElement, {
 
            type: 'line',
            data: {
                labels: label,
                datasets: [
                    {
                        label: "Water Level",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: distance,
                        spanGaps: false,
                    }
                ]
            }
 
        });
        if(this.lineChart4){
          console.log("hi im destroying",this.lineChart4);

          this.lineChart4.destroy();
        }
        this.lineChart4 = new Chart(this.lineCanvas4.nativeElement, {
 
            type: 'line',
            data: {
                labels: label,
                datasets: [
                    {
                        label: "Humidity",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(0, 0, 112,0.4)",
                        borderColor: "rgba(0, 0, 112,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: humidity,
                        spanGaps: false,
                    }
                ]
            }
 
        });
        

    }

    getData(){
      // this.authService.(val['id']).subscribe((jsonResponse) => {
      //     this.curPlant=jsonResponse.id;
      //     console.log("Current Plant is",this.curPlant);
      //     this.storage.set("curPlant",this.curPlant);
      //   });
    }

    onSelectChange(selectedValue: number) {
      console.log('Selected', selectedValue);
      //this.storage.set('curPlant2',selectedValue);
      /*this.authService.dataByDate(selectedValue,5, this.plant).subscribe((jsonResponse) => {
         console.log("Response=",jsonResponse);
    });*/
       this.i=selectedValue;
       this.ionViewDidLoad();
    
  }


 
 
}
