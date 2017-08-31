let utils = function () {

    console.func_info = function (text) {
        let styles = [
            "font-weight:bold;color:#4550A6; background-color:#AADDFF;border:1px solid #4587A6;border-radius:5px;",
            "font-weight:bold;font-style:italic;text-decoration:none;color:#3399FF;",
            "font-weight:none;text-decoration:none;color:#FF9933;",
            "font-weight:none;text-decoration:none;color:#3399FF;",
            "font-weight:none;text-decoration:none;color:#339933;",

        ];
        console.info(text, ...styles);
    };
    console.deprecated = function (text) {
        let styles = [
            "font-weight:bold;background-color:#FFD0D0;color:#A1235B;border:1px solid #B05830;border-radius:5px;text-decoration:line-through;",
            "font-style:italic;color:#A1235B;background:#FFD0D0;display:block;"
        ];
        console.log(text, ...styles)
    };

    imports: { // Il est préférable de garder ce même ordre, sachant que certaines fonctions sont dépendantes des précédentes
        require('./core/string.js');

        require('./core/number.js');

        require('./core/object.js');

        require('./core/array.js');

        require('./core/window.js');

        require('./core/node.js');

        require('./core/formdata.js');

        require('./core/json2');

        require('./core/vue.js');
        require('./core/http2');

        require('./core/laravel.js');

        require('./core/deprecated.js');
    }

};

module.exports = utils();