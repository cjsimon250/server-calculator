$(document).ready(onReady);

//global array to recieve operations
let operations = []

function onReady(){
    $('.calculation-btns-box').on('click', 
    'button:not(#btn-equals)',
     addValueToInputfield);

    $('#btn-equals').on('click', onSubmitInputs);


}

//function to add values to the input field
function addValueToInputfield(){
  let id = $(this).attr('id');
  let buttonValue = $(`#${id}`).text();
  let currentInputValue = $('#calculation-input').val();

   $('#calculation-input').val(currentInputValue + buttonValue)
};

//function to run on "="
function onSubmitInputs(){
    let newOperation = {
        operationToHappen: $('#calculation-input').val()};

        //Sending the 'newOperation' object to the array
        $.ajax({
            url: '/calculations',
            method: 'POST',
            data: newOperation
        }).then((response) => {})
    
}