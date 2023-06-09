import {useRef } from "react"

const Home = ({setTrackNumber, setDashboard}) => {

  const trackNumberRef = useRef(null)

  function trackClick(){
    setTrackNumber(trackNumberRef.current.value)
    setDashboard(true)
  }

  function trackKey(event){
    if (event.key==='Enter') {
      setTrackNumber(trackNumberRef.current.value)
      setDashboard(true)
    }
  }

  return (
    <div className="home__container">
      <div className="content__home">
        <h1>FirTrack App</h1>
        <h2>Bienvenido</h2>
        <p>Esta App te permite hacer seguimiento a los pedidos y actualizar su estado</p>
      </div>
      <form className="form__home" onSubmit={() => trackClick()} onKeyUp={trackKey}>
        <input  ref={trackNumberRef} 
                type="number" 
                name="trackNumber" 
                placeholder='Introduzca un numero de guía' 
                required />
        <button type="submit">RASTREAR GUÍA</button>
      </form>
        
     
    </div>
  )
}


export {Home}