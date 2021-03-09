const productList = document.getElementById("productList");
let productos = [];
let productsCart = localStorage.getItem("productsCart")
  ? JSON.parse(localStorage.getItem("productsCart"))
  : [];

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get("q") || "";
  document.getElementById("searchInput").value = q;
  productos = await getProducts(q);
  if (window.location.pathname === "/") {
    render_Products(productos);
  } else if (window.location.pathname === "/cart") {
    viewCart(productos);
  }
};

const getProducts = async (q) => {
  const res = await fetch(`/products?q=${q}`);
  const productos = await res.json();
  return productos;
};

const render_Products = (productos) => {
  productos.forEach((p) => {
    productList.innerHTML += `
    <div class="col-3 pt-4">
      <div class="card product" >
        <img class="card-img-top" src="${p.url_image}" alt="Imagen no encontrada">
          <div class="card-body">
            <h5 class="card-title"></h5>
              <h6 class="card-title text-center">${p.name}</h6>
          </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item text-center">$ ${p.price}</li>
        <button class="btn btn-primary" onclick="addToCart(${p.id})">Agregar al Carrito</button>
        </ul>
    </div>
    `;
  });
};

const addToCart = (productID) => {
  const index = productsCart.findIndex((p) => p.id === productID);
  if (index < 0) {
    productsCart.push({ id: productID, qty: 1 });
  } else {
    productsCart[index] = { id: productID, qty: productsCart[index].qty + 1 };
  }
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
};

const viewCart = (productos) => {
  cartList.innerHTML = "";
  const cart = productsCart.map((e) => ({
    ...productos.find((p) => p.id === e.id),
    qty: e.qty,
  }));
  cart.forEach((p) => {
    cartList.innerHTML += `
    <div class="col-3 pt-4">
      <div class="card product" >
        <img class="card-img-top" src="${p.url_image}" alt="Imagen no encontrada">
          <div class="card-body">
            <h5 class="card-title"></h5>
           <h6 class="card-title text-center">Cantidad: ${p.qty}</h6>
              <h6 class="card-title text-center">${p.name}</h6>
          </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item text-center">$ ${p.price}</li>
       <button class="btn btn-danger" onclick="removeFromCart(${p.id})">Eliminar Item</button>
        </ul>
    </div>
    `;
  });
};

// Eliminar producto de carrito (localStorage)
const removeFromCart = (productID) => {
  productsCart = productsCart.filter((e) => e.id !== productID);
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
  viewCart(productos);
};
