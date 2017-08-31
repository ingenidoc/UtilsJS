

path: {
    /**
     * @description Simulation de la propriété d'événement 'path' de Vue.js => Retourne le chemin complet d'un élément HTML
     * @return {Array} La liste des éléments parents
     */
    Node.prototype.path = function () {
        let path = [];
        let elem = this;
        while (elem.parentNode != document.body) {
            path.push(elem.parentNode);
            elem = elem.parentNode
        }
        return path;
    };
    Node.prototype.path.info = function () {
        let docs = "%c Node.prototype.path: \n" +
            "%cRetourne le chemin complet d'une Node HTML jusqu'au tag 'body'\n" +
            "%c\n" +
            "%c  return {Array} La taleau ordonné (0 => premier parent, Xmax => dernier parent) des parents de la Node HTML\n" +
            "\n" +
            "%cAttention : si le premier parent de la Node HTML est le tag 'body', le chemin retourné sera un tableau vide";
        console.func_info(docs);
    }
}

setAttributes: {
    /**
     * @description Permet de définir une liste d'attributs (cas exceptionnel: 'html': 'foobar' => ne définit pas d'attribut, mais remplit l'html)
     * @param attrs
     */
    Node.prototype.setAttributes = function (attrs) {
        Object.forEach(attrs, function (item, key) {
            if (key === 'html') this.innerHTML = item;
            else if (key.startsWith('event.')) this.addEventListener(key.replace('event.',''), item);
            else if (key.startsWith('css.')) this.style[key.replace('css.','')] = item;
            else this.setAttribute(key, item);
        }, this)
    };
    Node.prototype.setAttributes.info = function () {
        let docs = "%c Node.prototype.setAttributes: \n" +
            "%cAjoute une liste d'attributs HTML à une Node à partir d'un tableau associatif donné\n" +
            "%c  @param {Object} Le tableau associatif des attributs (clef => valeur) à ajouter à la Node HTML\n" +
            "%c\n" +
            "%cAttention : il existe un cas particulier qui est le suivant :\n" +
            "  si une clef se nomme 'html', aucun attribut ne sera ajouté, mais le contenu HTML de la Node HTML prendra la valeur de la clef";
        console.func_info(docs);
    }
}

node_new: {
    /**
     * @description Permet de créer une DOM Node en spécifiant le nom du Tag HTML, la liste des attributs, et un array d'enfants
     * @param nodename
     * @param attrs
     * @param childs
     * @return {Element}
     */
    Node.new = function (nodename, attrs, childs) {
        let node = document.createElement(nodename);
        node.setAttributes(attrs);
        if (childs) {
            childs.forEach(function (child) {
                node.appendChild(child)
            })
        }
        return node;
    };
    Node.new.info = function () {
        let docs = "%c Node.new: \n" +
            "%cCréé une Node HTML à partir du nom, des attributs et de ses enfants\n" +
            "%c  @param {string} Le nom du tag HTML à créer\n" +
            "  @param {Obejct} Le tableau associatif des attributs (clef => valeurs) de la Node HTML\n" +
            "  @param {Array<Node>} Le tableau ordonné des enfants de cette Node HTML\n" +
            "\n" +
            "%c  return {Node} La Node HTML créée prête à être insérée dans le DOM\n" +
            "\n" +
            "%cAttention : il existe un cas particulier qui est le suivant :\n" +
            "  si une clef se nomme 'html', aucun attribut ne sera ajouté, mais le contenu HTML de la Node HTML prendra la valeur de la clef\n" +
            "De plus, on peut imaginer vouloir directement créer les enfants en même temps, résultant en un code similaire au suivant :\n" +
            "  var myNode = Node.new(\n" +
            "    'div',\n" +
            "    { display: 'block' },\n" +
            "    [\n" +
            "      Node.new('p', {html: 'Un texte en paragraphe'}, [])\n" +
            "    ]\n" +
            "  );";
        console.func_info(docs);
    }
}

Object.defineProperties(Node.prototype, {
    'topY': {
        configurable: false,
        enumerable: true,
        get: function () {
            let el = this;
            let y = 0;
            for (y; el != null; y += el.offsetTop, el = el.offsetParent);
            return y
        },
    },
    'leftX': {
        configurable: false,
        enumerable: true,
        get: function () {
            let el = this;
            let x = 0;
            for (x; el != null; x += el.offsetLeft, el = el.offsetParent);
            return x
        }
    }
});