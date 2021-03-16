module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            //const infos = message.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const custom = message.client.commands.filter(x => x.category == 'Custom').map((x) => '`' + x.name + '`').join(', ');
            const filters = message.client.commands.filter(x => x.category == 'Filters').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Tako my help' },
                    footer: { text: 'Tako bot' },
                    fields: [
                        //{ name: 'Bot', value: infos },
                        { name: 'Фильтры', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                        { name: 'Музыка', value: music },
                        { name: 'Прочее', value: custom },
                    ],
                    timestamp: new Date(),
                    description: `Чтобы использовать фильтры, ${client.config.discord.prefix}filter (фильтр). Пример : ${client.config.discord.prefix}filter 8D.`,
                },
            });
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);

            message.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Tako my help' },
                    footer: { text: 'Tako bot' },
                    fields: [
                        { name: 'Команда', value: command.name, inline: true },
                        { name: 'Категория', value: command.category, inline: true },
                        { name: 'Варианты', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Применение', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Информация о команде.\nОбязательные аргументы `[]`, необязательные аргументы `<>`.',
                }
            });
        };
    },
};