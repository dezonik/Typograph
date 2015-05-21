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