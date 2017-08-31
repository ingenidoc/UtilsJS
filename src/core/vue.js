
const explication_format_url = "Lorsque le paramètre url contient des options, le paramètre doit être structuré de la sorte : <br>{<br>  url: /* url */,<br>  options: {/* options */}<br>}";
const format_reponse_incompatible = "L'url fournie a donné une réponse dans un format incompatible.";
const aucune_reponse = "L'url fournie n'a donné aucune réponse. Veuillez vérifier l'existence de celle-ci.";

navigator: {
    /**
     * @description Retourne le navigateur courant de l'utilisateur
     * @return {String} Le nom du navigateur
     */
    Vue.navigator = function () {
        let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        let isFirefox = typeof InstallTrigger !== 'undefined';
        let isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window['safari'] || safari.pushNotification);
        let isIE = /*@cc_on!@*/false || !!document.documentMode;
        let isEdge = !isIE && !!window.StyleMedia;
        let isChrome = !!window.chrome && !!window.chrome.webstore;
        let isSteam = (navigator.userAgent.search(/GameOverlay/i) != -1);

        if (isOpera)         return "Opera";
        else if (isFirefox)  return "Mozilla Firefox";
        else if (isSafari)   return "Safari";
        else if (isIE)       return "Internet Explorer";
        else if (isEdge)     return "Microsoft Edge";
        else if (isSteam)    return "Steam GameOverlay";
        else if (isChrome)   return "Google Chrome";
        else                return "un navigateur inconnu"
    }
}

disable: {
    /**
     * @description Désactive le render d'une instance Vue (composant ou racine)
     * @param instance L'instance à désactiver
     */
    Vue.disable = function (instance) {
        if (instance instanceof Vue && Object.hasKey(instance, '_watcher')) {
            instance._watcher.active = false;
            return true;
        }
        return false;
    };
    Vue.disable.info = function () {
        let docs = "%c Vue.disable: \n" +
            "%cDésactive le 'Render watcher' de Vue.js sur une instance donnée afin d'empêcher le rendu d'une instance Vue.js\n" +
            "%c  @param {Vue} L'instance dont le 'Render watcher' sera désactivé\n" +
            "\n" +
            "%c  return {boolean} `true` si le 'Render watcher' a bien été désactivé, `false` sinon";
        console.func_info(docs);
    }
}

enable: {
    /**
     * @description Active le render d'une instance Vue (composant ou racine)
     * @param instance L'instance à activer
     */
    Vue.enable = function (instance) {
        if (instance instanceof Vue && Object.hasKey(instance, '_watcher')) {
            instance._watcher.active = true;
            return true;
        }
        return false;
    };
    Vue.enable.info = function () {
        let docs = "%c Vue.enable: \n" +
            "%cActive le 'Render watcher' de Vue.js sur une instance donnée afin de pouvoir effectuer le rendu de cette instance\n" +
            "%c  @param {Vue} L'instance dont le 'Render watcher' sera activé\n" +
            "\n" +
            "%c  return {boolean} `true` si le 'Render watcher' a bien été activé, `false` sinon";
        console.func_info(docs);
    }
}

warn: {
    Vue.prototype.warn = function (msg) {
        Vue.util.warn(msg, this)
    };
    Vue.prototype.warn.info =  function () {
        let docs = "%c Vue.prototype.warn: \n" +
            "%cAppelle la méthode d'alerte de Vue.js avec un message spécifié\n" +
            "%c  @param {string} Le message d'alerte\n";
        console.func_info(docs);
    }
}

