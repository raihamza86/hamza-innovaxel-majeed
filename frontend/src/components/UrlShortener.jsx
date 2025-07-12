import React, { useState } from "react";
import axios from "axios";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url) {
      setError("URL is required");
      return;
    }
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/shorten", { url });
      setShortUrl(res.data.shortCode);
    } catch (err) {
      setError("Failed to shorten URL");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
        >
          Shorten URL
        </button>
        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">Short URL:</p>
            <a
              href={`http://localhost:5000/shorten/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              http://localhost:5000/shorten/{shortUrl}
            </a>
          </div>
        )}
        {error && <p className="text-red-500 mt-2 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default UrlShortener;
