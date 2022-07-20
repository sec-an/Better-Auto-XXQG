
var hamibot={env:{article:false,video:false,day:false,challenge:false,four:false,double:false,local:false,choose:"c",APP_ENV:"production",USER_ID:"",ROBOT_ID:"",SCRIPT_ID:"",TIMESTAMP:""},plan:{name:"免费",onFreeTrial:false,model:"free"},robotName:"",};
hamibot.postMessage=function(){};hamibot.exit=function(){exit();};
auto.waitFor();

importClass(Packages.android.graphics.drawable.GradientDrawable);
importClass(Packages.android.graphics.LinearGradient);
importClass(Packages.android.graphics.Shader);
importClass(Packages.android.graphics.Paint);
importClass(Packages.android.graphics.drawable.LayerDrawable);
var shape = {};

/**
 * android  dp值转换为像素值
 */
function dp2px(context, value) {
    if (value <= 0) {
        return 0;
    }
    var density = context.getResources().getDisplayMetrics().density;
    return value * density + 0.5;
}

/**
 * 返回一个 int 数组
 */
function toJavaIntArray(arr) {
    var javaArr = util.java.array("int", arr.length);
    for (var i = 0; i < arr.length; i++) {
        javaArr[i] = arr[i];
    }
    return javaArr;
}
/**
 * 返回一个 float 数组
 */
function toJavaFloatArray(arr) {
    var javaArr = util.java.array("float", arr.length);
    for (var i = 0; i < arr.length; i++) {
        javaArr[i] = arr[i];
    }
    return javaArr;
}
//渐变方向
var orientationMap = {
    top_bottom: android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM,
    tr_bl: android.graphics.drawable.GradientDrawable.Orientation.TR_BL,
    right_left: android.graphics.drawable.GradientDrawable.Orientation.RIGHT_LEFT,
    br_tl: android.graphics.drawable.GradientDrawable.Orientation.BR_TL,
    bottom_top: android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP,
    bl_tr: android.graphics.drawable.GradientDrawable.Orientation.BL_TR,
    left_right: android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT,
    tl_br: android.graphics.drawable.GradientDrawable.Orientation.TL_BR
};

/**
 * 控件描边、渐变、虚线对象
 */
function JsGradientDrawable(context) {
    JsGradientDrawable.context = context;
    JsGradientDrawable.cornerRadius = 0;
    JsGradientDrawable.strokeWidth = 0;
    JsGradientDrawable.strokeColor = -1;
    JsGradientDrawable.strokeDashWidth = 0;
    JsGradientDrawable.strokeDashGap = 0;
    JsGradientDrawable.color = -1;
    JsGradientDrawable.colors = [];
    JsGradientDrawable.orientation = android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
    JsGradientDrawable.radiusii = [];
    //设置圆角
    JsGradientDrawable.prototype.setCornerRadius = function (radius) {
        JsGradientDrawable.cornerRadius = dp2px(JsGradientDrawable.context, radius);
        return this;
    }
    //设置描边宽度
    JsGradientDrawable.prototype.setStrokeWidth = function (width) {
        JsGradientDrawable.strokeWidth = dp2px(JsGradientDrawable.context, width);
        return this;
    }
    //设置秒变颜色
    JsGradientDrawable.prototype.setStrokeColor = function (strokeColor) {
        JsGradientDrawable.strokeColor = colors.parseColor(strokeColor);
        return this;
    }
    //设置描边长度
    JsGradientDrawable.prototype.setStrokeDashWidth = function (dashWidth) {
        JsGradientDrawable.strokeDashWidth = dp2px(JsGradientDrawable.context, dashWidth);
        return this;
    }
    //设置虚线之间的距离， 为0即为实线
    JsGradientDrawable.prototype.setStrokeDashGap = function (dashGap) {
        JsGradientDrawable.strokeDashGap = dp2px(JsGradientDrawable.context, dashGap);
        return this;
    }
    //设置填充色
    JsGradientDrawable.prototype.setColor = function (color) {
        if (color != undefined && !color.equals("")) {
            JsGradientDrawable.color = colors.parseColor(color);
        }
        return this;
    }
    //设置渐变填充色, 填充色与渐变填充色都设置的话， 优先使用渐变填充色
    JsGradientDrawable.prototype.setColors = function (colorsVal) {
        colorsVal.forEach(function (c) {
            JsGradientDrawable.colors.push(colors.parseColor(c));
        });
        return this;
    }

    //设置渐变方向，默认 上下渐变
    JsGradientDrawable.prototype.setOrientation = function (orientation) {
        var iori = orientationMap[orientation];
        if (iori == undefined) {
            iori = android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
        }
        JsGradientDrawable.orientation = iori;
        return this;
    }

    /**
     * 指定控件位置的圆角
     * 参数为数组， 且 数组长度必须 大于或等于 8
     * arr[0] 控件左上 x方向的圆角
     * arr[1] 控件左上 y方向的圆角
     * 
     * arr[2] 控件右上 x方向的圆角
     * arr[3] 控件右上 y方向的圆角
     * 
     * arr[4] 控件右下 x方向的圆角
     * arr[5] 控件右下 y方向的圆角
     * 
     * arr[6] 控件左下 x方向的圆角
     * arr[7] 控件左下 y方向的圆角
     */
    JsGradientDrawable.prototype.setCornerRadii = function (arr) {
        if (arr != undefined && arr != null) {
            if (arr.length < 8) {
                console.log("数组长度必须大于或等于8个");
            }
            else {
                arr.forEach(function (radius) {
                    JsGradientDrawable.radiusii.push(dp2px(JsGradientDrawable.context, radius));
                });
            }
        }
        return this;
    }

    /**
     * 新增多个 ui 控件 设置同一样式
     */
    JsGradientDrawable.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }

    //给ui 设置样式
    JsGradientDrawable.prototype.into = function (view) {
        view.setBackground(this.getDrawable());
    }

    // 返回一个 GradientDrawable对象
    JsGradientDrawable.prototype.getDrawable = function () {
        var drawable = new GradientDrawable();
        drawable.setCornerRadius(JsGradientDrawable.cornerRadius);
        drawable.setStroke(JsGradientDrawable.strokeWidth, JsGradientDrawable.strokeColor, JsGradientDrawable.strokeDashWidth, JsGradientDrawable.strokeDashGap);
        if (JsGradientDrawable.color != -1) {
            drawable.setColor(JsGradientDrawable.color);
        }
        if (JsGradientDrawable.colors != null && JsGradientDrawable.colors.length > 0) {
            drawable.setColors(toJavaIntArray(JsGradientDrawable.colors));
        }
        drawable.setOrientation(JsGradientDrawable.orientation);
        if (JsGradientDrawable.radiusii != null && JsGradientDrawable.radiusii.length > 0) {
            drawable.setCornerRadii(toJavaFloatArray(JsGradientDrawable.radiusii));
        }
        drawable.setDither(true);//仿抖动
        return drawable;
    }
}

/**
 * 文字渐变对象
 */
function TextColors() {
    //渐变颜色数组
    TextColors.colors = [];
    //设置颜色数组
    TextColors.prototype.setColors = function (colorsVal) {
        colorsVal.forEach(function (c) {
            TextColors.colors.push(colors.parseColor(c));
        });
        return this;
    }

    /**
     * 新增多个 ui 控件 设置同一样式
     */
    TextColors.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }

    TextColors.prototype.into = function (textView) {
        if (TextColors.colors != null && TextColors.colors.length > 0) {
            let jf = new Packages.java.lang.Float(0);
            var mLinearGradient = new LinearGradient(jf, jf, new Packages.java.lang.Float(textView.getPaint().getTextSize() * textView.getText().length), jf, toJavaIntArray(TextColors.colors), null, Shader.TileMode.CLAMP);
            textView.getPaint().setShader(mLinearGradient);
            textView.invalidate();
        }
    }

}

/**
 * 创建 一条虚线对象
 */
function JsLine(context) {
    JsLine.context = context;
    JsLine.strokeColor = -1;
    JsLine.strokeDashWidth = 0;
    JsLine.strokeDashGap = 0;
    JsLine.prototype.setStrokeColor = function (strokeColor) {
        JsLine.strokeColor = strokeColor;
        return this;
    }
    JsLine.prototype.setStrokeDashWidth = function (dashWidth) {
        JsLine.strokeDashWidth = dashWidth;
        return this;
    }
    JsLine.prototype.setStrokeDashGap = function (dashGap) {
        JsLine.strokeDashGap = dashGap;
        return this;
    }

    JsLine.prototype.into = function (view) {
        let params = view.getLayoutParams();
        var drawable = new GradientDrawable();
        let strokeWidth = dp2px(JsLine.context, 2);
        if (params.height == -1 || params.height == -2) {
            params.height = strokeWidth + 2;
            view.setLayoutParams(params);
        } else {
            strokeWidth = params.height - 1;
        }
        drawable.setStroke(strokeWidth, colors.parseColor(JsLine.strokeColor),
            new Packages.java.lang.Float(dp2px(JsLine.context, JsLine.strokeDashWidth)),
            new Packages.java.lang.Float(dp2px(JsLine.context, JsLine.strokeDashGap)));
        drawable.setShape(GradientDrawable.LINE);
        view.setLayerType(1, null);
        view.setBackground(drawable);
    }

    /**
    * 新增多个 ui 控件 设置同一样式
    */
    JsLine.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }
}

/**
 * 拓展样式:  创建一个 渐变描边样式的 对象
 * 如果 单色描边JsGradientDrawable满足
 * 可使用 这个JsLinearGradient 渐变描边
 */
