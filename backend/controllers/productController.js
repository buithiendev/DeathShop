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
            sticker,
            promotionInfo,
            specifications,
            rams,
            memoryStorages,
            colors,
        } = req.body;

        let id = name.trim().toLowerCase().replaceAll(' ', '');

        if (rams) {
            id += `-${rams}`;
        }
        if (memoryStorages) {
            id += `-${memoryStorages}`;
        }
        const checkProduct = await Product.findOne({
            id: id,
            categoryId: categoryId,
            seriesId: seriesId,
            isDelete: false,
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
            sticker: sticker,
            promotionInfo: promotionInfo,
            specifications: specifications,
            rams: rams,
            memorys: memoryStorages,
            colors: JSON.parse(colors),
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
        })
            .populate({ path: 'categoryId', select: 'name' })
            .populate({ path: 'seriesId', select: 'name' })
            .exec();

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
            { _id: id },
            {
                isDelete: true,
            },
            { new: true },
        );
        return res.send(isDelete);
    } catch {
        return res.status(404).send({
            status: 'Delete failed',
        });
    }
};

module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const isChange = await Product.findOneAndUpdate(
            {
                _id: id,
            },
            {
                status: req.body.newStatus,
            },
            { new: true },
        );
        return res.send(isChange);
    } catch {
        return res.status(404).send({
            status: 'Delete failed',
        });
    }
};

module.exports.update = async (req, res) => {
    try {
        const idFind = req.params.id;
        const {
            id,
            name,
            categoryId,
            seriesId,
            description,
            details,
            sticker,
            newPrice,
            oldPrice,
            promotionInfo,
            specifications,
            rams,
            memoryStorages,
        } = req.body;

        const colors = JSON.parse(req.body?.colors);

        let newId = name.trim().toLowerCase().replaceAll(' ', '');

        if (rams) {
            newId += `-${rams}`;
        }
        if (memoryStorages) {
            newId += `-${memoryStorages}`;
        }
        const checkProduct = await Product.findOne({
            id: id,
            categoryId: categoryId,
            seriesId: seriesId,
            isDelete: false,
        });
        if (checkProduct && newId !== id) {
            return res.status(400).send({
                status: 'Product is already',
            });
        }
        const imagePreview = JSON.parse(req.body?.imagePreview);
        if (req.files) {
            req.files.map((file, index) => {
                if (file.filebaseUrl) imagePreview.push(file.filebaseUrl);
            });
        }

        const category = await Categories.findById(categoryId);
        const series = await Series.findById(seriesId);

        const isUpdate = await Product.findByIdAndUpdate(
            idFind,
            {
                id: newId,
                categoryId: categoryId,
                categoryIdName: category.id,
                seriesId: seriesId,
                seriesIdName: series.id,
                name: name,
                newPrice: newPrice,
                oldPrice: oldPrice,
                rams: rams,
                memorys: memoryStorages,
                colors: colors,
                linksImage: imagePreview,
                description: description,
                promotionInfo: promotionInfo,
                specifications: specifications,
                detailsProduct: details,
                sticker: sticker,
            },
            { new: true },
        );

        return res.send(isUpdate);
    } catch {
        return res.status(404).send({
            status: 'Update failed',
        });
    }
};

module.exports.getByName = async (req, res) => {
    try {
        const { name, id } = req.params;

        const response = await Product.find({
            id: { $ne: id },
            name: name,
            isDelete: false,
            status: true,
        });
        return res.send(response);
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};

module.exports.getProductWithColor = async (req, res) => {
    try {
        const idFind = req.params.id;
        const {
            _id,
            id,
            categoryId,
            seriesId,
            name,
            newPrice,
            rams,
            memorys,
            linksImage,
            colors,
        } = await Product.findById(idFind);
        const { color } = req.body;

        const colorSelect =
            colors.find((c) => c.nameColor === color.nameColor) || '';

        return res.send({
            _id,
            id,
            categoryId,
            seriesId,
            name,
            newPrice,
            rams,
            memorys,
            linksImage,
            colorSelect,
        });
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};
