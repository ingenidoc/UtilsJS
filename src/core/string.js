
capitalize: {
    /**
     * @description Retourne une chaîne de caractère avec la première lettre en majuscule
     * @return {string} La chaîne capitalisée
     */
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    String.prototype.capitalize.info = function () {
        let docs = "%c String.prototype.capitalize: \n" +
            "%cRetourne une chaîne de caractères en transformant la première lettre en majuscule\n" +
            "%c\n" +
            "%c  return {string} La chaîne de caractères capitalisée";
        console.func_info(docs);
    }
}

minimalize: {
    /**
     * @description Retourne une chaîne de caractère avec la première lettre en minuscule
     * @return {string} La chaîne minimalisée
     */
    String.prototype.minimalize = function () {
        return this.charAt(0).toLowerCase() + this.slice(1);
    };
    String.prototype.minimalize.info = function () {
        let docs = "%c String.prototype.minimalize: \n" +
            "%cRetourne une chaîne de caractères en transformant la première lettre en minuscule\n" +
            "%c\n" +
            "%c  return {string} La chaîne de caractères minimalisée";
        console.func_info(docs);
    }
}

replaceAll: {
    /**
     * @description Remplace toutes les occurences d'une recherche texte ou d'une expression régulière dans une chaîne
     * @param {String} search La recherche ou le regex à trouver
     * @param {String} replacement Le texte remplaçant les occurences
     * @return {String} La chaîne modifiée
     */
    String.prototype.replaceAll = function (search, replacement) {
        return this.split(search).join(replacement);
    };
    String.prototype.replaceAll.info = function () {
        let docs = "%c String.prototype.replaceAll: \n" +
            "%cReplace toutes les occurences d'un recherche dans une chaîne de caractères par le remplacement donné\n" +
            "%c  @param {string} La recherche à effectuer dans la chaîne de caractères\n" +
            "  @param {string} La chaîne de caractères remplaçant les occurences trouvées" +
            "\n" +
            "%c  return {string} La chaîne de caractères initiale avec les remplacements effectués";
        console.func_info(docs);
    }
}

scannerCheck: {
    String.prototype.scannerCheck = function () {
        let replacements = {
            'win': {
                '&': '1',
                'é': '2',
                '"': '3',
                "'": '4',
                '(': '5',
                '-': '6',
                'è': '7',
                '_': '8',
                'ç': '9',
                'à': '0'
            },
            'osx': {
                '&': '1',
                'é': '2',
                '"': '3',
                "'": '4',
                '(': '5',
                '§': '6',
                'è': '7',
                '!': '8',
                'ç': '9',
                'à': '0'
            }
        };
        let platform = (~navigator.platform.indexOf('Win'))
            ? 'win'
            : (~navigator.platform.indexOf('Mac'))
                ? 'osx'
                : null;
        let str = this;
        if(replacements[platform]) {
            Object.forEach(replacements[platform], function (replacement, char) {
                str = str.replaceAll(char, replacement);
            }, this)
        }
        return str;
    }

}