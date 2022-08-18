const express = require('express');
const {Contenedor} = require('./contenedor');
const PORT = 8080;

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));


app.get('/productos', async (req, res) => {
    try {
        const c = new Contenedor('productos.txt', ['title', 'price', 'thumbnail'], 'title');
        const allProducts = await c.getAll();
        res.json(allProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send("Houston, we have a problem");
    }
});

app.get('/productoRandom', async (req, res) => {
  try {
    const c = new Contenedor('productos.txt', ['title', 'price', 'thumbnail'], 'title');
    const allProducts = await c.getAll();
    const allIds = allProducts.map(item => item.id);
    if (allIds.length === 0) {
        res.send("Ups! parece que nos hemos quedado sin productos!");
    } else {
      const index = Math.floor(Math.random() * allIds.length);
        const oneProduct = await c.getById(allIds[index]);
        res.json(oneProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Houston, we have a problem");
  }
});