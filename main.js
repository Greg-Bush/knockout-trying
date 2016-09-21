var paymentForm = (function () {
      
    function ViewModel() {
        var model = this;

        model.cardNumber = ko.observable("");
        model.isVisa = ko.computed(function () {
            return model.cardNumber()[0] == 4;
        });
        model.isMasterCard = ko.computed(function () {
            var num = model.cardNumber()[0];
            return num == 5 || num == 6;
        });

        var _subjects = {
            "Tatarstan": ["Kazan", "Naberezhnye Chelny"],
            "Chuvashia": ["Cheboksary", "Kanash"]
        }
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



        var requiredFields = ['region', 'city', 'cardNumber', 'cardMonth', 'cardYear', 'CSC', 'firstName', 'lastName', 'addressLine1', 'phone', 'email'],
            numericFileds = ['cardNumber', 'cardMonth', 'cardYear', 'CSC', 'phone'],
            emailFields = ['email'];

        model.invalidFields = ko.observableArray([]);

        var alertsManager = new bootstrapAlerts.AlertsManager("#alert-template", "#errors"),
            validator = new formValidation.Validator(alertsManager);

        model.submit = function (formElement) {
            var _invalidFields = [];
            _invalidFields = _invalidFields.concat(validator.getInvalidFields(requiredFields, model, validator.modes.required));
            _invalidFields = _invalidFields.concat(validator.getInvalidFields(numericFileds, model, validator.modes.numeric));
            _invalidFields = _invalidFields.concat(validator.getInvalidFields(emailFields, model, validator.modes.email));
            model.invalidFields(_invalidFields);
            if (_invalidFields.length === 0) {             
                sendRequest(model.toRequestParameters());
            }
        }
    }
    ViewModel.prototype.toRequestParameters = function () {
        return ko.toJSON(this);
    }


    function sendRequest(data) {
        $.post({
            url: window.location.href,
            data: requestData,
            success: function () {
                alert('success');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertsManager.showNewDanger(jqXHR.statusText, jqXHR.status);
            }
        });
    }


    $(function () {
        ko.applyBindings(new ViewModel());
    });

})();




var bootstrapAlerts = (function () {
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

    return {
        AlertsManager: AlertsManager
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

// input стили
//шаблон publisher subscriber
// amd requirejs
// messages обобщение