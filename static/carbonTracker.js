//DOM = Document Object Module.
document.addEventListener("DOMContentLoaded", (event)=> {
    console.log("DOM fully loaded and parsed.");

    const counterDisplay = document.getElementById("carbon-counter");
    const addButton = document.getElementById("green-button");
    const removeButton = document.getElementById("red-button");
    const inputForm = document.getElementById("carbon-input");

    var carbonActivityDict = {
        "nyc": 1.2,
        "textile": 1400,
        "paperback-books": 10,
        "iphone-13": 5,
        "white-bread": 1100,
        "leather-shoes": 150
    };
    var carbonCounter = 0;
    
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });


    function updateFromAddButton(inputName){
        const carbonEmissionVal = carbonActivityDict[inputName] || 0;
        carbonCounter += carbonEmissionVal;
        updateDisplay();
    }

    function updateFromRemoveButton(inputName){
        const carbonEmissionVal = carbonActivityDict[inputName] || 0;
        carbonCounter = Math.max(0, carbonCounter - carbonEmissionVal);
        updateDisplay();
    }
    
    function updateFromInput(){
        for(const input of inputForm.elements){
            if(input.type === "number" && carbonActivityDict[input.name]) {
                carbonCounter += input.value * carbonActivityDict[input.name];
            }
        }
        updateDisplay();
    }
    
    function updateDisplay(){
        counterDisplay.textContent = carbonCounter.toFixed(1) + " tn";
    }
    
    
    // add Button functions, very likely a better way to do this.
    document.addEventListener("click", (event) => {
        const button = event.target;

        if (button.classList.contains("green-button")) {
            event.preventDefault();
            updateFromAddButton(button.name);
        } else if (button.classList.contains("red-button")) {
            event.preventDefault();
            updateFromRemoveButton(button.name);
        }
    });
     
    inputForm.addEventListener("input", (event) => {
        event.preventDefault();
        updateFromInput();
    });


});

