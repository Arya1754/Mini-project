const path=require('path')

module.exports={
    mode:'development',
    entry:{
    login:'./login.js',
    profile: './profile.js'
},
    output:{
        path:path.resolve(__dirname),
        filename:'[name].bundle.js'
    },
    watch:true
}