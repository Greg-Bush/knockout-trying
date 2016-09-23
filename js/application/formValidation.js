define(
    function () {

        function ValidateModel(checkFunc, fields) {
            this.check = checkFunc;
            this.fields = fields;
        }


        function Validator() { }

        Validator.prototype.isNotEmpty = function (val) {
            return val.length !== 0;
        }
        Validator.prototype.isNumbers = function (val) {
            return Validator.prototype.isNotEmpty(val) && !isNaN(val);
        }
        Validator.prototype.isEmail = function (val) {
            return Validator.prototype.isNotEmpty(val) && /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(val);
        }

        Validator.prototype.getInvalidFields = function (validateModelArray, modelWithObservableFields) {
            var result = [];
            validateModelArray.forEach(function (model) {
                model.fields.forEach(function (field) {
                    if (!model.check(modelWithObservableFields[field]())) {
                        result.push(field);
                    }
                });
            });
            return result;
        }

        return {
            Validator: Validator,
            ValidateModel: ValidateModel
        }
    }
);