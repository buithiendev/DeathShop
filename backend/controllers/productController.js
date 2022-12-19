const Product = require('../model/productModal');
const Categories = require('../model/categoriesModal');
const VariantsProduct = require('../model/variantsProductModal');
const Series = require('../model/seriesModal');

module.exports.add = async (req, res, next) => {
    try {
        const {
            categoryId,
            seriesId,
            name,
            description,
            details,
            newPrice,
            promotionInfo,
            specifications,
            rams,
            memoryStorages,
            colors,
        } = req.body;

        const colorsArray = colors.length === 0 ? [] : colors.split(',');

        const id = `${name
            .toLowerCase()
            .replaceAll(' ', '-')}-${rams}-${memoryStorages}`;

        const checkProduct = await Product.findOne({
            id: id,
            categoryId: categoryId,
            seriesId: seriesId,
        });
        if (checkProduct) {
            return res.status(400).send({
                status: 'Product is already',
            });
        }

        const category = await Categories.findById(categoryId);
        const series = await Series.findById(seriesId);

        const linksImage = [];
        if (req.files) {
            req.files.map((file, index) => {
                if (file.filebaseUrl) linksImage.push(file.filebaseUrl);
            });
        }

        const createdAt = new Date();
        const product = await Product.create({
            id: id,
            categoryId: categoryId,
            categoryIdName: category.id,
            seriesIdName: series.id,
            seriesId: seriesId,
            name: name,
            description: description,
            detailsProduct: details,
            newPrice: newPrice,
            promotionInfo: promotionInfo,
            specifications: specifications,
            rams: rams,
            memorys: memoryStorages,
            colors: colorsArray,
            createdAt: createdAt,
            linksImage: linksImage,
        });
        if (!product) {
            return res.status(404).send({
                status: 'failed',
            });
        }
        return res.status(201).send(product);
    } catch (ex) {
        return res.status(404).send({
            status: 'failed',
        });
    }
};

module.exports.get = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        return res.send(product);
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
            isDelete: false,
        });

        return res.send(products);
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
            isDelete: false,
        });

        return res.send(products);
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
            isDelete: false,
        });

        return res.send(products);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getBySeriesId = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.find({
            seriesId: id,
            isDelete: false,
        });

        return res.send(products);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const products = await Product.find({ isDelete: false });
        return res.send(products);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await Product.findOneAndUpdate(
            { id: id },
            {
                isDelete: true,
            },
        );
        return res.send(isDelete);
    } catch {
        return res.status(404).send({
            status: 'Delete failed',
        });
    }
};
