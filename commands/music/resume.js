module.exports = {
    name: 'resume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}resume',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Сейчас ничего не играет!`);

        if (!client.player.getQueue(message).paused) return message.channel.send(`Музыка уже играет!`);

        const success = client.player.resume(message);

        if (success) message.channel.send(`**${client.player.getQueue(message).playing.title}** возобновлён!`);
    },
};