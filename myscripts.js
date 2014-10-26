        var directionsDisplay = [];
        var rendererOptionsR = {
		    preserveViewport: true,         
		    suppressMarkers:true,					
		    polylineOptions: {
			      strokeColor: "red"
			 }
		};
		 var rendererOptionsB = {
		    preserveViewport: true,         
		    suppressMarkers:true,		   
		    polylineOptions: {
			      strokeColor: "blue"
			 }
		};
		 var rendererOptionsG = {
		    preserveViewport: true,         
		    suppressMarkers:true,		   
		    polylineOptions: {
			      strokeColor: "green"
			 }
		};
		var directionsService = new google.maps.DirectionsService();
		var map;
		var waypts = [];		
			
		function initialize() {
		  directionsDisplay[0] = new google.maps.DirectionsRenderer(rendererOptionsR);	
		  directionsDisplay[1] = new google.maps.DirectionsRenderer(rendererOptionsB);	
		  directionsDisplay[2] = new google.maps.DirectionsRenderer(rendererOptionsG);		  
		  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
		  var mapOptions = {
		    zoom:7,
		    center: chicago,
			draggable: true
		  }
		  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);		
		  var locs = [ "chicago", "san francisco", "oklahoma city", "chapel hill", 
						"durham", "raleigh", "dallas", "houston", "seattle", "new york"];		
			var geocoder =  new google.maps.Geocoder();
			for(var t in locs) {
				 
				  geocoder.geocode( { 'address': locs[t]}, function(results, status) {
				  if (status == google.maps.GeocoderStatus.OK) {					
					waypts.push({
					location: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()) ,
					stopover: true});					
				  } else {
					alert("Something got wrong " + status);
				  }
				});					
			}			
		}
		
		function calcRoute() {
		  var start = document.getElementById("start").value;
		  var end = document.getElementById("end").value;		 
		  var requestW = {
		    origin:start,
		    destination:end,
		    provideRouteAlternatives: true,
			optimizeWaypoints: true,
		    travelMode: google.maps.TravelMode.WALKING	    
		  };
		  var requestT = {
		    origin:start,
		    destination:end,
		    provideRouteAlternatives: true,			
			optimizeWaypoints: true,
		    travelMode: google.maps.TravelMode.TRANSIT	    
		  };
		  var requestD = {
		    origin:start,
		    destination:end,
		    provideRouteAlternatives: true,			
			optimizeWaypoints: true,
		    travelMode: google.maps.TravelMode.DRIVING	    
		  };
		  
		  directionsDisplay[0].setMap(map);
		  directionsService.route(requestD, function(result, status) {
		    if (status == google.maps.DirectionsStatus.OK) {		        
		      directionsDisplay[0].setDirections(result);
		      getDistance(result, 10, "Driving");			            
		    }
		  });
		   directionsDisplay[1].setMap(map);
		  directionsService.route(requestT, function(result, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		        
		      directionsDisplay[1].setDirections(result);
		      getDistance(result, 15, "Transit");	
		            
		    }
		  });  	 	
		directionsDisplay[2].setMap(map);
		  directionsService.route(requestW, function(result, status) {
		    if (status == google.maps.DirectionsStatus.OK) {		        
		      directionsDisplay[2].setDirections(result);
		      getDistance(result, 100, "Walk");			            
		    }
		  }); 	
		//cscript //NoLogo curlie.wsf -o ggl.ico http://www.google.com/favicon.ico
		//end of calcRoute
		}
		
		function getDistance(result, cost, mode) {
			console.log("here:" + mode + ":" + result.routes.length + "Cost:" + cost);
			for(var route in result.routes) {
				console.log(route.legs);
				for(var legs in route.legs) {
					console.log(legs);
					}
			}
	
			var total = 0;
			var givenroute;			
			for(j = 0; j < result.routes.length; j++) {
				total = 0;
				givenroute = result.routes[j];
				for(i = 0; i < givenroute.legs.length; i++ ) {
					total += givenroute.legs[i].distance.value;
				}
				total = total/1000;
				console.log(mode + " " + total);
				if(mode == "Driving") 
					document.getElementById("totalD").innerHTML = total + " kms Costs: $" + total*cost ;
				if(mode == "Transit")
					document.getElementById("totalT").innerHTML = total + " kms Costs: $" + total*cost ;
			}
		}
		function post(url, data, headers, success) {
			$.ajax({
			beforeSend: function(xhr){
				$.each(headers, function(key, val) {
					xhr.setRequestHeader(key, val);
				});
			xhr.setRequestHeader('Content-Length', data.length);
			}
			type: "POST",
			url: https://www.googleapis.com/qpxExpress/v1/resourcePath?parameters,
			processData: false,
			data: data,
			dataType: "xml",
			success: success
    });
}
			
      google.maps.event.addDomListener(window, 'load', initialize);