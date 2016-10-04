define(
    ['knockout', 'text!./template.html'],
    function (ko, template) {

        ko.components.register('repo-stargazers', {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    return params.array;
                }
            },
            template: template
        });
    }
 );