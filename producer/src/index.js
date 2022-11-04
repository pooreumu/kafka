import kafka from 'node-rdkafka'
import eventType from './eventType.js'

const stream = kafka.Producer.createWriteStream(
    {
        'metadata.broker.list': 'kafka:9092',
    },
    {},
    {
        topic: 'test',
    }
)

stream.on('error', (err) => {
    console.error('Error in our kafka stream')
    console.error(err)
})

const getRandomAnimal = () => {
    const categories = ['CAT', 'DOG']
    return categories[Math.floor(Math.random() * categories.length)]
}

const getRandomNoise = (animal) => {
    if (animal === 'CAT') {
        const noises = ['meow', 'purr']
        return noises[Math.floor(Math.random() * noises.length)]
    } else if (animal === 'DOG') {
        const noises = ['bark', 'woof']
        return noises[Math.floor(Math.random() * noises.length)]
    } else {
        return 'silence..'
    }
}

const queueRandomMessage = () => {
    const category = getRandomAnimal()
    const noise = getRandomNoise(category)
    const event = { category, noise }
    const success = stream.write(eventType.toBuffer(event))
    if (success) {
        console.log(`message queued (${JSON.stringify(event)})`)
    } else {
        console.log('Too many messages in the queue already..')
    }
}

setInterval(() => {
    queueRandomMessage()
}, 3000)
