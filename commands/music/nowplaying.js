module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} Сейчас ничего не играет!`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title },
                footer: { text: 'Tako Bot' },
                fields: [
                    { name: 'Канал', value: track.author, inline: true },
                    { name: 'Requested by', value: track.requestedBy.username, inline: true },
                    { name: 'Плейлист', value: track.fromPlaylist ? 'Да' : 'Нет', inline: true },

                    { name: 'Просмотры', value: track.views, inline: true },
                    { name: 'Длительность', value: track.duration, inline: true },
                    { name: 'Активные фильтры', value: filters.length + '/' + client.filters.length, inline: true },

                    { name: 'Громкость', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Режим повтора', value: client.player.getQueue(message).repeatMode ? 'Да' : 'Нет', inline: true },
                    { name: 'Пауза', value: client.player.getQueue(message).paused ? 'Да' : 'Нет', inline: true },

                    { name: 'Таймер', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};