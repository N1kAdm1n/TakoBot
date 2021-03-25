module.exports = (client, message, queue) => {
    message.channel.send(`Музыка остановилась, так как в очереди больше нет треков!`);
};