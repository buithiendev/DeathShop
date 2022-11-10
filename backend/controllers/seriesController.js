const Series = require('../model/seriesModal');
const Categories = require('../model/categoriesModal')

module.exports.add = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const checkName = await Series.findOne({ name });
        if (checkName) {
            return res.status(401).send({
                status: 'this series name has been used',
            });
        }
        const id = name.toLowerCase().replaceAll(' ', '-');
        const checkId = await Series.findOne({id: id})
        if(checkId) {
            return res.status(401).send({
                status: 'this series name has been used',
            });
        }

        const category = await Categories.findById(categoryId);

        const createdAt = new Date();
        const series = await Series.create({
            name: name,
            categoryId: categoryId,
            categoryIdName: category.id,
            createdAt: createdAt,
            id: id,
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

module.exports.getByCateIdName = async (req,res) => {
    try {
        const id = req.params.id;
        const series = await Series.find({
            categoryIdName: id
        })

        res.send(series)
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
}