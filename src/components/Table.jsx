function Table({products = []}){
  return(
    <table>
      <thead>
        <tr>
          <th>Produit</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product)=> (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>{product.price} DH</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;