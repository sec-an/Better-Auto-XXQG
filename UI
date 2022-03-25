"ui";

importClass(java.net.HttpURLConnection);
importClass(java.net.URL);
importClass(java.io.File);
importClass(java.io.FileOutputStream);
importClass(android.graphics.Color);

var color = "#FF4FB3FF";

ui.statusBarColor("#FF4FB3FF")

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" bg="#ff4fb3ff" title="{{decodeURI('%E5%BC%BA%E5%9B%BD%E5%8A%A9%E6%89%8B')}}"/>
                <tabs id="tabs" bg="#ff4fb3ff"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <vertical gravity="center" layout_weight="1">
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="无障碍服务" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <text text="请确保开启" textColor="#999999" textSize="14sp" maxLines="1" />
                                    </vertical>
                                    <checkbox id="autoService" marginLeft="4" marginRight="6" checked="{{auto.service != null}}" />
                                </horizontal>
                            </card>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="悬浮窗权限" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <text text="请确保开启" textColor="#999999" textSize="14sp" maxLines="1" />
                                    </vertical>
                                    <checkbox id="consoleshow" marginLeft="4" marginRight="6" checked="{{floaty.checkPermission()}}" />
                                </horizontal>
                            </card>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="音量上键可以停止所有脚本运行" textColor="#222222" textSize="16sp" maxLines="1" />
                                    </vertical>
                                </horizontal>
                            </card>
                        </vertical>
                        <button h="60" layout_gravity="center" id="log" textSize="18sp" text="查看日志" />
                        <button h="60" layout_gravity="center" id="update" textSize="18sp" />
                        <button id="start" text="开 始 学 习" textSize="25sp" color="#ffffff" bg="#FF4FB3FF" foreground="?selectableItemBackground"/>
                    </vertical>
                </frame>
                <ScrollView>
                    <frame>
                        <vertical gravity="center">
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="文章学习和广播收听" />
                                </vertical>
                                <checkbox id="article" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="视频学习" />
                                    <spinner id="video" marginLeft="4" marginRight="6" entries="新百灵视频学习|看电视视频学习|百灵视频学习|不进行学习" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每日答题" />
                                </vertical> 
                                <checkbox id="meiri" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="挑战答题" />
                                </vertical> 
                                <checkbox id="tiaozhan" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="专项答题" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="建议手动答题，否则不保证全对" />
                                </vertical> 
                                <checkbox id="checkbox_01" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每周答题" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="建议手动答题，否则不保证全对" />
                                </vertical> 
                                <checkbox id="checkbox_02" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人赛" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="可在答题页选择OCR配置，默认本地OCR" />
                                </vertical> 
                                <checkbox id="checkbox_03" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="双人对抗" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="可在答题页选择OCR配置，默认本地OCR" />
                                </vertical> 
                                <checkbox id="shuangren" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="basicsave" text="保存配置" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="basicreset" text="恢复默认" padding="12dp" w="*" />
                            </horizontal>
                        </vertical>
                    </frame>
                </ScrollView>
                <ScrollView>
                    <frame>
                        <vertical gravity="center">
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="专项答题模式选择" /> 
                                    <spinner id="select" marginLeft="4" marginRight="6" entries="不向下滑动，只答当天的题目,没有则返回|向下滑动，直到找到可答题的题目" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每周答题模式选择" />
                                    <spinner id="selectm" marginLeft="4" marginRight="6" entries="不向下滑动，只答当天的题目,没有则返回|向下滑动，直到找到可答题的题目" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人赛模式选择" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="注：一般手机本地识别速度大于云端，部分手机内置ocr识别较慢，请自行测试" />
                                    <spinner id="select_01" marginLeft="4" marginRight="6" entries="内置PaddleOCR->推荐|百度OCR接口,在OCR页配置" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人/双人不受积分限制开关" />
                                </vertical> 
                                <checkbox id="xianzhi" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人/双人额外的随机答题次数(乱答)" />
                                </vertical> 
                                <input id="another" marginLeft="4" marginRight="6" text="1"  hint="乱答次数"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每日、每周、专项答题增强模式" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="使用在线OCR识别答案" />
                                    <spinner id="stronger" marginLeft="4" marginRight="6" entries="关闭|使用百度OCR识别答案" />
                                </vertical> 
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="answersave" text="保存配置" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="answereset" text="恢复默认" padding="12dp" w="*" />
                            </horizontal>
                        </vertical>
                    </frame>
                </ScrollView>
                <ScrollView>
                    <frame>
                        <vertical gravity="center">
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="百度OCR的API Key" />
                                    <input id="AK" text=""  gravity="center" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="百度OCR的Secret Key" />
                                    <input id="SK" text=""  gravity="center" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="baidusave" text="保存并检查" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="baidureset" text="清空" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="baiduregister" text="注册百度智能云" padding="12dp" w="*" />
                            </horizontal>
                        </vertical>
                    </frame>
                </ScrollView>
                <ScrollView>
                    <frame>
                        <vertical gravity="center">
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="订阅" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="仅支持学习强国2.33.0及以下版本" />
                                    <spinner id="ssub" marginLeft="4" marginRight="6" entries="关闭|翻遍全部，直到订阅完成|只查看上新" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="点点通刷满" />
                                </vertical> 
                                <checkbox id="diandian" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="看门狗(秒)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="脚本运行的最长时间,超时/错误自动重启脚本" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="防止出现不可控错误,一般重启脚本即可解决" />
                                </vertical> 
                                <input id="alltime" marginLeft="4" marginRight="6" text="2000"  hint="秒"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每篇文章学习时间" />
                                </vertical> 
                                <input id="time1" marginLeft="4" marginRight="6" text="61"  hint="秒"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每个视频学习时间" />
                                </vertical> 
                                <input id="time2" marginLeft="4" marginRight="6" text="6"  hint="秒"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="push+ 消息推送" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="注：有需要的自行填写push+的Token，否则留空即可" />
                                    <input id="Token" text="" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="othersave" text="保存配置" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="othereset" text="恢复默认" padding="12dp" w="*" />
                            </horizontal>
                        </vertical>
                    </frame>
                </ScrollView>
            </viewpager>
        </vertical>
    </drawer>
);

