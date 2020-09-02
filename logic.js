            let num1 = 0;
            let num2 = 0;
            let operator;
            let storedNum;
            let result;
            let equalTrue = false;
            let containtsDot = false;
            let totalNum = "";
            let num1Assigned = false;
            let num2Assigned = false;
            let operatorTrue = false;
            let d = new Date(); // for now
            let currentTime = d.getHours(); // => 9
            let greeting;
            if (currentTime < 12 && currentTime > 5) {
                greeting = "Good Morning!"
            } else if (currentTime < 17) {
                greeting = "Good Afternoon!"
            } else {
                greeting = "Good Evening!"
            }
            console.log(currentTime)
            const AllButtons = Array.from(document.querySelectorAll('button'));
            AllButtons.forEach(button => button.disabled = true, true);
            
            const container = document.querySelector('#display');
            const display = document.createElement('div');
            display.classList.add('display');
            display.textContent = greeting
            setTimeout(function(){ display.textContent = "Let's do some math!"; }, 3000);
            setTimeout(function(){ display.textContent = 0; }, 6000);
            setTimeout(function(){ AllButtons.forEach(button => button.disabled = false, true); }, 6000); 
            display.style.padding = "2px"
            container.appendChild(display)

            const numberButtons = Array.from(document.querySelectorAll('.number'));
            numberButtons.forEach(button => button.addEventListener('click', numberSelector, true));

            const reverse = Array.from(document.querySelectorAll('.reverse'));
            reverse.forEach(button => button.addEventListener('click', reverseNum, true));

            const percentClick = Array.from(document.querySelectorAll('.percentBut'));
            percentClick.forEach(button => button.addEventListener('click', percentButton, true));

            const equalSign = document.querySelector('.equalSign');
            equalSign.addEventListener('click', performEquation, false);

            const clearButton = document.querySelector('#clear');
            clearButton.addEventListener('click', clear, false);

            const Button = Array.from(document.querySelectorAll('.operator'));
            Button.forEach(button => button.addEventListener('click', function(e) {

                storedNum = display.innerHTML;

                if (!num1Assigned) {
                    num1 = storedNum;
                    num1Assigned = true;
                    return;
                }

                if (num1Assigned && num2Assigned) {
                    result = operate(num1, num2, operator);
                    operator = this.id;
                    display.innerHTML = result;
                    if (result == "Ouch, you broke me") {
                        setTimeout(function(){ display.textContent = "Resetting..."; }, 2000);
                        setTimeout(function(){ clear() }, 3500);
                        AllButtons.forEach(button => button.disabled = true, true);
                        return
                    }
                    num1 = result;
                    num2Assigned = false;
                }
                
            }, false))

            const operators = Array.from(document.querySelectorAll('.operator'));
            operators.forEach(button => button.addEventListener('click', operatorSelector, true));

            function performEquation() {

                num2 = storedNum;
                num2Assigned = true;
                if (num1Assigned && num2Assigned) {
                    result = operate(num1, num2, operator);
                    display.innerHTML = result;
                    if (result == "Ouch, you broke me") {
                        setTimeout(function(){ display.textContent = "Resetting..."; }, 2000);
                        setTimeout(function(){ clear() }, 3500);
                        return
                    }
                    num1 = result;
                    num2Assigned = false;
                } else {
                    //pass;
                }

                equalTrue = true;
                containtsDot = false;

            }

            function clear() {
                AllButtons.forEach(button => button.disabled = true, true);
                num1 = 0;
                num2 = 0;
                operator = "";
                storedNum = "";
                result = "";
                equalTrue = false;
                totalNum = "";
                num1Assigned = false;
                num2Assigned = false;
                display.textContent = "All Clear!"
                setTimeout(function(){ display.textContent = 0; }, 1000);
                setTimeout(function(){ AllButtons.forEach(button => button.disabled = false, true); }, 1000);
                document.querySelector('.item1').innerHTML = "AC";
                containtsDot = false;

            }


            function numberSelector() {
                if (totalNum.length > 14) {                    
                    return;
                }

                if (this.id == "." && containtsDot) {
                    return;
                }
                if (this.id == "." ) {
                    containtsDot = true;
                }
                
                if (equalTrue) {
                    clear();
                    document.querySelector('.item1').innerHTML = "C";
                    display.innerHTML = this.id;
                    if (display.innerHTML == ".") {
                        display.innerHTML = "0.";
                        totalNum = "0.";
                    }

                    return;
                }

                display.textContent = "";
                totalNum += this.id;

                if (totalNum[0] == ".") {
                    totalNum = "0.";
                }
                

                display.textContent = totalNum;
                storedNum = display.innerHTML;

                if (num1Assigned && !num2Assigned) {
                    num2 = storedNum;
                    num2Assigned = true;
                    return;
                }
                document.querySelector('.item1').innerHTML = "C"
                return parseFloat(totalNum);
            }

            function operatorSelector() {
                containtsDot = false;
                totalNum = "";
                operator = this.id;
                equalTrue = false;
                return this.id;
            }

            function reverseNum() {
                if (equalTrue) {
                    num1Assigned = false;
                    num2Assigned = false;
                }
                equalTrue = false
                let currentNum = parseFloat(display.innerHTML);
                if (currentNum < 0) {
                    currentNum += Math.abs(currentNum * 2);
                    display.textContent = currentNum;
                } else {
                    currentNum -= (currentNum * 2);
                    display.textContent = currentNum;
                }
                if (!num1Assigned) {
                    num1 = currentNum;
                } else {
                    num2 = currentNum;
                    storedNum = num2;
                }    
            }

            function add(num1, num2) {
                return parseFloat(num1) + parseFloat(num2);
            }

            function subtract(num1, num2) {
                return parseFloat(num1) - parseFloat(num2);
            }

            function multiply(num1, num2) {
                return parseFloat(num1) * parseFloat(num2);
            }

            function divide(num1, num2) {

                return parseFloat(num1) / parseFloat(num2);
            }

            function percentButton() {
                equalTrue = false;
                let currentNum = parseFloat(display.innerHTML);
                display.textContent = round((currentNum * .01), 14);
                storedNum = round((currentNum * .01), 16);
                if (!num1Assigned) {
                    num1 = storedNum;
                } else {
                    num2 = storedNum;
                }             
            }

            function round(num, decimalPlaces) {
                var p = Math.pow(10, decimalPlaces);
                return Math.round(num * p) / p;
            }

            function operate(num1, num2, operator) {
                let answer;
                if (operator == "+") {
                    answer = add(num1, num2);
                } else if (operator == "-") {
                    answer = subtract(num1, num2);
                } else if (operator == "*") {
                    answer = multiply(num1, num2);
                } else if (operator == "/") {
                    if (num2 == 0) {  
                        totalNum = "";   
                        num1 = 0;
                        num2 = 0;
                        operator = ""
                        return "Ouch, you broke me"
                    } 
                    answer = divide(num1, num2);
                }

                return round(answer, 14)
            }
