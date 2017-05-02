;(function (window) {
    window.NewsappShare = {
        shareData: {
            weibo: '',
            title: '',
            desc: '',
            img_url: '',
            link: ''
        },
        update: function (data) {
            for (var i in data) {
                if (this.shareData.hasOwnProperty(i)) {
                    this.shareData[i] = data[i];
                }
            }
            var html = '';
            html += '<div id="__newsapp_sharetext">' + (this.shareData.weibo || this.shareData.title) + ' ' + this.shareData.link + '</div>';
            html += '<div id="__newsapp_sharephotourl">' + this.shareData.img_url + '</div>';
            html += '<div id="__newsapp_sharewxtitle">' + this.shareData.title + '</div>';
            html += '<div id="__newsapp_sharewxtext">' + this.shareData.desc + '</div>';
            html += '<div id="__newsapp_sharewxthumburl">' + this.shareData.img_url + '</div>';
            html += '<div id="__newsapp_sharewxurl">' + this.shareData.link + '</div>';

            document.getElementById('__newsapp_shareconfig').innerHTML = html;
        },
        updateImg: function (imgUrl) {
            var html = '<div id="__newsapp_sharetext">图片分享</div>';
            html += '<div id="__newsapp_sharephotourl">' + imgUrl + '</div>';
            document.getElementById('__newsapp_shareconfig').innerHTML = html;
        },
        getAbsPath: function (url) {
            if (url) {
                var a = document.createElement('a');
                a.href = url;
                return a.href;
            } else {
                return location.href.replace(/(\?|#).*/, '');
            }
        }
    };

//微信分享设置
    document.addEventListener('WeixinJSBridgeReady', function () {
        WeixinJSBridge.on('menu:share:timeline', function () {
            WeixinJSBridge.invoke('shareTimeline', window.NewsappShare.shareData, function () {
                window.__newsapp_share_done();
            });
        });
        WeixinJSBridge.on('menu:share:appmessage', function () {
            WeixinJSBridge.invoke('sendAppMessage', window.NewsappShare.shareData, function () {
                window.__newsapp_share_done();
            });
        });
    }, false);
})(window);