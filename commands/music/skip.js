module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Сейчас ничего не играет!`);

        const success = client.player.skip(message);

        if (success) message.channel.send(`Текущий трек **пропущен**!`);
    },
};