//Import the express package 
const express = require('express');

//Create an express app 
const app = express();

// Body parser, for parsing data
app.use(express.urlencoded({extended: true}));


// Telling express to share files in ./server/public
// with everyone
//app.use === "middleware"
app.use(express.static('./server/public'));

//Empty array to recieve new operations to calculate

let operations= [
    '2+2'
];

//Getting the operationToHappen object from client
app.post('/calculations', (req,res) => {
    let newOperation = req.body.operationToHappen;

    operations.push(newOperation);

    calculate();
})

//function to calculate the given operation
function calculate(){
    for(let operation of operations){
        //putting all values in operation string into array of strings
       let valuesInOperation = operation.match(/[0-9]+(\.[0-9]+)?|[+\-*\/]/g);

       //loop through the new array of strings and seperate numbers
       for(let i = 0; i<valuesInOperation.length; i++){
        
        let operator;
        let operand1;
        let operand2;

        if(/[0-9]+/g.test(valuesInOperation[i])){
            
            valuesInOperation[i] = Number(valuesInOperation[i])
        }
        else{
             operator = valuesInOperation[i];
             operand1 = valuesInOperation[i - 1];
             operand2 = valuesInOperation[i + 1];
        };

        calculateOnePairOfValues(operand1, operator, operand2)
       }
    }
}

//helper function to calculate one pair of values at a time
function calculateOnePairOfValues(operand1, operator, operand2){

    let result;
    console.log(operand1)
    console.log(operand2)
    console.log(operator)

    if(operator === '+'){
        result = Number(operand1) + Number(operand2)
    }
    else if(operator === '-'){
        result = Number(operand1) - Number(operand2)
    }
    else if(operator === '*'){
        result = Number(operand1) * Number(operand2)
    }
    else if(operator === '/'){
        result = Number(operand1) / Number(operand2)
    } else {
        console.log('somethings wrong')
    }

    console.log(result)
    return result;
}












//Telling express to listen on port 5,000
const PORT = 5000;
app.listen(PORT, () => {});