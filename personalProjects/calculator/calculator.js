const display = document.querySelector("p");
const buttons = document.querySelectorAll("button");


display.style.fontSize = "20px";
display.style.fontWeight = "700";

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener("click", ()=> {
        const value = button.textContent;

        if(value === "AC"){
            currentInput = "";
            display.textContent = "";
        }
        else if(value === "="){
            try {
                display.textContent = eval(currentInput.replace("X", "*").replace(",", "."));
                currentInput = display.textContent.toString();
            } catch (error) {
                display.textContent = "Error!";
                currentInput = "";
            }
        } else{
            if (value === "X"){
                currentInput += "*";
                display.textContent += "x" 
            } else if(value === ","){
                currentInput += ".";
                display.textContent += ",";
            } else{
                currentInput += value;
                display.textContent += value;
            }
        }


    })
})
