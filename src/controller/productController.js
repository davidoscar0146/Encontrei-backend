const productRepository = require("../repositories/productRepository");

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;
      const product = await productRepository.create(data);
      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar produto" });
    }
  },

  async getAll(req, res) {
    try {
      const products = await productRepository.findAll();
      return res.json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productRepository.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar produto" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const product = await productRepository.update(id, data);
      return res.json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar produto" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await productRepository.remove(id);
      return res.json({ message: "Produto removido com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao remover produto" });
    }
  },
};