function JsLinearGradient(context) {
    JsLinearGradient.context = context;
    JsLinearGradient.cornerRadius = 0;
    JsLinearGradient.strokeWidth = 0;
    JsLinearGradient.colors = [];
    JsLinearGradient.background = "#FFFFFF";
    JsLinearGradient.orientation = "top_bottom";
    JsLinearGradient.prototype.setCornerRadius = function (radius) {
        JsLinearGradient.cornerRadius = dp2px(JsLinearGradient.context, radius);
        return this;
    }
    JsLinearGradient.prototype.setStrokeWidth = function (width) {
        JsLinearGradient.strokeWidth = dp2px(JsLinearGradient.context, width);
        return this;
    }
    JsLinearGradient.prototype.setColors = function (colorsVal) {
        colorsVal.forEach(function (c) {
            JsLinearGradient.colors.push(c);
        });
        return this;
    }
    JsLinearGradient.prototype.setOrientation = function (orientation) {
        JsLinearGradient.orientation = orientation;
        return this;
    }
    JsLinearGradient.prototype.setBackground = function (color) {
        JsLinearGradient.background = color;
        return this;
    }
    JsLinearGradient.prototype.into = function (view) {
        var bgDrawable = new JsGradientDrawable(JsLinearGradient.context)
            .setColors(JsLinearGradient.colors)
            .setCornerRadius(JsLinearGradient.cornerRadius)
            .setOrientation(JsLinearGradient.orientation)
            .getDrawable();

        var foreDrawable2 = new JsGradientDrawable(JsLinearGradient.context)
            .setCornerRadius(JsLinearGradient.cornerRadius)
            .setColors(["#FFFFFF", "#FFFFFF"])
            .getDrawable();

        var foreDrawable = new JsGradientDrawable(JsLinearGradient.context)
            .setCornerRadius(JsLinearGradient.cornerRadius)
            .setColor(JsLinearGradient.background)
            .getDrawable();
        var width = JsLinearGradient.strokeWidth;
        var layerDrawable = new LayerDrawable([bgDrawable, foreDrawable2, foreDrawable]);
        layerDrawable.setLayerInset(1, width, width, width, width);
        layerDrawable.setLayerInset(2, width, width, width, width);
        view.setLayerType(1, null);
        view.setBackground(layerDrawable);
    }

    /**
     * 新增多个 ui 控件 设置同一样式
     */
    JsLinearGradient.prototype.intos = function (views) {
        for (let index = 0; index < views.length; index++) {
            this.into(views[index]);
        }
    }
}

shape.withGradientDrawable = function (context) {
    return new JsGradientDrawable(context);
}

shape.withText = function () {
    return new TextColors();
}

shape.withLinearGradient = function (context) {
    return new JsLinearGradient(context);
}

shape.withLine = function (context) {
    return new JsLine(context);
}
const control = createWindow.prototype;
control.viewArr = [];
control.x = 0;
control.y = 0;
control.w = Math.floor(device.width*0.5);
control.h = Math.floor(device.height*0.2);
control.i = 100;
control.setPosition = function(x, y) {
    this.window.setPosition(x, y);
    this.x = x;
    this.y = y;
}
control.setSize = function(w, h) {
    let time = new Date().getTime();
    if (this.setSizeTime) {
        //设置调整悬浮大小的时间间隔，以免卡顿
        if (time - this.setSizeTime < 50) return false;
    }
    this.setSizeTime = time;
    this.window.setSize(w, h);
    this.w = w;
    this.h = h;
}
control.addView = function(data) {
    let text = data.text || "";
    let color = data.color || "#ffffff";
    if (this.showDate) {
        text = formatDate(new Date()) + data.sign + text;
    } else if (this.showSign) {
        text = data.sign + text;
    }
    ui.run(() => {
        let view = ui.inflate(
            '<text layout_gravity="center" padding="0" marginBottom="0px" />', this.window.content, false);
        view.setText(text);
        view.setTextColor(colors.parseColor(color));
        view.setTextSize(this.textSize || 13);
        this.window.content.addView(view);
        this.viewArr.push(view);
        setTimeout(() => {
            //添加完控件后不能立即滚动页面，需要等绘制到页面中后。
            this.window.scroll.fullScroll(android.widget.ScrollView.FOCUS_DOWN);
        }, 50);
        if (this.viewArr.length > (this.i)) this.delView();
    })
}
control.delView = function() {
    if (this.viewArr.length === 0) return false;
    ui.run(() => {
        this.window.content.removeView(this.viewArr.shift());
    });
}
control.clear = function(s) {
    let i = this.viewArr.length;
    let sid = setInterval(() => {
        if (i <= 0) {
            return clearInterval(sid);
        }
        i--;
        this.delView();
    }, s || 20);
}

let window = floaty.rawWindow(
    '<frame id="vi" w="*" h="*"  padding="0 0 0 0" >\
        <LinearLayout layout_width="match_parent" layout_height="match_parent" orientation="vertical">\
            <LinearLayout padding="10 5 10 5" id="bart" bg="#ee000011" w="*" h="auto" margin="0" >\
                <text id="bear" text="log" textColor="#ffffff" layout_weight="1" />\
                <text w="auto" textColor="#FFFFFF" id="exit" text="退出" padding="0" margin="0" />\
            </LinearLayout>\
            <ScrollView id="scroll" padding="0" margin="0" layout_weight="1">\
                <LinearLayout padding="2 0 2 0" id="content"  orientation="vertical">\
                </LinearLayout>\
            </ScrollView>\
        </LinearLayout>\
    </frame>'
);

window.exit.on('click', function() {
    window.close();
    toastLog('脚本结束');
    question_list = null;
    exit();
});
ui.run(()=>{
    shape.withGradientDrawable(context)
        .setColor("#cc000000")
        .setCornerRadii([20, 20, 20, 20, 20, 20, 20, 20])
        .into(window.vi);
    shape.withGradientDrawable(context)
        .setColors(["#6200ee", "#ef4e4f"])
        .setOrientation("tl_br")
        .setCornerRadius(5);
    shape.withGradientDrawable(context)
        .setCornerRadii([20, 20, 20, 20, 0, 0, 0, 0])
        .into(window.bart);
    shape.withLinearGradient(context)
        .setColors(["#6200ee", "#ef4e4f"])
        .setStrokeWidth(2)
        .setCornerRadius(30)
        .setOrientation("tl_br");
});
function createWindow() {
    let control = Object.create(createWindow.prototype);
    control.window = window;
    control.viewArr = [];
    window.setSize(control.w, control.h);
    window.setPosition(control.x, control.y);
    return control;
}

function suur() {
    //绑定events.emitter()
    events.__asEmitter__(this);
    this.control = createWindow();

    bs(this.control.window.bear, () => this.control.x, () => this.control.y, (x, y) => {
        if (x < 0) x = 0;
        if (x > device.width) x = device.width - 1;
        if (y < 0) y = 0;
        if (y > device.height) y = device.height - 1;
        this.control.setPosition(x, y);
        asyncEmit(this, 'bear-move', x, y);
    });
    
    this.control.window.exit.on('click', () => {
        asyncEmit(this, 'close');
    });


    //公开属性
    this.window = this.control.window;
    this.content = this.window.content;
    this.butColse = this.window.exit;
    this.title = this.window.bear;
}
suur.prototype.getContent = function(i) {
    if (i >= 0) {
        return this.control.viewArr[i].text();
    } else if (i < 0) {
        return this.control.viewArr[this.control.viewArr.length + i].text();
    } else {
        return this.control.viewArr.map((v) => v.text());
    }
}
suur.prototype.setMaxContent = function(i) {
    this.control.i = i;
}
suur.prototype.showSign = function(b) {
    this.control.showSign = b;
}
suur.prototype.showDate = function(b) {
    this.control.showDate = b;
}
suur.prototype.setTextSize = function(l) {
    if (!(l>0)) throw new Error('设置字体参数不合法');
    this.control.textSize = l;
}
suur.prototype.close = function() {
    this.control.window.exit.emit('click');
}
suur.prototype.log = function() {
    let text = util.format.apply(util, arguments);
    this.control.addView({
        text: text,
        color: "#ffffff",
        sign: "/D: "
    });
  	console.log(text)
    asyncEmit(this, 'print-log', text);
    asyncEmit(this, 'print', text);
}
suur.prototype.info = function() {
    let text = util.format.apply(util, arguments);
    this.control.addView({
        text: text,
        color: "#64dd17",
        sign: "/I: "
    });
  	console.info(text);
    asyncEmit(this, 'print-info', text);
    asyncEmit(this, 'print', text);
}
suur.prototype.verbose = function() {
    let text = util.format.apply(util, arguments);
    this.control.addView({
        text: text,
        color: "#c8c8c8",
        sign: "/V: "
    });
  	console.log(text);
    asyncEmit(this, 'print-verbose', text);
    asyncEmit(this, 'print', text);
}
suur.prototype.warn = function() {
    let text = util.format.apply(util, arguments);
    this.control.addView({
        text: text,
        color: "#2962ff",
        sign: "/W: "
    });
  	console.warn(text);
    asyncEmit(this, 'print-warn', text);
    asyncEmit(this, 'print', text);
}
suur.prototype.error = function() {
    let text = util.format.apply(util, arguments);
    this.control.addView({
        text: text,
        color: "#d50000",
        sign: "/E: "
    });
  	console.error(text);
    asyncEmit(this, 'print-error', text)
    asyncEmit(this, 'print', text);
}
suur.prototype.clear = function() {
    this.control.clear();
    asyncEmit(this, 'print-clear');
}

suur.prototype.hide = function() {
    if (this.control.hide) return false;
    let h = this.control.y + this.control.h + 200;
    this.control.hide = h;
    h = h / 100;
    let i = 0;
    let sid = setInterval(() => {
        this.control.setPosition(this.control.x, this.control.y - h);
        i++;
        if (i >= 100) {
            asyncEmit(this, 'hide');
            return clearInterval(sid);
        }
    }, 1);
}
suur.prototype.show = function() {
    if (!this.control.hide) return false;
    let h = this.control.hide;
    this.control.hide = undefined;
    h = h / 100;
    let i = 0;
    let sid = setInterval(() => {
        this.control.setPosition(this.control.x, this.control.y + h);
        i++;
        if (i >= 100) {
            asyncEmit(this, 'show');
            return clearInterval(sid);
        }
    }, 1);
}


function bs(view, getWX, getHY, callback) {
    let x, y, x2, y2, time;
    let longClick;
    view.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                x2 = getWX();
                y2 = getHY();
                time = new Date().getTime();
                longClick = false;
                return true;
            case event.ACTION_MOVE:
                let time2 = new Date().getTime();
                if (!longClick && time2 > 1500) {
                    longClick = true;
                    view.emit('longClick');
                }
                let x1 = event.getRawX() + x2 - x;
                let y1 = event.getRawY() + y2 - y;
                callback(x1, y1, time2 - time);
                return true;
            case event.ACTION_UP:
                if (new Date().getTime() - time < 100) {
                    view.emit('click');
                }
                return true;
        }
        return true;
    });
}

function asyncEmit(event, eventName) {
    return Promise.resolve()
        .then(() => event.emit.apply(
            event, Array.prototype.slice.call(arguments, 1)))
}

function formatDate(date) {
    let sdf = new java.text.SimpleDateFormat('HH:mm:ss');
    return sdf.format(date);
}
setInterval(() => {}, 1000);
let s = new suur;
s.on('close', function() {
    exit();
});
s.setMaxContent(8); //设置储存条目数，默认100
s.showDate(true); //设置显示时间
s.showSign(true); //设置显示标志
s.setTextSize(12); //设置文字大小

//获取日志框内容，-1表示最后一条，0为第一条
// s.getContent(-1);
// 以上为 autojsPro 代码商城开源代码 -> 悬浮控制台 原作者：@selp
// 十二 -> 修改部分内容，简化控制台
////////////////////////////////////////////////////////////

/**
 * @description: 视频学习秒数
 */
