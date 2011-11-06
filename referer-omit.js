(function(){
    var defaultAction = '_hostname';
    var rules = [];

    var getAction = function(url) {
        for (var i in rules) {
            if (url.match(rules[i].rule)) {
                return rules[i].action;
            }
        }

        return defaultAction;
    };

    var filter = function(req){
        var hdrs = req.requestHeaders;
        var url = req.url;

        switch (getAction(url)) {
        case '_hostname':
            for (var i = 0; i < hdrs.length; i++) {
                if ('Referer' == hdrs[i].name) {
                    hdrs.splice(i, 1);
                }
            }

            var ref = url.match(/^(\w+:\/\/[^\/]+(:\d+)?\/?)/);
            if (ref) {
                hdrs.push({name: 'Referer', value: ref[1]});
            }

            break;
        case '_remove':
            for (var i = 0; i < hdrs.length; i++) {
                if ('Referer' == hdrs[i].name) {
                    hdrs.splice(i, 1);
                }
            }
            break;
        default:
            break;
        }

        return {requestHeaders: hdrs};
    };

    chrome.experimental.webRequest.onBeforeSendHeaders.addListener(
        filter,
        {},
        ['blocking', 'requestHeaders']
    );
})();
