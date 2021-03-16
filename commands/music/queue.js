module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} Ты находишься в другом голосовом канале!`);

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} Сейчас ничего не играет!`);

        message.channel.send(`**Очередь ${client.player.getQueue(message).loopMode ? '(включён повтор)' : ''}**\nСейчас играет : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (Кто добавил: ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `И **${queue.tracks.length - 5}** других...` : `В плейлисте **${queue.tracks.length}** треков...`}`));
    },
};