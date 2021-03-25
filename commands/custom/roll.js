module.exports = {
    name: 'roll',
    aliases: [],
    category: 'Misc',
    utilisation: '{prefix}roll d[maximum roll]',

    execute(client, message, args) {
        let ammount = message.content.match(/\d+/)[0];
        if (ammount == '00'){
            let roll = Math.floor(Math.random()*100)+1;
            message.channel.send(`${message.author} тебе выпало ${roll}%`);
        } else {
            let roll = Math.floor(Math.random()*ammount)+1;
            message.channel.send(`${message.author} тебе выпало ${roll}`);
        }
    },
};