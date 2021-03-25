module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`Выбор **отменён**!`);
    } else message.channel.send(`Введи число между **1** и **${tracks.length}**!`);
};