import { createRoutesFromElements, createBrowserRouter,  Route, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Admin } from './components/Admin'
import { Dashboard } from './components/Dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path='admin' element={<Admin/>}/>
      <Route path='dashboard' element={<Dashboard/>}/> 
    </Route>
  )
)

function App() {
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
