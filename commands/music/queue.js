module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Ты находишься в другом голосовом канале!`);

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(`Сейчас ничего не играет!`);

        //message.channel.send(`**Очередь ${client.player.getQueue(message).loopMode ? '(включён повтор)' : ''}**\nСейчас играет : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        //    return `**#${i + 1}** - ${track.title} | ${track.author} (Кто добавил: ${track.requestedBy.username})`
        //}).slice(0, 10).join('\n') + `\n\n${queue.tracks.length > 10 ? `И **${queue.tracks.length - 10}** других...` : `В плейлисте **${queue.tracks.length}** треков...`}`));
        message.channel.send({
            embed: {
                color: 'BLUE',
                //author: { name: `Результаты поиска по запросу ${query}` },
                //author: { name: `Очередь ${client.player.getQueue(message).loopMode ? '(включён повтор)' : ''}` },
                footer: { text: 'Tako Bot' },
                timestamp: new Date(),
                description: `Сейчас играет : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
                    return `**#${i + 1}** - ${track.title} | ${track.author} (Кто добавил: ${track.requestedBy.username})`
                }).slice(0, 10).join('\n') + `\n\n${queue.tracks.length > 10 ? `И **${queue.tracks.length - 10}** других...` : `В плейлисте **${queue.tracks.length}** треков...`}`),
            },
        });
    },
};