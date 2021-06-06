class Queue {

    queue = new Map();

    get(guildId) {
        return this.queue.get(guildId)
    }
    set(guildId,serverQueue) {
        this.queue.set(guildId,serverQueue)
    }

    newServerQueue() {
        return {
            cron : {
                cron1: false,
                cron2: false              
            }
        }
    }

} 
let queue = new Queue() 
module.exports = queue