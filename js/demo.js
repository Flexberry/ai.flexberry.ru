document.addEventListener('DOMContentLoaded', function () {
  let browserLanguage = window.navigator.userLanguage || window.navigator.language;
  let language = "en";
  let aiaLocalization;
  if (browserLanguage.indexOf("ru") > -1) {
      language = "ru"
      aiaLocalization = {
          title: "Демо-страница ИИ Ассистента",
          loader: "Загрузка",
          insertLabel: "Введите текст",
          insertbutton: "Текст для анализа",
          analyzeButton: "Анализировать",
          expectedResult: "Ожидаемый результат",
          opSVG: "Макеты форм",
          opClassDiagram: "UML диаграмма классов",
          opSQL: "SQL",
          txtareaOutput: "Результат",
          btnCopy: "Копировать",
          btnBuy: "КУПИТЬ",
          plantUmlLink: "Инструмент конвертации текста PlantUML в изображение",
          feedBackLink: "Обратная связь",
          errorNoText: "Отсутствует текст для анализа",
          backendError: "Произошла ошибка.",
          error400: "Ошибка при распознавании",
          fetchError: "Ошибка связи с сервером",
          listForm: "Списковая форма",
          editForm: "Форма редактирования",
          tryCaption: "Попробуйте!",
          tryTextStart: "Нет идей? Попробуйте этот текст!",
          tryTextEnd: "",
          tryText: "Разработать систему мониторинга подключения интернета клиентам. Информация о клиенте содержит: имя клиента, дата рождения, данные паспорта. Заявка включает в себя номер, дату регистрации, предполагаемый адрес подключения.Заявка ссылается на информацию о клиенте. " +
              "Заявка передаётся мастеру.Мастера можно выбрать из реестра мастеров.Реестр мастеров хранит имя мастера, уровень квалификации, сведения об образовании. После выполнения работ мастер составляет акт подключения. Акт подключения содержит дату фактического выполнения работ, место проведения работ, отметки мастера об особенностях подключения, итоговую стоимость работ. Акт подключения ссылается на реестр мастеров в информационной системе. " +
              "Акт подключения составляется в двух экземплярах.Один экземпляр остаётся пользователю, второй экземпляр после внесения сведений в информационную систему мастер предоставляет в архив.Журнал архива содержит дату предоставления акта подключения, количество листов.Архивариус вносит сведения в информационную систему, где автоматически по номеру в журнал архива добавляется ссылка на акт подключения.",
          textDescription: "Flexberry AI Assistant – инструмент, который помогает облегчить рутинную работу бизнес-аналитика и других специалистов (например, дизайнера интерфейсов). ",
          textDescriptionAnalytic: "Flexberry AI Assistant обучен анализировать текстовые описания, которые бизнес-аналитик собирает в процессе общения с клиентами и исполнителями. ",
          textDescriptionAi: "Flexberry AI Assistant анализирует входной текст и отображает результат требуемого типа (макеты форм, UML диаграмма классов или скрипт SQL).",
          textRequest: "Мы развиваем наш продукт и он постепенно осваивает разные выражения. Проверим, найдём ли мы с вами общий язык уже сейчас или нам надо ещё немного поучиться?",
          purchaseFormTitle: "Заявка на покупку"
      };
  }
  else {
      aiaLocalization = {
          title: "AI Assistant Demo",
          loader: "Loading",
          insertLabel: "Insert text here",
          insertbutton: "Text for analysis",
          analyzeButton: "Analyze",
          expectedResult: "Choose expected result",
          opSVG: "Mockups of forms",
          opClassDiagram: "UML Class Diagram",
          opSQL: "SQL",
          txtareaOutput: "Result",
          btnCopy: "Copy",
          btnBuy: "PURCHASE",
          plantUmlLink: "Convert PlantUML text to image tool",
          feedBackLink: "Feedback",
          errorNoText: "No text was found for analysis",
          backendError: "Looks like there was a problem.",
          error400: "Problem during recognizion",
          fetchError: "Conection error",
          listForm: "List form",
          editForm: "EditForm",
          tryCaption: "Try it!",
          tryTextStart: "No ideas? Try this text!",
          tryTextEnd: "",
          tryText: "The client request includes the number, registration date, expected connection address. The client request refers to client information. The client information contains name, surname.",
          textDescription: "Flexberry AI Assistant is a virtual tool that is designed to assist the day-to-day activities of the business analyst and other specialists like UI/UX designers to generate forms, UML diagrams and SQL script in just a minute.",
          textDescriptionAnalytic: "The AI Assistant is trained to analyze requirement specifications, and simple expressions that analysts gather from interacting with clients and stakeholders.",
          textDescriptionAi: "The AI analyzes this input text and displays an output based on user choice, either mockup forms, SQL, or UML diagrams.",
          textRequest: "We are developing our product to understand more and more. Let’s check if it can process your request. Or should it be trained more?",
          purchaseFormTitle: "Purchase request"
      };
  }

  document.title = aiaLocalization.title;
  document.getElementById('dimmerloader').innerText = aiaLocalization.loader;
  document.getElementById('txtareaInputLabel').innerText = aiaLocalization.insertLabel;
  document.getElementById('txtareaInput').placeholder = aiaLocalization.insertbutton;
  document.getElementById('txtareaInput').innerText = aiaLocalization.tryText;
  document.getElementById('btnSend').innerText = aiaLocalization.analyzeButton;
  document.getElementById('expectedResultLabel').innerText = aiaLocalization.expectedResult;
  document.getElementById('opClassMockups').innerText = aiaLocalization.opSVG;
  document.getElementById('opClassDiagram').innerText = aiaLocalization.opClassDiagram;
  document.getElementById('opSQL').innerText = aiaLocalization.opSQL;
  document.getElementById('txtareaOutput').placeholder = aiaLocalization.txtareaOutput;
  document.getElementById('btnCopy').innerText = aiaLocalization.btnCopy;
  document.getElementById('btnBuy').innerText = aiaLocalization.btnBuy;
  document.getElementById('plantUmlLink').innerText = aiaLocalization.plantUmlLink;
  document.getElementById('feedBackLink').innerText = aiaLocalization.feedBackLink;
  document.getElementById('textDescription').innerHTML = aiaLocalization.textDescription;
  document.getElementById('textDescriptionAnalytic').innerHTML = aiaLocalization.textDescriptionAnalytic;
  document.getElementById('textDescriptionAi').innerHTML = aiaLocalization.textDescriptionAi;
  document.getElementById('tryCaption').innerText = aiaLocalization.tryCaption;
  document.getElementById('tryTextStart').innerHTML = aiaLocalization.tryTextStart;
  document.getElementById('tryText').innerHTML = aiaLocalization.tryText;
  document.getElementById('tryTextEnd').innerHTML = aiaLocalization.tryTextEnd;
  document.getElementById('textRequest').innerHTML = aiaLocalization.textRequest;
  document.getElementById('purchaseRequestTitle').innerHTML = aiaLocalization.purchaseFormTitle;

  let popupBg = document.querySelector('.popup__bg'); // Фон попап окна.
  let popup = document.querySelector('.popup'); // Само окно.
  let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна.
  let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна.

let fetchFunction = function(textToRecognize) {
  let textareaOutput = document.getElementById('txtareaOutput');

    let licenseKey = 'd807b65a-440e-4728-a725-77455f20fc65';
    let backend = 'https://ai-api.flexberry.net';
    const svgOutput = document.getElementById('svgOutput');

    while (svgOutput.firstChild) {
        svgOutput.removeChild(svgOutput.firstChild);
    }

    let textResult = document.getElementById('textResult');
    textResult.classList.remove('hidden');

  if (textToRecognize == null || textToRecognize == undefined || textToRecognize == '') {
    textareaOutput.textContent = aiaLocalization.errorNoText;
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
          textareaOutput.textContent = `${aiaLocalization.backendError} Status Code: ${response.status}.`;
          textareaOutput.classList.add('error');
          return;
        }
        
        // Examine the text in the response.
        response.json().then(function(data) {
          if (response.status === 400) {
            textareaOutput.textContent = `${aiaLocalization.error400}: ${data.Message} Status Code: ${response.status}.`;
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
      textareaOutput.textContent = `${aiaLocalization.fetchError}:` + err;
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

  var purchaseButton = document.getElementById('btnBuy');
  purchaseButton.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик.
      e.preventDefault(); // Предотвращаем дефолтное поведение браузера.
      if (language === "ru") {
          document.getElementById('purchaseFormCom').classList.add("hidden");
          document.getElementById('purchaseFormCom').setAttribute("style", "height:0px");
      }
      else {
          document.getElementById('purchaseFormRu').classList.add("hidden");
          document.getElementById('purchaseFormRu').setAttribute("style", "height:0px");
      }
      popupBg.classList.add('active'); // Добавляем класс 'active' для фона.
      popup.classList.add('active'); // И для самого окна.
  })

  var purchaseCloseButton = document.getElementById('closePurchaseBtn');
  purchaseCloseButton.addEventListener('click', (e) => {
      popupBg.classList.remove('active'); // Убираем активный класс с фона.
      popup.classList.remove('active'); // И с окна.
  });

  document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ.
      if (e.target === popupBg) { // Если цель клика - фот, то:
          popupBg.classList.remove('active'); // Убираем активный класс с фона.
          popup.classList.remove('active'); // И с окна.
      }
  });

var sendButton = document.getElementById('btnSend');
sendButton.addEventListener('click', sendFunction, false); 

var copyButton = document.getElementById("btnCopy");
copyButton.addEventListener('click', copyFunction, false); 

let svgOutputFunction = function(recognizedJson) {
    const svgOutput = document.getElementById('svgOutput');
    textResult.classList.add('hidden');

  for (const key in recognizedJson) {
    if (Object.hasOwnProperty.call(recognizedJson, key)) {
      const element = recognizedJson[key];

      const linkListForm = window.location.protocol + "//" + window.location.host + "/list-form.html?class=" + element.modelName;
      const linkEditForm = window.location.protocol + "//" + window.location.host + "/edit-form.html?class=" + element.modelName;

      const className = document.createElement('p');
      className.textContent = element.className.charAt(0).toUpperCase() + element.className.slice(1).replace(/([A-ZА-ЯЁ])/g, " $1").toLowerCase();

      let link = document.createElement('a');
      link.href = linkListForm;
      link.target = "_blank";
      link.textContent = aiaLocalization.listForm;

      svgOutput.append(className);
      svgOutput.append(link);
      svgOutput.append(document.createElement('br'));
      
      link = document.createElement('a');
      link.href = linkEditForm;
      link.target = "_blank";
      link.textContent = aiaLocalization.editForm;

      svgOutput.append(link);
    }
  }
}

let toggleFunction = function(e) {
  let tryText = document.getElementById('tryText');
  tryText.classList.toggle('d-none');
}

var tryTextStart = document.getElementById("tryTextStart");
tryTextStart.addEventListener('click', toggleFunction, false);

}, false);