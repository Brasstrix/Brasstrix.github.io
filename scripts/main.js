const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/holo.png") {
    myImage.setAttribute("src", "images/holo2.png");
    alert('Changing image!');
  } else {
    myImage.setAttribute("src", "images/holo.png");
    alert('Changing image!');
  }
};




let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Hello. ${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Hello. , ${storedName}`;
}

myButton.onclick = () => {
  setUserName();
};