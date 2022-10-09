const XHR = XMLHttpRequest.prototype;

const send = XHR.send;

XHR.send = function () {
  this.addEventListener("load", function () {
    const responseBody = JSON.parse(this.responseText);

    if (!responseBody.question && !responseBody.options) return;

    const answers = (
      responseBody.question || [{ options: responseBody.options }]
    ).map(({ options }) => options.find(({ isAnswer }) => isAnswer === "on"));

    // identify the answer
    const form = document.querySelector("#listForm");
    const tables = [...form.querySelectorAll("table")];
    const visibleTables = tables.slice(0, answers.length);

    visibleTables.forEach((table, index) => {
      const labels = [...table.querySelectorAll("label")];

      labels.forEach((label) => {
        const labelTextContent = label.textContent.slice(5).trim();
        const answerTextContent = answers[index].content.trim();

        if (labelTextContent === answerTextContent) {
          label.classList.add("highlight");
        }
      });
    });

    // add hint button
    const hintButton = document.createElement("button");

    hintButton.type = "button";
    hintButton.classList.add("btn--hint", "ml-2");
    hintButton.textContent = "提示";
    hintButton.addEventListener("click", (e) => {
      e.preventDefault();

      form.classList.toggle("hint");
    });

    if (form.lastElementChild.textContent === hintButton.textContent) {
      form.classList.remove("hint");
      form.removeChild(form.lastElementChild);
    }

    form.appendChild(hintButton);
  });

  return send.apply(this, arguments);
};
