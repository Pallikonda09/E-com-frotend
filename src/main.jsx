



// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css"; // Make sure Tailwind styles are here
// import { CartProvider } from "./context/CartContext"; // ✅ NEW
// import { WishlistProvider } from "./context/WishlistContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//    < WishlistProvider>
//     <CartProvider> 
//       <App/>
//     </CartProvider>
//     </WishlistProvider>
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 

import { Provider } from "react-redux"; 
import store from "./redux/store";      

import { CartProvider } from "./context/CartContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 
     
        <CartProvider>
          <App />
        </CartProvider>
    </Provider>
  </React.StrictMode>
);


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { CartProvider } from "./context/CartContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <CartProvider>
//           <App />
//         </CartProvider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

