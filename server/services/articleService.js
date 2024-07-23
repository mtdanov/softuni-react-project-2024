const Article = require('../models/Article');

exports.create = (title, description, image) => Article.create(title, description, file)


exports.getAll = () => Article.find();
exports.getOne = (articleId) => Article.findById(articleId)
exports.getOneDetailed = (articleId) => this.getOne(articleId).populate('owner')  