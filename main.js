var paymentForm = (function () {

    function ViewModel() {
        var model = this;

        model.cardNumber = ko.observable("");
        model.isVisa = ko.computed(function () {
            return model.cardNumber()[0] == 4;
        });
        model.isMasterCard = ko.computed(function () {
            var num = model.cardNumber()[0];
            return num == 5 || num == 6;
        });

        var subjects = {
            "Tatarstan": ["Kazan", "Naberezhnye Chelny"],
            "Chuvashia": ["Cheboksary", "Kanash"]
        }
        model.availableRegions = Object.keys(subjects);
        model.region = ko.observable("");
        model.availableCities = ko.computed(function () {
            return subjects[model.region()];
        });
        model.city = ko.observable("");


    }



    $(function () {
        ko.applyBindings(new ViewModel());
    });

})();