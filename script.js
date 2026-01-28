const apiUrl = "https://api.escuelajs.co/api/v1/products";
const tableBody = document.getElementById("productTableBody");

// Fetch dữ liệu từ API
fetch(apiUrl)
  .then((response) => response.json()) // JSON → Object
  .then((products) => {
    renderTable(products);
  })
  .catch((error) => console.error("Error:", error));

// Render table
function renderTable(products) {
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${slugify(product.title)}</td>
            <td class="price">$${product.price}</td>
            <td>${product.category.name}</td>
            <td>${product.description}</td>
        `;

    tableBody.appendChild(row);
  });
}

// Hàm tạo slug từ title
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
