const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.productIdCounter = 1;
    this.readFromFile();
  }

  readFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  writeToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //validamos TODOS los campos antes de continuar... 
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son requeridos.");
      return;
    }


    //Validamos el codigo de producto no exista antes de continuar...
    if (this.getProductByCode(code)) {
      console.log("El código del producto ya existe.");
      return;
    }

    const product = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    this.writeToFile();
    console.log("Producto agregado con éxito.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getProductByCode(code) {
    return this.products.some((product) => product.code === code);
  }


}

// Example usage
const productManager = new ProductManager("archivo1.json");

try {
  productManager.addProduct("Producto 1", "Descripción 1", 10, "imagen1.jpg", "PC001", 100);
  productManager.addProduct("Producto 2", "Descripción 2", 20, "imagen2.jpg", "PC002", 200);
  
} catch (error) {
  console.error(error.message);
}

console.log(productManager.getProducts());

const product = productManager.getProductById(1);
const product2 = productManager.getProductById(5);
