module.exports = (client, message, query) => {
    message.channel.send(`Ничего не найдено по запросу **${query}**!`);
};