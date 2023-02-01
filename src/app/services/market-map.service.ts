import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GoogleMap, MapAnchorPoint, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Injectable({
  providedIn: 'root'
})
export class MarketMapService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private spinner:NgxSpinnerService) {

   }

  center: google.maps.LatLngLiteral ;

   markets: any = [{}];

   marketMarkers: any = [{}];

 
   loadAllmarkets() {
    this.marketMarkers = [];

    navigator.geolocation.getCurrentPosition((position) => {
        this.marketMarkers.push({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          title: 'User Location',
          info: 'User Location',
          id: -1,
          options: {
            animation: google.maps.Animation.DROP,
            icon:{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
          },
          
        })
      });
       
     // 1- Show Spinner
     this.spinner.show();
     // 2- http.get(url)
     this.http.get('https://localhost:44366/api/Market').subscribe(
       (result) => {
         this.markets = result;
         this.markets.forEach((element:any) => {
          const icon ={
            url: ("../../assets/Images/"+element.imagE_PATH), // url
            scaledSize: new google.maps.Size(150, 150), 
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(50, 50)
          }
          this.marketMarkers.push({
            position: {
              lat: element.lat,
              lng: element.lng,
            },
            
            title: element.marketName,
            info: 'Marker info ' + (this.marketMarkers.length + 1),
            id: element.id,
            options: {
              animation: google.maps.Animation.DROP,
              icon: icon
            },
            
          })
         });
         this.spinner.hide(); 
 
       }, err => {
         this.toastr.error(err.message, err.status)
       }
     )
   }

   locateMarket(id: number){
    this.markets.forEach((element:any) => {
      if(element.id == id){
        this.center = {
          lat: element.lat,
          lng: element.lng,
        }
      }
    });

  }

  locateNearest(){

    navigator.geolocation.getCurrentPosition((position) => {
      var curlat = position.coords.latitude;
      var curlng = position.coords.longitude;
      var lat = curlat;
      var lng = curlng;
      var R = 6371; // radius of earth in km
      var distances = [];
      var closest = -1;
      var pi = Math.PI;

    for(var i=0 ;i<this.markets.length; i++ ) {  

        var lat2 = this.markets[i].lat;
        var lon2 = this.markets[i].lng;

        var chLat = lat2-curlat;
        var chLon = lon2-curlng;

        var dLat = chLat*(pi/180);
        var dLon = chLon*(pi/180);

        var rLat1 = curlat*(pi/180);
        var rLat2 = curlng*(pi/180);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        
        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }

    this.toastr.info("Market " + this.markets[closest].marketName + " is nearest to your location!")
    this.center = {
      lat: this.markets[closest].lat,
      lng: this.markets[closest].lng,
    }
    });
    

  }

  searchMarkets(name:any) {

    navigator.geolocation.getCurrentPosition((position) => {

      this.marketMarkers = [];
        this.marketMarkers.push({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          title: 'User Location',
          info: 'User Location',
          id: -1,
          options: {
            animation: google.maps.Animation.DROP,
            icon:{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
          },
          
        })
      });
       
     // 1- Show Spinner
     this.spinner.show();
     // 2- http.get(url)
     this.http.get('https://localhost:44366/api/Market/SearchMarket/'+name).subscribe(
       (result) => {
         this.markets = result;
         this.markets.forEach((element:any) => {
          const icon ={
            url: ("../../assets/Images/"+element.imagE_PATH), // url
            scaledSize: new google.maps.Size(150, 150), 
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0, 0)
          }
      
          this.marketMarkers.push({
            position: {
              lat: element.lat,
              lng: element.lng,
            },
            title: element.marketName,
            info: 'Marker info ' + (this.marketMarkers.length + 1),
            id: element.id,
            options: {
              animation: google.maps.Animation.DROP,
              icon: icon
            },
            
          })
         });
         this.spinner.hide(); 
 
       }, err => {
         this.toastr.error(err.message, err.status)
       }
     )
   }

}



