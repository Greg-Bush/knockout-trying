define(
    ['knockout', '../../formValidation', '../../ValidatedInputModel', '../../StateViewModel'],
    function (ko, formValidation, ValidatedInputModel, StateModel) {
        var defaultState = new StateModel('default-icon-template', '');

        function ViewModel() {
            var model = this;
            var validator = new formValidation.Validator();
            model.cardNumber = new ValidatedInputModel(validator.isNumbers, defaultState);
            model.cardMonth = new ValidatedInputModel(validator.isNumbers, defaultState);
            model.cardYear = new ValidatedInputModel(validator.isNumbers, defaultState);
            model.CSC = new ValidatedInputModel(validator.isNumbers, defaultState);
            model.isVisa = ko.computed(function () {
                return model.cardNumber.value()[0] == 4;
            });
            model.isMasterCard = ko.computed(function () {
                var num = model.cardNumber.value()[0];
                return num == 5 || num == 6;
            });
        }

        return ViewModel;
    }

 );