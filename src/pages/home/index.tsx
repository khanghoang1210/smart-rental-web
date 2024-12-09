import Footer from "@/ui/Footer"
import Hero from "../../components/home/Hero"
import Navbar from "../../components/home/Navbar"
import { useState } from "react";


const Home = () => {
  const [searchText, setSearchText] = useState<string>("");
  return (
    <div>
        <Navbar/>
        <Hero />
        <Footer/>
    </div>
  )
}

export default Home