import Navbar from '@/components/home/Navbar'
import FavoriteRoom from '@/components/user/FavoriteRoom'

const FavoriteRoomPage = () => {
  return (
    <div className=" flex flex-col">
    <Navbar />
    
    <div >
      <FavoriteRoom />
    </div>
  </div>
  )
}

export default FavoriteRoomPage