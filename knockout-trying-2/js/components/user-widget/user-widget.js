define(
    ['knockout', 'text!./template.html', 'jquery'],
    function (ko, template) {

        ko.components.register('user-widget', {
            viewModel: function (params) {

                this.name = ko.observable('');
                this.publicRepositoriesCount = ko.observable();
                this.followersCount = ko.observable();

                this.repositories = ko.observableArray([]);

                params.userUrl.subscribe(function (newUrl) {
                    $.getJSON(newUrl, function (data) {
                        this.repositories([]);
                        this.name(data.login);
                        this.publicRepositoriesCount(data.public_repos);
                        this.followersCount(data.followers);

                        if (data.public_repos > 0 && data.repos_url) {
                            $.getJSON(data.repos_url, function (data) {
                                this.repositories(data);
                            }.bind(this));
                        }
                    }.bind(this));
                }, this);

                var model = {
                    user: result
                };
                return model;
            },
            template: template
        });
    }
 );