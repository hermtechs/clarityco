// code AJAX form submissions
// Select all forms with the class 'my-form-class'
var forms = document.querySelectorAll(".contact-form");

forms.forEach(function (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission
    var status = form.querySelector("#my-form-status"); // Get the status element within the current form
    console.log(form);
    console.log(status);
    var data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          status.style.color = "#28a745"; // Set success color
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
              status.style.color = "#fb5353"; // Set error color
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form";
              status.style.color = "#fb5353"; // Set error color
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form";
        status.style.color = "#fb5353"; // Set error color
      });
  });
});
