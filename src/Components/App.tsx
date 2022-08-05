import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import Card from "../pages/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePizza from "../pages/singlePizza/SinglePizza";
import MainLayout from "../layouts/MainLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/card" element={<Card />} />
          <Route path="/pizza/:id" element={<SinglePizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;