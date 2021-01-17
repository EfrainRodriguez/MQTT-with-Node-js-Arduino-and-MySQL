const mqtt = require('mqtt')
const serialport = require('serialport')

const port = new serialport('COM4',{
    baudRate: 9600
})
const parser = port.pipe(new serialport.parsers.Readline({delimiter: '\n'}))

const pub = mqtt.connect('mqtt://localhost:9000')

pub.on('connect', () => {
    parser.on('data', (data) => {
        pub.publish('topic test', data)
    })
})