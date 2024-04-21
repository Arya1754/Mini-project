const path=require('path')

module.exports={
    mode:'development',
    entry:{
    login:'./assets/js/login.js',
    cart:'./assets/js/addcart.js',
    profile:'./assets/js/profile.js',
},
    output:{
        path:path.resolve(__dirname),
        filename:'[name].bundle.js'
    },
    watch:true
}