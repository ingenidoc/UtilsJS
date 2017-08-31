
devtoolOpened: {
    /**
     * @description Détermine si le debugger du navigateur est ouvert ou non
     * @return {boolean} True si outils développeur ouvert, false sinon
     */
    window.devtoolOpened = function () {
        let threshold = 160;
        let widthThreshold = window.outerWidth - window.innerWidth > threshold;
        let heightThreshold = window.outerHeight - window.innerHeight > threshold;
        return (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold))
    };
    window.devtoolOpened.info = function () {
        let docs = "%c devtoolOpened: \n" +
            "%cDétermine si les outils de développement du navigateur sont ouverts\n" +
            "%c\n" +
            "%c  return {boolean} `true` si ceux-ci sont ouverts, `false` sinon";
        console.func_info(docs);
    }
}

onClickOutside: {
    /**
     * @description Simule l'évènement de clic en dehors d'un élément
     * @param {HTMLElement} target Elément cible
     * @param {Function} callback La fonction de retour à exécuter si évènement déclenché
     */
    window.onClickOutside = function (target, callback) {
        window.addEventListener('click', function (e) {
            if(!e.path) e.path = e.target.path(); // Corrige sur Safari (la propriété MouseEvent.prototype.path n'exite pas)
            if (!~e.path.indexOf(target)) callback(e)
        });
    };
    window.onClickOutside.info = function () {
        let docs = "%c onClickOutside: \n" +
            "%cEnregistre un événement de clic sur un élément HTML se déclenchant lorsque l'on clique en dehors de celui-ci\n" +
            "%c  @param {Node} L'élément sur lequel l'événement sera enregistré\n" +
            "  @param {Function} La fonction callback exécutée lorsque l'événement est déclenché avec en paramètre les données de l'événement";
        console.func_info(docs);
    }
}

round: {
    /**
     * @description Arrondi un nombre décimal selon une précision donnée
     * @param {Number} val Le nombre à arrondir
     * @param {Number} precision Le nombre de chiffres décimaux à garder
     * @return {number} Un nombre arrondi
     */
    window.round = function (val, precision) {
        let multiplier = '1';
        for (let i = 0; i < precision; i++) {
            multiplier += '0'
        }
        multiplier = Number(multiplier);
        return Math.round(val * multiplier) / multiplier
    };
    window.round.info = function () {
        let docs = "%c round: \n" +
            "%cArrondi un nombre à un nombre de décimale données\n" +
            "%c  @param {number} Le nombre à arrondir\n" +
            "  @param {number} Le nombre de décimales après la virgule (0 accepté)\n" +
            "\n" +
            "%c  return {number} Le nombre source après arrondi";
        console.func_info(docs);
    }
}

webStorage: {
    /**
     * @description Helper du built-in localStorage permettant de mettre des valeurs en cache sans durée d'expiration
     */
    window.webStorage = {
        /**
         * @description Définit une paire clef/valeur dans le localStorage
         * @param {String} key Le nom de clef à stocker
         * @param {*} item La valeur à stocker
         */
        set: function (key, item) {
            if (typeof item === 'object') {
                localStorage.setItem(key, JSON.stringify(item))
            }
            else {
                localStorage.setItem(key, item)
            }
        },
        /**
         * @description Retourne le contenu d'une clef du localStorage
         * @param {String} key Le nom de la clef dont on souhaite récupérer le contenu
         * @return {*} Le contenu de la clef
         */
        get: function (key) {
            let item;
            try {
                item = JSON.parse(localStorage.getItem(key));
                return item
            }
            catch (e) {
                return localStorage.getItem(key)
            }
        },
        /**
         * @description Détermine si le localStorage comporte la clef donnée
         * @param {String} key La clef dont on vérifie l'existence
         * @return {boolean} True si existant, false sinon
         */
        has: function (key) {
            return (localStorage.getItem(key) !== null)
        },
        /**
         * @description Retire une paire clef/valeur du localStorage
         * @param {String} key La clef à retirer
         */
        remove: function (key) {
            localStorage.removeItem(key)
        },
        /**
         * @description Vide le localStorage de toutes les paires clef/valeur
         */
        clear: function () {
            localStorage.clear()
        }
    };
    window.webStorage.info = function () {
        let docs = "%c webStorage: \n" +
            "%cRegroupe des fonctions utilitaires pour gérer le localStorage (cookies sans expiration)\n" +
            "%c  @method set: stocke une paire clef/valeur\n" +
            "    @param {string} La clef de la paire clef/valeur à stocker\n" +
            "    @param {*} La valeur à stocker (Array et Objets acceptés)\n" +
            "  @method get: retourne la valeur stockée d'une clef\n" +
            "    @param {string} La clef de la valeur à récupérer\n" +
            "    return {*} La valeur stockée sous la clef donnée\n" +
            "  @method has: vérifie l'existance d'une clef donnée\n" +
            "    @param {string} La clef dont on vérifie l'existence\n" +
            "    return {boolean} `true` si la clef existe, `false` sinon\n" +
            "  @method remove: retire une paire clef/valeur selon une clef donnée\n" +
            "    @param {string} La clef à retirer\n" +
            "  @method clear: vide toutes les clefs du localStorage\n";
        console.func_info(docs);
    }
}

