// @ts-ignore
export function clickToCopy(text) {
    // Create a temporary input element to hold the text
    const tempInput = document.createElement("input");
    tempInput.value = text;
  
    // Append the input element to the DOM
    document.body.appendChild(tempInput);
  
    // Select the text within the input element
    tempInput.select();

  
    // Remove the temporary input element from the DOM
    document.body.removeChild(tempInput);
  }
  
  