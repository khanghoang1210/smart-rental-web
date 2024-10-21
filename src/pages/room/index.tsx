import Navbar from "@/components/home/Navbar"
import PostRoomForm from "@/components/room/PostRoomForm"
import Footer from "@/ui/Footer"

const Room = () => {
  return (
    <div>
        <Navbar/>
        <PostRoomForm/>
        {/* <PostRoomFlow/> */}
        <Footer/>
    </div>
  )
}

export default Room