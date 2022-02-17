auto.waitFor();
device.keepScreenDim(); // 保持屏幕常亮

var my_scores = {}; // 已学习积分
var radio_on = 0; // 电台状态
var articles_to_learn = 0; // 剩余文章数
var videos_to_watch = 0; // 剩余视频数
var BAIDUAPI = storages.create("BAIDUAPI");
var CONFIG = storages.create("CONFIG");
var DEFAULT_DELAY = CONFIG.get("DEFAULT_DELAY", 0) + 1;
var OCR_DELAY = CONFIG.get("OCR_DELAY", 0) * 100;
var AK = BAIDUAPI.get("AK", "");
var SK = BAIDUAPI.get("SK", "");
var token = get_baidu_token();

threads.start(function () {
    var beginBtn;
    sleep(500);
    if (beginBtn = classNameContains("Button").textContains("开始").findOne(1000));
    else(beginBtn = classNameContains("Button").textContains("允许").findOne(1000));
    if (beginBtn) beginBtn.click();
});
if (!requestScreenCapture()) { // 请求截图权限for OCR
    toast("请求截图失败");
    exit();
}

toastLog("默认延迟:" + DEFAULT_DELAY + "秒");
toastLog("OCR延迟:" + OCR_DELAY + "毫秒");

if (CONFIG.get("OCR", 0)) {
    toastLog("使用百度OCR");
} else {
    toastLog("使用PaddleOCR");
}

console.setPosition(0, device.height / 1.5); //部分华为手机console有bug请注释本行
console.show(true); //部分华为手机console有bug请注释本行

app.launchApp('学习强国');
get_scores();

