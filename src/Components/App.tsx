import MainPage from "../pages/MainPage";
// import NotFound from "../pages/NotFound";
// import Card from "../pages/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SinglePizza from "../pages/singlePizza/SinglePizza";
import MainLayout from "../layouts/MainLayout";
import { lazy, Suspense } from "react";
const SinglePizza = lazy(() => import("../pages/singlePizza/SinglePizza"));
const Card = lazy(() => import("../pages/Card"));
const NotFound = lazy(() => import("../pages/NotFound"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/card" element={<Card />} />
            <Route path="/pizza/:id" element={<SinglePizza />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
