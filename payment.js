var paymentForm = document.getElementById('payment-Form');
var payButton = document.getElementById('pay-button')

paymentForm.addEventListener("submit", function(event){
    event.preventDefault();

    var name = document.querySelector("#name").value
    var cardNumber = document.querySelector("#card-number").value
    var cvc = document.querySelector("#cvc").value
    var expirationDate = document.querySelector("#expiration-date").value

    if (
     name.trim() === "" ||
     cardNumber.trim() === "" ||
     cvc.trim() === "" ||
     expirationDate.trim === ""
     ) {
        alert("Please fill all required fields");
        return;
    } 

    if (!cardNumber.match(/^\d{13,16}$/)) {
        alert("please enter a valid card number")
        return
    }

    if (!cvc.match(/^\d{3,4}$/)) {
        alert("please enter a valid cvc")
        return
    }

    document.getElementById("success-message").style.display = "block"

    paymentForm.style.filter = "blur(4px)"

    paymentForm.reset()
})