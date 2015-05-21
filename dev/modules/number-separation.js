    // Цифры на разряды 10 000
    text = text.replace(/(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, "$1\xA0$2\xA0$3\xA0$4\xA0$5\xA0$6\xA0$7");
    text = text.replace(/(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, "$1\xA0$2\xA0$3\xA0$4\xA0$5\xA0$6");
    text = text.replace(/(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, "$1\xA0$2\xA0$3\xA0$4\xA0$5");
    text = text.replace(/(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, "$1\xA0$2\xA0$3\xA0$4");
    text = text.replace(/(\d{0,3}) ?(\d{3}) ?(\d{3})/g, "$1\xA0$2\xA0$3");
    text = text.replace(/(\d{2,3}) ?(\d{3})/g, "$1\xA0$2");