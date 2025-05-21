//for navbar
$(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("bMNPtUmgroIe3lr47");
  
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
  
        const topic = document.getElementById("topic").value;
        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;
        const email = document.getElementById("email").value;
  
        if (topic && name && message && email) {
            const mails = {
                subject: topic,
                from_name: name,
                message: message,
                email_id: email
            };
  
            emailjs.send("service_8mq6ma1", "template_wfi7h9x", mails)
                .then(function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                    document.getElementById("alert").style.visibility = "visible";
                    document.getElementById("topic").value = "";
                    document.getElementById("name").value = "";
                    document.getElementById("message").value = "";
                    document.getElementById("email").value = "";
                }, function (error) {
                    console.log("FAILED...", error);
                    document.getElementById("alert-error").style.visibility = "visible";
                });
        }
    });
  });
  
  
  //resume unavilable
  function myresume() {
    document.getElementById("alert2").style.visibility = "visible";
  }