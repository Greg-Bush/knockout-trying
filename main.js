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

        var alertsManager = new bootstrapAlerts.AlertsManager("#alert-template", "#errors"),
            validator = new formValidation.Validator(alertsManager);

        model.submit = function (formElement) {
            alertsManager.removeAll();
            if (validator.checkRequired(requiredFields, model) & validator.checkNumeric(numericFileds, model) & validator.checkEmails(emailFields, model)) {
                var requestData = ko.toJSON(model);
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


        }

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

    function Validator(alertsManager) {
        this.alertsManager = alertsManager;
    }
    Validator.prototype._isNotEmpty = function (val) {
        return val.length !== 0;
    }
    Validator.prototype._isNumbers = function (val) {
        return !isNaN(val);
    }
    Validator.prototype._isEmail = function (val) {
        return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(val);
    }
    Validator.prototype._checkModes = {
        required: { message: 'The field is required', checkFunc: Validator.prototype._isNotEmpty },
        numeric: { message: 'The field must be numeric', checkFunc: Validator.prototype._isNumbers },
        email: { message: 'Email is not valid', checkFunc: Validator.prototype._isEmail }
    }
    Validator.prototype._check = function (fields, model, mode) {
        var result = true,
            _this = this;
        fields.forEach(function (item, i, arr) {
            if (!mode.checkFunc(model[item]())) {
                result = false;
                _this.alertsManager.showNewDanger(mode.message, '', '#' + item);
            }
        });
        return result;
    }
    Validator.prototype.checkRequired = function (requiredFields, model) {
        return this._check(requiredFields, model, this._checkModes.required);
    }
    Validator.prototype.checkNumeric = function (numericFields, model) {
        return this._check(numericFields, model, this._checkModes.numeric);
    }
    Validator.prototype.checkEmails = function (emailFields, model) {
        return this._check(emailFields, model, this._checkModes.email);
    }

    return {
        Validator: Validator
    }
})();