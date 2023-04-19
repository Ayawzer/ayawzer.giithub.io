// Arrays of inputs, outputs, and error messages
const inputElements = [
  document.getElementById("Name"),
  document.getElementById("Number"),
  document.getElementById("Month"),
  document.getElementById("Year"),
  document.getElementById("Cvc")
];

const outputElements = [
  document.getElementById("CardName"),
  document.getElementById("CardNumber"),
  document.getElementById("CardMonth"),
  document.getElementById("CardYear"),
  document.getElementById("CardCvc")
];

//Error user left empty space
function showError(inputElement, parentElement, outputElement) {
  const errorElement = parentElement.querySelector(".error");
  errorElement.textContent = `Can't be empty`;
  parentElement.classList.add("error");
}

//Function for updating the values in the cards based on the inputs
function updateElementValue(inputElement, outputElement, parentElement) {
  const defaultValue = outputElement.innerHTML;

  function updateOutput() {
    outputElement.innerHTML = inputElement.value || defaultValue;
  }

  function restoreDefault() {
    if (!inputElement.value) {
      outputElement.innerHTML = defaultValue;
      showError(inputElement, parentElement);
    } else {
      const errorElement = parentElement.querySelector(".error");
      errorElement.textContent = "";
      parentElement.classList.remove("error");
    }
  }

  inputElement.addEventListener("keyup", updateOutput);
  inputElement.addEventListener("blur", restoreDefault);
}

//Loop calling the updating function
for (let i = 0; i < inputElements.length; i++) {
  updateElementValue(inputElements[i], outputElements[i], inputElements[i].parentElement); 
}


//Limit card number input
function formatCardNumber(inputElement, parentElement) {
  const errorMessage = "Card number must have 16 digits";

  function showError() {
    const errorElement = parentElement.querySelector('.error');
    errorElement.textContent = errorMessage;
    parentElement.classList.add('error');
  }

  function hideError() {
    const errorElement = parentElement.querySelector('.error');
    errorElement.textContent = '';
    parentElement.classList.remove('error');
  }

  function formatNumber(value) {
    // Remove all non-numeric characters
    let cardNumber = value.replace(/\D/g, '');
  
    // Limit the card number to 16 digits
    cardNumber = cardNumber.slice(0, 16);
    
    // Split the card number into groups of 4 digits with spaces
    const cardNumberGroups = cardNumber.match(/.{1,4}/g);
    const formattedNumber = cardNumberGroups ? cardNumberGroups.join(' ') : '';
  
    return formattedNumber;
  }

  inputElement.addEventListener('input', () => {
    const formattedNumber = formatNumber(inputElement.value);
    inputElement.value = formattedNumber;

    if (formattedNumber.length === 19) {
      hideError();
    } else {
      showError();
    }
  });
}

const cardNumberInput = document.getElementById('Number');
const cardNumberParent = cardNumberInput.parentElement;
formatCardNumber(cardNumberInput, cardNumberParent);



 //Limit the cvc to 3 digits and show error if shorter
function validateCvcInput(inputElement, parentElement) {
  const errorMessage = "CVC must be a 3-digit number";
  
  function showError() {
    const errorElement = parentElement.querySelector('.error');
    errorElement.textContent = errorMessage;
    parentElement.classList.add('error');
  }
  
  function hideError() {
    const errorElement = parentElement.querySelector('.error');
    errorElement.textContent = '';
    parentElement.classList.remove('error');
  }
  
  inputElement.addEventListener('input', () => {
    let cvc = inputElement.value.replace(/\D/g, '');
    
    if (cvc.length > 3) {
      cvc = cvc.slice(0, 3);
      inputElement.value = cvc;
    }
    
    if (cvc.length === 3) {
      hideError();
    } else {
      showError();
    }
  });
}
const cvcInput = document.getElementById('Cvc');
const cvcParent = cvcInput.parentElement;
validateCvcInput(cvcInput, cvcParent);


//Limit date inputs
function formatDateInput(monthInput, yearInput) {
  // Remove all non-numeric characters from month and year inputs
  let month = monthInput.value.replace(/\D/g, '');
  let year = yearInput.value.replace(/\D/g, '');

  // Limit month to two digits
  month = month.slice(0, 2);

  // Limit year to two digits
  year = year.slice(0, 2);

  // Update the input values
  monthInput.value = month;
  yearInput.value = year;
}
const monthInput = document.getElementById('Month');
const yearInput = document.getElementById('Year');
monthInput.addEventListener('input', () => {
  formatDateInput(monthInput, yearInput);
});
yearInput.addEventListener('input', () => {
  formatDateInput(monthInput, yearInput);
});

//Limit name input
function allowAlphabetsOnly(inputElement) {
  inputElement.addEventListener("keydown", function(event) {
    // Allow alphabets and spaces only
    if (/[^a-zA-Z\s]/.test(event.key)) {
      event.preventDefault();
    }
  });
}

// Example usage:
const cardNameInput = document.getElementById("Name");
allowAlphabetsOnly(cardNameInput);
 