const axios = require('axios');

const ratesUrl = "rates/";
const shipmentUrl = "shipments";

const carriers = [
    {
        name: 'Canada Post',
        url: 'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/'
    },
    {
        name: 'BoxKnight',
        url: 'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/'
    }
];

module.exports.sendShipment = async function sendShipment(shippingOption, destination) {
    if (isEmptyOrNull(shippingOption) || isEmptyOrNull(destination)) {
        return null;
    }
    let rateId = shippingOption.id;
    let carrierUrl = getCarrierUrl(carriers, shippingOption.description);
    try {
        const res = await axios.post(carrierUrl + shipmentUrl, {
            rate_id: rateId,
            destination: destination
        });
        return res.data;
    } catch (err) {
        console.log('sendShipment');
        console.log(err);
    }
}

module.exports.getBestRate = async function getBestRate(destination) {
    if (isEmptyOrNull(destination)) {
        return null;
    }
    let promises = carriers.map(carrier => axios.get(carrier.url + ratesUrl + destination.postalCode));
    try {
        let results = await Promise.allSettled(promises);
        let fulfilledResults = results.filter(result => result.status === 'fulfilled');
        let carriersData = fulfilledResults.map(result => result.value.data);
        let rates = [].concat(...carriersData);
        let bestRate = findBestRate(rates);

        return bestRate;
    } catch (error) {
        console.log('getBestRate');
        console.log(error);
    }
}

function findBestRate(rates) {
    if (!rates.length > 0) {
        return null;
    }
    let bestRate = rates.reduce(
        function(lowest, current) {
            if (current.price > lowest.price) {
                return lowest;
            }
            
            return current.estimate_days < lowest.estimate_days ? current : lowest;
    }, rates[0]);
    return bestRate;
}

function getCarrierUrl(carriers, description) {
    const carrier = carriers.find(carrier => description.includes(carrier.name));
    return carrier.url;
}

function isEmptyOrNull(obj) {
    if (obj == null) {
        return true;
    }
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

module.exports.findBestRate = findBestRate;