define(
    ['knockout', 'text!./template.html'],
    function (ko, template) {

        ko.components.register('user-widget', {
            viewModel: function (params) {
                debugger;
                var result = params.model;
                return result;
            },
            template: template
        });
    }
 );