$(document).ready(function () {
  // Change the name on the card as per the name input
  $('#input-name').on('input', function () {
    const name = $(this).val();
    if (name.length <= 30) $('#name-on-card').text(name);
  });

  // Function to handle month and year input fields
  function handleInput(inputSelector, maxValue, outputSelector) {
    $(inputSelector).on('input', function () {
      let inputValue = $(this).val();

      // If the length in the input field is more than two characters
      if (inputValue.length > 2) $(this).val(inputValue.slice(0, 2));

      inputValue = Number(inputValue);

      // If the entered field is convertible to number and within the max value
      if (!isNaN(inputValue) && inputValue <= maxValue) {
        inputValue = String(inputValue);
        if (inputValue.length === 1) {
          inputValue = '0' + inputValue;
        }
        $(outputSelector).text(inputValue);
      }
    });
  }

  // Apply the handleInput function to both month and year input fields
  handleInput('#month-input', 12, '#month');
  handleInput('#year-input', 99, '#year');
});
