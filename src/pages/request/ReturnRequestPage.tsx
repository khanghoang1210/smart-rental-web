import Navbar from '@/components/home/Navbar'
import ContractDetail from '@/components/return-request/ContractDetail'

const ReturnRequestPage = () => {
  return (
    <div>
        <Navbar/>
        <div className='container mx-auto p-4 w-[750px]'>
            <ContractDetail/>
        </div>
    </div>
  )
}

export default ReturnRequestPage