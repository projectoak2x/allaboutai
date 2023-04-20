import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";
import { useState, useEffect } from "react";

const mayaStyle = {
  "backgroundColor": "#75eea5",
  "borderRadius": "5px",
  "width": "100%",
  "border": "none",
  "color": "#112432",
  "cursor": "pointer",
  "display": "inline-block",
  "fontSize": "15px",
  "fontWeight": "700",
  "lineHeight": "48px",
  "padding": "0 28px",
  "textAlign": "center",
  "textDecoration": "none",
  "textShadow": "none",
  "WebkitTransition": "background-color 0.2s ease-in-out",
  "MozTransition": "background-color 0.2s ease-in-out",
  "MsTransition": "background-color 0.2s ease-in-out",
  "OTransition": "background-color 0.2s ease-in-out",
  "transition": "background-color 0.2s ease-in-out",
  "margin-bottom": "14px",
}


const Checkout = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  const [productList, setProductList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let products = localStorage.getItem('productList');
    if(products !== null && products != "") {
      products = JSON.parse(products);
      let priceTotal = 0;
      products.forEach(product => {
        priceTotal += product.price;
      });
      setTotalPrice(priceTotal);
      setProductList(products)
    }
  },[]);
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <div>
              <div class="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 class="text-2xl font-bold mb-4">Your Order Summary</h2>
                <ul class="divide-y divide-gray-200">
                  {
                    productList.map((product, index) => {
                      return (
                        <li class="py-4 flex items-center justify-between" key={index}>
                          <div class="flex items-center">
                            <img class="h-8 w-8 mr-4" src="https://via.placeholder.com/50" alt="Product Image" />
                            <div class="flex flex-col">
                              <span class="font-medium">{product.name}</span>
                              <span class="text-gray-500 text-sm">{product.description}</span>
                            </div>
                          </div>
                          <span class="text-gray-600 font-medium">{product.price} ₱</span>
                        </li>
                      )
                    })
                  }
                  {
                    productList.length < 1 && (
                      <Link href={"/pricing"}>
                        <li class="py-4 flex items-center justify-between">
                          Go to price list
                        </li>
                    </Link>
                    )
                  }
                  {/* <li class="py-4 flex items-center justify-between">
                    <div class="flex items-center">
                      <img class="h-8 w-8 mr-4" src="https://via.placeholder.com/50" alt="Product Image" />
                      <div class="flex flex-col">
                        <span class="font-medium">Product Name</span>
                        <span class="text-gray-500 text-sm">Product Description</span>
                      </div>
                    </div>
                    <span class="text-gray-600 font-medium">$99.00</span>
                  </li>
                  <li class="py-4 flex items-center justify-between">
                    <div class="flex items-center">
                      <img class="h-8 w-8 mr-4" src="https://via.placeholder.com/50" alt="Product Image" />
                      <div class="flex flex-col">
                        <span class="font-medium">Product Name</span>
                        <span class="text-gray-500 text-sm">Product Description</span>
                      </div>
                    </div>
                    <span class="text-gray-600 font-medium">$59.00</span>
                  </li> */}
                </ul>
                <div class="py-4 border-t border-gray-200">
                  <div class="flex justify-between pt-2">
                    <span class="text-gray-600 font-medium">Total</span>
                    <span class="text-gray-600 font-medium">{totalPrice} ₱</span>
                  </div>
                </div>
  {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Checkout</button> */}
</div>
            </div>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            <div style={mayaStyle} className="hover:brightness-90">Maya</div>
            <PayPalScriptProvider>
              <PayPalButtons/>
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
