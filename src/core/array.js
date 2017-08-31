

fix: {

    /**
     * @description Supprime toutes les entrées non-conformes d'un tableau (selon un type donné, sinon retire tout champ dit 'falsy')
     * @param {Array} array Le tableau à réparer
     * @param {String} type Le type de donnée conforme des entrées du tableau
     * @return {Array} Le tableau après réparation
     */
    Array.fix = function (array, type = '') {
        switch (type.toLowerCase()) {
            case 'number': // Si on veut des nombres
            case 'float': // ou des décimaux, le traitement est le même
                array = array.filter(function (item) {
                    return (!Array.isArray(item) && ~item && !isNaN(item))
                }).map(function (item) {
                    return Number(item)
                });
                break;
            case 'int': // Si on ne veut que des entiers
                array = array.filter(function (item) {
                    return (!Array.isArray(item) && ~item && !isNaN(item))
                }).map(function (item) {
                    return round(Number(item), 0)
                });
                break;
            case 'string': // Si on veut des chaînes de caractères
                array = array.filter(function (item) {
                    return (!Array.isArray(item) && typeof(item) === 'string')
                });
                break;
            case 'char': // Si on ne veut que des caractères
                array = array.filter(function (item) {
                    return (!Array.isArray(item) && typeof(item) === 'string' && item.length === 1)
                });
                break;
            case 'array': // Si on veut des tableaux
                array = array.filter(function (item) {
                    return Array.isArray(item)
                });
                break;
            case 'object':
            case 'collection': // Si on veut des collections laravel
                array = array.filter(function (item) {
                    return (!Array.isArray(item) && typeof item === 'object')
                });
                break;
            case 'truthy': // Si on veut tout ce qui est "truthy" (val == true)
                array = array.filter(function (item) {
                    return !!item === true
                });
                break;
            case 'falsy': // Si on veut tout ce qui est "falsy" (val == false)
                array = array.filter(function (item) {
                    return !!item === false
                });
                break;
            case 'notnull':
                array = array.filter(function (item) {
                    return !~[null, '', undefined].indexOf(item)
                });
                break;
            default: // Si on n'a aucun type (correspondant), on retire simplement ce qui est faux
                array = array.filter(function (item) {
                    return item != undefined
                });
                break;
        }
        return array
    };
    Array.fix.info = function () {
        let docs = "%c Array.fix: \n" +
            "%cSupprime toutes les valeurs non-conformes d'un tableau selon un type donné\n" +
            "%c  @param {Array} Le tableau source\n" +
            "  @param {string} (Optional) Le type de valeurs conformes\n" +
            "\n" +
            "%c  return {Array} Le tableau source après filtrage des valeurs non conformes\n" +
            "\n" +
            "%cValeurs de types possibles : number, float, int, string, char, array, object, collection, truthy, falsy, notnull (par défault retire les valeurs undefined)";
        console.func_info(docs);
    };

}

copy: {
    /**
     * @description Copie une variable de type Array par valeur au lieu de copier par référence
     * @param {Array} source Le tableau à copier
     * @return {Array} La copie du tableau
     */
    Array.copy = function (source) {
        let target = [];
        let keyIterator = source.keys();
        let key = keyIterator.next();
        while (!key.done) {
            target[key.value] = source[key.value];
            key = keyIterator.next()
        }
        return target
    };
    Array.copy.info = function () {
        let docs = "%c Array.copy: \n" +
            "%cCopie un tableau sans garder de référence à la source\n" +
            "%c  @param {Array} Le tableau source\n" +
            "\n" +
            "%c  return {Array} La copie du tableau source sans référence\n" +
            "\n" +
            "%cLorsqu'une variable n'a plus de référence, toute modification n'entraîne pas la modification dans l'objet source (voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/assign)";
        console.func_info(docs);
    }
}

pluck: {
    /**
     * @description Retourne un tableau des clefs dont le nom a été renseigné
     * @param {String} key La clef a retourner dans un tableau
     * @return {Array} Le tableau des clefs du tableau
     */
    Array.prototype.pluck = function (key) {
        let a = Array.copy(this);
        let r = [];
        if (Array.isArray(key)) {
            a.forEach(function (i) {
                let s = [];
                key.forEach(function (k) {
                    Object.hasKey(i, k) ? s.push(i[k]) : void 0;
                });
                if (s.length > 0) r.push(s)
            })
        }
        else {
            a.forEach(function (i) {
                Object.hasKey(i, key) ? r.push(i[key]) : void 0;
            });
        }
        return r
    };
    Array.prototype.pluck.info = function () {
        let docs = "%c Array.prototype.pluck: \n" +
            "%cGroupe les valeurs d'une clef d'un tableau d'objets en un seul tableau\n" +
            "%c  @param {string} La clef des objets à retourner\n" +
            "\n" +
            "%c  return {Array} Un tableau contenant les valeurs de la clef spécifiée\n" +
            "\n" +
            "%cSi la clef n'existe pas (par exemple le tableau n'a pas d'objets ou aucun n'objet  n'a la clef), un tableau vide sera retourné";
        console.func_info(docs);
    }
}

unique: {
    /**
     * @description Retourne un Array contenant les valeurs distinctes du tableau original
     * @return {Array}
     */
    Array.prototype.unique = function () {
        return [...new Set(this)]
    };
    Array.prototype.unique.info = function () {
        let docs = "%c Array.prototype.unique: \n" +
            "%cElimine les valeurs existant en double dans un tableau\n" +
            "%c\n" +
            "%c  return {Array} Le tableau sans doublon\n";
        console.func_info(docs);
    }
}

explode: {
    /*
     *  Correction DF:
     *  si il ne gère pas un nombre comme etant un array de un nombre => bug de lot sur les articles
     *  qui se retouve avec un nombre au lieu d'un array
     */
    Array.explode = function (source, delimiter = ',') {
        let arr = [];
        if (typeof source === 'string' || typeof source === 'number' || source instanceof String) {
            if (~source.indexOf(delimiter)) {
                arr = Array.fix(source.split(','))
            }
            else {
                arr.push(source)
            }
        }
        else {
            arr = source;
        }
        return arr
    };
    Array.explode.info = function () {
        let docs = "%c Array.explode: \n" +
            "%cExplose une variable selon une chaîne de caractères défini et renvoie le tableau des sections générées\n" +
            "%c  @param {string|number|Array} La source à exploser\n" +
            "  @param {string} La chaîne de caractères délimitante\n" +
            "\n" +
            "%c  return {Array} Le tableau des sections de la variable explosée\n" +
            "\n" +
            "%cSi un tableau est fourni en source, alors aucun traitement ne sera effectué";
        console.func_info(docs);
    }
}

move: {
    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            let index = new_index - this.length;
            while ((index--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this;
    };
    Array.prototype.move.info = function () {
        let docs = "%c Array.prototype.move: \n" +
            "%cDéplace une entrée d'un tableau d'un index vers un autre\n" +
            "%c  @param {number} L'index de l'élément à déplacer\n" +
            "  @param {number} L'index de destination de l'élément\n" +
            "\n" +
            "%c  return {Array} L'instance de l'array en cours d'utilisation\n";
        console.func_info(docs);
    }
}

chunk: {
    Object.defineProperty(Array.prototype, 'chunk', {
        value: function(chunkSize) {
            let arr = [];
            for (let i = 0; i < this.length; i += chunkSize)
                arr.push(this.slice(i, i + chunkSize));
            return arr;
        }
    });
}