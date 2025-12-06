import db from "../config/db.js";
export async function FindAllProduct(filters = {}) {
  const conditions = [];
  const params = [];

  if (filters.name) {
    conditions.push("LOWER(name) LIKE ?");
    params.push(`%${String(filters.name).toLowerCase()}%`);
  }

  if (filters.category) {
    conditions.push("LOWER(category) LIKE ?");
    params.push(`%${String(filters.category).toLowerCase()}%`);
  }

  if (filters.minPrice !== undefined && filters.minPrice !== "") {
    conditions.push("CAST(price AS DECIMAL(10,2)) >= ?");
    params.push(Number(filters.minPrice));
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== "") {
    conditions.push("CAST(price AS DECIMAL(10,2)) <= ?");
    params.push(Number(filters.maxPrice));
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";
  const page = Math.max(1, Number(filters.page) || 1);
  const limit = Math.max(1, Number(filters.limit) || 10);
  const offset = (page - 1) * limit;

  if (filters.groupBy === "category") {
    const sql = `SELECT category, COUNT(*) as count, AVG(price) as avgPrice, MIN(price) as minPrice, MAX(price) as maxPrice FROM products ${whereClause} GROUP BY category ORDER BY count DESC LIMIT ?, ?`;
    const paramsWithLimit = params.slice();
    paramsWithLimit.push(offset, limit);

    const countSql = `SELECT COUNT(DISTINCT category) as total FROM products ${whereClause}`;
    const countParams = params.slice();

    const [products] = await db.execute(sql, paramsWithLimit);
    const [[{ total }]] = await db.execute(countSql, countParams);

    return { products, total, page, limit };
  }

  const sql = `SELECT * FROM products ${whereClause} LIMIT ?, ?`;
  const paramsWithLimit = params.slice();
  paramsWithLimit.push(offset, limit);

  const countSql = `SELECT COUNT(*) as total FROM products ${whereClause}`;
  const countParams = params.slice();

  const [products] = await db.execute(sql, paramsWithLimit);
  const [[{ total }]] = await db.execute(countSql, countParams);

  return { products, total, page, limit };
}

export async function FindProduct(id) {
  const [products] = await db.execute("SELECT * FROM products WHERE id=?", [
    id,
  ]);

  return products[0] || null;
}
export async function createProduct(product) {
  const [NewProduct] = await db.execute(
    "INSERT INTO products (name,price,stock,category) VALUES(?,?,?,?)",
    [product.name, product.price, product.stock, product.category]
  );

  return NewProduct.insertId;
}
export async function replaceProduct(id, product) {
  await db.execute(
    "UPDATE products SET name=?,price=?,stock=?,category=? WHERE id=?",
    [product.name, product.price, product.stock, product.category, id]
  );
}
export async function updateProduct(id, products) {
  const params = Object.keys(products)
    .map((key) => `${key}=?`)
    .join(", ");
  const _id = Object.values(products).concat(id);
  await db.execute(`UPDATE products SET ${params} WHERE id=?`, _id);
}

export async function removeProduct(id) {
  await db.execute("DELETE FROM products WHERE id=?", [id]);
}
