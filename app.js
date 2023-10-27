const screen = document.querySelector("#screen");

let userInput = document.querySelector(".userInput");

let userValue = userInput.value = 15;

const amountOfBoxes = Number(userValue) * Number(userValue);

let arr = [Number(userValue)];

const gridTemplateCol = (strNum) => {
    const input = strNum;
    const output = "repeat("+input+", auto)";
    screen.style.gridTemplateColumns = output;
}
gridTemplateCol(userValue);


const appendBoxes = (amount) => {
    const times = amount;
    for (let i = 0; i < times; i++){
        const box = document.createElement("div");
        box.classList.add("boxes");
        screen.appendChild(box);    
    }
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
    console.log(arr[0], arr[1]);

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
    console.log(arr);
})