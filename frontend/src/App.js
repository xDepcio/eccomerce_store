import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route, useParams, useLocation} from 'react-router-dom'
import LoginForm from './components/Acount/LoginForm';
import UserPage from './components/Acount/UserPage';
import MainPage from './components/MainPage';
import Navbar from './components/Navigation/Navbar';
import { restoreUser } from './store/session';
import SubCategories from './components/Search-Landing-Pages/SubCategories'
import FinalCategories from './components/Search-Landing-Pages/FinalCategories'
import MainCategories from './components/Search-Landing-Pages/MainCategories';
import { getCategories, loadCart, setCartLength } from './store/shop';
import CategoryItemsPage from './components/Search-Landing-Pages/CategoryItemsPage';
import ItemPage from './components/Item/ItemPage';
import Footer from './components/Footer/Footer';
import { handleAddToCart } from './utils';
import Cart from './components/Cart/Cart';
import Orders from './components/Acount/AccountMenus/Orders';
import Security from './components/Acount/AccountMenus/Security';
import Addresses from './components/Acount/AccountMenus/Addresses';
import SingleOrderPage from './components/Acount/AccountMenus/SingleOrderPage';
import PaymentSucces from './components/PayementResultPages/PaymentSucces';


function App() {
  const url = useLocation()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => {
        dispatch(getCategories()).then(() => setIsLoaded(true))
      })
    dispatch(loadCart())
    // dispatch(setCartLength(handleAddToCart()))
  }, [])

  // console.log('path', url)
  return isLoaded && (
    <>
    {url.pathname !== '/login' && (
      <Navbar />
    )}
    <Routes>
      <Route exact path='/' element={<MainPage />}/>
      <Route exact path='/login' element={<LoginForm />}/>
      <Route exact path='/account' element={<UserPage />}>
        {/* <Route index element={<UserPage />} /> */}
        <Route path='orders'>
          <Route index element={<Orders />} />
          <Route path=':id' element={<SingleOrderPage />} />
        </Route>
        <Route path='security' element={<Security />} />
        <Route path='address' element={<Addresses />} />
      </Route>
      <Route exact path='/kategorie' element={<MainCategories />} />
      <Route exact path='/kategorie/:mainCategories' element={<SubCategories />} />
      <Route exact path='/kategorie/:mainCategories/:subCategories' element={<FinalCategories />} />
      <Route exact path='/kategorie/:mainCategories/:subCategories/:finalCategory' element={<CategoryItemsPage />} />
      <Route exact path='/produkty/:itemId' element={<ItemPage />} />
      <Route exact path='/koszyk/*' element={<Cart />} />
      <Route exact path='/payment/success' element={<PaymentSucces />} />

    </Routes>
    <Footer />
    </>
  );
}

export default App;
