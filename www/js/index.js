/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function cambiarTexto(){
    $("#phongapTest").html('reacciona a clicks que llama funciones dentro de la pagina');

    // navigator.notification.beep(2);
   // navigator.vibrate(3000);
}

$( document ).on( "pageinit", "#usersignup", function( event ) {
    $("#phongapTest").html('jQuery is running on phone gap');
    $("#textchange").click(function(){
        cambiarTexto();
    });


    $("#signup").click(function(){
        var fullname=$("#fullname").val();
        var email=$("#email").val();
        var password=$("#password").val();
        console.log(fullname + email + password);


        var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&signup=";
        if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0)
        {
            $.ajax({
                type: "POST",
                url: url,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function(){ $("#signup").val('Connecting...');},
                success: function(data){
                    if(data=="success")
                    {
         $("#phongapTest").html("Thank you for Registering with us! you can login now");
                    }
                    else if(data="exist")
                    {
         $("#phongapTest").html("Hey! You alreay has account! you can login with us");
                    }
                    else if(data="failed")
                    {
         $("#phongapTest").html("Something Went wrong");
                    }
                }
            });
        }return false;
    });






    //navigator.notification.beep(2);
    //navigator.vibrate(3000);
});



var app = {
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


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};
