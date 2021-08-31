const amqp = require('amqplib/callback_api');
const axios = require('axios');

amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) throw err;

    connection.createChannel((error, channel) => {
        if (error) throw error;

        const queue = "Kommunikate";
        channel.assertQueue(queue, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
            const data = {
                message: "Hello from service two"
            };
            const headers = {
                "Content-type": "application/json",
            }
            axios.post('http://localhost:4500/webhook/communicate', data, { headers: headers })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                })
        }, { noAck: true });
    });
})