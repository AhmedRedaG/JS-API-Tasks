async function calcPrices(products) {
  if (!products || typeof products !== "object") {
    throw new Error("Invalid products input");
  }

  const promises = Object.entries(products).map(([productId, productCount]) =>
    price(productId, productCount)
  );
  return Promise.all(promises).then((prices) =>
    prices.reduce((a, b) => a + b, 0)
  );
}

async function price(id, count) {
  try {
    let res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    let data = await res.json();
    return data.price * count;
  } catch (err) {
    throw new Error(`Failed to fetch price for product ${id}: ${err.message}`);
  }
}

// ( id : count )
const myProducts = {
  1: 3,
  3: 5,
  4: 4,
};

calcPrices(myProducts)
  .then((res) => {
    console.log(`Total prices is: ${res.toFixed(2)}$`);
  })
  .catch((err) => {
    console.error(err.message);
  });
