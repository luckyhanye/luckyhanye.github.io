---
title: easyui常见问题
layout: linux
---

## easyui 常见的问题汇总

### 修改 `datagrid` 表格个别列样式

```js
  $("#aa").datagrid({
      onLoadSuccess: function(data){    //datagrid 加载成功
          var panel = $(this).datagrid('getPanel');
          var tr = panel.find('div.datagrid-body tr');
          tr.each(function(){
              var td_PKG066 = $(this).children('td[field="PKG066"]');
              var td_PKG044 = $(this).children('td[field="PKG044"]');
              var td_total = $(this).children('td[field="total"]');
              var td_PKG001 = $(this).children('td[field="PKG001"]');
              var td_preTime = $(this).children('td[field="preTime"]');
              var tdArr =[td_PKG066,td_PKG044,td_total,td_PKG001,td_preTime];
              for(var i=0;i<tdArr.length;i++){
                  tdArr[i].addClass( "datagridCellColor");
              }
          })
      }
  })
```

### 修改`datagrid` 表格行样式

```js
  $("#element").datagrid({
      rowStyler:function(value,rowData,rowIndex){
          if(rowData.State==1){      <!-- 判断条件，此条件下的样式 -->
              return 'background-color:#ebebeb;';
          }
      },
  })
```

### `combobox` 下拉选框自定义高度设置

```js
  $("#Ele").combobox({
    onShowPanel: function () {
            var panelData = $(this).combobox(
                'panel')[0].childElementCount;
            if (panelData <= 5) {
                $(this).combobox('panel')
                    .height("auto");
            } else {
                $(this).combobox('panel')
                    .height(120);
            }
        }
  })
```

### 上传图片

```js
  var uploadButton = KindEditor.uploadbutton({
      button : KindEditor('#chose_legacyAdd_ViewButton')[0],
      fieldName : 'imgFile',
      url : _PUBLIC_+'/kindeditor/php/upload_json.php?dir=' + 'image',
      afterUpload : function(data) {
          if (data.error === 0) {
              urlpic=data.url;
              KindEditor('#legacyAddPicUrl').val(data.url);

              //<!-- 处理图片不变形方法调用 -->
              var boxW = $('#info_legacyAdd_displayImg').parent().width();
              var boxH = $('#info_legacyAdd_displayImg').parent().height();
              var image = new Image();
              image.src = urlpic;
              image.onload = function(){
                  var picLastWidth = setPicSize(image.width,image.height,boxW,boxH)[0];
                  var picLastHeight = setPicSize(image.width,image.height,boxW,boxH)[1];
                  $('#info_legacyAdd_displayImg').css({'width':picLastWidth,'height':picLastHeight});
                  <!-- 图片垂直居中判断 -->
                  if(boxH>picLastHeight){
                      var mtSize = Math.round((boxH-picLastHeight)/2);
                      $('#info_legacyAdd_displayImg').css({"margin-top":mtSize});
                  }else{
                      $('#info_legacyAdd_displayImg').css({"margin-top":""});
                  }
                  document.getElementById("info_legacyAdd_displayImg").src = urlpic;
              }

          } else {
              $.messager.alert('提示',data.message,'info');
          }
      },
      afterError : function(str) {
          $.messager.alert('错误','自定义错误信息: ' + str,'info');
      }
  });
  uploadButton.fileBox.change(function(e) {
      uploadButton.submit();
  });
```

### 处理图片尺寸

```js
  function setPicSize(imgWidth,imgHeight,setWidth,setHeight){
      var setWidth = setWidth;
      var setHeight = setHeight;
      var imgWidth = imgWidth;
      var imgHeight = imgHeight;
      var dialogWidth;
      var dialogHeight;
      if(imgWidth>0 && imgHeight>0){
          if(imgWidth/imgHeight>= setWidth/setHeight){
              if(imgWidth>setWidth){
                  dialogWidth=setWidth;
                  dialogHeight=(imgHeight*setWidth)/imgWidth;
              }else{
                  dialogWidth=imgWidth;
                  dialogHeight=imgHeight;
              }
          }else{
              if(imgHeight>setHeight){
                  dialogHeight=setHeight;
                  dialogWidth=(imgWidth*setHeight)/imgHeight;
              }else{
                  dialogWidth=imgWidth;
                  dialogHeight=imgHeight;
              }
          }
      }
      return [dialogWidth , dialogHeight];
  }
```

### 查看图片大图

```js
  function legacyAddPic(){
      var urlPic = $("#info_legacyAdd_displayImg").attr("src");
      if(!urlPic){   //<!-- 判断是否有图片 -->
          $.messager.alert('提示','当前没有图片!','warning')
      }else{
          var image = new Image();
          image.src = urlPic;
          var dialogWidth = setPicSize(image.width,image.height,600,600)[0];
          var dialogHeight = setPicSize(image.width,image.height,600,600)[1];
          image.onload = function(){
              $("#showLegacyBigPicDialog").append("<div id='showLegacyPicDialogSub'></div>");
              $("#showLegacyPicDialogSub").dialog({
                  href: _CPMS_ + '/LegacyAssets/info_legacyShowBigPic',
                  title: "",
                  width: dialogWidth,
                  height:dialogHeight,
                  modal:true,
                  onLoad:function(){
                      $("#legacy_showBigImg").attr("src",urlPic);
                      $(document).bind('click',function(e){
                          console.log("target===",$(e.target).closest("#showLegacyPicDialogSub"));
                          if($(e.target).closest("#showLegacyPicDialogSub").length==0){
                              $(document).unbind('click');
                              $("#showLegacyPicDialogSub").dialog("destroy")
                          }
                      })
                  }
              });
          }
      }
  }
```

