;(function (window) {
    var designWidth = 750; // 设计稿宽度
    var designHeight = 1206; // 设计稿高度
    var designRem = 100; // 目标rem对应px的比例
    var defaultRem = getDefaultRem(); // 浏览器默认rem对应px的比例
    var tid;

    function getDefaultRem() {
        var div = document.createElement('div');
        div.style.width = '1rem';
        var tempContainer = document.body || document.getElementsByTagName('head')[0];
        tempContainer.appendChild(div);
        var defaultRem = parseFloat(window.getComputedStyle(div, null).getPropertyValue('width'));
        tempContainer.removeChild(div);
        return defaultRem;
    }

    function updateRem() {
        var clientWidth;
        if (window.innerWidth < window.innerHeight) {
            clientWidth = window.innerWidth;
        } else {
            clientWidth = designWidth / designHeight * window.innerHeight;
        }
        document.documentElement.style.fontSize = clientWidth / designWidth * designRem / defaultRem * 100 + '%';
    }

    window.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(updateRem, 100);
    }, false);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(updateRem, 100);
        }
    }, false);

    updateRem();
})(window);