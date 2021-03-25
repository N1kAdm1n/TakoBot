module.exports = (client, message, queue) => {
    message.channel.send(`Музыка остановлена, так как в голосовом канале больше нет участников!`);
};