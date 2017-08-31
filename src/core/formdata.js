
appendAll: {
    /**
     * @description Ajoute toutes les paires clef/valeur d'un objet dans le FormData
     * @param {Object} obj L'objet dont les paires clef/valeur sont ajoutées
     * @param {String} prefix (Optionnel) Le préfixe des clefs
     * @return {FormData} L'instance du FormData
     */
    FormData.prototype.appendAll = function (obj, prefix = '') {
        Object.forEach(obj, function (item, key) {
            if(typeof item === 'object') item = JSON.stringify(item);
            this.append(prefix + key, item)
        }, this)
        return this
    };
    FormData.prototype.appendAll.info = function () {
        let docs = "%c FormData.prototype.appendAll: \n" +
            "%cAjoute toutes les paires clef/valeur d'un objet dans le FormData\n" +
            "%c  @param {Object} La source des paires clef/valeur à ajouter\n" +
            "  @param {string} (Optional) Le préfixe à ajouter aux clefs\n" +
            "\n" +
            "%c  return {FormData} L'instance du FormData actuel\n" +
            "\n" +
            "%cLe fait que cette méthode retourne l'instance permet de chaîner les instructions de la sorte :\n" +
            "  myFormData.appendAll(livraison, 'livraison_').appendAll(facturation, 'facturation_').appendAll(formulaire);";
        console.func_info(docs);
    }
}

appendAllIfTruthy: {
    /**
     * @description Ajoute toutes les paires clef/valeur d'un objet si les valeurs sont 'vraies' dans le FormData
     * @param {Object} obj L'objet dont les paires clef/valeur sont ajoutées
     * @param {String} prefix (Optionnel) Le préfixe des clefs
     * @return {FormData} L'instance du FormData
     */
    FormData.prototype.appendAllIfTruthy = function (obj, prefix = '') {
        Object.forEach(obj, function (item, key) {
            this.appendIfTruthy(prefix + key, item)
        }, this)
        return this
    };
    FormData.prototype.appendAllIfTruthy.info = function () {
        let docs = "%c FormData.prototype.appendAllIfTruthy: \n" +
            "%cAjoute toutes les paires clef/valeur d'un objet dans le FormData si la valeur est `vraie`\n" +
            "%c  @param {Object} La source des paires clef/valeur à ajouter\n" +
            "  @param {string} (Optional) Le préfixe à ajouter aux clefs\n" +
            "\n" +
            "%c  return {FormData} L'instance du FormData actuel\n" +
            "\n" +
            "%cIl faut faire attention à la 'véracité' des variables en JavaScript (par exemple: [] est une valeur vraie, voir https://developer.mozilla.org/fr/docs/Glossaire/Truthy)";
        console.func_info(docs);
    }
}

appendIfTruthy: {
    /**
     * @description Ajoute une clef dans le FormData si la valeur passée en paramètre est 'vraie'
     * @param {String} key La clef à ajouter
     * @param {*} val La valeur de la clef
     * @return {FormData} L'instance du FormData
     */
    FormData.prototype.appendIfTruthy = function (key, val) {
        if (!!val) this.append(key, val);
        return this
    };
    FormData.prototype.appendIfTruthy.info = function () {
        let docs = "%c FormData.prototype.appendIfTruthy: \n" +
            "%cAjoute une paire clef valeur dans le FormData SSI la valeur est considérée comme `vraie`" +
            "%c  @param {string} Le nom de la clef à ajouter\n" +
            "  @param {*} La valeur à ajouter\n" +
            "\n" +
            "%c  return {FormData} L'instance du FormData actuel\n" +
            "\n" +
            "%cIl faut faire attention à la 'véracité' des variables en JavaScript (par exemple: [] est une valeur vraie, voir https://developer.mozilla.org/fr/docs/Glossaire/Truthy)";
        console.func_info(docs);
    }
}