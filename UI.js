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
                <toolbar id="toolbar" bg="#ff4fb3ff" title="强国助手"/>
                <tabs id="tabs" bg="#ff4fb3ff"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <vertical gravity="center" layout_weight="1">
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                <horizontal gravity="center_vertical">
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="脚本选择" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <text text="切换脚本后需在配置页设置" textColor="#999999" textSize="14sp" maxLines="1" />
                                    </vertical>
                                    <spinner id="script_chosen" marginLeft="4" marginRight="6" entries="天天向上Pro|天天向上|Study改" />
                                </horizontal>
                            </card>
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
                        <vertical id="ttxs_pro" gravity="center">
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="看门狗(秒)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="填1800就是超过30分钟重试" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="空着或0默认5400秒，超过即重新执行" />
                                </vertical> 
                                <input id="ttxs_pro_watchdog" marginLeft="4" marginRight="6" text="1800"  hint="秒"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="滑动验证的滑动时间(ms)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="空着或0不开启自动滑动验证，滑动分3段" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="中间会折返一下，总时间是填的数值*3" />
                                </vertical> 
                                <input id="ttxs_pro_slide_verify" marginLeft="4" marginRight="6" text="300" textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="无障碍模式2" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="无障碍服务没问题就不勾选" />
                                </vertical>
                                <checkbox id="ttxs_pro_fast_mode" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="点点通功能" />
                                </vertical>
                                <checkbox id="ttxs_pro_ddtong" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="开始前强制结束强国" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="如果关闭，请确保强国已退出或在首页" />
                                </vertical>
                                <checkbox id="ttxs_pro_is_exit" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="评论" />
                                </vertical>
                                <checkbox id="ttxs_pro_pinglun" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="视听学习次数" />
                                </vertical>
                                <checkbox id="ttxs_pro_shipin" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="文章次数与时长" />
                                </vertical>
                                <checkbox id="ttxs_pro_wenzhang" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每日答题" />
                                </vertical>
                                <checkbox id="ttxs_pro_meiri" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每周答题" />
                                    <spinner id="ttxs_pro_meizhou" marginLeft="4" marginRight="6" entries="最近一次已作答开始倒序|正序答题|不做" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="专项答题" />
                                    <spinner id="ttxs_pro_zhuanxiang" marginLeft="4" marginRight="6" entries="最近一次已作答开始倒序|正序答题|不做" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="挑战答题" />
                                </vertical>
                                <checkbox id="ttxs_pro_tiaozhan" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="是否启用第三方OCR插件" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="内置ocr很慢的可以试试(并没有内置的好)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="需要提前安装，未安装会跳转浏览器下载" />
                                </vertical>
                                <checkbox id="ttxs_pro_ocr_plugin" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="ocr识别跳过阈值(ms)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="空着或0默认5000，超过此时间会跳过多人对战" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="建议按照平时正常的ocr识别时间设置" />
                                </vertical> 
                                <input id="ttxs_pro_ocr_maxtime" marginLeft="4" marginRight="6" text="5000" textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="对战选项模式" />
                                    <spinner id="ttxs_pro_duizhan_mode" marginLeft="4" marginRight="6" entries="随机顺序(等选项显示后识别答案)|固定顺序(历史遗留选项)|手动答题(识别答案后等待用户手动点击)" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="对战极速模式延迟(历史遗留选项)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="只在选项固定顺序时生效" />
                                </vertical> 
                                <input id="ttxs_pro_jisu" marginLeft="4" marginRight="6" text="0" textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="是否挂机跳过四人赛首局" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="首局匹配对手较强，挂机不会扣积分局数" />
                                </vertical>
                                <checkbox id="ttxs_pro_guaji" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人赛" />
                                </vertical>
                                <checkbox id="ttxs_pro_siren" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="平衡胜率(答错)次数" />
                                </vertical> 
                                <input id="ttxs_pro_dacuo_num" marginLeft="4" marginRight="6" text="2" textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="双人对战" />
                                </vertical>
                                <checkbox id="ttxs_pro_shuangren" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="本地" />
                                </vertical>
                                <checkbox id="ttxs_pro_bendi" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="订阅" />
                                    <spinner id="ttxs_pro_dingyue" marginLeft="4" marginRight="6" entries="不做|正序订阅|只订阅年度上新" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="pushplus_token(微信推送)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="微信关注pushplus推送加，复制token填入" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="注意！搜索结果有两个，一定要关注正确" />
                                    <input id="ttxs_pro_pushplus" text="" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="是否启用音量调节" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="每次运行脚本后调节音量百分比" />
                                </vertical>
                                <checkbox id="ttxs_pro_yl_on" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="音量" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="调节音量百分比(只填数字)" />
                                </vertical> 
                                <input id="ttxs_pro_yinliang" marginLeft="4" marginRight="6" text="0" textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="多账号(选填，最多3个)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="使用前确保所有账号都已完成短信验证" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="账号1:密码1:token1(换行/回车)账号2:密码2:token2(换行/回车)账号3:密码3:token3" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="结束后会自动登录回账号1" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="新增多账号1对1微信推送，按格式配置即可" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="没有则根据上面配置的pushplus_token为主" />
                                    <input id="ttxs_pro_zhanghao" text="" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="ttxs_pro_save" text="保存配置" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="ttxs_pro_reset" text="恢复默认" padding="12dp" w="*" />
                            </horizontal>
                        </vertical>
                        <vertical id="ttxs" gravity="center">
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="测试" />
                                </vertical>
                                <checkbox id="test_article1" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                        </vertical>
                        <vertical id="study" gravity="center">
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="文章学习和广播收听" />
                                </vertical>
                                <checkbox id="study_article" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="视频学习" />
                                    <spinner id="study_video" marginLeft="4" marginRight="6" entries="新百灵视频学习|看电视视频学习|百灵视频学习|不进行学习" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每日答题" />
                                </vertical> 
                                <checkbox id="study_meiri" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="挑战答题" />
                                </vertical> 
                                <checkbox id="study_tiaozhan" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="专项答题" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="建议手动答题，否则不保证全对" />
                                </vertical> 
                                <checkbox id="study_checkbox_01" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每周答题" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="建议手动答题，否则不保证全对" />
                                </vertical> 
                                <checkbox id="study_checkbox_02" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="滑块验证延迟" />
                                </vertical> 
                                <input id="study_huakuaidelay" marginLeft="4" marginRight="6" text="300" textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人赛" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="可在答题页选择OCR配置，默认本地OCR" />
                                </vertical> 
                                <checkbox id="study_checkbox_03" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="双人对抗" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="可在答题页选择OCR配置，默认本地OCR" />
                                </vertical> 
                                <checkbox id="study_shuangren" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="专项答题模式选择" /> 
                                    <spinner id="study_select" marginLeft="4" marginRight="6" entries="不向下滑动，只答当天的题目,没有则返回|向下滑动，直到找到可答题的题目" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每周答题模式选择" />
                                    <spinner id="study_selectm" marginLeft="4" marginRight="6" entries="不向下滑动，只答当天的题目,没有则返回|向下滑动，直到找到可答题的题目" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人赛模式选择" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="注：一般手机本地识别速度大于云端，部分手机内置ocr识别较慢，请自行测试" />
                                    <spinner id="study_select_01" marginLeft="4" marginRight="6" entries="内置PaddleOCR->推荐|百度OCR接口,在OCR页配置" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人/双人不受积分限制开关" />
                                </vertical> 
                                <checkbox id="study_xianzhi" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="四人/双人额外的随机答题次数(乱答)" />
                                </vertical> 
                                <input id="study_another" marginLeft="4" marginRight="6" text="1"  hint="乱答次数"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每日、每周、专项答题增强模式" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="使用在线OCR识别答案" />
                                    <spinner id="study_stronger" marginLeft="4" marginRight="6" entries="关闭|使用百度OCR识别答案" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="百度OCR的API Key" />
                                    <input id="study_AK" text=""  gravity="center" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="百度OCR的Secret Key" />
                                    <input id="study_SK" text=""  gravity="center" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="study_baidusave" text="保存并检查" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="study_baidureset" text="清空" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="study_baiduregister" text="注册百度智能云" padding="12dp" w="*" />
                            </horizontal><horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="订阅" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="仅支持学习强国2.33.0及以下版本" />
                                    <spinner id="study_ssub" marginLeft="4" marginRight="6" entries="关闭|翻遍全部，直到订阅完成|只查看上新" />
                                </vertical> 
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="点点通刷满" />
                                </vertical> 
                                <checkbox id="study_diandian" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="看门狗(秒)" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="脚本运行的最长时间,超时/错误自动重启脚本" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="防止出现不可控错误,一般重启脚本即可解决" />
                                </vertical> 
                                <input id="study_alltime" marginLeft="4" marginRight="6" text="2000"  hint="秒"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每篇文章学习时间" />
                                </vertical> 
                                <input id="study_time1" marginLeft="4" marginRight="6" text="61"  hint="秒"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="每个视频学习时间" />
                                </vertical> 
                                <input id="study_time2" marginLeft="4" marginRight="6" text="6"  hint="秒"  textSize="13sp"  inputType="number" />
                            </horizontal>
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="15sp" text="push+ 消息推送" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="注：有需要的自行填写push+的Token，否则留空即可" />
                                    <input id="study_Token" text="" textSize="13sp" />
                                </vertical> 
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="study_save" text="保存配置" padding="12dp" w="*" />
                            </horizontal>
                            <horizontal>
                                <button style="Widget.AppCompat.Button.Colored" id="study_reset" text="恢复默认" padding="12dp" w="*" />
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


