import Navbar from '@/components/home/Navbar'
import PostedRoom from '@/components/user/PostedRoom'

const PostedRoomPage = () => {
  return (
    <div className=" flex flex-col">
    <Navbar />
    
    <div >
      <PostedRoom />
    </div>
  </div>
  )
}

export default PostedRoomPage