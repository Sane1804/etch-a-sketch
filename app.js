const screen = document.querySelector("#screen");

const userInput = document.querySelector(".userInput");

const USER_VALUE = userInput.value = 60;

const amountOfBoxes = Number(USER_VALUE) * Number(USER_VALUE);

let arr = [Number(USER_VALUE)];

let count = 0;

const radio = document.querySelectorAll('input[type="radio"]');

const checkedRadio = document.querySelector('input[type="radio"]:checked');

let radioValue = checkedRadio.value;

let inputColor = document.querySelector('input[type="color"]');

let colorValue = inputColor.value;


const gridTemplateCol = (strNum) => {
    const input = strNum;
    const output = "repeat("+input+", auto)";
    screen.style.gridTemplateColumns = output;
}
gridTemplateCol(USER_VALUE);


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

radio.forEach(input => {
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
    // let count = 0;
    boxes.forEach(elem => {
        elem.addEventListener("click", (e) => {
            if (count < 1){
                boxes.forEach(element => {
                    element.addEventListener("mouseover", paint, true);
                    count++
                });
            } else {
                boxes.forEach(element => {
                    element.removeEventListener("mouseover", paint, true);
                    count--;
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





userInput.addEventListener('input', function () {
    const value = this.value;
    const BOXES = document.querySelectorAll(".boxes");
    
    BOXES.forEach(elem => {
        elem.removeEventListener("mouseover", paint, true)
        elem.style.backgroundColor = "white"
        count = 0;
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