"ui";

/********************************************UI部分***********************************************/
ui.layout(
    <vertical>
        <appbar>
                <toolbar id="toolbar" bg="#ff4fb3ff" title="强国助手" />
        </appbar>
        <text textSize="15sp" layout_gravity="center" textColor="black" text="百度AK" />
        <input id="AK" text="" />
        <text textSize="15sp" layout_gravity="center" textColor="black" text="百度SK" />
        <input id="SK" text="" />
        <button id="baidu" h="50" text="检查AK、SK" />
        <button id="study" h="50" text="开始学习" />
        <button id="stop" h="50" text="停止运行" />
        <button w="250" layout_gravity="center" id="about" text="使用说明" />
    </vertical>
);

importClass(java.net.HttpURLConnection);
importClass(java.net.URL);
importClass(java.io.File);
importClass(java.io.FileOutputStream);

http.__okhttp__.setTimeout(10000);

var apkurl = "http://cdn.sec-an.cn/Better-Auto-XXQG/%E5%BC%BA%E5%9B%BD%E5%8A%A9%E6%89%8B_v1.0.0.apk";

// if (app.versionName != "1.0.0") {
//     checkversion();
// }

var storage = storages.create("BAIDUAPI");
// storage.clear();
console.log(storage.get("AK", ""));
console.log(storage.get("SK", ""));
ui.AK.setText(storage.get("AK", ""));
ui.SK.setText(storage.get("SK", ""));

var thread = null;

ui.baidu.click(function () {
    threads.shutDownAll();
    thread = threads.start(function () {
        let AK = String(ui.AK.getText());
        let SK = String(ui.SK.getText());
        console.log(AK);
        console.log(SK);
        if (AK) storage.put("AK", AK);
        if (SK) storage.put("SK", SK);
        var res = http.post(
            'https://aip.baidubce.com/oauth/2.0/token', {
                grant_type: 'client_credentials',
                client_id: storage.get("AK", ""),
                client_secret: storage.get("SK", "")
            }
        ).body.json();
        if ("error" in res) {
            toast("AK、SK存在错误");
            console.log("AK、SK存在错误");
            console.log(storage.get("AK", ""));
            console.log(storage.get("SK", ""));
            return;
        }
        toast("AK、SK正确");
        console.log("AK、SK正确");
    });
});

ui.study.click(function () {
    threads.shutDownAll();
    if (thread != null && thread.isAlive()) {
        alert("注意", "脚本正在运行，请结束之前进程");
        return;
    }
    threads.start(function () {
        let url = [
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
        engines.execScript("强国助手", helper);
    });
});

ui.stop.click(function () {
    if (thread != null && thread.isAlive()) {
        threads.shutDownAll();
        toast("停止运行！");
        console.hide();
    } else {
        toast("没有线程在运行！");
    }
});

ui.about.click(function () {
    alert("使用说明",
        "强国助手"
    )
});

function checkversion() {
    var releaseNotes = "版本 v1.0.1\n" +
      "更新日志:\n" +
      "* 修复 若干Bug\n";
    dialogs.build({
      title: "发现新版本",
      content: releaseNotes,
      positive: "立即下载",
      negative: "取消",
      cancelable: false
    }).on("positive", download).show();
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
    //执行下载
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
