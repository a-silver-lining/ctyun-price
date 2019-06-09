//app.js
App({
  //启动加载onLaunch函数
  onLaunch: function () {
    
  },
  myFunName:function(){
    console.log("---myFunName函数被调用----")
  },

  //全局数据
  globalData: {
    userName: "天翼云价格计算器",
    /***
     * 价格全局变量
     */
    //vCPU和内存
    s3_vCpu:58,
    s3_memory:30,
    c3_vCpu:100,
    c3_memory:13,
    m3_vCpu:100,
    m3_memory:13,
    //蒙贵(用MG指示)
    s3_vCpu_MG: 50,
    s3_memory_MG: 26,
    //硬盘
    sata:0.3,
    sas:0.4,
    ssd:1.2,
    //带宽,低于5M是20元/M，高于5M是36元/M
    bandWidth1:20,
    bandwidth2:36,

    /*暂不使用
    //定义资源池节点 默认为石家庄节点
    rPname: "SJZ",
    //定义系统盘类型  默认为SATA
    sysDicsType: "SATA",
    //定于数据盘类型  默认为SATA
    dataDicsType: "SATA",*/
  }
})