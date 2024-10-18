import Navbar from "@/components/home/Navbar"
import PostRoomFlow from "@/components/room/PostRoomForm"
import Footer from "@/ui/Footer"

const Room = () => {
  return (
    <div>
        <Navbar/>
        {/* <RoomDetail/> */}
        <PostRoomFlow/>
        <Footer/>
    </div>
  )
}

export default Room