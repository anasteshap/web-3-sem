var Cal = function (divId) {

    //Сохраняем идентификатор div
    this.divId = divId;

    // Дни недели с понедельника
    this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    // Месяцы начиная с января
    this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    //Устанавливаем текущий месяц, год
    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function () {
    if (this.currMonth === 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    } else {
        this.currMonth = this.currMonth + 1;
    }
    this.showCurMonth();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function () {
    if (this.currMonth === 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    } else {
        this.currMonth = this.currMonth - 1;
    }
    this.showCurMonth();
};

// Показать текущий месяц
Cal.prototype.showCurMonth = function () {
    this.showMonth(this.currYear, this.currMonth);
};


// Показать месяц (год, месяц)
Cal.prototype.showMonth = function (y, m) {

    // Первый день недели в выбранном месяце
    const firstDayOfMonth = new Date(y, m, 7).getDay()
    // Последний день выбранного месяца
    const lastDateOfMonth = new Date(y, m + 1, 0).getDate()
    // Последний день предыдущего месяца
    const lastDayOfLastMonth = m === 0
        ? new Date(y - 1, 11, 0).getDate()
        : new Date(y, m, 0).getDate();


    let html = '<table>';

    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';


    // заголовок дней недели
    html += '<tr class="days">';
    for (let i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Записываем дни
    let i = 1;
    do {
        let dow = new Date(y, m, i).getDay();

        // Начать новую строку в понедельник
        if (dow === 1) {
            html += '<tr>';
        }

        // Если первый день недели не понедельник показать последние дни предыдущего месяца
        else if (i === 1) {
            html += '<tr>';
            let k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (let j = 0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        // Записываем текущий день в цикл
        let chk = new Date();
        let chkY = chk.getFullYear();
        let chkM = chk.getMonth();
        if (chkY === this.currYear && chkM === this.currMonth && i === this.currDay) {
            html += '<td class="today">' + i + '</td>';
        } else {
            html += '<td class="normal">' + i + '</td>';
        }
        // закрыть строку в воскресенье
        if (dow === 0) {
            html += '</tr>';
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if (i === lastDateOfMonth) {
            let k = 1;
            for (dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Конец таблицы
    html += '</table>';

    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
};

// При загрузке окна
window.onload = function () {

    // Начать календарь
    var c = new Cal("divCal");
    c.showCurMonth();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function () {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();
    };
}

function getId(id) {
    return document.getElementById(id);
}
