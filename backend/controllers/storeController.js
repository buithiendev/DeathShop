const Store = require('../model/storeModal');

module.exports.getAll = async (req, res) => {
    try {
        const store = await Store.find();

        return res.send(store);
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};

module.exports.add = async (req, res) => {
    try {
        const response = await Store.create(req.body);

        return res.send(response);
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};
