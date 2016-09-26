define(
    ['jquery', 'knockout', './formValidation', './ValidatedInputModel'],
    function (jquery, ko, formValidation, ValidatedInputModel) {

        var defaultState = new StateModel('default-icon-template', ''),
            invalidState = new StateModel('invalid-icon-template', 'has-error'),
            validState = new StateModel('valid-icon-template', 'has-success');


        function StateModel(template, parentClass) {
            this.template = template;
            this.parentClass = parentClass;
        }

        function ViewModel() {
            var model = this;

            var validator = new formValidation.Validator();

            var toValidate = [
                new formValidation.ValidateModel(validator.isNotEmpty, ['firstName', 'lastName', 'addressLine1']),
                new formValidation.ValidateModel(validator.isNumbers, ['cardNumber', 'cardMonth', 'cardYear', 'CSC', 'phone']),
                new formValidation.ValidateModel(validator.isEmail, ['email'])
            ];
            model._allValidatedFields = ['cardNumber', 'cardMonth', 'cardYear', 'CSC', 'firstName', 'lastName', 'addressLine1', 'phone', 'email'];
            var optionalFields = ['region', 'city', 'middleNames', 'addressLine2'];

            toValidate.forEach(function (item) {
                item.fields.forEach(function (field) {
                    model[field] = new ValidatedInputModel(item.check, defaultState);
                });
            });
            optionalFields.forEach(function (field) {
                model[field] = ko.observable('');
            });

            model.isVisa = ko.computed(function () {
                return model.cardNumber.value()[0] == 4;
            });
            model.isMasterCard = ko.computed(function () {
                var num = model.cardNumber.value()[0];
                return num == 5 || num == 6;
            });

            var _subjects = {
                "Tatarstan": ["Kazan", "Naberezhnye Chelny"],
                "Chuvashia": ["Cheboksary", "Kanash"]
            }

            model.availableRegions = Object.keys(_subjects);
            model.availableCities = ko.computed(function () {
                return _subjects[model.region()];
            });

            model.errors = ko.observableArray([]);

            model.isFormValid = ko.computed(function () {
                for (i = 0; i < model._allValidatedFields.length; i++) {
                    if (!model[model._allValidatedFields[i]].isValid())
                        return false;
                }
                return true;
            });

            model.submit = function (formElement) {
                //model.errors.removeAll();
                if (model.isFormValid()) {
                    model.sendRequest(model.toRequestParameters());
                }
            }

        }
        ViewModel.prototype.toRequestParameters = function () {
            return ko.toJSON(this);
        }
        ViewModel.prototype.sendRequest = function (data) {
            var _this = this;
            $.post({
                url: window.location.href,
                data: data,
                success: function () {
                    alert('success');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    _this.errors.push(jqXHR);
                }
            });
        }
        ViewModel.prototype.initValidationRedraw = function () {
            var model = this;
            model._allValidatedFields.forEach(function (field) {
                var currentInputModel = model[field];
                currentInputModel.isValid.subscribe(buildFunction(currentInputModel));
                currentInputModel.isValid.notifySubscribers(currentInputModel.isValid());
            });


            function buildFunction(inputModel) {
                return function (newValue) {
                    if (newValue)
                        inputModel.viewState(validState);
                    else
                        inputModel.viewState(invalidState);
                }
            }
        }





        return ViewModel;

    });