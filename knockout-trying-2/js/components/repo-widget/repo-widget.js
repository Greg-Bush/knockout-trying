define(
    ['knockout', 'text!./template.html', 'jquery'],
    function (ko, template) {

        ko.components.register('repo-widget', {
            viewModel: function (params) {
                this.repositoryInfo = params.repositoryInfo;
                this.stargazers = ko.observableArray([]);

                this.showStargazers = function (repo) {
                    if (!repo.repositoryInfo.stargazers_url)
                        return;
                    $.getJSON(repo.stargazers_url, this.stargazers);
                };
                this.isShowStargazersButtonActive = ko.computed(function () {
                    return this.repositoryInfo.stargazers_count > 0 && this.stargazers().length === 0;
                }, this);
            },
            template: template
        });
    }
 );