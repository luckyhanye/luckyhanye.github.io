---
title: 表格
layout: linux
---

## 表格实例

### 财务收据表格

代码展示：

`css样式`

```css
  <style>
    body,ul{
      padding: 0;
      margin: 0;
      box-sizing:border-box;
    }
    ul{
      list-style:none;
    }
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    tr,th,td{
      border:1px solid blue;
      border-collapse:collapse;
    }
    table{
      height:30px;
      border-collapse:collapse;
      text-align:center;
    }
    h3{
      line-height: 30px;
      border-bottom:4px double blue;
      width:360px;
      text-align:center;
      margin:0 auto;
    }
    .subtitle{
      margin:20px 0 10px 0;

    }
    .left{
      float:left;
    }
    .right{
      float:right;
    }
    .dialog ul{
      margin-top:20px
    }
    .dialog ul li{
      float:left;
    }
    .dialog ul li:nth-child(2){
      margin:0 20px;
    }
```

`html代码`

```html
  <div class="dialog" style="width:380px;margin:0 auto;margin-top:50px">
    <h3>账单</h3>
    <div class="subtitle clearfix">
      <div class="left">日期：
        <input type="text">
        <select name="date" id="selectDate">
          <option value="1">111</option>
          <option value="2">222</option>
          <option value="3">333</option>
        </select>
      </div>
      <div class="right">编号：</div>
    </div>
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="width:60px">资产</td>
        <td style="width:160px"></td>
        <td style="width:60px">资产</td>
        <td style="width:100px"></td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="width:60px">资产</td>
        <td style="width:90px"></td>
        <td style="width:40px">资产</td>
        <td style="width:190px"></td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="width:60px">资产</td>
        <td style="width:90px">
          <table style="border:none">
            <tr>
              <td style="border:none;border-left:1px dashed blue;border-right:1px dashed blue">千</td>
              <td>百</td>
              <td>十</td>
              <td>万</td>
            </tr>
          </table>
        </td>
        <td style="width:40px">资产</td>
        <td style="width:190px"></td>
      </tr>
    </table>
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="width:60px">资产</td>
        <td style="width:322px"></td>
      </tr>
    </table>
    <ul>
      <li>核算<span></span></li>
      <li>核算<span></span></li>
      <li>核算<span></span></li>
    </ul>
  </div>
```
