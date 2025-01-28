const form = document.querySelector("form");
const emailinput = document.querySelector("#email");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailvalue = emailinput.value.trim();

    if (!isvalidemail(emailvalue)) {
        alert("Please enter a valid email address");
        emailinput.focus();
    } else {
        form.submit();
    }
});

function isvalidemail(email) {
    const emailregex = /\$+@\S+\.\S+/;
    return emailregex.text (email);
}