var GLOBAL_CONFIG = storages.create("GLOBAL_CONFIG");
var TTXS_PRO_CONFIG = storages.create("TTXS_PRO_CONFIG");
var STUDY_CONFIG = storages.create("STUDY_CONFIG");
var BAIDUAPI = storages.create("BAIDUAPI");
var execution = "";
var thread = null;
Initialize();

// 版本更新检查
var apkurl = "https://sp.sec-an.cn/storage01/Better-Auto-XXQG/v2.1.0.apk";
var latest_version = "2.1.0";
if (GLOBAL_CONFIG.get("NO_UPDATE", 0) && (app.versionName != latest_version)) {
    ui.update.visibility = 0;
    ui.update.setText("点击更新至最新版v" + latest_version);
} else if (app.versionName != latest_version) {
    checkversion();
}


// 创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("日志");
    menu.add("关于");
    menu.add("Github");
});

// 监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "日志":
            app.startActivity("console");
            break;
        case "关于":
            alert("关于", "强国助手 v"+latest_version);
            break;
        case "Github":
            app.openUrl("https://github.com/sec-an/Better-Auto-XXQG");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

// 设置滑动页面的标题
ui.viewpager.setTitles(["首页", "脚本配置"]);
// 让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

// 脚本选择监听
var script_chosen_Listener = new android.widget.AdapterView.OnItemSelectedListener({
    onItemSelected: function (parent, view, position, id) {
        toastLog('选择脚本：' + ui.script_chosen.getSelectedItem());
        if (ui.script_chosen.getSelectedItemPosition() == 0) {
            ui.ttxs.visibility = 8;
            ui.study.visibility = 8;
            ui.ttxs_pro.visibility = 0;
        }
        else if (ui.script_chosen.getSelectedItemPosition() == 1) {
            ui.ttxs_pro.visibility = 8;
            ui.study.visibility = 8;
            ui.ttxs.visibility = 0;
        }
        else if (ui.script_chosen.getSelectedItemPosition() == 2) {
            ui.ttxs_pro.visibility = 8;
            ui.ttxs.visibility = 8;
            ui.study.visibility = 0;
        }
        GLOBAL_CONFIG.put("script_chosen", ui.script_chosen.getSelectedItemPosition());
    }
})
ui.script_chosen.setOnItemSelectedListener(script_chosen_Listener);

