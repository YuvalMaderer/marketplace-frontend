import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_BASE_URL } from "../constants/url.constant";
import { Pencil, Receipt, Trash2 } from "lucide-react";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(`${PRODUCT_BASE_URL}/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    getProduct();
  }, [productId]);

  async function handleDelete() {
    try {
      await axios.delete(`${PRODUCT_BASE_URL}/${productId}`);
      navigate("/product");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {product ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-2">{product.category}</p>
          <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>
          <div className="flex items-center mb-4">
            <Receipt color="green" size={30} className="mr-2" />
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
          <div className="flex gap-4">
            <button
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
              onClick={handleDelete}
            >
              <Trash2 color="red" />
            </button>
            <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
              <Pencil color="orange" />
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetailsPage;
