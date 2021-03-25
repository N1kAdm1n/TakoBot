module.exports = {
    name: 'setname',
    aliases: [],
    category: 'Misc',
    utilisation: '{prefix}setname [new name]',

    execute(client, message, args) {
        //message.channel.send(args.join(" "));
        if  (message.author.id != "278898242333442048") return message.channel.send(`Тебе нельзя этого делать`);
        if  (message.author.id == "278898242333442048") message.guild.me.setNickname(`${args.join(" ")}`);
    },
};