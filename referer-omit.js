(function(){
    var defaultAction = '_host';
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

        for (var i = 0; i < hdrs.length; i++) {
            if ('Referer' == hdrs[i].name) {
                var r = url.match(/^(\w+:\/\/[^\/]+(:\d+)?\/?)/);
                if (r) {
                    hdrs[i].value = r[1];
                }
            }
        }

        return {requestHeaders: hdrs};
    };

    chrome.experimental.webRequest.onBeforeSendHeaders.addListener(
        filter,
        {},
        ['blocking', 'requestHeaders']
    );
})();
