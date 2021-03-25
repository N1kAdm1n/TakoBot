module.exports = (client, message, track) => {
    message.channel.send(`Сейчас играет **${track.title}** в **${message.member.voice.channel.name}**`);
};