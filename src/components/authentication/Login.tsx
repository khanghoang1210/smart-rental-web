
const Login = () => {
  return<form className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[540px] h-[740px] flex items-center justify-center bg-[#FFF]'>
  <h3 className='text-xl font-medium text-white'>Sign in to CodeFast</h3>
  <div>
      <label htmlFor='userName' className='text-sm font-medium block mb-2 text-gray-300'>
          Your User Name
      </label>
      <input
          type='userName'
          name='userName'
          id='userName'
          className='
  border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  bg-gray-600 border-gray-500 placeholder-gray-400 text-white
'
          placeholder='johnwick'
      />
  </div>
  <div>
      <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
          Your Password
      </label>
      <input
          type='password'
          name='password'
          id='password'
          className='
  border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  bg-gray-600 border-gray-500 placeholder-gray-400 text-white
'
          placeholder='*******'
      />
  </div>

  <button
      type='submit'
      className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
      text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
  '
  >
      Login
  </button>
  <button className='flex w-full justify-end'>
      <a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'>
          Forgot Password?
      </a>
  </button>
  <div className='text-sm font-medium text-gray-300'>
      Not Registered?{" "}
      <a href='#' className='text-blue-700 hover:underline'>
          Create account
      </a>
  </div>
</form>
}

export default Login