        /* Пометка для рега:

        input-zone
        button
        attemts
        result-frame
        hint-text
        almost-text
        reload-text

        */
        
        //шаблон рега:            const  = document.querySelector(".");
        //рег DOM'ов   
        const input = document.querySelector(".input-zone");
        const button = document.querySelector(".button");
        const attemptsText = document.querySelector(".attempts");
        const result = document.querySelector(".result-frame");
        const hintText = document.querySelector(".hint-text");
        const almostText = document.querySelector(".almost-text");
        const reload = document.querySelector(".reload-text")

        const secretNum = Math.floor(Math.random() * 100)+1;
        let attempts = 0;

        //осн. ивенты
        button.addEventListener("click", checkGuessNum) //нажатие на кнопку для запуска основной функции игры

        reload.addEventListener("click", () => {            //для перезагрузки/новой игры
            location.reload();
        });

        input.addEventListener("keypress", function(c) {        //основной ивент игры с проверками, подсказками и т.п.
            if (c.key === "Enter") {
                checkGuessNum();
            }
        });
        function checkGuessNum() {
            const guessNum = parseInt(input.value);
            if (isNaN(guessNum) ||
                guessNum < 1 ||
                guessNum > 100)
                {
                    result.textContent = "Что-то пошло не так. Введите число от 1 до 100"
                    return;
                }
            
            attempts++;
            attemptsText.textContent = `Попыток: ${attempts}`;

            //осн. проверка:
            if (guessNum === secretNum){
                result.textContent = `Молодец! Ты угадал(а) число ${secretNum} за ${attempts} попыток`;

                hintText.textContent = "";
                almostText.textContent = "";

                //отключение кнопок для "итогового вида"
                button.disabled = true;
                input.disabled = true;
                return;
            }

            //подсказки
            let almostDif = Math.abs(guessNum - secretNum); //расчёт для "почти угадал" 

            if (guessNum < secretNum) {
                hintText.textContent = "Число больше";
            }
            else {
                hintText.textContent = "Число меньше";
            }

            if (almostDif <= 3){
                almostText.textContent = "Почти угадал!";
            }
            else {
                almostText.textContent = "";
            }
            
            //очистка поля ввода и фокус на нём
            input.value = '';
            input.focus();
        }

        