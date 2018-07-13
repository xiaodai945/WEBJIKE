window.onscroll = function(){
  //回到顶部
  var sllTop = document.documentElement.scrollTop||document.body.scrollTop;
  if(sllTop>240){
    $('#get-top').css('display','block')
      }else{
        $('#get-top').css('display','none')
      }

}
//设为首页
function setHome(obj,vrl){
      try{
      obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
  }
  catch(e){
    if(window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
      }
      catch (e) {
        alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
      prefs.setCharPref('browser.startup.homepage',vrl);
    }else{
      (new $.zui.ModalTrigger({
        custom: '<h3>您的浏览器不支持此操作，请手动将此页设为首页。</h3>'+
        '<blockquote>1.打开浏览器设置.<br />2.点击"设置"》"启动时》"打开特定网页"》"输入网址"》确定.</blockquote>'+
        '<p><a href="###"><i class="fa fa-link"></i>点击查看</a>详细教程</p>',
        title: '设为首页'
      })).show()
    }
  }
};
//初始化工具提示     
$('[data-toggle="tooltip"]').tooltip({
      tipClass: 'tooltip-info'
});

//检测本地是否存在localStorage，若存在则遍历localStorage的值到对应的元素内
if(localStorage.length != 0){
  for(var i=0; i<localStorage.length;i++){
    var linkId = localStorage.key(i);
    var data = localStorage.getItem(localStorage.key(i));
    data = data.split('|'); 
    var value1 = data[0], value2 = data[1];
    if(linkId.length <= 10 && linkId != "page_/"){
      var getID = $('#'+linkId);
      getID.html(value1).attr("href",value2);
    }
  }
  
  //加载设置好的主题
  function load_theme(){
    //获取当前页面是否可以更换主题
    var CustomThemeStatus = $("#content").attr("data-CustomTheme");
    var data = localStorage.getItem('theme');
    if(CustomThemeStatus === "true" && data != null){
      data = data.split('|'); 
      var value1 = data[0], value2 = data[1];
      $('.theme-panel-content ul li').eq(value2).addClass('active').siblings().removeClass('active');
      $('#content').removeClass("bgid").addClass(value1);
    }
 }
 load_theme();
}

$(window).load(function () {
  CustomMode();
  CustomTheme();
  SiteNotice();
});
      
//自定义模式
function CustomMode(){
  $('.bar-btn').on('click', function () {
    $('.left-bar').toggleClass('showBar');
    $('.mask').toggleClass('showMask');
    $(this).toggleClass('animated1');
  });
  $('.nav-btn').on('click', function () {
    $('.nav').toggleClass('showNav');
    $(this).toggleClass('animated2');
  });
  
  //自定义模式下禁用链接跳转 - 使用遮罩层遮挡方式
  $('.customize').on('click', function () {
    //获取当前页面是否可以自定义
    var customizeStatus = $("#content").attr("data-customize");
    if(customizeStatus === "true"){
      $('.customize-mode-tips').toggleClass('shaow_tips');
      $('.linkList-item').toggleClass('customize_mode');
      $('.not_operational').toggleClass('shaow_tips');
    }else{
      new $.zui.Messager('当前页面不支持自定义模式，请前往首页设置', {
        icon: 'bell', // 定义消息图标
        type: 'danger',
        placement: 'top',
        close: false
      }).show();
    }
  });
  
  //在自定义模式下才能修改内容标题
  $('.link-list-tit').click(function(){
    var getCustomize = $('.shaow_tips')[0];
    if(getCustomize == null){
      return false
        }
        var getLink_tit = $(this);
      var getLink_id = $(this).attr("id");
      
      //给当前元素的兄弟元素添加显示类，获取标题内容赋值给输入框，并让其焦点聚焦同时选中文字
      $(this).siblings().addClass("shaow-edit-category").val(getLink_tit.html()).focus().select();
      
      //输入框焦点失去时将输入框内容写入到localStorage
      $(".shaow-edit-category").blur(function(){
        var inputVal = $(this).val();
        getLink_tit.html(inputVal);
        window.localStorage.setItem(getLink_id, inputVal);
        $(".shaow-edit-category").removeClass("shaow-edit-category");
      })
        });
      
      var idValue;
      var thisIink;
      //点击编辑按钮弹出对话框
      $('.bianji').click(function(){
        $('#myModal').modal({
          keyboard : false,
          show     : true
        });
        //获取当前点击元素的兄弟元素及值并传递给对应的全局变量
        thisIink = $(this).prev();
        idValue = $(this).prev().attr("id");
        var thisIink_con = $(this).prev().html();
        var thisIink_href = $(this).prev().attr("href");
        $('#inputAccountExample1').val(thisIink_con);
        $('#inputAccountExample2').val(thisIink_href);
      });
      
      //点击确认按钮后将输入框内容写入localStorage并更新页面中对应元素的内容
      $('.btn-primary').click(function(){
        var text = $('#inputAccountExample1').val();
        var text2 = $('#inputAccountExample2').val();
        window.localStorage.setItem(idValue, text+'|'+text2);
        var data = localStorage.getItem(idValue);
        data = data.split('|'); 
        var value1 = data[0], value2 = data[1];
        $(thisIink).html(value1).attr("href",value2);
      });
}

