import { UpdatePOD } from "./UpdatePOD"
import {UpdateSate} from "./UpdateSate"
import { useState } from "react"

const Dashboard = ({trackNumber, trackData }) => {

  const [sendingEvent, setSendingEvent] = useState(null)
  const [openState, setOpenState] = useState(false)
  const [openPOD, setOpenPOD] = useState(false)

  return (
    <div>
      <div className="track__info">
            <div className="track__id">
              <p>Guia:</p><p>{trackNumber}</p>
            </div>
            <div className="track__client">
              <p>Cliente:</p><p>{trackData[0].client}</p>
            </div>
            <div className="track__city">
              <p>Ciudad:</p><p>{trackData[0].city}</p>
            </div>
            <div className="track__direction">
              <p>Dirección:</p><p>{trackData[0].direction}</p>
            </div>
            <div className="track__shipment">
              <p>Fecha envío:</p><p>{trackData[0].shipment_date}</p>
            </div>
            <div className="track__delivery">
              <p>Fecha Entrega:</p><p>{trackData[0].delivery_date}</p>
            </div>
        </div>

        
        {trackData.map((data) => (
         
          <div className="sendings__cards" key={data.id_sending}>
            <div className="sending__card">

              <div className="id__sending">
                <p>Remision:</p>
                <p>{data.id_sending}</p>
              </div>

              <div className="sendings__state">
                {data.states.map((state, index) => (
                  <div className="state" key={index}>
                    <div className={(state.state == 'En bodega') ? 'gray_state':(state.state == 'Despachado') ? 'blue_state': (state.state == 'Entregado') ? 'green_state': 'red_state'}></div>
                    <p>{state.state}</p>
                    <p>{state.date}</p>
                  </div>

                ))}
                
              </div>

              <div className="buttons">
                <button  value={data.id_sending} onClick={(event)=>{setSendingEvent(event);setOpenState(true)}}>Actualizar</button>
                <button  value={data.id_sending} onClick={(event)=>{setSendingEvent(event);setOpenPOD(true)}}>PODs</button>
            </div>

            </div>

            <div className="lines__cards">
            {data.orderLines.map((orderLine) => (
              
                <div className="lines__card" key={orderLine.id_line}>

                  <div className="id__line">
                    <p>Linea:</p><p>{orderLine.id_line}</p>
                  </div>
                  <div className="id_product">
                    <p>ID Prod: </p><p>{orderLine.id_product}</p>
                  </div>
                  <div className="product">
                    <p>Prod: </p><p>{orderLine.product}</p>
                  </div>
                  <div className="quantity">
                    <p>Cant: </p><p>{orderLine.quantity}</p>
                  </div>
                  <div className="unity">
                    <p>Und: </p><p>{orderLine.unity}</p>
                  </div>
                </div>


            


            ))}

            </div>

           

          </div>

        ))}

      {openState && <UpdateSate setOpenState={setOpenState} sendingEvent={sendingEvent}/>}
      {openPOD && <UpdatePOD setOpenPOD={setOpenPOD} sendingEvent={sendingEvent}/>}

    </div>
  )
}

export {Dashboard}