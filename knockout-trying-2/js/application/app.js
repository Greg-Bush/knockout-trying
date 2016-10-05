define(
    ['jquery', 'knockout', "../components/repo-widget/repo-widget", "../components/user-widget/user-widget", "../bindings/star/star"],
    function (jquery, ko) {
        return {
            start: function () {

                function ViewModel() {
                    this.searchText = ko.observable('');
                    this.userUrl = ko.observable('');

                    this.searchText.subscribe(function (newText) {
                        if (newText === '')
                            return;

                        this.userUrl("https://api.github.com/users/" + newText);
                    }, this);
                }



                $(function () {
                    ko.applyBindings(new ViewModel());
                });
            }
        };
    }
);