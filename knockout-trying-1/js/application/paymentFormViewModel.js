define(
    ['jquery', 'knockout', './formValidation', './abstractFormViewModel'],
    function (jquery, ko, formValidation, abstractFormViewModel) {

        function ViewModel() { // :abstractFormViewModel
            var model = this;

            var validator = new formValidation.Validator();

            var toValidate = [
                new formValidation.ValidateModel(validator.isNotEmpty, ['firstName', 'lastName', 'addressLine1']),
                new formValidation.ValidateModel(validator.isNumbers, ['phone']),
                new formValidation.ValidateModel(validator.isEmail, ['email'])
            ];

            abstractFormViewModel.call(this, toValidate); // вызов конструктора родителя

            var optionalFields = ['region', 'city', 'middleNames', 'addressLine2'];

            optionalFields.forEach(function (field) {
                model[field] = ko.observable('');
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

            model.submit = function (formElement) {
                //model.errors.removeAll();
                if (model.isFormValid()) {
                    model.sendRequest(model.toRequestParameters());
                }
            }

        }

        ViewModel.prototype = Object.create(abstractFormViewModel.prototype); // наследуем
        ViewModel.prototype.constructor = ViewModel;

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



        return ViewModel;

    });