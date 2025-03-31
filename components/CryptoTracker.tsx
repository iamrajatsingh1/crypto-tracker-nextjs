/* eslint-disable @next/next/no-img-element */
"use client";

import { CURRENCIES_LIST, GET_COINGECKO_API_URL } from "@/utils/constants";
import { useState, useEffect } from "react";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
}

export default function CryptoTracker() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [currency, setCurrency] = useState("usd");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null); // Reset error before making a new request
    fetch(GET_COINGECKO_API_URL(currency))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cryptocurrency data");
        return res.json();
      })
      .then((data) => {
        setCryptos(data);
        setError(null); // Clear error if successful
      })
      .catch((err) => {
        console.error("Error fetching crypto data:", err);
        setError("Failed to load cryptocurrency data. Please try again.");
      });
  }, [currency]);

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crypto Tracker</h1>
     
     {/* Error Message */}
     {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search cryptocurrency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />

      {/* Currency Selector */}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-2 mb-4 rounded-md"
      >
        {CURRENCIES_LIST.map((curr) => (
          <option key={curr} value={curr}>
            {curr.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Crypto List */}
      <ul className="border p-2 rounded-md bg-gray-50">
        {filteredCryptos.map((crypto) => (
          <li
            key={crypto.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-200 flex items-center"
            onClick={() => setSelectedCrypto(crypto)}
          >
            <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
            {crypto.name} ({crypto.symbol.toUpperCase()}) -{" "}
            {crypto.current_price} {currency.toUpperCase()}
          </li>
        ))}
      </ul>

      {/* Selected Crypto Details */}
      {selectedCrypto && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow">
          <h2 className="text-xl font-semibold">{selectedCrypto.name}</h2>
          <img
            src={selectedCrypto.image}
            alt={selectedCrypto.name}
            className="w-12 h-12 my-2"
          />
          <p>
            <strong>Symbol:</strong> {selectedCrypto.symbol.toUpperCase()}
          </p>
          <p>
            <strong>Price:</strong> {selectedCrypto.current_price}{" "}
            {currency.toUpperCase()}
          </p>
          <p>
            <strong>Market Cap:</strong> {selectedCrypto.market_cap.toLocaleString()}
          </p>
          <button
            onClick={() => setSelectedCrypto(null)}
            className="mt-2 p-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
