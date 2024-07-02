import React, { useEffect, useState } from "react";
import { useUserContext } from "../components/UserProvider";
import api from "../services/api.service";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function ProfilePage() {
  const { user } = useUserContext();
  const userId = user?._id || "";
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);

  console.log(products[0]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/auth/login/${user._id}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  useEffect(() => {
    const getUserProducts = async () => {
      try {
        const response = await api.get(`/product/user-product/${userId}`);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch user products:", error);
        setProducts([]);
      }
    };

    if (userId) {
      getUserProducts();
    }
  }, [userId]);

  return (
    <>
      {user ? (
        <>
          <div>
            <div className="flex justify-center items-center pt-20">
              <h1 className="text-4xl">
                Hello {userInfo?.firstName} {userInfo?.lastName}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products[0]?.map((product) => (
              <div key={product?._id} className="relative">
                <Link to={`${product?._id}`}>
                  <div
                    className={`bg-white p-4 rounded-lg shadow-lg ${
                      product?.quantity === 0 ? "bg-gray-200" : ""
                    }`}
                  >
                    <h4 className="font-bold text-lg mb-2">{product?.name}</h4>
                    <p className="text-gray-600">
                      Category: {product?.categories}
                    </p>
                    <p className="text-gray-600">Price: ${product?.price}</p>
                    <p className="text-gray-600">
                      Quantity: {product?.quantity}
                    </p>
                  </div>
                  {product?.quantity === 0 && (
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
        </>
      ) : (
        <div>
          <div className="flex justify-center items-center pt-20 space-y-10 flex-col">
            <h1 className="text-4xl">You must login before seeing this page</h1>
            <Button variant="contained" component={Link} to="../Login">
              Login
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
