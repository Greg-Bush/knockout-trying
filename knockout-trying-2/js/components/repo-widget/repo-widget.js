define(
    ['knockout', 'text!./template.html', '../repo-stargazers/repo-stargazers'],
    function (ko, template) {

        ko.components.register('repo-widget', {
            viewModel: {
                createViewModel: function (params, componentInfo) {                    
                    var model = ko.unwrap(params.model);
                    model.stargazers = ko.observableArray([]);
                    model.showStargazers = function (repo) {
                        debugger;
                        if (!repo.stargazers_url)
                            return;
                        $.getJSON(repo.stargazers_url, this.stargazers);
                    };
                    model.isShowStargazersButtonActive = ko.computed(function () {
                        debugger;
                        return this.stargazers_count > 0 && this.stargazers().length === 0;
                    }, model);
                }
            },
            template: template
        });
    }
 );