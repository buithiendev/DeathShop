const Images = require('../model/imageModal');

module.exports.getById = async (req, res) => {
    try {
        const idRef = req.params.id;
        const images = await Images.find({idRef});
        res.send(images);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};