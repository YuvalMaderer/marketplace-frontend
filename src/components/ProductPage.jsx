import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Slider from "rc-slider"; // Importing Slider directly
import "rc-slider/assets/index.css"; // Importing the CSS
import { PRODUCT_BASE_URL } from "../constants/url.constant";
import DynamicButtons from "./DynamicButtons";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [numberOfPages, setNumberOfPages] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const page = searchParams.get("page") || 1;
      if (page < 1) searchParams.set("page", 1);
      setSearchParams(searchParams);

      const inStock = searchParams.get("inStock") === "true";

      const options = {
        params: {
          name: searchParams.get("name"),
          category: searchParams.get("category"),
          quantity: searchParams.get("quantity"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          page: page,
          inStock: inStock ? true : undefined, // Only include inStock if true
        },
      };
      const response = await axios.get(PRODUCT_BASE_URL, options);
      const pageCounter = await axios.get(`${PRODUCT_BASE_URL}/count`, options);
      setNumberOfPages(Math.ceil(pageCounter.data.count / 8));
      setProducts(response.data);
    }
    getProducts();
  }, [searchParams]);

  function handleFilterChange(ev) {
    const inputName = ev.target.name;
    const inputValue =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;

    // Set the new parameter value
    searchParams.set(inputName, inputValue);

    // Remove the 'inStock' parameter if unchecked
    if (inputName === "inStock" && !inputValue) {
      searchParams.delete("inStock");
    }

    // Always set page to 1 when any filter changes
    searchParams.set("page", 1);

    // Update the search params
    setSearchParams(searchParams);
  }

  function handlePagination(ev) {
    const value = ev;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  function handlePriceChange(value) {
    searchParams.set("minPrice", value[0]);
    searchParams.set("maxPrice", value[1]);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handleNewProductChange(ev) {
    const { name, value } = ev.target;
    setNewProduct({ ...newProduct, [name]: value });
  }

  async function handleNewProductSubmit(ev) {
    ev.preventDefault();
    try {
      await axios.post(PRODUCT_BASE_URL, newProduct);
      setNewProduct({
        name: "",
        category: "",
        price: "",
        quantity: "",
      });
      // Fetch updated product list to include the new product
      const page = searchParams.get("page") || 1;
      const inStock = searchParams.get("inStock") === "true";
      const options = {
        params: {
          name: searchParams.get("name"),
          category: searchParams.get("category"),
          quantity: searchParams.get("quantity"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          page: page,
          inStock: inStock ? true : undefined, // Only include inStock if true
        },
      };
      const response = await axios.get(PRODUCT_BASE_URL, options);
      setProducts(response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap gap-4 mb-8 ml-2">
          <div className="flex flex-col flex-grow">
            <label htmlFor="name" className="font-bold mb-1">
              Name
            </label>
            <input
              className="outline outline-sky-500 p-2 rounded"
              id="name"
              name="name"
              type="text"
              value={searchParams.get("name") || ""}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="category" className="font-bold mb-1">
              Category
            </label>
            <input
              className="outline outline-sky-500 p-2 rounded"
              id="category"
              name="category"
              type="text"
              value={searchParams.get("category") || ""}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="font-bold mb-1">Price Range</label>
            <Slider
              range
              min={0}
              max={1500}
              step={10}
              defaultValue={[
                Number(searchParams.get("minPrice")) || 0,
                Number(searchParams.get("maxPrice")) || 1500,
              ]}
              onAfterChange={handlePriceChange}
              trackStyle={[{ backgroundColor: "skyblue" }]}
              handleStyle={[
                { borderColor: "skyblue" },
                { borderColor: "skyblue" },
              ]}
              railStyle={{ backgroundColor: "lightgray" }}
            />
            <div className="flex justify-between mt-2">
              <span>${searchParams.get("minPrice") || 0}</span>
              <span>${searchParams.get("maxPrice") || 1500}</span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="outline outline-sky-500 mr-2"
              id="inStock"
              name="inStock"
              type="checkbox"
              checked={searchParams.get("inStock") === "true" || false}
              onChange={handleFilterChange}
            />
            <label htmlFor="inStock" className="font-bold">
              In Stock
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="relative">
              <Link to={`${product._id}`}>
                <div
                  className={`bg-white p-4 rounded-lg shadow-lg ${
                    product.quantity === 0 ? "bg-gray-200" : ""
                  }`}
                >
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-gray-600">Category: {product.category}</p>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
                {product.quantity === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-red-600 font-bold text-3xl transform rotate-45">
                    <span className="bg-gray-200 bg-opacity-75 p-4">
                      Not in Stock
                    </span>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <DynamicButtons
            numberOfButtons={numberOfPages}
            onButtonClick={handlePagination}
          />
        </div>

        {/* Create Product Card */}
        <div className="flex justify-center items-center">
          <div className="relative col-span-full flex justify-center w-[30rem] my-16">
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center w-full">
              <h4 className="font-bold text-lg text-center text-sky-500 mb-4">
                Create New Product
              </h4>
              <form onSubmit={handleNewProductSubmit} className="w-full">
                <div className="mb-2">
                  <label
                    htmlFor="newProductName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="newProductName"
                    className="outline outline-sky-500 p-2 rounded w-full"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="newProductCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="newProductCategory"
                    className="outline outline-sky-500 p-2 rounded w-full"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="newProductPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="newProductPrice"
                    className="outline outline-sky-500 p-2 rounded w-full"
                    value={newProduct.price}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="newProductQuantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="newProductQuantity"
                    className="outline outline-sky-500 p-2 rounded w-full"
                    value={newProduct.quantity}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-700 w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