// 用户勾选无障碍服务的选项时，跳转到页面让用户去开启 
// android.permission.SYSTEM_ALERT_WINDOW
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

// 悬浮窗权限
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

// 打开日志
ui.log.click(function () {
    app.startActivity("console");
});

// APP更新检测
ui.update.click(function () {
    if (app.versionName != latest_version) {
        GLOBAL_CONFIG.put("NO_UPDATE", 0);
        checkversion();
    } else {
        toast("当前已经是最新版本！");
    }
});

// 下载并运行所选脚本
ui.start.click(function () {
    threads.shutDownAll();
    if (thread != null && thread.isAlive()) {
        alert("注意", "脚本正在运行，请结束之前进程");
        return;
    }
    threads.start(function () {
        let url = [
            'https://sp.sec-an.cn/storage01/Better-Auto-XXQG/'+ui.script_chosen.getSelectedItemPosition()+'.js',
            'https://ghproxy.com/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/'+ui.script_chosen.getSelectedItemPosition()+'.js',
            'https://cdn.jsdelivr.net/gh/sec-an/Better-Auto-XXQG@main/'+ui.script_chosen.getSelectedItemPosition()+'.js',
            'https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/'+ui.script_chosen.getSelectedItemPosition()+'.js',
        ];
        for (var i = 0; i < url.length; i++) {
            try {
                let res = http.get(url[i]);
                console.log(i + ":" + res.statusCode);
                if (res.statusCode == 200) {
                    var study = res.body.string();
                    if (study.indexOf('auto.waitFor();') == 0) break;
                } else {
                    toastLog(ui.script_chosen.getSelectedItem() + '脚本:地址' + i + '下载失败');
                }
            } catch (error) {}
        }
        toastLog("开始积分判断运行");
        execution = engines.execScript("强国助手", study);
    });
});

