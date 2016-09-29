require.config({
    paths: {
        "jquery": "libs/jquery.min",
        "jquery.tmpl": "libs/jquery.tmpl.min",
        "knockout": "libs/knockout.min",
        "bootstrap": "libs/bootstrap.min",
        "jquery.ui": "https://code.jquery.com/ui/1.12.1/jquery-ui"
    }
});

//requirejs.onError = function (err) {
//    console.log(err.requireType);
//    console.log('modules: ' + err.requireModules);
//    throw err;
//};

require(["application/app2"], function (app) {
    app.start();
});