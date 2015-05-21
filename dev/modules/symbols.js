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