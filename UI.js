"ui";

importClass(java.net.HttpURLConnection);
importClass(java.net.URL);
importClass(java.io.File);
importClass(java.io.FileOutputStream);
importClass(android.graphics.Color);

ui.layout(
    <vertical>
        <appbar>
                <toolbar id="toolbar" title="{{decodeURI('%E5%AD%A6%E4%B9%A0%E5%BC%BA%E5%9B%BD')}}" />
        </appbar>
        <text textSize="18sp" margin="20" gravity="center" textColor="black" text="四人赛、双人对抗 模式选择" />
        <radiogroup margin="5 0 5 0">
            <horizontal>
                <radio id="ocr_offline" gravity="center" textSize="15sp" />
                <radio id="ocr_online" gravity="center" textSize="15sp" />
            </horizontal>
        </radiogroup>
        <text id="apikey" margin="0 10 0 0" textSize="16sp" gravity="center" textColor="black" text="文字识别 API Key" />
        <input id="AK" margin="0 10 0 0" gravity="center" text="" />
        <text id="secretkey" margin="0 10 0 0" textSize="16sp" gravity="center" textColor="black" text="文字识别 Secret Key" />
        <input id="SK" margin="0 10 0 0" gravity="center" text="" />
        <horizontal>
            <button id="register" margin="20 10 10 0" layout_weight="1" h="50" text="点击注册百度智能云" />
            <button id="baidu" margin="10 10 20 0" layout_weight="1" h="50" text="检查AK、SK" />
        </horizontal>
        <horizontal>
            <text margin="20 10 0 0" textSize="14sp" textColor="black" text="默认延迟:" />
            <spinner id="defaultdelay" margin="0 10 0 0" entries="1秒|2秒|3秒"/>
            <text margin="0 10 0 0" textSize="14sp" textColor="black" text="OCR延迟:" />
            <spinner id="ocrdelay" margin="0 10 20 0" entries="0毫秒|100毫秒|200毫秒|300毫秒|400毫秒|500毫秒"/>
        </horizontal>
        <horizontal>
            <button id="stop" margin="20 20 10 0" layout_weight="1" h="120" bg="#FDE6E0" textSize="30sp" />
            <button id="study" margin="10 20 20 0" layout_weight="1" h="120" bg="#C7EDCC" textSize="30sp" />
        </horizontal>
        <button w="250" h="60" margin="0 20 0 0" layout_gravity="center" id="update" textSize="18sp" />
    </vertical>
);

ui.study.setText("开 始\n学 习");
ui.stop.setText("结 束\n运 行");
ui.ocr_offline.setText("PaddleOCR");
ui.ocr_online.setText("百度智能云");
online_ocr_visibility(8);
ui.update.visibility = 8;

http.__okhttp__.setTimeout(10000);

var BAIDUAPI = storages.create("BAIDUAPI");
var CONFIG = storages.create("CONFIG");
ui.AK.setText(BAIDUAPI.get("AK", ""));
ui.SK.setText(BAIDUAPI.get("SK", ""));
var execution = "";

if (CONFIG.get("OCR", 0) && BAIDUAPI.get("AK", "") && BAIDUAPI.get("SK", "")) {
    ui.ocr_online.checked = true;
    online_ocr_visibility(0);
} else {
    ui.ocr_offline.checked = true;
    CONFIG.put("OCR", 0);
}

ui.defaultdelay.setSelection(CONFIG.get("DEFAULT_DELAY", 0));
ui.ocrdelay.setSelection(CONFIG.get("OCR_DELAY", 0));

// 版本更新检查
var apkurl = "https://sp.sec-an.cn/storage01/xxqg/v2.0.2.apk";
var latest_version = "2.0.2";
if (CONFIG.get("NO_UPDATE", 0) && (app.versionName != latest_version)) {
    ui.update.visibility = 0;
    ui.update.setText("点击更新至最新版v" + latest_version);
} else if (app.versionName != latest_version) {
    checkversion();
}

var thread = null;

ui.ocr_offline.on("check", (checked) => {
    if (checked) {
        ui.ocr_online.checked = false;
        CONFIG.put("OCR", 0);
        online_ocr_visibility(8);
    }
});

ui.ocr_online.on("check", (checked) => {
    if (checked) {
        ui.ocr_offline.checked = false;
        CONFIG.put("OCR", 1);
        online_ocr_visibility(0);
    }
});

ui.register.click(function () {
    app.openUrl("https://cloud.baidu.com/doc/OCR/s/dk3iqnq51");
});

ui.baidu.click(function () {
    check_baidu_api();
});

