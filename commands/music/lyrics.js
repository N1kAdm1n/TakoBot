cheerio = require("cheerio");
fetch = require("node-fetch");
const lyricsFinder = require('lyrics-finder');
const Genius = require("genius-lyrics");

module.exports = {
    name: 'lyrics',
    aliases: ['l','ly'],
    category: 'Music',
    utilisation: '{prefix}lyrics',
    
    async execute (client, message, args) {

		if (args[0]){
            songName = args.join(" ");
		} else {
			const track = client.player.nowPlaying(message);
			songName = track.title;
		}

		if(!songName){
			return message.error("Нечего искать!");
		}

		console.log(`Searching: ${songName}`);

		//const genfind = new Genius.Client(client.config.genius.token);
		const genfind = new Genius.Client("MiF8T92OQeBzlcF5_werZEPW0J9bpi2k6FXP2clpRX-PdWfvm5yp9Vq85Tt2i8ka");
		let lyrics = '';
		try{
			console.log('google');
			lyrics = await lyricsFinder(`${songName}`, "");
		} catch (poisknet) {
				lyrics = '';
		}
		if (!lyrics.length){
			try{
				console.log('genius');
				const searches = await genfind.songs.search(`${songName}`);
				const firstSong = searches[0];
				lyricsraw = await firstSong.lyrics();
				lyrics = lyricsraw
					.replace(/\[Текст песни(.*)|\[Интро\]\n|\[Куплет\]\n|\[Куплет 1\]\n|\[Припев\]\n|\[Куплет 2\]\n|\[Куплет 3\]\n|\[Куплет 4\]\n|\[Chorus\]\n|\[Pre-Chorus 2\]\n|\[Verse 2\]\n|\[Pre-Chorus 1\]\n|\[Verse 1\]\n/g, "");
				lyrics = (`**${firstSong.artist.name} - ${firstSong.title}**${lyrics}`);
			}	catch (poisknet){
					lyrics = '';
			}
		}
		if(!lyrics.length){
			try {
				console.log('musixmatch');
				const songNameFormated = songName
					.toLowerCase()
					.replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
					.split(" ").join("%20");
				let res = await fetch(`https://www.musixmatch.com/search/${songNameFormated}`);
				res = await res.text();
				let $ = await cheerio.load(res);
				const songLink = `https://musixmatch.com${$("h2[class=\"media-card-title\"]").find("a").attr("href")}`;
				res = await fetch(songLink);
				res = await res.text();
				$ = await cheerio.load(res);
				lyricsname = await $("h1[class=\"mxm-track-title__track \"]").text();
				const lyrremove = 'Lyrics';
				[, lyricsname] = lyricsname.split(lyrremove);
				lyricsauthor = await $("a[class=\"mxm-track-title__artist mxm-track-title__artist-link\"]").text();
				lyrics2 = await $("p[class=\"mxm-lyrics__content \"]").text();
				lyrics = (`**${lyricsauthor} - ${lyricsname}**\n\n${lyrics2}`)
			} catch (poisknet){
				lyrics = '';
			}
		}
		
		if(!lyrics.length){
			return message.channel.send(`Ничего не найдено по запросу **${songName}**. Рекомендую попробовать ещё раз.`);
		}

		if(lyrics.length > 2048) {
			lyrics = lyrics.substr(0, 2031);
		}
		console.log('successfully!');
		message.channel.send({
            embed: {
                color: 'BLUE',
                footer: { text: 'Tako Bot' },
                timestamp: new Date(),
                description: `${lyrics}`,
            },
        });
	}
};