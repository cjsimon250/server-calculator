$(document).ready(onReady);

//Global array to recieve operations
let operations = [];

function onReady() {
  $(".calculation-btns-box").on(
    "click",
    "button:not(#btn-equals)",
    addValueToInputfield
  );

  $("#btn-equals").on("click", onSubmitInputs);

  $("#btn-clear").on("click", clearInputs);

  $("#clear-history").on("click", clearHistory);

  render();
}

//Function to add values to the input field
function addValueToInputfield() {
  let id = $(this).attr("id");
  let buttonValue = $(`#${id}`).text();
  let currentInputValue = $("#calculation-input").val();

  $("#calculation-input").val(currentInputValue + buttonValue);
}

//Fetch completed calculations & render
function fetchOperation() {
  $.ajax({
    url: "/calculations",
    method: "GET",
  })
    .then((response) => {
      operations = response;

      render();
    })
    .catch((error) => {
      console.log("fetchOperation not working properly");
    });
}

//Function to run on "="
function onSubmitInputs() {
  let newOperation = {
    operationToHappen: $("#calculation-input").val(),
  };

  //Sending the 'newOperation' object to the array
  $.ajax({
    url: "/calculations",
    method: "POST",
    data: newOperation,
  })
    .then((response) => {
      //After posting to server fetch and render to DOM
      fetchOperation();
    })
    .catch((error) => {
      console.log("onSubmitInputs not working properly");
    });

}

//Function to clear input
function clearInputs() {
  $("#calculation-input").val("");

  render();
}

//Render to the DOM
function render() {
  $("#calculation-history").empty();

  for (let operation of operations) {
    $("#calculation-history").append(`
    <li>${operation.newOperation} = ${operation.answer}</li>
    `);

    if (operations.indexOf(operation) === operations.length - 1) {
      let answer = operation.answer;
      $("#answer").text(`${answer}`);
    }
  }
}

//Function to clear history and previous answer
function clearHistory() {
    $.ajax({
        url: "/clear-history",
        method: "POST",
        data: operations
    })
      .then((response)) => {
        
      }

  
  }

  //operations = [];
  
  //$("#answer").text("");
//
  //$("#calculation-history").empty();

  //render();