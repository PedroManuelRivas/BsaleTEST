const express = require("express");
const { getProducts, getProduct } = require("./assets/querys");
const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/cart", (req, res) => {
  res.sendFile(__dirname + "/assets/cart.html");
});

app.get("/products", async (req, res) => {
  try {
    const { q } = req.query;
    // console.log({ q });
    let result;
    if (q) {
      result = await getProduct(q);
    } else {
      result = await getProducts();
    }
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