var video_s = hamibot.env.video_s*1;
if(!video_s) video_s = 6;
/**
 * @description: 文章学习秒数
 */
var article_s = hamibot.env.article_s*1;
if(!article_s) article_s = 45;
/**
 * @description: 文章学习篇数
 */
var article_num = 1;

/**
 * @description: 视频学习篇数
 */
var video_num = 1;

/**
 * @description: 每日答题次数
 */
var daily_num = 1;

/**
 * @description: 每周答题次数
 */
var week_num = 1;

/**
 * @description: 专项答题次数
 */
var special_num = 1;

/**
 * @description: 挑战答题次数
 */
var challenge_num = 1;

var challenge_loop_num = hamibot.env.challenge_loop_num;
if(!challenge_loop_num || challenge_loop_num <=0) challenge_loop_num = 5;
/**
 * @description: 四人赛答题次数
 */
var four_num = 1;

/**
 * @description: 双人人赛答题次数
 */
var double_num = 1;

/**
 * @description: 订阅次数
 */
var sub_num = 2;

/**
 * @description: 分享次数
 */
var share_num = 0;

/**
 * @description: 评论观点次数
 */
var standpoint_num = 1;

/**
 * @description: 本地频道
 */
var local_num = 1;

/**
 * @description: 四人双人单题答题延迟时间
 */
var delay_time = hamibot.env.delay_time;
if(!delay_time) delay_time = 0;

/**
 * @description: 本地题库存储->[num,[question,answer]]
 */
var storage1 = storages.create('Twelve:question');

/**
 * @description: 本地文字识别内容对应题库->[question,answer]
 */
var storage2 = storages.create('Twelve:local');
/**
 * @description: 题库列表
 */
var question_list = [];

/**
 * @description: 题是否为读音字形
 */
var yinzi = false;

/**
 * @description: 是否第一题
 */
var first = true;

/**
 * @description: 四人/双人 记录当前题目
 */
var old_q = '';

/**
 * @description: 四人/双人 记录当前题目答案
 */
var old_ans = '';

/**
 * @description: OCR模式选择
 */
var choose = hamibot.env.choose;
if(!choose){choose = 'c';}

/**
 * @description: 选项错字替换
 */
var replace = null;
replace = function(answers){
    if(answers.indexOf('氨')!=-1&&answers.indexOf('氮')!=-1) answers = answers.replace(/氨/g, "氦");
    if(answers.indexOf('戈')!=-1&&answers.indexOf('矛')!=-1) answers = answers.replace(/载/g, "戟");
    if(answers.indexOf('泰')!=-1&&answers.indexOf('樱')!=-1) answers = answers.replace(/泰/g, "菽");
    if(answers.indexOf('缘')!=-1&&answers.indexOf('舜')!=-1) answers = answers.replace(/缘/g, "鲧");
    if(answers.indexOf('放松活动')!=-1&&answers.indexOf('基本活动')!=-1) answers = answers.replace(/一/g, "");
    if(answers.indexOf('辑拿')!=-1&&answers.indexOf('绳拿')!=-1) answers = answers.replace(/绳拿/g, "缉拿");
    if(answers.indexOf('黄海')!=-1&&answers.indexOf('潮海')!=-1) answers = answers.replace(/潮海/g, "渤海");
    answers = answers.replace(/祖击手/g, "狙击手");
    answers = answers.replace(/姓款/g, "账款");
    answers = answers.replace(/对筹公堂/g, "对簿公堂");
    answers = answers.replace(/嘎岭/g, "嘌呤");
    answers = answers.replace(/此呢风云/g, "叱咤风云");
    answers = answers.replace(/溶炼/g, "淬炼");
    answers = answers.replace(/声名鸽起/g, "声名鹊起");
    answers = answers.replace(/声名韵起/g, "声名鹊起");
    answers = answers.replace(/貂鲜/g, "貂蝉");
    answers = answers.replace(/cuotud/g, "cuōtuó");
    answers = answers.replace(/悠气/g, "憋气");
    answers = answers.replace(/0型/g, "O型");
    answers = answers.replace(/o型/g, "O型");
    answers = answers.replace(/既往不智/g, "既往不咎");
    answers = answers.replace(/继脚石/g, "绊脚石");
    answers = answers.replace(/演合/g, "凑合");
    answers = answers.replace(/刘翻/g, "刘勰");
    answers = answers.replace(/情懒/g, "慵懒");
    answers = answers.replace(/河汉/g, "河汊");
    answers = answers.replace(/谢肌/g, "谢朓");
    answers = answers.replace(/绎脚石/g, "绊脚石");
    answers = answers.replace(/修营/g, "修葺");
    answers = answers.replace(/斐秀/g, "裴秀");
    answers = answers.replace(/翡秀/g, "裴秀");
    answers = answers.replace(/奴婢bi/g, "奴婢bì");
    answers = answers.replace(/奴bi/g, "奴婢bì");
    answers = answers.replace(/杯盘狼精/g, "杯盘狼藉");
    answers = answers.replace(/有特无恐/g, "有恃无恐");
    answers = answers.replace(/荷子/g, "荀子");
    answers = answers.replace(/蒸馅水/g, "蒸馏水");
    answers = answers.replace(/粗扩/g, "粗犷");
    answers = answers.replace(/哆峻/g, "啰唆");
    answers = answers.replace(/點然失色/g, "黯然失色");
    answers = answers.replace(/chaigian/g, "chaiqian");
    answers = answers.replace(/差造/g, "差遣");
    answers = answers.replace(/青营素/g, "青蒿素");
    answers = answers.replace(/奴购/g, "奴婢");
    answers = answers.replace(/嘴之以鼻/g, "嗤之以鼻");
    answers = answers.replace(/款收/g, "歉收");
    answers = answers.replace(/链而走险/g, "铤而走险");
    answers = answers.replace(/母康置疑/g, "毋庸置疑");
    answers = answers.replace(/JI/g, "川");
    answers = answers.replace(/叫苦不送/g, "叫苦不迭");
    answers = answers.replace(/虫胡/g, "蝴");
    answers = answers.replace(/鱼鲤/g, "鱼鳔");
    answers = answers.replace(/沉缅/g, "沉湎");
    answers = answers.replace(/表秀/g, "裴秀");
    answers = answers.replace(/泽炼/g, "淬炼");
    answers = answers.replace(/bu/g, "bù");
    answers = answers.replace(/夏然而止/g, "戛然而止");
    answers = answers.replace(/垫伏/g, "蛰伏");
    answers = answers.replace(/从我/g, "从戎");
    answers = answers.replace(/跨踏/g, "踌躇");
    answers = answers.replace(/漂岭/g, "嘌呤");
    answers = answers.replace(/快密/g, "诀窍");
    answers = answers.replace(/决密/g, "诀窍");
    answers = answers.replace(/令媛/g, "令嫒");
    answers = answers.replace(/朱捷/g, "朱棣");
    answers = answers.replace(/雾淞/g, "雾凇");
    answers = answers.replace(/.阳湖/g, "潘阳湖");
    answers = answers.replace(/赔然失色/g, "黯然失色");
    answers = answers.replace(/相形见细/g, "相形见绌");
    answers = answers.replace(/饮鸽止渴/g, "饮鸩止渴");
    answers = answers.replace(/何族/g, "侗族");
    answers = answers.replace(/切碳/g, "切磋");
    answers = answers.replace(/不胜而走/g, "不胫而走");
    answers = answers.replace(/\+/g, "十");
    answers = answers.replace(/李诚/g, "李诫");
    answers = answers.replace(/晖红/g, "蹿红");
    answers = answers.replace(/蹄红/g, "蹿红");
    return answers;
}
/**
 * @description: 看门狗时长
 */
var watchdog_time = hamibot.env.watchdog_time*1*1000;
if(!watchdog_time) watchdog_time=2000*1000;
/**
 * @description: 百度ocr access_token
 */
var token="";

/**
 * @description: 判断是否过验证了
 */
var captcha = false;

/**
 * @description: 随机延迟
 * @param: seconds-延迟秒数[a,a+1]
 */
function delay(a){
    sleep(a*1000+Math.random()*1000);
}
/**
 * @description: 得到各项次数
 */
function get_all_num(){
    s.info('正在获取分数情况');
    delay(1);
    if (id("comm_head_xuexi_score").exists()) {
        id("comm_head_xuexi_score").findOnce().click();
    } else if (text("积分").exists()) {
        text("积分").findOnce().parent().child(1).click();
    }
    delay(1);
    if(text('知道了').exists()){
        text('知道了').click();
    }
    // var score_id = id('comm_head_xuexi_score').findOne(5000);
    // score_id.click();
    text('登录').waitFor();
    delay(1);
    var score = {};
    var list_view = className("android.widget.ListView").findOne(5000);
    var texts = "";
    if(arguments.length>=2){    // 返回分数情况->PushDeer
        try{
            texts += "成长总积分:"+text('成长总积分').depth(21).findOne(1000).parent().child(3).text() + "%0A";
        }catch(e){}
        texts += textContains("今日已累积").findOne().text();
    }
    for(var i = 0;i<list_view.childCount();i++){
        var son = list_view.child(i);
        try {
            var names = son.child(0).child(0).text();
        } catch (e) {
            var names = son.child(0).text();
        }
        var sx = son.child(2).text().split("/")[0].match(/[0-9][0-9]*/g);
        score[names] = Number(sx);
        if(arguments.length>=2){    // 返回分数情况->PushDeer
            texts += '%0A - '+names+':'+son.child(2).text().split("/")[0].match(/[0-9][0-9]*/g)+'/'+son.child(2).text().split("/")[1].match(/[0-9][0-9]*/g);
            if(i == list_view.childCount()-1){
                back_table();
                return texts;
            } 
        }
    }
    video_num = 6-score['视听学习'];
    if(arguments.length>=1){
        article_num = Math.ceil((12-score['我要选读文章']));
    }
    else{
        article_num = Math.ceil((12-score['我要选读文章'])/2);
    }
    daily_num = (5-score['每日答题'])?1:0;
    week_num = score['每周答题']?0:1;
    special_num = score['专项答题']?0:1;
    challenge_num = (5-score['挑战答题'])?1:0;
    four_num = score['四人赛']?0:1;
    double_num = score['双人对战']?0:1;
    sub_num = 2 - score['订阅'];
    standpoint_num = 1-score['发表观点'];
    local_num = 1 - score['本地频道'];
    // share_num = score['分享']?0:2;
    s.log('文章学习:'+article_num+'次');
    s.log('视频学习:'+video_num+'次');
    s.log('每日答题:'+daily_num+'次');
    // s.log('每周答题:'+week_num+'次');
    // s.log('专项答题:'+special_num+'次');
    s.log('挑战答题:'+challenge_num+'次');
    s.log('四人赛  :'+four_num+'次');
    s.log('双人对战:'+double_num+'次');
    back();
    s.info('获取完成');
    delay(2);
}
var article_list = [];
/**
 * @description: 已读文章判断
 * @param: 文章名字 X 
 */