// 保存天天向上pro脚本设置
ui.ttxs_pro_save.click(function () {
    TTXS_PRO_CONFIG.put("watchdog", ui.ttxs_pro_watchdog.getText()+"");
    TTXS_PRO_CONFIG.put("slide_verify", ui.ttxs_pro_slide_verify.getText()+"");
    TTXS_PRO_CONFIG.put("fast_mode", ui.ttxs_pro_fast_mode.isChecked());
    TTXS_PRO_CONFIG.put("ddtong", ui.ttxs_pro_ddtong.isChecked());
    TTXS_PRO_CONFIG.put("is_exit", ui.ttxs_pro_is_exit.isChecked());
    TTXS_PRO_CONFIG.put("pinglun", ui.ttxs_pro_pinglun.isChecked());
    TTXS_PRO_CONFIG.put("shipin", ui.ttxs_pro_shipin.isChecked());
    TTXS_PRO_CONFIG.put("wenzhang", ui.ttxs_pro_wenzhang.isChecked());
    TTXS_PRO_CONFIG.put("meiri", ui.ttxs_pro_meiri.isChecked());
    TTXS_PRO_CONFIG.put("meizhou", ui.ttxs_pro_meizhou.getSelectedItemPosition());
    TTXS_PRO_CONFIG.put("zhuanxiang", ui.ttxs_pro_zhuanxiang.getSelectedItemPosition());
    TTXS_PRO_CONFIG.put("tiaozhan", ui.ttxs_pro_tiaozhan.isChecked());
    TTXS_PRO_CONFIG.put("ocr_plugin", ui.ttxs_pro_ocr_plugin.isChecked());
    TTXS_PRO_CONFIG.put("ocr_maxtime", ui.ttxs_pro_ocr_maxtime.getText()+"");
    TTXS_PRO_CONFIG.put("duizhan_mode", ui.ttxs_pro_duizhan_mode.getSelectedItemPosition());
    TTXS_PRO_CONFIG.put("jisu", ui.ttxs_pro_jisu.getText()+"");
    TTXS_PRO_CONFIG.put("guaji", ui.ttxs_pro_guaji.isChecked());
    TTXS_PRO_CONFIG.put("siren", ui.ttxs_pro_siren.isChecked());
    TTXS_PRO_CONFIG.put("dacuo_num", ui.ttxs_pro_dacuo_num.getText()+"");
    TTXS_PRO_CONFIG.put("shuangren", ui.ttxs_pro_shuangren.isChecked());
    TTXS_PRO_CONFIG.put("bendi", ui.ttxs_pro_bendi.isChecked());
    TTXS_PRO_CONFIG.put("dingyue", ui.ttxs_pro_dingyue.getSelectedItemPosition());
    TTXS_PRO_CONFIG.put("pushplus", ui.ttxs_pro_pushplus.getText()+"");
    TTXS_PRO_CONFIG.put("yl_on", ui.ttxs_pro_yl_on.isChecked());
    TTXS_PRO_CONFIG.put("yinliang", ui.ttxs_pro_yinliang.getText()+"");
    TTXS_PRO_CONFIG.put("zhanghao", ui.ttxs_pro_zhanghao.getText()+"");

    toastLog("天天向上pro配置保存成功！");
});

