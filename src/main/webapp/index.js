const rInputs = document.querySelectorAll(".r-btn");
const yInput = document.querySelector("#y-input");
const xInputs = document.querySelectorAll(".x-btn");
const dottedLines = document.querySelectorAll(".dotted-line");
const checkLines = document.querySelectorAll(".hidden-line");
const yLine = document.querySelector("#y-line");
const graph = document.querySelector("#graph-svg");
const circle = document.querySelector(".dot");
const xPointer = document.querySelector("#x-pointer");
const yPointer = document.querySelector("#y-pointer");
const submitBtn = document.querySelector("#submit-btn");
const clearBtn = document.querySelector("#clear-btn");
const form = document.querySelector("#form");
const notify = document.querySelector(".notify");
const notifyMessage = document.querySelector(".notify__message");
let rValue;
let xValue;
let yValue;
let segment;

const limit = {
  xMax: 3,
  xMin: -5,
  yMax: 5,
  yMin: -3,
  rMax: 3,
  rMin: 1,
}

graph.addEventListener("mousemove", (e) => {
  const coord = e.offsetY - 20 * (e.offsetY / 320);
  const coordX = e.offsetX - 20 * (e.offsetX / 320);
  yLine.setAttribute("stroke", "red");
  if (rValue) {
    const highLimit = limit.yMax * 100 / rValue;
    const lowLimit = -(limit.yMin * 100 / rValue);
    if (coord > 150) {
      yLine.setAttribute("y1", coord <= 150 + lowLimit ? coord : 150 + lowLimit);
      yLine.setAttribute("y2", coord <= 150 + lowLimit ? coord : 150 + lowLimit);
    } else {
      yLine.setAttribute("y1", coord >= 150 - highLimit ? coord : 150 - highLimit);
      yLine.setAttribute("y2", coord >= 150 - highLimit ? coord : 150 - highLimit);
    }
    const maxLine = findMaxXLine(checkLines);
    const minLine = findMinXLine(checkLines);
    if (
      coordX > +(maxLine.getAttribute("x1")) ||
      coordX < +(minLine.getAttribute("x1"))
    ) {
      let attr;
      if (coordX > +(maxLine.getAttribute("x1"))) {
        attr = +maxLine.dataset["number"];
      } else if (coordX < +(minLine.getAttribute("x1"))) {
        attr = +minLine.dataset["number"];
      }
      dottedLines.forEach((dotLine) => {
        if (+dotLine.dataset["number"] === attr) {
          dotLine.classList.add("active");
        }
      });
    }
  } else {
    yLine.setAttribute("y1", coord);
    yLine.setAttribute("y2", coord);
  }
});

//запрос на submit
form.addEventListener("submit", (event) => {
  disableNotification();
  event.preventDefault();
  if (xValue !== undefined && yValue !== undefined && rValue !== undefined) {
    fetch(`http://localhost:8000/Lab2-1.0-SNAPSHOT/ControllerServlet?x=${xValue}&y=${yValue}&r=${rValue}&command=hit`)
      .then((res) =>{
        if (!res.ok) throw res
          return res.text();
      })
      .then((data) => {
        let mark = JSON.parse(data)
        let newRow;
        newRow = '<tr style="text-align: center;">';
        newRow += '<td>' + parseFloat(mark.xValue).toFixed(1) + '</td>';
        if (parseFloat(mark.yValue)===Math.ceil(parseFloat(mark.yValue))) newRow += '<td>' + parseFloat(mark.yValue).toFixed(1)+'</td>';
        else newRow += '<td>' + parseFloat(mark.yValue)+'</td>';
        newRow += '<td>' + mark.rValue + '</td>';
        newRow += '<td>' + mark.hit + '</td>';
        newRow += '<td>' + mark.time + '</td>';
        newRow += '<td>' + parseFloat(mark.leadTime)/1000 + " mcs" +'</td>';
        newRow += '</tr>'
        document
          .querySelector("#result-table-body")
          .insertAdjacentHTML("afterbegin", newRow);
        const convX = +((+mark.xValue / mark.rValue) * 100 + 150);
        const convY = +(-((+mark.yValue / mark.rValue) * 100) + 150);
        graph.insertAdjacentHTML("beforeend", `<circle cx="${convX}" cy="${convY}" r="2" class="dot-state" />`)
      })
      .catch((e) => {if (e.status === 404){
        alert("404 page not found")
      }});
  } else if (xValue === undefined) {
    setNotification("x value is empty");
  } else if (yValue === undefined) {
    setNotification("invalid y, range [-3,3]");
  } else if (rValue === undefined) {
    setNotification("invalid r, range [1,4]");
  }
});

