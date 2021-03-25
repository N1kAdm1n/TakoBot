module.exports = {
    name: 'stop',
    aliases: ['st'],
    category: 'Music',
    utilisation: '{prefix}stop',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Сейчас ничего не играет!`);

        client.player.setRepeatMode(message, false);
        const success = client.player.stop(message);

        if (success) message.channel.send(`Музыка **остановлена**`);
    },
};