const ytdl = require('ytdl-core')

const Queue = new Map()

module.exports.Play = (message) => {
    if (message.member.voice.channel) {
        const args = message.content.split(' ');
		const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(args[1]));
	}
}