function CartItem({ item, onRemove, onUpdateQuantity }) {
	return (
	  <div className="cart-item">
		<img src={item.image} alt={item.title} />
		<div className="item-details">
		  <h4>{item.title}</h4>
		  <p>${item.price}</p>
		  <div className="quantity-controls">
			<button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
			  -
			</button>
			<span>{item.quantity}</span>
			<button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
			  +
			</button>
		  </div>
		  <button onClick={() => onRemove(item.id)} className="remove-btn">
			Remove
		  </button>
		</div>
	  </div>
	);
  }
  
  export default CartItem;