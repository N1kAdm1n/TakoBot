module.exports = {
    name: 'w-filters',
    aliases: ['filters'],
    category: 'Music',
    utilisation: '{prefix}w-filters',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} Сейчас ничего не играет!`);

        const filtersStatuses = [[], []];

        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? client.emotes.success : client.emotes.off));
        });

        message.channel.send({
            embed: {
                color: 'ORANGE',
                footer: { text: 'Tako Bot' },
                fields: [
                    { name: 'Фильтры', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `Список всех включенных или отключенных фильтров.\nИспользуй \`${client.config.discord.prefix}filter\` чтобы наложить фильтр на трек.`,
            },
        });
    },
};