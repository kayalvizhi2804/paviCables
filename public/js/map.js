mapboxgl.accessToken =
	"pk.eyJ1IjoiMThpdHIwNDMiLCJhIjoiY2tub3RwbGowMDN6bDJwcW01eWxyNjUwMSJ9.q7EkIeg3VcNCHAaECn9xNA";
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v10",
	zoom: 12,
	center: [78.596307, 11.154521],
});
async function getHotels() {
	const res = await fetch("/home/get");
	const data = await res.json();
	const stores = data.data.map((store) => {
		return {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [
					store.location.coordinates[1],
					store.location.coordinates[0],
				],
			},
			properties: {
				storeId: store.hotelName,
				icon: "cat",
			},
		};
	});
	loadMap(stores);
}

function loadMap(hotels) {
	map.on("load", function () {
		// Load an image from an external URL.
		map.loadImage(
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
			function (error, image) {
				if (error) throw error;

				// Add the image to the map style.
				map.addImage("cat", image);
				console.log(hotels);
				map.addSource("point", {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: hotels,
					},
				});
				map.addLayer({
					id: "points",
					type: "symbol",
					source: "point", // reference the data source
					layout: {
						"icon-image": "cat", // reference the image
						"icon-size": 0.25,
					},
				});
			}
		);
	});
}
setInterval(getHotels(), 1000);
