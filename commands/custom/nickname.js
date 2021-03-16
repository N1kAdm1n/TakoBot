module.exports = {
    name: 'setname',
    aliases: [],
    category: 'Custom',
    utilisation: '{prefix}setname [new name]',

    execute(client, message, args) {
        message.channel.send(args.join(" "));
        message.guild.me.setNickname(`${args.join(" ")}`);
    },
};