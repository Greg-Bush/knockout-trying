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

       
        var requiredFields = [];

        model.submit = function (formElement) {
        

          
        }

    }


    function AlertModel(head, message) {
        this.head = head;
        this.message = message;
    }

    function AlertsManager(templateId, defaultTargetId) {
        this._template = $('#' + templateId);
        this._defaultTargetId = defaultTargetId;
    }
    AlertsManager.prototype.showNewDanger = function (error, targetId) {
        targetId = targetId || this._defaultTargetId;
        this._template.tmpl(error).insertAfter('#' + targetId);
    }
    AlertsManager.prototype.removeAll = function () {
        $(".alert").alert("close");
    }

    function Validator(alertsManager) {
        this.alertsManager = alertsManager;
    }
    Validator.prototype._requiredMessage = 'The field i required';
    Validator.prototype._mustBeNumericMessage = 'The field must be numeric';
    Validator.prototype._emailNotValidMessage = 'Email is not valid';
    Validator.prototype._isEmpty = function (val) {
        return val.lenght === 0;
    }
    Validator.prototype._isNumbers = function (val) {
        return !isNaN(val);
    }
    Validator.prototype._isEmail = function (val) {
        return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(val);
    }
    Validator.prototype.checkRequired = function (requiredFields, model) {
        var result = true;
        for (var field in requiredFields) {
            if (this._isEmpty(model[field]())) {
                result = false;
                this.alertsManager.showNewDanger(new AlertModel('', this._requiredMessage), field);
            }
        }
        return result;
    }
    Validator.prototype.checkNumeric = function (numericFields, model) {
        var result = true;
        for (var field in numericFields) {
            if (!this._isNumbers(model[field]())) {
                result = false;
                this.alertsManager.showNewDanger(new AlertModel('', this._mustBeNumericMessage), field);
            }
        }
        return result;
    }
    Validator.prototype.checkEmails = function (emailFields, model) {
        var result = true;
        for (var field in emailFields) {
            if (!this._isEmail(model[field]())) {
                result = false;
                this.alertsManager.showNewDanger(new AlertModel('', this._emailNotValidMessage), field);
            }
        }
        return result;
    }



    $(function () {
        ko.applyBindings(new ViewModel());
    });

})();