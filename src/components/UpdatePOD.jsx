import { useState, useEffect } from "react"
import { client } from "../client"
import ReactDOM from 'react-dom'

const UpdatePOD = ({setOpenPOD, sendingEvent}) => {
    
    const [updateState, setUpdateState] = useState(false)
    const [id, setId] = useState(null)
    const [dataObject, setDataObject] = useState({})
    const [type, setType] = useState(null)

    const updateClickHandle = (event) => {
        event.preventDefault()
        setDataObject({
            'date': event.target[0].value,
            'order': parseInt(event.target[1].value),
            'refType':  event.target[2].value,
            'comments': event.target[3].value,
            'urlPhoto': event.target[4].value
        })
        setId(parseInt(event.target[1].value))
        setType((event.target[2].value == 'Remisión') ? ['sending', 'id_sending']: ['track', 'id_track'])
        setUpdateState(true)
    }

    useEffect(() => {
        updateState
        && 
        client.fetch(
            `*[_type == '${type[0]}' && ${type[1]} == ${id}]{
                'ref': _id,
                'count': count(*[_type == "pod"])
            }`
        ).then((data) => {console.log(data)
                        client.create(
                        {
                            _type: 'pod',
                            description:`${data[0].count + 1}_${dataObject['refType']}_${id}`,
                            id_pod:  data[0].count + 1,
                            id_reference: dataObject['order'],
                            reference_type: dataObject['refType'],
                            date: dataObject['date'],
                            photo_url: dataObject['urlPhoto'],
                            comments: dataObject['comments'],
                            ref_order: {
                                _ref: data[0].ref,
                                _type: "reference"
                            }
                        }
                    )}) 
        && setOpenPOD(false)
    }, [updateState])


    return ReactDOM.createPortal(
        <div className="modal__container">
            <form className='modal__content' onSubmit={updateClickHandle}>
                <div>
                    <p>Fecha</p>
                    <input name='date' type="date" />
                </div>
                <div>
                    <p>Número Referencia</p>
                    <input name='sending' type="number" defaultValue={sendingEvent.target.value}/>
                </div>
                <div>
                    <p>Tipo Referencia</p>
                    <input name='sending_ref' list="list"/>
                    <datalist id='list'>
                        <option value="Remisión"/>
                        <option value="Guía"/>
                    </datalist>
                </div>
                <div>
                    <p>Observaciones</p>
                    <textarea name="comments" rows="3" cols="20" />
                </div>
                <div>
                    <p>URL Foto</p>
                    <input name='photo' type="string" />
                </div>
                <div className='form__buttons'>
                    <button type='submit'>Actualizar</button>
                    <button type='button' onClick={()=>setOpenPOD(false)}>Cerrar</button>
                </div>
               

            </form>
        </div>,
        
        document.getElementById('modal')
      )
}

export {UpdatePOD}