import Navbar from './navbar'

export default function Layout({ children }) {
  return (
    <div className='bg-white w-full overflow-hidden h-screen'>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}