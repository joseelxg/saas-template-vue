<template>
    <div class="app-container home">
        <div class="home-header">
            <div class="header-item">
                <i class="el-icon-setting"></i>
                <div class="item-content">
                    <div class="content-name">设备总数</div>
                    <div class="content-value">2</div>
                </div>
            </div>
            <div class="header-item">
                <i class="el-icon-link"></i>
                <div class="item-content">
                    <div class="content-name">正常设备</div>
                    <div class="content-value">2</div>
                </div>
            </div>
            <div class="header-item">
                <i class="el-icon-bell"></i>
                <div class="item-content">
                    <div class="content-name">报警设备</div>
                    <div class="content-value">0</div>
                </div>
            </div>
            <div class="header-item">
                <i class="el-icon-switch-button"></i>
                <div class="item-content">
                    <div class="content-name">离线设备</div>
                    <div class="content-value">0</div>
                </div>
            </div>
        </div>
        <div class="home-container">
            <el-card class="box-card left-card">
                <div slot="header">
                    <span>设备列表</span>
                </div>
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-card>
            <el-card class="box-card center-card">
                <div slot="header">
                    <span>地图信息</span>
                </div>
                <div id="container" style="width:100%;height:300px"></div>
            </el-card>
            <el-card class="box-card right-card">
                <div slot="header">
                    <span>设备信息</span>
                </div>
                <div class="info-list">
                    <span class="info-label">设备名称:</span>
                    <span class="info-value">40164597</span>
                </div>
                <div class="info-list">
                    <span class="info-label">设备地址:</span>
                    <span class="info-value">40164597</span>
                </div>
                <div class="info-list">
                    <span class="info-label">告警记录开关:</span>
                    <span class="info-value">开</span>
                </div>
                <div class="info-list">
                    <span class="info-label">离线短信开关:</span>
                    <span class="info-value">开</span>
                </div>
                <div class="info-list">
                    <span class="info-label">离线邮件开关:</span>
                    <span class="info-value">开</span>
                </div>
                <div class="info-list">
                    <span class="info-label">离线判断间隔:</span>
                    <span class="info-value">5分钟</span>
                </div>
                <div class="info-list">
                    <span class="info-label">短信告警间隔:</span>
                    <span class="info-value">5分钟</span>
                </div>
                <div class="info-list">
                    <span class="info-label">邮件告警间隔:</span>
                    <span class="info-value">5分钟</span>
                </div>
                <div class="info-list">
                    <span class="info-label">保存数据间隔:</span>
                    <span class="info-value">30分钟</span>
                </div>
                <div class="info-list">
                    <span class="info-label">短信最多发送次数:</span>
                    <span class="info-value">1</span>
                </div>
            </el-card>
        </div>
        <el-card class="home-footer">
            <div slot="header">
                <span>节点信息</span>
            </div>
            <div class="data-list">
                <el-card class="data-item" v-for="data in dataList" :key="data.id">
                    <div class="item-left">
                        <i class="el-icon-guide"></i>
                        <span class="item-name">{{data.name}}</span>
                    </div>
                    <div class="item-right">
                        <div class="right-item" v-for="obj in data.showData" :key="obj.id">
                            <span class="item-label">{{obj.title}}</span>
                            <span class="item-value">{{obj.value}}</span>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-card>
    </div>
</template>

