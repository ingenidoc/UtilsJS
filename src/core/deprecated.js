
hasOwnProperty: {
    /**
     * @deprecated
     * @param key
     * @return {boolean}
     */
    Object.prototype.hasOwnProperty = function (key) {
        if (this instanceof Vue) console.warn('Method Object.prototype.hasOwnProperty is deprecated, please use Object.hasKey instead.');
        return Object.hasKey(this, key)
    };
    Object.prototype.hasOwnProperty.info = function () {
        let docs = "%c Object.prototype.hasOwnProperty %c\n" +
            "\n" +
            "Cette méthode native a été volontairement dépréciée en raison du manque de performance.\n" +
            "La méthode native fait appel à une fonction qui s'exécute en C.NET, qui manque de performance\n" +
            "sur tous les navigateurs, sauf MS.IE et MS.Edge. C'est pour cette raison qu'elle n'est plus utilisable.\n" +
            "\n" +
            "Remplacée par : Object.hasKey";
        console.deprecated(docs);
    }
}