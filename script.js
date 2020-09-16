// Assignment Code
var generateBtn = document.querySelector("#generate");
var letterReg = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","x","y","z"];
var letterCaps = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","W","X","Y","Z"];
var numbers = [0,1,2,3,4,5,6,7,8,9];
var specChars = [" ","!","#","$","%","&","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~"];
var password = "";
var divisor = 0;
var inclLetters;
var inclCaps;
var inclNumbers;
var inclChars;
var passLength;
var passChunk;
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
    console.log(passLength);
  }
  return passLength; 
}

// Defining a function that prompts to select various character groups
function charGroups() {
  inclLetters = confirm("Do you want to include ordinary letters? abc");
  if (inclLetters) {
    divisor++;
    console.log(divisor);
  }
  inclCaps = confirm("Do you want to include capital letters? ABC");
  if (inclCaps) {
    divisor++;
    console.log(divisor);
  }
  inclNumbers = confirm("Do you want to include numbers? 123");
  if (inclNumbers) {
    divisor++;
    console.log(divisor);
  }
  inclChars = confirm("Do you want to include special characters? #$!");
  if (inclChars) {
    divisor++;
    console.log(divisor);
  }
  // Ensuring that at least one character group is selected
  while (divisor == 0) {
    alert("You must select at least one group of characters!");
    charGroups();
  }  
  // Distributing password characters equally among the selected groups
  if (divisor > 0) {
    passChunk = Math.floor(passLength / divisor);
    console.log("Each group will have", passChunk, "characters.");
   
    // If the selected password length does not divide evenly among the selected groups, 
    // defining a variable to hold the value for iterating the larger final chunk of special characters.
    // This is done in the generatePassword() function below.
    if (passChunk * divisor !== passLength) {
      passRemainder = passLength - (passChunk * divisor);
    } else {
      passRemainder = 0;
    }
    console.log("The remainder is", passRemainder, ".");
  }
  return passRemainder;
}

// Defining a function internal to a loop for special characters
function iterateSpecChar() {
  var newChar = specChars[Math.floor(Math.random() * specChars.length)]; 
  console.log(newChar);
  const passArrZ = password.split('');
  const z = Math.floor(Math.random() * password.length);
  passArrZ.splice(z,0,newChar);
  password = passArrZ.join('');
  console.log(password);
}

// Password Generation Function
function generatePassword() {

  // Calling the password length and character groups functions
  passwordLength();
  charGroups(); 

  // Generating a password based on selections made by the user
  // First, adding regular letters, if selected
  if (inclLetters) {
    for (var i = 0; i < passChunk; i++) {
      var newLetter = letterReg[Math.floor(Math.random() * letterReg.length)];
      console.log(newLetter);
      password += newLetter;
      console.log(password);
    }
  } 
  
  // Then adding capital letters, if selected, inserting them at random positions
  if (inclCaps) {
    for (var j = 0; j < passChunk; j++) {
      var newCap = letterCaps[Math.floor(Math.random() * letterCaps.length)];
      console.log(newCap);
      const passArrX = password.split('');
      const x = Math.floor(Math.random() * password.length);
      passArrX.splice(x,0,newCap);
      password = passArrX.join('');
      console.log(password);
    }
  }  
  
  // Then adding numbers, if selected, inserted randomly
  if (inclNumbers) {
      for (var k = 0; k < passChunk; k++) {
        var newNum = numbers[Math.floor(Math.random() * numbers.length)]; 
        console.log(newNum);
        const passArrY = password.split(''); 
        const y = Math.floor(Math.random() * password.length);
        passArrY.splice(y,0,newNum); 
        password = passArrY.join('');
        console.log(password);      
      }
  }  
  
  // Then adding special characters, if selected, inserted randomly.
  // But first checking for the existence of any remainder characters to add. 
  if (inclChars && passRemainder > 0) {
    passChunk += passRemainder;
    console.log("This last group will insert", passChunk, "characters.");
    for (var l = 0; l < passChunk; l++) {
      iterateSpecChar();
    }
  } else if (inclChars == false && passRemainder > 0) {
      for (var l = 0; l < passRemainder; l++) {
        iterateSpecChar();
      }
  } else if (inclChars && passRemainder == 0) {
      for (var l = 0; l < passChunk; l++) {
        iterateSpecChar();
      } 
    } 
  
  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.textContent = "Your secure password:" + "\n" + password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);