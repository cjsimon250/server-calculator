//Import the express package
const express = require("express");

//Create an express app
const app = express();

//Body parser, for parsing data
app.use(express.urlencoded({ extended: true }));

//Telling express to share files in ./server/public
//with everyone
//app.use === "middleware"
app.use(express.static("./server/public"));

//Empty array to recieve new objects with calculated operations
let operations = [];

//GET the updated data from the 'operations' array
// & send it back to the client side
app.get("/calculations", (req, res) => {
  res.send(operations);
});

//Getting the operationToHappen object from client
app.post("/calculations", (req, res) => {
  let newOperation = req.body.operationToHappen;

  let answer = calculate(newOperation);

  let completedOperation = {
    newOperation,
    answer,
  };

  //Push completed operation object into operations
  operations.push(completedOperation);

  res.sendStatus(201);
});

//Function to calculate the given operation
function calculate(string) {
  //Putting all values in 'operation' string into array of strings
  let valuesInOperation = string.match(/[0-9]+(\.[0-9]+)?|[+\-*\/]/g);

  //Loop through array and change all numbers to numbers
  for (let i = 0; i < valuesInOperation.length; i++) {
    if (/[0-9]+/g.test(valuesInOperation[i])) {
      valuesInOperation[i] = Number(valuesInOperation[i]);
    }
  }
  //Loop to keep calculating while there are still things in the array
  while (valuesInOperation.length > 1) {
    let indexOfHighestOperation =
      findIndexOfHighestOperation(valuesInOperation);
    let operator = valuesInOperation[indexOfHighestOperation];
    let operand1 = valuesInOperation[indexOfHighestOperation - 1];
    let operand2 = valuesInOperation[indexOfHighestOperation + 1];

    let result = calculateOnePairOfValues(operand1, operator, operand2);

    valuesInOperation.splice(indexOfHighestOperation - 1, 3, result);
  }

  return valuesInOperation[0];
}

//Function to find index of the highest ranking operator
function findIndexOfHighestOperation(array) {
  if (array.indexOf("*") !== -1) {
    return array.indexOf("*");
  } else if (array.indexOf("/") !== -1) {
    return array.indexOf("/");
  } else if (array.indexOf("+") !== -1) {
    return array.indexOf("+");
  } else if (array.indexOf("-") !== -1) {
    return array.indexOf("-");
  }
}

//Helper function to calculate one pair of values at a time
function calculateOnePairOfValues(operand1, operator, operand2) {
  let result;

  if (operator === "+") {
    result = Number(operand1) + Number(operand2);
  } else if (operator === "-") {
    result = Number(operand1) - Number(operand2);
  } else if (operator === "*") {
    result = Number(operand1) * Number(operand2);
  } else if (operator === "/") {
    result = Number(operand1) / Number(operand2);
  } else {
    console.log("somethings wrong");
  }

  return result;
}

//Telling express to listen on port 5,000
const PORT = 5000;
app.listen(PORT, () => {});