clearBtn.addEventListener("click", (event) =>{
  disableNotification();
  event.preventDefault();
  fetch('http://localhost:8000/Lab2-1.0-SNAPSHOT/ControllerServlet?command=clear')
      .then((res) => {
        if (!res.ok) throw res
        document.querySelector("#result-table-body").innerHTML = "";
        document.querySelectorAll(".dot-state").forEach(dot => dot.remove());
      }).catch((err) => {alert(err.message)})
});

graph.addEventListener("click", (e) => {
  disableNotification();
  if (rValue) {
    let activeLine;
    dottedLines.forEach((line) => {
      if (line.classList.contains("active")) activeLine = line;
    });
    const x = activeLine ? activeLine.getAttribute("x1") : 150;
    const y = yLine.getAttribute("y1");
    setDot(x, y);
    const convX = +(((x - 150) / 100) * +rValue).toFixed();
    const convY = +(-((y - 150) / 100) * +rValue).toFixed(2);
    xValue = convX;
    yValue = convY;
    setInput(convX, convY);
    submitBtn.click();
  }
});

rInputs.forEach((rBtn) => {
  rBtn.addEventListener("change", (event) => {
    if (validateRInput(+event.target.value)) {
      disableNotification();
      rInputs.forEach((rBtn) => {
        rBtn.parentElement.classList.remove("active-btn");
      });
      if (rValue === +event.target.value) {
        rValue = undefined;
        inactiveDot();
        return;
      } else {
        event.target.parentElement.classList.add("active-btn");
        rValue = +event.target.value;
        setLinesCoordinates(rValue);
        changeRText(rValue);
      }
      if (validateYInput(yValue) && validateXInput(xValue)) {
        const convX = +((+xValue / rValue) * 100 + 150);
        const convY = +(-((+yValue / rValue) * 100) + 150);
        setDot(convX, convY);
      }
    }
  });
});

yInput.addEventListener("input", (event) => {
    disableNotification();
    if (validateYInput(event.target.value)) {
      yValue = +event.target.value;
    } else {
      yValue = undefined;
      return;
    }
    if (validateRInput(rValue) && validateXInput(xValue)) {
      const convX = +((+xValue / rValue) * 100 + 150);
      const convY = +(-((+yValue / rValue) * 100) + 150);
      setDot(convX, convY);
    }
  }
);

xInputs.forEach((xBtn) => {
  xBtn.addEventListener("change", (event) => {
    if (validateXInput(+event.target.value)) {
      disableNotification();
      xInputs.forEach((xBtn) => {
        xBtn.parentElement.classList.remove("active-btn");
      });
      if (xValue === +event.target.value) {
        xValue = undefined;
        inactiveDot();
        return;
      } else {
        event.target.parentElement.classList.add("active-btn");
        xValue = +event.target.value;
      }
      if (validateYInput(yValue) && validateRInput(rValue)) {
        const convX = +((+xValue / rValue) * 100 + 150);
        const convY = +(-((+yValue / rValue) * 100) + 150);
        setDot(convX, convY);
      }
    }
  });
});

checkLines.forEach((line) => {
  line.addEventListener("mouseover", (event) => {
    let attr = event.target.dataset["number"];
    if (
      event.target.getAttribute("x1") > 300 ||
      event.target.getAttribute("x1") < 0
    ) {
      attr -= 2;
    }
    dottedLines.forEach((dotLine) => {
      if (dotLine.dataset["number"] == attr) {
        dotLine.classList.add("active");
      }
    });
  });

  line.addEventListener("mouseout", (event) => {
    let attr = event.target.dataset["number"];
    // const coordX = event.offsetX - 20 * (event.offsetX / 320); // при изменении размера графа это сломается
    if (
      event.target.getAttribute("x1") > 300 ||
      event.target.getAttribute("x1") < 0
    ) {
      attr -= 2;
    }
    dottedLines.forEach((dotLine) => {
      if (dotLine.dataset["number"] == attr) {
        dotLine.classList.remove("active");
      }
    });
  });
});

graph.addEventListener("mouseleave", () => {
  dottedLines.forEach((dotLine) => dotLine.classList.remove("active"));
  yLine.setAttribute("stroke", "transparent");
});

function validateRInput(rValue) {
  if (+rValue >= limit.rMin && +rValue <= limit.rMax) {
    return true;
  }
  return false;
}

function validateYInput(yValue) {
  if (yValue === "") return false;
  if (+yValue >= limit.yMin && +yValue <= limit.yMax) {
    return true;
  }
  return false;
}
function validateXInput(xValue) {
  if (+xValue >= limit.xMin && +xValue <= limit.xMax) {
    return true;
  }
  return false;
}


