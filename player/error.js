module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`На сервере не играет никакой музыки!`)
            break;
        case 'NotConnected':
            message.channel.send(`Ты не подключён ни к одному из голосовых каналов!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`Я не могу присоединиться к твоему голосовому каналу, пожалуйста, проверьте мои разрешения!`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${args[0].title} недоступен в вашей стране! Пропускаю...`);
            break;
        case 'MusicStarting':
            message.channel.send(`Музыка включается ... подожди и повтори попытку!`);
            break;
        case 'LiveVideo':
            message.channel.send(`Включение стримов временно недоступно!`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Что-то пошло не так ... Ошибка : ${error}`);
    };
};
