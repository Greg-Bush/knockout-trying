define(
    ['knockout', 'text!./star-icon.html', 'jquery'],
    function (ko, icon) {

        ko.bindingHandlers.star = {            
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor()),
                    elem = $(element);
                
                elem.html(value);
                if (value > 0)
                    elem.append(icon);
                if(value > 5)
                    elem.append(icon);
                if (value > 10)
                    elem.append(icon);
            }
        };
    }
 );