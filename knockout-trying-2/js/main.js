require.config({
    paths: {
        "jquery": "libs/jquery.min",       
        "knockout": "libs/knockout.min",
        "bootstrap": "libs/bootstrap.min"       
    }
});

require(["application/app"], function (app) {
    app.start();
});