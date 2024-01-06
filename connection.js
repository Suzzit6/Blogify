const mongoose = require("mongoose")

async function ConnectMongo(link){
   mongoose.connect(link)
}

module.exports = { ConnectMongo }