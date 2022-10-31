const Series = require('../model/seriesModal');

module.exports.add = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const checkName = await Series.findOne({ name });
        if (checkName) {
            return res.status(401).send({
                status: 'this series name has been used',
            });
        }

        const createdAt = new Date();
        const series = await Series.create({
            name: name,
            categoryId: categoryId,
            createdAt: createdAt,
        });

        res.send(series)
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const series = await Series.find({});
        res.send(series);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.update = async (req,res) => {
    try {
        const id = req.params.id;
        const series = await Series.findByIdAndUpdate(id, {
            name: req.body.name,
            status: req.body.status,
        }, {new: true})

        res.send(series);
    } catch(ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
}