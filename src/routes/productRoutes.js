// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/", productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.get("/store/:storeId", productController.getByStore);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
