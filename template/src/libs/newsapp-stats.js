;(function (window) {
    window.NewsappStats = {
        trackView: function (view) {
            if (window['neteaseAnalysis']) {
                window['neteaseAnalysis']({
                    type: 'special',
                    modelid: window['_ntes_sps_modelid'],
                    view: view,
                    spst: 5
                });
            }
            if (window['_hmt']) {
                window['_hmt'].push(['_trackPageview', location.pathname.replace('index.html', view + '.html')]);
            }
        },
        trackEvent: function (event, view) {
            view = view || 'main';

            if (window['neteaseAnalysis']) {
                window['neteaseAnalysis']({
                    type: 'func',
                    modelid: window['_ntes_sps_modelid'],
                    view: view,
                    event: event,
                    spst: 5
                });
            }
            if (window['_hmt']) {
                window['_hmt'].push(['_trackEvent', view, event]);
            }
        }
    };
})(window);