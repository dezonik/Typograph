    // Кавычки
    tmp = new RegExp('«|»|"|„|“|”|’|‘', "g"); // Унифицируем
    text = text.replace(tmp,"»");
    tmp = new RegExp("'", "g"); // Одиночную ещё
    text = text.replace(tmp,"»");
    // Снаружи
    text = text.replace(/( *)»(\S(?=[А-я]))/gi,"$1«$2");
    text = text.replace(/( *)»(\S(?=[A-z]))/gi,"$1«$2");
    text = text.replace(/( *)»(\S(?=[0-9]))/gi,"$1«$2");
    // Внутри
    ins = 0;
    while (ins<30) {
          text = text.replace(/«([^«»]*)«([^«»]*)»/g,"«$1„$2“");
          ins++;
    }