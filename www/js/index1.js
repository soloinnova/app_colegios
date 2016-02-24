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

$(document).bind("mobileinit", function () {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});

function alertDismissed() {
    // do something
}

function getUserName(email) {
    var username;
    var url = '';
    $.ajax({
            method: "POST",
            url: url,
            data: {emailUser: email}
        })
        .done(function (data) {

            if (data == "login") {

            }
            else if (data == "exist") {

            }
            else if (data == "failed") {

            }
        });
    return username
}

function cambiarTexto() {
    $("#phongapTest").html('reacciona a clicks que llama funciones dentro de la pagina');

    // navigator.notification.beep(2);
    // navigator.vibrate(3000);
}



// handle APNS notifications for iOS
function onNotificationAPN(e) {
    if (e.alert) {
        $("#app-status-ul").append('<li>push-notificação: ' + e.alert + '</li>');
        // showing an alert also requires the org.apache.cordova.dialogs plugin
        navigator.notification.alert(e.alert);
    }

    if (e.sound) {
        // playing a sound also requires the org.apache.cordova.media plugin
        var snd = new Media(e.sound);
        snd.play();
    }

    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
}


// handle GCM notifications for Android
function onNotification(e) {
    $("#gcm_id").append('<li>EVENTO -> RECIBIDO:' + e.event + '</li>');

    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                $("#gcm_id").append('<li>REGISTRANDO -> REG ID: \n\n' + e.regid + "\n\n</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground) {
                $("#gcm_id").append('<li>--NOTIFICATIONS ON LINE--' + '</li>');

                // on Android soundname is outside the payload.
                // On Amazon FireOS all custom attributes are contained within payload
                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                // playing a sound also requires the org.apache.cordova.media plugin
                var my_media = new Media("/android_asset/www/" + soundfile);
                my_media.play();
            }
            else {	// otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                    $("gcm_id").append('<li>--NOTIFICATIONS RECIBIDAS--' + '</li>');
                else
                    $("#gcm_id").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }

            $("#gcm_id").append('<li>MENSAGEM -> MSG: ' + e.payload.message + '</li>');
            //android only
            $("#gcm_id").append('<li>MENSAGEM -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            //amazon-fireos only
            $("#gcm_id").append('<li>MENSAGEM -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
            break;

        case 'error':
            $("#gcm_id").append('<li>ERRO -> MSG:' + e.msg + '</li>');
            break;

        default:
            $("#gcm_id").append('<li>EVENTO -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}


function tokenHandler (result) {
    $("#gcm_id").append('<li>token: '+ result +'</li>');
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
}

function successHandler (result) {
    $("#gcm_id").append('<li>sucesso:'+ result +'</li>');
}

function errorHandler (error) {
    $("#gcm_id").append('<li>erro:'+ error +'</li>');
}




$(document).on("insert_curses", "#home", function (event) {

});

$(document).on("pageinit", "#home", function (event) {
    var loginState = localStorage.login;
    if (loginState == 'false') {
        $("#loginbtnContainer").show();
        $("#logoutbtnContainer").hide();

        $("#login-test").html('');
    } else if (loginState == 'true') {
        $("#loginbtnContainer").hide();
        $("#logoutbtnContainer").show();

        $("#login-test").html('Bienvenido');
    }


    $("#logoutBtn").click(function () {
        localStorage.login = "false";
        window.location.href = "index.html";
    });


});


$(document).on("pageinit", "#notifications", function (event) {
    $("#phongapTest").html('jQuery is running on phone gap');

    var pushNotification;


    try {
        pushNotification = window.plugins.pushNotification;
        $("#gcm_id").append('<li>Registrando o ' + device.platform + '</li>');
        if (device.platform == 'android' || device.platform == 'Android' ||
            device.platform == 'amazon-fireos') {
            pushNotification.register(successHandler, errorHandler, {"senderID": "313938936203", "ecb": "onNotification"});		// required!
        } else {
            pushNotification.register(tokenHandler, errorHandler, {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            });	// required!
        }
    }
    catch (err) {
        txt = "Error.\n\n";
        txt += "Descripcion del error : " + err.message + "\n\n";
        alert(txt);
    }
});


$(document).on("pageinit", "#userlogin", function (event) {
    $("#phongapTest").html('jQuery is running on phone gap');

    // on click login ajax
    $("#login").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        //var url = "http://192.168.1.9/app_colegios_parse/login.php";// ip casa
        var url = "http://soloinnova.net/app_colegios_parse/login.php";// ip edificio nert 2
        //console.log(fullname + email + password);
        //navigator.notification.beep(1);
        $.ajax({
                method: "POST",
                url: url,
                data: {email: email, password: password}
            })
            .done(function (data) {
                 //$("#phongapTest").html(data);
                if (data == "login") {
                    /*$("#phongapTest").html(data);
                     navigator.notification.alert(
                     'Usuario creado exitosamente',  // message
                     alertDismissed,         // callback
                     'Oferta',            // title
                     'Cerrar'                  // buttonName
                     );*/
                    localStorage.login = "true";
                    localStorage.email = email;
                    window.location.href = "index.html";
                    navigator.notification.beep(2);
                    navigator.vibrate(3000);
                }
                else if (data == "exist") {
                    $("#phongapTest").html(data);
                    stop();
                }
                else if (data == "failed") {
                    $("#phongapTest").html(data);
                    stop();
                }
            });

    });


});

$(document).on("pageinit", "#usersignup", function (event) {
    $("#phongapTest").html('jQuery is running on phone gap');
    $("#textchange").click(function () {
        cambiarTexto();
    });

    $("#signup").click(function () {
        var fullname = $("#fullname").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var url = "http://soloinnova.net/app_colegios_parse/signup.php";
        //console.log(fullname + email + password);
        //navigator.notification.beep(1);
        $.ajax({
                method: "POST",
                url: url,
                data: {fullname: fullname, email: email, password: password}
            })
            .done(function (data) {
                // $("#phongapTest").html(data);
                if (data == "success") {
                    $("#phongapTest").html(data);
                    navigator.notification.alert(
                        'Usuario creado exitosamente',  // message
                        alertDismissed,         // callback
                        'Oferta',            // title
                        'Cerrar'                  // buttonName
                    );
                    navigator.notification.beep(2);
                    navigator.vibrate(3000);


                }
                else if (data == "exist") {
                    $("#phongapTest").html(data);
                    stop();
                }
                else if (data == "failed") {
                    $("#phongapTest").html(data);
                    stop();
                }
            });


        //var dataString = "fullname=" + fullname + "&email=" + email + "&password=" + password + "&signup=";
        //if ($.trim(fullname).length > 0 & $.trim(email).length > 0 & $.trim(password).length > 0) {
        /*    $.ajax({
         type: "POST",
         url: url,
         data: { fullname: fullname, email: email, password:password },
         crossDomain: true,
         cache: false,
         beforeSend: function () {
         $("#signup").val('Connecting...');
         },
         success: function (data) {
         if (data == "success") {
         $("#phongapTest").html(data);
         }
         else if (data == "exist") {
         $("#phongapTest").html(data);
         }
         else if (data == "failed") {
         $("#phongapTest").html(data);
         }
         }
         });*/
        //}
        //return false;
    });


    //navigator.notification.beep(2);
    //navigator.vibrate(3000);
});


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        //  $.mobile.allowCrossDomainPages = true;


    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};
