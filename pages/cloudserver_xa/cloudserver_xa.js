// pages/cloudserver/cloudserver.js

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rpItems: [ //资源池选项
      {
        name: 'SJZ',
        value: '石家庄',
      },
      {
        name: 'XA',
        value: '雄安',
        checked: 'true'
      },

    ],
    sdItems: [ //系统盘类型选项
      {
        name: 'SATA',
        value: 'SATA'
      },
      {
        name: 'SAS',
        value: 'SAS',
        checked: 'true'
      },
      {
        name: 'SSD',
        value: 'SSD'
      },
    ],
    ddItems: [ //数据盘类型选项
      {
        name: 'SATA',
        value: 'SATA'
      },
      {
        name: 'SAS',
        value: 'SAS',
        checked: 'true'
      },
      {
        name: 'SSD',
        value: 'SSD'
      },
    ],
    //定义资源池节点 默认为雄安节点
    rPname: "XA",
    //定义一个操作系统
    operatingSystem: "",
    //定义一个云主机类型（C3,M3,S3）
    cloudServerType: "S3通用型",
    //定义CPU核数
    vCPUNum: 1,
    //定义内存大小
    vMemoryNum: 1,
    //定义系统盘类型  默认为SAS，雄安节点只能选高IO
    sysDicsType: "SAS",
    //定于数据盘类型  默认为SAS，雄安节点只能选高IO
    dataDicsType: "SAS",
    //系统盘大小
    inputSysDiscTxt: 40,
    //数据盘大小
    inputDataDiscTxt: '',
    //带宽大小
    inputDwTxt: '',
    //订购台数
    inputNumCloudTxt: '',

    //计算价格
    //CPU价格
    vCpuPrice: 58,
    //内存价格
    memoryPrice: 30,
    //系统盘价格
    sysDicsPrice: 0.3,
    //数据盘价格
    dataDicsPrice: 0.3,

    //原价 original cost 每月
    origCost_month: '',
    //原价 original cost 每年
    origCost_year: '',
    //九折价 10% discount 每月
    discount_10_month: '',
    //九折价 10% discount 每年
    discount_10_year: '',
    //八折价 20% discount 每月
    discount_20_month: '',
    //八折价 20% discount 每年
    discount_20_year: '',
    //七折价 30% discount 每月
    discount_30_month: '',
    //七折价 30% discount 每年
    discount_30_year: '',

    //操作系统类型定义
    multiArray: [
      ['Windows', 'CentOS', 'Ubuntu'],
      ['Windows 2008 R2 64位', 'Windows 2012 R2 标准中文版 64位']
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: 'Windows'
      },
      {
        id: 1,
        name: 'CentOS'
      },
      {
        id: 2,
        name: 'Ubuntu'
      }
      ],
      [{
        id: 0,
        name: 'Windows 2008 R2 64位'
      },
      {
        id: 1,
        name: 'Windows 2012 R2 标准中文版 64位'
      }
      ]
    ],
    multiIndex: [0, 0],

    //cpu和内存选择
    index: 0,
    cm_multiArray: [
      ['S3通用型'],
      ['1', '2', '4', '8', '16','32'],
      ['1', '2', '4','8']
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: '通用型（S3）'
      }
      ],
      [{
        id: 0,
        name: '1'
      },
      {
        id: 1,
        name: '2'
      },
      {
        id: 2,
        name: '4'
      },
      {
        id: 3,
        name: '8'
      },
      {
        id: 4, //参考代码是3
        name: '16'
      },
      {
        id: 5, //参考代码是3
        name: '32'
      }
      ],
      [{
        id: 0,
        name: '1'
      },
      {
        id: 1,
        name: '2'
      },
      {
        id: 2,
        name: '4'
      },
      {
        id: 3,
        name: '8'
      }
      ]
    ],
    cm_multiIndex: [0, 0, 0],
    cm_actualIndex: [0, 0, 0],

  },

  /**
   * 生命周期函数--监听页面加载    
   * 使用本页面的值，不使用全局变量的值
   */
  onLoad: function (options) {
   
    console.log('选择资源池：', this.data.rPname)
    console.log('选择系统盘类型：', this.data.sysDicsType)
    console.log("选择数据盘类型：", this.data.dataDicsType)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 更改资源池节点监听函数
   * 取一个中间变量，不要改变全局变量app.globalData.rPname的值，会造成其他用户计算错误
   */
  rPRadioChange: function (e) {
    
    //页面跳转到石家庄资源池
    wx.redirectTo({
      url: '../cloudserver/cloudserver',
    })
    console.log('选择资源池：', this.data.rPname)
  },
  /**
   * 更改系统盘类型监听函数
   * 取一个中间变量，不要改变全局变量app.globalData.sysDicsType的值，会造成其他用户计算错误
   */
  sDRadioChange: function (e) {
    this.setData({
      sysDicsType: e.detail.value
    })
    console.log('选择系统盘类型：', this.data.sysDicsType)
  },
  /**
   * 更改数据盘类型监听函数
   * 取一个中间变量，不要改变全局变量app.globalData.sysDicsType的值，会造成其他用户计算错误
   */
  dDRadioChange: function (e) {
    this.setData({
      dataDicsType: e.detail.value
    })
    console.log('选择数据盘类型：', this.data.dataDicsType)
  },
  /**
   * 取出系统盘容量
   *  
   */
  handleSysDiscSize: function (e) {
    //如果没有值，则为40
    if (e.detail.value == "") {
      this.setData({
        inputSysDiscTxt: 40
      })
      console.log("系统盘大小为====：", this.data.inputSysDiscTxt)
    } else if (e.detail.value >= 0 && e.detail.value <= 40) {
      this.setData({
        inputSysDiscTxt: 40
      })
      console.log("系统盘大小为：", this.data.inputSysDiscTxt)
    } else if (e.detail.value > 1000) {
      this.setData({
        inputSysDiscTxt: 1000
      })
      console.log("系统盘大小为：", this.data.inputSysDiscTxt)
    } else {
      this.setData({
        inputSysDiscTxt: e.detail.value
      })
      console.log("系统盘大小为：", this.data.inputSysDiscTxt)
    }
  },

  /**
   * 取出数据盘容量
   *  10G起步订购，数据盘容量大于327680需要判断一下
   */
  handleDataDiscSize: function (e) {
    //如果没有值，则为0
    if (e.detail.value == "") {
      this.setData({
        inputDataDiscTxt: 0
      })
      console.log("数据盘大小为====：", this.data.inputDataDiscTxt)
    } else if (e.detail.value > 0 && e.detail.value <= 10) { //10G起步订购
      this.setData({
        inputDataDiscTxt: 10
      })
      console.log("数据盘大小为====：", this.data.inputDataDiscTxt)
    } else if (e.detail.value > 2000) {
      this.setData({
        inputDataDiscTxt: 2000
      })
      console.log("数据盘大小为====：", this.data.inputDataDiscTxt)
    } else {
      this.setData({
        inputDataDiscTxt: e.detail.value
      })
      console.log("数据盘大小为====：", this.data.inputDataDiscTxt)
    }
    //如果大于327680，单块硬盘最大32T，云主机最多挂载10块
  },
  /**
   * 取出带宽大小，空值默认赋值为0
   *  最小0，最大300M，0代表不需要带宽和弹性ip
   */
  handleDwchange: function (e) {
    //如果没有值，则为0
    if (e.detail.value == "" || e.detail.value == 0) {
      this.setData({
        inputDwTxt: 0
      })
      console.log("带宽大小为====：", this.data.inputDwTxt)
    } else if (e.detail.value > 300) {
      this.setData({
        inputDwTxt: 300
      })
      console.log("带宽大小为-----", this.data.inputDwTxt)
    } else {
      this.setData({
        inputDwTxt: e.detail.value
      })
      console.log("带宽大小为----", this.data.inputDwTxt)
    }
  },

  /**
   * 取出云主机订购个数
   *  最小1，最大100
   */
  handleNumCloudServer: function (e) {
    //如果没有值，则为0
    if (e.detail.value == "") {
      this.setData({
        inputNumCloudTxt: 1
      })
      console.log("云主机个数为====：", this.data.inputNumCloudTxt)
    } else if (e.detail.value == 0) {
      this.setData({
        inputNumCloudTxt: 1
      })
      console.log("云主机个数为====：", this.data.inputNumCloudTxt)
    } else {
      this.setData({
        inputNumCloudTxt: e.detail.value
      })
      console.log("云主机个数为：", this.data.inputNumCloudTxt)
    }
  },


  //监听操作系统类型变化
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    console.log('-------multiArray------', this.data.multiArray)
    console.log('-------============------', e.detail.value[0], e.detail.value[1])
    console.log('-------------', this.data.multiArray[0][e.detail.value[0]])
    console.log('-------------', this.data.multiArray[1][e.detail.value[1]])
    this.setData({
      operatingSystem: this.data.multiArray[1][e.detail.value[1]]
    })
    console.log('--最终操作系统类型--', this.data.operatingSystem)
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['Windows 2008 R2 64位', 'Windows 2012 R2 标准中文版 64位'];
            break;
          case 1:
            data.multiArray[1] = ['CentOS6.5 64位','CentOS6.7 64位','CentOS6.8 64位', 'CentOS7.0 64位', 'CentOS7.1 64位', 'CentOS7.2 64位'];
            break;
          case 2:
            data.multiArray[1] = ['Ubuntu12.04 64位', 'Ubuntu14.04 64位', 'Ubuntu16.04 64位'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;

    }
    this.setData(data);
  },

  //监听CPU和内存的选择
  cm_bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为=====', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  cm_bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为------', e.detail.value)
    this.setData({
      cm_multiIndex: e.detail.value,
      cm_actualIndex: e.detail.value
    })
    console.log("------cm_multiArray--------", this.data.cm_multiArray);
    console.log('-------============------', e.detail.value[0], e.detail.value[1], e.detail.value[2])
    console.log('-------------', this.data.cm_multiArray[0][e.detail.value[0]])
    console.log('-------------', this.data.cm_multiArray[1][e.detail.value[1]])
    console.log('-------------', this.data.cm_multiArray[2][e.detail.value[2]])
    //为后台CPU和内存赋值
    this.setData({
      cloudServerType: this.data.cm_multiArray[0][e.detail.value[0]],
      vCPUNum: this.data.cm_multiArray[1][e.detail.value[1]],
      vMemoryNum: this.data.cm_multiArray[2][e.detail.value[2]]
    })
    console.log('--最终选择的CPU和内存--', this.data.cloudServerType, this.data.vCPUNum, this.data.vMemoryNum)
  },

  cm_bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      cm_multiArray: this.data.cm_multiArray,
      cm_multiIndex: this.data.cm_multiIndex
    };
    data.cm_multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.cm_multiIndex[0]) {
          case 0:
            data.cm_multiArray[1] = ['1', '2', '4', '8', '16', '32'];
            data.cm_multiArray[2] = ['1', '2', '4', '8'];
            break;
        }
        data.cm_multiIndex[1] = 0;
        data.cm_multiIndex[2] = 0;
        break;
      case 1:
        switch (data.cm_multiIndex[0]) {
          case 0:
            switch (data.cm_multiIndex[1]) {
              case 0:
                data.cm_multiArray[2] = ['1', '2', '4', '8'];
                break;
              case 1:
                data.cm_multiArray[2] = ['2', '4', '8', '16'];
                break;
              case 2:
                data.cm_multiArray[2] = ['4', '8', '16', '32'];
                break;
              case 3:
                data.cm_multiArray[2] = ['8', '16', '32', '64'];
                break;
              case 4:
                data.cm_multiArray[2] = ['16','32', '64'];
                break;
              case 5:
                data.cm_multiArray[2] = ['32', '64', '128'];
                break;
            }
            break;
        }
        data.cm_multiIndex[2] = 0;
        console.log(data.cm_multiIndex);
        break;
    }
    this.setData(data);
  },

  /*
     计算价格函数
    
  */
  handleCountPrice: function (e) {
    var data = this.data
    var globalData = app.globalData
    //1、判断资源池信息，但现在雄安和蒙贵暂时未实现，在此不做判断了
    if (1) {
      //2、判断CPU和内存规格,赋值价格体系 cloudServerType
      this.handleCMPrice();
      //3、判断系统盘价格体系
      this.handleSysDiscPrice();
      //4、判断数据盘价格体系
      this.handleDataDiscPrice();

      //5、分别计算各项价格
      //计算CPU和内存价格（每月）
      var origCost_month_cpumem = data.vCpuPrice * data.vCPUNum + data.memoryPrice * data.vMemoryNum
      console.log("计算CPU和内存标准价格-----：", origCost_month_cpumem)

      //计算系统盘价格，判断系统盘是否为空，是否大于40，由于雄安节点系统盘不用补差价，也不能扩容系统盘，故结果为零
      var origCost_month_sysdisc
      if (data.inputSysDiscTxt == '' || data.inputSysDiscTxt == 40) {
        origCost_month_sysdisc = (data.sysDicsPrice - 0.3) * 40 * 0
      } else {
        origCost_month_sysdisc = (data.sysDicsPrice - 0.3) * 40 + data.sysDicsPrice * (data.inputSysDiscTxt - 40) * 0
      }
      console.log("计算系统盘标准价格-----：", origCost_month_sysdisc)

      //计算数据盘价格
      var origCost_month_datadisc
      if (data.inputDataDiscTxt == '') {
        origCost_month_datadisc = 0
      } else {
        origCost_month_datadisc = data.dataDicsPrice * data.inputDataDiscTxt
      }
      console.log("计算数据盘标准价格-----：", origCost_month_datadisc)

      //计算带宽大小
      var origCost_month_bandwidth
      if (data.inputDwTxt == '' || data.inputSysDiscTxt == 0) {
        origCost_month_bandwidth = 0
      } else if (data.inputDwTxt > 0 && data.inputDwTxt < 5) {
        origCost_month_bandwidth = globalData.bandWidth1 * data.inputDwTxt
      } else {
        origCost_month_bandwidth = globalData.bandWidth1 * 5 + globalData.bandwidth2 * (data.inputDwTxt - 5)
      }
      console.log("计算带宽标准价格-----：", origCost_month_bandwidth)

      //计算云主机个数
      var origCost_month_NumCloudTxt
      if (data.inputNumCloudTxt == '' || data.inputNumCloudTxt == 0) {
        origCost_month_NumCloudTxt = 1
      } else {
        origCost_month_NumCloudTxt = data.inputNumCloudTxt
      }
      console.log("计算云主机个数-----：", data.inputNumCloudTxt, origCost_month_NumCloudTxt)

      //计算每月标准价格
      var origCost_month = (origCost_month_cpumem + origCost_month_sysdisc + origCost_month_datadisc + origCost_month_bandwidth) * origCost_month_NumCloudTxt
      console.log("计算的标准价格（每月）---======------=====--：", origCost_month.toFixed(2))
      //计算每年标准价格
      var origCost_year = origCost_month * 12
      console.log("计算的标准价格（每年）---======------=====--：", origCost_year.toFixed(2))
      this.setData({
        origCost_month: origCost_month.toFixed(2),
        origCost_year: origCost_year.toFixed(2)
      })

      //计算九折价 10% discount 每月
      var discount_10_month = origCost_month * 0.9
      console.log("计算的九折价格（每月）---======------=====--：", discount_10_month.toFixed(2))
      //计算九折价 10% discount 每年
      var discount_10_year = discount_10_month * 12
      console.log("计算的九折价格（每年）---======------=====--：", discount_10_year.toFixed(2))
      this.setData({
        discount_10_month: discount_10_month.toFixed(2),
        discount_10_year: discount_10_year.toFixed(2)
      })

      //计算八折价 20% discount 每月
      var discount_20_month = origCost_month * 0.8
      console.log("计算的八折价格（每月）---======------=====--：", discount_20_month.toFixed(2))
      //计算八折价 20% discount 每年
      var discount_20_year = discount_20_month * 12
      console.log("计算的八折价格（每年）---======------=====--：", discount_20_year.toFixed(2))
      this.setData({
        discount_20_month: discount_20_month.toFixed(2),
        discount_20_year: discount_20_year.toFixed(2)
      })

      //计算七折价 30% discount 每月
      var discount_30_month = origCost_month * 0.7
      console.log("计算的八折价格（每月）---======------=====--：", discount_30_month.toFixed(2))
      //计算七折价 30% discount 每年
      var discount_30_year = discount_30_month * 12
      console.log("计算的八折价格（每年）---======------=====--：", discount_30_year.toFixed(2))
      this.setData({
        discount_30_month: discount_30_month.toFixed(2),
        discount_30_year: discount_30_year.toFixed(2)
      })
    }
  },

  //判断CPU和内存规格,赋值价格体系cloudServerType
  handleCMPrice: function () {
    switch (this.data.cloudServerType) {
      case "S3通用型":
        this.setData({
          vCpuPrice: 58,
          memoryPrice: 30
        })
        console.log("需要计算的CPU和内存标准价格====：", this.data.vCpuPrice, this.data.memoryPrice)
        break;
      case "C3通用计算增强型":
        this.setData({
          vCpuPrice: 100,
          memoryPrice: 13
        })
        console.log("需要计算的CPU和内存标准价格====：", this.data.vCpuPrice, this.data.memoryPrice)
        break;
      case "M3内存优化型":
        this.setData({
          vCpuPrice: 100,
          memoryPrice: 13
        })
        console.log("需要计算的CPU和内存标准价格====：", this.data.vCpuPrice, this.data.memoryPrice)
        break;
    }
  },
  //判断系统盘价格体系
  handleSysDiscPrice: function () {
    switch (this.data.sysDicsType) {
      case "SATA":
        this.setData({
          sysDicsPrice: 0.3
        })
        console.log("需要计算的系统盘价格体系====：", this.data.sysDicsPrice)
        break;
      case "SAS":
        this.setData({
          sysDicsPrice: 0.4
        })
        console.log("需要计算的系统盘价格体系====：", this.data.sysDicsPrice)
        break;
      case "SSD":
        this.setData({
          sysDicsPrice: 1.2
        })
        console.log("需要计算的系统盘价格体系====：", this.data.sysDicsPrice)
        break;
    }
  },
  //判断数据盘价格体系
  handleDataDiscPrice: function () {
    switch (this.data.dataDicsType) {
      case "SATA":
        this.setData({
          dataDicsPrice: 0.3
        })
        console.log("需要计算的数据盘价格体系====：", this.data.dataDicsPrice)
        break;
      case "SAS":
        this.setData({
          dataDicsPrice: 0.4
        })
        console.log("需要计算的数据盘价格体系====：", this.data.dataDicsPrice)
        break;
      case "SSD":
        this.setData({
          dataDicsPrice: 1.2
        })
        console.log("需要计算的数据盘价格体系====：", this.data.dataDicsPrice)
        break;
    }
  },


})