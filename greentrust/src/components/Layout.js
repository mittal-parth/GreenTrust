import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className='bg-white w-full '>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}