import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));
const Register = lazy(() => import("./Register"));
const Header = lazy(() => import("./Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const RegisterComp = lazy(() => import("./RegisterComp"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const History = lazy(() => import("./user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const Password = lazy(() => import("./user/Password"));
const Wishlist = lazy(() => import("./user/Wishlist"));
const Admindashboard = lazy(() => import("./admin/Admindashboard"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const CategoryCreate = lazy(() => import("./admin/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./admin/category/CategoryUpdate"));
const SubCreate = lazy(() => import("./admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./admin/product/ProductUpdate"));
const Product = lazy(() => import("./admin/product/Product"));
const CategoryHome = lazy(() => import("./admin/category/CategoryHome"));
const SubHome = lazy(() => import("./admin/sub/SubHome"));
const Shop = lazy(() => import("./components/home/Shop"));
const Cart = lazy(() => import("./admin/product/Cart"));
const Checkout = lazy(() => import("./admin/product/Checkout"));
const CreateCoupanPage = lazy(() => import("./admin/coupan/CreateCoupanPage"));
const Payment = lazy(() => import("./Payment"));

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state

  //!this gets info from the local db and stores to Redux
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          ~ React Redux EC ~ <LoadingOutlined />
        </div>
      }
    >
      <Router>
        <div className="App">
          <header className="App-header">
            <Header />

            <SideDrawer />

            <ToastContainer />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/register/complete" exact component={RegisterComp} />
              <Route path="/forgot/password" exact component={ForgotPassword} />
              <UserRoute path="/user/history" exact component={History} />
              <UserRoute path="/user/password" exact component={Password} />
              <UserRoute path="/user/wishlist" exact component={Wishlist} />
              <AdminRoute
                path="/admin/dashboard"
                exact
                component={Admindashboard}
              />
              <AdminRoute
                path="/admin/category"
                exact
                component={CategoryCreate}
              />
              <AdminRoute
                path="/admin/category/:slug"
                exact
                component={CategoryUpdate}
              />

              <AdminRoute path="/admin/sub" exact component={SubCreate} />
              <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />
              <AdminRoute
                path="/admin/product"
                exact
                component={ProductCreate}
              />
              <AdminRoute
                path="/admin/products"
                exact
                component={AllProducts}
              />
              <AdminRoute
                path="/admin/product/:slug"
                exact
                component={ProductUpdate}
              />

              <Route path="/product/:slug" component={Product} />
              <Route path="/category/:slug" component={CategoryHome} />
              <Route path="/sub/:slug" component={SubHome} />
              <Route path="/shop" component={Shop} />
              <Route path="/cart" component={Cart} />
              <UserRoute path="/checkout" exact component={Checkout} />
              <AdminRoute
                path="/admin/coupan"
                exact
                component={CreateCoupanPage}
              />
              <UserRoute path="/payment" exact component={Payment} />

              {/*TO PROTECT THE ROUTE*/}
            </Switch>
          </header>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
