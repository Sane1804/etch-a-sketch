const screen = document.querySelector("#screen");

const numberInput = document.querySelector(".userInput");

const COL_VALUE = numberInput.value = 10;  

const amountOfBoxes = Number(COL_VALUE) * Number(COL_VALUE);

// this arr keep track of the last two values passed from number input
let arr = [Number(COL_VALUE)];

//use to activate and desactivate painting.
let flag = true;

const radios = document.querySelectorAll('input[type="radio"]');

const checkedRadio = document.querySelector('input[type="radio"]:checked');

let radioValue = checkedRadio.value;

let inputColor = document.querySelector('input[type="color"]');

let colorValue = inputColor.value;

let clearBtn = document.querySelector("#btn");

let allBoxes;


const gridTemplateCol = (strNum) => {
    const input = strNum;
    const output = "repeat("+input+", auto)";
    screen.style.gridTemplateColumns = output;
}
gridTemplateCol(COL_VALUE);


const randomColor = () => {
    
    const value = () => {
        let arr = [];
        for (let i = 0; i < 3; i++){
            arr.push(Math.floor(Math.random() * 256));
        }
        let output = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
        return output;
    }
    document.addEventListener("mousemove", value);
    
    return value();
}


function getColor() {
    let value = this.value;
    colorValue = value;
}

inputColor.addEventListener("input", getColor)


function getCheckedValue(){
    let value = this.value;
    radioValue = value;
}

radios.forEach(input => {
    input.addEventListener('input', getCheckedValue);
})

const color = () => {
    if (radioValue == "color"){
        return colorValue;
    } else {
        return randomColor();
    }
}


const paint = (arg) => {
    arg.target.style.backgroundColor = color();
}




const onAndOffPainting = (nodelist) => {
    const boxes = nodelist;
    boxes.forEach(elem => {
        elem.addEventListener("click", () => {
            if (flag){
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
    allBoxes = boxes
    onAndOffPainting(boxes);
}
appendBoxes(Number(amountOfBoxes));


const removeBoxes = (amount) => {
    const times = amount;
    for (let i = 0; i < times; i++){
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

const clearColor = () => {
    let boxes = document.querySelectorAll(".boxes");
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
        box.removeEventListener("mouseover", paint, true);
    })
    flag = true;
}
clearBtn.addEventListener("click", clearColor)


const changeFlag = () => {
    flag = !flag;
}

allBoxes.forEach(box => {
    box.addEventListener("click", changeFlag)
})


numberInput.addEventListener('input', function () {
    const value = this.value;
    flag = true;
    let maxValue = Number(numberInput.getAttribute("max"));
    
    if (value > maxValue) {
        numberInput.value = maxValue;
    }
    

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

    allBoxes.forEach(box => {
        box.style.backgroundColor = "white"
        box.removeEventListener("mouseover", paint, true)
        box.removeEventListener("click" , changeFlag)
        box.addEventListener("click", changeFlag);
    })
})