// 重置天天向上pro脚本设置
ui.ttxs_pro_reset.click(function () {
    TTXS_PRO_CONFIG.put("watchdog", "1800");
    ui.ttxs_pro_watchdog.setText(TTXS_PRO_CONFIG.get("watchdog"));
    TTXS_PRO_CONFIG.put("slide_verify", "300");
    ui.ttxs_pro_slide_verify.setText(TTXS_PRO_CONFIG.get("slide_verify"));
    TTXS_PRO_CONFIG.put("fast_mode", false);
    ui.ttxs_pro_fast_mode.setChecked(TTXS_PRO_CONFIG.get("fast_mode"));
    TTXS_PRO_CONFIG.put("ddtong", false);
    ui.ttxs_pro_ddtong.setChecked(TTXS_PRO_CONFIG.get("ddtong"));
    TTXS_PRO_CONFIG.put("is_exit", true);
    ui.ttxs_pro_is_exit.setChecked(TTXS_PRO_CONFIG.get("is_exit"));
    TTXS_PRO_CONFIG.put("pinglun", true);
    ui.ttxs_pro_pinglun.setChecked(TTXS_PRO_CONFIG.get("pinglun"));
    TTXS_PRO_CONFIG.put("shipin", true);
    ui.ttxs_pro_shipin.setChecked(TTXS_PRO_CONFIG.get("shipin"));
    TTXS_PRO_CONFIG.put("wenzhang", true);
    ui.ttxs_pro_wenzhang.setChecked(TTXS_PRO_CONFIG.get("wenzhang"));
    TTXS_PRO_CONFIG.put("meiri", true);
    ui.ttxs_pro_meiri.setChecked(TTXS_PRO_CONFIG.get("meiri"));
    TTXS_PRO_CONFIG.put("meizhou", 0);
    ui.ttxs_pro_meizhou.setSelection(TTXS_PRO_CONFIG.get("meizhou"));
    TTXS_PRO_CONFIG.put("zhuanxiang", 0);
    ui.ttxs_pro_zhuanxiang.setSelection(TTXS_PRO_CONFIG.get("zhuanxiang"));
    TTXS_PRO_CONFIG.put("tiaozhan", true);
    ui.ttxs_pro_tiaozhan.setChecked(TTXS_PRO_CONFIG.get("tiaozhan"));
    TTXS_PRO_CONFIG.put("ocr_plugin", false);
    ui.ttxs_pro_ocr_plugin.setChecked(TTXS_PRO_CONFIG.get("ocr_plugin"));
    TTXS_PRO_CONFIG.put("ocr_maxtime", "5000");
    ui.ttxs_pro_ocr_maxtime.setText(TTXS_PRO_CONFIG.get("ocr_maxtime"));
    TTXS_PRO_CONFIG.put("duizhan_mode", 0);
    ui.ttxs_pro_duizhan_mode.setSelection(TTXS_PRO_CONFIG.get("duizhan_mode"));
    TTXS_PRO_CONFIG.put("jisu", "0");
    ui.ttxs_pro_jisu.setText(TTXS_PRO_CONFIG.get("jisu"));
    TTXS_PRO_CONFIG.put("guaji", true);
    ui.ttxs_pro_guaji.setChecked(TTXS_PRO_CONFIG.get("guaji"));
    TTXS_PRO_CONFIG.put("siren", true);
    ui.ttxs_pro_siren.setChecked(TTXS_PRO_CONFIG.get("siren"));
    TTXS_PRO_CONFIG.put("dacuo_num", "2");
    ui.ttxs_pro_dacuo_num.setText(TTXS_PRO_CONFIG.get("dacuo_num"));
    TTXS_PRO_CONFIG.put("shuangren", true);
    ui.ttxs_pro_shuangren.setChecked(TTXS_PRO_CONFIG.get("shuangren"));
    TTXS_PRO_CONFIG.put("bendi", true);
    ui.ttxs_pro_bendi.setChecked(TTXS_PRO_CONFIG.get("bendi"));
    TTXS_PRO_CONFIG.put("dingyue", 0);
    ui.ttxs_pro_dingyue.setSelection(TTXS_PRO_CONFIG.get("dingyue"));
    TTXS_PRO_CONFIG.put("pushplus", "");
    ui.ttxs_pro_pushplus.setText(TTXS_PRO_CONFIG.get("pushplus"));
    TTXS_PRO_CONFIG.put("yl_on", true);
    ui.ttxs_pro_yl_on.setChecked(TTXS_PRO_CONFIG.get("yl_on"));
    TTXS_PRO_CONFIG.put("yinliang", "0");
    ui.ttxs_pro_yinliang.setText(TTXS_PRO_CONFIG.get("yinliang"));
    TTXS_PRO_CONFIG.put("zhanghao", "");
    ui.ttxs_pro_zhanghao.setText(TTXS_PRO_CONFIG.get("zhanghao"));

    toastLog("天天向上pro配置恢复默认！");
});

