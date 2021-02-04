const axios = require('axios');

const carriers = [
    {
        name: 'Canada Post',
        url: 'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/'
    },
    {
        name: 'BoxKnight',
        url: 'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/'
    }
];

module.exports.getRates = async function getRates(destination) {
    const promises = carriers.map(carrier => axios.get(carrier.url + destination));
    const results = await Promise.allSettled(promises);
    const goodResults = results.filter(result => result.status === 'fulfilled');

    console.log(goodResults);
}