define(
    ['jquery', 'knockout'],
    function (jquery, ko) {

        function isEditable(elem) {
            return elem.is('input,textarea')
        }

        Date.prototype.toLongDateString = function () {
            return this.toLocaleString('ru', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        Date.prototype.toShortDateString = function () {
            return this.toLocaleString('ru', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        }
        Date.parseShortDate = function (row) {
            var values = row.split('.');
            if (values.length !== 3)
                throw new Error('invalid date format');
            return new Date(values[2], values[1], values[0]);
        }

        return {
            start: function () {
                ko.components.register('credit-card-inputs', {
                    viewModel: { require: 'application/components/credit-card-inputs/CreditCardViewModel' },
                    template: { require: 'text!application/components/credit-card-inputs/template.html' }
                });


                ko.bindingHandlers.customDate = {
                    init: function (element, valueAccessor) {
                        var elem = $(element);
                        if (isEditable(elem)) {
                            elem.on('change', function () {
                                var value = valueAccessor();
                                value(Date.parseShortDate($(this).val()));
                            });
                        }
                    },
                    update: function (element, valueAccessor) {
                        var value = valueAccessor();
                        var elem = $(element);
                        if (isEditable(elem)) {
                            elem.val(value().toShortDateString());
                        }
                        else {
                            elem.text(value().toLongDateString());
                        }
                    }
                };

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