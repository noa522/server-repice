const Joi = require("joi");

const layerSchema = Joi.object({
  description: Joi.string().min(1).max(200).required(),
  ingredients: Joi.array().items(Joi.string().min(1)).min(1).required()
});

const recipeSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  ingredients: Joi.array().items(Joi.string().min(1)).min(1).required(),
  steps: Joi.array().items(Joi.string().min(1)).min(1).required(),
  preparationTime: Joi.number().min(1).max(1440).required(), // עד 24 שעות
  difficulty: Joi.number().min(1).max(5).required(),
  imageUrl: Joi.string().uri().optional(),
  isPrivate: Joi.boolean().optional(),
  category: Joi.string().min(2).max(50).required(),
  layers: Joi.array().items(layerSchema).optional(),
  tags: Joi.array().items(Joi.string().min(1).max(30)).optional()
});

const recipeUpdateSchema = recipeSchema.fork(
  ['title', 'description', 'ingredients', 'steps', 'preparationTime', 'difficulty', 'category'],
  (schema) => schema.optional()
);

module.exports = {
  recipeSchema,
  recipeUpdateSchema
};