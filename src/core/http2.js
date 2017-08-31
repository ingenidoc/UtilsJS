

getJson2: {

    Vue.prototype.getJson2 = function (
        options, /* Contient l'url, le format, etc... */
        onsuccess,
        onerror
    ) {
        let url,
            optionsObj;

        if(options instanceof Object) {
            if ( !Object.hasKey(options, 'url') ){
                let err = this.getJson2.errors.valueMissing;
                err.data = 'url';
                return void onerror.apply(this, [err]);
            }

            url = options.url;
            if ( Object.hasKey(options, 'options') ) optionsObj = options.options
        }
        else {
            url = options;
            optionsObj = {};
        }

        this.$http.get(url, optionsObj)
            .then((function (response) {

                let expectedFormat = this.getJson2.config.expectedFormat || null;

                if(expectedFormat) {
                    let getDeepKeys = function (obj) {
                        let keys = [];
                        for(let key in obj) {
                            keys.push(key);
                            if(typeof obj[key] === "object") {
                                let subkeys = getDeepKeys(obj[key]);
                                keys = keys.concat(subkeys.map(function(subkey) {
                                    return key + "." + subkey;
                                }));
                            }
                        }
                        return keys;
                    };

                    if( JSON.stringify(getDeepKeys(expectedFormat)) !== JSON.stringify(getDeepKeys(response.data)) ){
                        let err = this.getJson2.errors.unexpectedFormat;
                        err.data = response.data;
                        return void onerror.apply(this, [err]);
                    }

                    onsuccess.apply(this, [response.data])
                }

            }).bind(this)
            ).catch((function (error) {
                if (error instanceof Error) {
                    let err = this.getJson2.errors.interfaceChaiseClavier;
                    err.data = error;
                    return void onerror.apply(this, [err]);
                }

                let err = this.getJson2.errors.notOk;
                err.data = error.response;
                return void onerror.apply(this, [err])
            }).bind(this)
        );

        return this;
    };

    Vue.prototype.getJson2.errors = {
        valueMissing: {
            name: 'Paramètre manquant',
            message: "Les paramètres requis n'ont pas étés fournis",
            data: null,
            code: 412,
            toString: function () {
                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
            }
        },
        unexpectedFormat: {
            name: 'Format invalide',
            message: "La réponse a renvoyé des données dans un format incorrect",
            data: null,
            code: 204,
            toString: function () {
                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
            }
        },
        interfaceChaiseClavier: {
            name: 'Interface Chaise/Clavier',
            message: "",
            data: null,
            code: 18,
            toString: function () {
                return this.name + ' (code ' + this.code + ')'
            }
        },
        notOk: {
            name: 'Réponse invalide',
            message: "Le code retourné par la requête est différent de OK(200)",
            data: null,
            code: 0,
            toString: function () {
                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
            }
        }
    };
    Vue.prototype.getJson2.config = {
        expectedFormat: null
    };


    Vue.prototype.post2 = function (
        options, /* Contient l'url, le format, etc... */
        data,
        onsuccess,
        onerror
    ) {
        let url,
            optionsObj;

        if(options instanceof Object) {
            if ( !Object.hasKey(options, 'url') ){
                let err = this.post2.errors.valueMissing;
                err.data = 'url';
                return void onerror.apply(this, [err]);
            }

            url = options.url;
            if ( Object.hasKey(options, 'options') ) optionsObj = options.options
        }
        else {
            url = options;
            optionsObj = {};
        }

        this.$http.post(url, data, optionsObj)
            .then((function (response) {

                    let expectedFormat = this.post2.config.expectedFormat || null;

                    if(expectedFormat) {
                        let getDeepKeys = function (obj) {
                            let keys = [];
                            for(let key in obj) {
                                keys.push(key);
                                if(typeof obj[key] === "object") {
                                    let subkeys = getDeepKeys(obj[key]);
                                    keys = keys.concat(subkeys.map(function(subkey) {
                                        return key + "." + subkey;
                                    }));
                                }
                            }
                            return keys;
                        };

                        if( JSON.stringify(getDeepKeys(expectedFormat)) !== JSON.stringify(getDeepKeys(response.data)) ){
                            let err = this.post2.errors.unexpectedFormat;
                            err.data = response.data;
                            return void onerror.apply(this, [err]);
                        }

                        onsuccess.apply(this, [response.data])
                    }

                }).bind(this)
            ).catch((function (error) {
                if (error instanceof Error) {
                    let err = this.post2.errors.interfaceChaiseClavier;
                    err.data = error;
                    return void onerror.apply(this, [err]);
                }

                let err = this.post2.errors.notOk;
                err.data = error.response;
                return void onerror.apply(this, [err])
            }).bind(this)
        );

        return this;
    };

    Vue.prototype.post2.errors = {
        valueMissing: {
            name: 'Paramètre manquant',
            message: "Les paramètres requis n'ont pas étés fournis",
            data: null,
            code: 412,
            toString: function () {
                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
            }
        },
        unexpectedFormat: {
            name: 'Format invalide',
            message: "La réponse a renvoyé des données dans un format incorrect",
            data: null,
            code: 204,
            toString: function () {
                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
            }
        },
        interfaceChaiseClavier: {
            name: 'Interface Chaise/Clavier',
            message: "",
            data: null,
            code: 18,
            toString: function () {
                return this.name + ' (code ' + this.code + ')'
            }
        },
        notOk: {
            name: 'Réponse invalide',
            message: "Le code retourné par la requête est différent de OK(200)",
            data: null,
            code: 0,
            toString: function () {
                return this.name + ': ' + this.message + ' (code ' + this.code + ')'
            }
        }
    };
    Vue.prototype.post2.config = {
        expectedFormat: null
    }

}