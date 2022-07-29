import Header from "./Header";

import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="*" element={<NotFound />}/>
              {/* <NotFound /> */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
