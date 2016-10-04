define(
    ['knockout', 'text!./template.html'],
    function (ko, template) {

        ko.components.register('repo-stargazers', {
            viewModel: function (params) {
                return params.array;
            },
            template: template
        });
    }
 );