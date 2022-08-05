import { Outlet } from "react-router-dom"
import Header from "../Components/Header"

function MainLayout() {
  return (
    <div className="wrapper">
        <Header/>
        <div className="content">
            <div className="container">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default MainLayout