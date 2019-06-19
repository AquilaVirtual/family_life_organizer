  
  
  //this fuction displays a dynamically created box with a text informing user of error in request
  export const failBox = (status, erroMessage) => {
    if (status !== 200) {    
      let failBox = document.createElement("div");
      failBox.className = "fail";
      failBox.textContent = `${erroMessage}`;    
     
       let textBox = document.getElementById("instruction-header");
     
        textBox.appendChild(failBox);
    
    }
  };