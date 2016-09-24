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

        function inputStateModel(viewTemplateId, parentClass) {
            this.view = $(viewTemplateId).tmpl();
            this.parentClass = parentClass;
        }

        function inputStatesManager(inputStates) {
            this._parentClassesToRemove = $.map(inputStates, function (item) {
                return item.parentClass;
            }).join(' ');
        }
        inputStatesManager.prototype.mark = function (inputId, inputState) {
            var input = $(inputId);
            input.siblings().remove();
            input.after(inputState.view.clone());
            input.parent().removeClass(this._parentClassesToRemove).addClass(inputState.parentClass);
        }


        return {
            AlertsManager: AlertsManager,
            inputStatesManager: inputStatesManager,
            inputStateModel: inputStateModel
        }
    }
);