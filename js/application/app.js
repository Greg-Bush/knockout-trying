define(
    ['jquery', 'knockout', './paymentFormViewModel'],
    function (jquery, ko, ViewModel) {
        return {
            start: function () {

                var model = new ViewModel();
                ko.components.register('credit-card-inputs', {
                    viewModel: { instance: model },
                    template: { require: 'text!application/components/credit-card-inputs/template.html' }
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