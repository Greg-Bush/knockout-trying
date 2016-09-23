define(
    ['jquery', 'knockout', './bootstrapFeatures', './formValidation'],
    function (jquery, ko, bootstrapFeatures, formValidation) {

        function ViewModel() {
            var model = this;

            var validator = new formValidation.Validator();

            var toValidate = [
                new formValidation.ValidateModel(validator.isNotEmpty, ['region', 'city', 'firstName', 'lastName', 'addressLine1', 'email']),
                new formValidation.ValidateModel(validator.isNumbers, ['cardNumber', 'cardMonth', 'cardYear', 'CSC', 'phone']),
                new formValidation.ValidateModel(validator.isNotEmpty, ['email'])
            ];
            //var allValidatedFields = [];          
            //toValidate.forEach(function (item) {
            //    allValidatedFields = allValidatedFields.concat(item.fields);
            //});
            var allValidatedFields = ['region', 'city', 'cardNumber', 'cardMonth', 'cardYear', 'CSC', 'firstName', 'lastName', 'addressLine1', 'phone', 'email'];

            var _subjects = {
                "Tatarstan": ["Kazan", "Naberezhnye Chelny"],
                "Chuvashia": ["Cheboksary", "Kanash"]
            }

            model.cardNumber = ko.observable("");
            model.isVisa = ko.computed(function () {
                return model.cardNumber()[0] == 4;
            });
            model.isMasterCard = ko.computed(function () {
                var num = model.cardNumber()[0];
                return num == 5 || num == 6;
            });

            model.availableRegions = Object.keys(_subjects);
            model.region = ko.observable("");
            model.availableCities = ko.computed(function () {
                return _subjects[model.region()];
            });

            model.city = ko.observable("");
            model.cardMonth = ko.observable("");
            model.cardYear = ko.observable("");
            model.CSC = ko.observable("");
            model.firstName = ko.observable("");
            model.middleNames = ko.observable("");
            model.lastName = ko.observable("");
            model.addressLine1 = ko.observable("");
            model.addressLine2 = ko.observable("");
            model.phone = ko.observable("");
            model.email = ko.observable("");

            model.errors = ko.observableArray([]);

            model.inputStates = {
                invalid: new bootstrapFeatures.inputStateModel('#invalid-icon-template', 'has-error'),
                valid: new bootstrapFeatures.inputStateModel('#valid-icon-template', 'has-success')
            }
            model.fieldStates = {};
            model.fieldStates.invalid = ko.computed(function () {
                var result = validator.getInvalidFields(toValidate, model);
                return result;
            });
            model.fieldStates.valid = ko.computed(function () {             
                var _invalidFields = model.fieldStates.invalid();
                var result = allValidatedFields.filter(function (item) {
                    return !_invalidFields.includes(item);
                });
                return result;
            });


            model.isFormValid = ko.computed(function () {               
                return model.fieldStates.invalid().length === 0;
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
            var _this = this;
            var inputStatesManager = new bootstrapFeatures.inputStatesManager(this.inputStates);

            for (var state in this.fieldStates) {                
                _this.fieldStates[state].subscribe(function (newValue) {                    
                    newValue.forEach(function (field) {
                        inputStatesManager.mark('#' + field, _this.inputStates[state]);
                    });
                });
            }
        }





        return ViewModel;

    });