document.getElementById("closeAnnouncement").addEventListener("click", function () {
    document.getElementById("announcement").style.display = "none";
});


var filterButtons = document.getElementsByClassName("filter-btn");
var destCards = document.getElementsByClassName("dest-card");

for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        var type = this.getAttribute("data-type");

        for (var j = 0; j < destCards.length; j++) {
            if (type === "all" || destCards[j].getAttribute("data-type") === type) {
                destCards[j].style.display = "block";
            } else {
                destCards[j].style.display = "none";
            }
        }

        for (var k = 0; k < filterButtons.length; k++) {
            filterButtons[k].classList.remove("active");
        }
        this.classList.add("active");
    });
}


function calculateCost() {
    var price = Number(document.getElementById("destination").value);
    var travelers = Number(document.getElementById("travelers").value);
    var baseCost = 0;
    var discount = 0;

    if (price > 0 && travelers > 0) {
        baseCost = price * travelers;
        if (travelers >= 5) {
            discount = baseCost * 0.10;
        }
    }

    var total = baseCost - discount;

    document.getElementById("baseCost").innerText = baseCost;
    document.getElementById("discount").innerText = discount;
    document.getElementById("totalCost").innerText = total;

    return total;
}

document.getElementById("destination").addEventListener("change", calculateCost);
document.getElementById("travelers").addEventListener("input", calculateCost);


var bookButtons = document.getElementsByClassName("book-btn");

for (var b = 0; b < bookButtons.length; b++) {
    bookButtons[b].addEventListener("click", function () {
        document.getElementById("destination").value = this.getAttribute("data-price");
        calculateCost();
        document.getElementById("booking").scrollIntoView();
    });
}


function validateForm(event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var destination = document.getElementById("destination");
    var date = document.getElementById("date").value;
    var travelers = Number(document.getElementById("travelers").value);

    var errors = [];

    if (name === "") {
        errors.push("Please enter your name.");
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    var phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        errors.push("Phone number must be exactly 10 digits.");
    }

    if (destination.value === "") {
        errors.push("Please select a destination.");
    }

    if (date === "") {
        errors.push("Please select a travel date.");
    } else {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(date) < today) {
            errors.push("Travel date cannot be in the past.");
        }
    }

    if (travelers < 1 || travelers > 10) {
        errors.push("Number of travelers must be between 1 and 10.");
    }

    var errorBox = document.getElementById("errorBox");
    var summary = document.getElementById("summary");

    if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
        errorBox.style.display = "block";
        summary.style.display = "none";
        return;
    }

    errorBox.style.display = "none";

    document.getElementById("sName").innerText = name;
    document.getElementById("sEmail").innerText = email;
    document.getElementById("sPhone").innerText = phone;
    document.getElementById("sDestination").innerText = destination.options[destination.selectedIndex].text;
    document.getElementById("sDate").innerText = date;
    document.getElementById("sTravelers").innerText = travelers;
    document.getElementById("sTotal").innerText = calculateCost();
    document.getElementById("sDiscount").innerText = document.getElementById("discount").innerText;

    summary.style.display = "block";
    summary.scrollIntoView();
}

document.getElementById("bookingForm").addEventListener("submit", validateForm);


function resetAll() {
    document.getElementById("bookingForm").reset();
    document.getElementById("baseCost").innerText = 0;
    document.getElementById("discount").innerText = 0;
    document.getElementById("totalCost").innerText = 0;
    document.getElementById("errorBox").style.display = "none";
    document.getElementById("summary").style.display = "none";
}

document.getElementById("resetBtn").addEventListener("click", resetAll);


document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("fbName").value.trim();
    var rating = document.getElementById("fbRating").value;
    var comment = document.getElementById("fbComment").value.trim();
    var msg = document.getElementById("feedbackMsg");

    if (name === "" || comment === "") {
        msg.innerText = "Please enter your name and comment.";
        msg.style.color = "red";
        return;
    }

    var review = document.createElement("div");
    review.className = "review";

    var title = document.createElement("h4");
    title.innerText = name + " - " + rating + "/5";

    var text = document.createElement("p");
    text.innerText = comment;

    review.appendChild(title);
    review.appendChild(text);

    var list = document.getElementById("reviewList");
    list.insertBefore(review, list.firstChild);

    msg.innerText = "Thank you for your feedback!";
    msg.style.color = "green";
    document.getElementById("feedbackForm").reset();
});


var questions = document.getElementsByClassName("question");

for (var q = 0; q < questions.length; q++) {
    questions[q].addEventListener("click", function () {
        var answer = this.nextElementSibling;
        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    });
}


var topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", function () {
    window.scrollTo(0, 0);
});