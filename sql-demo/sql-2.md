---
title: sql语句
layout: linux
---

## SQL 语句

### SQL select语句
SELECT 语句用于从数据库中选取数据。结果被存储在一个结果表中，称为结果集。

`语法`
> select column_name1(表列名),column_name2(表列名) from table_name(表名);
select * (表中全部内容) from table_name(表名) limit num (限制条数);
select * from table_name where rowNum <= num (限制条数);
