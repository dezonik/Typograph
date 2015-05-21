    // Квадраты и кубы            
    text = text.replace(/\s?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?2/gi, "\xA0$1²");
    text = text.replace(/\s?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?3/gi, "\xA0$1³");