function article_check(x){
    for(var i = 0;i<article_list.length;i++){
        if(article_list[i] == x) return true;
    }
    article_list.push(x);
    return false;
}
var commits = ['为人民服务，，，，','增强才干，增强本领，广大农村大有可为','富强、民主、文明、和谐','自由、平等、公正、法治','爱国、敬业、诚信、友善','弘扬社会主义核心价值观'];
/**
 * @description: 文章学习
 * @param: 第xxx次学习
 */
function study_article(){
    if(article_num==0 || !hamibot.env.article) return;
    s.info('正在文章学习');
    back_table();
    delay(2);
    start_close_radio(true);
    delay(2);
    desc('工作').click();
    delay(2);
    click('推荐');
    s.warn('还需要学习'+article_num+'篇文章');
    var x = 0;
    while(article_num>0){
        while(article_num>0){
            var b = text('播报').findOnce(x);
            if(b){
                var names =  b.parent().parent().parent().child(0).text();
                if(!article_check(names)){
                    delay(1);
                    var tmp = b.parent().parent().parent().child(0).parent().parent().click();
                    if(!tmp){
                        x++;
                        continue;
                    }
                    delay(3);
                    var show = textContains('2022 年').findOne(10);
                    if(!show){s.warn('没有加载出文章，返回');}
                    else{
                        var t = article_s+Math.floor(Math.random()*5+1);
                        s.info('当前第'+(7-article_num)+'篇文章,本篇文章学习'+t+'s');
                        for(var i = 0 ; i < t;){
                            sleep(1000);
                            while(!textContains("欢迎发表你的观点").exists()){
                                s.error('已离开文章界面');
                                delay(5);
                            }
                            var tmp = Math.random();
                            try{
                                if(tmp>0.9){
                                    swipe(3*device.width/4,3*device.height/4+Math.random()*100,3*device.width/4,device.height/4-Math.random()*100,Math.random()*1000);
                                }else if(tmp < 0.1){
                                    swipe(3*device.width/4,device.height/4+Math.random()*100,3*device.width/4,3*device.height/4-Math.random()*100,Math.random()*1000);
                                }
                            }catch(e){}
                            i++;
                            if(i%5==0){
                                s.log('已经学习文章'+i+'s,'+'还剩'+(t-i)+'s');
                            }
                        }
                        article_num--;
                        if(standpoint_num>0){
                            s.info('开始发表观点');
                            try{
                                var commit = text('观点').findOne(3000).parent().parent().child(2).child(1).child(0).text();
                            }catch(e){
                                var commit = commits[random(0,commits.length-1)];
                            }
                            standpoint_num--;
                            text('欢迎发表你的观点').click();
                            delay(2);
                            setText(commit);
                            delay(1);
                            click("发布");
                            delay(2);
                            click("删除");
                            delay(2);
                            click("确认");
                            s.info('发表观点完成');
                        }
                        if(share_num>0){
                            s.info('开始分享');
                            delay(2);
                            share_num--;
                            className('ImageView').depth(10).drawingOrder(4).click();
                            delay(1);
                            click("分享到学习强国");
                            delay(1);
                            back();
                            s.info('分享完成');
                        }
                    }
                    delay(2);
                    back();
                    delay(2);
                }
                x++;
            }
            else{
                x = 0;
                className("ListView").scrollForward();
                delay(2);
            }
        }
        s.info('正在检查是否完成');
        delay(5);
        article_s = 6+random(0,6);  // 文章未完成
        get_all_num(1);
    }
    s.info('文章学习完成');
    start_close_radio(false);
    delay(2);
}
/**
 * @description: 本地频道
 */
function local_(){
    if(local_num == 0 || !hamibot.env.local) return;
    s.info('开始本地频道');
    back_table();
    desc('工作').click();
    delay(2);
    text("要闻").findOne().parent().parent().child(3).click();
    delay(2);
    try{
        className("android.support.v7.widget.RecyclerView").findOne(500).child(0).click();
    }
    catch(e){
        try{
            className("androidx.recyclerview.widget.RecyclerView").findOne(500).child(0).click();
        }catch(e){}
    }
    delay(2);
    back_table();
    s.info('本地频道完成');
    delay(2);
}
/**
 * @description: 视频学习
 */
function study_video(){
    if(video_num == 0 || !hamibot.env.video) return;
    s.info('开始视频学习');
    back_table();
    s.warn('还需学习'+(video_num)+'篇视频');
    delay(2);
    click('百灵');
    delay(2);
    click('推荐');
    delay(2);
    while(video_num>0){
        while(video_num>0){
            s.info('当前第'+(7-video_num)+'篇');
            delay(2);
            try{
                className('android.widget.FrameLayout').clickable(true).depth(22).findOnce(0).click();
            }
            catch(e){
                className('android.widget.FrameLayout').clickable(true).depth(22).findOnce(1).click();
            }
            delay(2);
            var t = video_s+random(0,5);
            for(var i = 0 ;i<t;){
                sleep(1000);
                while(!text('播放').exists()){
                    s.error('已离开视频界面');
                    delay(5);
                }
                i++;
                s.log('已经学习视频'+i+'s,'+'还需'+(t-i)+'s');
            }
            back();
            video_num --;
            delay(1);
            className("ListView").depth(21).findOne().scrollForward();
            delay(1);
            className("ListView").depth(21).findOne().scrollForward();
            delay(1);
        }
        delay(5);
        s.info("正在获取是否完成");
        get_all_num();
    }
    s.info('视频学习完成');
    delay(2);
}

/**
 * @description: 每周专项获取提示答案列表
 * @author:Lejw
 * @return:答案列表
 */
 function getAnsList() {

    ansField=className("android.view.View").clickable(true).depth(23).indexInParent(0).findOne()
    var ans=ansField.bounds()
    var x=ans.left
    var y=ans.top
    var h=ans.bottom-ans.top
    var w=ans.right-ans.left
    var img = images.clip(captureScreen(),x,y,w,h);//裁切提示
    img=images.interval(img, "#FD1111", 60)//图片二值化
  //   images.save(img,'/sdcard/1.png')
    var ansLis=[]
    if (choose == 'a') {
        //TODO：HUAWEI_OCR 
    } else if (choose == 'b') {
        //TODO: THIRD_PARTY_OCR
    } else if (choose == 'c') {
        ansList=hamibot_ocr_api_return_list(img);
    } else {
        var token=get_baidu_token(hamibot.env.client_id,hamibot.env.client_secret);
        ansList=baidu_ocr_api_return_list(img,token);
    }
    retList =[];
    if(ansList.length!=0) {//处理连续字符串换行合并
        rawAns=ansField.text();
        retList.push(ansList[0]);
        for (let i=1;i<ansList.length;i++) {
            str=ansList[i-1]+ansList[i]
            if(rawAns.indexOf(str)!=-1) {
                retList.push(retList.pop()+(ansList[i]));
            }else {
              retList.push(ansList[i]);
            }
    //       console.log(rawAns.lastIndexOf(str.substr(str.length-1,1)),rawAns.indexOf(ansList[i][0]))
    // 			if(rawAns.lastIndexOf(str.substr(str.length-1,1))==rawAns.indexOf(ansList[i][0])-1) {
    //       	retList.push(retList.pop()+(ansList[i]));
    //       }else {
    //         retList.push(ansList[i]);
    //       }
        }
    }
    return retList
  }


/**
 * @description: 获取专项提示答案列表
 * @author:Lejw
 * @return:答案列表
 */
 function getSpecialAnsList() {
    auto.waitFor();
    ansField=className("android.view.View").clickable(true).depth(22).indexInParent(0).findOne()
    rawAns=ansField.text()
    s.log(rawAns)
    var ans=ansField.bounds()
    var x=ans.left
    var y=ans.top
    var h=ans.bottom-ans.top
    var w=ans.right-ans.left
    s.log(x,y,h,w)
    var img = images.clip(captureScreen(),x,y,w,h);//裁切提示
    img=images.interval(img, "#FD1111", 60)//图片二值化
    images.save(img,'/sdcard/1.png')
    var ansLis=[]
    if (choose == 'a') {
      //TODO：HUAWEI_OCR 
    } else if (choose == 'b') {
      //TODO: THIRD_PARTY_OCR
    } else if (choose == 'c') {
      ansList=hamibot_ocr_api_return_list(img);
    } else {
      var token=get_baidu_token(hamibot.env.client_id,hamibot.env.client_secret);
        ansList=baidu_ocr_api_return_list(img,token)
    }
    retList =[];
    if(ansList.length!=0) {//处理连续字符串换行合并
      retList.push(ansList[0]);
      for (let i=1;i<ansList.length;i++) {
        str=ansList[i-1]+ansList[i]
        if(rawAns.indexOf(str)!=-1) {
            retList.push(retList.pop()+(ansList[i]));
        }else {
          retList.push(ansList[i]);
        }
  //       console.log(rawAns.lastIndexOf(str.substr(str.length-1,1)),rawAns.indexOf(ansList[i][0]))
  // 			if(rawAns.lastIndexOf(str.substr(str.length-1,1))==rawAns.indexOf(ansList[i][0])-1) {
  //       	retList.push(retList.pop()+(ansList[i]));
  //       }else {
  //         retList.push(ansList[i]);
  //       }
      }
    }
    return retList
  }
  
/**
 * @description: 每日答题 - 单题
 */
function click_daily(){
    var xxxxxxxxxx = '';
    var click_true = false;
    text("查看提示").findOne().click();
    var tips = text("提示").findOne().parent().parent().child(1).child(0).text();
    delay(1);
    back();
    delay(1);
    if(textContains('选题').exists()){
        className("ListView").findOne().children().forEach(option=>{
            if(tips.indexOf(option.child(0).child(2).text())!=-1){
                xxxxxxxxxx+=option.child(0).child(2).text();
                option.child(0).click();
                click_true = true;
            }
        })
        if(click_true == false){
            className("ListView").findOne().child(0).child(0).click();
        }
        s.log('答案:'+xxxxxxxxxx);
    }
    else{
        var q_list = [];
        var space_num = [];
        className("EditText").findOnce().parent().parent().children().forEach(item => {
            if(item.childCount() == 0){
                q_list.push(item.text());
            }
            else{
                q_list.push('@'+(item.childCount()-1));
                space_num.push((item.childCount()-1));
            }
        })
        var ans = '';
        for(var i = 1 ; i <q_list.length-1;i++){
            if(q_list[i][0]=='@'){
                var ss = q_list[i-1].substr(Math.max(0, q_list[i - 1].length - 5), 5);
                var aaa = tips.indexOf(ss) + ss.length;
                var aaaa = tips.substr(aaa, Number(q_list[i][1]));
                ans += aaaa;
            }
        }
        if(ans==''){ans = "没有找到答案！！！"}
        s.log('答案:'+ans);
        setText(0, ans.substr(0, space_num[0]));
        if (space_num.length > 1) {
            for (var i = 1; i < space_num.length; i++) {
                setText(i, ans.substr(space_num[i - 1], space_num[i]));
            }
        }
    }
    delay(1);
    text('确定').findOne().click();
    delay(0.5);
    if(text('下一题').exists()){
        click('下一题');
    }
    if(text('完成').exists()){
        click('完成');
    }
    delay(1);
}
/**
 * @description: 每日答题
 */
