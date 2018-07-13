<%@ Page Language="c#" Inherits="SiteServer.BackgroundPages.PageLoading" Trace="False" %>
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="utf-8">
    <title>SiteServer 管理后台</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="assets/bootstrap/css/bootstrap.min.css?v=6.4.1" rel="stylesheet" type="text/css" />
    <link href="assets/css/core.css?v=6.4.1" rel="stylesheet" type="text/css" />
    <link href="assets/css/components.css?v=6.4.1" rel="stylesheet" type="text/css" />
    <link href="assets/css/pages.css?v=6.4.1" rel="stylesheet" type="text/css" />
    <link href="assets/css/menu.css?v=6.4.1" rel="stylesheet" type="text/css" />
    <link href="assets/css/responsive.css?v=6.4.1" rel="stylesheet" type="text/css" />
    <link href="assets/css/ionicons.min.css?v=6.4.1" rel="stylesheet" type="text/css" />
    <link href="assets/icons/favicon.png" rel="icon" type="image/png">
    <style>
      body {
        padding: 20px 0;
      }
    </style>
  </head>

  <body>
    <div class="m-l-15 m-r-15">
      <div class="text-center" style="margin-top: 100px">
        <img class="mt-3" src="assets/images/loading.gif" />
        <p class="lead mt-3 text-nowrap">载入中，请稍后...</p>
      </div>
    </div>
  </body>

  </html>
  <script src="assets/jquery/jquery-1.9.1.min.js?v=6.4.1" type="text/javascript"></script>
  <script language="javascript">
    $(function () {
      var url = "<%=GetRedirectUrl()%>";
      if (url && url.length > 0) {
        setTimeout(function () {
          location.href = url;
        }, 200);
      }
    });
  </script>
  <!--#include file="inc/foot.html"-->