session: {
    /**
     * @description Helper du built-in sessionStorage permettant de mettre des valeurs en cache
     */
    window.session = {
        /**
         * @description Définit une paire clef/valeur dans le sessionStorage
         * @param {String} key Le nom de clef à stocker
         * @param {*} item La valeur à stocker
         */
        set: function (key, item) {
            if (typeof item == 'object') {
                sessionStorage.setItem(key, JSON.stringify(item))
            }
            else {
                sessionStorage.setItem(key, item)
            }
        },
        /**
         * @description Retourne le contenu d'une clef du sessionStorage
         * @param {String} key Le nom de la clef dont on souhaite récupérer le contenu
         * @return {*} Le contenu de la clef
         */
        get: function (key) {
            let item;
            try {
                item = JSON.parse(sessionStorage.getItem(key))
                return item
            }
            catch (e) {
                return sessionStorage.getItem(key)
            }
        },
        /**
         * @description Détermine si le sessionStorage comporte la clef donnée
         * @param {String} key La clef dont on vérifie l'existence
         * @return {boolean} True si existant, false sinon
         */
        has: function (key) {
            return (sessionStorage.getItem(key) !== null)
        },
        /**
         * @description Retire une paire clef/valeur du sessionStorage
         * @param {String} key La clef à retirer
         */
        remove: function (key) {
            sessionStorage.removeItem(key)
        },
        /**
         * @description Vide le sessionStorage de toutes les paires clef/valeur
         */
        clear: function () {
            sessionStorage.clear()
        }
    };
    window.session.info = function () {
        let docs = "%c session: \n" +
            "%cRegroupe des fonctions utilitaires pour gérer le sessionStorage (cookies durable jusqu'à fermeture du navigateur)\n" +
            "%c  @method set: stocke une paire clef/valeur\n" +
            "    @param {string} La clef de la paire clef/valeur à stocker\n" +
            "    @param {*} La valeur à stocker (Array et Objets acceptés)\n" +
            "  @method get: retourne la valeur stockée d'une clef\n" +
            "    @param {string} La clef de la valeur à récupérer\n" +
            "    return {*} La valeur stockée sous la clef donnée\n" +
            "  @method has: vérifie l'existance d'une clef donnée\n" +
            "    @param {string} La clef dont on vérifie l'existence\n" +
            "    return {boolean} `true` si la clef existe, `false` sinon\n" +
            "  @method remove: retire une paire clef/valeur selon une clef donnée\n" +
            "    @param {string} La clef à retirer\n" +
            "  @method clear: vide toutes les clefs du sessionStorage\n";
        console.func_info(docs);
    }
}