function daily_Answer(){
    if(daily_num == 0 || !hamibot.env.day) return;
    s.info('开始每日答题');
    questionShow();
    delay(1);
    text('每日答题').findOne().parent().click();
    delay(3);
    var x = 0;
    while(true){
        click_daily();
        x++;
        if(x>=5){
            text("再来一组").waitFor()
            delay(3);
            if (!text("领取奖励已达今日上限").exists()) {
                s.warn('积分未满，再答一次');
                x=0;
                text("再来一组").click();
                delay(2);
            }else {
                text("返回").click();
                delay(2);
                break;
            }
        }
    }
    s.info('每日答题结束');
    delay(2);
}
/**
 * @description: 挑战 单题答题
 */
function challenge_loop(x){
    yinzi = false;
    if(x>challenge_loop_num){
        s.info('答题次数已满，随机点击');
        var tmp = className("ListView").findOne().childCount();
        className("ListView").findOne().child(random(0,tmp-1)).child(0).child(0).click();
    }
    else{
        reg = /下列..正确的是.*/g;
        reb = /选择词语的正确.*/g;
        rea = /选择正确的读音.*/g;
        rec = /下列不属于二十四史的是.*/g;
        var question = className("ListView").findOnce().parent().child(0).text();
        if (rec.test(question) || reg.test(question) || rea.test(question) || reb.test(question)) {
            yinzi = true;
            question = '';
            className("ListView").findOne().children().forEach(option=>{
                question += option.child(0).child(1).text();
            })
        }
        var similars = 0;
        var answer = '';
        for(var i = 0 ; i<question_list.length;i++){
            var tmp = similarity(question_list[i][1],question_list[i][0],question,yinzi);
            if(tmp>similars){
                similars = tmp;
                answer = question_list[i][0];
            }
        }
        s.log('答案：'+answer);
        var option = className("ListView").findOne();
        var click_option = 0;
        var similars = 0;
        for(var i=0;i<option.childCount();i++){
            var tmp = similarity_answer(option.child(i).child(0).child(1).text(),answer);
            if(tmp>similars){
                similars = tmp;
                click_option = i;
            }
        }
        option.child(click_option).child(0).child(0).click();
    }
    
}


/**
 * @description: 专项答题 - 单题
 * @author:Lejw
 */
 function click_special(){
    var xxxxxxxxxx = '';
    var click_true = false;
    text("查看提示").findOne().click();
  	delay(1);
    var ansList=getSpecialAnsList();
    back();
    delay(1);
    if(textContains('选题').exists()){
      	var tips='';
      	ansList.forEach(x=>{
          tips+=x;
        })
        className("ListView").findOne().children().forEach(option=>{
            if(tips.indexOf(option.child(0).child(2).text())!=-1){
                xxxxxxxxxx+=option.child(0).child(2).text();
                option.child(0).click();
                click_true = true;
            }
        })
        if(click_true == false){
            className("ListView").findOne().child(0).child(0).click();
        }
        s.log('答案:'+xxxxxxxxxx);
    }
    else{
        for(let i=0;i<ansList.length;i++) {
          setText(i, ansList[i]);
        }
    }
    delay(0.5);
    if(text('下一题').exists()){
        click('下一题');
    }
    if(text('完成').exists()){
        click('完成');
    }
    delay(1);
}


/**
 * @description: 查找每周答题入口
 * @Author: Lejw
 */
function checkWeekEntry(){
    let tryTime=10;
    while(tryTime) {
        tryTime--;
        delay(1);
        if(text("未作答").exists()) {
            s.log("进入答题");
            text('未作答').findOne().parent().click();
            return true;
        }
        gesture(500, [100, 1300], [100, 200]);
    }
    s.log("没有未完成题目");
    return false;
}
/**
 * @description: 查找专项答题入口
 * @Author: Lejw
 */
function checkSpecialEntry(){
    let tryTime=10
    while(tryTime) {
        tryTime--;
        delay(1);
        if(text("开始答题").exists()) {
            s.log("进入答题");
            text('开始答题').findOne().click();
            return true;
        }
        if(text("继续答题").exists()) {
            s.log("继续答题");
            text('继续答题').findOne().click();
            return true;
        } 
        gesture(500, [100, 1300], [100, 200]);
    }
    s.log("没有未完成题目")
    return false;
}
  
  

/**
 * @description: 每周答题 - 单题
 * @author:Lejw
 */
function click_week(){
    var xxxxxxxxxx = '';
    var click_true = false;
    text("查看提示").findOne().click();
  	delay(1);
    var ansList=getAnsList();
    back();
    delay(1);
    if(textContains('选题').exists()){
      	var tips='';
      	ansList.forEach(x=>{
            tips+=x;
        })
        className("ListView").findOne().children().forEach(option=>{
            if(tips.indexOf(option.child(0).child(2).text())!=-1){
                xxxxxxxxxx+=option.child(0).child(2).text();
                option.child(0).click();
                click_true = true;
            }
        })
        if(click_true == false){
            className("ListView").findOne().child(0).child(0).click();
        }
        s.log('答案:'+xxxxxxxxxx);
    }
    else{
		for(let i=0;i<ansList.length;i++) {
          setText(i, ansList[i]);
        }
    }
    delay(1);
    text('确定').findOne().click();
    delay(0.5);
    if(text('下一题').exists()){
        click('下一题');
    }
    if(text('完成').exists()){
        click('完成');
    }
    delay(1);
}


/**
 * @description: 每周答题
 * @author:Lejw
 */
function week_Answer(){
    if(week_num == 0 || !hamibot.env.week || token == "") return;
    s.info('开始每周答题');
	questionShow();
    delay(1);
    text('每周答题').findOne().parent().click();
 	delay(1);    
  	if(!checkWeekEntry()) {//找不到能进去的题
      s.log("每周答题结束");
      back();
      delay(1);
      return;
    }
    delay(3);
    while(true){
        click_week();
        if(text("返回").exists()){
            delay(1);
          	text("返回").click();
          	delay(2);
          	break;
        }
    }
  	back();
    s.info('每周答题结束');
    delay(2);
}

/**
 * @description: 专项答题
 * @author:Lejw
 */
 function special_Answer(){
    if(special_num == 0 || !hamibot.env.special) return;
    s.info('开始专项答题');
	questionShow();
    delay(1);
    text('专项答题').findOne().parent().click();
 	delay(1);    
  	if(!checkSpecialEntry()) {//找不到能进去的题
      s.log("专项答题结束");
      back();
      delay(1);
      return;
    }
    delay(3);
    while(true){
        click_special();
        if(text("查看解析").exists()){
            delay(1);
            back();
          	delay(1);
            back();
          	break;
        }
    }
  	back();
    s.info('每项答题结束');
    delay(2);
}


/**
 * @description: 题目相似的查询
 * @param: question-题库题目，answer-题库答案，q文字识别内容，flag-字音
 */
function similarity(question,answer, q,flag) {
    var num = 0;
    if(flag){
        if(question.indexOf('正确')==-1 && question.indexOf('下列不属于二十四史的')==-1){
            return 0;
        }
        for(var i = 0;i<q.length;i++){
          if(answer.indexOf(q[i])!=-1){
                num++;
          }
        }
        return num/(answer.length+q.length);
    }
    else{
        var tmp = 1;
        if(q.length>20) tmp = 2;
        if(q.length>40) tmp = 3;
        if(q.length>50) tmp = 4;
        for(var i = 0;i<q.length-tmp;i+=tmp){
            if(question.indexOf(q[i]+q[i+1])!=-1){
                num++;
            }
        }
        return num/(question.length+q.length);
    }
}
/**
 * @description: 挑战答题
 */
function challenge(){
    if(challenge_num == 0 || !hamibot.env.challenge) return;
    s.info('开始挑战答题');
    questionShow();
    delay(3);
    text("排行榜").findOnce().parent().child(10).click();
    delay(5);
    var xxxxx = 1;
    while(true){
        delay(3);
        challenge_loop(xxxxx);
        delay(0.5);
        if (text('wrong@3x.9ccb997c').exists() || text('2kNFBadJuqbAAAAAElFTkSuQmCC').exists() || text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" + "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists()){
            delay(1);
            text('结束本局').findOne().click();
            delay(2);
            if(xxxxx>challenge_loop_num){
                text('再来一局').waitFor();
                delay(1);
                back();
                break;
            }
            else{
                click('再来一局');
                delay(5);
            }
            xxxxx = 0;
        }
        else{xxxxx++;}
    }
    s.info('挑战答题结束');
    delay(2);
}
/**
 * @description: 题库提取到questi_list
 */
function init_question_list(){
    var path = "/sdcard/question_tiku.txt";
    if(!files.exists(path)){
        s.error('题库文件不存在,仔细查看脚本介绍\n3s后自动退出脚本');
        delay(3);
        s.close();
        exit();
    }
    var tiku = files.read(path);
    tiku = tiku.split('\n');
    for(var i = 0; i<=tiku.length;i++){
        if(tiku[i]){
            question_list.push(tiku[i].split('='));
        }
    }
}
/**
 * @description: 四人/双人对战
 */
