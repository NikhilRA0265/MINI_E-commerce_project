export default function CartItem({ item, removeFromCart, updateQty }) {
  return (
    <div className="cart-item">
      <div>
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
      </div>
      <div className="cart-actions">
        <input type="number" min="1" value={item.qty} onChange={(e)=>updateQty(item.id, Number(e.target.value))} />
        <button onClick={()=>removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
}
