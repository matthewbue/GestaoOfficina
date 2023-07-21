const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'https://localhost:44335/',
        secure: true,
        logLevel: 'debug'
    }
];

module.exports = PROXY_CONFIG
