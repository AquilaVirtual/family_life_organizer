  
  
  //this fuction displays a dynamically created box with a text informing user of a successful addition of a family member
  export const displaySuccessBox = (status, name) => {
    if (status === 200) {
      let SuccessTimeout;
      let successBox = document.createElement("div");
      successBox.className = "success";
      successBox.textContent = `${name} was successfully added to family!`;
      //here we reference header ID in SiteHeader.js
      let textBox = document.getElementById("header--heading");

      if (document.body.contains(successBox)) {
        window.clearTimeout(SuccessTimeout);
      } else {
        textBox.parentNode.insertBefore(successBox, textBox.nextSibling);
      }
      SuccessTimeout = window.setTimeout(function() {
        successBox.parentNode.removeChild(successBox);
        SuccessTimeout = -1;
      }, 4000);
    }
  };