define(
    ['jquery', 'knockout', './paymentFormViewModel'],
    function (jquery, ko, ViewModel) {
        return {
            start: function () {

                var model = new ViewModel();
                ko.components.register('credit-card-inputs', {
                    viewModel: { instance: model },
                    template: { element: 'credit-card-inputs' }
                });


                $(function () {
                    

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