ui.study.click(function () {
    threads.shutDownAll();
    if (thread != null && thread.isAlive()) {
        alert("注意", "脚本正在运行，请结束之前进程");
        return;
    }
    if (CONFIG.get("OCR", 0) && !BAIDUAPI.get("AK", "")) {
        check_baidu_api();
        toastLog("请先检查AK、SK\n之后再次点击开始学习");
        return;
    }
    CONFIG.put("DEFAULT_DELAY", ui.defaultdelay.getSelectedItemPosition());
    CONFIG.put("OCR_DELAY", ui.ocrdelay.getSelectedItemPosition());
    if (!CONFIG.get("OCR", 0) || BAIDUAPI.get("AK", "")) {
        threads.start(function () {
            let url = [
                'https://gitee.com/sec-an/js/raw/master/study.js',
                'https://gitee.com/sec-an/js/raw/master/helper.js',
                'http://cdn.sec-an.cn/Better-Auto-XXQG/helper.js',
                'https://github.secan.workers.dev/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/helper.js',
                'https://cdn.jsdelivr.net/gh/sec-an/Better-Auto-XXQG@main/helper.js',
                'https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/helper.js'
            ];
            for (var i = 0; i < url.length; i++) {
                try {
                    let res = http.get(url[i]);
                    console.log(i + ":" + res.statusCode);
                    if (res.statusCode == 200) {
                        var helper = res.body.string();
                        break;
                    } else {
                        toastLog()('助手脚本:地址' + i + '下载失败');
                    }
                } catch (error) {}
            }
            toastLog("开始积分判断运行");
            execution = engines.execScript("强国助手", helper);
        });
    } else {
        toastLog("请使用PaddleOCR\n或检查百度AK、SK");
    }
});

ui.stop.click(function () {
    if (execution) {
        execution.getEngine().forceStop();
    }
});

ui.update.click(function () {
    if (app.versionName != latest_version) {
        CONFIG.put("NO_UPDATE", 0);
        checkversion();
    } else {
        toast("当前已经是最新版本！");
    }
});

function online_ocr_visibility(i) {
    ui.apikey.visibility = i;
    ui.AK.visibility = i;
    ui.secretkey.visibility = i;
    ui.SK.visibility = i;
    ui.register.visibility = i;
    ui.baidu.visibility = i;
}

function check_baidu_api() {
    thread = threads.start(function () {
        let AK = String(ui.AK.getText());
        let SK = String(ui.SK.getText());
        var res = http.post(
            'https://aip.baidubce.com/oauth/2.0/token', {
                grant_type: 'client_credentials',
                client_id: AK,
                client_secret: SK
            }
        ).body.json();
        if ("error" in res) {
            toastLog("API Key或Secret Key存在错误");
            console.log(AK);
            console.log(SK);
            ui.AK.setText(BAIDUAPI.get("AK", ""));
            ui.SK.setText(BAIDUAPI.get("SK", ""));
            BAIDUAPI.put("AK", "");
            BAIDUAPI.put("SK", "");
        } else {
            toastLog("API Key、Secret Key正确，且已缓存");
            BAIDUAPI.put("AK", AK);
            BAIDUAPI.put("SK", SK);
        }
    });
}

function checkversion() {
    var releaseNotes = "版本 v" + latest_version + "\n" +
        "更新日志:\n" +
        "* 使用AutoX v5.7.8重新打包\n" +
        "* PaddleOCR优化\n" +
        "* 适配鸿蒙，建议升级\n";
    dialogs.build({
            title: "发现新版本",
            content: releaseNotes,
            positive: "立即下载",
            negative: "取消",
            neutral: "浏览器下载",
            checkBoxPrompt: "不再提示",
            cancelable: false
        })
        .on("positive", download)
        .on("neutral", () => {
            app.openUrl(apkurl);
        })
        .on("check", (checked) => {
            CONFIG.put("NO_UPDATE", 1);
        }).show();
}

//打开下载进度面板
function download() {
    downloadDialog = dialogs.build({
        title: "正在下载...",
        progress: {
            max: 100,
            showMinMax: true
        },
        autoDismiss: false,
        cancelable: false
    }).show();
    startDownload();
}

//下载apk的主方法体
function startDownload() {
    threads.start(function () {
        var path = files.cwd() + "/new.apk";
        let apkFile = new File(path);
        var conn = new URL(apkurl).openConnection();
        conn.connect();
        let is = conn.getInputStream();
        let length = conn.getContentLength();
        let fos = new FileOutputStream(apkFile);
        let count = 0;
        let buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
        while (true) {
            var p = ((count / length) * 100);
            let numread = is.read(buffer);
            count += numread;
            // 下载完成
            if (numread < 0) {
                toast("下载完成");
                downloadDialog.dismiss();
                downloadDialog = null;
                break;
            }
            // 更新进度条
            downloadDialog.setProgress(p);
            fos.write(buffer, 0, numread);
        }
        fos.close();
        is.close();
        //自动打开进行安装
        app.viewFile(path);
    })
}
