const config = {
    development: require("./config.json").database.development || {},
    test: require("./config.json").database.development || {},
    production: require("./config.json").database.development || {},
};

module.exports = config;
