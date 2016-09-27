define(
    ['jquery', 'knockout', './formValidation', './ValidatedInputModel', './StateViewModel'],
    function (jquery, ko, formValidation, ValidatedInputModel, StateModel) {


        function ViewModel(validateModelArray, components) {
            var model = this;

            validateModelArray = validateModelArray || [];
            model.components = components || [];

            model.allValidatedFields = this._getAllValidatedFields(validateModelArray);

            validateModelArray.forEach(function (item) {
                item.fields.forEach(function (field) {
                    model[field] = new ValidatedInputModel(item.check, model.defaultState);
                });
            });

            model.isFormValid = ko.computed(function () {
                for (i = 0; i < model.components.length; i++) {
                    if (!model.components[i].isFormValid())
                        return false;
                }
                for (i = 0; i < model.allValidatedFields.length; i++) {
                    if (!model[model.allValidatedFields[i]].isValid())
                        return false;
                }
                return true;
            });

        }

        ViewModel.prototype._getAllValidatedFields = function (validateModelArray) {
            var result = [];
            validateModelArray.forEach(function (item) {
                result = result.concat(item.fields);
            });
            return result;
        }
        ViewModel.prototype.defaultState = new StateModel('default-icon-template', '');
        ViewModel.prototype.invalidState = new StateModel('invalid-icon-template', 'has-error');
        ViewModel.prototype.validState = new StateModel('valid-icon-template', 'has-success');

        ViewModel.prototype.initValidationRedraw = function () {
            var model = this;
            model.components.forEach(function (item) {
                item.initValidationRedraw();
            });
            model.allValidatedFields.forEach(function (field) {
                var currentInputModel = model[field];
                currentInputModel.isValid.subscribe(buildFunction(currentInputModel));
                currentInputModel.isValid.notifySubscribers(currentInputModel.isValid());
            });

            function buildFunction(inputModel) {
                return function (newValue) {
                    if (newValue)
                        inputModel.viewState(model.validState);
                    else
                        inputModel.viewState(model.invalidState);
                }
            }
        }

        return ViewModel;

    });