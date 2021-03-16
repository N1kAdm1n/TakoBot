module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filter [filter name]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author} Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author} Ты находишься в другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${message.author} Сейчас ничего не играет!`);

        if (!args[0]) return message.channel.send(`${message.author} Пожалуйста, укажите существующий фильтр для включения или выключения.!`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${message.author} Такого фильтра не существует, попробуйте, например (8D, vibrato, pulsator...)!`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${message.author} Я накладываю фильтр на музыку, пожалуйста, подождите... Обратите внимание: чем дольше музыка, тем больше времени это займёт.`);
        else message.channel.send(`${message.author} Я отключаю музыкальный фильтр, пожалуйста, подождите... Обратите внимание: чем дольше музыка, тем больше времени это займёт.`);
    },
};