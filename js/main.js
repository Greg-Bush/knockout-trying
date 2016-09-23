require.config({
    paths: {
        "jquery": "./libs/jquery.min",
        "jquery.tmpl": "./libs/jquery.tmpl.min",
        "knockout": "./libs/knockout.min",
        "bootstrap": "./libs/bootstrap.min"
    }
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    console.log('modules: ' + err.requireModules);
    throw err;
};

require(["application/app"], function (app) {
    app.start();
});