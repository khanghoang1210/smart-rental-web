import { Footer } from "antd/es/layout/layout"
import Hero from "../../components/home/Hero"
import Navbar from "../../components/home/Navbar"


const Home = () => {

  return (
    <div>
        <Navbar/>
        <Hero />
        <Footer/>
    </div>
  )
}

export default Home