//更换皮肤
function CustomTheme(){
  $('.theme, #cancel, #cancel-x').on('click',function (){
    //获取当前页面是否可以更换主题
    var CustomThemeStatus = $("#content").attr("data-CustomTheme");
    if(CustomThemeStatus === "true"){
      $('.theme-panel').toggleClass('show-theme-panel');
    }else{
      new $.zui.Messager('当前页面不支持更换主题，请前往首页设置', {
        icon: 'bell', // 定义消息图标
        type: 'danger',
        placement: 'top',
        close: false
      }).show();
    }
  });
  
  var theme_index;
  var bgid;
  $('.theme-panel-content ul li').click(function (){
    theme_index = $(this).index();
    bgid = $(this).attr('data-bgid');
    $(this).addClass('active').siblings().removeClass('active');
    $('#content').removeClass().addClass(bgid);
  });
  
  //点击保存，将主题参数写入本地缓存
  $('#okay').on('click',function (){
    if(theme_index == null){
      theme_index = $('.theme-panel-content ul li.active').index();
      bgid = $('.theme-panel-content ul li.active').attr('data-bgid');
    }
    localStorage.theme = bgid+"|"+theme_index;
    $('.theme-panel').toggleClass('show-theme-panel');
    new $.zui.Messager('保存成功', {
      icon: 'ok-sign', // 定义消息图标
      type: 'success',
      placement: 'top',
      close: false,
      time: 2000
    }).show();
  });
  
}

//网站推荐
$('#submit_URL').modalTrigger({
  type: 'iframe',
  iframe: 'http://webjike_com.mikecrm.com/uyDysw9',
  size: 'lg',
  height: '730px',
  title: '网站推荐'
})
  
//友链申请
$('#Links').modalTrigger({
  type: 'iframe',
  iframe: 'http://webjike_com.mikecrm.com/AKVslkN',
  size: 'fullscreen',
  title: '友链申请'
})


/*选择搜索引擎*/
$('.Select-box ul').hover(function(){
  $(this).css('height','auto')
  },function(){
    $(this).css('height','44px')
});
$('.Select-box ul').click(function(){
  if(deviceVal === 'phone'){
    $(this).css('height','auto')
  }
});
$('.Select-box li').click(function(){
  var _tihs = $(this).attr('class');
  var _html = $(this).html();
  var _name;
  if(_tihs == 'baidu_s'){
    _tihs = 'https://www.baidu.com/s';
    _name = 'wd';
    }if(_tihs == 'google_s'){
       _tihs = 'https://www.google.com/search';
      _name = 'q';
      }if(_tihs == 'bing_s'){
          _tihs = 'https://cn.bing.com/search';
         _name = 'q';
        }if(_tihs == 'haosou_s'){
           _tihs = 'https://www.haosou.com/s';
          _name = 'q';
          }if(_tihs == 'sougou_s'){
             _tihs = 'https://www.sogou.com/web';
            _name = 'query'; 
            }
  $('.sousuo-form').attr('action',_tihs);
  $('.this_s').html(_html);
  $('#input').attr('name',_name);
  $('.Select-box ul').css('height','44px');
});

//清空输入框内容
$('.qingkong').click(function(){
    cls();
    $(this).css('display','none')
});
function cls(){ 
  var sum=0; 
  var t = document.getElementsByTagName("INPUT"); 
  for (var i=0; i <t.length;i++){ 
    if (t[i].type=='text'){ 
      ++sum; 
      t[i].value="";//清空 
    } 
  }
}

//清空输入框按钮的显示和隐藏
function if_btn(){
  var btn_obj = document.getElementById("input");
  var cls_btn = document.getElementById("qingkong");
  var btn_obj_val;
  var times;
  //当元素获得焦点时
  if(btn_obj == ''||btn_obj==null){
    return false;  //如果没有找到这个元素，则将函数返回，不继续执行
  }
  btn_obj.onfocus = function(){
    times = setInterval(function(){
      btn_obj_val = btn_obj.value;
      if(btn_obj_val != 0){
        cls_btn.style.display="block";
      }else{
        cls_btn.style.display="none";
      }
    },200);
  }
  //元素失去焦点时
  btn_obj.onblur = function(){
    clearInterval(times);
  }

}
if_btn();

$('#get-top').click(function(){ 
  $('body,html').animate({
    scrollTop: 0
  },
  800);//点击回到顶部按钮，缓懂回到顶部,数字越小越快
})

//判断用户使用的设备
var deviceVal  = browserRedirect();
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return 'phone';
  } else {
      return 'pc';
  }
}

//网站全局通知，用户第一次访问网站时显示公告
function SiteNotice(){
  var _notice = localStorage.getItem('notice');
  if(_notice == null){
    //使用触发器对象直接显示
    (new $.zui.ModalTrigger({
      name: 'notice',
      icon: 'bullhorn',
      title: '通知',
      custom: '<h2>确认过眼神，你遇上对的网站</h2><br/>'+
      '<p>欢迎访问小呆导航，现在呈现在你面前的是全新V2.0版本的小呆导航，使用PC端访问网站可以获得更好的用户体验。另外原定于5月2号，小呆导航一周年才上线此次新版本网站，但是由于服务器到期的原因不得不提前上线，所以导致部分页面内容还没有完善好。</p>'+
      '本次推出新版本网站还处于测试阶段，欢迎各位到“<a href="http://webjike.com/channels/6.html" target="_blank">在线留言</a>”中提交反馈、建议、吐槽。</p>'+
      '<p><i class="fa fa-hand-o-right"></i>“<a href="http://webjike.com/channels/153.html" target="_blank">点击这里</a>”了解更多新版本网站功能介绍。</p>',
    })).show();
    //对话框关闭后触发的事件
    $('#notice').on('hidden.zui.modal', function() {
      localStorage.notice = "true";
    });
  }

}
    
//百度自动推动代码
(function(){
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();

//百度统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7397c22fedfaa11157d38143820e7330";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

