
const parameter_must_be_object = "Error at Object.values: expecting parameter 1 to be 'Object'.";
const expecting_one_object = "Expecting parameter 1 to be 'Object'.";

values: {
    /**
     * @description Retourne un array comportant les valeurs de l'objet passé en paramètre (Polyfill de la méthode expérimentale Object.values() )
     * @param {Object} object L'objet dont on récupère les valeurs
     * @return {Array} Le tableau comprenant les valeurs de l'objet passé en paramètre
     */
    Object.values = function (object) {
        if (object instanceof Object) {
            if (Object.keys(object).length > 0) {
                let values = [];
                Object.keys(object).forEach(function (key) {
                    values.push(object[key])
                });
                return values
            }
            else {
                return [];
            }
        }
        else {
            console.error(parameter_must_be_object);
            throw new TypeError(expecting_one_object);
        }
    };
    Object.values.info = function () {
        let docs = "%c Object.values: \n" +
            "%cRetourne un tableau comportant les valeurs d'un objet\n" +
            "%c  @param {Object} L'objet\n" +
            "\n" +
            "%c  return {Array} Le tableau des valeurs de l'objet passé\n" +
            "\n" +
            "%cUne exception TypeError sera levée si le paramètre n'est pas un objet";
        console.func_info(docs);
    }
}

forEach: {
    /**
     * @description Effectue une action sur chaque occurence d'un objet (Polyfill de la méthode Object.forEach() )
     * @param {Object} object L'object à parcourir
     * @param {Function|*} callback La fonction à exécuter à chaque occurence
     * @param thisArg
     */
    Object.forEach = function (object, callback, thisArg = this) {
        if (object instanceof Object) {
            let keys = Object.keys(object);
            keys.forEach(function (key, index) {
                callback.apply(thisArg, [object[key], key, index])
            })
        }
        else {
            console.error(parameter_must_be_object);
            throw new TypeError(expecting_one_object);
        }
    };
    Object.forEach.info = function () {
        let docs = "%c Object.forEach: \n" +
            "%cItère les paires clef/valeur d'un objet et exécute une fonction callback à chaque itération\n" +
            "%c  @param {Object} L'objet à itérer\n" +
            "  @param {Function(value, key, index)} La fonction callback qui recevra la valeur, la clef et l'index de la paire clef/valeur\n" +
            "\n%c" +
            "%cUne exception TypeError sera levée si le premier paramètre n'est pas un objet";
        console.func_info(docs);
    }
}

copy: {
    /**
     * @description Copie une variable de type Object par valeur au lieu de copier par référence
     * @param {Object} source L'objet à copier
     * @return {Object} La copie de l'objet
     */
    Object.copy = function (source) {
        let target = {};
        let keys = Object.keys(source);
        keys.forEach(function (key) {
            target[key] = source[key]
        });
        return target
    };
    Object.copy.info = function () {
        let docs = "%c Object.copy: \n" +
            "%cCopie un objet par valeur et retourne la copie au lieu de passer par référence\n" +
            "%c  @param {Object} L'objet à copier par valeur\n" +
            "\n" +
            "%c  return {Object} L'objet passé par valeur\n" +
            "\n" +
            "%cDepuis l'ECMAScript-262 6th edition, il existe une méthode Object.assign(target, ...sources) qui fonctionne de la même manière,\n" +
            "seulement, celle-ci est plus stricte, mais permet de copier plusieurs objets à la fois";
        console.func_info(docs);
    }
}

sortBy: {
    /**
     * @description Trie le champ donné d'un objet ou d'un tableau selon le sens défini
     * @param {Array|Object} obj L'objet ou le tableau à trier
     * @param {String} key Le champ à trier
     * @param {Boolean} desc Tri decroissant si true, croissant sinon
     * @return {Array}
     */
    Object.sortBy = function (obj, key, desc) {
        let sens = desc ? -1 : 1;

        if (!key) throw new TypeError("Failed to execute 'Object.sortBy': 2 argument required, but only " + arguments.length + " present.");
        if (typeof key !== 'string') throw new TypeError("Error at Object.sortBy: expected parameter 1 to be String but got " + typeof key + " instead.");
        if (typeof obj !== 'object') throw new TypeError("Error at Object.sortBy: expected parameter 0 to be object but got " + typeof obj + " instead.");

        let arr = (obj instanceof Array) ? Array.copy(obj) : Object.copy(obj).values;

        arr = arr.slice().sort(function (a, b) {
            if (!Object.hasKey(a, key) || !Object.hasKey(b, key)) throw new ReferenceError("Error at Object.sortBy: key " + key + " does not exist.");
            if (typeof a !== 'object' || typeof b !== 'object') throw new TypeError("Error at Object.sortBy: nested objects should be of type object.");

            a = a[key];
            b = b[key];
            if (typeof a === 'string') a = a.toLowerCase();
            if (typeof b === 'string') b = b.toLowerCase();
            return (a === b ? 0 : a > b ? 1 : -1) * sens
        });

        return arr
    };
    Object.sortBy.info = function () {
        let docs = "%c Object.sortBy: \n" +
            "%cTrie un tableau d'objets selon un champ et retourne le tableau après le tri\n" +
            "%c  @param {Array[Object]} Le tableau d'objets à trier\n" +
            "  @param {string} La clef des objets sur laquelle il faut trier\n" +
            "  @param {*} Si ce paramètre est valorisée par une valeur 'vraie', le tri sera descendant\n" +
            "\n%c" +
            "%c  return {Array[Object]} Le tableau d'objets post-tri\n";
        console.func_info(docs);
    }
}

