define(    
    ['jquery', 'jquery.tmpl', 'bootstrap'],
    function () {
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
    }
);