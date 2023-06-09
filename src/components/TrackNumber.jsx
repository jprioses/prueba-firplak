import { useState, useEffect } from "react"
import { client } from "../client.js"
import { Dashboard } from './Dashboard'
import '../styles/trackNumber.css'

function TrackNumber({trackNumber}){

  const [trackData, setTrackData] = useState(null)
  
  useEffect(() => {
    trackNumber &&
    client.fetch(
      `*[_type == "track_link" && id_track == ${trackNumber}]{
        'id_sending': ref_sending->id_sending,
        'delivery_date': ref_sending->delivery_date,
        'shipment_date': ref_sending->shipment_date,
        'client': *[_type == "sending_link" &&  ref_sending._ref == ^.ref_sending._ref][0].ref_line->ref_destiny->ref_client->client_name,        
        'city': *[_type == "sending_link" &&  ref_sending._ref == ^.ref_sending._ref][0].ref_line->ref_destiny->city,
        'direction': *[_type == "sending_link" &&  ref_sending._ref == ^.ref_sending._ref][0].ref_line->ref_destiny->direction,                      
        'orderLines': *[_type == "sending_link" &&  ref_sending._ref == ^.ref_sending._ref]
                    {'id_line': ref_line->id_line,
                    'id_product':ref_line->ref_product->id_product,
                    'product':  ref_line->ref_product->product_name,
                    'quantity': ref_line->quantity,
                    'unity':  ref_line->ref_product->unity},
        'states': *[_type == "track_state" &&  ref_sending._ref == ^.ref_sending._ref] | order(date asc){
                      'state': state,
                      'date': date}
    }`
  ).then((data) => setTrackData(data))
  .catch(() => setTrackData([]))
  },[trackNumber])

  
  return (
    <div className="track__container" >

        {trackData && trackData.length > 0  
        && <Dashboard trackData={trackData} trackNumber={trackNumber}/>}

        {(!trackData || trackData.length == 0) 
         && <h2>Guia no encontrada</h2>}
   </div>
  )
}

export {TrackNumber}