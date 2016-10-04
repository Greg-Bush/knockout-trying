define(
    ['jquery', 'knockout', "../components/repo-widget/repo-widget", "../components/user-widget/user-widget"],
    function (jquery, ko) {
        return {
            start: function () {

                function ViewModel() {
                    this.searchText = ko.observable('');
                    this.userInfo = ko.observable();
                    this.repos = ko.observableArray([]);

                    this.searchText.subscribe(function (text) {
                        debugger;
                        if (text === '')
                            return;

                        var url = "https://api.github.com/users/" + text;
                        $.getJSON(url, this.userInfo);
                    }.bind(this));

                    this.userInfo.subscribe(function (user) {
                        debugger;
                        if (!user.repos_url || !user.public_repos)
                            return;

                        $.getJSON(user.repos_url, this.repos);
                    }.bind(this));
                }



                $(function () {
                    ko.applyBindings(new ViewModel());
                });
            }
        };
    }
);