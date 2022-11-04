import kafka from 'node-rdkafka'
import eventType from './eventType.js'

const consumer = new kafka.KafkaConsumer(
    {
        'group.id': 'kafka',
        'metadata.broker.list': 'kafka:9092',
    },
    {}
)

consumer.connect()

consumer
    .on('ready', () => {
        console.log('consumer ready..')
        consumer.subscribe(['test'])
        consumer.consume()
    })
    .on('data', function (data) {
        console.log(`received message: ${eventType.fromBuffer(data.value)}`)
    })
