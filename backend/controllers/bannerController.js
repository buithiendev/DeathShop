const Banner = require('../model/bannerModal');

module.exports.get = async (req, res) => {
    try {
        const banners = await Banner.find();

        return res.send(banners);
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};

module.exports.add = async (req, res) => {
    try {
        const isAdd = await Banner.create({
            link: req.body.link,
            linkImage: req.files[0].filebaseUrl,
        });

        return res.send(isAdd);
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};

module.exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        isDelete = await Banner.findByIdAndDelete(id)

        return res.send(isDelete)

    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};
