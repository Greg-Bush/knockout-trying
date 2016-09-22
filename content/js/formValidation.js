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