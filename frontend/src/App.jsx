import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
const App = () => {
  return (
    <div>
      <NavBar />
      <div className="container bg-yellow-400 mx-auto">Welcome to Proshop</div>
      
      <Outlet />
      <Footer />
      </div>
  )
}

export default App