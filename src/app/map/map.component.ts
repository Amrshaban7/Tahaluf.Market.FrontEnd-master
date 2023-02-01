import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleMap, MapAnchorPoint, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarketMapService } from '../services/market-map.service';
import { MarketService } from '../services/market.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  searchBar = new FormControl('');

  zoom = 14;

  markers:any[] = [];
  infoContent = '';


  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 12,
    zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_CENTER
    },
    styles: [
      {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 40
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7f8d89"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#2b3638"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#2b3638"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#24282b"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#24282b"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      }
  ],

}

  constructor(public marketMap:MarketMapService,public market:MarketService, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    let searchText = localStorage.getItem('marketSearch');

    if(searchText!= null && searchText!=""){
    this.toastr.info("Search Result For \""+ searchText+"\"")
    this.marketMap.searchMarkets(searchText);
    localStorage.removeItem('marketSearch');
    }
    else{
      this.marketMap.loadAllmarkets();
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.marketMap.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  click(event: google.maps.MapMouseEvent) {
    console.log(event)
  }

  addMarker() {
    const icon ={
      url: "../../assets/Images/c70f155c-7eee-405f-bf40-a920cb6023a7_CityCentre High Res.png", // url
      scaledSize: new google.maps.Size(150, 150), 
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 0)
    };

    this.markers.push({
      position: {
        lat: this.marketMap.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.marketMap.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      /* label: {
        color: '#088178',
        fontWeight  : "bold",
        text: 'Marker label ' + (this.markers.length + 1),
      }, */
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
        icon: icon
      },
      
    })
  }

  openInfo(id:any ) {
    if(id != -1){
    this.market.loadMarket(id);
    localStorage.setItem('loadedMarketId', id.toString());
    this.router.navigate(["Market"]);}
  }

  loadMarket(id: number){

    this.market.loadMarket(id);
    localStorage.setItem('loadedMarketId', id.toString());
    this.router.navigate(["Market"]);
  }
  locateMarket(id: number){
    this.marketMap.locateMarket(id);
  }

  locateNearest(){
    this.marketMap.locateNearest();
  }

  searchMarkets(){
    if
    (this.searchBar.value == "") this.marketMap.loadAllmarkets();
    else
    this.marketMap.searchMarkets(this.searchBar.value);
  }

}
