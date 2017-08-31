

let parse = JSON.parse;
parse: {
    JSON.parse = function (json) {
        let obj;
        try {
            obj = parse(json);
        }
        catch (e) {
            return [];
        }
        return obj;
    }
}