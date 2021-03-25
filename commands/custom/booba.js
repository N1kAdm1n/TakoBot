module.exports = {
    name: 'booba',
    aliases: [],
    category: 'Misc',
    utilisation: '{prefix}booba',

    execute(client, message, args) {
        message.channel.send({files: ["https://media1.tenor.com/images/4e38142c47c810d38c0b2c59dcf749fd/tenor.gif?itemid=18858228"]});
    },
};