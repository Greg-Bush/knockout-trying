define(
    ['jquery', 'knockout', './bindings/customDate', './bindings/datePicker','./bindings/modal/modal'],
    function (jquery, ko) {

        return {
            start: function () {
                ko.components.register('credit-card-inputs', {
                    viewModel: { require: 'application/components/credit-card-inputs/CreditCardViewModel' },
                    template: { require: 'text!application/components/credit-card-inputs/template.html' }
                });


                var viewModel = {
                    date: ko.observable(new Date()),
                    showModal: ko.observable(true)
                }

                window.model = viewModel;

                $(function () {
                    ko.applyBindings(viewModel);
                });
            }
        };
    }
);