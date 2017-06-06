;(function (window) {
    window.NewsappStats = {
        trackView: function (view) {
            if (window['neteaseAnalysis']) {
                window['neteaseAnalysis']({
                    type: 'special',
                    spst: 5,
                    modelid: window['_ntes_sps_modelid'],
                    view: view
                });
            }
            if (window['_hmt']) {
                window['_hmt'].push(['_trackPageview', '/nc/qa/activity/' + window['_ntes_sps_modelid'] + '/' + view]);
            }
        },
        trackEvent: function (event, view) {
            view = view || 'main';

            if (window['neteaseAnalysis']) {
                window['neteaseAnalysis']({
                    type: 'func',
                    spst: 5,
                    modelid: window['_ntes_sps_modelid'],
                    view: view,
                    event: event
                });
            }
            if (window['_hmt']) {
                window['_hmt'].push(['_trackEvent', view, event]);
            }
        }
    };
})(window);