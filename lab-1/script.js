const button = document.querySelector("button")

button.addEventListener("click", newName)

function newName() {
    const name = prompt("Enter a new name");
    button.textContent = `Player1: ${name}`;
}