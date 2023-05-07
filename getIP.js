const { networkInterfaces } = require('os');

function getIP() {
    const nets = networkInterfaces();
    const results = {};
    
    for (const name in nets) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    return results;
}

module.exports = getIP;