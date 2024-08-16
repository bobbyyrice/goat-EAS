const divContainer = document.querySelector(".divContainer");
const button = document.querySelector(".button");
const slider = document.querySelector("#gridSizeSlider");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const colorPicker = document.querySelector("#colorPicker");
const rainbowModeBtn = document.querySelector("#rainbowMode");
const colorModeBtn = document.querySelector("#colorMode");

let currentColor = colorPicker.value;
let isRainbowMode = false;
let isMouseDown = false;

slider.addEventListener("input", function () {
    gridSizeLabel.textContent = slider.value;
    updateGrid();
});

colorPicker.addEventListener("input", function () {
    currentColor = colorPicker.value; 
    isRainbowMode = false; 
});

rainbowModeBtn.addEventListener("click", function () {
    isRainbowMode = true; 
});

colorModeBtn.addEventListener("click", function () {
    isRainbowMode = false; 
});

button.addEventListener("click", function () {
    clearGrid(); 
});

function updateGrid() {
    const gridSize = parseInt(slider.value);
    divContainer.innerHTML = '';

    divContainer.style.setProperty('--grid-size', gridSize);

    const totalDivs = gridSize * gridSize;

    const fragment = document.createDocumentFragment(); 

    for (let i = 1; i <= totalDivs; i++) {
        const createDiv = document.createElement("div");
        createDiv.classList.add("divClass");
        createDiv.style.touchAction = 'none'; 
        createDiv.style.userSelect = 'none';
        fragment.appendChild(createDiv);
    }

    divContainer.appendChild(fragment); 

    divContainer.addEventListener("mousedown", function(e) {
        e.preventDefault(); 
        if (e.target.classList.contains("divClass")) {
            isMouseDown = true;
            e.target.style.backgroundColor = isRainbowMode ? getRandomRainbowColor() : currentColor;
        }
    });

    document.addEventListener("mouseup", function() {
        isMouseDown = false;
    });

    divContainer.addEventListener("mouseover", function(e) {
        if (isMouseDown && e.target.classList.contains("divClass")) {
            e.target.style.backgroundColor = isRainbowMode ? getRandomRainbowColor() : currentColor;
        }
    });
}

function clearGrid() {
    const cells = divContainer.querySelectorAll('.divClass');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'lightgray'; 
    });
}

function getRandomRainbowColor() {
    const rainbowColors = [
        '#FF0000', 
        '#FF7F00', 
        '#FFFF00', 
        '#00FF00', 
        '#0000FF', 
        '#4B0082', 
        '#8B00FF'  
    ];
    const randomIndex = Math.floor(Math.random() * rainbowColors.length);
    return rainbowColors[randomIndex];
}

updateGrid();
