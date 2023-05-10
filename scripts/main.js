const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "media/CRT_Splat.jpg") {
    myImage.setAttribute("src", "media/CRT_AC.jpg");
  } else {
    myImage.setAttribute("src", "media/CRT_Splat.jpg");
  }
};




let myButton = document.querySelector("button");
let myHeading = document.querySelector("h2");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Welcome, ${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Welcome, ${storedName}`;
}

myButton.onclick = () => {
  setUserName();
};

let UnList = document.getElementById('Comments');
const info = document.createElement('p');
const info2 = document.createElement('h6');


info.textContent = 'Below you can leave and edit comments!';
info2.textContent = 'These will not be saved';

document.body.appendChild(info);
document.body.appendChild(info2);
document.body.appendChild(UnList);

UnList.onclick = function() {
  const listItem = document.createElement('li');
  const listContent = prompt('Please enter List item.');
  listItem.textContent = listContent;
  UnList.appendChild(listItem);

  listItem.onclick = function(e) {
    e.stopPropagation();
    const listContent= prompt('Enter list item update here.');
    this.textContent = listContent;
  }
}


