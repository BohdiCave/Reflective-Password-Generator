// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");
var lower = "abcdefghijklmnopqrstuvwxyz";
var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var specChars = "!#$%&()*+-.,/:;<=>?@[]^_`{|}~ ";
var inclLower, inclUpper, inclNumbers, inclChars, passLength, passChunk; 
var newLower, newUpper, newNum, newSpecChar, newChar;
var password = "";
var divisor = 0;
var groups = 0;
var passRemainder = 0;

// Defining a function for setting password length
function passwordLength() {
  passLength = prompt("Enter a number for how many characters you would like the password to have?");
  // Validating the input, checking that the length is appropriate
  while (isNaN(passLength) || passLength < 8 || passLength > 128) {
    alert("Invalid entry! You need to enter a valid number between 8 and 128.");
    passLength = prompt("Enter a valid number between 8 and 128.");  
  } 
  // Validating the input, change a string into a number
  if (typeof(passLength) == Number && passLength > 8 || passLength < 128) {
    parseInt(passLength);
  }
  return passLength; 
}

// Defining a function that prompts to select various character groups
function charGroups() {
  inclLower = confirm("Do you want to include lowercase letters? abc");
  if (inclLower) {
    divisor+=1;
    groups+=1;
    alert("Lowercase letters will be included. \n" + groups + " character group(s) selected");
  } else {
    alert("Lowercase letters will not be included.");
  }
  inclUpper = confirm("Do you want to include uppercase letters? ABC");
  if (inclUpper) {
    divisor+=1;
    groups+=1;
    alert("Uppercase letters will be included. \n" + groups + " character group(s) selected");
  } else {
    alert("Uppercase letters will not be included");
  }
  inclNumbers = confirm("Do you want to include numbers? 123");
  if (inclNumbers) {
    divisor+=1;
    groups+=1;
    alert("Numbers will be included. \n" + groups + " character group(s) selected");
  } else {
    alert("Numbers will not be included.");
  }
  inclChars = confirm("Do you want to include special characters? #$!");
  if (inclChars) {
    divisor+=1;
    groups+=1;
    alert("Special characters will be included. \n" + groups + " character group(s) selected");
  } else {
    alert("Special characters will not be included.");
  }
  // Ensuring that at least one character group is selected
  while (divisor == 0) {
    alert("You must select at least one group of characters!");
    charGroups();
  }  
  // Distributing password characters equally among the selected groups
  if (divisor > 0) {
    passChunk = Math.floor(passLength / divisor);
    alert("You selected " + groups + " character groups. \n Each will have a minimum of " + passChunk + " characters.");
   
    // If the password length does not divide evenly among the groups, 
    // defining a variable to hold the remainder, to be used in the generatePassword function.
    if (passChunk * divisor !== passLength) {
      passRemainder = passLength - (passChunk * divisor);
    } else {
      passRemainder = 0;
    }
  }
  return passRemainder;
}

// Defining a function to insert characters randomly
function randomInsert() { 
  var passArr = password.split('');
  var x = Math.floor(Math.random() * passArr.length);
  passArr.splice(x,0,newChar);
  password = passArr.join('');
}


// Password Generation Function
function generatePassword() {
  // Clearing the variable from the previous generation
  password = "";
  // Calling the password length and character groups functions
  passwordLength();
  charGroups(); 
  // Generating a password based on selections made by the user
  // First, adding lowercase letters, if selected
  if (inclLower) {
    var lowerChunk = passChunk + passRemainder;
    for (var i = 0; i < lowerChunk; i++) {
      var newLower = lower[Math.floor(Math.random() * lower.length)];
      password += newLower;
    }
  } 
  // Then adding capital letters, if selected, inserting them at random positions
  if (inclUpper) {
    if (!inclLower) {
      var upperChunk = passChunk + passRemainder;
      for (var h = 0; h < upperChunk; h++) {
        newUpper = upper[Math.floor(Math.random() * upper.length)];
        newChar = newUpper;
        randomInsert();
      }
    } else {
      for (var j = 0; j < passChunk; j++) {
        newUpper = upper[Math.floor(Math.random() * upper.length)];
        newChar = newUpper;
        randomInsert();
      }
    }
  }  
  // Then adding numbers, if selected, inserted randomly
  if (inclNumbers) {
    if (!inclLower && !inclUpper) {
      var numChunk = passChunk + passRemainder;
      for (var g = 0; g < numChunk; g++) {
        newNum = numbers[Math.floor(Math.random() * numbers.length)]; 
        newChar = newNum;
        randomInsert();
      }
    } else {
      for (var k = 0; k < passChunk; k++) {
        newNum = numbers[Math.floor(Math.random() * numbers.length)]; 
        newChar = newNum;
        randomInsert();
      }
    }
  } 
  // Then adding special characters, if selected, inserted randomly.
  if (inclChars) {
    if (!inclLower && !inclUpper && !inclNumbers) {
      var charChunk = passChunk + passRemainder;
      for (var f = 0; f < charChunk; f++) {
        newSpecChar = specChars[Math.floor(Math.random() * specChars.length)]; 
        newChar = newSpecChar;
        randomInsert();
      }
    } else {
      for (var l = 0; l < passChunk; l++) {
        newSpecChar = specChars[Math.floor(Math.random() * specChars.length)]; 
        newChar = newSpecChar;
        randomInsert();
      }
    }
  }
  divisor = 0;      
  return password;
}

// Write password to the #password input
function writePassword() {
  password = generatePassword();
  passwordText.textContent = "\r\n" + password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", function() {
  writePassword();
});