document.addEventListener('DOMContentLoaded', function() {
  let fetchFunction = function(textToRecognize) {
    let textareaOutput = document.getElementById('txtareaOutput');

    let licenseKey = 'd807b65a-440e-4728-a725-77455f20fc65';
    let backend = 'https://ai-api.flexberry.net';

    if (textToRecognize == null || textToRecognize == undefined || textToRecognize == '') {
      textareaOutput.textContent = 'No text was found for analysis';
      textareaOutput.classList.add('error');
      return;
    }

    let select = document.getElementById('dropExpectedResult');
    let selectedValue = select.options[select.selectedIndex].value;

    let myItem = {
      "textToRecognize": textToRecognize,
      "expectedResult": selectedValue,
      "key": licenseKey
    };

    let dimmer = document.getElementById('dimmer');
    dimmer.classList.add('active');
    let fullBackendAddress = `${backend}/api/aiassistant/GetRecognizion`;
    fetch(fullBackendAddress, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json" ,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(myItem)
    })
      .then(
        function(response) {
          if (response.status !== 200 && response.status !== 400) {
            textareaOutput.textContent = `Looks like there was a problem. Status Code: ${response.status}.`;
            textareaOutput.classList.add('error');
            return;
          }
          
          // Examine the text in the response
          response.json().then(function(data) {
            if (response.status === 400) {
              textareaOutput.textContent = `Problem during recognizion: ${data.Message} Status Code: ${response.status}.`;
              textareaOutput.classList.add('error');
              return;
            }

            textareaOutput.textContent = "";
            if (selectedValue == 'opClassMockups') {
              localStorage.setItem("RecognizedJson", data["RecognizedJson"]);
              const recognizedJson = JSON.parse(data["RecognizedJson"]);
              svgOutputFunction(recognizedJson);
            } else {
              textareaOutput.textContent = data["RecognizedJson"];
            }
            
            textareaOutput.classList.remove('error');
          });
        }
      )
      .catch(function(err) {
        textareaOutput.textContent = 'Fetch Error:' + err;
        textareaOutput.classList.add('error');
      })
      .finally(()=>{dimmer.classList.remove('active');});
  }

  let sendFunction = function() {
    let textareaInput = document.getElementById('txtareaInput');
    fetchFunction(textareaInput.value);
  }

  let copyFunction = function() {
    let textareaOutput = document.getElementById('txtareaOutput');
    let copyText = textareaOutput.value;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(copyText);
    }

    textareaOutput.select();
    document.execCommand('copy');
  }

  var sendButton = document.getElementById('btnSend');
  sendButton.addEventListener('click', sendFunction, false); 

  var copyButton = document.getElementById("btnCopy");
  copyButton.addEventListener('click', copyFunction, false); 

  let svgOutputFunction = function(recognizedJson) {
    const svgOutput = document.getElementById('svgOutput');

    while(svgOutput.firstChild){
      svgOutput.removeChild(svgOutput.firstChild);
    }
    
    for (const key in recognizedJson) {
      if (Object.hasOwnProperty.call(recognizedJson, key)) {
        const element = recognizedJson[key];

        const linkListForm = window.location.protocol + "//" + window.location.host + "/list-form.html?class=" + element.modelName;
        const linkEditForm = window.location.protocol + "//" + window.location.host + "/edit-form.html?class=" + element.modelName;

        const className = document.createElement('p');
        className.textContent = element.className;

        let link = document.createElement('a');
        link.href = linkListForm;
        link.target = "_blank";
        link.textContent = "List form";

        svgOutput.append(className);
        svgOutput.append(link);
        svgOutput.append(document.createElement('br'));
        
        link = document.createElement('a');
        link.href = linkEditForm;
        link.target = "_blank";
        link.textContent = "Edit form";

        svgOutput.append(link);
      }
    }
  }
}, false);