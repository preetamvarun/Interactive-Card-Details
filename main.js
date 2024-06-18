$(document).ready(function () {
  let errors = false;

  // Change the name on the card as per the name input
  $('#input-name').on('input', function () {
    const name = $(this).val();

    if (name.length > 30) {
      name = name.substring(0, 30);
    }

    // Don't allow any digits or special characters
    const filteredValue = name.replace(/[^a-zA-Z\s]/g, '');

    $(this).val(filteredValue);

    $('#name-on-card').text(filteredValue);
  });

  $(document).ready(function () {
    $('#input-number').on('input', function () {
      let number = $(this).val();

      // Remove all non-numeric characters except spaces
      number = number.replace(/[^\d]/g, '');

      // Limit the input to 16 digits
      if (number.length > 16) {
        number = number.substring(0, 16);
      }

      // Format the value with spaces every 4 characters
      let formattedValue = '';
      for (let i = 0; i < number.length; i += 4) {
        if (i > 0) {
          formattedValue += ' ';
        }
        formattedValue += number.substring(i, i + 4);
      }

      // Update the input field with the formatted value
      $(this).val(formattedValue);

      // Split the value into parts, padded with zeros if necessary
      let parts = number.match(/.{1,4}/g) || [];
      while (parts.length < 4) {
        parts.push('0000');
      }
      for (let i = 0; i < 4; i++) {
        if (parts[i].length < 4) {
          parts[i] = parts[i].padEnd(4, '0');
        }
        $('#part-' + (i + 1)).text(parts[i]);
      }
    });

    $('#input-number').on('keydown', function (e) {
      // Prevent space key
      if (e.keyCode === 32) {
        e.preventDefault();
      }
    });
  });

  // Function to handle month and year input fields
  function handleInput(
    inputSelector,
    maxInputLength,
    maxValue,
    outputSelector
  ) {
    $(inputSelector).on('input', function () {
      let inputValue = $(this).val();

      // If the length in the input field is more than two characters
      if (inputValue.length > maxInputLength)
        $(this).val(inputValue.slice(0, maxInputLength));

      inputValue = Number(inputValue);

      // If the entered field is convertible to number and within the max value
      if (!isNaN(inputValue) && inputValue <= maxValue) {
        inputValue = String(inputValue);
        if (maxInputLength === 2 && inputValue.length === 1) {
          inputValue = '0' + inputValue;
        } else if (maxInputLength === 3 && inputValue.length <= 2) {
          if (inputValue.length === 1) inputValue = '00' + inputValue;
          else inputValue = '0' + inputValue;
        }
        $(outputSelector).text(inputValue);
      }
    });
  }

  // Apply the handleInput function to both month and year input fields
  handleInput('#month-input', 2, 12, '#month');
  handleInput('#year-input', 2, 99, '#year');
  handleInput('#cvc-input', 3, 999, '#cvc');

  $('.confirm-btn').click(function (e) {
    // preventing the default behaviour of button
    e.preventDefault();

    // Handling errors in the name field
    $('#input-name').val().length < 5
      ? $('#name-error').show()
      : $('#name-error').hide();

    $('#input-number').val().length === 19
      ? $('#number-error').hide()
      : $('#number-error').show();

    // Handling errors in the month field
    $('#month').text() === '00' ||
    $('#year').text() == '00' ||
    $('#cvc-input').val().length === 0
      ? $('#date-error').show()
      : $('#date-error').hide();

    errors =
      $('#input-name').val().length < 5 ||
      $('#input-number').val().length !== 19 ||
      $('#month').text() === '00' ||
      $('#year').text() == '00' ||
      $('#cvc').text() === '000'
        ? true
        : false;

    if (!errors) {
      // Hide the form with fade out animation
      $('.card-details-form').animate(
        {
          opacity: 0,
          height: 'toggle',
        },
        1000,
        function () {
          // Once the form is hidden, show the thank you message with animation
          $('.thankyou').css('display', 'block').animate(
            {
              opacity: 1,
            },
            1000
          );
        }
      );
    }
  });
});
