define(
    ['jquery', 'knockout', './paymentFormViewModel', './components/credit-card-inputs/creditCardViewModel'],
    function (jquery, ko, ViewModel, creditCardViewModel) {
        return {
            start: function () {

                var model = new ViewModel();
                var creditCardModel = new creditCardViewModel();
                ko.components.register('credit-card-inputs', {
                    viewModel: { instance: creditCardModel },
                    template: { require: 'text!application/components/credit-card-inputs/template.html' }
                });
                model.components = [creditCardModel];

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