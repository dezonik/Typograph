

var onRun = function (context) {
	var doc = context.document;
	var selection = context.selection;
	
	for (var il=0; il<selection.length(); il++) {
		
		if (selection[il].className() == "MSTextLayer") {

			// get the layer
			var layer = selection[il];

			// get the text
			var text = layer.stringValue();

               // Символы
               text = text.replace(/\s?(\(c\))|\s?(\(с\))/gi, "\xA0©");
               text = text.replace(/\s?\(r\)/gi, "\xA0®");
               text = text.replace(/\s?(\(tm\))|\s?(\(тм\))/gi, "™");
               text = text.replace(/\s?(\s)--(\s)\s?/g, "\xA0$1—$2 ");
               text = text.replace(/<-/g, "←");
               text = text.replace(/->/g, "→");
               text = text.replace(/(\S)( |\xA0)?(\+-)|(\+\/-)\s?(\d|\(|\))/g, "$1 ±\xA0$5");
               text = text.replace(/(\S)( |\xA0)?\!\=\s?(\d|\(|\))/g, "$1 ≠\xA0$3");
               text = text.replace(/(\S)( |\xA0)?(\+|\-|\=|\*|\/|≈|×)\s?(\d|\(|\))/g, "$1 $3 $4");
               text = text.replace(/(\S)( |\xA0)?\-\s?(\d|\(|\))/g, "$1 − $3");

               
               // !!!!!!!!!!!!!!!!!!!???????????????
               text = text.replace(/(\!|\?){2,}/g, "$1");


               // Квадраты и кубы            
               text = text.replace(/\s?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?2/gi, "\xA0$1²");
               text = text.replace(/\s?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?3/gi, "\xA0$1³");


               // Тире
               text = text.replace(/-|-/g, "-"); // Унифицируем    

               text = text.replace(/–/g, "—");
               text = text.replace(/-( |\xA0)/g,"—$1");
               text = text.replace(/( |\xA0)-/g,"$1—");

               text = text.replace(/([^ \xA0])—( |\xA0)(и|да|либо)/g,"$1-$2$3");

               text = text.replace(/([^ |\xA0])( |\xA0)?—( |\xA0)?([^ ])/g,"$1$2—$3$4");

               text = text.replace(/(\n)( |\xA0)*—( |\xA0)*([A-ZА-ЯЁ])/g, "$1—\xA0$4"); // С новой строки - прямая речь
               text = text.replace(/([A-ZА-ЯЁ])( |\xA0)—/g, "$1\xA0—");


               text = text.replace(/^-([^ |\xA0])/g, "— $1");

               text = text.replace(/<!\xA0—\xA0(—|-)/g,"<!--");
               text = text.replace(/— (—|-)+>/g,"-->");

               // Тире в телефонах на цифорвое тире
               text = text.replace(/\+( |\xA0)?([0-9]{1,4})( |\xA0)?( |\xA0|-|−|–|—)?(\()?( |\xA0)?([0-9]{1,4})( |\xA0)?(\))?( |\xA0|-|−|–|—)?( |\xA0)?([0-9]{1,3})( |\xA0)?( |\xA0|−|–|—)?( |\xA0)?([0-9]{2})( |\xA0)?( |\xA0|−|–|—)?( |\xA0)?([0-9]{2})/g,"\+$2\xA0$5$7$9\xA0$12–$16–$20");
               text = text.replace(/(8)( |\xA0)?( |\xA0|−|–|—)?(\()?( |\xA0)?([0-9]{1,4})( |\xA0)?(\))?( |\xA0|−|–|—)?( |\xA0)?([0-9]{1,3})( |\xA0)?( |\xA0|−|–|—)?( |\xA0)?([0-9]{2})( |\xA0)?( |\xA0|−|–|—)?( |\xA0)?([0-9]{2})/g,"$1\xA0$4$6$8\xA0$11–$15–$19");
               
               // Килер-фича, убирает скобочки :D
               phones = new Array("495", "499", "903", "905", "906", "909", "951", "953", "960", "961", "962", "963", "964", "965", "966", "967", "968", "910", "911", "912", "913", "914", "915", "916", "917", "918", "919", "980", "981", "982", "983", "984", "985", "987", "988", "989", "920", "921", "922", "923", "924", "925", "926", "927", "928", "929", "999");
               for(y=0; y<phones.length; y++) {
                   tmp = new RegExp("[(]("+phones[y]+")[)]", "g");
                   text = text.replace(tmp,"$1");
               }

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
               
               // На английском внутри
               text = text.replace(/„([A-z])/g,"‘$1");
               text = text.replace(/([A-z](.*))“/g,"$1’");
               // На английском снаружи
               text = text.replace(/«([A-z])/g,"“$1");
               text = text.replace(/([A-z])»/g,"$1”");
               // Восстанавливает англйиские сокращения, like don't
               text = text.replace(/([A-z])”([A-z])/g,"$1’$2");

               // .»  →  ».
               text = text.replace(/\.»/g,"»\.");


               // Заменяет р. на ₽
               text = text.replace(/(\d ?)((руб)|(Руб)|(РУБ))\. *([0-9А-ЯЁ])/g, "$1\xA0₽. $6"); // В предложении
               text = text.replace(/(\d ?)((руб)|(Руб)|(РУБ))\. *([0-9A-Z])/g, "$1\xA0₽. $6");
               text = text.replace(/(\d ?)((руб)|(Руб)|(РУБ))\./g, "$1\xA0₽"); // Одинокий рубль без точки
               text = text.replace(/(\d ?)(р|Р)\. *([0-9А-ЯЁ])/g, "$1\xA0₽. $3"); // В предложении
               text = text.replace(/(\d ?)(р|Р)\. *([0-9A-Z])/g, "$1\xA0₽. $3");
               text = text.replace(/(\d ?)(р|Р)\./g, "$1\xA0₽"); // Одинокий рубль без точки


               // Двойные пробелы
               text = text.replace(/( |\xA0){2,}/g, " ");
               // Двойные табы
               text = text.replace(/(  ){2,}/g, "  ");
               // Двойные точки
               text = text.replace(/([^\.])\.\.(\s)/g, "$1.$2");
               text = text.replace(/(\.){4,}/g, ".");
               // Двойные и более запятые, двоеточия и точки с запятой
               text = text.replace(/(\,|\:|\;){2,}/g, "$1");
               // Двойные и больше энтеры
               text = text.replace(/(\s*)\n{2,}(\s*)/g, "\n"); // Абзацы
               text = text.replace(/(\u2028|\u2029){2,}/g, "\u2028"); // Перенос строки

               // Пробелы после знаков препинания
               text = text.replace(/(\S)(\s?)(\.|\,|\:|\;|\!|\?)([^\.|\,|\:|\;|\!|\?|»|”|’])/g, "$1$3 $4");        // Привет ,как дела
               text = text.replace(/(\S)(\s?)(\.|\,|\:|\;|\!|\?)[ ]?(\n|\u2028|\u2029)/g, "$1$3$4");               // Привет !
                                                                                                                   // Как дела
               text = text.replace(/(\S)(\s?)(\.|\,|\:|\;|\!|\?)$/g, "$1$3");                                      // Привет ! (в конце строки)
               text = text.replace(/(\S)(\s?)(\.|\,|\:|\;|\!|\?)[ ]+([^\.|\,|\:|\;|\!|\?|»|”|’])/g, "$1$3 $4");    // Привет , как дела
               
               // Восстановление ссылок
               text = text.replace(/http: /ig,"http:");
               text = text.replace(/https: /ig,"https:");
               text = text.replace(/ftp: /ig,"ftp:");
               text = text.replace(/ftp. /ig,"ftp.");
               text = text.replace(/www\. /ig,"www.");
               text = text.replace(/(http|www)([^ ]*)\. /ig,"$1$2.");
               text = text.replace(/(http|www)([^ ]*)\. /ig,"$1$2.");

               // Восстановление чисел
               text = text.replace(/(\d)(\.|\,|\:|\;|\!|\?)( |\xA0)(\d)/g,"$1$2$4");

               // Убрать пробел с новой строки
               text = text.replace(/(\n|\u2028|\u2029)[ |\xA0]?/g, "$1");



               // Ставит пробелы 100 %, 100 $, 100 €, 100 ₽
               text = text.replace(/(\d+) ?(%|\$|€|₽)/g, "$1\xA0$2");
               // Убирает пробелы $100, €100
               text = text.replace(/(\$|€) ?(\d+)/g, "$1$2");

               // Цифры на разряды 10 000
               text = text.replace(/( |\xA0)(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, " $2\xA0$3\xA0$4\xA0$5\xA0$6\xA0$7\xA0$8");
               text = text.replace(/( |\xA0)(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, " $2\xA0$3\xA0$4\xA0$5\xA0$6\xA0$7");
               text = text.replace(/( |\xA0)(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, " $2\xA0$3\xA0$4\xA0$5\xA0$6");
               text = text.replace(/( |\xA0)(\d{0,3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, " $2\xA0$3\xA0$4\xA0$5");
               text = text.replace(/( |\xA0)(\d{0,3}) ?(\d{3}) ?(\d{3})/g, " $2\xA0$3\xA0$4");
               text = text.replace(/( |\xA0)(\d{2,3}) ?(\d{3})/g, " $2\xA0$3");

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
                  

			// insert beautiful text
			layer.setStringValue(text);

			// hack to force refresh in the style panel
			layer.setIsSelected(false);
			layer.setIsSelected(true);
			
		};
	};
};