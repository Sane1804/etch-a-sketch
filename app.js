const screen = document.querySelector("#screen");

const userInput = document.querySelector(".userInput");

const USER_VALUE = userInput.value = 15;

const amountOfBoxes = Number(USER_VALUE) * Number(USER_VALUE);

let arr = [Number(USER_VALUE)];


const gridTemplateCol = (strNum) => {
    const input = strNum;
    const output = "repeat("+input+", auto)";
    screen.style.gridTemplateColumns = output;
}
gridTemplateCol(USER_VALUE);


const paint = (arg) => {
    arg.target.style.backgroundColor = "red";
}

const onAndOffPainting = (nodelist) => {
    const boxes = nodelist;
    boxes.forEach(elem => {
        elem.addEventListener("click", (e) => {
            if (elem.style.backgroundColor !== "red"){
                boxes.forEach(element => {
                    element.addEventListener("mouseover", paint, true);
                });
            } else {
                boxes.forEach(element => {
                    element.removeEventListener("mouseover", paint, true);
                });
            }
        })
    })
}

const appendBoxes = (amount) => {
    const times = amount;
    for (let i = 0; i < times; i++){
        const box = document.createElement("div");
        box.classList.add("boxes");
        screen.appendChild(box);
    }
    let boxes = document.querySelectorAll(".boxes");
    onAndOffPainting(boxes);
}
appendBoxes(Number(amountOfBoxes));


const removeBoxes = (amount) => {
    const times = amount;
    for (let i = 0; i < amount; i++){
        screen.removeChild(screen.firstChild);
    }
}

const removeOrAdd = (array) => {    
    if (array[1] > array[0]){
        return true;
    }
    return false;
}

const amount = (array) => {
    let newArr = array;
    const first = Math.max(...newArr);
    const second = Math.min(...newArr);
    const output = (first * first) - (second * second);
    return output;
}





userInput.addEventListener('input', function () {
    const value = this.value;
    const BOXES = document.querySelectorAll(".boxes");
    
    BOXES.forEach(elem => {
        elem.removeEventListener("mouseover", paint, true)
        elem.style.backgroundColor = "white"
    })

    if (arr.length < 2){
        arr.push(Number(value))
    } else {
        arr.shift()
        arr.push((Number(value)))
    }

    if (removeOrAdd(arr)){
        appendBoxes(amount(arr))
        gridTemplateCol(value)
    } else {
        removeBoxes(amount(arr))
        gridTemplateCol(value)
    }
})