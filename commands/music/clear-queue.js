module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear-queue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} Сейчас ничего не играет!`);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${message.author} В очереди всего одна песня.`);

        client.player.clearQueue(message);

        message.channel.send(`${client.emotes.success} Очередь успешно очищена !`);
    },
};