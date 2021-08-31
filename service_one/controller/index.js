const amqp = require('amqplib/callback_api');
const { rabbiturl } = require('../config');
const events = require('events');
const eventEmitter = new events.EventEmitter();
exports.communicate = (req, res) => {
    amqp.connect(rabbiturl, (err, connection) => {
        if (err) throw err;

        connection.createChannel((error, channel) => {
            if (error) throw error;

            const queue = "Kommunikate";
            const message = "Hello world";
            channel.assertQueue(queue, { durable: false });
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        });
    });

    eventEmitter.once('message_from_child', (data) => {
        console.log(data);
        return res.status(200).json({ message: data });
    });
}

exports.webhook = (req, res) => {

    // wait for the message from service_two
    eventEmitter.emit('message_from_child', req.body);
    return res.status(200).json({ message: 'hook completed' });
}