ui.update.visibility = 8;

http.__okhttp__.setTimeout(10000);


var CONFIG = storages.create("CONFIG");
var BAIDUAPI = storages.create("BAIDUAPI");
var execution = "";
var thread = null;
Initialize();

// 版本更新检查
var apkurl = "https://sp.sec-an.cn/storage01/xxqg/v2.0.2.apk";
var latest_version = "2.0.2";
if (CONFIG.get("NO_UPDATE", 0) && (app.versionName != latest_version)) {
    ui.update.visibility = 0;
    ui.update.setText("点击更新至最新版v" + latest_version);
} else if (app.versionName != latest_version) {
    checkversion();
}


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("日志");
    menu.add("关于");
    menu.add("Github");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "日志":
            app.startActivity("console");
            break;
        case "关于":
            alert("关于", decodeURI("%E5%BC%BA%E5%9B%BD%E5%8A%A9%E6%89%8B%20v")+latest_version);
            break;
        case "Github":
            app.openUrl("https://github.com/sec-an/Better-Auto-XXQG");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "基础", "答题", "OCR", "其他"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

// 用户勾选无障碍服务的选项时，跳转到页面让用户去开启 
//android.permission.SYSTEM_ALERT_WINDOW
ui.autoService.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

ui.consoleshow.on("check", function (checked) {
    if (checked && !floaty.checkPermission()) {
        app.startActivity({
            packageName: "com.android.settings",
            className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
            data: "package:" + context.getPackageName(),
        });
    }
});
 
// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.consoleshow.checked = floaty.checkPermission();
});

ui.log.click(function () {
    app.startActivity("console");
});

ui.update.click(function () {
    if (app.versionName != latest_version) {
        CONFIG.put("NO_UPDATE", 0);
        checkversion();
    } else {
        toast("当前已经是最新版本！");
    }
});

ui.start.click(function () {
    threads.shutDownAll();
    if (thread != null && thread.isAlive()) {
        alert("注意", "脚本正在运行，请结束之前进程");
        return;
    }
    threads.start(function () {
        let url = [
            'https://gitee.com/sec-an/js/raw/main/study',
            'https://sp.sec-an.cn/storage01/xxqg/study.js',
            'https://github.secan.workers.dev/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/study',
            'https://cdn.jsdelivr.net/gh/sec-an/Better-Auto-XXQG@main/study',
            'https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/study'
        ];
        for (var i = 0; i < url.length; i++) {
            try {
                let res = http.get(url[i]);
                console.log(i + ":" + res.statusCode);
                if (res.statusCode == 200) {
                    var study = res.body.string();
                    if (study.indexOf('auto.waitFor();') == 0) break;
                } else {
                    toastLog('助手脚本:地址' + i + '下载失败');
                }
            } catch (error) {}
        }
        toastLog("开始积分判断运行");
        execution = engines.execScript(decodeURI("%E5%BC%BA%E5%9B%BD%E5%8A%A9%E6%89%8B"), study);
    });
});

ui.basicsave.click(function () {
    CONFIG.put("article", ui.article.isChecked());
    CONFIG.put("video", ui.video.getSelectedItemPosition());
    CONFIG.put("meiri", ui.meiri.isChecked());
    CONFIG.put("tiaozhan", ui.tiaozhan.isChecked());
    CONFIG.put("checkbox_01", ui.checkbox_01.isChecked());
    CONFIG.put("checkbox_02", ui.checkbox_02.isChecked());
    CONFIG.put("checkbox_03", ui.checkbox_03.isChecked());
    CONFIG.put("shuangren", ui.shuangren.isChecked());
    toastLog("配置保存成功！");
});

