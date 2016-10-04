define(
    ['knockout'],
    function (ko) {
        return function ValidatedInputModel(isValidFunc, viewState) {
            var model = this;
            model.value = ko.observable('');
            model.isValid = ko.computed(function () {
                return isValidFunc(model.value());
            });
            model.viewState = ko.observable(viewState);
        }
    });