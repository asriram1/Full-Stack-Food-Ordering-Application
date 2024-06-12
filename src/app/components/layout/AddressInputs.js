import React from "react";

export default function AddressInputs({
  addressProps,
  setAdressProps,
  disabled = false,
}) {
  const { phone, streetAddress, postal, city, state } = addressProps;
  return (
    <div>
      <label>Phone</label>
      <input
        type="tel"
        placeholder="Phone Number"
        disabled={disabled}
        value={phone || ""}
        onChange={(ev) => setAdressProps("phone", ev.target.value)}
      />
      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Address"
        disabled={disabled}
        value={streetAddress || ""}
        onChange={(ev) => setAdressProps("streetAddress", ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            disabled={disabled}
            value={postal || ""}
            onChange={(ev) => setAdressProps("postal", ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            disabled={disabled}
            value={city || ""}
            onChange={(ev) => setAdressProps("city", ev.target.value)}
          />
        </div>
      </div>
      <label>State</label>
      <input
        type="text"
        placeholder="State"
        disabled={disabled}
        value={state || ""}
        onChange={(ev) => setAdressProps("state", ev.target.value)}
      />
    </div>
  );
}
