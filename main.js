var correctAnswer;
var waiting = false;
const answers = ["/", "/", "/", "/"];
var streak = 0;

document.addEventListener('DOMContentLoaded', onStart, false);

function onStart() {
    generateTask();
}

function getRndInteger(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}

function replaceButtonText(buttonId, text) {
    if (document.getElementById) {
        var button = document.getElementById(buttonId);
        if (button) {
            if (button.childNodes[0]) {
                button.childNodes[0].nodeValue = text;
            }
            else if (button.value) {
                button.value = text;
            }
            else {
                button.innerHTML = text;
            }
        }
    }
}

function isInOtherButton(buttonId, input) {
    for (let i = 1; i < 5; i++) {
        var buttonText = getButtonText(buttonId);
        if (input == buttonText) {
            return true;
        }
    }
    return false;
}

function generateTask() {
    var firstOperand;
    var secondOperand;
    var result;

    var operation = getRndInteger(0, 2);
    switch (operation) {
        case 0:
            firstOperand = getRndInteger(1, 100);
            secondOperand = getRndInteger(1, 100);
            document.getElementById("question").innerHTML = firstOperand + " + " + secondOperand;
            result = firstOperand + secondOperand;
            break;
        case 1:
            firstOperand = getRndInteger(1, 10);
            secondOperand = getRndInteger(1, 10);
            document.getElementById("question").innerHTML = firstOperand + " * " + secondOperand;
            result = firstOperand * secondOperand;
            break;
        case 2:
            firstOperand = getRndInteger(1, 10);
            secondOperand = getRndInteger(1, 10);
            document.getElementById("question").innerHTML = (firstOperand * secondOperand) + " / " + firstOperand;
            result = secondOperand;
            break;
    }

    correctAnswer = getRndInteger(1, 4);
    for (let i = 1; i < 5; i++) {
        if (correctAnswer == i) {
            replaceButtonText("answer" + i, result);
            answers[i - 1] = result;
        } else {
            var rndAnswer = getRndInteger(result - (result <= 10 ? result - 1 : 10), result + 10);
            while (answers.includes(rndAnswer) || rndAnswer == result) {
                rndAnswer = getRndInteger(result - (result <= 10 ? result - 1 : 10), result + 10);
            }
            answers[i - 1] = rndAnswer;
            replaceButtonText("answer" + i, rndAnswer);
        }
    }
}

function setButtonsPressable(pressable) {
    for (let i = 1; i < 5; i++) {
        document.getElementById("answer" + i).disabled = !pressable;
    }
}

function onButtonClick(answerNumber) {
    if (answerNumber == correctAnswer) {
        document.getElementById("answer" + answerNumber).style.backgroundColor = '#08c93c';
        streak++;
    } else {
        streak = 0;
        document.getElementById("answer" + answerNumber).style.backgroundColor = '#eb0707';
        document.getElementById("answer" + correctAnswer).style.backgroundColor = '#08c93c';
    }
    document.getElementById("streaks").innerHTML = "Streak: " + streak;
    setButtonsPressable(false);
    waiting = true;
    setTimeout(function () {
        for (let i = 1; i < 5; i++) {
            document.getElementById("answer" + i).style.backgroundColor = '#ebebeb';
        }
        generateTask();
        setButtonsPressable(true);
        waiting = false;
    }, 1000);
}
