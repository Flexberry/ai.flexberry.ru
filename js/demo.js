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

            textareaOutput.textContent = data["RecognizedJson"];
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
}, false);