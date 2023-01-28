$(document).ready(onReady);

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
    let input = $('#calculation-input').val();

    console.log(input)
}