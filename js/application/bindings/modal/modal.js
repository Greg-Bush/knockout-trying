define(
    ['knockout', 'text!application/bindings/modal/modal.html', 'jquery', 'bootstrap'],
    function (ko, modalHtml) {
             

        ko.bindingHandlers.modal = {
            init: function (element, valueAccessor, allBindings) {
                var target = $(element),
                    existingNodes = target.children();

                target.append(modalHtml);
                
                existingNodes.appendTo(target.find('[data-modal-body]'));

                var bindingOptions = ko.unwrap(valueAccessor());
                var options = {
                    show: ko.unwrap(bindingOptions.show)
                };
                if ('backdrop' in bindingOptions) {
                    options.backdrop = ko.unwrap(bindingOptions.backdrop);
                }
                if ('keyboard' in bindingOptions) {
                    options.keyboard = ko.unwrap(bindingOptions.keyboard);
                }
                target.children().modal(options);
            },
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor());
                $(element).children().modal(ko.unwrap(value.show) ? 'show' : 'hide');
            }
        };
    }
 );