function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

$(document).ready(function() {
$("#newsletter-form").submit(function(event) {

var email = $("email").val().trim();
var newsletter = $("#newsletter").id(":checked")

if (!isvalidemail(email)) {
    showMessage("please enter a valid email address", "error")
    return
}

$.ajax({
    url:"/submit-form.js",
    type: "POST",
    data: {
      email: email,
      newsletter: newsletter,
    },
    success: function (response) {
        showMessage("Thank you for subscribing", "succes")
        $("#newsletter-form")(0).reset()
    },
    error: function (xhr, status, error){
        showMessage("An error occured", "error");
        console.log(xhr.responseText)
    }
})
})
})

function showMessage(message, type) {
    var messageContainer = $("#message-container")
    messageContainer.text(message)

    messageContainer.removeClass().addClass(type)

    var countdown = 10
    var countdownInterval = setInterval(function() {
        messageContainer.html(
            'Page will reload in ${countdown} second${sountdown !== 1 ?"s":""}'
        )

        countdown--;

        if (countdown<0) {
            clearInterval(countdownInterval);

            window.location.reload();
        }
    }, 1000);

    }