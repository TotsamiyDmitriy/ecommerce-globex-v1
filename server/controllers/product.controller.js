import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(errorHandler(500));
  }
};

export const getAuthorProducts = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const product = await Product.find({ authorRef: req.params.id });
      res.status(200).json(product);
    } catch (error) {
      next(errorHandler(500));
    }
  } else {
    return next(errorHandler(401, 'You can only view your own product'));
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      next(errorHandler(404, 'Product not found!'));
    }

    res.status(200).json(product);
  } catch (error) {
    next(errorHandler(500));
  }
};

export const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler(404, 'Product not found!'));
  }

  if (product.authorRef.toString() !== req.user.id) {
    return next(errorHandler(401, 'You can edit only your own products!'));
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json(product);
  } catch (error) {
    next(errorHandler(500));
  }
};

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(errorHandler(404, 'Product not found!'));
  }
  if (req.user.id !== product.authorRef.toString()) {
    return next(errorHandler(401, 'You can only delete your own products!'));
  }
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(errorHandler(500));
  }
};

export const getAllProducts = async (req, res, next) => {
  const category = req.params.id;

  const sizes = req.query.sizes;
  const offers = req.query.offers;
  const brandName = req.query.brandName;
  const colors = req.query.colors;

  const minPrice = req.query.min;
  const maxPrice = req.query.max;

  const searchQuery = req.query.search ? new RegExp(req.query.search, 'i') : null;
  const sort = req.query.sort;

  try {
    let query = {};
    let sortOptionQuery = {};

    if (category !== 'undefined') {
      query.category = category;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (sizes) {
      query.sizes = { $in: sizes };
    }

    if (offers) {
      query.offers = { $in: offers };
    }

    if (brandName) {
      query.brandName = { $in: brandName };
    }

    if (colors) {
      query.colors = { $in: colors };
    }

    if (searchQuery) {
      const searchCondition = {
        $or: [{ name: searchQuery }, { brandName: searchQuery }, { soldBy: searchQuery }],
      };
      query = { $and: [query, searchCondition] };
    }

    switch (sort) {
      case 'newest':
        sortOptionQuery = { createdAt: -1 };
        break;
      case 'oldest':
        sortOptionQuery = { createdAt: 1 };
        break;
      case 'lowest':
        sortOptionQuery = { price: 1 };
        break;
      case 'highest':
        sortOptionQuery = { price: -1 };
        break;
      case 'toprated':
        sortOptionQuery = { rating: -1 };
        break;
      case 'lessrated':
        sortOptionQuery = { rating: 1 };
        break;
      default:
        sortOptionQuery = { createdAt: -1 };
    }

    const product = await Product.find(query).sort(sortOptionQuery);
    if (product.length > 0) {
      return res.status(200).json(product);
    } else {
      next(errorHandler(404, 'product with filters not found'));
    }
  } catch (error) {
    next(errorHandler(500));
  }
};

export const filtersProducts = async (req, res, next) => {
  const category = req.params.id;

  const filters = {};

  const patternBuilder = (category, filter) => {
    const pattern = [
      { $unwind: `$${filter}` },
      {
        $group: {
          _id: `$${filter}`,
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
        },
      },
      { $sort: { count: -1, _id: 1 } },
    ];

    if (category !== 'undefined') {
      pattern.unshift({ $match: { category } });
    }

    return pattern;
  };

  filters.brandName = await Product.aggregate(patternBuilder(category, 'brandName'));
  filters.colors = await Product.aggregate(patternBuilder(category, 'colors'));
  filters.offers = await Product.aggregate(patternBuilder(category, 'offers'));
  filters.sizes = await Product.aggregate(patternBuilder(category, 'sizes'));

  const priceRange = await Product.aggregate([
    {
      $facet: {
        min: [{ $sort: { price: 1 } }, { $limit: 1 }],
        max: [{ $sort: { price: -1 } }, { $limit: 1 }],
      },
    },
    { $project: { minMax: { $concatArrays: ['$min.price', '$max.price'] } } },
  ]);

  res.status(200).json({ filters, priceRange: priceRange[0].minMax });
};
