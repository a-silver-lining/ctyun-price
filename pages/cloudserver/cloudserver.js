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
        checked: 'true'
      },
      {
        name: 'XA',
        value: '雄安'
      },
      {
        name: 'MG',
        value: '蒙贵'
      },
    ],
    sdItems: [ //系统盘类型选项
      {
        name: 'SATA',
        value: 'SATA',
        checked: 'true'
      },
      {
        name: 'SAS',
        value: 'SAS'
      },
      {
        name: 'SSD',
        value: 'SSD'
      },
    ],
    ddItems: [ //数据盘类型选项
      {
        name: 'SATA',
        value: 'SATA',
        checked: 'true'
      },
      {
        name: 'SAS',
        value: 'SAS'
      },
      {
        name: 'SSD',
        value: 'SSD'
      },
    ],
    //定义资源池节点 默认为石家庄节点
    rPname: "SJZ",
    //定义一个操作系统
    operatingSystem: "",
    //定义一个云主机类型（C3,M3,S3）
    cloudServerType: "S3通用型",
    //定义CPU核数
    vCPUNum: 1,
    //定义内存大小
    vMemoryNum: 1,
    //定义系统盘类型  默认为SATA
    sysDicsType: "SATA",
    //定于数据盘类型  默认为SATA
    dataDicsType: "SATA",
    //系统盘大小
    inputSysDiscTxt: '',
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
    origCost_month: 0,
    //原价 original cost 每年
    origCost_year: 0,
    //九折价 10% discount 每月
    discount_10_month: 0,
    //九折价 10% discount 每年
    discount_10_year: 0,
    //八折价 20% discount 每月
    discount_20_month: 0,
    //八折价 20% discount 每年
    discount_20_year: 0,
    //七折价 30% discount 每月
    discount_30_month: 0,
    //七折价 30% discount 每年
    discount_30_year: 0,

    //操作系统类型定义
    multiArray: [
      ['Windows', 'CentOS', 'Ubuntu', 'Debian', 'Oracle Linux', 'OpenSUSE'],
      ['Windows 2008 Enterprise R2 64位 中文版', 'Windows 2008 Enterprise R2 64位 英文版', 'Windows 2012 Datacenter 64位 中文版', 'Windows 2012 Datacenter 64位 英文版', 'Windows 2012 Standard 64位 中文版', 'Windows 2012 Standard 64位 英文版', 'Windows 2016 Datacenter 64位 中文版', 'Windows 2016 Datacenter 64位 英文版']
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
        },
        {
          id: 3,
          name: 'Debian'
        },
        {
          id: 4,
          name: 'Oracle Linux'
        },
        {
          id: 5,
          name: 'OpenSUSE'
        }
      ],
      [{
          id: 0,
          name: 'Windows 2008 Enterprise R2 64位 中文版'
        },
        {
          id: 1,
          name: 'Windows 2008 Enterprise R2 64位 英文版'
        },
        {
          id: 2,
          name: 'Windows 2012 Datacenter 64位 中文版'
        },
        {
          id: 3,
          name: 'Windows 2012 Datacenter 64位 英文版'
        },
        {
          id: 4,
          name: 'Windows 2012 Standard 64位 中文版'
        },
        {
          id: 5,
          name: 'Windows 2012 Standard 64位 英文版'
        },
        {
          id: 6,
          name: 'Windows 2016 Datacenter 64位 中文版'
        },
        {
          id: 7,
          name: 'Windows 2016 Datacenter 64位 英文版'
        }

      ]
    ],
    multiIndex: [0, 0],

    //cpu和内存选择
    index: 0,
    cm_multiArray: [
      ['S3通用型', 'C3通用计算增强型', 'M3内存优化型'],
      ['1', '2', '4', '8', '16'],
      ['1', '2', '4']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '通用型（S3）'
        },
        {
          id: 1,
          name: '通用计算增强型（C3）'
        },
        {
          id: 2,
          name: '内存优化型（M3）'
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
  onLoad: function(options) {
    /* 
    console.log('选择资源池：', app.globalData.rPname)
    console.log('选择系统盘类型：', app.globalData.sysDicsType)
    console.log("选择数据盘类型：", app.globalData.dataDicsType)*/
    console.log('选择资源池：', this.data.rPname)
    console.log('选择系统盘类型：', this.data.sysDicsType)
    console.log("选择数据盘类型：", this.data.dataDicsType)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 更改资源池节点监听函数
   * 取一个中间变量，不要改变全局变量app.globalData.rPname的值，会造成其他用户计算错误
   */
  rPRadioChange: function(e) {
    this.setData({
      rPname: e.detail.value
    })
    console.log('选择资源池：', this.data.rPname)
  },
  /**
   * 更改系统盘类型监听函数
   * 取一个中间变量，不要改变全局变量app.globalData.sysDicsType的值，会造成其他用户计算错误
   */
  sDRadioChange: function(e) {
    this.setData({
      sysDicsType: e.detail.value
    })
    console.log('选择系统盘类型：', this.data.sysDicsType)
  },
  /**
   * 更改数据盘类型监听函数
   * 取一个中间变量，不要改变全局变量app.globalData.sysDicsType的值，会造成其他用户计算错误
   */
  dDRadioChange: function(e) {
    this.setData({
      dataDicsType: e.detail.value
    })
    console.log('选择数据盘类型：', this.data.dataDicsType)
  },
  /**
   * 取出系统盘容量
   *  
   */
  handleSysDiscSize: function(e) {
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
  handleDataDiscSize: function(e) {
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
    } else if (e.detail.value > 327680) {
      this.setData({
        inputDataDiscTxt: 327680
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
  handleDwchange: function(e) {
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
  handleNumCloudServer: function(e) {
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
      console.log("云主机个数为：", e.detail.value)
    }
  },


  //监听操作系统类型变化
  bindMultiPickerChange: function(e) {
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
  bindMultiPickerColumnChange: function(e) {
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
            data.multiArray[1] = ['Windows 2008 Enterprise R2 64位 中文版', 'Windows 2008 Enterprise R2 64位 英文版', 'Windows 2012 Datacenter 64位 中文版', 'Windows 2012 Datacenter 64位 英文版', 'Windows 2012 Standard 64位 中文版', 'Windows 2012 Standard 64位 英文版', 'Windows 2016 Datacenter 64位 中文版', 'Windows 2016 Datacenter 64位 英文版'];
            break;
          case 1:
            data.multiArray[1] = ['CentOS6.4 64位', 'CentOS6.5 64位', 'CentOS6.6 32位', 'CentOS6.6 64位', 'CentOS6.8 32位', 'CentOS6.8 64位', 'CentOS7.0 64位', 'CentOS7.1 64位', 'CentOS7.2 64位', 'CentOS7.3 64位'];
            break;
          case 2:
            data.multiArray[1] = ['Ubuntu14.04 64位', 'Ubuntu16.04 32位', 'Ubuntu16.04 64位', 'Ubuntu16.10 32位'];
            break;
          case 3:
            data.multiArray[1] = ['Debian8.6 32位', 'Debian8.6 64位', 'Debian9.0 64位'];
            break;
          case 4:
            data.multiArray[1] = ['Oracle Linux6.5 64位', 'Oracle Linux6.9 64位', 'Oracle Linux7.3 64位'];
            break;
          case 5:
            data.multiArray[1] = ['OpenSUSE Leap42.1 64位', 'OpenSUSE Leap42.2 64位'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;

    }
    this.setData(data);
  },

  //监听CPU和内存的选择
  cm_bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为=====', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  cm_bindMultiPickerChange: function(e) {
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

  cm_bindMultiPickerColumnChange: function(e) {
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
            data.cm_multiArray[1] = ['1', '2', '4', '8', '16'];
            data.cm_multiArray[2] = ['1', '2', '4'];
            break;
          case 1:
            data.cm_multiArray[1] = ['2', '4', '8', '16', '32', '60']; //C3默认第一个选项
            data.cm_multiArray[2] = ['4', '8'];
            break;
          case 2:
            data.cm_multiArray[1] = ['2', '4', '8', '16', '32', '60']; //M3默认第一个选项
            data.cm_multiArray[2] = ['16'];
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
                data.cm_multiArray[2] = ['1', '2', '4'];
                break;
              case 1:
                data.cm_multiArray[2] = ['4', '8'];
                break;
              case 2:
                data.cm_multiArray[2] = ['8', '16'];
                break;
              case 3:
                data.cm_multiArray[2] = ['16', '32'];
                break;
              case 4:
                data.cm_multiArray[2] = ['32', '64'];
                break;
            }
            break;
          case 1:
            switch (data.cm_multiIndex[1]) {
              case 0:
                data.cm_multiArray[2] = ['4', '8'];
                break;
              case 1:
                data.cm_multiArray[2] = ['8', '16'];
                break;
              case 2:
                data.cm_multiArray[2] = ['16', '32'];
                break;
              case 3:
                data.cm_multiArray[2] = ['32', '64'];
                break;
              case 4:
                data.cm_multiArray[2] = ['64', '128'];
                break;
              case 5:
                data.cm_multiArray[2] = ['128', '256'];
                break;
            }
            break;
          case 2: //添加的项
            switch (data.cm_multiIndex[1]) {
              case 0:
                data.cm_multiArray[2] = ['16'];
                break;
              case 1:
                data.cm_multiArray[2] = ['32'];
                break;
              case 2:
                data.cm_multiArray[2] = ['64'];
                break;
              case 3:
                data.cm_multiArray[2] = ['128'];
                break;
              case 4:
                data.cm_multiArray[2] = ['256'];
                break;
              case 5:
                data.cm_multiArray[2] = ['512'];
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

  //CPU和内存选择三级联动取消按钮回到原来状态，由于cm_multiArray不是完整的三级数组，这个方法打乱顺序, bindcancel='cm_bindcancel'
  /*cm_bindcancel:function(e){
    this.setData({
      cm_multiIndex: this.data.cm_actualIndex
    }),
    console.log("------cm_multiArray--------", this.data.cm_multiArray);
    console.log('cm_multiIndex值已改变-----', this.data.cm_multiIndex),
    console.log('cloudServerType值已改变-----', this.data.cloudServerType),
    console.log('vCPUNum值已改变-----', this.data.vCPUNum),
    console.log('vMemoryNum值已改变-----', this.data.vMemoryNum)
  },*/

  /*
     计算价格函数
    CPU和内存
    s3_vCpu:58,
    s3_memory:30,
    c3_vCpu:100,
    c3_memory:13,
    m3_vCpu:100,
    m3_memory:13,
    //硬盘
    sata:0.3,
    sas:0.4,
    ssd:1.2,
    //带宽,低于5M是20元/M，高于5M是36元/M
    bandWidth1:20,
    bandwidth2:36,
  */
  handleCountPrice: function(e) {
    console.log('获取的全局值：-----', app.globalData.s3_vCpu, app.globalData.s3_memory, app.globalData.c3_vCpu, app.globalData.c3_memory, app.globalData.m3_vCpu, app.globalData.m3_memory, app.globalData.sata, app.globalData.sas, app.globalData.ssd, app.globalData.bandWidth1, app.globalData.bandwidth2)
    var data = this.data
    //1、判断资源池信息，但现在雄安和蒙贵暂时未实现，在此不做判断了
    if (1) {
      //2、判断CPU和内存规格,赋值价格体系 cloudServerType
      this.handleCMPrice();
      //3、判断系统盘价格体系
      this.handleSysDiscPrice();
      //4、判断数据盘价格体系
      this.handleDataDiscPrice();
      //5、计算价格
      //原价 original cost 每月
      /*origCost_month: 0,
      //原价 original cost 每年
      origCost_year: 0,
      //九折价 10% discount 每月
      discount_10_month: 0,
      //九折价 10% discount 每年
      discount_10_year: 0,
      //八折价 20% discount 每月
      discount_20_month: 0,
      //八折价 20% discount 每年
      discount_20_year: 0,
      //七折价 30% discount 每月
      discount_30_month: 0,
      //七折价 30% discount 每年
      discount_30_year: 0,*/


    }
  },

  //判断CPU和内存规格,赋值价格体系cloudServerType
  handleCMPrice: function() {
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
  handleSysDiscPrice:function(){
    switch (this.data.sysDicsType){
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
  handleDataDiscPrice:function(){
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