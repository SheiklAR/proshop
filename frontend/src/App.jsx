import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import ProductCard from "./components/ProductCard"
import HomeScreen from "./screens/HomeScreen"
const App = () => {
  return (
    <div>
      <NavBar />
      <div className="container bg-yellow-400 mx-auto">Welcome to Proshop</div>
      
      <HomeScreen />
      <Footer />
      </div>
  )
}

export default App