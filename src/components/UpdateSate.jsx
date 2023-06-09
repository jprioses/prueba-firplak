import ReactDOM from 'react-dom'
import '../styles/updateSate.css'
import { useEffect, useState } from 'react'
import { client } from '../client'

const UpdateSate = ({setOpenState, sendingEvent}) => {

    
    const [updateState, setUpdateState] = useState(false)
    const [id, setId] = useState(null)
    const [dataObject, setDataObject] = useState({})

    const updateClickHandle = (event) => {
        event.preventDefault()
        setDataObject({
            'date': event.target[0].value,
            'sending': parseInt(event.target[1].value),
            'state':  event.target[2].value,
            'comments': event.target[3].value
        })
        setId(parseInt(event.target[1].value))
        setUpdateState(true)
    }

    useEffect(() => {
        updateState
        && 
        client.fetch(
            `*[_type == "sending" && id_sending == ${id}]{
                'ref': _id,
                'count': count(*[_type == "track_state"])
            }`
        ).then((data) => 
                        client.create(
                        {
                            _type: 'track_state',
                            description: `${data[0].count + 1}_${id}`,
                            id_state: data[0].count + 1,
                            id_reference: dataObject['sending'],
                            reference_type: 'remisión',
                            date: dataObject['date'],
                            state: dataObject['state'],
                            comments: dataObject['comments'],
                            ref_sending: {
                                _ref: data[0].ref,
                                _type: "reference"
                            }
                        }
                    )) 
        && setOpenState(false)
    }, [updateState])


    return ReactDOM.createPortal(
        <div className="modal__container">
            <form className='modal__content' onSubmit={updateClickHandle}>
                <div>
                    <p>Fecha</p>
                    <input name='date' type="date" />
                </div>
                <div>
                    <p>Remisión</p>
                    <input name='sending' type="number" defaultValue={sendingEvent.target.value}/>
                </div>
                <div>
                    <p>Estado</p>
                    <input name='state' list='list'/>
                    <datalist id='list'>
                        <option value="En bodega"/>
                        <option value="Despachado"/>
                        <option value="Entregado"/>
                        <option value="Novedad"/>
                    </datalist>
                </div>
                <div>
                    <p>Observaciones</p>
                    <textarea name="comments" rows="3" cols="20" />
                </div>
                <div className='form__buttons'>
                    <button type='submit'>Actualizar</button>
                    <button type='button' onClick={()=>setOpenState(false)}>Cerrar</button>
                </div>
               

            </form>
        </div>,
        
        document.getElementById('modal')
      )
}

export {UpdateSate}