var map,
	nav = [];

$(document).ready(function(){
	//initialise a map
	init();

	$.get('locations.kml', function(data){
		html = '';

		//loop through placemarks tags
		$(data).find('Placemark').each(function(index, value){
			//get coordinates and place name
			coords = $(this).find('coordinates').text();
			place = $(this).find('name').text();
			//store as JSON
			c = coords.split(',')
			nav.push({
				'place': place,
				'lat': c[0],
				'lng': c[1]
			});

			//output as a navigation
			html += '<li>' + place + '</li>';

console.log(place);

			var pos = new google.maps.LatLng(c[1], c[0]),
				infowindow = new google.maps.InfoWindow({
					content: '<div><img style="width: 800px" class="artImage" src="' + place + '"></div>'	
				});

			var marker = new google.maps.Marker({
				position: pos,
				map: map,
				title: place
			});

			marker.addListener('click', function() {
				infowindow.open(map, marker);
			});

			map.panTo(pos);
		});

		//output as a navigation
		$('.navigation').append(html);

		//bind clicks on your navigation to scroll to a placemark

		$('.navigation li').bind('click', function(){
			panToPoint = new google.maps.LatLng(nav[$(this).index()].lng, nav[$(this).index()].lat)
			map.panTo(panToPoint);
		})

	});

	function init(){
		var latlng = new google.maps.LatLng(-43.552965, 172.47315);
		var myOptions = {
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map'), myOptions);
	}
})
