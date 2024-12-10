
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'; 

function App(){
  return (
    <>
     <div className='bg-white min-h-screen flex flex-col'>
      <Navbar/>
      <dev className= 'flex-grow'>
        <Outlet/>
      </dev>
       
     <footer className='mt-auto'>Footer</footer>
     </div>
    
    </>
  )
}

export default App
