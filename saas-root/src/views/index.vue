<template>
  <div class="app-container home">
    
  </div>
</template>

<script>
import mqtt from 'mqtt'
import * as Qmtt from '@/utils/qmttUtils'
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
    }

  },
  created(){
 
    var params = {
        "deviceID":"20220226060002",
        "msgType":"clientReg",
        "serviceID":"data",
        "cmd":"analog_Get",
        "mid":"681001",
        "paras":{
            "name":"dev01",
            "Chanel":"1",
            "datetime":"NOW"
        }
    }
    // Qmtt.getInstance().subscribe('mqtt_input_test').then(()=>{
      Qmtt.getInstance().publish('GIZTIK/STATION/P/60002',params,(topic, message) => {
          // console.log(`Received message ${message} from topic ${topic}`)
          console.log(JSON.parse(message))
      })
    // })
    // Qmtt.getInstance().send('mqtt_input_test','mqtt_out_test',{abc:1234},(topic, message) => {
    //     console.log(`Received message ${message} from topic ${topic}`)
    // })
  },
  methods: {
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
    }


  }
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

