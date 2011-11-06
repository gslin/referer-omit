(function(){
    var defaultAction = '_host';
    var rules = [];

    var filter = function(req){
        var hdrs = req.requestHeaders;

        for (var i = 0; i < hdrs.length; i++) {
            if ('Referer' == hdrs[i].name) {
                var r = req.url.match(/^(\w+:\/\/[^\/]+(:\d+)?\/?)/);
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
