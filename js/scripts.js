var key = "AIzaSyD6TDHrXIR0a9jE2WOZZ032U6vT3eTFli4";
var api = "https://www.googleapis.com/books/v1/volumes?q=";

$(document).ready(function () {

    $("#search").click(function () {
        var query = $("#search-text").val();
        var url = api + query + "&key=" + key;
        var data = $.get(url);
        //Function that runs when the API runs successfully
        data.done(function (response) {
            //Because the API returns an array, get the first element.
            console.log(response);
            var info0 = response.items[0].volumeInfo;
            $("#search-results-title").html(info0.title);
            $("#search-results-author").html(info0.authors[0]);
            $("#modalSearch").modal();
        });
    });




    // $(".hidden").hide();
    // $("#btnChildren").click(function () {
    //   $(".hidden").hide();
    //   $("#children").toggle();
    // });
    // $("#btnTeen").click(function () {
    //   $(".hidden").hide();
    //   $("#teen").toggle();
    // });
    // $("#btnAdult").click(function () {
    //   $(".hidden").hide();
    //   $("#adult").toggle();
    // });

    // $("#join").click(function () {
    //   $("#welcome").show();
    //   $("#welcome").html("Welcome to the mailing list. We added " + $("#email").val() + " as you requested.");
    // });

});


var formRecommend = document.getElementById("form-recommend");
async function handleRecommendSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("formRecommendError");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: formRecommend.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formRecommend.reset();
            $("#modalRecommend").modal("hide");
        } else {
            status.innerHTML = "Please fill out the form."
        }

    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
    });
}
if (formRecommend) {
    formRecommend.addEventListener("submit", handleRecommendSubmit);
}

var formMailing = document.getElementById("form-mailing-list");
async function handleMailingSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-mailing-message");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: formMailing.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formMailing.reset()
            status.innerHTML = "Thanks for your submission!";
            status.classList.add("alert-success");
            status.classList.remove("alert-danger");
        } else {
            status.innerHTML = "Please enter a valid email address."
            status.classList.add("alert-danger");
            status.classList.remove("alert-success");
        }

    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
    });
}

if (formMailing) {
    formMailing.addEventListener("submit", handleMailingSubmit);
}