<script>
import mqtt from 'mqtt'
import * as Qmtt from '@/utils/qmttUtils'
require('echarts/extension/bmap/bmap');
import { loadBMap } from '@/utils/map.js'
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.0",
      connection: {
        host: '39.101.169.169',
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_3be2c321',
        username: 'dreams',
        password: '19810311ecms',
      },
      subscription: {
        topic: 'mqtt_input_test',
        qos: 0,
      },
      publication: {
        topic: 'mqtt_out_test',
        qos: 0,
        payload: '{ "msg": "aaa" }',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
      data: [
            {
                label: '山东农科院设备列表',
                children: [
                    {
                        label: '40164597'
                    },
                    {
                        label: '40133177'
                    }
                ]
            }
      ],
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        dataList: [
            {
                id: '1',
                name: '风力风速',
                showData: [
                    {
                        id: '1',
                        title: '风力(级):',
                        value: '3.00'
                    },
                    {
                        id: '2',
                        title: '风速(m/s):',
                        value: '1.00'
                    }
                ]
            },
            {
                id: '2',
                name: '空气温湿度',
                showData: [
                    {
                        id: '1',
                        title: '温度(℃):',
                        value: '12.00'
                    },
                    {
                        id: '2',
                        title: '湿度(%RH):',
                        value: '54.00'
                    }
                ]
            },
            {
                id: '3',
                name: 'CO2',
                showData: [
                    {
                        id: '1',
                        title: 'CO2(ppm):',
                        value: '12.00'
                    }
                ]
            },
            {
                id: '4',
                name: '光照度',
                showData: [
                    {
                        id: '1',
                        title: '光照度(lux):',
                        value: '4312.00'
                    }
                ]
            },
            {
                id: '5',
                name: '光照度',
                showData: [
                    {
                        id: '1',
                        title: '光照度(lux):',
                        value: '4312.00'
                    }
                ]
            },
            {
                id: '6',
                name: '光照度',
                showData: [
                    {
                        id: '1',
                        title: '光照度(lux):',
                        value: '4312.00'
                    }
                ]
            }
        ]
    }

  },
  created(){
 
    // var params = {
    //     "deviceID":"20220226060002",
    //     "msgType":"clientReg",
    //     "serviceID":"data",
    //     "cmd":"analog_Get",
    //     "mid":"681001",
    //     "paras":{
    //         "name":"dev01",
    //         "Chanel":"1",
    //         "datetime":"NOW"
    //     }
    // }
    // Qmtt.getInstance().subscribe('mqtt_input_test').then(()=>{
    //   Qmtt.getInstance().publish('GIZTIK/STATION/P/60002',params,(topic, message) => {
    //       // console.log(`Received message ${message} from topic ${topic}`)
    //       console.log(JSON.parse(message))
    //   })
    // })
    // Qmtt.getInstance().send('mqtt_input_test','mqtt_out_test',{abc:1234},(topic, message) => {
    //     console.log(`Received message ${message} from topic ${topic}`)
    // })
  },
  mounted() {
      const that = this
      this.$nextTick(() => {
         that.initMap()
      })
  },
  methods: {
      initMap() {
          loadBMap().then((BMapGL) => {
            // 创建地图实例
            let map = new BMapGL.Map("container");
            // 创建点坐标 axios => res 获取的初始化定位坐标
            let point = new BMapGL.Point(114.031761, 22.542826)
            // 初始化地图，设置中心点坐标和地图级别
            map.centerAndZoom(point, 19)
            //开启鼠标滚轮缩放
            map.enableScrollWheelZoom(true)
            map.setHeading(64.5)
            map.setTilt(73)
            // 保存数据
            // this.myMap = map
        }).catch((err)=>{
            console.log(err)
        })

      },
    goTarget(href) {
      window.open(href, "_blank");
    },
    createConnection() {
      // 连接字符串, 通过协议指定使用的连接方式
      // ws 未加密 WebSocket 连接
      // wss 加密 WebSocket 连接
      // mqtt 未加密 TCP 连接
      // mqtts 加密 TCP 连接
      // wxs 微信小程序连接
      // alis 支付宝小程序连接
  
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }

      this.client.on('connect', () => {
        console.log('Connection succeeded!')
        this.doSubscribe()
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
      })
    },
    //订阅主题
    doSubscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, qos, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log(`Subscribe to ${topic} res`, res)
        this.doPublish()
      })
    },
    //取消订阅
    doUnSubscribe() {
      const { topic } = this.subscription
      this.client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
        }
      })
    },
    //消息发布
    doPublish() {
      const { topic, qos, payload } = this.publication
      debugger
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
        console.log(`Publish to ${topic} params`,payload )
      })
    },
    handleNodeClick(data) {
        console.log(data);
    }

  }
};
</script>

<style scoped lang="scss">
.home {
    height: calc(100vh - 84px);
    .home-header {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
        .header-item {
            width: calc(25% - 10px);
            height: 90px;
            padding: 0 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            i {
                font-size: 40px;
                color: rgba(255, 255, 255, 0.5);
            }
            .item-content {
                color: #fff;
                font-size: 16px;
                line-height: 20px;
                .content-value {
                    font-weight: 500;
                    font-size: 22px;
                    line-height: 30px;
                    text-align: right;
                    margin-top: 5px;
                }
            }
        }
        .header-item:nth-child(1) {
            background: #409EFF;
        }
        .header-item:nth-child(2) {
            background: #67C23A;
        }
        .header-item:nth-child(3) {
            background: #F56C6C;
        }
        .header-item:nth-child(4) {
            background: #909399;
        }
    }
    .home-container {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
        .box-card {
            height: 380px;
        }
        .left-card {
            width: 240px;
        }
        .center-card {
            width: calc(100% - 610px);
        }
        .right-card {
            width: 350px;
            .info-list {
                display: flex;
                font-size: 14px;
                line-height: 28px;
                .info-label {
                    color: #333;
                    font-weight: 500;
                    margin-right: 10px;
                }
                .info-value {
                    color: #666;
                }
            }
        }
    }
    .home-footer {
        height: calc(100% - 490px);
        max-height: calc(100% - 490px);
        ::v-deep .el-card__body {
            height: calc(100% - 44px);
            overflow-y: scroll;
            padding: 15px 20px 5px;
        }
        .data-list {
            display: flex;
            flex-wrap: wrap;
            .data-item {
                width: calc(25% - 10px);
                height: 110px;
                margin: 0 5px 10px;
                ::v-deep .el-card__body {
                    height: 100%;
                    padding: 10px 20px;
                    display: flex;
                    align-items: center;
                }
                .item-left {
                    width: 120px;
                    height: 100%;
                    border-right: 1px solid #E6EBF7;
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    color: #999;
                    padding-right: 10px;
                    .item-name {
                        flex: 1;
                        text-align: center;
                        font-size: 14px;
                        font-weight: 500;
                        color: #333;
                        padding: 0 5px;
                    }
                }
                .item-right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .right-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        font-size: 14px;
                        .item-label {
                            font-weight: 500;
                            color: #333;
                        }
                        .item-value {
                            color: #04aa29;
                        }
                    }
                }
            }
        }
    }
}
</style>

