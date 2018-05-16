LAB 07
==========

本 LAB 重点考察 JavaScript 的使用，但仍不会提供 HTML 和 CSS 代码。

HTML + CSS + JS 代码总行数：约 250 行。
完成时间：约 4 小时。

>**Note:**
>本 LAB 不鼓励大力出奇迹，否则会有相当令人感动的时长支出。
>JavaScript 可以在浏览器内调试，请合理使用 `F12` 和 `⌘⌥I`。

## HTML & CSS 部分
所有内容请水平居中。
下拉框、按钮宽度建议为 300px。
表格边框为 0；表头背景色 `grey`，字体色彩 `whitesmoke`；表格奇数行背景色 `lightgrey`；表元 `padding: 0 0.5em`。
其他保持默认。

## 第一个下拉框功能
```
 - SELECT ONE 
 - CREATE TABLE 
 - ADD ROW 
 - DELETE ROW 
 - DELETE TABLE
```

### SELECT ONE
`commit` 按钮不显示

### CREATE TABLE
#### Step 1
显示两个 `input` 区域，左边 `type="text", placeholder="Table Name"`，右边 `type="number", placeholder="Columns Numbers"`，此时 `commit` 按钮不显示。
#### Step 2
当右边的 `input` 区域中输入正数后，下方显示数量等同于输入数字的数量的一组 `input`，其 `type="text", placeholder="Attribute"`。
此时显示 `commit` 按钮。
#### Step 3
点击  `commit` 按钮后第二个下拉框增加此表名为选项并选中，在第二个下拉框下方显示此表格情况，此时应只有表头（或称其为属性）。

![create](https://github.com/fudansswebfundamental/fdu-17ss-web-lab/blob/master/requirements/screenshots/lab7-create.png)

### ADD ROW 
#### Step 1
显示数量等同于第二个下拉框中选中的表的属性个数的一组 `input`，其 `type="text"`，`placeholder` 内容和属性顺序一致。
#### Step 2
点击  `commit` 按钮后，下方表格添加此行内容。

![add](https://github.com/fudansswebfundamental/fdu-17ss-web-lab/blob/master/requirements/screenshots/lab7-add.png)

### DELETE ROW
#### Step 1
显示数量等同于第二个下拉框中选中的表的属性个数的一组 `input`，其 `type="text"`，`placeholder` 内容和属性顺序一致。
#### Step 2
点击  `commit` 按钮后，下方表格删除此行内容。
>若此 `input` 区域留空，则适配此属性下的任意内容。

### DELETE TABLE
显示 `WARNING: You cannot undo this action!`。
点击  `commit` 按钮后删除第二个下拉框选中的当前表，改为显示第二个下拉框中的第一个表，并在第二个下拉框中选中此表。
> 若是此时第二个下拉框中已经没有表格，则选中 `SELECT (default: last created)` 选项。

## 第二个下拉框功能
选中表格并显示。
选项为表名。
> 选中 `SELECT (default: last created)` 选项时，不显示任何表格。
