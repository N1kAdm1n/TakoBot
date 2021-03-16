module.exports = {
    name: 'roll',
    aliases: [],
    category: 'Custom',
    utilisation: '{prefix}roll d[maximum roll]',

    execute(client, message, args) {
        message.channel.send(`${message.author} тебе выпало ${Math.floor(Math.random()*(message.content.match(/\d+/)[0]))+1}`);
    },
};