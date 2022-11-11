const Product = require('../model/productModal');
const Categories = require('../model/categoriesModal');
const Series = require('../model/seriesModal');

module.exports.add = async (req, res) => {
    try {
        const {
            categoryId,
            seriesId,
            name,
            description,
            details,
            basicPrice,
            promotionInfo,
            specifications,
            rams,
            memoryStorages,
            colors,
        } = req.body;

        const id = name.toLowerCase().replaceAll(' ', '-');
        const category = await Categories.findById(categoryId);
        const series = await Series.findById(seriesId);

        const createdAt = Date.now();
        const linksImage = [];
        req.files.map((file, index) => {
            if (file.filebaseUrl) linksImage.push(file.filebaseUrl);
        });

        const product = await Product.create({
            id: id,
            categoryId: categoryId,
            categoryIdName: category.id,
            seriesIdName: series.id,
            seriesId: seriesId,
            name: name,
            description: description,
            detailsProduct: details,
            basicPrice: basicPrice,
            promotionInfo: promotionInfo,
            specifications: specifications,
            rams: rams.split(','),
            memorys: memoryStorages.split(','),
            colors: colors.split(','),
            createdAt: createdAt,
            linksImage: linksImage,
        });

        res.send(product);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.get = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        res.send(product);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getByIdName = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.findOne({
            id: id,
        });

        res.send(products);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getByCateId = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.find({
            categoryId: id,
        });

        res.send(products);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getByCateIdName = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.find({
            categoryIdName: id,
        });

        res.send(products);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getBySeriesId = async (req,res) => {
    try {

        const id = req.params.id;
        const products = await Product.find({
            seriesId: id,
        })

        res.send(products);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
}