// 保存study脚本设置
ui.study_save.click(function () {
    STUDY_CONFIG.put("article", ui.study_article.isChecked());
    STUDY_CONFIG.put("video", ui.study_video.getSelectedItemPosition());
    STUDY_CONFIG.put("meiri", ui.study_meiri.isChecked());
    STUDY_CONFIG.put("tiaozhan", ui.study_tiaozhan.isChecked());
    STUDY_CONFIG.put("checkbox_01", ui.study_checkbox_01.isChecked());
    STUDY_CONFIG.put("checkbox_02", ui.study_checkbox_02.isChecked());
    STUDY_CONFIG.put("checkbox_03", ui.study_checkbox_03.isChecked());
    STUDY_CONFIG.put("shuangren", ui.study_shuangren.isChecked());

    STUDY_CONFIG.put("huakuaidelay", ui.study_huakuaidelay.getText()+"");
    STUDY_CONFIG.put("select", ui.study_select.getSelectedItemPosition());
    STUDY_CONFIG.put("selectm", ui.study_selectm.getSelectedItemPosition());
    STUDY_CONFIG.put("select_01", ui.study_select_01.getSelectedItemPosition());
    STUDY_CONFIG.put("xianzhi", ui.study_xianzhi.isChecked());
    STUDY_CONFIG.put("another", ui.study_another.getText()+"");
    STUDY_CONFIG.put("stronger", ui.study_stronger.getSelectedItemPosition());

    STUDY_CONFIG.put("ssub", ui.study_ssub.getSelectedItemPosition());
    STUDY_CONFIG.put("diandian", ui.study_diandian.isChecked());
    STUDY_CONFIG.put("alltime", ui.study_alltime.getText()+"");
    STUDY_CONFIG.put("time1", ui.study_time1.getText()+"");
    STUDY_CONFIG.put("time2", ui.study_time2.getText()+"");
    STUDY_CONFIG.put("Token", ui.study_Token.getText()+"");

    toastLog("STUDY配置保存成功！");
});

