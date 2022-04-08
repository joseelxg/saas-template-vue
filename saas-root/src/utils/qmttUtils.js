
import mqtt from 'mqtt'
import { createUniqueString } from './index'
var QmttUtils = function () {
    
    this.init();
};

let client=null;
let callbacks={}
const uniqueId = createUniqueString()
QmttUtils.prototype.init = function () {
  var connection= {
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
    }
  
    const { host, port, endpoint, ...options } = connection
    const connectUrl = `ws://${host}:${port}${endpoint}`
    try {
        client = mqtt.connect(connectUrl, options)
    } catch (error) {
        console.log('mqtt.connect error', error)
    }

    client.on('connect', () => {
        console.log('Connection succeeded!')
        // this.doSubscribe()
        this.subscribe("GIZTIK/#")
      })
      client.on('error', error => {
        console.log('Connection failed', error)
      })
      client.on('message', (topic, message) => {
        
        // console.log(`Received11 message ${message} from topic ${topic}`)
        if(message.msgType=='deviceRSP'||message.cmd==uniqueId)
        {
            if(callbacks[message.serviceID])
            {
                callbacks(topic,message)
            }
        }
      })

      
      
};
QmttUtils.prototype.subscribe = function (topic) {
    return new Promise((resolve,reject)=>{
        client.subscribe(topic, 0, (error, res) => {
            if (error) {
              console.log('Subscribe to topics error', error)
              reject(error)
            }
            console.log(`Subscribe to ${topic} res`, res)
            resolve()
        })
    })
    
}

QmttUtils.prototype.publish = function (topic,payload,callback) {
    // return new Promise((resolve,reject)=>{
        debugger
        var requestId = createUniqueString()
        payload.cmd = uniqueId
        payload.serviceID = requestId
        if(callback)
        {
            callbacks[requestId]= callback
        }
        if(typeof(payload) != 'string')
        {
            payload = JSON.stringify(payload)
        }
       
        client.publish(topic, payload, 0, error => {

            if (error) {
              console.log('Publish error', error)
            //   reject(error)
            }
            console.log(`Publish to ${topic} params`,payload )
            // resolve()
        })
    // })
}

QmttUtils.prototype.send = function (subscribe,publish,payload,callback) {
    return new Promise((resolve,reject)=>{
        getInstance().subscribe(subscribe).then(()=>{
            if(callback)
            {
                client.on('message',callback)
            }
            getInstance().publish(publish,payload).then(()=>{
                
            },reject)
          },reject)
        
    })
}
QmttUtils.prototype.onMessage = function(topic, message){
    console.log(`Received message ${message} from topic ${topic}`)
}

export var getInstance = (function () {
    var instance;
    return function (html) {
        if (!instance) {
            instance = new QmttUtils();
        }
        return instance;
    }
})();