### 刷新`tabs`的方法

```js
  function loadOptions(){
      var selectTab = $('#wu-tabs').tabs('getSelected');
      var url = $(selectTab.panel('options').content).attr('src');
      $('#wu-tabs').tabs('update', {
          tab: selectTab,
          options: {
              href: url
          }
      })
  }
```

### `datagrid` 选框禁选事件

```js
  $("#element").datagrid({
      onLoadSuccess: function(data){    <!-- //加载完毕后获取所有的checkbox遍历 -->
          if (data.rows.length>0) {
              <!-- //循环判断操作为新增的不能选择 -->
              for (var i = 0; i < data.rows.length; i++) {
                  <!-- //根据条件让某些行不可选 -->
                  if (data.rows[i].State == 1) {
                      $("input[type='checkbox']")[i + 1].disabled = true;
                      $(".datagrid-header-check input[type='checkbox']").attr("disabled","true");   <!-- //全选框设置不能编辑属性 -->
                  }
              }
          }
      },
      onClickRow: function(rowIndex, rowData){     <!-- //单击datagrid行 -->
          $(this).datagrid("clearSelections");     <!-- //取消点击选择，只有点击check框，才是选中状态 -->
          <!-- //加载完毕后获取所有的checkbox遍历 -->
          $("input[type='checkbox']").each(function(index, el){
              <!-- //如果当前的复选框不可选，则不让其选中 -->
              if (el.State == 1) {
                  $(this).datagrid('unselectRow', index - 1);
              }
          })
      }
  })
```

### `datagrid` 双击单元格进行编辑

```js
  onDblClickCell:function(rowIndex, field, value) {     <!-- //双击事件 -->
      if (field == 'PKG757') {      <!-- //选中要编辑的单元格 -->
          $("#element").datagrid("getColumnOption", 'PKG757').editor = {
              type: 'textbox',     <!-- //类型 -->
              options: {       <!-- //属性
  -->
              }
          };
          $(this).datagrid('beginEdit', rowIndex);
          var ed = $(this).datagrid('getEditor', {index: rowIndex, field: field});
          $(ed.target).focus();    <!-- //获取焦点 -->
          <!-- //触发键盘事件（回车结束编辑） -->
          $('.datagrid-editable .textbox,.datagrid-editable .datagrid-editable-input,.datagrid-editable .textbox-text').bind('keydown', function (e) {
              var code = e.keyCode || e.which;
              if (code == 13) {
                  endEditGridAllRows_customize(1);
              }
          });
      }
  },
  <!-- //选中其他单元格结束编辑 -->
  onSelect:function(rowIndex, rowData){
      endEditGridAllRows_customize();     <!-- //调用结束编辑事件 -->
  }
  <!-- //编辑完成之后 -->
  onAfterEdit:function(rowIndex, rowData, changes){
      var unitPrice = $("#monitorOrderInfoDatagrid").datagrid('getRows')[rowIndex]['PKG044'];   <!-- //单价 -->
      var quantity=$("#monitorOrderInfoDatagrid").datagrid('getRows')[rowIndex]['PKG066'];    <!-- //数量 -->
      var total=Number(unitPrice)*Number(quantity);    <!-- //合计总价 -->

      $('#monitorOrderInfoDatagrid').datagrid('updateRow',{     <!-- //更新数据 -->
          index: rowIndex,
          row: {
              PKG044: rowData['PKG044'],
              PKG066: rowData['PKG066'],
              total: total.toFixed(2),     <!-- //合计（通过数量、单击计算的结果） -->
              PKG001:rowData['PKG001'],
              preTime:rowData['preTime']
          }
      });
  }

  //结束编辑事件
  function endEditGridAllRows_customize(flag) {
      var rowsData =  $("#element").datagrid('getRows');
      for(var i=0;i<rowsData.length;i++) {
          $("#element").datagrid('endEdit', i);     <!-- //结束编辑 -->
      }
  }
```

### datagrid 中editor下的日期比较

```js
$("#datagridCostInfoDetail_parkingLot").datagrid("getColumnOption", 'PBH065').editor = {
    type: 'datebox',
    options: {
        editable:false,
        onShowPanel:function(){
            $('.datagrid-editable-input').datebox().datebox('calendar').calendar({     //通过类名拿到datebox
                validator:function(date) {
                    if (date < newStartDate || date > newEndDate) {
                        return false;
                    } else {
                        return true;
                    }
                }
            })
        }
    }
};
```

### tabs加载页面

```js
var panelOptions = $('#respository_material').tabs('getSelected').panel("options");
    panelOptions.href = _CPMS_ + '/Respository/index_materialList/flag/'+'0';   //“index_materialList”是要加载的页面 “flag”参数名 “0” 值
    
```
