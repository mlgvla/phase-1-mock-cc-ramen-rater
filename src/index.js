document.addEventListener("DOMContentLoaded", () => {
  getRamens();
  setRamenForm();
});

function getRamens() {
  fetch("http://localhost:3000/ramens")
    .then((r) => r.json())
    .then((ramens) => displayRamen(ramens));
}

function displayRamen(ramens) {
  let ramenMenuDiv = document.getElementById("ramen-menu");
  ramenMenuDiv.innerHTML = ""

  ramens.forEach((ramen) => {
    let ramenImg = document.createElement("img");
    ramenImg.src = ramen.image;
    ramenImg.id = ramen.id;
    ramenImg.addEventListener("click", () => getRamen(ramen.id));
    ramenMenuDiv.appendChild(ramenImg);
  });
}

function getRamen(ramenId) {
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then((r) => r.json())
    .then((ramen) => showRamenDetail(ramen));
}

function showRamenDetail(ramen) {
  let ramenImg = document.querySelector(".detail-image");
  ramenImg.src = ramen.image;

  let name = document.querySelector(".name");
  name.innerHTML = ramen.name;

  let restaurant = document.querySelector(".restaurant");
  restaurant.innerHTML = ramen.restaurant;

  let rating = document.getElementById("rating-display");
  rating.innerHTML = ramen.rating;

  let comment = document.getElementById("comment-display");
  comment.innerHTML = ramen.comment;
}

function setRamenForm() {
  let ramenForm = document.getElementById("new-ramen");
  ramenForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newName = document.getElementById("new-name").value;
    let newRestaurant = document.getElementById("new-restaurant").value;
    let newImage = document.getElementById("new-image").value;
    let newRating = document.getElementById("new-rating").value;
    let newComment = document.getElementById("new-comment").value;

    let formData = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    };
    addRamen(formData);
    ramenForm.reset()
  });
}

function addRamen(formData) {
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then(() => getRamens())
}
