const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const { syncCategoryRecipeCounts } = require("../utils/updateCategoryRecipeCount");
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

// Sync utility
router.get("/sync-counts", async (req, res) => {
  try {
    await syncCategoryRecipeCounts();
    res.json({ msg: "Recipe counts synced successfully" });
  } catch (err) {
    res.status(500).json({ error: { message: "Sync failed", detail: err.message } });
  }
});

// Public routes
router.get("/", categoryController.getAllCategories);
router.get("/with-recipes", categoryController.getAllCategoriesWithRecipes); // 🆕 חסר!
router.get("/by-code/:code", categoryController.getCategoryByCode);
router.get("/by-name/:name", categoryController.getCategoryByName); // 🆕 חסר!

// Admin only routes
router.post("/", verifyToken, isAdmin, categoryController.addCategory);

module.exports = router;