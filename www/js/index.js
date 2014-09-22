/*
 * Phorbo Cordova index.js 201408*pike
 */
var app = {

    testurl : 'http://forbophoto.kw.nl/test.html',
    uploadurl : 'http://forbophoto.kw.nl/upload.php',

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

    },
    getPicture: function() {
         navigator.camera.getPicture(
            app.uploadPicture,
            function(message) { alert('get picture failed'); },
            { 
                quality: 50, 
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.CAMERA 
            }
        );
    },
    uploadPicture: function (imageURI) {
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI; //.substr(imageURI.lastIndexOf('/')+1)+'.png';
        //options.mimeType="text/plain";

        var params = new Object();
        options.params = params;

        var ft = new FileTransfer();
        ft.upload(
            imageURI, 
            encodeURI(app.uploadurl), 
            app.uploadSuccess, 
            app.uploadFail, 
            options
        );
    },
    uploadSuccess: function(response) {
        navigator.notification.alert("Upload success " + response.bytesSent,null,'Sent','Wow');
        console.log("Code = " + response.responseCode);
        console.log("Response = " + response.response);
        console.log("Sent = " + response.bytesSent);
    },

    uploadFail: function (error) {
        navigator.notification.alert("An error has occurred: Code = " + error.code,null,'Failed','Ouch');
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

};