// 重置study脚本设置
ui.study_reset.click(function () {
    STUDY_CONFIG.put("article", true);
    STUDY_CONFIG.put("video", 0);
    STUDY_CONFIG.put("meiri", true);
    STUDY_CONFIG.put("tiaozhan", true);
    STUDY_CONFIG.put("checkbox_01", true);
    STUDY_CONFIG.put("checkbox_02", true);
    STUDY_CONFIG.put("checkbox_03", true);
    STUDY_CONFIG.put("shuangren", true);
    ui.study_article.setChecked(STUDY_CONFIG.get("article"));
    ui.study_video.setSelection(STUDY_CONFIG.get("video"));
    ui.study_meiri.setChecked(STUDY_CONFIG.get("meiri"));
    ui.study_tiaozhan.setChecked(STUDY_CONFIG.get("tiaozhan"));
    ui.study_checkbox_01.setChecked(STUDY_CONFIG.get("checkbox_01"));
    ui.study_checkbox_02.setChecked(STUDY_CONFIG.get("checkbox_02"));
    ui.study_checkbox_03.setChecked(STUDY_CONFIG.get("checkbox_03"));
    ui.study_shuangren.setChecked(STUDY_CONFIG.get("shuangren"));

    STUDY_CONFIG.put("huakuaidelay", "300");
    STUDY_CONFIG.put("select", 0);
    STUDY_CONFIG.put("selectm", 0);
    STUDY_CONFIG.put("select_01", 0);
    STUDY_CONFIG.put("xianzhi", false);
    STUDY_CONFIG.put("another", "1");
    STUDY_CONFIG.put("stronger", 0);
    ui.study_huakuaidelay.setText(STUDY_CONFIG.get("huakuaidelay"));
    ui.study_select.setSelection(STUDY_CONFIG.get("select"));
    ui.study_selectm.setSelection(STUDY_CONFIG.get("selectm"));
    ui.study_select_01.setSelection(STUDY_CONFIG.get("select_01"));
    ui.study_xianzhi.setChecked(STUDY_CONFIG.get("xianzhi"));
    ui.study_another.setText(STUDY_CONFIG.get("another"));
    ui.study_stronger.setSelection(STUDY_CONFIG.get("stronger"));

    STUDY_CONFIG.put("ssub", 0);
    STUDY_CONFIG.put("diandian", false);
    STUDY_CONFIG.put("alltime", "2000");
    STUDY_CONFIG.put("time1", "61");
    STUDY_CONFIG.put("time2", "6");
    STUDY_CONFIG.put("Token", "");
    ui.study_ssub.setSelection(STUDY_CONFIG.get("ssub"));
    ui.study_diandian.setChecked(STUDY_CONFIG.get("diandian"));
    ui.study_alltime.setText(STUDY_CONFIG.get("alltime"));
    ui.study_time1.setText(STUDY_CONFIG.get("time1"));
    ui.study_time2.setText(STUDY_CONFIG.get("time2"));
    ui.study_Token.setText(STUDY_CONFIG.get("Token"));

    toastLog("STUDY配置恢复默认！");
});

ui.study_baidusave.click(function () {
    check_baidu_api();
});

ui.study_baidureset.click(function () {
    BAIDUAPI.put("AK", "");
    BAIDUAPI.put("SK", "");
    ui.study_AK.setText(BAIDUAPI.get("AK", ""));
    ui.study_SK.setText(BAIDUAPI.get("SK", ""));
    toastLog("百度API恢复默认！");
});

ui.study_baiduregister.click(function () {
    app.openUrl("https://cloud.baidu.com/doc/OCR/s/dk3iqnq51");
});