getJson: {
    /**
     * @description Envoie une requête HTTP GET vers une url, et fournit le retour si celui-ci est un JSON
     * @param {String|Object} url L'url à requêter
     * @param {Function} sucCallback Le callback à exécuter en cas de réponse valide
     * @param {Function} errCallback Le callback à exécuter en cas de réponse invalide ou d'erreur
     * @return {Vue}
     */
    Vue.prototype.getJson = function (url, sucCallback, errCallback) {
        let options = {};
        if (url instanceof Object) {
            if (Object.hasKey(url, 'url') && Object.hasKey(url, 'options')) {
                options = url.options;
                url = url.url
            }
            else {
                let error = {
                    name: 'getJson',
                    message: explication_format_url,
                    code: 412,
                    toString: function () {
                        return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                    }
                };
                errCallback.apply(this, [error])
            }
        }
        this.$http.get(url, options)
            .then((function (response) { // le code est 200
                if (Object.hasKey(response.data, 'statut') && response.data.statut == 'ok') { /* réponse de type Retour */
                    if (response.data.contenu instanceof Object && typeof response.data.contenu == 'object') {
                        sucCallback.apply(this, [response.data.contenu])
                    }
                    else {
                        // Si ce n'est pas un objet, on n'a pas récupéré un Json
                        if (Object.hasKey(response.data, 'code') && response.data.code == 422) {
                            let error = {
                                name: 'getJson',
                                message: response.data.contenu ? response.data.contenu : response.data.message,
                                code: 422,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                            errCallback.apply(this, [error])
                        }
                        else {
                            let error = {
                                name: 'getJson',
                                message: format_reponse_incompatible,
                                code: 204,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            };
                            errCallback.apply(this, [error])
                        }
                    }

                } else { /* la réponse n'est pas de type Retour */
                    let error = {
                        name: 'getJson',
                        message: format_reponse_incompatible,
                        code: 204,
                        toString: function () {
                            return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                        }
                    };
                    errCallback.apply(this, [error])
                }
            })
                .bind(this))
            .catch((function (error) { // le code n'est pas 200
                console.info(error)
                if ((error.response && error.response.statusText === "Unauthorized") || (error.response.data.indexOf && ~error.response.data.indexOf("TokenMismatchException</abbr>"))) return;
                error = error.response || error
                let erreur;
                if (error && Object.hasKey(error, 'data') && !!error.data) {
                    let msg = (Object.hasKey(error.data, 'message')) ?
                        error.data.message.replace(/(?:\r\n|\r|\n)/g, '<br />') :
                        typeof error.data == 'object' ?
                            error.data.values.join('\n') :
                            aucune_reponse;
                    let code = Object.hasKey(error.data, 'code') ? error.data.code : 422;
                    erreur = {
                        name: 'getJson',
                        message: msg,
                        code: code,
                        toString: function () {
                            return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                        }
                    };
                }
                else {
                    if (error instanceof Error) {
                        // Si l'erreur contient "network", alors le client a perdu la connexion
                        if (~error.toString().toLowerCase().indexOf("network")) {
                            erreur = {
                                name: 'post',
                                message: 'Veuillez vérifier votre connexion Internet.',
                                code: 499,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                        }
                        // Sinon, il y a une erreur dans le script
                        else {
                            erreur = {
                                name: 'post',
                                message: 'Interface Chaise/Clavier : ' + error.toString(),
                                code: 18,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                        }
                    }
                }
                errCallback.apply(this, [erreur])
            })
                .bind(this));
        return this
    };
    Vue.prototype.getJson.info = function () {
        let docs = "%c Vue.prototype.getJson: \n" +
            "%cEnvoie une requête HTTP GET vers une url donnée, et exécute les fonctions de callback appropriées selon le retour\n" +
            "%c  @param {string|Object} L'url ou les options de la requête (voir https://github.com/mzabriskie/axios#request-config)\n" +
            "  @param {Function} La fonction callback en cas de succès avec le contenu de la réponse en paramètre\n" +
            "  @param {Function} La fonction callback en cas d'erreur (requête ou callback de réussite) avec l'erreur en paramètre\n" +
            "\n" +
            "%c  return {Vue} L'instance Vue.js actuelle\n" +
            "\n" +
            "%cRemarques :\n" +
            "  - Le premier paramètre doit soit :\n" +
            "    \u02EA Contenir l'url en chaîne de caractères\n" +
            "    \u02EA Posséder la forme suivante si c'est un objet : {url: 'www.example.com', options: { /* Options ici */ }}\n" +
            "  - L'url visée doit envoyer un retour sous format JSON avec la structure suivante : {statut: '', code: /* code */, contenu: /* contenu envoyé au callback */ }\n" +
            "  - L'erreur envoyée à la fonction callback d'erreur possède une méthode membre `toString` permettant d'afficher ce qui suit : '`nomErreur`: `messageErreur` (code `codeErreur`)\n" +
            "  - L'erreur nommée 'Interface Chaise/Clavier' de code 18 correspond à une erreur dans une fonction callback, donc une erreur humaine, 18 étant la distance moyenne en pouces\n" +
            "    séparant un utilisateur de son écran";
        console.func_info(docs);
    }
}

getHtml: {
    /**
     * @description Envoie une requête HTTP GET vers une url, et fournit le retour si celui-ci est une chaîne HTML
     * @param {String|Object} url L'url à requêter
     * @param {Function} sucCallback Le callback à exécuter en cas de réponse valide
     * @param {Function} errCallback Le callback à exécuter en cas de réponse invalide ou d'erreur
     * @return {Vue}
     */
    Vue.prototype.getHtml = function (url, sucCallback, errCallback) {
        let options = {};
        if (url instanceof Object) {
            if (Object.hasKey(url, 'url') && Object.hasKey(url, 'options')) {
                options = url.options;
                url = url.url
            }
            else {
                let error = {
                    name: 'getHtml',
                    message: explication_format_url,
                    code: 412,
                    toString: function () {
                        return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                    }
                };
                errCallback.apply(this, [error])
            }
        }
        this.$http.get(url, options)
            .then((function (response) { // le code de réponse est 200
                console.log(response)
                if (response.request && response.status == 200) {
                    sucCallback.apply(this, [response.request.response])
                }
                else {
                    if (Object.hasKey(response.data, 'code') && response.data.code == 422) {
                        let error = {
                            name: 'getHtml',
                            message: response.data.contenu ? response.data.contenu : response.data.message,
                            code: 422,
                            toString: function () {
                                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                            }
                        }
                        errCallback.apply(this, [error])
                    }
                    else {
                        let error = {
                            name: 'getHtml',
                            message: format_reponse_incompatible,
                            code: 204,
                            toString: function () {
                                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                            }
                        };
                        errCallback.apply(this, [error])
                    }
                }
            })
                .bind(this))
            .catch((function (error) { // le code de réponse n'est pas 200
                if ((error.response && error.response.statusText === "Unauthorized") || (error.response.data.indexOf && ~error.response.data.indexOf("TokenMismatchException</abbr>"))) return;
                error = error.response || error
                let erreur;
                if (error && Object.hasKey(error, 'data') && !!error.data) {
                    let msg = (Object.hasKey(error.data, 'message')) ?
                        error.data.message.replace(/(?:\r\n|\r|\n)/g, '<br />') :
                        typeof error.data == 'object' ?
                            error.data.values.join('\n') :
                            aucune_reponse;
                    let code = Object.hasKey(error.data, 'code') ? error.data.code : 422;
                    erreur = {
                        name: 'getJson',
                        message: msg,
                        code: code,
                        toString: function () {
                            return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                        }
                    };
                }
                else {
                    if (error instanceof Error) {
                        // Si l'erreur contient "network", alors le client a perdu la connexion
                        if (~error.toString().toLowerCase().indexOf("network")) {
                            erreur = {
                                name: 'post',
                                message: 'Veuillez vérifier votre connexion Internet.',
                                code: 499,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                        }
                        // Sinon, il y a une erreur dans le script
                        else {
                            erreur = {
                                name: 'post',
                                message: 'Interface Chaise/Clavier : ' + error.toString(),
                                code: 18,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                        }
                    }
                }
                errCallback.apply(this, [erreur])
            })
                .bind(this));
        return this
    };
    Vue.prototype.getHtml.info = function () {
        let docs = "%c Vue.prototype.getHtml: \n" +
            "%cEnvoie une requête HTTP GET vers une url donnée, et exécute les fonctions de callback appropriées selon le retour\n" +
            "%c  @param {string|Object} L'url ou les options de la requête (voir https://github.com/mzabriskie/axios#request-config)\n" +
            "  @param {Function} La fonction callback en cas de succès avec le contenu de la réponse en paramètre\n" +
            "  @param {Function} La fonction callback en cas d'erreur (requête ou callback de réussite) avec l'erreur en paramètre\n" +
            "\n" +
            "%c  return {Vue} L'instance Vue.js actuelle\n" +
            "\n" +
            "%cRemarques :\n" +
            "  - Le premier paramètre doit soit :\n" +
            "    \u02EA Contenir l'url en chaîne de caractères\n" +
            "    \u02EA Posséder la forme suivante si c'est un objet : {url: 'www.example.com', options: { /* Options ici */ }}\n" +
            "  - L'erreur envoyée à la fonction callback d'erreur possède une méthode membre `toString` permettant d'afficher ce qui suit : '`nomErreur`: `messageErreur` (code `codeErreur`)\n" +
            "  - L'erreur nommée 'Interface Chaise/Clavier' de code 18 correspond à une erreur dans une fonction callback, donc une erreur humaine, 18 étant la distance moyenne en pouces\n" +
            "    séparant un utilisateur de son écran";
        console.func_info(docs);
    }
}

post: {
    /**
     * @description Envoie une requête HTTP POST vers une utl et fournit le retour si l'envoi de données est réussi
     * @param {String} url L'url à requêter
     * @param {FormData} data Les données à envoyer
     * @param {Function} sucCallback Le callback à exécuter en cas de réponse valide
     * @param {Function} errCallback Le callback à exécuter en cas de réponse invalide ou d'erreur
     * @return {Vue}
     */
    Vue.prototype.post = function (url, data, sucCallback, errCallback) {
        let options = {};
        if (url instanceof Object) {
            if (Object.hasKey(url, 'url') && Object.hasKey(url, 'options')) {
                options = url.options;
                url = url.url
            }
            else {
                let error = {
                    name: 'post',
                    message: explication_format_url,
                    code: 412,
                    toString: function () {
                        return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                    }
                };
                errCallback.apply(this, [error])
            }
        }
        if (data instanceof FormData) {
            this.$http.post(url, data, options)
                .then((function (response) { //le code de réponse est 200
                    if (Object.hasKey(response.data, 'statut') && response.data.statut == 'ok') {
                        sucCallback.apply(this, [response.data.contenu])
                    }
                    else {
                        if (Object.hasKey(response.data, 'code') && response.data.code == 422) {
                            let error = {
                                name: 'post',
                                message: response.data.contenu ? response.data.contenu : response.data.message,
                                code: 422,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                            errCallback.apply(this, [error])
                        }
                        else {
                            let error = {
                                name: 'post',
                                message: format_reponse_incompatible,
                                code: 204,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            };
                            errCallback.apply(this, [error])
                        }
                    }
                })
                    .bind(this))
                .catch((function (error) { //le code de réponse n'est pas 200
                    if ((error.response && error.response.statusText === "Unauthorized") || (error.response && error.response.data.indexOf && ~error.response.data.indexOf("TokenMismatchException</abbr>"))) return;
                    error = error.response || error
                    let erreur;
                    if (error && Object.hasKey(error, 'data') && !!error.data) {
                        let msg = (Object.hasKey(error.data, 'message')) ?
                            error.data.message.replace(/(?:\r\n|\r|\n)/g, '<br />') :
                            typeof error.data == 'object' ?
                                Object.values(error.data).join('\n') :
                                aucune_reponse;
                        let code = Object.hasKey(error.data, 'code') ? error.data.code : 422;
                        erreur = {
                            name: 'getJson',
                            message: msg,
                            code: code,
                            toString: function () {
                                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                            }
                        };
                    }
                    else {
                        if (error instanceof Error) {
                            // Si l'erreur contient "network", alors le client a perdu la connexion
                            if (~error.toString().toLowerCase().indexOf("network")) {
                                erreur = {
                                    name: 'post',
                                    message: 'Veuillez vérifier votre connexion Internet.',
                                    code: 499,
                                    toString: function () {
                                        return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                    }
                                }
                            }
                            // Sinon, il y a une erreur dans le script
                            else {
                                erreur = {
                                    name: 'post',
                                    message: 'Interface Chaise/Clavier : ' + error.toString(),
                                    code: 18,
                                    toString: function () {
                                        return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                    }
                                }
                            }
                        }
                    }
                    errCallback.apply(this, [erreur])
                })
                    .bind(this))
        }
        else {
            let error = {
                name: 'post',
                message: "Les données fournies ne sont pas dans un format valide. La requête HTTP n'a donc pas été effectuée.",
                code: 412,
                toString: function () {
                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                }
            };
            errCallback.apply(this, [error])
        }
        return this
    };
    Vue.prototype.post.info = function () {
        let docs = "%c Vue.prototype.post: \n" +
            "%cEnvoie une requête HTTP POST vers une url donnée, et exécute les fonctions de callback appropriées selon le retour\n" +
            "%c  @param {string|Object} L'url ou les options de la requête (voir https://github.com/mzabriskie/axios#request-config)\n" +
            "  @param {FormData} Les données à envoyer sous une instance de FormData\n" +
            "  @param {Function} La fonction callback en cas de succès avec le contenu de la réponse en paramètre\n" +
            "  @param {Function} La fonction callback en cas d'erreur (requête ou callback de réussite) avec l'erreur en paramètre\n" +
            "\n" +
            "%c  return {Vue} L'instance Vue.js actuelle\n" +
            "\n" +
            "%cRemarques :\n" +
            "  - Le premier paramètre doit soit :\n" +
            "    \u02EA Contenir l'url en chaîne de caractères\n" +
            "    \u02EA Posséder la forme suivante si c'est un objet : {url: 'www.example.com', options: { /* Options ici */ }}\n" +
            "  - L'url visée doit envoyer un retour sous format JSON avec la structure suivante : {statut: '', code: /* code */, contenu: /* contenu envoyé au callback */ }\n" +
            "  - L'erreur envoyée à la fonction callback d'erreur possède une méthode membre `toString` permettant d'afficher ce qui suit : '`nomErreur`: `messageErreur` (code `codeErreur`)\n" +
            "  - L'erreur nommée 'Interface Chaise/Clavier' de code 18 correspond à une erreur dans une fonction callback, donc une erreur humaine, 18 étant la distance moyenne en pouces\n" +
            "    séparant un utilisateur de son écran";
        console.func_info(docs);
    }
}

getRaw: {
    /**
     * @description Envoie une requête HTTP GET vers une url et fournit le retour sans vérification du type de données
     * @param {String} url L'url à requêter
     * @param {Function} sucCallback Le callback à exécuter en cas de réponse valide
     * @param {Function} errCallback Le callback à exécuter en cas de réponse invalide ou d'erreur
     * @return {Vue}
     */
    Vue.prototype.getRaw = function (url, sucCallback, errCallback) {
        let options = {};
        if (url instanceof Object) {
            if (Object.hasKey(url, 'url') && Object.hasKey(url, 'options')) {
                options = url.options;
                url = url.url
            }
            else {
                let error = {
                    name: 'getRaw',
                    message: explication_format_url,
                    code: 412,
                    toString: function () {
                        return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                    }
                };
                errCallback.apply(this, [error])
            }
        }
        this.$http.get(url, options)
            .then((function (response) { // le code est 200
                if (Object.hasKey(response.data, 'statut') && response.data.statut == 'ok') {
                    sucCallback.apply(this, [response.data.contenu])
                }
                else { //redirection sur errCallback si on obtient un objet qui n'est pas de type Retour
                    if (Object.hasKey(response.data, 'code') && response.data.code == 422) {
                        let error = {
                            name: 'getRaw',
                            message: response.data.contenu ? response.data.contenu : response.data.message,
                            code: 422,
                            toString: function () {
                                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                            }
                        };
                        errCallback.apply(this, [error])
                    }
                    else {
                        let error = {
                            name: 'getRaw',
                            message: format_reponse_incompatible,
                            code: 204,
                            toString: function () {
                                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                            }
                        };
                        errCallback.apply(this, [error])
                    }
                }
            })
                .bind(this))
            .catch((function (error) { // le code n'est pas 200
                if ((error.response && error.response.statusText === "Unauthorized") || (error.response.data.indexOf && ~error.response.data.indexOf("TokenMismatchException</abbr>"))) return;
                error = error.response || error
                let erreur;
                if (error && Object.hasKey(error, 'data') && !!error.data) {
                    let msg = (Object.hasKey(error.data, 'message')) ?
                        error.data.message.replace(/(?:\r\n|\r|\n)/g, '<br />') :
                        typeof error.data == 'object' ?
                            error.data.values.join('\n') :
                            aucune_reponse;
                    let code = Object.hasKey(error.data, 'code') ? error.data.code : 422;
                    erreur = {
                        name: 'getJson',
                        message: msg,
                        code: code,
                        toString: function () {
                            return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                        }
                    };
                }
                else {
                    if (error instanceof Error) {
                        // Si l'erreur contient "network", alors le client a perdu la connexion
                        if (~error.toString().toLowerCase().indexOf("network")) {
                            erreur = {
                                name: 'post',
                                message: 'Veuillez vérifier votre connexion Internet.',
                                code: 499,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                        }
                        // Sinon, il y a une erreur dans le script
                        else {
                            erreur = {
                                name: 'post',
                                message: 'Interface Chaise/Clavier : ' + error.toString(),
                                code: 18,
                                toString: function () {
                                    return this.name + ': ' + this.message + ' (code ' + this.code + ')'
                                }
                            }
                        }
                    }
                }
                errCallback.apply(this, [erreur])
            })
                .bind(this));
        return this
    };
    Vue.prototype.getRaw.info = function () {
        let docs = "%c Vue.prototype.post: \n" +
            "%cEnvoie une requête HTTP GET vers une url donnée, et exécute les fonctions de callback appropriées selon le retour\n" +
            "%c  @param {string|Object} L'url ou les options de la requête (voir https://github.com/mzabriskie/axios#request-config)\n" +
            "  @param {Function} La fonction callback en cas de succès avec le contenu de la réponse en paramètre\n" +
            "  @param {Function} La fonction callback en cas d'erreur (requête ou callback de réussite) avec l'erreur en paramètre\n" +
            "\n" +
            "%c  return {Vue} L'instance Vue.js actuelle\n" +
            "\n" +
            "%cRemarques :\n" +
            "  - Le premier paramètre doit soit :\n" +
            "    \u02EA Contenir l'url en chaîne de caractères\n" +
            "    \u02EA Posséder la forme suivante si c'est un objet : {url: 'www.example.com', options: { /* Options ici */ }}\n" +
            "  - L'url visée doit envoyer un retour sous format JSON avec la structure suivante : {statut: '', code: /* code */, contenu: /* contenu envoyé au callback */ }\n" +
            "  - L'erreur envoyée à la fonction callback d'erreur possède une méthode membre `toString` permettant d'afficher ce qui suit : '`nomErreur`: `messageErreur` (code `codeErreur`)\n" +
            "  - L'erreur nommée 'Interface Chaise/Clavier' de code 18 correspond à une erreur dans une fonction callback, donc une erreur humaine, 18 étant la distance moyenne en pouces\n" +
            "    séparant un utilisateur de son écran\n" +
            "  - Cette méthode ne vérifie pas qu'elle a bien reçu un format spécifique tant qu'elle rencontre bien la structure JSON (donc le champ 'contenu' peut être n'importe-quoi)";
        console.func_info(docs);
    }
}

tobytes: {
    /**
     * @desc Convertit une valeur en Ko, Mo, Go ou To en octets
     * @param {Number} val La valeur à convertir
     * @param {String} unit L'unité de conversion
     * @return {number} Le nombre d'octets de la valeur founrnie selon l'unité
     */
    Vue.tobytes = function (val, unit) {
        switch (unit.toLowerCase()) {
            case 'ko':
                return val * 1024
            case 'mo':
                return Vue.tobytes(val * 1024, 'ko')
            case 'go':
                return Vue.tobytes(val * 1024, 'mo')
            case 'to':
                return Vue.tobytes(val * 1024, 'go')
        }
    };
    Vue.tobytes.info = function () {
        let docs = "%c Vue.tobytes: \n" +
            "%cConvertit une valeur en Ko, Mo, Go ou To en octets\n" +
            "%c  @param {number} La valeur à convertir en octets\n" +
            "  @param {string} L'unité de la valeur source\n" +
            "\n" +
            "%c  return {number} Le nombre d'octets équivalent à la valeur source\n" +
            "\n" +
            "%cL'unité peut être en minuscule, majuscule ou mixte, la méthode fait abstraction de la casse";
        console.func_info(docs);
    }
}

frombytes: {
    /**
     * @description Convertit une valeur en octets vers l'unité la plus juste
     * @param {Number} bytes La valeur en octets à convertir
     * @return {String} La valeur concaténée à l'unitée après conversion
     */
    Vue.frombytes = function (bytes) {
        let sizes = ['Octect', 'Ko', 'Mo', 'Go', 'To'];
        if (bytes == 0) return '0 Octets';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };
    Vue.frombytes.info = function () {
        let docs = "%c Vue.frombytes: \n" +
            "%cConvertit une valeur en octets vers l'unité la plus juste\n" +
            "%c  @param {number} La valeur en octets à convertir\n" +
            "\n" +
            "%c  return {string} La valeur concaténée à l'unité après conversion"
        console.func_info(docs);
    }
}