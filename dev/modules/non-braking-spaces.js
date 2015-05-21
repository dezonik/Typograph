    // Неразрывные пробелы (Спасибо типографу Кирилла Панфилова http://erlang.kirillpanfilov.com/devanagari)
    preps = new Array("без", "безо", "в", "во", "вне", "для", "до", "за", "из", "изо", "из-за", "из-под", "к", "ко", "на", "над", "надо", "о", "об", "обо", "около", "от", "ото", "по", "по-над", "под", "подо", "при", "про", "с", "со", "сквозь", "у", "через", "а", "но", "и", "да", "или", "иль", "либо", "не", "ни", "a", "the", "at", "to", "or")
    for (i=0; i<preps.length; i++) {
          tmp = new RegExp("( |^|\\(|«|„|\xA0)("+preps[i]+") ", "ig");
          text = text.replace(tmp,"$1$2\xA0");
    }

    text = text.replace(/(\s)([A-ZА-ЯЁ]) ([A-ZА-ЯЁ])/ig, "$1$2\xA0$3"); // Однобуквенные слова

    tmp = new RegExp(" (бы|ли|же|б|ль|ж)( |\xA0|\\.|,|!|\\?|:|;)", "ig");
    text = text.replace(tmp,"\xA0$1$2");

    text = text.replace(/(т)\.( *)(д|п|ч|наз|к|г|е|обр)\./ig,"$1.\xA0$3.");

    tmp = new RegExp("(рис\\.|илл\\.|№|§|п\\.|гл\\.|ч\\.|стр\\.)( *)([0-9]|I|V|X|L|C|D|M)", "ig");
    text = text.replace(tmp,"$1\xA0$3");
    text = text.replace(/№([^ ])/g,"№\xA0$1");
    
    tmp = new RegExp("(см\\.|им\\.)( *)", "ig");
    text = text.replace(tmp,"$1\xA0");

    text = text.replace(/([^^>\.]) (.{1,4})$/g,"$1\xA0$2");

    tmp = new RegExp("( |\xA0)( |\xA0)", "g");
    text = text.replace(tmp,"\xA0");