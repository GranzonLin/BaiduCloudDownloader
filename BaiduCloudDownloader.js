// ==UserScript==
// @name              百度网盘直链下载器
// @namespace         https://https://github.com/u0966537/BaiduCloudDownloader
// @version           1.0
// @description       【百度网盘直链下载器】
// @author            Junjun He
// @supportURL        https://https://github.com/u0966537/BaiduCloudDownloader
// @match             *://pan.baidu.com/disk/home*
// @match             *://yun.baidu.com/disk/home*
// @match             *://pan.baidu.com/s/*
// @match             *://yun.baidu.com/s/*
// @match             *://pan.baidu.com/share/*
// @match             *://yun.baidu.com/share/*
// @require           https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @require           https://cdn.bootcss.com/sweetalert/2.1.2/sweetalert.min.js
// @connect           baidu.com
// @connect           baidupcs.com
// @connect           *
// @run-at            document-idle
// @grant             unsafeWindow
// @grant             GM_xmlhttpRequest
// @grant             GM_setClipboard
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_deleteValue
// @grant             GM_openInTab
// @grant             GM_registerMenuCommand
// @grant             GM_unregisterMenuCommand
// ==/UserScript==

'use strict';

"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
!function () {
    function e(e, t, i) {
        e = e || "", t = t || "", i = i || "", console.group("[百度网盘直链下载助手]"), console.log(e, t, i), console.groupEnd();
    }

    // BDUSS
    function aria_download(e, i, n) {
        a = "GRMRm8wTmNlZWdMNG5abjFQSlBxNHluYU05d0JpWW5pYk1QZmk3c1h-TjhLVUplRUFBQUFBJCQAAAAAAAAAAAEAAABRRqExeDHO9MTqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHycGl58nBpee";
        return  'aria2c "' + e + '" --out "' + i + '" --header "User-Agent: ' + n + '" --header "Cookie: BDUSS=' + a + '"';
    }

    function n(e) {
        return e ? e.replace(/&/g, "&amp;") : "";
    }

    function a() {
        function t() {
            ie = N(), ne = J(), ae = K(), oe = d(), he = F(), "all" == he && (fe = V()), "category" == he && (ve = U()), "search" == he && (me = z()), a(), i(), n();
        }

        function i() {
            "all" == he ? se = L() : "category" == he ? se = H() : "search" == he && (se = q());
        }

        function n() {
            re = [];
        }

        function a() {
            pe = o();
        }

        function o() {
            return $("." + f.list).is(":hidden") ? "grid" : "list";
        }

        function s() {
            p(), u(), w(), _(), S(), r();
        }

        function r() {
            $(document).on("click", ".exe-download", function (e) {
                e.target.innerText && Z(e.target.innerText);
            }), $(document).on("click", ".aria-rpc", function (e) {
                var t = (e.target.dataset.link, e.target.dataset.filename), i = {};
                P() || (i = {"User-Agent": b}), GM_xmlhttpRequest({
                    method: "HEAD",
                    headers: i,
                    url: e.target.dataset.link,
                    onload: function (e) {
                        var i = e.finalUrl;
                        if (i) {
                            var n = x.domain + ":" + x.port + "/jsonrpc", a = {
                                id: (new Date).getTime(),
                                jsonrpc: "2.0",
                                method: "aria2.addUri",
                                params: ["token:" + x.token, [i], {
                                    dir: x.dir,
                                    out: t,
                                    header: P() ? ["User-Agent:" + y] : ["User-Agent:" + b]
                                }]
                            };
                            GM_xmlhttpRequest({
                                method: "POST",
                                headers: {"User-Agent": b},
                                url: n,
                                responseType: "json",
                                timeout: 3e3,
                                data: JSON.stringify(a),
                                onload: function (e) {
                                    e.response.result ? swal({
                                        text: "发送成功",
                                        icon: "success",
                                        timer: 800
                                    }) : swal({text: e.response.message, icon: "error"});
                                },
                                ontimeout: function () {
                                    swal({text: "无法连接到RPC服务，请检查RPC配置", icon: "error"});
                                }
                            });
                        }
                    }
                });
            });
        }

        function p() {
            window.addEventListener("hashchange", function (e) {
                a(), "all" == F() ? he == F() ? fe != V() && (fe = V(), i(), n()) : (he = F(), fe = V(), i(), n()) : "category" == F() ? he == F() ? ve != U() && (he = F(), ve = U(), i(), n()) : (he = F(), ve = U(), i(), n()) : "search" == F() && (he == F() ? me != z() && (he = F(), me = z(), i(), n()) : (he = F(), me = z(), i(), n()));
            });
        }

        function u() {
            $("a[data-type=list]").click(function () {
                pe = "list";
            }), $("a[data-type=grid]").click(function () {
                pe = "grid";
            });
        }

        function w() {
            var t = $("span." + f.checkbox);
            "grid" == pe && (t = $("." + f["chekbox-grid"])), t.each(function (t, i) {
                $(i).on("click", function (t) {
                    var i = $(this).parent(), n = void 0, a = void 0;
                    if ("list" == pe ? (n = $("div.file-name div.text a", i).attr("title"), a = i.hasClass(f["item-active"])) : "grid" == pe && (n = $("div.file-name a", $(this)).attr("title"), a = !$(this).hasClass(f["item-active"])), a) {
                        e("取消选中文件：" + n);
                        for (var o = 0; o < re.length; o++) re[o].filename == n && re.splice(o, 1);
                    } else e("选中文件:" + n), $.each(se, function (e, t) {
                        if (t.server_filename == n) {
                            var i = {filename: t.server_filename, path: t.path, fs_id: t.fs_id, isdir: t.isdir};
                            re.push(i);
                        }
                    });
                });
            });
        }

        function k() {
            $("span." + f.checkbox).each(function (e, t) {
                $(t).unbind("click");
            });
        }

        function _() {
            $("div." + f["col-item"] + "." + f.check).each(function (t, i) {
                $(i).bind("click", function (t) {
                    $(this).parent().hasClass(f.checked) ? (e("取消全选"), re = []) : (e("全部选中"), re = [], $.each(se, function (e, t) {
                        var i = {filename: t.server_filename, path: t.path, fs_id: t.fs_id, isdir: t.isdir};
                        re.push(i);
                    }));
                });
            });
        }

        function A() {
            $("div." + f["col-item"] + "." + f.check).each(function (e, t) {
                $(t).unbind("click");
            });
        }

        function S() {
            $("div." + f["list-view"] + " dd").each(function (t, i) {
                $(i).bind("click", function (t) {
                    var i = t.target.nodeName.toLowerCase();
                    if ("span" != i && "a" != i && "em" != i) if (e("shiftKey:" + t.shiftKey), t.shiftKey) {
                        re = [];
                        var n = $("div." + f["list-view"] + " dd." + f["item-active"]);
                        $.each(n, function (t, i) {
                            var n = $("div.file-name div.text a", $(i)).attr("title");
                            e("选中文件：" + n), $.each(se, function (e, t) {
                                if (t.server_filename == n) {
                                    var i = {filename: t.server_filename, path: t.path, fs_id: t.fs_id, isdir: t.isdir};
                                    re.push(i);
                                }
                            });
                        });
                    } else {
                        re = [];
                        var a = $("div.file-name div.text a", $(this)).attr("title");
                        e("选中文件：" + a), $.each(se, function (e, t) {
                            if (t.server_filename == a) {
                                var i = {filename: t.server_filename, path: t.path, fs_id: t.fs_id, isdir: t.isdir};
                                re.push(i);
                            }
                        });
                    }
                });
            });
        }

        function C() {
            $("div." + f["list-view"] + " dd").each(function (e, t) {
                $(t).unbind("click");
            });
        }

        function M() {
            var e = window.MutationObserver, t = {childList: !0};
            ue = new e(function (e) {
                k(), A(), C(), w(), _(), S();
            });
            var i = document.querySelector("." + f["list-view"]), n = document.querySelector("." + f["grid-view"]);
            ue.observe(i, t), ue.observe(n, t);
        }

        function G() {
            $("div." + f["bar-search"]).css("width", "18%");
            var e = $('<span class="g-dropdown-button"></span>'),
                t = $('<a class="g-button g-button-blue" href="javascript:;"><span class="g-button-right"><em class="icon icon-speed" title="百度网盘下载助手"></em><span class="text" style="width: 60px;">下载助手</span></span></a>'),
                i = $('<span class="menu" style="width:114px"></span>'),
                n = $('<span class="g-button-menu" style="display:block"></span>'),
                a = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                o = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">直链下载</span></span></a>'),
                l = $('<span class="menu" style="width:120px;left:79px"></span>'),
                s = $('<a id="batchhttplink-direct" class="g-button-menu" href="javascript:;">显示链接</a>');
            l.append(s), n.append(a.append(o).append(l)), n.hover(function () {
                a.toggleClass("button-open");
            }), s.click(I);
            var r = $('<span class="g-button-menu" style="display:block"></span>'),
                d = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                c = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">Aria下载</span></span></a>'),
                p = $('<span class="menu" style="width:120px;left:79px"></span>'),
                u = $('<a id="batchhttplink-aria" class="g-button-menu" href="javascript:;">显示链接</a>');
            p.append(u), r.append(d.append(c).append(p)), r.hover(function () {
                d.toggleClass("button-open");
            }), u.click(I);
            var h = $('<span class="g-button-menu" style="display:block"></span>'),
                v = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                g = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">导出到RPC</span></span></a>'),
                m = $('<span class="menu" style="width:120px;left:79px"></span>'),
                w = $('<a id="batchhttplink-rpc" class="g-button-menu" href="javascript:;">显示链接</a>'),
                b = $('<a class="g-button-menu" href="javascript:;">RPC配置</a>');
            m.append(w).append(b), h.append(v.append(g).append(m)), h.hover(function () {
                v.toggleClass("button-open");
            }), w.click(I), b.click(T);
            var y = $('<span class="g-button-menu" style="display:block"></span>'),
                x = $('<span class="g-dropdown-button g-dropdown-button-second" menulevel="2"></span>'),
                k = $('<a class="g-button" href="javascript:;"><span class="g-button-right"><span class="text" style="width:auto">API下载</span></span></a>'),
                _ = $('<span class="menu" style="width:120px;left:77px"></span>'),
                A = $('<a id="download-api" class="g-button-menu" href="javascript:;">直接下载</a>'),
                S = $('<a id="batchhttplink-api" class="g-button-menu" href="javascript:;">显示链接</a>'),
                C = $('<a id="appid-setting" class="g-button-menu" href="javascript:;">神秘代码</a>'),
                M = $('<a id="default-setting" class="g-button-menu" href="javascript:;" style="color: #999;">恢复默认</a>');
            _.append(A).append(S).append(C).append(M), y.append(x.append(k).append(_)), y.hover(function () {
                x.toggleClass("button-open");
            }), A.click(D), S.click(I), C.click(E), M.click(j);
            var G = $('<span class="g-button-menu" style="display:block;cursor: pointer">分享选中文件</span>'),
                P = $('<iframe src="https://ghbtns.com/github-btn.html?user=syhyz1990&repo=baiduyun&type=star&count=true" frameborder="0" scrolling="0" style="height: 20px;max-width: 120px;padding: 0 5px;box-sizing: border-box;margin-top: 5px;"></iframe>');
            G.click(X), i.append(y).append(r).append(h).append(G).append(P), e.append(t).append(i), e.hover(function () {
                e.toggleClass("button-open");
            }), $("." + f["list-tools"]).append(e), $("." + f["list-tools"]).css("height", "40px");
        }

        function T() {
            var e = "";
            e += '<div style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"><label for="rpcDomain" style="margin-right: 5px;flex: 0 0 90px;">主机：</label><input type="text" id="rpcDomain" value="' + x.domain + '" class="swal-content__input" placeholder="http://localhost"></div>', e += '<div style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"><label for="rpcPort" style="margin-right: 5px;flex: 0 0 90px;">端口：</label><input type="number" id="rpcPort" value="' + x.port + '" class="swal-content__input" placeholder="6800"></div>', e += '<div style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"><label for="rpcToken" style="margin-right: 5px;flex: 0 0 90px;">密钥：</label><input type="text" id="rpcToken" value="' + x.token + '" class="swal-content__input" placeholder="没有留空"></div>', e += '<div style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"><label for="rpcDir" style="margin-right: 5px;flex: 0 0 90px;">下载路径：</label><input type="text" id="rpcDir" value="' + x.dir + '" class="swal-content__input" placeholder="默认为D:"></div>', e = "<div>" + e + "</div>";
            var t = $(e);
            swal({title: "RPC配置", closeOnClickOutside: !1, content: t[0], button: {text: "保存"}}).then(function () {
                GM_setValue("rpcDomain", $("#rpcDomain").val() ? $("#rpcDomain").val() : x.domain), GM_setValue("rpcPort", $("#rpcPort").val() ? $("#rpcPort").val() : x.port), GM_setValue("rpcToken", $("#rpcToken").val()), GM_setValue("rpcDir", $("#rpcDir").val() ? $("#rpcDir").val() : x.dir), history.go(0), swal({
                    text: "保存成功",
                    timer: 800
                });
            });
        }

        function E() {
            swal({
                text: "请输入神秘代码",
                closeOnClickOutside: !1,
                content: {element: "input", attributes: {value: m, placeholder: "默认为：" + g}},
                button: {confirm: {text: "确定", value: "ok"}}
            }).then(function (e) {
                e && (GM_setValue("secretCode", e), swal("神秘代码执行成功 , 点击确定将自动刷新").then(function () {
                    history.go(0);
                }));
            });
        }

        function j() {
            GM_setValue("secretCode", g), swal("恢复默认成功，点击确定将自动刷新").then(function () {
                history.go(0);
            });
        }

        function P() {
            return 1 === te.ISSVIP;
        }

        function D(t) {
            e("选中文件列表：", re);
            var i = t.target.id, n = void 0;
            if ("download-direct" == i) {
                var a = void 0;
                if (0 === re.length) return void swal(v.unselected);
                1 == re.length && (a = 1 === re[0].isdir ? "batch" : "dlink"), re.length > 1 && (a = "batch"), le = B(re);
                var o = Q(a);
                if (0 !== o.errno) return -1 == o.errno ? void swal("文件不存在或已被百度和谐，无法下载！") : 112 == o.errno ? void swal("页面过期，请刷新重试！") : void swal("发生错误！");
                if ("dlink" == a) n = o.dlink[0].dlink; else {
                    if ("batch" != a) return void swal("发生错误！");
                    n = o.dlink, 1 === re.length && (n = n + "&zipname=" + encodeURIComponent(re[0].filename) + ".zip");
                }
            } else {
                if (0 === re.length) return void swal(v.unselected);
                if (re.length > 1) return void swal(v.morethan);
                if (1 == re[0].isdir) return void swal(v.dir);
                "download-api" == i && (n = W(re[0].path));
            }
            Z(n);
        }

        function I(t) {
            if (e("选中文件列表：", re), 0 === re.length) return void swal(v.unselected);
            var i = t.target.id, n = void 0, a = void 0;
            if (n = -1 == i.indexOf("https") ? -1 == i.indexOf("http") ? location.protocol + ":" : "http:" : "https:", de = [], ce = [], -1 != i.indexOf("direct")) {
                de = O(n);
                if (0 === de.length) return void swal("没有链接可以显示，不要选中文件夹！");
                ge.open({
                    title: "直链下载",
                    type: "batch",
                    list: de,
                    tip: '点击链接直接下载，请先升级 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a> 至 <b>v2.2.0</b>，本链接仅支持小文件下载（<300M）',
                    showcopy: !1
                });
            }
            if (-1 != i.indexOf("aria")) {
                if (de = R(n), a = '请先安装 <a  href="https://www.baiduyun.wiki/zh-cn/assistant.html">网盘万能助手</a> 请将链接复制到支持Aria的下载器中, 推荐使用 <a href="http://pan.baiduyun.wiki/down">XDown</a>。', 0 === de.length) return void swal("没有链接可以显示，不要选中文件夹！");
                ge.open({title: "Aria链接", type: "batchAria", list: de, tip: a, showcopy: !0});
            }
            if (-1 != i.indexOf("rpc")) {
                if (de = R(n), a = '点击按钮发送链接至Aria下载器中<a href="https://www.baiduyun.wiki/zh-cn/rpc.html">详细说明</a>，需配合最新版 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a>，支持本地和远程下载，此功能建议配合百度会员使用', 0 === de.length) return void swal("没有链接可以显示，不要选中文件夹！");
                ge.open({title: "Aria RPC", type: "batchAriaRPC", list: de, tip: a, showcopy: !1});
            }
            if (-1 != i.indexOf("api")) {
                if (de = R(n), a = '请先安装 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">网盘万能助手</a> <b>v2.2.0</b> 后点击链接下载，若下载失败，请更换神秘代码 <a href="https://www.baiduyun.wiki/zh-cn/question.html" target="_blank">获取神秘代码</a>', 0 === de.length) return void swal("没有链接可以显示，API链接不要全部选中文件夹！");
                ge.open({title: "API下载链接", type: "batch", list: de, tip: a});
            }
        }

        function O(e) {
            var t = [];
            return $.each(re, function (i, n) {
                var a = void 0, o = void 0, l = void 0;
                a = 0 == n.isdir ? "dlink" : "batch", le = B([n]), l = Q(a), 0 == l.errno ? ("dlink" == a ? o = l.dlink[0].dlink : "batch" == a && (o = l.dlink), o = o.replace(/^([A-Za-z]+):/, e)) : o = "error", t.push({
                    filename: n.filename,
                    downloadlink: o
                });
            }), t;
        }

        function R(e) {
            var t = [];
            return $.each(re, function (i, n) {
                if (1 != n.isdir) {
                    var a = void 0;
                    a = W(n.path), a = a.replace(/^([A-Za-z]+):/, e), t.push({filename: n.filename, downloadlink: a});
                }
            }), t;
        }

        function N() {
            var e = void 0;
            try {
                e = new Function("return " + te.sign2)();
            } catch (e) {
                throw new Error(e.message);
            }
            return l(e(te.sign5, te.sign1));
        }

        function V() {
            var e = location.hash, t = new RegExp("path=([^&]*)(&|$)", "i"), i = e.match(t);
            return decodeURIComponent(i[1]);
        }

        function U() {
            var e = location.hash, t = new RegExp("type=([^&]*)(&|$)", "i"), i = e.match(t);
            return decodeURIComponent(i[1]);
        }

        function z() {
            var e = location.hash, t = new RegExp("key=([^&]*)(&|$)", "i"), i = e.match(t);
            return decodeURIComponent(i[1]);
        }

        function F() {
            var e = location.hash;
            return e.substring(e.indexOf("#") + 2, e.indexOf("?"));
        }

        function L() {
            var e = [], t = we + "list", i = V();
            oe = d();
            var n = {
                dir: i,
                bdstoken: ae,
                logid: oe,
                order: "size",
                num: 1e3,
                desc: 0,
                clienttype: 0,
                showempty: 0,
                web: 1,
                channel: "chunlei",
                appid: m
            };
            return $.ajax({
                url: t, async: !1, method: "GET", data: n, success: function (t) {
                    e = 0 === t.errno ? t.list : [];
                }
            }), e;
        }

        function H() {
            var e = [], t = we + "categorylist", i = U();
            oe = d();
            var n = {
                category: i,
                bdstoken: ae,
                logid: oe,
                order: "size",
                desc: 0,
                clienttype: 0,
                showempty: 0,
                web: 1,
                channel: "chunlei",
                appid: m
            };
            return $.ajax({
                url: t, async: !1, method: "GET", data: n, success: function (t) {
                    e = 0 === t.errno ? t.info : [];
                }
            }), e;
        }

        function q() {
            var e = [], t = we + "search";
            oe = d(), me = z();
            var i = {
                recursion: 1,
                order: "time",
                desc: 1,
                showempty: 0,
                web: 1,
                page: 1,
                num: 100,
                key: me,
                channel: "chunlei",
                app_id: 250528,
                bdstoken: ae,
                logid: oe,
                clienttype: 0
            };
            return $.ajax({
                url: t, async: !1, method: "GET", data: i, success: function (t) {
                    e = 0 === t.errno ? t.list : [];
                }
            }), e;
        }

        function B(e) {
            if (0 === e.length) return null;
            var t = [];
            return $.each(e, function (e, i) {
                t.push(i.fs_id);
            }), "[" + t + "]";
        }

        function J() {
            return te.timestamp;
        }

        function K() {
            return te.MYBDSTOKEN;
        }

        function X() {
            var e = [];
            if (0 === re.length) return void swal(v.unselected);
            $.each(re, function (t, i) {
                e.push(i.path);
            });
            var t = "https://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&channel=chunlei&web=1&app_id=250528&bdstoken=" + ae + "&logid=" + oe + "&clienttype=0",
                i = Y(), n = {schannel: 4, channel_list: JSON.stringify([]), period: 0, pwd: i, fid_list: B(re)};
            $.ajax({
                url: t, async: !1, method: "POST", data: n, success: function (e) {
                    if (0 === e.errno) {
                        var t = e.link + "#" + i;
                        swal({
                            title: "分享链接",
                            closeOnClickOutside: !1,
                            text: t + " （#后面为提取码）",
                            buttons: {open: {text: "打开", value: "open"}, copy: {text: "复制链接", value: "copy"}}
                        }).then(function (e) {
                            "open" === e && GM_openInTab(t, {active: !0}), "copy" === e && GM_setClipboard(t);
                        });
                    }
                }
            });
        }

        function Y() {
            function e(e, t) {
                return Math.round(Math.random() * (e - t) + t);
            }

            for (var t = "", i = 0; i < 4; i++) {
                t = t + e(0, 9) + String.fromCharCode(e(97, 122)) + String.fromCharCode(e(65, 90));
            }
            for (var n = "", i = 0; i < 4; i++) n += t[e(0, t.length - 1)];
            return n;
        }

        function Q(e) {
            var t = void 0;
            oe = d();
            var i = {sign: ie, timestamp: ne, fidlist: le, type: e};
            return $.ajax({
                url: "https://pan.baidu.com/api/download?clienttype=1",
                async: !1,
                method: "POST",
                data: i,
                success: function (e) {
                    t = e;
                }
            }), t;
        }

        function W(e) {
            return be + "file?method=download&path=" + encodeURIComponent(e) + "&app_id=" + m;
        }

        function Z(e) {
            $("#helperdownloadiframe").attr("src", e);
        }

        function ee() {
            var e = $('<div class="helper-hide" style="padding:0;margin:0;display:block"></div>'),
                t = $('<iframe src="javascript:;" id="helperdownloadiframe" style="display:none"></iframe>');
            e.append(t), $("body").append(e);
        }

        var te = void 0, ie = void 0, ne = void 0, ae = void 0, oe = void 0, le = void 0, se = [], re = [], de = [],
            ce = [], pe = "list", ue = void 0, he = void 0, fe = void 0, ve = void 0, ge = void 0, me = void 0,
            we = location.protocol + "//" + location.host + "/api/",
            be = location.protocol + "//pcs.baidu.com/rest/2.0/pcs/";
        location.protocol;
        this.init = function () {
            if (te = unsafeWindow.yunData, e("初始化信息:", te), void 0 === te) return void e("页面未正常加载，或者百度已经更新！");
            t(), s(), M(), G(), ee(), ge = new c({addCopy: !0}), e("下载助手加载成功！当前版本：", h);
        };
    }

    function o() {
        function t() {
            if (fe = n(), W = Q.SIGN, Z = Q.TIMESTAMP, ee = Q.MYBDSTOKEN, te = "chunlei", ie = 0, ne = 1, ae = m, oe = d(), le = 0, se = "share", de = Q.SHARE_ID, re = Q.SHARE_UK, "secret" == fe && (pe = l()), a()) {
                var e = {};
                2 == Q.CATEGORY ? (e.filename = Q.FILENAME, e.path = Q.PATH, e.fs_id = Q.FS_ID, e.isdir = 0) : void 0 != Q.FILEINFO && (e.filename = Q.FILEINFO[0].server_filename, e.path = Q.FILEINFO[0].path, e.fs_id = Q.FILEINFO[0].fs_id, e.isdir = Q.FILEINFO[0].isdir), $e.push(e);
            } else ue = Q.SHARE_ID, ge = s(), me = u(), xe = z();
        }

        function i() {
            var e = location.hash && /^#([a-zA-Z0-9]{4})$/.test(location.hash) && RegExp.$1,
                t = $('.pickpw input[tabindex="1"]'), i = $(".pickpw a.g-button"), n = $(".pickpw .input-area"),
                a = $('<div style="margin:-8px 0 10px ;color: #ff5858">正在获取提取码</div>');
            (location.href.match(/\/init\?(?:surl|shareid)=((?:\w|-)+)/) || location.href.match(/\/s\/1((?:\w|-)+)/))[1];
            t && i && (n.prepend(a), e && (a.text("发现提取码，已自动为您填写"), setTimeout(function () {
                t.val(e), i.click();
            }, 500)));
        }

        function n() {
            return 1 === Q.SHARE_PUBLIC ? "public" : "secret";
        }

        function a() {
            return void 0 === Q.getContext;
        }

        function o() {
            return 1 == Q.MYSELF;
        }

        function l() {
            return '{"sekey":"' + decodeURIComponent(r("BDCLND")) + '"}';
        }

        function s() {
            var e = location.hash, t = new RegExp("path=([^&]*)(&|$)", "i"), i = e.match(t);
            return decodeURIComponent(i[1]);
        }

        function u() {
            var e = "list";
            return $(".list-switched-on").length > 0 ? e = "list" : $(".grid-switched-on").length > 0 && (e = "grid"), e;
        }

        function g() {
            a() ? ($("div.slide-show-right").css("width", "500px"), $("div.frame-main").css("width", "96%"), $("div.share-file-viewer").css("width", "740px").css("margin-left", "auto").css("margin-right", "auto")) : $("div.slide-show-right").css("width", "500px");
            var e = $('<span class="g-dropdown-button"></span>'),
                t = $('<a class="g-button g-button-blue" style="width: 114px;" data-button-id="b200" data-button-index="200" href="javascript:;"></a>'),
                i = $('<span class="g-button-right"><em class="icon icon-speed" title="百度网盘下载助手"></em><span class="text" style="width: 60px;">下载助手</span></span>'),
                n = $('<span class="menu" style="width:auto;z-index:41"></span>'),
                
                r = $('<a data-menu-id="b-menu208" class="g-button-menu" href="javascript:;" data-type="down">显示链接</a>'),
                d = $('<a data-menu-id="b-menu208" class="g-button-menu" href="javascript:;">显示Aria链接</a>'),
                o = $('<a data-menu-id="b-menu207" class="g-button-menu" href="javascript:;">保存到网盘</a>'),
                p = $('<a data-menu-id="b-menu209" style="color: #e85653;font-weight: 700;" class="g-button-menu" href="javascript:;">Ver ' + h + "</a>");
            n.append(r).append(d).append(o).append(p), t.append(i), e.append(t).append(n), e.hover(function () {
                e.toggleClass("button-open");
            }), o.click(_), r.click(J), d.click(S), p.click(github_link), $("div.module-share-top-bar div.bar div.x-button-box").append(e);
        }

        function y() {
            var e = {shareid: ue, from: Q.SHARE_UK, bdstoken: Q.MYBDSTOKEN, logid: d()},
                t = {path: w, isdir: 1, size: "", block_list: [], method: "post", dataType: "json"},
                i = "https://pan.baidu.com/api/create?a=commit&channel=chunlei&app_id=250528&web=1&app_id=250528&bdstoken=" + e.bdstoken + "&logid=" + e.logid + "&clienttype=0";
            $.ajax({
                url: i, async: !1, method: "POST", data: t, success: function (e) {
                    0 === e.errno ? (swal("目录创建成功！"), _()) : swal("目录创建失败，请前往我的网盘页面手动创建！");
                }
            });
        }


        // This method opens the github URL in a new tab.
        function github_link() {
            GM_openInTab("https://github.com/u0966537/BaiduCloudDownloader", {active: !0});
        }

        function _() {
            if (null === ee) return swal(v.unlogin), !1;
            if (0 === $e.length) return void swal(v.unselected);
            if (o()) return void swal({
                title: "提示",
                text: "自己分享的文件请到网盘中下载！",
                buttons: {confirm: {text: "打开网盘", value: "confirm"}}
            }).then(function (e) {
                "confirm" === e && (location.href = "https://pan.baidu.com/disk/home#/all?path=%2F&vmode=list");
            });
            var e = [];
            $.each($e, function (t, i) {
                e.push(i.fs_id);
            });
            var t = {shareid: Q.SHARE_ID, from: Q.SHARE_UK, bdstoken: Q.MYBDSTOKEN, logid: d()},
                i = {path: GM_getValue("savePath"), fsidlist: JSON.stringify(e)},
                n = "https://pan.baidu.com/share/transfer?shareid=" + t.shareid + "&from=" + t.from + "&ondup=newcopy&async=1&channel=chunlei&web=1&app_id=250528&bdstoken=" + t.bdstoken + "&logid=" + t.logid + "&clienttype=0";
            $.ajax({
                url: n, async: !1, method: "POST", data: i, success: function (e) {
                    0 === e.errno ? swal({
                        title: "提示",
                        text: "文件已保存至我的网盘，请再网盘中使用下载助手下载！",
                        buttons: {confirm: {text: "打开网盘", value: "confirm"}}
                    }).then(function (e) {
                        "confirm" === e && (location.href = "https://pan.baidu.com/disk/home#/all?vmode=list&path=" + encodeURIComponent(w));
                    }) : 2 === e.errno ? swal({
                        title: "提示",
                        text: "保存目录不存在，是否先创建该目录？",
                        buttons: {confirm: {text: "创建目录", value: "confirm"}}
                    }).then(function (e) {
                        "confirm" === e && y();
                    }) : swal("保存失败，请手动保存");
                }
            });
        }

        function A() {
            var e = prompt("请输入保存路径，例如/PanHelper", w);
            null !== e && (/^\//.test(e) ? (GM_setValue("savePath", e), swal({
                title: "提示",
                text: "路径设置成功！点击确定后立即生效",
                buttons: {confirm: {text: "确定", value: "confirm"}}
            }).then(function (e) {
                "confirm" === e && history.go(0);
            })) : swal("请输入正确的路径，例如/PanHelper"));
        }

        function S() {
            return null === ee ? (swal(v.unlogin), !1) : (e("选中文件列表：", $e), 0 === $e.length ? (swal(v.unselected), !1) : 1 == $e[0].isdir ? (swal(v.toobig), !1) : (ve = "ariclink", void K(function (e) {
                if (void 0 !== e) if (-20 == e.errno) {
                    if (!(he = L()) || 0 !== he.errno) return swal("获取验证码失败！"), !1;
                    ye.open(he);
                } else {
                    if (112 == e.errno) return swal("页面过期，请刷新重试"), !1;
                    if (0 === e.errno) {
                        be.open({
                            title: "文件的Aria下载链接",
                            type: "shareAriaLink",
                            list: e.list,
                            tip: '请先阅读 <a  href="https://github.com/u0966537/BaiduCloudDownloader">使用说明/攻略</a>。请将Aria链接到复制到支持的下载器中下载，推荐使用 <a  href="http://pan.baiduyun.wiki/down">XDown</a>',
                            showcopy: !0
                        });
                    } else swal(v.fail);
                }
            })));
        }

        function C() {
            var e = $('<div class="helper-hide" style="padding:0;margin:0;display:block"></div>'),
                t = $('<iframe src="javascript:;" id="helperdownloadiframe" style="display:none"></iframe>');
            e.append(t), $("body").append(e);
        }

        function M() {
            T(), P(), D(), O(), N(), G();
        }

        function G() {
            $(document).on("click", ".aria-rpc", function (e) {
                var t = (e.target.dataset.link, e.target.dataset.filename);
                GM_xmlhttpRequest({
                    method: "HEAD",
                    headers: {"User-Agent": b},
                    url: e.target.dataset.link,
                    onload: function (e) {
                        var i = e.finalUrl;
                        if (i) {
                            var n = x.domain + ":" + x.port + "/jsonrpc", a = {
                                id: (new Date).getTime(),
                                jsonrpc: "2.0",
                                method: "aria2.addUri",
                                params: ["token:" + x.token, [i], {dir: x.dir, out: t, header: ["User-Agent:" + b]}]
                            };
                            GM_xmlhttpRequest({
                                method: "POST",
                                headers: {"User-Agent": b},
                                url: n,
                                responseType: "json",
                                timeout: 3e3,
                                data: JSON.stringify(a),
                                onload: function (e) {
                                    e.response.result ? swal({
                                        text: "发送成功",
                                        icon: "success",
                                        timer: 800
                                    }) : swal({text: e.response.message, icon: "error"});
                                },
                                ontimeout: function () {
                                    swal({text: "无法连接到RPC服务，请检查RPC配置", icon: "error"});
                                }
                            });
                        }
                    }
                });
            });
        }

        function T() {
            window.addEventListener("hashchange", function (e) {
                me = u(), ge == s() || (ge = s(), E(), j());
            });
        }

        function E() {
            xe = z();
        }

        function j() {
            $e = [];
        }

        function P() {
            u();
        }

        function D() {
            me = u();
            var t = $("span." + f.checkbox);
            "grid" == me && (t = $("." + f["chekbox-grid"])), t.each(function (t, i) {
                $(i).on("click", function (t) {
                    var i = $(this).parent(), n = void 0, a = void 0;
                    if ("list" == me ? (n = $(".file-name div.text a", i).attr("title"), a = $(this).parents("dd").hasClass("JS-item-active")) : "grid" == me && (n = $("div.file-name a", i).attr("title"), a = !$(this).hasClass("JS-item-active")), a) {
                        e("取消选中文件：" + n);
                        for (var o = 0; o < $e.length; o++) $e[o].filename == n && $e.splice(o, 1);
                    } else e("选中文件: " + n), $.each(xe, function (e, t) {
                        if (t.server_filename == n) {
                            var i = {filename: t.server_filename, path: t.path, fs_id: t.fs_id, isdir: t.isdir};
                            $e.push(i);
                        }
                    });
                });
            });
        }

        function I() {
            $("span." + f.checkbox).each(function (e, t) {
                $(t).unbind("click");
            });
        }

        function O() {
            $("div." + f["col-item"] + "." + f.check).each(function (t, i) {
                $(i).bind("click", function (t) {
                    $(this).parent().hasClass(f.checked) ? (e("取消全选"), $e = []) : (e("全部选中"), $e = [], $.each(xe, function (e, t) {
                        var i = {filename: t.server_filename, path: t.path, fs_id: t.fs_id, isdir: t.isdir};
                        $e.push(i);
                    }));
                });
            });
        }

        function R() {
            $("div." + f["col-item"] + "." + f.check).each(function (e, t) {
                $(t).unbind("click");
            });
        }

        function N() {
            $("div." + f["list-view"] + " dd").each(function (t, i) {
                $(i).bind("click", function (t) {
                    var i = t.target.nodeName.toLowerCase();
                    if ("span" != i && "a" != i && "em" != i) {
                        $e = [];
                        var n = $("div.file-name div.text a", $(this)).attr("title");
                        e("选中文件：" + n), $.each(xe, function (e, t) {
                            if (t.server_filename == n) {
                                var i = {filename: t.server_filename, path: t.path, fs_id: t.fs_id, isdir: t.isdir};
                                $e.push(i);
                            }
                        });
                    }
                });
            });
        }

        function V() {
            $("div." + f["list-view"] + " dd").each(function (e, t) {
                $(t).unbind("click");
            });
        }

        function U() {
            var e = window.MutationObserver, t = {childList: !0};
            we = new e(function (e) {
                I(), R(), V(), D(), O(), N();
            });
            var i = document.querySelector("." + f["list-view"]), n = document.querySelector("." + f["grid-view"]);
            we.observe(i, t), we.observe(n, t);
        }

        function z() {
            var e = [];
            if ("/" == s()) e = Q.FILEINFO; else {
                oe = d();
                var t = {
                    uk: re,
                    shareid: ue,
                    order: "other",
                    desc: 1,
                    showempty: 0,
                    web: ne,
                    dir: s(),
                    t: Math.random(),
                    bdstoken: ee,
                    channel: te,
                    clienttype: ie,
                    app_id: ae,
                    logid: oe
                };
                $.ajax({
                    url: _e, method: "GET", async: !1, data: t, success: function (t) {
                        0 === t.errno && (e = t.list);
                    }
                });
            }
            return e;
        }

        function F() {
            return null === ee ? (swal(v.unlogin), !1) : (e("选中文件列表：", $e), 0 === $e.length ? (swal(v.unselected), !1) : $e.length > 1 ? (swal(v.morethan), !1) : 1 == $e[0].isdir ? (swal(v.dir), !1) : (ve = "download", void K(function (e) {
                if (void 0 !== e) if (-20 == e.errno) {
                    if (he = L(), 0 !== he.errno) return void swal("获取验证码失败！");
                    ye.open(he);
                } else if (112 == e.errno) swal("页面过期，请刷新重试"); else if (0 === e.errno) {
                    var t = e.list[0].dlink;
                    Y(t);
                } else swal(v.fail);
            })));
        }

        function L() {
            var e = ke + "getvcode", t = void 0;
            oe = d();
            var i = {
                prod: "pan",
                t: Math.random(),
                bdstoken: ee,
                channel: te,
                clienttype: ie,
                web: ne,
                app_id: ae,
                logid: oe
            };
            return $.ajax({
                url: e, method: "GET", async: !1, data: i, success: function (e) {
                    t = e;
                }
            }), t;
        }

        function H() {
            he = L(), $("#dialog-img").attr("src", he.img);
        }

        function q() {
            var e = $("#dialog-input").val();
            return 0 === e.length ? void $("#dialog-err").text("请输入验证码") : e.length < 4 ? void $("#dialog-err").text("验证码输入错误，请重新输入") : void X(e, function (e) {
                if (-20 == e.errno) {
                    if (ye.close(), $("#dialog-err").text("验证码输入错误，请重新输入"), H(), !he || 0 !== he.errno) return void swal("获取验证码失败！");
                    ye.open();
                } else if (0 === e.errno) {
                    if (ye.close(), "download" == ve) {
                        if (e.list.length > 1 || 1 == e.list[0].isdir) return swal(v.morethan), !1;
                        var t = e.list[0].dlink;
                        Y(t);
                    }
                    if ("link" == ve) {
                        be.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "shareLink",
                            list: e.list,
                            tip: '点击链接直接下载，请先升级 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a> 至 <b>v2.2.0</b>（出现403请先禁用IDM扩展，若仍失败请尝试Aria链接）',
                            showcopy: !1
                        });
                    }
                    if ("ariclink" == ve) {
                        be.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "shareAriaLink",
                            list: e.list,
                            tip: '请先安装 <a  href="https://www.baiduyun.wiki/zh-cn/assistant.html">网盘万能助手</a> 请将链接复制到支持Aria的下载器中, 推荐使用 <a  href="http://pan.baiduyun.wiki/down">XDown</a>',
                            showcopy: !1
                        });
                    }
                } else swal("发生错误！");
            });
        }

        function B() {
            var e = [];
            return $.each($e, function (t, i) {
                e.push(i.fs_id);
            }), "[" + e + "]";
        }

        function J(t) {
            return null === ee ? (swal(v.unlogin), !1) : (e("选中文件列表：", $e), 0 === $e.length ? (swal(v.unselected), !1) : 1 == $e[0].isdir ? (swal(v.dir), !1) : (ve = "link", void K(function (e) {
                if (void 0 !== e) if (-20 == e.errno) {
                    if (!(he = L()) || 0 !== he.errno) return swal("获取验证码失败！"), !1;
                    ye.open(he);
                } else {
                    if (112 == e.errno) return swal("页面过期，请刷新重试"), !1;
                    if (0 === e.errno) if ("rpc" === t.target.dataset.type) {
                        be.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "rpcLink",
                            list: e.list,
                            tip: '点击按钮发送链接至Aria下载器中 <a href="https://www.baiduyun.wiki/zh-cn/rpc.html">详细说明</a>，需配合最新版 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a>，支持本地和远程下载',
                            showcopy: !1
                        });
                    } else {
                        be.open({
                            title: "下载链接（仅显示文件链接）",
                            type: "shareLink",
                            list: e.list,
                            tip: '点击链接直接下载，请先升级 <a href="https://www.baiduyun.wiki/zh-cn/assistant.html">[网盘万能助手]</a> 至 <b>v2.2.0</b>（出现403请先禁用IDM扩展，若仍失败请尝试Aria链接）',
                            showcopy: !1
                        });
                    } else swal(v.fail);
                }
            })));
        }

        function K(e) {
            if (null === ee) return swal(v.unlogin), "";
            var t = void 0;
            if (a) {
                ce = B(), oe = d();
                var i = new FormData;
                i.append("encrypt", le), i.append("product", se), i.append("uk", re), i.append("primaryid", de), i.append("fid_list", ce), "secret" == fe && i.append("extra", pe), $.ajax({
                    url: "https://api.baiduyun.wiki/download?sign=" + W + "&timestamp=" + Z + "&logid=" + oe + "&init=" + GM_getValue("init"),
                    cache: !1,
                    method: "GET",
                    async: !1,
                    complete: function (e) {
                        t = e.responseText;
                    }
                }), GM_xmlhttpRequest({
                    method: "POST", data: i, url: atob(atob(t)), onload: function (t) {
                        e(JSON.parse(t.response));
                    }
                });
            }
        }

        function X(e, t) {
            var i = void 0;
            if (a) {
                ce = B(), oe = d();
                var n = new FormData;
                n.append("encrypt", le), n.append("product", se), n.append("uk", re), n.append("primaryid", de), n.append("fid_list", ce), n.append("vcode_input", e), n.append("vcode_str", he.vcode), "secret" == fe && n.append("extra", pe), $.ajax({
                    url: "https://api.baiduyun.wiki/download?sign=" + W + "&timestamp=" + Z + "&logid=" + oe,
                    cache: !1,
                    method: "GET",
                    async: !1,
                    complete: function (e) {
                        i = e.responseText;
                    }
                }), GM_xmlhttpRequest({
                    method: "POST", data: n, url: atob(atob(i)), onload: function (e) {
                        t(JSON.parse(e.response));
                    }
                });
            }
        }

        function Y(t) {
            e("下载链接：" + t), t && GM_xmlhttpRequest({
                method: "POST",
                headers: {"User-Agent": b},
                url: t,
                onload: function (e) {
                }
            });
        }

        var Q = void 0, W = void 0, Z = void 0, ee = void 0, te = void 0, ie = void 0, ne = void 0, ae = void 0,
            oe = void 0, le = void 0, se = void 0, re = void 0, de = void 0, ce = void 0, pe = void 0, ue = void 0,
            he = void 0, fe = void 0, ve = void 0, ge = void 0, me = void 0, we = void 0, be = void 0, ye = void 0,
            xe = [], $e = [], ke = location.protocol + "//" + location.host + "/api/",
            _e = location.protocol + "//" + location.host + "/share/list";
        this.init = function () {
            if (GM_getValue("SETTING_P") && i(), Q = unsafeWindow.yunData, e("初始化信息:", Q), void 0 === Q) return void e("页面未正常加载，或者百度已经更新！");
            t(), g(), be = new c({addCopy: !1}), ye = new p(H, q), C(), M(), a() || U(), e("下载助手加载成功！当前版本：", h);
        };
    }

    function l(e) {
        var t = void 0, i = void 0, n = void 0, a = void 0, o = void 0, l = void 0,
            s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (n = e.length, i = 0, t = ""; n > i;) {
            if (a = 255 & e.charCodeAt(i++), i == n) {
                t += s.charAt(a >> 2), t += s.charAt((3 & a) << 4), t += "==";
                break;
            }
            if (o = e.charCodeAt(i++), i == n) {
                t += s.charAt(a >> 2), t += s.charAt((3 & a) << 4 | (240 & o) >> 4), t += s.charAt((15 & o) << 2), t += "=";
                break;
            }
            l = e.charCodeAt(i++), t += s.charAt(a >> 2), t += s.charAt((3 & a) << 4 | (240 & o) >> 4), t += s.charAt((15 & o) << 2 | (192 & l) >> 6), t += s.charAt(63 & l);
        }
        return t;
    }

    function s() {
        var e = /[\/].+[\/]/g;
        return location.pathname.match(e)[0].replace(/\//g, "");
    }

    function r(e) {
        var t = void 0, i = void 0, n = document, a = decodeURI;
        return n.cookie.length > 0 && -1 != (t = n.cookie.indexOf(e + "=")) ? (t = t + e.length + 1, i = n.cookie.indexOf(";", t), -1 == i && (i = n.cookie.length), a(n.cookie.substring(t, i))) : "";
    }

    function d() {
        function e(e) {
            if (e.length < 2) {
                var t = e.charCodeAt(0);
                return 128 > t ? e : 2048 > t ? s(192 | t >>> 6) + s(128 | 63 & t) : s(224 | t >>> 12 & 15) + s(128 | t >>> 6 & 63) + s(128 | 63 & t);
            }
            var i = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return s(240 | i >>> 18 & 7) + s(128 | i >>> 12 & 63) + s(128 | i >>> 6 & 63) + s(128 | 63 & i);
        }

        function t(t) {
            return (t + "" + Math.random()).replace(l, e);
        }

        function i(e) {
            var t = [0, 2, 1][e.length % 3],
                i = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
            return [o.charAt(i >>> 18), o.charAt(i >>> 12 & 63), t >= 2 ? "=" : o.charAt(i >>> 6 & 63), t >= 1 ? "=" : o.charAt(63 & i)].join("");
        }

        function n(e) {
            return e.replace(/[\s\S]{1,3}/g, i);
        }

        function a() {
            return n(t((new Date).getTime()));
        }

        var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&",
            l = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, s = String.fromCharCode;
        return function (e, t) {
            return t ? a(String(e)).replace(/[+\/]/g, function (e) {
                return "+" == e ? "-" : "_";
            }).replace(/=/g, "") : a(String(e));
        }(r("BAIDUID"));
    }

    function c() {
        function e() {
            $("div.dialog-body", o).children().remove(), $("div.dialog-header h3 span.dialog-title", o).text(""), $("div.dialog-tip p", o).text(""), $("div.dialog-button", o).hide(), $("div.dialog-radio input[type=radio][name=showmode][value=multi]", o).prop("checked", !0), $("div.dialog-radio", o).hide(), $("div.dialog-button button#dialog-copy-button", o).hide(), $("div.dialog-button button#dialog-edit-button", o).hide(), $("div.dialog-button button#dialog-exit-button", o).hide(), o.hide(), l.hide();
        }

        var t = [], a = void 0, o = void 0, l = void 0;
        this.open = function (e) {
            if (a = e, t = [], "link" == e.type && (t = e.list.urls, $("div.dialog-header h3 span.dialog-title", o).text(e.title + "：" + e.list.filename), $.each(e.list.urls, function (e, t) {
                t.url = n(t.url)
                ;var i = $('<div><div style="width:30px;float:left">' + t.rank + ':</div><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><a href="' + t.url + '">' + t.url + "</a></div></div>");
                $("div.dialog-body", o).append(i);
            })), "batch" != e.type && "batchAria" != e.type && "batchAriaRPC" != e.type || (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (t, n) {
                var a = void 0;
                if ("batchAria" == e.type) {
                    var l = aria_download(n.downloadlink, n.filename, y);
                    a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + n.filename + '">' + n.filename + '</div><span>：</span><a href="javascript:;" class="aria2c-link">' + l + "</a></div>");
                }
                "batch" == e.type && (a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + n.filename + '">' + n.filename + '</div><span>：</span><a href="' + n.downloadlink + '">' + n.downloadlink + "</a></div>")), "batchAriaRPC" == e.type && (a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + n.filename + '">' + n.filename + '</div><span>：</span><button class="aria-rpc" data-link="' + n.downloadlink + '" data-filename="' + n.filename + '">点击发送到Aria</button></div>')), $("div.dialog-body", o).append(a);
            })), "shareLink" == e.type && (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (e, t) {
                if (t.dlink = n(t.dlink), 1 != t.isdir) {
                    var i = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + t.server_filename + '">' + t.server_filename + '</div><span>：</span><a href="' + t.dlink + '" class="share-download">' + t.dlink + "</a></div>");
                    $("div.dialog-body", o).append(i);
                }
            })), "rpcLink" == e.type && (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (e, t) {
                if (t.dlink = n(t.dlink), 1 != t.isdir) {
                    var i = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + t.server_filename + '">' + t.server_filename + '</div><span>：</span><button class="aria-rpc" data-link="' + t.dlink + '" data-filename="' + t.server_filename + '">点击发送到Aria</button></div>');
                    $("div.dialog-body", o).append(i);
                }
            })), "shareAriaLink" == e.type && (t = e.list, $("div.dialog-header h3 span.dialog-title", o).text(e.title), $.each(e.list, function (e, t) {
                if (1 != t.isdir) {
                    var n = aria_download(t.dlink, t.server_filename),
                        a = $('<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><div style="width:150px;float:left;overflow:hidden;text-overflow:ellipsis" title="' + t.server_filename + '">' + t.server_filename + '</div><span>：</span><a href="javasctipt:void(0)" class="aria2c-link">' + n + "</a></div>");
                    $("div.dialog-body", o).append(a);
                }
            })), e.tip && $("div.dialog-tip p", o).html(e.tip), e.showcopy && ($("div.dialog-button", o).show(), $("div.dialog-button button#dialog-copy-button", o).show()), e.showedit) {
                $("div.dialog-button", o).show(), $("div.dialog-button button#dialog-edit-button", o).show();
                var s = $('<textarea name="dialog-textarea" style="display:none;resize:none;width:758px;height:300px;white-space:pre;word-wrap:normal;overflow-x:scroll"></textarea>'),
                    r = "";
                "batch" == a.type ? $.each(t, function (e, i) {
                    "error" != i.downloadlink && (e == t.length - 1 ? r += i.downloadlink : r += i.downloadlink + "\r\n");
                }) : "link" == a.type && $.each(t, function (e, i) {
                    "error" != i.url && (e == t.length - 1 ? r += i.url : r += i.url + "\r\n");
                }), s.val(r), $("div.dialog-body", o).append(s);
            }
            l.show(), o.show();
        }, this.close = function () {
            e();
        }, o = function () {
            var n = document.body.clientWidth, l = n > 800 ? (n - 800) / 2 : 0,
                s = $('<div class="dialog" style="width: 800px; top: 0px; bottom: auto; left: ' + l + 'px; right: auto; display: hidden; visibility: visible; z-index: 52;"></div>'),
                r = $('<div class="dialog-header"><h3><span class="dialog-title" style="display:inline-block;width:740px;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis"></span></h3></div>'),
                d = $('<div class="dialog-control"><span class="dialog-icon dialog-close">×</span></div>'),
                c = $('<div class="dialog-body" style="max-height:450px;overflow-y:auto;padding:0 20px;"></div>'),
                p = $('<div class="dialog-tip" style="padding-left:20px;background-color:#fff;border-top: 1px solid #c4dbfe;color: #dc373c;"><p></p></div>');
            s.append(r.append(d)).append(c);
            var u = $('<div class="dialog-button" style="display:none"></div>'),
                h = $('<div style="display:table;margin:auto"></div>'),
                f = $('<button id="dialog-copy-button" style="display:none;width: 100px; margin: 5px 0 10px 0; cursor: pointer; background: #cc3235; border: none; height: 30px; color: #fff; border-radius: 3px;">复制全部链接</button>'),
                v = $('<button id="dialog-edit-button" style="display:none">编辑</button>'),
                g = $('<button id="dialog-exit-button" style="display:none">退出</button>');
            return h.append(f).append(v).append(g), u.append(h), s.append(u), f.click(function () {
                var e = "";
                "batch" == a.type && $.each(t, function (i, n) {
                    "error" != n.downloadlink && (i == t.length - 1 ? e += n.downloadlink : e += n.downloadlink + "\r\n");
                }), "batchAria" == a.type && $.each(t, function (n, a) {
                    "error" != a.downloadlink && (n == t.length - 1 ? e += aria_download(a.downloadlink, a.filename, y) : e += aria_download(a.downloadlink, a.filename, y) + "\r\n");
                }), "rpc" == a.type && $.each(t, function (i, n) {
                    "error" != n.downloadlink && (i == t.length - 1 ? e += n.downloadlink : e += n.downloadlink + "\r\n");
                }), "shareLink" == a.type && $.each(t, function (i, n) {
                    "error" != n.dlink && (i == t.length - 1 ? e += n.dlink : e += n.dlink + "\r\n");
                }), "shareAriaLink" == a.type && $.each(t, function (n, a) {
                    "error" != a.dlink && (n == t.length - 1 ? e += aria_download(a.dlink, a.server_filename) : e += aria_download(a.dlink, a.server_filename) + "\r\n");
                }), GM_setClipboard(e, "text"), "" != e ? swal("已将链接复制到剪贴板！") : swal("复制失败，请手动复制！");
            }), v.click(function () {
                var e = $("div.dialog-body textarea[name=dialog-textarea]", o);
                $("div.dialog-body div", o).hide(), f.hide(), v.hide(), e.show(), $dialog_radio_div.show(), g.show();
            }), g.click(function () {
                var e = $("div.dialog-body textarea[name=dialog-textarea]", o), t = $("div.dialog-body div", o);
                e.hide(), $dialog_radio_div.hide(), t.show(), g.hide(), f.show(), v.show();
            }), s.append(p), $("body").append(s), d.click(e), s;
        }(), l = function () {
            var e = $('<div class="dialog-shadow" style="position: fixed; left: 0px; top: 0px; z-index: 50; background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0.5; width: 100%; height: 100%; display: none;"></div>');
            return $("body").append(e), e;
        }();
    }

    function p(e, t) {
        function i() {
            $("#dialog-img", n).attr("src", ""), $("#dialog-err").text(""), n.hide(), a.hide();
        }

        var n = void 0, a = void 0;
        this.open = function (e) {
            e && $("#dialog-img").attr("src", e.img), n.show(), a.show();
        }, this.close = function () {
            i();
        }, n = function () {
            var n = document.body.clientWidth, a = n > 520 ? (n - 520) / 2 : 0,
                o = $('<div class="dialog" id="dialog-vcode" style="width:520px;top:0px;bottom:auto;left:' + a + 'px;right:auto;display:none;visibility:visible;z-index:52"></div>'),
                l = $('<div class="dialog-header"><h3><span class="dialog-header-title"><em class="select-text">提示</em></span></h3></div>'),
                s = $('<div class="dialog-control"><span class="dialog-icon dialog-close icon icon-close"><span class="sicon">x</span></span></div>'),
                r = $('<div class="dialog-body"></div>'), d = $('<div style="text-align:center;padding:22px"></div>'),
                c = $('<div class="download-verify" style="margin-top:10px;padding:0 28px;text-align:left;font-size:12px;"></div>'),
                p = $('<div class="verify-body">请输入验证码：</div>'),
                u = $('<input id="dialog-input" type="text" style="padding:3px;width:85px;height:23px;border:1px solid #c6c6c6;background-color:white;vertical-align:middle;" class="input-code" maxlength="4">'),
                h = $('<img id="dialog-img" class="img-code" style="margin-left:10px;vertical-align:middle;" alt="点击换一张" src="" width="100" height="30">'),
                f = $('<a href="javascript:;" style="text-decoration:underline;" class="underline">换一张</a>'),
                v = $('<div id="dialog-err" style="padding-left:84px;height:18px;color:#d80000" class="verify-error"></div>'),
                g = $('<div class="dialog-footer g-clearfix"></div>'),
                m = $('<a class="g-button g-button-blue" data-button-id="" data-button-index href="javascript:;" style="padding-left:36px"><span class="g-button-right" style="padding-right:36px;"><span class="text" style="width:auto;">确定</span></span></a>'),
                w = $('<a class="g-button" data-button-id="" data-button-index href="javascript:;" style="padding-left: 36px;"><span class="g-button-right" style="padding-right: 36px;"><span class="text" style="width: auto;">取消</span></span></a>');
            return l.append(s), p.append(u).append(h).append(f), c.append(p).append(v), d.append(c), r.append(d), g.append(m).append(w), o.append(l).append(r).append(g), $("body").append(o), s.click(i), h.click(e), f.click(e), u.keypress(function (e) {
                13 == e.which && t();
            }), m.click(t), w.click(i), u.click(function () {
                $("#dialog-err").text("");
            }), o;
        }(), a = $("div.dialog-shadow");
    }

    function u() {
        function t() {
            switch (s()) {
                case"disk":
                    return void (new a).init();
                case"share":
                case"s":
                    return void (new o).init();
                default:
                    return;
            }
        }

        function i() {
            $.ajax({
                url: "https://api.baiduyun.wiki/update?ver=" + h, method: "GET", success: function (e) {
                    GM_setValue("lastest_version", e.version), b = e.ua, 200 === e.code && e.version > h && swal({
                        title: "发现新版本",
                        text: e.changelog,
                        buttons: {confirm: {text: "更新", value: "confirm"}}
                    }).then(function (t) {
                        "confirm" === t && (location.href = e.updateURL);
                    }), GM_setValue("init", 1), t();
                }
            });
        }

        function n() {
            setTimeout(function () {
                var e = $("." + f.header),
                    t = $('<span class="cMEMEF" node-type="help-author" style="opacity: .5" ><a href="https://www.baiduyun.wiki/" >教程</a><i class="find-light-icon" style="display: inline;background-color: #009fe8;"></i></span>');
                e.append(t);
            }, 8e3);
        }

        function l() {
            GM_registerMenuCommand("网盘脚本配置", function () {
                void 0 === GM_getValue("SETTING_P") && GM_setValue("SETTING_P", !1), void 0 === GM_getValue("SETTING_H") && GM_setValue("SETTING_H", !0);
                var e = "";
                GM_getValue("SETTING_P") ? e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">自动填写提取码(#后面)<input type="checkbox" id="S-P" checked style="width: 16px;height: 16px;"></label>' : e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">自动填写提取码(#后面)<input type="checkbox" id="S-P" style="width: 16px;height: 16px;"></label>', GM_getValue("SETTING_H") ? e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">开启教程<input type="checkbox" id="S-H" checked style="width: 16px;height: 16px;"></label>' : e += '<label style="display:flex;align-items: center;justify-content: space-between;padding-top: 20px;">开启教程<input type="checkbox" id="S-H" style="width: 16px;height: 16px;"></label>', e = "<div>" + e + "</div>";
                var t = $(e);
                swal({content: t[0]});
            }), $(document).on("change", "#S-H", function () {
                GM_setValue("SETTING_H", $(this)[0].checked);
            }), $(document).on("change", "#S-P", function () {
                GM_setValue("SETTING_P", $(this)[0].checked);
            });
        }

        function r() {
            f["default-dom"] = $(".icon-upload").parent().parent().parent().parent().parent().attr("class"), f.bar = $(".icon-upload").parent().parent().parent().parent().attr("class");
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = "https://js.users.51.la/19988117.js", document.getElementsByTagName("head")[0].appendChild(e);
            var t = document.createElement("meta");
            t.httpEquiv = "Content-Security-Policy", t.content = "upgrade-insecure-requests", document.getElementsByTagName("head")[0].appendChild(t), $(document).on("contextmenu", ".aria2c-link", function (e) {
                return e.preventDefault(), !1;
            }), $(document).on("mousedown", ".aria2c-link", function (e) {
                e.preventDefault();
                var t = $(this).text();
                return GM_setClipboard(t, "text"), swal("已将链接复制到剪贴板！请复制到XDown中下载", {timer: 2e3}), !1;
            }), $(document).on("click", ".home-download", function (e) {
            }), $(document).on("click", ".share-download", function (e) {
                e.preventDefault(), e.target.innerText && GM_xmlhttpRequest({
                    method: "POST",
                    headers: {"User-Agent": b},
                    url: e.target.innerText,
                    onload: function (e) {
                    }
                });
            });
        }

        e("RPC：", x), this.init = function () {
            GM_setValue("current_version", h), r(), i(), GM_getValue("SETTING_H") && n(), l();
        };
    }

    var h = "1.0", f = {
            list: "zJMtAEb",
            grid: "fyQgAEb",
            "list-grid-switch": "auiaQNyn",
            "list-switched-on": "ewXm1e",
            "grid-switched-on": "kxhkX2Em",
            "list-switch": "rvpXm63",
            "grid-switch": "mxgdJgwv",
            checkbox: "EOGexf",
            "col-item": "Qxyfvg",
            check: "fydGNC",
            checked: "EzubGg",
            "chekbox-grid": "cEefyz",
            "list-view": "vdAfKMb",
            "item-active": "kfkl8zR8",
            "grid-view": "JKvHJMb",
            "bar-search": "OFaPaO",
            "list-tools": "tcuLAu",
            header: "vyQHNyb"
        }, v = {
            dir: "提示：不支持整个文件夹下载，可进入文件夹内获取文件链接下载",
            unlogin: "提示：登录百度网盘后才能使用此功能哦!!!",
            fail: "提示：获取下载链接失败！请刷新网页后重试！",
            unselected: "提示：请勾选要下载的文件，若已勾选请重新勾选",
            morethan: "提示：多个文件请点击【显示链接】",
            toobig: "提示：只支持300M以下的文件夹，若链接无法下载，请进入文件夹后勾选文件获取！"
        }, g = 250528, m = GM_getValue("secretCode") ? GM_getValue("secretCode") : g,
        w = GM_getValue("savePath") ? GM_getValue("savePath") : "/PanHelper", b = "", y = navigator.userAgent, x = {
            domain: GM_getValue("rpcDomain") ? GM_getValue("rpcDomain") : "http://localhost",
            port: GM_getValue("rpcPort") ? GM_getValue("rpcPort") : 6800,
            token: GM_getValue("rpcToken") ? GM_getValue("rpcToken") : "",
            dir: GM_getValue("rpcDir") ? GM_getValue("rpcDir") : "D:/"
        };
    $(function () {
        (new u).init();
    });
}();