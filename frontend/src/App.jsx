import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css' 

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App