    // На английском внутри
    text = text.replace(/„([A-z])/g,"‘$1");
    text = text.replace(/([A-z](.*))“/g,"$1’");
    // На английском снаружи
    text = text.replace(/«([A-z])/g,"“$1");
    text = text.replace(/([A-z])»/g,"$1”");
    // Восстанавливает англйиские сокращения, like don't
    text = text.replace(/([A-z])”([A-z])/g,"$1’$2");