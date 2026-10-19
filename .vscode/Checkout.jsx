import { useState } from "react";
import "./Checkout.css";

function getItems(cart) {
  const items = Array.isArray(cart) ? cart : Object.values(cart || {});
  const grouped = {};

  items.forEach((item) => {
    const product = item.product || item;
    const id = product.id ?? product.name;
    if (id == null) return;

    const quantity = Number(item.quantity) || 1;

    if (!grouped[id]) {
      grouped[id] = { product, quantity: 0 };
    }

    grouped[id].quantity += quantity;
  });

  return Object.values(grouped);
}

export default function Checkout({ cart, subtotal, onBack }) {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [order, setOrder] = useState(null);
  const items = getItems(cart);

  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + Number(item.product.price || 0) * item.quantity,
    0
  );

  const safeSubtotal =
    typeof subtotal === "number" && Number.isFinite(subtotal)
      ? subtotal
      : calculatedSubtotal;

  const tax = Math.round(safeSubtotal * 0.08 * 100) / 100;
  const total = Math.round((safeSubtotal + tax) * 100) / 100;

  function updateField(event) {
    const { name, value } = event.target;
    setCustomer((previous) => ({ ...previous, [name]: value }));
  }

  function placeDemoOrder(event) {
    event.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setOrder({
      number: "ANX-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: customer.name,
      total,
    });
  }

  if (order) {
    return (
      <main className="checkout-page">
        <section className="checkout-panel">
          <h1>Thank you, {order.name}!</h1>
          <p>Your demo order has been created.</p>
          <p>
            <strong>Order number:</strong> {order.number}
          </p>
          <p>
            <strong>Demo total:</strong> ${order.total.toFixed(2)}
          </p>
          <p className="demo-note">
            This is a test order only. No payment was taken and no order was
            sent to a server.
          </p>
          <button type="button" onClick={onBack}>
            Back to Store
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-panel" onSubmit={placeDemoOrder}>
          <h2>Shipping information</h2>

          <label>
            Full name
            <input
              name="name"
              value={customer.name}
              onChange={updateField}
              autoComplete="name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={updateField}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Street address
            <input
              name="address"
              value={customer.address}
              onChange={updateField}
              autoComplete="street-address"
              required
            />
          </label>

          <label>
            City
            <input
              name="city"
              value={customer.city}
              onChange={updateField}
              autoComplete="address-level2"
              required
            />
          </label>

          <div className="checkout-fields">
            <label>
              State
              <input
                name="state"
                value={customer.state}
                onChange={updateField}
                autoComplete="address-level1"
                required
              />
            </label>

            <label>
              ZIP code
              <input
                name="zip"
                value={customer.zip}
                onChange={updateField}
                autoComplete="postal-code"
                required
              />
            </label>
          </div>

          <p className="demo-note">
            Demo checkout only — this form does not process payments.
          </p>

          <button type="submit">Place Demo Order</button>
          <button className="secondary-button" type="button" onClick={onBack}>
            Return to Store
          </button>
        </form>

        <aside className="checkout-panel">
          <h2>Your order</h2>

          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map(({ product, quantity }, index) => (
              <div className="checkout-item" key={product.id ?? index}>
                <span>
                  {product.name} × {quantity}
                </span>
                <span>
                  ${(Number(product.price || 0) * quantity).toFixed(2)}
                </span>
              </div>
            ))
          )}

          <hr />
          <p>Subtotal: ${safeSubtotal.toFixed(2)}</p>
          <p>Estimated tax (8%): ${tax.toFixed(2)}</p>
          <h3>Total: ${total.toFixed(2)}</h3>
        </aside>
      </div>
    </main>
  );
}