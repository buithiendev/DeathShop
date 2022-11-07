const Product = require('../model/productModal');

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

        console.log();
        const createdAt = Date.now();
        const linksImage = [];
        req.files.map((file, index) => {
            if (file.filebaseUrl) linksImage.push(file.filebaseUrl);
        });

        const product = await Product.create({
            categoryId: categoryId,
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

module.exports.get = async (req,res) => {
    try {   
        const id = req.params.id;
        const product = await Product.findById(id);

        res.send(product);
    } catch {
        return res.status(401).send({
            status: 'failed',
        });
    }
}