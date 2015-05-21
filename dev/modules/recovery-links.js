    // Восстановление ссылок
    text = text.replace(/http: /ig,"http:");
    text = text.replace(/https: /ig,"https:");
    text = text.replace(/ftp: /ig,"ftp:");
    text = text.replace(/ftp. /ig,"ftp.");
    text = text.replace(/www\. /ig,"www.");
    text = text.replace(/(http|www)([^ ]*)\. /ig,"$1$2.");
    text = text.replace(/(http|www)([^ ]*)\. /ig,"$1$2.");