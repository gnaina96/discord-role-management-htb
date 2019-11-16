'use strict'
const Discord = require('discord.js')
const log = require('../log')
const sendActionLog = require('../helper/actionLog').sendActionLog
const botTriggerCommand = process.env.BOT_TRIGGER_COMMAND
const COLORS = require('../config/colors')
module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES') || !message.guild.owner) { return message.channel.send('You dont have permission to use this command.') }
  const count = parseInt(args[0]) || 1
  if (count > 99) return message.channel.send('You can only delete 99 messages at a time.').then(m => m.delete(2000))
  return message.channel.bulkDelete(count + 1)
    .then(messages => {
      const embed = new Discord.RichEmbed()
        .setColor(COLORS.CYAN_BLUE)
        .setTitle('Channel Purged')
        .setDescription(`${message.author} purged  ${messages.size} messages from ${message.channel.name}`)
      sendActionLog(bot, embed)
      log.info(`Bulk deleted ${messages.size} messages`)
    })

    .catch(log.error)
}

module.exports.config = {
  name: 'purge',
  description: 'Purge a channel with number of messages',
  usage: `${botTriggerCommand} purge <count>`,
  minargs: 1,
  minPermission: 'MANAGE_ROLES'
}