function changeRText(rValue) {
  const rlablesWhole = document.querySelectorAll(".graph-label.r-whole-pos");
  const rlablesHalf = document.querySelectorAll(".graph-label.r-half-pos");
  const rlablesNegWhole = document.querySelectorAll(".graph-label.r-whole-neg");
  const rlablesNegHalf = document.querySelectorAll(".graph-label.r-half-neg");
  rlablesWhole.forEach((el) => (el.textContent = +rValue ? rValue : "R"));
  rlablesHalf.forEach(
    (el) => (el.textContent = +rValue / 2 ? rValue / 2 : "R/2")
  );
  rlablesNegWhole.forEach((el) => (el.textContent = -rValue ? -rValue : "-R"));
  rlablesNegHalf.forEach(
    (el) => (el.textContent = -(rValue / 2) ? -(rValue / 2) : "-R/2")
  );
}
// переделать
function setLinesCoordinates(rValue) {
  segment = 100 / +rValue;
  let shift = 1;
  const min = Math.min(Math.abs(limit.xMin), Math.abs(limit.xMax));
  const delta = Math.abs(limit.xMax) - Math.abs(limit.xMin);
  for (let i = 0; i < min*2; i += 2) {
    dottedLines[i].setAttribute("x2", 150 - segment * shift);
    dottedLines[i].setAttribute("x1", 150 - segment * shift);
    dottedLines[i + 1].setAttribute("x1", 150 + segment * shift);
    dottedLines[i + 1].setAttribute("x2", 150 + segment * shift);
    checkLines[i].setAttribute("x1", 150 - segment * shift);
    checkLines[i].setAttribute("x2", 150 - segment * shift);
    checkLines[i + 1].setAttribute("x1", 150 + segment * shift);
    checkLines[i + 1].setAttribute("x2", 150 + segment * shift);
    checkLines[i].setAttribute("stroke-width", segment);
    checkLines[i + 1].setAttribute("stroke-width", segment);
    checkLines[i].classList.remove("inactive");
    checkLines[i + 1].classList.remove("inactive");
    shift++;
  }
  if (delta<0){
    for (let i = min*2; i< checkLines.length; i++) {
      dottedLines[i].setAttribute("x2", 150 - segment * shift);
      dottedLines[i].setAttribute("x1", 150 - segment * shift);
      checkLines[i].setAttribute("x1", 150 - segment * shift);
      checkLines[i].setAttribute("x2", 150 - segment * shift);
      checkLines[i].setAttribute("stroke-width", segment);
      checkLines[i].classList.remove("inactive");
      shift++;
    }
  }else if (delta>0){
    for (let i = min*2; i< checkLines.length; i++) {
      dottedLines[i].setAttribute("x2", 150 + segment * shift);
      dottedLines[i].setAttribute("x1", 150 + segment * shift);
      checkLines[i].setAttribute("x1", 150 + segment * shift);
      checkLines[i].setAttribute("x2", 150 + segment * shift);
      checkLines[i].setAttribute("stroke-width", segment);
      checkLines[i].classList.remove("inactive");
      shift++;
    }
  }
}

function setDot(x, y) {
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  xPointer.setAttribute("x1", x);
  xPointer.setAttribute("y1", y);
  xPointer.setAttribute("y2", y);
  yPointer.setAttribute("y1", y);
  yPointer.setAttribute("x1", x);
  yPointer.setAttribute("x2", x);
  xPointer.classList.add("pointer");
  yPointer.classList.add("pointer");
  xPointer.classList.remove("inactive");
  yPointer.classList.remove("inactive");
  circle.classList.remove("inactive");
}

function setInput(x, y) {
  yInput.value = y;
  xInputs.forEach((xBtn) => {
    xBtn.parentElement.classList.remove("active-btn");
    if (+xBtn.value === x) {
      xBtn.parentElement.classList.add("active-btn");
    }
  });
}

function inactiveMode() {
  checkLines.forEach((line) => line.classList.add("inactive"));
  changeRText("R");
  inactiveDot();
}

function inactiveDot() {
  xPointer.classList.add("inactive");
  yPointer.classList.add("inactive");
  circle.classList.add("inactive");
}

function setNotification(text) {
  notify.classList.remove("disabled");
  notifyMessage.innerText = text;
}
function disableNotification() {
  notify.classList.add("disabled");
}

function findMaxXLine (lines){
  let max = 150
  let line;
  for (let i = 0; i < lines.length; i++) {
    if(+(lines[i].getAttribute("x1"))>=+max){
      max = +(lines[i].getAttribute("x1"));
      line = lines[i]
    }
  }
  return line;
}

function findMinXLine (lines){
  let min = 150
  let line;
  for (let i = 0; i < lines.length; i++) {
    if(+(lines[i].getAttribute("x1"))<=+min){
      min = +(lines[i].getAttribute("x1"));
      line = lines[i]
    }
  }
  return line;
}
