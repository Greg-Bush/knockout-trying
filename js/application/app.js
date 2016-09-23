define(
    ['jquery', 'knockout', './paymentFormViewModel'],
    function (jquery, ko, ViewModel) {
        return {
            start: function () {




                $(function () {
                    var model = new ViewModel();


                    $('#paymentForm').one('submit', function (e) {
                        e.preventDefault();
                        model.initValidationRedraw();
                        return false;
                    });

                    ko.applyBindings(model);

                });
            }

        };

    }
);