while (my_scores['我要选读文章'] != 12 || my_scores['视听学习'] != 6 || my_scores['视听学习时长'] != 6 || my_scores['每日答题'] != 5 || my_scores['挑战答题'] != 6 || my_scores["四人赛"] < 3 || my_scores["双人对战"] < 1 || my_scores['发表观点'] != 1 || my_scores['本地频道'] != 1) {

    // 打开电台广播 for 试听学习时长6分 与选读文章同时进行
    media.pauseMusic(); // 暂停音乐播放
    if (my_scores['视听学习时长'] != 6) {
        if (id("home_bottom_tab_button_mine").exists()) {
            id("home_bottom_tab_button_mine").findOnce().click();
        } else if (text("电台").exists()) {
            text("电台").findOnce().parent().parent().parent().click();
        }
        delay(DEFAULT_DELAY);
        text("听广播").findOnce().parent().click();
        delay(2 * DEFAULT_DELAY);
        id("v_paused").findOnce().click(); // 播放按钮
        radio_on = 1;
    }

    // 本地频道1分
    id("home_bottom_tab_button_work").findOnce().click(); // "学习"页
    delay(DEFAULT_DELAY);
    className("android.widget.TextView").text("综合").findOne().parent().parent().child(3).click(); // 地方频道
    delay(DEFAULT_DELAY);
    if (my_scores['本地频道'] != 1) {
        className('android.widget.LinearLayout').clickable(true).depth(26).waitFor();
        delay(2 * DEFAULT_DELAY);
        className('android.widget.LinearLayout').clickable(true).depth(26).findOne().click();
        delay(2 * DEFAULT_DELAY);
        back();
        delay(DEFAULT_DELAY);
    }

    // 选读文章12分
    while (articles_to_learn) {
        id("home_bottom_tab_button_work").findOnce().click(); // "学习"键刷新文章列表
        delay(DEFAULT_DELAY);
        let scroll_down = 10;
        let h = device.height; // 屏幕高
        let w = device.width; // 屏幕宽
        let x = (w / 6) * 5; // 横坐标6分之5处
        let h1 = (h / 6) * 5; // 纵坐标6分之5处
        let h2 = (h / 6); // 纵坐标6分之1处
        while (scroll_down) {
            delay(DEFAULT_DELAY);
            var current_page_articles = id('general_card_image_id').find();
            if (current_page_articles.length) break;
            swipe(x, h1, x, h2, 500); // 下滑（纵坐标从5/6处滑到1/6处）
            scroll_down--;
        }
        var cnt = 2;
        for (var i = 0; i < current_page_articles.length; i++) {
            if (!articles_to_learn) break;
            delay(DEFAULT_DELAY);
            try {
                current_page_articles[i].parent().parent().parent().click();
            } catch (error) {
                continue;
            }
            delay(3 * DEFAULT_DELAY);
            swipe(x, h1, x, h2, 500);
            if (!id('BOTTOM_LAYER_VIEW_ID').exists()) {
                back();
                delay(DEFAULT_DELAY);
                continue;
            }
            let seconds = 60 + random(0, 5);
            for (var j = 0; j < seconds; j++) {
                sleep(1000);
                if (j % 5 == 0) {
                    console.info("已学习" + (j + 1) + "秒,剩余" + (seconds - j - 1) + "秒!");
                    toast("防息屏弹窗");
                    if (j <= seconds / 2) { //每10秒滑动一次，如果android版本<7.0请将此滑动代码删除
                        swipe(x, h1, x, h2, 500); //向下滑动
                    } else {
                        swipe(x, h2, x, h1, 500); //向上滑动
                    }
                }
            }
            articles_to_learn--;

            // 分享2分
            if (my_scores["分享"] != 1 && cnt--) {
                id('BOTTOM_LAYER_VIEW_ID').findOnce().child(1).click();
                delay(DEFAULT_DELAY);
                text("分享到学习强国").findOnce().parent().click();
                delay(DEFAULT_DELAY);
                back();
                delay(DEFAULT_DELAY);
            }
            back();
            delay(DEFAULT_DELAY);
        }
        get_scores();
    }

    // 关闭电台广播
    if (radio_on) {
        if (id("home_bottom_tab_button_mine").exists()) {
            id("home_bottom_tab_button_mine").findOnce().click();
        } else if (text("电台").exists()) {
            text("电台").findOnce().parent().parent().parent().click();
        }
        delay(DEFAULT_DELAY);
        text("听广播").findOnce().parent().click();
        delay(DEFAULT_DELAY);
        id("v_playing").findOnce().click(); // 暂停按钮
    }

    // 视听学习6分
    while (videos_to_watch) {
        id("home_bottom_tab_button_ding").findOnce().click(); // "百灵"页
        delay(DEFAULT_DELAY);
        text("竖").findOnce().parent().click(); // 竖
        delay(2 * DEFAULT_DELAY);
        text("").waitFor();
        text("").findOnce().parent().parent().parent().parent().child(0).click();
        delay(DEFAULT_DELAY);
        if (text('继续播放').exists()) click('继续播放');
        if (text('刷新重试').exists()) click('刷新重试');
        let h = device.height; // 屏幕高
        let w = device.width; // 屏幕宽
        let x = (w / 6) * 4; // 横坐标6分之4处
        let h1 = (h / 6) * 5; // 纵坐标6分之5处
        let h2 = (h / 6); // 纵坐标6分之1处
        while (videos_to_watch) {
            try {
                delay(1.5 * DEFAULT_DELAY);
                className('android.widget.LinearLayout').clickable(true).depth(16).waitFor();
                var current_video_time = className('android.widget.TextView').clickable(false).depth(16).findOne().text().match(/\/.*/).toString().slice(1); // 当前视频的时间长度
                // 视频超过一分钟跳过
                if (Number(current_video_time.slice(0, 3)) >= 1) {
                    swipe(x, h1, x, h2, 500); // 下滑（纵坐标从5/6处滑到1/6处）
                    delay(DEFAULT_DELAY);
                    continue;
                }
                sleep(parseInt(current_video_time.slice(4)) * 1000);
            } catch (error) {
                // 如果被"即将播放"将读取不到视频的时间长度，此时就sleep 3秒
                sleep(3000);
            }
            videos_to_watch--;
        }
        back();
        get_scores();
    }

    media.resumeMusic();

    // 四人赛
    if (token && my_scores['四人赛'] < 3) {
        id('comm_head_xuexi_mine').findOnce().click();
        delay(DEFAULT_DELAY);
        text('我要答题').findOnce().parent().click();
        delay(DEFAULT_DELAY);
        className('android.view.View').depth(22).findOnce(11).click();
        delay(DEFAULT_DELAY);
        let time = textStartsWith("今日").findOnce().text().match(/\d+/);
        console.hide();
        for (var i = time; i <= 2; i++) {
            delay(DEFAULT_DELAY);
            text('开始比赛').findOnce().click();
            do_contest();
            if (i == 1) {
                delay(DEFAULT_DELAY);
                while (!click('继续挑战'));
                delay(DEFAULT_DELAY);
            }
        }
        console.show();
        // 回退返回主页 
        while (!id("home_bottom_tab_button_work").exists()) {
            back();
            delay(DEFAULT_DELAY);
        }
    }

    // 双人对战
    if (token && my_scores['双人对战'] < 1) {
        console.hide();
        id('comm_head_xuexi_mine').findOnce().click();
        delay(DEFAULT_DELAY);
        text('我要答题').findOnce().parent().click();
        delay(DEFAULT_DELAY);
        className('android.view.View').depth(22).findOnce(12).click();
        delay(DEFAULT_DELAY);
        text('随机匹配').waitFor();
        delay(2 * DEFAULT_DELAY);
        try {
            className('android.view.View').clickable(true).depth(24).findOnce(1).click();
        } catch (error) {
            className("android.view.View").text("").findOne().click();
        }
        do_contest();
        delay(DEFAULT_DELAY);
        back();
        delay(DEFAULT_DELAY);
        back();
        delay(DEFAULT_DELAY);
        text('退出').findOnce().click();
        // 回退返回主页
        console.show();
        while (!id("home_bottom_tab_button_work").exists()) {
            back();
            delay(DEFAULT_DELAY);
        }
    }

    // 发表观点
    if (my_scores['发表观点'] != 1) {
        id("home_bottom_tab_button_work").findOnce().click(); // "学习"键刷新文章列表
        let speechs = ["好好学习，天天向上", "大国领袖，高瞻远瞩", "请党放心，强国有我", "坚持信念，砥砺奋进", "团结一致，共建美好"];
        delay(DEFAULT_DELAY);
        className("android.widget.TextView").text("综合").findOne().parent().click(); // 综合
        delay(DEFAULT_DELAY);
        text('播报').findOnce().parent().parent().parent().parent().click();
        delay(DEFAULT_DELAY);
        text('欢迎发表你的观点').findOnce().click();
        delay(DEFAULT_DELAY);
        setText(speechs[random(0, speechs.length - 1)]);
        delay(1.5 * DEFAULT_DELAY);
        text('发布').findOnce().click();
        delay(1.5 * DEFAULT_DELAY);
        text('删除').findOnce().click();
        delay(1.5 * DEFAULT_DELAY);
        text('确认').findOnce().click();
        delay(DEFAULT_DELAY);
        back();
        delay(DEFAULT_DELAY);
    }

    // 每日答题
    if (my_scores['每日答题'] != 5) {
        id('comm_head_xuexi_mine').findOnce().click();
        delay(DEFAULT_DELAY);
        text('我要答题').findOnce().parent().click();
        delay(DEFAULT_DELAY);
        text('每日答题').click();
        delay(DEFAULT_DELAY);
        while (true) {
            exam_practise();
            if (text("再来一组").exists()) {
                delay(2 * DEFAULT_DELAY);
                if (!text("领取奖励已达今日上限").exists()) {
                    text("再来一组").click();
                    delay(DEFAULT_DELAY);
                } else {
                    console.log("每日答题结束！返回主页！")
                    text("返回").click();
                    delay(DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    break;
                }
            }
        }
    }

    // 每周答题
    if (my_scores['每周答题'] < 1) {
        let h = device.height; //屏幕高
        let w = device.width; //屏幕宽
        let x = (w / 3) * 2; //横坐标2分之3处
        let h1 = (h / 6) * 5; //纵坐标6分之5处
        let h2 = (h / 6); //纵坐标6分之1处
        id('comm_head_xuexi_mine').findOnce().click();
        delay(DEFAULT_DELAY);
        text('我要答题').findOnce().parent().click();
        delay(DEFAULT_DELAY);
        text('每周答题').click();
        delay(DEFAULT_DELAY);
        let n = 20; //定义下滑次数
        let flag = 0;
        while (n--) {
            if (text("未作答").exists()) {
                text("未作答").click();
                flag = 1;
                break;
            } else if (text("您已经看到了我的底线").exists()) {
                console.log("没有可作答的每周答题了,退出!!!")
                back();
                delay(DEFAULT_DELAY);
                back();
                delay(DEFAULT_DELAY);
                back();
                delay(DEFAULT_DELAY);
                break;
            }
            delay(DEFAULT_DELAY);
            swipe(x, h1, x, h2, 500); //往下翻（纵坐标从5/6处滑到1/6处）
            console.log("滑动查找未作答的每周答题");
        }
        if (!flag) {
            console.log("没有可作答每周答题,退出!!!")
            back();
            delay(DEFAULT_DELAY);
            back();
            delay(DEFAULT_DELAY);
            back();
            delay(DEFAULT_DELAY);
        } else {
            while (true) {
                delay(DEFAULT_DELAY)
                while (!(textStartsWith("填空题").exists() || textStartsWith("多选题").exists() || textStartsWith("单选题").exists())) {
                    console.error("没有找到题目！请检查是否进入答题界面！");
                    delay(2 * DEFAULT_DELAY);
                }
                exam_practise();
                if (text("再练一次").exists()) {
                    console.log("每周答题结束，返回！")
                    text("返回").click();
                    delay(2 * DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    while (!textContains("我要答题").exists()) {
                        back();
                        delay(DEFAULT_DELAY);
                    }
                    break;
                } else if (text("查看解析").exists()) {
                    console.log("每周答题结束，返回！")
                    back();
                    delay(DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    break;
                } else if (text("再来一组").exists()) {
                    console.log("每周答题结束，返回！")
                    text("返回").click();
                    delay(2 * DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    while (!textContains("我要答题").exists()) {
                        console.log("每周答题结束，返回！")
                        back();
                        delay(DEFAULT_DELAY);
                    }
                    break;
                }
            }
            // 回退返回主页 
            while (!id("home_bottom_tab_button_work").exists()) {
                back();
                delay(DEFAULT_DELAY);
            }
        }
    }

    if (my_scores['专项答题'] < 1) {
        let h = device.height; //屏幕高
        let w = device.width; //屏幕宽
        let x = (w / 3) * 2; //横坐标2分之3处
        let h1 = (h / 6) * 5; //纵坐标6分之5处
        let h2 = (h / 6); //纵坐标6分之1处
        id('comm_head_xuexi_mine').findOnce().click();
        delay(DEFAULT_DELAY);
        text('我要答题').findOnce().parent().click();
        delay(DEFAULT_DELAY);
        text('专项答题').click();
        delay(DEFAULT_DELAY);
        let n = 20; //定义下滑次数
        let flag = 0;
        while (n--) {
            if (text("继续答题").exists()) {
                text("继续答题").click();
                flag = 1;
                break;
            } else if (text("开始答题").exists()) {
                text("开始答题").click();
                flag = 1;
                break;
            } else if (text("您已经看到了我的底线").exists()) {
                console.log("没有可作答的专项答题了,退出!!!")
                back();
                delay(DEFAULT_DELAY);
                back();
                delay(DEFAULT_DELAY);
                back();
                delay(DEFAULT_DELAY);
                break;
            } else if (text("已过期").exists()) {
                console.log("存在已过期的专项答题,无法作答，退出!!!")
                back();
                delay(2 * DEFAULT_DELAY);
                back();
                delay(DEFAULT_DELAY);
                back();
                delay(DEFAULT_DELAY);
                break;
            }
            delay(DEFAULT_DELAY);
            swipe(x, h1, x, h2, 500); //往下翻（纵坐标从5/6处滑到1/6处）
            console.log("滑动查找未作答的专项答题");
        }
        if (!flag) {
            console.log("没有可作答专项答题,退出!!!")
            back();
            delay(DEFAULT_DELAY);
            back();
            delay(DEFAULT_DELAY);
            back();
            delay(DEFAULT_DELAY);
        } else {
            while (true) {
                delay(DEFAULT_DELAY)
                while (!(textStartsWith("填空题").exists() || textStartsWith("多选题").exists() || textStartsWith("单选题").exists())) {
                    console.error("没有找到题目！请检查是否进入答题界面！");
                    delay(2 * DEFAULT_DELAY);
                }
                exam_practise();
                if (text("再练一次").exists()) {
                    console.log("专项答题结束！")
                    text("返回").click();
                    delay(2 * DEFAULT_DELAY);
                    back();
                    break;
                } else if (text("查看解析").exists()) {
                    console.log("专项答题结束，返回！")
                    back();
                    delay(DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    back();
                    delay(DEFAULT_DELAY);
                    while (!textContains("我要答题").exists()) {
                        back();
                        delay(DEFAULT_DELAY);
                    }
                    break;
                } else if (text("再来一组").exists()) {
                    console.log("专项答题结束，返回！")
                    delay(2 * DEFAULT_DELAY);
                    while (!textContains("专项答题").exists()) {
                        console.log("专项答题结束，返回！")
                        back();
                        delay(DEFAULT_DELAY);
                    }
                    back();
                    delay(DEFAULT_DELAY);
                    while (!textContains("我要答题").exists()) {
                        back();
                        delay(DEFAULT_DELAY);
                    }
                    break;
                }
            }
            //回退返回主页 
            while (!id("home_bottom_tab_button_work").exists()) {
                back();
                delay(DEFAULT_DELAY);
            }
        }
    }

    if (my_scores['挑战答题'] != 6) {
        id('comm_head_xuexi_mine').findOnce().click();
        delay(DEFAULT_DELAY);
        text('我要答题').findOnce().parent().click();
        delay(DEFAULT_DELAY);
        className('android.view.View').depth(22).findOnce(13).click();
        delay(DEFAULT_DELAY);
        var flag = false; // flag为true时挑战成功拿到6分
        while (!flag) {
            delay(3 * DEFAULT_DELAY);
            var num = 0;
            while (num < 5) {
                delay(2 * DEFAULT_DELAY); // 每题的过渡
                // 如果答错，第一次通过分享复活
                if (text('分享就能复活').exists()) {
                    num -= 2;
                    click('分享就能复活');
                    delay(DEFAULT_DELAY);
                    back();
                    // 等待题目加载
                    delay(3 * DEFAULT_DELAY);
                }
                // 第二次重新开局
                if (text('再来一局').exists()) {
                    text('再来一局').click();
                    break;
                }
                // 题目
                var question = className('android.view.View').depth(25).findOne().text();
                // 截取到下划线前
                question = question.slice(0, question.indexOf(' '));
                // 截取前20个字符就行
                question = question.slice(0, 20);
                do_contest_answer(28, question);
                num++;
            }
            delay(2.5 * DEFAULT_DELAY);
            if (num == 5 && !text('再来一局').exists() && !text('结束本局').exists()) flag = true;
        }
        // 随意点击直到退出
        do {
            delay(2.5 * DEFAULT_DELAY);
            className('android.widget.RadioButton').depth(28).findOne().click();
            delay(2.5 * DEFAULT_DELAY);
        } while (!text('再来一局').exists() && !text('结束本局').exists());
        click('结束本局');
        delay(DEFAULT_DELAY);
        back();
        delay(DEFAULT_DELAY);
        back();
        delay(DEFAULT_DELAY);
        back();
    }
    get_scores();
}

device.cancelKeepingAwake(); // 取消屏幕常亮
console.hide();


function delay(seconds) {
    sleep(1000 * seconds + random(100, 300));
}

function get_scores() {
    while (!text("积分明细").exists()) {
        if (id("comm_head_xuexi_score").exists()) {
            id("comm_head_xuexi_score").findOnce().click();
            text("登录").waitFor();
        } else if (text("积分").exists()) {
            text("积分").findOnce().parent().child(1).click();
            text("登录").waitFor();
        }
        delay(DEFAULT_DELAY);
    }
    let err = false;
    while (!err) {
        try {
            className("android.widget.ListView").findOnce().children().forEach(item => {
                let name = item.child(0).child(0).text();
                let score = item.child(2).text().match(/\d+/);
                my_scores[name] = score;
            });
            err = true;
        } catch (e) {
            console.log(e);
        }
    }
    articles_to_learn = Math.ceil((12 - my_scores["我要选读文章"]) / 2);
    videos_to_watch = 6 - my_scores["视听学习"];
    console.log('剩余文章：' + articles_to_learn.toString() + '篇')
    console.log('剩余视频：' + videos_to_watch.toString() + '个')
    back();
    delay(DEFAULT_DELAY);
}

function do_contest() {
    while (!text('开始').exists());
    while (!text('继续挑战').exists()) {
        className("android.view.View").depth(28).waitFor();
        sleep(OCR_DELAY);
        var pos = className("android.view.View").depth(28).findOne().bounds();
        if (className("android.view.View").text("        ").exists())
            pos = className("android.view.View").text("        ").findOne().bounds();
        do {
            var point = findColor(captureScreen(), '#1B1F25', {
                region: [pos.left, pos.top, pos.width(), pos.height()],
                threshold: 10,
            });
        } while (!point);

        var img = images.inRange(captureScreen(), '#000000', '#444444');
        img = images.clip(img, pos.left, pos.top, pos.width(), pos.height());

        if (CONFIG.get("OCR", 0)) {
            var question = baidu_ocr_api(img);
        } else {
            var question = paddle_ocr(img);
        }

        log(question);
        if (question) do_contest_answer(32, question);
        else {
            className('android.widget.RadioButton').depth(32).waitFor();
            className('android.widget.RadioButton').depth(32).findOne().click();
        }
        // 等待新题目加载
        while (!textMatches(/第\d题/).exists() && !text('继续挑战').exists() && !text('开始').exists());
    }
}

function paddle_ocr(img) {
    var words_list = paddle.ocrText(img, 8, true);
    var answer = "";
    var c = words_list.indexOf("0");
    if (c != -1) {
        words_list[c] = "。";
    }
    var c = words_list.indexOf("O");
    if (c != -1) {
        words_list[c] = "。";
    }
    for (var i in words_list) {
        if (words_list[i][0] == "A") break;
        answer += words_list[i];
    }
    answer = answer.replace(/[\s_]/g, "");
    answer = answer.replace(/\s*/g, "");
    answer = answer.replace(/,/g, "，");
    answer = answer.slice(answer.indexOf('.') + 1);
    answer = answer.slice(0, 20);
    return answer;
}

function get_baidu_token() {
    var res = http.post(
        'https://aip.baidubce.com/oauth/2.0/token', {
            grant_type: 'client_credentials',
            client_id: AK,
            client_secret: SK
        }
    ).body.json();
    if ("error" in res) {
        return false;
    }
    return res['access_token'];
}

function baidu_ocr_api(img) {
    var right_flag = false;
    var answer_left = "";
    var answer_right = "";
    var answer = "";
    var res = http.post(
        'https://aip.baidubce.com/rest/2.0/ocr/v1/general', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            access_token: token,
            image: images.toBase64(img),
        }
    );
    var res = res.body.json();
    try {
        var words_list = res.words_result;
    } catch (error) {}
    if (words_list) {
        for (var i in words_list) {
            // 如果是选项则后面不需要读取
            if (words_list[i].words[0] == "A") break;
            // 将题目以分割线分为两块
            // 利用location之差判断是否之中有分割线
            /**
             * location:
             * 识别到的文字块的区域位置信息，列表形式，
             * location['left']表示定位位置的长方形左上顶点的水平坐标
             * location['top']表示定位位置的长方形左上顶点的垂直坐标
             */
            if (words_list[0].words.indexOf('.') != -1 && i > 0 &&
                Math.abs(words_list[i].location['left'] -
                    words_list[i - 1].location['left']) > 100) right_flag = true;
            if (right_flag) answer_right += words_list[i].words;
            else answer_left += words_list[i].words;
            if (answer_left.length >= 20 || answer_right.length >= 20) break;
        }
    }
    answer = answer_right.length > answer_left.length ? answer_right : answer_left;
    answer = answer.replace(/\s*/g, "");
    answer = answer.replace(/,/g, "，");
    answer = answer.slice(answer.indexOf('.') + 1);
    answer = answer.slice(0, 20);
    return answer;
}

/**
 * 答题
 * @param {int} depth_option 选项控件的深度
 * @param {string} question 问题
 */
function do_contest_answer(depth_option, question) {
    if (question == "选择正确的读音" || question == "选择词语的正确词形" || question == "下列词形正确的是") {
        // 选择第一个
        className('android.widget.RadioButton').depth(depth_option).waitFor();
        className('android.widget.RadioButton').depth(depth_option).findOne().click();
    } else {
        var result;
        // 发送http请求获取答案 网站搜题速度 r1 > r2
        try {
            var r1 = http.get('http://www.syiban.com/search/index/init.html?modelid=1&q=' + encodeURI(question.slice(0, 10)));
            result = r1.body.string().match(/答案：./);
        } catch (error) {}
        // 如果第一个网站没获取到正确答案，则利用第二个网站
        if (!(result && result[0].charCodeAt(3) > 64 && result[0].charCodeAt(3) < 69)) {
            try {
                var r2 = http.get('https://www.souwen123.com/search/select.php?age=' + encodeURI(question));
                result = r2.body.string().match(/答案：./);
            } catch (error) {}
        }

        className('android.widget.RadioButton').depth(depth_option).waitFor();

        if (result) {
            try {
                className('android.widget.RadioButton').depth(depth_option).findOnce(result[0].charCodeAt(3) - 65).click();
            } catch (error) {
                // 如果选项不存在，则点击第一个
                className('android.widget.RadioButton').depth(depth_option).findOne().click();
            }
        } else {
            // 如果没找到结果则选择第一个
            className('android.widget.RadioButton').depth(depth_option).findOne().click();
        }
    }
}

function exam_practise() {
    let ZiXingTi = "选择词语的正确词形。"; //字形题
    let DuYinTi = "选择正确的读音。"; //读音题 20201211
    let ErShiSiShi = "下列不属于二十四史的是。"; //二十四史
    let blankArray = [];
    let question = "";
    let answer = "";
    try {
        if (textStartsWith("填空题").exists()) {
            var questionArray = getFitbQuestion();
            questionArray.forEach(item => {
                if (item != null && item.charAt(0) == "|") { //是空格数
                    blankArray.push(item.substring(1));
                } else { //是题目段
                    question += item;
                }
            });
            question = question.replace(/\s/g, "");
            console.log("题目：" + question);
            answer = search_answer(questionArray[0]);
            if (answer == "" || answer == null) {
                var tipsStr = getTipsStr();
                answer = getAnswerFromTips(questionArray, tipsStr);
            }
            console.info("提示答案：" + answer);
            setText(0, answer.substr(0, blankArray[0]));
            if (blankArray.length > 1) {
                for (var i = 1; i < blankArray.length; i++) {
                    setText(i, answer.substr(blankArray[i - 1], blankArray[i]));
                }
            }
        } else if (textStartsWith("多选题").exists() || textStartsWith("单选题").exists()) {
            var questionArray = getChoiceQuestion();
            questionArray.forEach(item => {
                if (item != null && item.charAt(0) == "|") { //是空格数
                    blankArray.push(item.substring(1));
                } else { //是题目段
                    question += item;
                }
            });
            var options = []; //选项列表
            if (className("ListView").exists()) { //选择题提取答案，为字形题 注音题准备
                className("ListView").findOne().children().forEach(child => {
                    var answer_q = child.child(0).child(2).text(); //此处child(2)为去除选项A.的选项内容，与争上游不同
                    options.push(answer_q);
                });
            } else {
                console.error("答案获取失败!");
                return;
            }
            question = question.replace(/\s/g, "");
            if (question == ZiXingTi.replace(/\s/g, "") || question == DuYinTi.replace(/\s/g, "") || question == ErShiSiShi.replace(/\s/g, "")) {
                question = question + options[0]; //字形题 读音题 在题目后面添加第一选项                
            }
            console.log("题目：" + question);
            var tipsStr = getTipsStr();
            answer = clickByTips(tipsStr);
            console.info("提示中的答案：" + answer);
        }
        delay(0.5 * DEFAULT_DELAY); //随机延时0.5-1秒
        if (text("确定").exists()) { //每日每周答题
            text("确定").click();
            delay(0.5 * DEFAULT_DELAY); //随机延时0.5-1秒
            if (text("下一题").exists()) { //每日答题做错，会先确定，再下一题
                text("下一题").click();
                delay(0.5 * DEFAULT_DELAY); //随机延时0.5-1秒
            }
            if (text("完成").exists()) { //每日答题最后一题做错后的提交
                text("完成").click();
                delay(0.5 * DEFAULT_DELAY); //随机延时0.5-1秒
            }
        } else if (text("下一题").exists()) { //专项答题
            text("下一题").click();
            delay(0.5 * DEFAULT_DELAY); //随机延时0.5-1秒
        } else if (text("完成").exists()) { //专项答题最后一题
            text("完成").click();
            delay(0.5 * DEFAULT_DELAY); //随机延时0.5-1秒
        } else {
            console.warn("未找到右上角按钮，尝试根据坐标点击");
            click(device.width * 0.85, device.height * 0.06); //右上角确定按钮，根据自己手机实际修改
            console.warn("请手动处理");
            delay(5 * DEFAULT_DELAY);
        }
        console.log("---------------------------");
        delay(2 * DEFAULT_DELAY);
    } catch (e) {
        console.error("答题错误，请手动处理！！");
        return;
    }
}

function getFitbQuestion() {
    var questionCollections = className("EditText").findOnce().parent().parent();
    var questionArray = [];
    var findBlank = false;
    var blankCount = 0;
    var blankNumStr = "";
    var i = 0;
    questionCollections.children().forEach(item => {
        if (item.className() != "android.widget.EditText") {
            if (item.text() != "") { //题目段
                if (findBlank) {
                    blankNumStr = "|" + blankCount.toString();
                    questionArray.push(blankNumStr);
                    findBlank = false;
                }
                questionArray.push(item.text());
            } else {
                findBlank = true;
                /*blankCount += 1;*/
                blankCount = (className("EditText").findOnce(i).parent().childCount() - 1);
                i++;
            }
        }
    });
    return questionArray;
}

function search_answer(question) {
    try {
        var res = http.get('https://tishenwang.com/result.php?q=' + encodeURI(question));
    } catch (error) {}
    var video_answer = res.body.string().match(/答案：.+</);
    if (video_answer) video_answer = video_answer[0].slice(4, video_answer[0].indexOf('<'));
    return video_answer;
}

function getTipsStr() {
    var tipsStr = "";
    while (tipsStr == "") {
        if (text("查看提示").exists()) {
            text("查看提示").findOnce().click();
        } else {
            console.error("未找到查看提示");
        }
        if (text("提示").exists()) {
            var tipsLine = text("提示").findOnce().parent();
            //获取提示内容
            var tipsView = tipsLine.parent().child(1).child(0);
            tipsStr = tipsView.text();
            //关闭提示
            tipsLine.child(1).click();
            break;
        }
        delay(DEFAULT_DELAY);
    }
    return tipsStr;
}

function getAnswerFromTips(questionArray, tipsStr) {
    var ansTips = "";
    if (tipsStr.includes(questionArray[0])) {
        tipsStr = tipsStr.slice(tipsStr.indexOf(questionArray[0]));
    }
    console.log(tipsStr);
    for (var i = 1; i < questionArray.length - 1; i++) {
        if (questionArray[i].charAt(0) == "|") {
            var blankLen = questionArray[i].substring(1);
            if (questionArray[i + 1].length == 1) {
                var ansFind = tipsStr.substr(questionArray[i - 1].length, blankLen);
            } else {
                var indexKey = tipsStr.lastIndexOf(questionArray[i + 1]);
                var ansFind = tipsStr.substr(indexKey - blankLen, blankLen);
            }
            /*ansTips += ansFind;*/
            ansTips = ansTips.concat(ansFind);
        }
    }
    return ansTips;
}


function getChoiceQuestion() {
    var questionCollections = className("ListView").findOnce().parent().child(1);
    var questionArray = [];
    questionArray.push(questionCollections.text());
    return questionArray;
}

function clickByTips(tipsStr) {
    var clickStr = "";
    let isFind = false;
    if (className("ListView").exists()) {
        var listArray = className("ListView").findOne().children();
        listArray.forEach(item => {
            var ansStr = item.child(0).child(2).text();
            if (tipsStr.indexOf(ansStr) >= 0) {
                item.child(0).click();
                clickStr += item.child(0).child(1).text().charAt(0);
                isFind = true;
            }
        });
        if (!isFind) { //没有找到 点击第一个
            listArray[0].child(0).click();
            clickStr += listArray[0].child(0).child(1).text().charAt(0);
        }
    }
    return clickStr;
}