function zsyAnswer() {
    s.info('开始对战');
    var img = captureScreen();
    try{
        var point = findColor(img, '#1B1F25', {
            region: [0, 0, 100, 100],
            threshold: 10,
        });
    }catch(e){
        s.info('你可能使用了模拟器并且hamibot的版本是1.3.0及以上，请使用hamibot1.1.0版本');
        delay(3);
        exit();
    }
    if (choose == 'a') {
        huawei_ocr_api(img);
    } else if (choose == 'b') {
        ocr_api(img);
    } else if (choose == 'c') {
        hamibot_ocr_api(img);
    }
    else baidu_ocr_api(img);
    var count = 2;
    for (var i = 0; i < count; i++) {
        delay(2);
        if (text("随机匹配").exists()) {
            text("随机匹配").findOne(3000).parent().child(0).click();
            s.log("点击随机匹配");
            count = 1;
        } else {
            s.log("点击开始比赛");
            var sx = text("开始比赛").findOne(5000);
            if(sx){
                sx.click();
            }
            else{
                s.log('没有找到开始比赛，点击随机匹配');
                text("随机匹配").findOne(3000).parent().child(0).click();
                count = 1;
            }
        }
        first = true;
        yinzi = false;
        delay(1);
        if (text('知道了').exists()) {
            s.warn('答题已满');
            text('知道了').findOnce().click();
            delay(2);
            if(text("随机匹配").exists()||text("开始比赛").exists()){
                break;
            }else return 0;
        }
        className("ListView").waitFor();
        var range = className("ListView").findOnce().parent().bounds();
        var x = range.left + 20,
            dx = range.right - x-20;
        var y = range.top,
            dy = device.height - 300 - y;
        log('坐标获取完成');
        while (!text('继续挑战').exists()) {
            do {
                img = captureScreen();
                var point = findColor(img, '#1B1F25', {
                    region: [x, y, dx, dy],
                    threshold: 10,
                });
            } while (!point);
            if(!yinzi) console.time('答题');
            try{
                range = className("ListView").findOnce().parent().bounds();
                // if (choose == 'a') img = images.inRange(img, '#000000', '#444444');
                if(!first && !yinzi)
                    img = images.clip(img, x, y, dx, (range.bottom-y)/3);
                else
                    img = images.clip(img, x, y, dx, range.bottom-y);
            }
            catch(e){
                img = images.clip(img, x, y, dx, dy);
            }
            var question;
            if (choose == 'a') {    // 文字识别
                if(!first && !yinzi)
                    img = images.inRange(img, '#000000', '#444444');
                question = huawei_ocr_api(img);
            } else if (choose == 'b') {
                question = ocr_api(img);
            } else if (choose == 'c') {
                if(!first && !yinzi)      // 第一题不变色
                    img = images.inRange(img, '#000000', '#444444');
                question = hamibot_ocr_api(img);
            }
            else{
                if(!first && !yinzi)
                    img = images.inRange(img, '#000000', '#444444');
                question = baidu_ocr_api(img);
            }
            question = question.slice(question.indexOf('.') + 1);
            question = question.replace(/,/g, "，");
            s.log(question);
            if (question) {
                var c = do_contest_answer(32, question);
                if (c == -1) {
                    break;
                } else if (c == -2) {
                    className('android.widget.RadioButton').waitFor();
                    continue;
                }
            } else {
                images.save(img, "/sdcard/截图.jpg", "jpg", 50);
                s.error("没有识别出任何内容，为了查错已经将截图保存在根目录./截图.jpg");
                console.log('截图坐标为(' + x + ',' + y + '),(' + dx + ',' + dy + ')');
                break;
            }
            console.timeEnd('答题');
            img.recycle();
            var q_right = true;
            do {
                img = captureScreen();
                var point = findColor(img, '#fff64e75', {
                    region: [x, y, dx, dy],
                    threshold: 10,
                });
                if(point&&q_right){
                    q_right = false;
                }
                point = findColor(img, '#555AB6', {
                    region: [x, y, dx, dy],
                    threshold: 10,
                });
            } while (!point);
            if(q_right == true){    // 如果当前题目正确
                storage2.put(old_q,old_ans);    // 存入本地存储，减小下一次搜该题的时间
            } else {            // 当出错时
                if(storage2.contains(old_q))
                    storage2.remove(old_q);    // 可能由于上次搜题因错误答案而点击正确，则此时删除本地存储
            }
            s.log('----------');
            yinzi = false;
        }
        if (i == 0 && count == 2) {
            delay(1)
            s.log('第二轮答题开始');
            while (!click('继续挑战'));
            delay(1);
        }
    }
    if(hamibot.env.another){
        var x = hamibot.env.another*1;
    }  
    else{
        var x = 0;
    } 
    while(x>0){
        s.info('额外的 '+ x +' 轮即将开始!');
        x--;
        delay(2);
        click('继续挑战');
        delay(3);
        if (text("随机匹配").exists()) {
            text("随机匹配").findOne().parent().child(0).click();
            s.log("点击随机匹配");
        } else {
            s.log("点击开始比赛");
            // my_click_clickable('开始比赛');
            var sx = text("开始比赛").findOne(5000);
            if(sx){
                sx.click();
            }
            else{
                s.log('没有找到开始比赛，点击随机匹配');
                text("随机匹配").findOne(3000).parent().child(0).click();
            }
        }
        delay(1);
        if (text('知道了').exists()) {
            s.warn('答题已满');
            text('知道了').findOnce().click();
            delay(1);
            return 0;
        }
        while(true){
            if (text('继续挑战').exists()) break;
            while (!className('android.widget.RadioButton').depth(32).exists()) {
                delay(random(3,5));
                if (text('继续挑战').exists()) break;
            }
            delay(2);
            s.warn('随机点击');
            try{
                var t = className("ListView").findOne(5000).childCount();
                t = random(0,t-1);
                className('android.widget.RadioButton').depth(32).findOnce(t).click();
            }
            catch(e){}
            if (text('继续挑战').exists()) break;
            sleep(200);
        }
        // console.warn('额外一轮结束!');
    }
    s.info('答题结束,返回答题界面');
    delay(2);
    back();
    delay(2);
    back();
    if (count == 1) {
        delay(2);
        if (text('退出').exists()) {
            textContains('退出').click();
            delay(1);
        } else {
            s.warn('没有找到退出，按坐标点击(可能失败)\n如果没返回，手动退出双人赛即可继续运行');
            // console.setPosition(device.width * 0.2, device.height * 0.5);
            click(device.width * 0.2, device.height * 0.6);
        }
        delay(2);
    }
}
/**
 * @description: 四人/双人单题答题
 */
