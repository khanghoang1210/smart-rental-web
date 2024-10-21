import Navbar from "@/components/home/Navbar"
import RoomDetail from "@/components/room/RoomDetail"
import Footer from "@/ui/Footer"

const Room = () => {
  return (
    <div>
        <Navbar/>
        <RoomDetail/>
        {/* <PostRoomFlow/> */}
        <Footer/>
    </div>
  )
}

export default Room