ui.basicreset.click(function () {
    CONFIG.put("article", true);
    CONFIG.put("video", 0);
    CONFIG.put("meiri", true);
    CONFIG.put("tiaozhan", true);
    CONFIG.put("checkbox_01", true);
    CONFIG.put("checkbox_02", true);
    CONFIG.put("checkbox_03", true);
    CONFIG.put("shuangren", true);
    ui.article.setChecked(CONFIG.get("article"));
    ui.video.setSelection(CONFIG.get("video"));
    ui.meiri.setChecked(CONFIG.get("meiri"));
    ui.tiaozhan.setChecked(CONFIG.get("tiaozhan"));
    ui.checkbox_01.setChecked(CONFIG.get("checkbox_01"));
    ui.checkbox_02.setChecked(CONFIG.get("checkbox_02"));
    ui.checkbox_03.setChecked(CONFIG.get("checkbox_03"));
    ui.shuangren.setChecked(CONFIG.get("shuangren"));
    toastLog("恢复默认！");
});

ui.answersave.click(function () {
    CONFIG.put("select", ui.select.getSelectedItemPosition());
    CONFIG.put("selectm", ui.selectm.getSelectedItemPosition());
    CONFIG.put("select_01", ui.select_01.getSelectedItemPosition());
    CONFIG.put("xianzhi", ui.xianzhi.isChecked());
    CONFIG.put("another", ui.another.getText()+"");
    CONFIG.put("stronger", ui.stronger.getSelectedItemPosition());
    toastLog("配置保存成功！");
});

ui.answereset.click(function () {
    CONFIG.put("select", 0);
    CONFIG.put("selectm", 0);
    CONFIG.put("select_01", 0);
    CONFIG.put("xianzhi", false);
    CONFIG.put("another", "1");
    CONFIG.put("stronger", 0);
    ui.select.setSelection(CONFIG.get("select"));
    ui.selectm.setSelection(CONFIG.get("selectm"));
    ui.select_01.setSelection(CONFIG.get("select_01"));
    ui.xianzhi.setChecked(CONFIG.get("xianzhi"));
    ui.another.setText(CONFIG.get("another"));
    ui.stronger.setSelection(CONFIG.get("stronger"));
    toastLog("恢复默认！");
});

ui.baidusave.click(function () {
    check_baidu_api();
});

ui.baidureset.click(function () {
    BAIDUAPI.put("AK", "");
    BAIDUAPI.put("SK", "");
    ui.AK.setText(BAIDUAPI.get("AK", ""));
    ui.SK.setText(BAIDUAPI.get("SK", ""));
    toastLog("恢复默认！");
});

ui.baiduregister.click(function () {
    app.openUrl("https://cloud.baidu.com/doc/OCR/s/dk3iqnq51");
});

ui.othersave.click(function () {
    CONFIG.put("ssub", ui.ssub.getSelectedItemPosition());
    CONFIG.put("diandian", ui.diandian.isChecked());
    CONFIG.put("alltime", ui.alltime.getText()+"");
    CONFIG.put("time1", ui.time1.getText()+"");
    CONFIG.put("time2", ui.time2.getText()+"");
    CONFIG.put("Token", ui.Token.getText()+"");
    toastLog("配置保存成功！");
});

ui.othereset.click(function () {
    CONFIG.put("ssub", 0);
    CONFIG.put("diandian", false);
    CONFIG.put("alltime", "2000");
    CONFIG.put("time1", "61");
    CONFIG.put("time2", "6");
    CONFIG.put("Token", "");
    ui.ssub.setSelection(CONFIG.get("ssub"));
    ui.diandian.setChecked(CONFIG.get("diandian"));
    ui.alltime.setText(CONFIG.get("alltime"));
    ui.time1.setText(CONFIG.get("time1"));
    ui.time2.setText(CONFIG.get("time2"));
    ui.Token.setText(CONFIG.get("Token"));
    toastLog("恢复默认！");
});

function Initialize() {
    ui.article.setChecked(CONFIG.get("article", true));
    ui.video.setSelection(CONFIG.get("video", 0));
    ui.meiri.setChecked(CONFIG.get("meiri", true));
    ui.tiaozhan.setChecked(CONFIG.get("tiaozhan", true));
    ui.checkbox_01.setChecked(CONFIG.get("checkbox_01", true));
    ui.checkbox_02.setChecked(CONFIG.get("checkbox_02", true));
    ui.checkbox_03.setChecked(CONFIG.get("checkbox_03", true));
    ui.shuangren.setChecked(CONFIG.get("shuangren", true));

    ui.select.setSelection(CONFIG.get("select", 0));
    ui.selectm.setSelection(CONFIG.get("selectm", 0));
    ui.select_01.setSelection(CONFIG.get("select_01", 0));
    ui.xianzhi.setChecked(CONFIG.get("xianzhi", false));
    ui.another.setText(CONFIG.get("another", "1"));
    ui.stronger.setSelection(CONFIG.get("stronger", 0));

    ui.AK.setText(BAIDUAPI.get("AK", ""));
    ui.SK.setText(BAIDUAPI.get("SK", ""));

    ui.ssub.setSelection(CONFIG.get("ssub", 0));
    ui.diandian.setChecked(CONFIG.get("diandian", false));
    ui.alltime.setText(CONFIG.get("alltime", "2000"));
    ui.time1.setText(CONFIG.get("time1", "61"));
    ui.time2.setText(CONFIG.get("time2", "6"));
    ui.Token.setText(CONFIG.get("Token", ""));
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