popup: {
    /**
     * @description Affiche une page web dans une popup
     * @param {string} url L'url de la page web
     * @param width La largeur de la popup
     * @param height La hauteur de la popup
     */
    window.popup = function (url, width = 1366, height = 768) {
        window.open(url, 'winname', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=' + width + ',height=' + height);
    };
    window.popup.info = function () {
        let docs = "%c popup: \n" +
            "%cOuvre une page web dans une nouvelle fenêtre en pop-up\n" +
            "%c  @param {string} L'url de la page web\n" +
            "  @param {number|string} La largeur de la fenêtre ouverte\n" +
            "  @param {number|string} La hauteur de la fenêtre ouverte\n" +
            "%c\n" +
            "%cLa plupart des navigateurs bloquent les pop-up si celles-ci sont ouvertes sans action de l'utilisateur (clic sur un bouton, lien, etc...)\n" +
            "  cependant, le clic sur le bouton 'Oui' de la méthode `confirm` ne compte pas comme l'action de l'utilisateur";
        console.func_info(docs);
    }
}

showFullscreen: {
    /**
     * @description Affiche une page web en plein écran
     * @param {string} url L'url de la page web
     */
    window.showFullscreen = function (url) {
        if (Vue.navigator() === "Mozilla Firefox") {
            popup(url);
        }
        else {
            // On créé un cadre intéractif qui accepte le plein écran
            let iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.allowFullscreen = true;
            let id = new Date().valueOf();
            iframe.id = id;
            // On l'ajoute au DOM en récupérant l'élément
            document.body.appendChild(iframe);
            iframe = document.getElementById(id);

            let isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;


            // On lui demande de se mettre en plein écran
            iframe.webkitRequestFullScreen();
            // Puis quand la fenêtre est chargée, on détecte si on enlève le plein écran
            iframe.contentWindow.onload = function () {
                // Et si oui, on retire le cadre intéractif du DOM
                // Avec 500ms de décalage à la déclaration pour supporter le fait que safari change de fenêtre
                setTimeout(function () {
                    iframe.onwebkitfullscreenchange = function () {
                        iframe.remove()
                    }
                }, 500)
            }
        }
    };
    window.showFullscreen.info = function () {
        let docs = "%c showFullscreen: \n" +
            "%cAffiche une page web en plein écran\n" +
            "%c  @param {string} L'url de la page web\n" +
            "%c\n" +
            "%cCertains site peuvent bloquer les CORS (Cross-Origin Resource Sharing), il est donc préférable que l'url soit sur votre propre site.\n" +
            "La page web se fermera dès que l'utilisateur désactivera le plein écran";
        console.func_info(docs);
    }
}

toClipboard: {
    window.toClipboard = function (val) {
        // Si la valeur n'est pas nulle,
        if (val) {
            // On créé une boite de texte invisible
            let text = document.createElement('textarea');
            text.classList.add('non-visible');
            // Que l'on indexe avec le texte
            text.id = val;
            // On l'ajoute à la fin du corps HTML
            document.body.appendChild(text);
            // On va ensuite chercher le tag "physique"
            let textarea = document.getElementById(val);
            // Que l'on valorise avec le même texte, que l'on sélectionne ensuite
            textarea.value = val;
            textarea.select();
            // Et on demande au navigateur de faire un CTRL+C sur la sélection, puis on détache la boite de texte du DOM
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    };
    window.toClipboard.info = function () {
        let docs = "%c toClipboard: \n" +
            "%cPlace la valeur dans le presse-papier de l'utilisateur\n" +
            "%c  @param {*} La valeur à stocker dans le presse-papier\n" +
            "%c\n" +
            "%cCertains navigateur peuvent demander l'accès au presse-papier si la copie n'est pas exécutée par une action de l'utilisateur";
        console.func_info(docs);
    }
}

monnaie: {
    window.monnaie = function (valeur, defaut = '-') {
        if (isNaN(Number(valeur)) || !isFinite(Number(valeur)) || Number(valeur) <= 0) return defaut;
        return valeur.toFixed(2) + ' €';
    };
    window.monnaie.info = function () {
        let docs = "%c monnaie: \n" +
            "%cRetourne une valeur sous le format d'une monnaie en euros\n" +
            "%c  @param {number|string} La valeur à convertir en format monétaire\n" +
            "%c  @param {*} La valeur à retourner si la valeur source est nulle ou inferieure à 0, ou invalide";
        console.func_info(docs);
    }
}

addEventListeners: {
    window.addEventListeners = (events) => {
        events.forEach(function (event) {
            event.target.addEventListener(event.name, event.handler.bind(this))
        })
    };
    window.addEventListeners.info = function () {
        let docs = "%c addEventListeners: \n" +
            "%cLie une liste d'événements selon un nom d'événement, un élément cible et un gestionnaire d'événement\n" +
            "%c  @param {Array} La liste d'événements à lier\n" +
            "%c\n" +
            "%cChaque événement doit être une instance d'Object avec le format suivant :\n" +
            "  {\n" +
            "    name: string, // le nom de l'événement ('click', 'drop', ...)\n" +
            "    target: *, // La cible de l'événement (peut être Node, HTMLElement, ...)\n" +
            "    handler: Function // Le gestionnaire d'événement (le contexte appelant est conservé)\n" +
            "  }";
        console.func_info(docs);
    }
}

loadResource: {
    window.loadResource = function (linkResource, tag) {
        let resource = Node.new(
            tag,
            {
                'css.position': 'absolute',
                'css.top': '0',
                'css.left': '0',
                'css.width': '0',
                'css.height': '0',
                'src': ~['img','script'].indexOf(tag) ? linkResource : '',
                'href': tag === 'link' ? linkResource: '',
                'rel': tag === 'link' ? 'stylesheet': ''
            }
        );
        resource.onload = function () {
            document.body.removeChild(resource);
        };
        document.body.appendChild(resource)
    }
}