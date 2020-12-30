module.exports = {
    module:{
        rules:[
            {
                // process file with js extension
                test: /\.m?js$/,
                // do not try to run babel on any file in node module directory
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-react","@babel/preset-env"],
                        plugins:["@babel/plugin-transform-runtime"]
                    }
                }
            }
        ]
    }
}