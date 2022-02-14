"ui";

/********************************************UI部分***********************************************/
ui.layout(
    <vertical>
        <text textSize="18sp" textColor="red" text="AiQiangGuo Ver1.0" />
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

http.__okhttp__.setTimeout(10000);

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
    toast("开始积分判断运行");
    thread = threads.start(function () {
        let url = [
            'https://github.secan.workers.dev/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/helper.js',
            'https://cdn.jsdelivr.net/gh/sec-an/Better-Auto-XXQG@main/helper.js',
            'https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/helper.js'
        ];
        for (var i = 0; i < url.length; i++) {
            try {
                let res = http.get(url[i]);
                console.log(res.statusCode);
                if (res.statusCode == 200) {
                    var UI = res.body.string();
                    break;
                } else {
                    toast('助手脚本:地址' + i + '下载失败');
                    console.log('助手脚本:地址' + i + '下载失败');
                }
            } catch (error) {}
        }
        engines.execScript("UI", UI);
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
