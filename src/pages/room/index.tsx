import Navbar from "@/components/home/Navbar"
import PostRoomForm from "@/components/room/PostRoomForm"
// import PostRoomForm from "@/components/room/PostRoomForm"
import RoomDetail from "@/components/room/RoomDetail"
import Footer from "@/ui/Footer"

const Room = () => {
  return (
    <div>
        <Navbar/>
        <PostRoomForm/>
        
        <Footer/>
    </div>
  )
}

export default Room