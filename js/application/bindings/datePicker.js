define(
    ['knockout', 'jquery', 'jquery-ui'],
    function (ko) {
        ko.bindingHandlers.datePicker = {
            init: function (element, valueAccessor) {
                $(element).datepicker({
                    onSelect: function (dateText, inst) {
                        valueAccessor()(new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay));
                    },
                    dateFormat: "dd-mm-yy"
                });
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                $(element).datepicker("setDate", value());
            }
        };
    }
 );