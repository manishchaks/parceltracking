Application.$controller("MainPageController", ["$scope", function($scope) {
    "use strict";

    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function() {

        // Constants
        var GOOGLE_MAPS_API_KEY = "AIzaSyBzs_6EsdrgAmboMDgXKFm0_Iv_78EE-_Y";


        /*
         * variables can be accessed through '$scope.Variables' property here
         * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
         * $scope.Variables.loggedInUser.getData()
         *
         * widgets can be accessed through '$scope.Widgets' property here
         * e.g. to get value of text widget named 'username' use following script
         * '$scope.Widgets.username.datavalue'
         */



        // method to intialize a Map
        var map;

        function initMap() {
            map = new google.maps.Map(document.getElementById('gMapsDiv'), {
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 8
            });
        }

        // method to load script, after all WM scripts have loaded. Uses JQuery
        function loadScript(scriptUrl) {
            console.log("Starting load of: " + scriptUrl)
            $.getScript(scriptUrl, function() {
                console.log("Script loaded successfully")
                initMap()
            })

        }

        // Load Google Maps with given API KEY. Call initMap() method once loaded. 
        loadScript("https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_API_KEY);
    };

}]);