module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filter [filter name]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`Сейчас ничего не играет!`);

        if (!args[0]) return message.channel.send(`Укажи существующий фильтр для включения или выключения.!`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`Такого фильтра не существует, попробуй, например (8D, vibrato, pulsator...)!`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`Я накладываю фильтр на музыку, пожалуйста, подождите... Обратите внимание: чем дольше музыка, тем больше времени это займёт.`);
        else message.channel.send(`Я отключаю музыкальный фильтр, пожалуйста, подождите... Обратите внимание: чем дольше музыка, тем больше времени это займёт.`);
    },
};