// 读取脚本设置
function Initialize() {
    ui.script_chosen.setSelection(GLOBAL_CONFIG.get("script_chosen", 0));

    ui.ttxs_pro_watchdog.setText(TTXS_PRO_CONFIG.get("watchdog", "1800"));
    ui.ttxs_pro_slide_verify.setText(TTXS_PRO_CONFIG.get("slide_verify", "300"));
    ui.ttxs_pro_fast_mode.setChecked(TTXS_PRO_CONFIG.get("fast_mode", false));
    ui.ttxs_pro_ddtong.setChecked(TTXS_PRO_CONFIG.get("ddtong", false));
    ui.ttxs_pro_is_exit.setChecked(TTXS_PRO_CONFIG.get("is_exit", true));
    ui.ttxs_pro_pinglun.setChecked(TTXS_PRO_CONFIG.get("pinglun", true));
    ui.ttxs_pro_shipin.setChecked(TTXS_PRO_CONFIG.get("shipin", true));
    ui.ttxs_pro_wenzhang.setChecked(TTXS_PRO_CONFIG.get("wenzhang", true));
    ui.ttxs_pro_meiri.setChecked(TTXS_PRO_CONFIG.get("meiri", true));
    ui.ttxs_pro_meizhou.setSelection(TTXS_PRO_CONFIG.get("meizhou", 0));
    ui.ttxs_pro_zhuanxiang.setSelection(TTXS_PRO_CONFIG.get("zhuanxiang", 0));
    ui.ttxs_pro_tiaozhan.setChecked(TTXS_PRO_CONFIG.get("tiaozhan", true));
    ui.ttxs_pro_ocr_plugin.setChecked(TTXS_PRO_CONFIG.get("ocr_plugin", false));
    ui.ttxs_pro_ocr_maxtime.setText(TTXS_PRO_CONFIG.get("ocr_maxtime", "5000"));
    ui.ttxs_pro_duizhan_mode.setSelection(TTXS_PRO_CONFIG.get("duizhan_mode", 0));
    ui.ttxs_pro_jisu.setText(TTXS_PRO_CONFIG.get("jisu", "0"));
    ui.ttxs_pro_guaji.setChecked(TTXS_PRO_CONFIG.get("guaji", true));
    ui.ttxs_pro_siren.setChecked(TTXS_PRO_CONFIG.get("siren", true));
    ui.ttxs_pro_dacuo_num.setText(TTXS_PRO_CONFIG.get("dacuo_num", "2"));
    ui.ttxs_pro_shuangren.setChecked(TTXS_PRO_CONFIG.get("shuangren", true));
    ui.ttxs_pro_bendi.setChecked(TTXS_PRO_CONFIG.get("bendi", true));
    ui.ttxs_pro_dingyue.setSelection(TTXS_PRO_CONFIG.get("dingyue", 0));
    ui.ttxs_pro_pushplus.setText(TTXS_PRO_CONFIG.get("pushplus", ""));
    ui.ttxs_pro_yl_on.setChecked(TTXS_PRO_CONFIG.get("yl_on", true));
    ui.ttxs_pro_yinliang.setText(TTXS_PRO_CONFIG.get("yinliang", "0"));
    ui.ttxs_pro_zhanghao.setText(TTXS_PRO_CONFIG.get("zhanghao", ""));

    ui.study_article.setChecked(STUDY_CONFIG.get("article", true));
    ui.study_video.setSelection(STUDY_CONFIG.get("video", 0));
    ui.study_meiri.setChecked(STUDY_CONFIG.get("meiri", true));
    ui.study_tiaozhan.setChecked(STUDY_CONFIG.get("tiaozhan", true));
    ui.study_checkbox_01.setChecked(STUDY_CONFIG.get("checkbox_01", true));
    ui.study_checkbox_02.setChecked(STUDY_CONFIG.get("checkbox_02", true));
    ui.study_checkbox_03.setChecked(STUDY_CONFIG.get("checkbox_03", true));
    ui.study_huakuaidelay.setText(STUDY_CONFIG.get("huakuaidelay", "300"));
    ui.study_shuangren.setChecked(STUDY_CONFIG.get("shuangren", true));
    ui.study_select.setSelection(STUDY_CONFIG.get("select", 0));
    ui.study_selectm.setSelection(STUDY_CONFIG.get("selectm", 0));
    ui.study_select_01.setSelection(STUDY_CONFIG.get("select_01", 0));
    ui.study_xianzhi.setChecked(STUDY_CONFIG.get("xianzhi", false));
    ui.study_another.setText(STUDY_CONFIG.get("another", "1"));
    ui.study_stronger.setSelection(STUDY_CONFIG.get("stronger", 0));
    ui.study_AK.setText(BAIDUAPI.get("AK", ""));
    ui.study_SK.setText(BAIDUAPI.get("SK", ""));
    ui.study_ssub.setSelection(STUDY_CONFIG.get("ssub", 0));
    ui.study_diandian.setChecked(STUDY_CONFIG.get("diandian", false));
    ui.study_alltime.setText(STUDY_CONFIG.get("alltime", "2000"));
    ui.study_time1.setText(STUDY_CONFIG.get("time1", "61"));
    ui.study_time2.setText(STUDY_CONFIG.get("time2", "6"));
    ui.study_Token.setText(STUDY_CONFIG.get("Token", ""));
}

// 检查百度API
function check_baidu_api() {
    thread = threads.start(function () {
        let AK = String(ui.study_AK.getText());
        let SK = String(ui.study_SK.getText());
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
            ui.study_AK.setText(BAIDUAPI.get("AK", ""));
            ui.study_SK.setText(BAIDUAPI.get("SK", ""));
            BAIDUAPI.put("AK", "");
            BAIDUAPI.put("SK", "");
        } else {
            toastLog("API Key、Secret Key正确，且已缓存");
            BAIDUAPI.put("AK", AK);
            BAIDUAPI.put("SK", SK);
        }
    });
}

// APP更新提示
function checkversion() {
    var releaseNotes = "版本 v" + latest_version + "\n" +
        "更新日志:\n" +
        "* 1.基于AutoX v6.2.3重新打包\n" +
        "* 2.新增多个备选脚本,有待测试"
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
            GLOBAL_CONFIG.put("NO_UPDATE", 1);
        }).show();
}

// 打开下载进度面板
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

// 下载apk的主方法体
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