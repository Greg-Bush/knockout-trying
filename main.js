var paymentForm = (function () {
      
    function ViewModel() {
        var model = this;

        var validator = new formValidation.Validator();            

        var requiredFields = ['region', 'city', 'cardNumber', 'cardMonth', 'cardYear', 'CSC', 'firstName', 'lastName', 'addressLine1', 'phone', 'email'],
            numericFields   = ['cardNumber', 'cardMonth', 'cardYear', 'CSC', 'phone'],
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




var bootstrapFeatures = (function () {
    function AlertModel(head, message) {
        this.head = head;
        this.message = message;
    }

    function AlertsManager(templateId, defaultTargetId) {
        this._template = $(templateId);
        this._defaultTargetId = defaultTargetId;
    }
    AlertsManager.prototype.showNewDanger = function (message, head, targetId) {
        targetId = targetId || this._defaultTargetId;
        head = head || '';
        this._template.tmpl(new AlertModel(head, message)).insertAfter(targetId);
    }
    AlertsManager.prototype.removeAll = function () {
        $(".alert").alert("close");
    }


    function inputStatesManager(validTemplateId, invalidTemplateId) {
        this.validView = $(validTemplateId).tmpl(),
        this.invalidView = $(invalidTemplateId).tmpl();
    }
    inputStatesManager.prototype.modes = {
        valid: { view: this.validView, parentClass: 'has-success' },
        invalid: { view: this.invalidView, parentClass: 'has-error' }
    }
    inputStatesManager.prototype._parentClassesToRemove =
        $.map(inputStatesManager.prototype.modes, function (item) {
            return item.parentClass;
        }).join(' ');
    inputStatesManager.prototype.mark = function (inputId, mode) {
        var input = $(inputId);
        input.insertAfter(mode.view);
        input.parent().removeClass(this._parentClassesToRemove).addClass(mode.parentClass);
    }


    return {
        AlertsManager: AlertsManager,
        inputStatesManager: inputStatesManager
    }
})();




var formValidation = (function () {

    function Validator() { }

    Validator.prototype._isNotEmpty = function (val) {
        return val.length !== 0;
    }
    Validator.prototype._isNumbers = function (val) {
        return !isNaN(val);
    }
    Validator.prototype._isEmail = function (val) {
        return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(val);
    }
    Validator.prototype.modes = {
        required: { check: Validator.prototype._isNotEmpty },
        numeric: { check: Validator.prototype._isNumbers },
        email: { check: Validator.prototype._isEmail }
    }

    Validator.prototype.getInvalidFields = function (fieldsToValidate, model, validationMode) {
        var result = [];
        fieldsToValidate.forEach(function (item, i, arr) {
            if (!validationMode.check(model[item]())) {
                result.push(item);
            }
        });
        return result;
    }

    return {
        Validator: Validator
    }
})();