function do_contest_answer(depth_option, question1) {
    // console.time('搜题');
    question1 = question1.replace(/'/g, "");
    question1 = question1.replace(/"/g, "");
    old_question = JSON.parse(JSON.stringify(question1));
    question1 = question1.split('来源:')[0]; //去除来源
    question1 = question1.split('来源：')[0]; //去除来源
    question = question1.split('A.')[0];
    // question = question.split('（.*）')[0];
    reg = /下列..正确的是.*/g;
    reb = /选择词语的正确.*/g;
    rea = /选择正确的读音.*/g;
    rec = /下列不属于二十四史的是.*/g;
    var option = 'A';
    var answer = 'N';
    var similars = 0;
    var pos = -1;
    var answers_list = '';
    if (rec.test(question) || reg.test(question) || rea.test(question) || reb.test(question)) {
        yinzi = true;
        first = false;
        try {
            old_question = old_question.replace(/4\./g,'A.');
            var old_answers = old_question.split('A.')[1].split('C')[0];
            for (var k = 0; k < 2; k++) {
                answers = old_answers.split('B.')[k];
                // answers = answers.match(/[\u4e00-\u9fa5]/g).join(""); //剩余汉字
                answers = answers.replace(/哆峻/g, "啰唆");
                answers = answers.replace(/罗峻/g, "罗唆");
                answers = answers.replace(/暖陀/g, "蹉跎");
                answers = answers.replace(/暖跑/g, "蹉跎");
                answers = answers.replace(/跨踏/g, "踌躇");
                answers = answers.replace(/chuo/g, "chuò");
                answers = answers.replace(/cuotuo/g, "cuōtuó");
                answers = answers.replace(/duo/g, "duō");
                answers = answers.replace(/蹈/g, "踌躇");
                answers = answers.replace(/调帐/g, "惆怅");
                answers = answers.replace(/任悔/g, "忏悔");
                answers = answers.replace(/仟悔/g, "忏悔");
                answers = answers.replace(/忧心../g, "忧心忡忡");
                answers = answers.replace(/美轮美./g, "美轮美奂");
                answers = answers.replace(/决穿/g, "诀窍");
                answers = answers.replace(/浙临/g, "濒临");
                answers = answers.replace(/不落../g, "不落窠臼");
                answers = answers.replace(/.目结舌/g, "膛目结舌");
                answers = answers.replace(/泉水../g, "泉水淙淙");
                answers = answers.replace(/饮.止渴/g, "饮鸠止渴");
                answers = answers.replace(/趋之若./g, "趋之若鹜");
                answers = answers.replace(/一.而就/g, "一蹴而就");
                answers = answers.replace(/刚.自用/g, "刚愎自用");
                answers = answers.replace(/风驰电./g, "风驰电掣");
                answers = answers.replace(/不.而走/g, "不胫而走");
                answers = answers.replace(/.声叹气/g, "唉声叹气");
                answers = answers.replace(/.而走险/g, "铤而走险");
                answers = answers.replace(/底护/g, "庇护");
                answers = answers.replace(/蓓./g, "蓓蕾");
                answers = answers.replace(/抵悟/g, "抵牾");
                answers = answers.replace(/情懒/g, "慵懒");
                answers = answers.replace(/差道/g, "差遣");
                answers = answers.replace(/泽炼/g, "淬炼");
                answers = answers.replace(/博奔/g, "博弈");
                answers = answers.replace(/相形见./g, "相形见绌");
                answers = answers.replace(/对.公堂/g, "对簿公堂");
                answers = answers.replace(/疼李/g, "痉挛");
                answers = answers.replace(/痉李/g, "痉挛");
                answers = answers.replace(/..人口/g, "脍炙人口");
                answers = answers.replace(/.意安为/g, "恣意妄为");
                answers = answers.replace(/凌合/g, "凑合");
                answers = answers.replace(/神抵/g, "神祗");
                answers = answers.replace(/叫苦不./g, "叫苦不迭");
                answers = answers.replace(/草.人命/g, "草菅人命");
                answers = answers.replace(/鞭./g, "鞭笞");
                answers = answers.replace(/发物/g, "发轫");
                answers = answers.replace(/..充数/g, "滥芋充数");
                answers = answers.replace(/水蒸气/g, "水蒸气 水蒸汽");
                answers = answers.replace(/..置疑/g, "毋庸置疑");
                answers = answers.replace(/..不振/g, "萎靡不振");
                answers = answers.replace(/瓜熟.落/g, "瓜熟蒂落");
                answers = answers.replace(/虎视../g, "虎视眈眈");
                answers = answers.replace(/进裂/g, "崩裂");
                answers_list += answers;
            }
        } catch (e) {
            while (!className('android.widget.RadioButton').depth(32).exists()) {
                if (text('继续挑战').exists()) return -1;
            }
            return -2;
        };
    }
    if(yinzi) question = answers_list;
    answer = storage2.get(question);
    if(!answer){
        for(var i = 0;i<question_list.length;i++){          // 搜题
            var sx = similarity(question_list[i][1],question_list[i][0],question,yinzi);
            if(sx>similars){
                similars = sx;
                pos = i;
            }
            if(sx == 999) break;
        }
        if(pos != -1){
            answer = question_list[pos][0];
        }
        else{
            console.error('没搜到答案,题目异常：\n“'+old_question+'”');
            s.error('此题异常');
        }
    }
    if (answer) {
        old_q = question;
        old_ans = answer;
        s.info('答案:'+answer);
        if(!first && !yinzi){
            while(true) {
                if(className('android.widget.RadioButton').depth(32).exists()){
                    break;
                }
                if (text('继续挑战').exists()) return -1;
            }
            try{
                var img = captureScreen();
                var b = className('ListView').depth(29).findOne(3000).bounds();
                img = images.clip(img, b.left, b.top, b.right-b.left, b.bottom-b.top);
                if (choose == 'a') {
                    old_question = huawei_ocr_api(img);
                } else if (choose == 'b') {
                    old_question = ocr_api(img);
                } else if (choose == 'c') {
                    old_question = hamibot_ocr_api(img,30,false);
                }
                else old_question = baidu_ocr_api(img);
                console.log(old_question);
            }
            catch(e){
                console.error(e);
                s.info('选项获取失败');
            }
        }
        try{
            option = click_by_answer(answer,old_question);
            if(!option) option = 'A';
        }
        catch(e){console.error("此题选项异常！！！");console.error(e);}
        console.info('点击选项:' + option);
        if (text('继续挑战').exists()) return -1;
        while (!className("ListView").exists()) {
            if (text('继续挑战').exists()) return -1;
        }
        if (text('继续挑战').exists()) return -1;
        if(!first && !yinzi){
            sleep(delay_time);
        }
        first = false;
        try {
            while(!className("ListView").findOne(5000).child(option[0].charCodeAt(0) - 65).child(0).click()){
                if (text('继续挑战').exists()) return -1;
            }
        } catch (e) {
            while (!className('android.widget.RadioButton').depth(depth_option).exists()) {
                if (text('继续挑战').exists()) return -1;
            }
            try{
                className('android.widget.RadioButton').depth(depth_option).findOnce(option[0].charCodeAt(0) - 65).click();
            }catch(e){
                console.error('没找到选项,选A跳过');
                className('android.widget.RadioButton').depth(depth_option).findOnce(0).click();
            }
        }
        return 0;
    }
    try{
        className('android.widget.RadioButton').depth(depth_option).findOnce(0).click();
    }
    catch(e){
        while(!className("ListView").findOne(5000).child(0).child(0).click()){
            if (text('继续挑战').exists()) return -1;
        }
    }
    return 0;
}
var o = ['A.','B.','C.','D.','AAAA'];
var o1 = ['A','B','C','D','AAAA'];
/**
 * @description: 根据答案选择选项
 */
function click_by_answer(ans,question){
    ans = ans.match(/[\u4e00-\u9fa5a-zA-Z0-9āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜü]/g).join("")
  	question = question.replace(/ /g,'');
    question = question.replace(/4\./g,'A.');
    question = question.replace(/:/g,'：');
    try{
        question = replace(question);
    }catch(e){}
    question = question.replace(/c\./g,"C.");
    question = question.replace(/，/g,".");

    var sum = 0;
    for(var i = 0 ;i<question.length;i++){
        if(question[i]>='A' && question[i]<='D'){
            sum++;
        }
    }
    var op = [];
    if(sum<=4){
        question = question.replace(/\./g,"");
        for(var i = 0;i<4;i++){
            try{
                var tmp = question.split(o1[i])[1].split(o1[i+1])[0].split('推荐：')[0].split('出题')[0];
                op.push(tmp.match(/[\u4e00-\u9fa5a-zA-Z0-9āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜü]/g).join(""));
            }
            catch(e){
                op.push('&');
            }
        }
    }
    else{
        for(var i = 0;i<4;i++){
            try{
                var tmp = question.split(o[i])[1].split(o[i+1])[0].split('推荐：')[0].split('出题')[0];
                op.push(tmp.match(/[\u4e00-\u9fa5a-zA-Z0-9āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜü]/g).join(""));
            }
            catch(e){
                op.push('&');
            }
        }
    }
    var s = 0;
    var pos = -1;
    for(var i = 0;i<op.length;i++){
        if(op[i]=='&') continue;
        if(op[i] == ans){
            return o1[i];
        }
        var tmp = similarity_answer(op[i],ans);
        if(tmp>s){
            s = tmp;
            pos = i;
        }
    }
    return o1[pos];
}
/**
 * @description: 选项相似度查询
 * @param: 选择
 * @param: 正确选项
 */
function similarity_answer(op,ans){
    var num = 0;
    for(var i = 0;i<ans.length;i++){
        if(op.indexOf(ans[i])!=-1) num++;
    }
    for(var i = 0;i<ans.length-1;i++){
        if(op.indexOf(ans[i]+ans[i+1])!=-1) num++;
    }
    for(var i = 0;i<ans.length-2;i++){
        if(op.indexOf(ans[i]+ans[i+1]+ans[i+2])!=-1) num++;
    }
    return num/(2*op.length+2*ans.length);
}
/**
 * @description: 四人赛
 */
function four(){
    if(four_num == 0||!hamibot.env.four) return ;
    s.info('开始四人赛');
    questionShow();
    text("排行榜").findOne().parent().child(8).click();
    delay(1);
    zsyAnswer();
    delay(2);
}
/**
 * @description: 双人对战
 */
function double(){
    if(double_num == 0||!hamibot.env.double) return ;
    s.info('开始双人对战');
    questionShow();
    text("排行榜").findOne().parent().child(9).click();
    delay(1);
    zsyAnswer();
    delay(2);
}
/**
 * @description: 进入答题界面
 */
function questionShow() {
    while (!desc("工作").exists()) {
        delay(1);
        if(text("排行榜").exists()){
            return ;
        }
    }
    s.log("进入答题界面");
    text("我的").click();
    delay(1);
    while (!desc("我的信息").exists()) {
        delay(1);
    }
    text("我要答题").findOne().parent().click();
    delay(1);
    while(!text("排行榜").exists()){
        delay(1);
    }
    delay(1);
}

/**
 * @description: 百度文字识别
 * @return: 文字识别内容
 */
function baidu_ocr_api(img) {
    console.log('百度ocr文字识别中');
    var answer = "";
    var res = http.post(
        'https://aip.baidubce.com/rest/2.0/ocr/v1/general',
        {
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
    } catch (error) {
        s.error('百度ocr文字识别请求错误：可能有以下情况\n1.百度ocr欠费\n2.其他的错误');
        exit();
    }
    for (var i in words_list) {
        answer += words_list[i].words;
    }
    return answer.replace(/\s*/g, "");
}

/**
 * @description: 返回结果列表的百度文字识别
 * @author:Lejw
 * @return: 文字识别内容
 */
function baidu_ocr_api_return_list(img,token) {
    console.log('百度ocr文字识别中');
    var res = http.post(
        'https://aip.baidubce.com/rest/2.0/ocr/v1/general',
        {
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
    } catch (error) {
        console.error('百度ocr文字识别失败:检查\n1.百度ocr欠费\n2.其他的错误');
        exit();
    }
  	var ret=[];
    for (let i=0;i<words_list.length;i++) {
       ret[i]=words_list[i].words.replace(/\s*/g, "");
    }
    return ret;
}

/**
 * @description: 获取百度OCR_token
 * @return: access_token
 */
function get_baidu_token(client_id,client_secret) {    // 百度ocr
    var res = http.post(
        'https://aip.baidubce.com/oauth/2.0/token',
        {
            grant_type: 'client_credentials',
            client_id: client_id,
            client_secret: client_secret
        }
    );
    var xad = res.body.json()['access_token'];
    if(xad == null){
        s.error('百度文字识别（OCR）载入失败');
        delay(3);
        exit();
    } else {
        s.info('百度文字识别（OCR）载入成功');
    }
    return xad;
}
var ocr;
/**
 * @description: 第三方浩然文字识别
 * @return: 文字识别内容
 */
function ocr_api(img) {
    console.log('第三方本地ocr文字识别中');
    try{
        var answer = "";
        var results = ocr.detect(img.getBitmap(), 1);
        for (var i = 0; i < results.size(); i++) {
            var s = results.get(i).text;
            answer += s;
        }
        return answer.replace(/\s*/g, "");
    }catch(e){
        s.error(e);
        s.info("第三方OCR插件安装错了位数，分为64位和32位\n卸载之前的插件，换一个位数安装");
        delay(3);
        exit();
    }
}
/**
 * @description: hamibot内置paddle文字识别
 * @return: 文字识别内容
 */
function hamibot_ocr_api() {
    console.log('hamibot文字识别中');
    let list = ocr.recognize(arguments[0])['results']; // 识别文字，并得到results
    let eps = 30; // 坐标误差
    if (arguments.length >= 2) eps = arguments[1];
    for (
      var i = 0;
      i < list.length;
      i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
    ) {
      for (var j = i + 1; j < list.length; j++) {
        if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
          var tmp = list[i];
          list[i] = list[j];
          list[j] = tmp;
        }
      }
    }
  
    for (
      var i = 0;
      i < list.length;
      i++ // 在上下排序完成后，进行左右排序
    ) {
      for (var j = i + 1; j < list.length; j++) {
        // 由于上下坐标并不绝对，采用误差eps
        if (
          Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
            eps &&
          list[i]['bounds']['left'] > list[j]['bounds']['left']
        ) {
          var tmp = list[i];
          list[i] = list[j];
          list[j] = tmp;
        }
      }
    }
    let res = '';
    for (var i = 0; i < list.length; i++) {
      res += list[i]['text'];
    }
    list = null;
    return res;
}

/**
 * @description: 返回结果列表的Hamibot文字识别
 * @author:Lejw
 * @return: 文字识别内容
 */
 function hamibot_ocr_api_return_list() {
    s.log('hamibot文字识别中');
    let list = ocr.recognize(arguments[0])['results']; // 识别文字，并得到results
    let eps = 5; // 坐标误差
    if (arguments.length >= 2) eps = arguments[1];
    for (
      var i = 0;
      i < list.length;
      i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
    ) {
      for (var j = i + 1; j < list.length; j++) {
        if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
          var tmp = list[i];
          list[i] = list[j];
          list[j] = tmp;
        }
      }
    }
  
    for (
      var i = 0;
      i < list.length;
      i++ // 在上下排序完成后，进行左右排序
    ) {
      for (var j = i + 1; j < list.length; j++) {
        // 由于上下坐标并不绝对，采用误差eps
        if (
          Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
            eps &&
          list[i]['bounds']['left'] > list[j]['bounds']['left']
        ) {
          var tmp = list[i];
          list[i] = list[j];
          list[j] = tmp;
        }
      }
    }
    let res =[];
    for (var i = 0; i < list.length; i++) {
      res[i]= list[i]['text'];
    }
    list = null;
    return res;
}

/**
 * @description: 华为文字识别
 * @return: 文字识别内容
 */
function huawei_ocr_api(img) {
    console.log('华为ocr文字识别中');
    var answer = "";
    var res = http.postJson(
        'https://' + endpoint + '/v2/' + projectId + '/ocr/web-image', {
            "image": images.toBase64(img)
        }, {
            headers: {
                "User-Agent": "API Explorer",
                "X-Auth-Token": token,
                "Content-Type": "application/json;charset=UTF-8"
            }
        }
    );
    var res = res.body.json();
    try {
        var words_list = res.result.words_block_list;
    } catch (error) {
        toastLog(error);
        exit();
    }
    for (var i in words_list) {
        answer += words_list[i].words;
    }
    return answer.replace(/\s*/g, "");
}
/**
 * @description: 返回主界面
 */
function back_table() {
    delay(1);
    var back_num = 0;
    while (!desc("工作").exists()) { //等待加载出主页
        s.log("正在返回主页");
        back();
        delay(1);
        back_num++;
        if(className('Button').textContains('退出').exists()){
            var c = className('Button').textContains('退出').findOne(3000);
            if(c) c.click();
            delay(1);
            c = null;
        }
        if(back_num>10){
            s.error('返回超过10次，可能当前不在xxqg，正在启动app...');
            launchApp("学习强国") || launch('cn.xuexi.android'); //启动学习强国app
            s.info('等待10s继续进行');
            delay(10);
            back_num = 0;
        }
    }
    back_num = null;
}
/**
 * @description: 开关广播
 * @param:开true -> 关false
 */
function start_close_radio(flag){
    back_table();
    if(flag){
        s.info("正在打开广播");
        click('电台');
        delay(2);
        click('听广播');
        delay(2);
        var tmp = desc('国家广播电台').depth(21).drawingOrder(1).findOne(5000);
        if(tmp){
            tmp = tmp.parent().parent().parent().parent().child(1).child(0);
            var t = random(0,tmp.childCount()-1)
            tmp.child(t).click();
            t = null;
        }
        tmp = null;
    }
    else{
        s.info("正在关闭广播");
        click('电台');
        delay(2);
        click('听广播');
        delay(2);
        var tmp = id('v_playing').findOne(5000);
        if(tmp){
            tmp.click();
        }
    }
    back_table();   // 防止部分机型未在主页
}

/**
 * @description: 订阅
 */
function sub(){
    if(sub_num == 0 || !hamibot.env.sub) return;
    if(!files.exists('/sdcard/sub_position.txt')){
        s.error('没有订阅坐标，跳过订阅');
        return;
    }
    s.info('开始订阅,还需要订阅'+(sub_num)+"个");
    back_table();
    desc('工作').click();
    delay(2);
    click('订阅');
    delay(2);
    text('添加').depth(25).findOne().parent().click();
    delay(2);
    try{
        if(hamibot.env.sub == 'b'){     // 只查看上新
            sub_click();
        }
    }
    catch(e){
        log(e);
        s.error('坐标错误？重新生成坐标试试');
        back_table();
    }
}
/**
 * @description: 订阅平台切换
 */
function sub_click(){
    eval(files.read('/sdcard/sub_position.txt'));
    for(var i = 0;i<position.length && sub_num;i+=2){
        press(position[i],position[i+1],100);
        if(i == 0 || i == 23){delay(0.5);continue};

    }
}
/**
 * @description: 点击订阅
 */
function pic_click() {
    while (sub_num > 0) {
        let result = findColor(captureScreen(), '#E42417', {
            max: 5,
            region: [s1, 100, device.width - s1, device.height - 200], //区域
            threshold: 10,
        });
        if (result) {
            console.log("已经订阅了" + (3 - sub_num) + "个");
            press(result.x + 10, result.y + 10,100);
            sub_num--;
        } else {
            break;
        }
        delay(1);
    }
}
/**
 * @description: 获取截图权限
 */
function get2_requestScreenCapture(){
    threads.start(function(){
        // 请求截图
        if(!requestScreenCapture(false)){
            toastLog("请求截图失败");
            exit();
        }
    })
    delay(1);
    threads.start(function () {
        try{
            textContains("立即开始").className("Button").findOne(5000).click();
        }catch(e){}
    })
    threads.start(function () {
        try{
            textContains("允许").className("Button").findOne(5000).click();
        }catch(e){}
    })
}
function getVersion(package_name) {         // 得到包名的版本
    let pkgs = context.getPackageManager().getInstalledPackages(0).toArray();
    for (let i in pkgs) {
        if (pkgs[i].packageName.toString() === package_name) {
            return pkgs[i].versionName;
        }
    }
}
/**
 * @description: 进入hamibot界面获取截图权限(更稳定)
 */
function get_requestScreenCapture(){
    s.info('正在获取截图权限');
    launchApp("Hamibot");   // 若无必要，可以删除该行
    delay(2);
    get2_requestScreenCapture();
    var wait_num = 0;
    while(true){
        sleep(3000);
        try{
            captureScreen();
            break;
        }catch(e){}
        if(wait_num>10){    // 等待超过30s，重新申请截图权限
            wait_num = 0;
            get2_requestScreenCapture();
        }
        wait_num++;
    }
    wait_num = null;
    s.info('截图权限获取完成');
    if(choose == 'd'){  // 获取百度OCR的token,在hamibot内获取
        if(hamibot.env.client_id&&hamibot.env.client_secret) {
            token=get_baidu_token(hamibot.env.client_id,hamibot.env.client_secret);
        }
        else{
            s.error('未填写百度OCR配置！！！');
            delay(3);
            exit();
        }
    }
    else if(choose == 'b'){
        try{
            ocr = plugins.load("com.hraps.ocr");
        }
        catch(e){
            s.error('第三方OCR插件未安装');
            delay(3);
            s.close();
            exit();
        }
    }
    else if(choose == 'c'){
        var version = getVersion('com.hamibot.hamibot');
        if(version<'1.3.0'){
            s.error('Hamibot版本过低');
            delay(3);
            s.close();
            exit();
        }
    }
}
/**
 * @description: 数组随机排序
 */
function disorder(arr){
    let length = arr.length;
    let current = arr.length - 1;
    let random;
    while(current >= 0){
      random = Math.floor(length*Math.random());
      [arr[current], arr[random]] = [arr[random], arr[current]];
      current--;
    }
    return arr;
}
/**
 * @description: 积分推送到PushDeer
 */
function PushDeer(){
    if(!hamibot.env.key||hamibot.env.key=='') return;
    s.info('开始获取当天积分情况');
    back_table();
    var texts = get_all_num(1,1);
    try{
        s.info('开始发送推送信息,请等待...');
        log(http.get(hamibot.env.key.replace(/这是推送内容不要删除/g,texts)).body.string());
    }
    catch(e){
        s.error('推送请求失败，自己琢磨原因');
    }
    s.info('推送完成');
    texts = null;
}
/**
 * @description: 主函数
 */
function main(){
    device.keepScreenOn(24*60*60*1000);// 设置亮屏
    s.info('启动xxqg');
    launchApp("学习强国") || launch('cn.xuexi.android');
    while(!desc('工作').exists()){
        delay(3);
        s.info('等待主页出现');
        if (textContains("取消").exists() && textContains("立即升级").exists()) {
            text("取消").findOne().click();
        }
    }
    if (textContains("取消").exists() && textContains("立即升级").exists()) {
        text("取消").findOne().click();
    }
    delay(1);
    get_all_num();
    // double_num=1;
    // daily_num=1;
    delay(1);
    var list = disorder([1,2,3,4,5,6,7,8,9,10]);
    list.forEach(i=>{
        switch (i){
            case 1:
                study_article();
                break;
            case 2:
                study_video();
                break;
            case 3:
                daily_Answer();
                break;
            case 4:
                challenge();
                break;
            case 5:
                four();
                break;
            case 6:
                double();
                break;
            case 7:
                //sub();
                break;
            case 8:
                local_();
                break;
            case 9:
                week_Answer();
                break;
            case 10:
                special_Answer();
                break;
        }
    })
    device.cancelKeepingAwake();    // 取消屏幕常亮
    PushDeer();
    back_table();
    delay(1);
    if(hamibot.env.end){
        s.info('正在执行自定义结束代码');
        try{
            eval(hamibot.env.end);
            s.info('自定义代码执行完成');
        }
        catch(e){
            s.error('自定义代码有错误,跳过!!!');
        }
    }
    s.info('脚本运行结束，3s后自动退出');
    delay(3);
    s.close();
    question_list = null;
    exit();
}
/**
 * @description: 看门狗运行主函数main()
 */
function watchdog(){
    device.wakeUpIfNeeded();
    s.info('Study togther开始运行!!!');
    s.error('脚本为免费脚本！！！');
    if(hamibot.env.head){
        s.info('正在执行自定义开始代码');
        try{
            eval(hamibot.env.head);
            s.info('自定义代码执行完成');
        }
        catch(e){
            s.error('自定义代码有错误,跳过!!!');
        }
    }
    if(hamibot.env.double||hamibot.env.four || hamibot.env.week || hamibot.env.special){
        get_requestScreenCapture();
        delay(1);
    }
    if(hamibot.env.double || hamibot.env.four || hamibot.env.challenge){
        init_question_list();
    }
    var thread = null;
    var main_num = 3;
    while(main_num--){
        thread = threads.start(function(){
            main();
        })
        thread.join(watchdog_time);
        thread.interrupt();
        s.error('脚本超时/出错,正在重新启动');
        delay(2);
        back_table();
        delay(2);
    }
    toastLog("已经重新运行了多次，脚本结束");
    question_list = null;
    thread = null;
    s.close();
    exit();
}
threads.start(function(){
    while(true){
        try{
            if(text('访问异常').exists()){
                var b = textContains("向右滑动验证").findOne(2000).parent().child(2).bounds();;
                delay(1);
                s.error('当前需要验证，正在过验证');
                gestures([0, random(400,1000), [b.centerX(), b.centerY()], [device.width, b.centerY()]]);
                delay(2);
                if(text('刷新').exists()){
                    text('刷新').findOne(1000).parent().click();
                    if(text('icon/24/icon_Y_shuaxin').exists()){
                        text('icon/24/icon_Y_shuaxin').findOne(1000).parent().click();
                    }
                }
                else break;
            }
            delay(2);
            if(text('重试').exists()){
                s.info('点击重试');
                text('重试').findOne(1000).click();
            }
            if(textContains('网络开小差').exists()){
                s.info('点击确定');
                text('确定').findOne(1000).click();
            }
        }
        catch(e){}
    }
    s.error('验证通过');
    captcha = true;
})

watchdog();