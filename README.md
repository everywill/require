# require

> AMD规范模块加载器的简单实现。

### 使用方法

通过script标签引入后，通过AMD规范定义及加载模块：`define(dependencies?, factory)`; *dependencies*为依赖模块组成的数组，目前只支持模块名中直接指定该模块的地址，尚未完成require.config的部分。