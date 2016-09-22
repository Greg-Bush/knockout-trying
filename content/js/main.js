var paymentForm = (function () {
      
    function ViewModel() {
        var model = this;

        var validator = new formValidation.Validator();            

        var requiredFields = ['region', 'city', 'cardNumber', 'cardMonth', 'cardYear', 'CSC', 'firstName', 'lastName', 'addressLine1', 'phone', 'email'],
            numericFields = ['cardNumber', 'cardMonth', 'cardYear', 'CSC', 'phone'],
            emailFields = ['email'],
            allValidatedFields = requiredFields.concat(numericFields.concat(emailFields));

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


        model.invalidFields = ko.computed(function () {
            var invalidFields = [];
            invalidFields = invalidFields.concat(validator.getInvalidFields(requiredFields, model, validator.modes.required));
            invalidFields = invalidFields.concat(validator.getInvalidFields(numericFields, model, validator.modes.numeric));
            invalidFields = invalidFields.concat(validator.getInvalidFields(emailFields, model, validator.modes.email));
            return invalidFields;
        });
        model.validFields = ko.computed(function () {
            var _invalidFields = model.invalidFields();
            return allValidatedFields.filter(function (item) {
                return !_invalidFields.includes(item);
            });
        });

        model.submit = function (formElement) {
            //model.errors.removeAll();
            if (model.invalidFields().length === 0) {
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
        var inputStatesManager = new bootstrapFeatures.inputStatesManager('#valid-icon-template', '#invalid-icon-template');

        this.validFields.subscribe(function (newValue) {
            newValue.forEach(function (fields) {
                inputStatesManager.mark('#' + fields, inputStatesManager.modes.valid);
            });
        });
        this.invalidFields.subscribe(function (newValue) {
            newValue.forEach(function (fields) {
                inputStatesManager.mark('#' + fields, inputStatesManager.modes.invalid);
            });
        });     
    }

    

    $(function () {
        var model= new ViewModel();
        

        $('#paymentForm').one('submit', function () {
            model.initValidationRedraw();
        });      
        
        ko.applyBindings(model);

    });

})();