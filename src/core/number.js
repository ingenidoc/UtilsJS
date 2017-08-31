between: {
    /**
     * @description Teste si un nombre est compris entre une valeur minimum et maximum
     * @param {Number} min La valeur minimum
     * @param {Number} max La valeur maximum
     * @return {boolean} True si le nombre est compris entre les deux valeurs, false sinon
     */
    Number.prototype.between = function (min, max) {
        if (max <= min) throw new Error("Le maximum ne peux être inférieur ou égal au minimum");
        return this >= min && this <= max
    };
    Number.prototype.between.info = function () {
        let docs = "%c Number.prototype.between: \n" +
            "%cTeste si un nombre est compris entre deux valeurs (minimum et maximum)\n" +
            "%c  @param {number} La valeur minimum\n" +
            "  @param {number} La valeur maximum\n" +
            "\n" +
            "%c  return {boolean} `true` si le nombre est compris entre les deux valeurs, `false` sinon\n" +
            "\n" +
            "%cSi le nombre maximum est inférieur ou égal au nombre minimum, une exception Error sera jetée";
        console.func_info(docs);
    }
}

indexOf: {
    /**
     * @description Simule la fonction indexOf sur les nobmres
     * @param {*} str La chaîne de caractères ou chiffres à vérifier
     * @return {Number} L'index de la chaîne
     */
    Number.prototype.indexOf = function (str) {
        return String(this).indexOf(String(str))
    };
    Number.prototype.indexOf.info = function () {
        let docs = "%c Number.prototype.indexOf: \n" +
            "%cDétermine l'index de position d'un nombre dans le nombre sur lequel est appelée la méthode indexOf\n" +
            "%c  @param {number|string} Le nombre dont on cherche la position\n" +
            "\n" +
            "%c  return {number} L'index du nombre recherché\n" +
            "\n" +
            "%cSi le nombre recherché n'a pas été trouvé, la méthode retourne -1. On peut donc imaginer le code suivant :\n" +
            "  var existe = !!~monNombre.indexOf(418); // Retourne `true` si 418 est dans monNombre, `false` sinon";
        console.func_info(docs);
    }
}
