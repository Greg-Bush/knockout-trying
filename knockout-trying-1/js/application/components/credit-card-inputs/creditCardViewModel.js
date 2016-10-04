define(
    ['knockout', '../../formValidation', '../../abstractFormViewModel'],
    function (ko, formValidation, abstractFormViewModel) {

        function ViewModel() { // :abstractFormViewModel
            var model = this;
            var validator = new formValidation.Validator();

            var toValidate = [
                new formValidation.ValidateModel(validator.isNumbers, ['cardNumber', 'cardMonth', 'cardYear', 'CSC'])
            ];

            abstractFormViewModel.call(this, toValidate); // вызов конструктора родителя

            model.isVisa = ko.computed(function () {
                return model.cardNumber.value()[0] == 4;
            });
            model.isMasterCard = ko.computed(function () {
                var num = model.cardNumber.value()[0];
                return num == 5 || num == 6;
            });
        }
        ViewModel.prototype = Object.create(abstractFormViewModel.prototype); // наследуем
        ViewModel.prototype.constructor = abstractFormViewModel;

        return ViewModel;
    }

 );