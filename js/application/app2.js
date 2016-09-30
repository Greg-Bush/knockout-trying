define(
    ['jquery', 'knockout', './bindings/customDate', './bindings/datePicker'],
    function (jquery, ko) {

        return {
            start: function () {
                ko.components.register('credit-card-inputs', {
                    viewModel: { require: 'application/components/credit-card-inputs/CreditCardViewModel' },
                    template: { require: 'text!application/components/credit-card-inputs/template.html' }
                });


                var viewModel = {
                    date: ko.observable(new Date())
                }


                $(function () {
                    ko.applyBindings(viewModel);
                });
            }
        };
    }
);