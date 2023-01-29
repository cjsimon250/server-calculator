$(document).ready(onReady);

//global array to recieve operations
let operations = [];

function onReady() {
  $(".calculation-btns-box").on(
    "click",
    "button:not(#btn-equals)",
    addValueToInputfield
  );

  $("#btn-equals").on("click", onSubmitInputs);

  render();
}

//function to add values to the input field
function addValueToInputfield() {
  let id = $(this).attr("id");
  let buttonValue = $(`#${id}`).text();
  let currentInputValue = $("#calculation-input").val();

  $("#calculation-input").val(currentInputValue + buttonValue);
}

//fetch completed calculations & render
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

//function to run on "="
function onSubmitInputs() {
  let newOperation = {
    operationToHappen: $("#calculation-input").val(),
  };

  //sending the 'newOperation' object to the array
  $.ajax({
    url: "/calculations",
    method: "POST",
    data: newOperation,
  })
    .then((response) => {
      //after posting to server fetch and render to DOM
      fetchOperation();
    })
    .catch((error) => {
      console.log("onSubmitInputs not working properly");
    });
}

//render to the DOM
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
