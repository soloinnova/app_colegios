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

function getUserName(email){
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
$(document).on("pageinit", "#home", function (event) {
    var loginState = localStorage.login;
    if (loginState == 'false'){
        $("#loginbtnContainer").show();
        $("#logoutbtnContainer").hide();
        $("#login-test").html('');
    }else if (loginState == 'true' ){
        $("#loginbtnContainer").hide();
        $("#logoutbtnContainer").show();

        $("#login-test").html('Bienvenido');
    }




    $("#logoutBtn").click(function(){
        localStorage.login="false";
        window.location.href = "index.html";
    });


});

$(document).on("pageinit", "#userlogin", function (event) {
    $("#phongapTest").html('jQuery is running on phone gap');

    // on click login ajax
    $("#login").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        //var url = "http://192.168.1.9/app_colegios_parse/login.php";// ip casa
        var url = "http://192.168.0.107/app_colegios_parse/login.php";// ip edificio nert 2
        //console.log(fullname + email + password);
        //navigator.notification.beep(1);
        $.ajax({
                method: "POST",
                url: url,
                data: {email: email, password: password}
            })
            .done(function (data) {
                // $("#phongapTest").html(data);
                if (data == "login") {
                    /*$("#phongapTest").html(data);
                    navigator.notification.alert(
                        'Usuario creado exitosamente',  // message
                        alertDismissed,         // callback
                        'Oferta',            // title
                        'Cerrar'                  // buttonName
                    );*/
                    localStorage.login="true";
                    localStorage.email=email;
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
        var url = "http://192.168.0.107/app_colegios_parse/signup.php";
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
