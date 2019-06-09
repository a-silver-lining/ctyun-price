// pages/jscode/jscode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //定义一个变量  var 变量名 = “值”
    var name = "zhangsan"  //字符串
    var abc = 100   //整型
    var hello = 100.98   //浮点型
    var arr = ["java","python","php","nodejs","javascript","c++"]  //数组
    var b = true //false  boolean

    var age = 18
    var myage = 10
    if(myage<18){
      name = "小名，小三"
    }else{
      name = "大名，张三"
    }

    if(myage<20){
      
    }else if(myage>=20 && myage<40){

    }else{

    }

    //for 循环的语法
    for(var i=0;i<arr.length;i++){
      console.log(arr[i])
    }

    console.log("------------------------")
    var i = 0
    while(i<arr.length){
      console.log(arr[i])
      i++

    }

    this.setData({
      myname:name
    })

    this.myfunction()
    this.myfunction2("hello",name)

  },


  myfunction:function(){
    console.log("-----------myfunction")
  },

  myfunction2: function (v,c) {
    console.log("-----------myfunction2",v,c)
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

  }
})