const expect = require('chai').expect;

const api = require('../api.js');

const MOCK_RATES = [
    {
        id: 1,
        price: 7.5,
        estimate_days: 4
    },
    {
        id: 2,
        price: 15,
        estimate_days: 1
    },
    {
        id: 3,
        price: 7.5,
        estimate_days: 2
    },
    {
        id: 4,
        price: 10,
        estimate_days: 3
    }
]

describe('Testing findBestRate in api', () => {
    it('should return null for empty array', () => {
        const result = api.findBestRate([]);
        expect(result).to.equal(null);
    });
    it('lowest price possible', () => {
        const result = api.findBestRate(MOCK_RATES);
        expect(result.id).to.equal(3);
        expect(result.price).to.equal(7.5);
        expect(result.estimate_days).to.equal(2);
    });
    it('equal price with lower estimate_days', () => {
        var newRates = MOCK_RATES.filter(obj => {
            return obj.id !== 3
        });
        const result = api.findBestRate(newRates);
        expect(result.id).to.equal(1);
        expect(result.price).to.equal(7.5);
        expect(result.estimate_days).to.equal(4);
    });
});