hydrate: {
    /**
     * @description Hydrate les clefs de l'objet source dans l'objet cible si celui-ci comporte ces mêmes clefs
     * @param {Object} target L'objet dont les clefs prendront les valeurs des clefs de l'objet source
     * @param {Object} source L'objet dont les clefs seront fusionnées dans l'objet cible
     */
    Object.hydrate = function (target, source) {
        Object.forEach(source, function (item, key) {
            if (Object.hasKey(target, key)) target[key] = item
        })
    };
    Object.hydrate.info = function () {
        let docs = "%c Object.hydrate: \n" +
            "%cHydrate les clefs d'un objet cible par les valeurs des clefs similaires d'un autre objet\n" +
            "%c  @param {Object} L'objet à hydrater\n" +
            "  @param {Object} L'objet dont les valeurs seront injectées\n" +
            "%c\n" +
            "%cSi une clef n'est pas rencontrée dans l'objet injectant, la valeur de cette clef gardera sa précédente valeur.\n" +
            "On peut ainsi imaginer créer un objet avec des valeurs par défaut puis venir hydrater les clefs existantes.";
        console.func_info(docs);
    }
}

clear: {
    /**
     * @description Vide les valeurs d'un objet par les valeurs par défaut (String : '', Number: 0, Array: [], Object: {}, autre: null)
     * @param {Object} obj L'objet dont les clefs seront vidées
     */
    Object.clear = function (obj) {
        Object.forEach(obj, function (item, key) {
            if (typeof item === 'string') obj[key] = '';
            else if (typeof item === 'number') obj[key] = 0;
            else if (item instanceof Array) obj[key] = [];
            else if (item instanceof Object) obj[key] = {};
            else obj[key] = null
        })
    };
    Object.clear.info = function () {
        let docs = "%c Object.clear: \n" +
            "%cVide toutes les valeurs d'un objet et les remplace par les valeurs 'vides' de leur type\n" +
            "%c  @param {Object} L'objet dont les clefs seront vidées\n" +
            "%c\n" +
            "%cVoici la liste des possibilités de valeurs vides:\n" +
            "  - {string} : ''\n" +
            "  - {number} : 0\n" +
            "  - {Array}  : []\n" +
            "  - {Object} : {}\n" +
            "  - {*}      : null";
        console.func_info(docs);
    }
}

hasKey: {
    /**
     * @description Détermine si l'objet possède la clef renseignée (plus performant que Object.prototype.hasOwnProperty() )
     * @param {*} obj L'objet dont on vérifie l'existence de la clef
     * @param {String} key La clef dont on vérifie l'existence
     * @return {boolean} True si la clef existe, false sinon
     */
    Object.hasKey = function (obj, key) {
        return !!~Object.getOwnPropertyNames(obj).indexOf(key);
    };
    Object.hasKey.info = function () {
        let docs = "%c Object.hasKey: \n" +
            "%cDétermine si un objet comporte une clef dont le nom est renseigné\n" +
            "%c  @param {Object} L'objet dont on vérifie l'existence de la clef\n" +
            "  @param {string} Le nom de la clef à chercher\n" +
            "\n" +
            "%c  return {boolean} true si la clef existe dans l'objet, false sinon\n" +
            "\n" +
            "%cObject.hasKey fonctionne exactement de la même manière que Object.prototype.hasOwnProperty, seulement,\n" +
            "Object.hasKey est plus performant de quelques millisecondes que hasOwnProperty (sauf sur navigateur Microsoft)";
        console.func_info(docs);
    }
}

/**
 * @description Retourne le nombre de clefs d'un objet
 * @return {number} Le nombre de clef de l'objet
 */
// Object.defineProperty(Object.prototype, 'length', {
//     configurable: false,
//     enumerable: false,
//     get: function () {
//         return Object.keys(this).length
//     },
//     set: function () {
//         throw new SyntaxError("Object.prototype.length is read-only")
//     }
// });

filter: {
    Object.filter = function (obj, callback) {
        Object.forEach(obj, function (item, key, index) {
            if(!callback(item, key, index)) {
                delete obj[key]
            }
        });
    };
    Object.filter.index = function () {
        let docs = "%c Object.filter: \n" +
            "%cFiltre un objet selon le retour une fonction callback\n" +
            "%c  @param {Object} L'objet à filtrer\n" +
            "  @param {Function(value, key, index)} La fonction callback exécutée à chaque itération de paire clef/valeur\n" +
            "%c\n" +
            "%cUne paire clef/valeur est préservée dans l'objet si le retour de la fonction callback est vrai. Ainsi suit l'exemple :\n" +
            "  let obj = { a: 'foo', b: 5, c: true, d: ['bar'] };\n" +
            "  Object.filter(obj, function (item, key, index) {\n" +
            "    return item === 'foo' || key == 'b' || index = 3\n" +
            "  };\n" +
            "// => obj { a: 'foo', b: 5, d: ['bar'] }";
        console.func_info(docs);
    }
}