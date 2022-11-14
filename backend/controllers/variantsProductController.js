const VariantsProduct = require('../model/variantsProductModal');

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id;

        const variant = await VariantsProduct.findById(id);

        res.send(variant);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};
