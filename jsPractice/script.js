const button = document.querySelector("button")

button.addEventListener("click", newName) 
button.addEventListener("mouseout", newColor)
button.addEventListener("mouseover", msg)

function newName() {
    const name = prompt("Enter a new name");
    button.textContent = `Player1: ${name}`;
}

function newColor() {
    const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
}

function random(number) {
    return Math.floor(Math.random() * (number +1));
}

function msg () {
    console.log("When you move this mouse the color will change")
}