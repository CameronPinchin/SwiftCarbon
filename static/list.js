// To display the summary once a user hits the given CO2
// emission count.

document.addEventListener("DOMContentLoaded", (event)=> {
    console.log("DOM fully loaded and parsed.");


    const inputForm = document.getElementById("carbon-input");
    const greenButton = document.getElementsByClassName("green-button");
    const redButton = document.getElementsByClassName("red-button");

    // Need a local dictionary to store the summaray
    var greenState = {};
    var redState = {};
    var state = {};
    var options = ["nyc", "textile", "paperback-books",
                   "iphone-13", "white-bread", "leather-shoes"];

    const carbonCap = 8300;

    function buttonClick(event) {
        const buttonClass = event.target.getAttribute('class');
        const buttonName = event.target.getAttribute('name');
        var counter;
        if(buttonName){
            if(!state[buttonName]){
                state[buttonName] = 0;
            }

            if(buttonClass === 'green-button'){
                state[buttonName]++;
                console.log(`Button [${buttonName}] clicked ${state[buttonName]} times.`);
            }

            if(buttonClass === 'red-button'){
                counter = state[buttonName];
                if(counter === 0){
                    state[buttonName] = 0;
                } else {
                    state[buttonName]--;
                }
                
                // use a max function to ensure it doesn't drop below 0
                console.log(`Button [${buttonName}] clicked ${state[buttonName]} times.`);
            }

        }
        
    }
    
   
    
    document.querySelectorAll('.green-button, .red-button').forEach(button => {
        button.addEventListener('click', buttonClick)
    });

    
    // for example,
        // var state = { "nyc" : 3,
        //               "iphone-13" : 1 }
        // would indicate they've selected the NYC trip 3
        // times, and the 'iPhone13' option 1 time. 
    
    // need to add onClick event listener


});