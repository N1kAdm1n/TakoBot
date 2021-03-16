module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} Сейчас ничего не играет!`);

        if (args.join(" ").toLowerCase() === ('queue') || ('q')) {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`Режим повтора отключён!`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`Режим повтора включен, вся очередь будет повторяться бесконечно!`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`Режим повтора отключён!`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`Режим повтора включен, текущий трек будет повторяться бесконечно!`);
            };
        };
    },
};