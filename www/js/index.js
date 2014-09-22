/*
 * Phorbo Cordova index.js 201408*pike
 */
var app = {

    testurl : 'http://forbophoto.kw.nl/test.html',

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // check if there is a connection
        $.get( app.testurl, function( data ) {
            $("#remote .listening" ).hide();
            $("#remote .received" ).html( data ).show();
        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        $('#'+id+' .listening').hide();
        $('#'+id+' .received').show();
        console.log('Received Event: ' + id);

    }
};
