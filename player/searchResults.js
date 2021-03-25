module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: 'BLUE',
            //author: { name: `Результаты поиска по запросу ${query}` },
            author: { name: 'Ответь номером трека, который хочешь воспроизвести.' },
            footer: { text: 'Tako Bot' },
            timestamp: new Date(),
            description: `Результаты поиска по запросу **${query}**\n\n${tracks.map((t, i) => `${t.url}\n**${i + 1}** - ${t.title} [${t.duration}]`).join('\n\n')}`,
        },
    });
};