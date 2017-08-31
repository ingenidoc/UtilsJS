
url: {
    if(!window.Laravel) window.Laravel = {};

    window.Laravel.url = function (route) {
        if (route.charAt(0) === '/') {
            return window.location.origin + route
        }
        else {
            return window.location.origin + '/' + route
        }
    };
    window.Laravel.url.info = function () {
        let docs = "%c Laravel.url: \n" +
            "%cRetourne l'url constituée à la manière d'une route Laravel selon le chemin spécifié\n" +
            "%c  @param {string} Le chemin de la route\n" +
            "\n" +
            "%c  return {string} L'url de la route Laravel\n" +
            "\n" +
            "%cLe '/' avant le chemin est optionnel, il sera ajouté automatiquement s'il ne figure pas dans le chemin";
        console.func_info(docs);
    }
}