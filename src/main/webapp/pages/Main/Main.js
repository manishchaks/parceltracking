Application.$controller("MainPageController", ["$scope", function($scope) {
    "use strict";

    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function() {

        // Constants 
        var GOOGLE_MAPS_API_KEY = "AIzaSyBzs_6EsdrgAmboMDgXKFm0_Iv_78EE-_Y";

        var map;

        var contentString = "parcel_id: 803266<br> county_id: 53029 <br> county_name: Island <br> muni_name: South Whidbey <br> state_abbr: WA <br> addr_street_name: 88 <br> addr_street_type: <br> census_zip: 98260<br> mail_address3: LANGLEY WA 98260<br> mkt_val_land: 235000.00 <br> mkt_val_bldg: 0.00 <br> mkt_val_tot: 235000.00 <br> muni_id: 1939637 <br> school_dist_id: 5308190 <br> acreage_calc: 25.44<br>";
        // Initalize Google Maps API
        function initMap() {
            map = new google.maps.Map(document.getElementById('gMapsDiv'), {
                center: new google.maps.LatLng(48.03, -122.4),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            map.addListener('click', function(event) {
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    position: event.latLng
                });
                infowindow.open(map);
                updateLatLong(event.latLng.lat(), event.latLng.lng());
            })
        }

        // Updates lat and long in the static variable as well as triggers a call to the API
        function updateLatLong(lat, long) {
                // the data has to be of the form
                $scope.Widgets.pointLabel.caption = "POINT(" + lat + " " + long + ")";
                $scope.Variables.svPointData.setData("POINT(" + lat + " " + long + ")");
                console.log("svPointData set to" + $scope.Variables.svPointData.getData());
                // $scope.Variables.svReportallUsa.update()
            }
            // method to load script, after all WM scripts have loaded. Uses JQuery
        function loadScript(scriptUrl) {
                console.log("Starting load of: " + scriptUrl)
                $.getScript(scriptUrl, function() {
                    console.log("Script loaded successfully")
                    initMap()
                })
            }
            // Load Google Maps with given API KEY. Call initMap() method once
            // loaded.
        loadScript("https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_API_KEY)
    }

    $scope.svReportallUsaonSuccess = function(variable, data) {};
}]);