const Categories = require('../model/categoriesModal');
const image = require('../model/imageModal');
const fs = require('fs');

module.exports.add = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const createdAt = Date.now();
        const linksImage = [];
        req.files.map((file, index) => {
            if(!file.filebaseUrl) return;
            linksImage.push(file.filebaseUrl);
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
        const { name, description } = req.body;

        const updateDate = new Date();

        const category = await Categories.findByIdAndUpdate(
            categoryId,
            {
                name,
                description,
                $push: { updateDates: updateDate },
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

module.exports.getById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findById(categoryId).select(['_id', 'name', 'description', 'createdAt', 'linksImage']);
        res.send(category);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};
