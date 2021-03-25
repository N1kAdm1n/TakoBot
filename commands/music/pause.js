module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Сейчас ничего не играет!`);

        if (client.player.getQueue(message).paused) return message.channel.send(`Музыка уже приостановлена!`);

        const success = client.player.pause(message);

        if (success) message.channel.send(`Трек **${client.player.getQueue(message).playing.title}** поставлен на паузу`);
    },
};