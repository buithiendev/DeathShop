const Categories = require('../model/categoriesModal');
const image = require('../model/imageModal');

module.exports.add = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const createdAt = Date.now();
        const linksImage = [];
        req.files.map((file, index) => {
            if (file.filebaseUrl) linksImage.push(file.filebaseUrl);
        });
        const category = await Categories.create({
            name,
            description,
            createdAt,
            linksImage,
        });

        res.send(category);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.send(categories);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.update = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { id, linksImage, name, description } = req.body;
        const linksImageArray = JSON.parse(linksImage);
        req.files.map((file, index) => {
            const imageUrl = file.filebaseUrl;
            linksImageArray.push(file.filebaseUrl);
        });
        const updateDate = new Date();

        const category = await Categories.findByIdAndUpdate(
            categoryId,
            {
                name,
                description,
                $push: { updateDates: updateDate },
                linksImage: linksImageArray,
            },
            { new: true },
        );

        res.send({
            status: true,
            category,
        });
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.changeStatus = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findByIdAndUpdate(
            categoryId,
            {
                status: req.body.status,
            },
            { new: true },
        );
        res.send({
            category,
        });
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findById(categoryId).select([
            '_id',
            'name',
            'description',
            'createdAt',
            'linksImage',
        ]);
        res.send(category);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};
