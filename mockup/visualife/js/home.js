/* Author:
    rexy hoang
*/

/*
 * skrollr.init({
 *     forceHeight: false
 * });
 */

$(function(){

    $(".app-info").click(function(e) {
        $(".app-intro").slideToggle(function() {
            // if slide is down (slide up)
            if ($('.app-intro').is(":hidden"))
            {
                $(".app-intro").children().css('visibility', 'hidden');
                setTimeout( function() {
                    // $(".app-intro").children().fadeIn();
                }, 200);
                console.log('d');
            } else  {
                setTimeout( function() {
                    $(".app-intro").children().css('visibility', 'visible');
                }, 200);
                console.log('up');
            }
        });
        e.preventDefault();
    });

    $("body").on( "click", '.close-btn', function(e) {
        $(this).css('visibility', 'hidden');
        $(".app-intro").children().css('visibility', 'hidden');
        // .fadeOut(function() {
            setTimeout( function() {
                $(".app-intro").slideUp();
            }, 500);
        // });
        e.preventDefault();
    });

    $("#user-data").validate({
        rules: {
            name: "required",
            "month-ob": "required",
            "day-ob": "required",
            "year-ob": "required",
            gender: "required",
            location: "required"
        },
        groups: {
                DateofBirth: "day-ob month-ob year-ob"
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "day-ob" || element.attr("name") == "month-ob" || element.attr("name") == "year-ob")
                error.insertAfter("#YearOfBirth");
            else
                error.insertAfter( element );
        },
        submitHandler: function (form) {
            // setup some local variables
            var $form = $(form);
            // let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");
            // serialize the data in the form
            var serializedData = $form.serialize();

            // let's disable the inputs for the duration of the ajax request
            $inputs.prop("disabled", true);

            // fire off the request to /form.php

            request = $.ajax({
                url: "email.php",
                type: "post",
                data: serializedData
            });

            // callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR) {
                // log a message to the console
                // console.log("Hooray, it worked!");
                $("#form").hide();
                $(".thanks").fadeIn();
                // alert("success awesome");
                // $('#add--response').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong>Well done!</strong> You successfully read this important alert message.</div>');
            });

            // callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                // console.error("The following error occured: " + textStatus + errorThrown);
                // console.error("The following error occured: " + textStatus);
            });

            // callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // reenable the inputs
                $inputs.prop("disabled", false);
            });

        }
    
    });

});
