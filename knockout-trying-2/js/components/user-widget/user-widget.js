define(
    ['knockout', 'text!./template.html'],
    function (ko, template) {

        ko.components.register('user-widget', {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    debugger;
                    var result = params.model;
                    return result;
                }
            },
            template: template
        });
    }
 );