import { createClient} from "@sanity/client";

export const client = createClient({
    projectId: 'sl9wi3dd',
    dataset: 'production',
    apiVersion: '2023-06-06',
    token: import.meta.env.VITE_FIRTRACK_TOKEN,
    useCdn: true
})

export function getTrackInfo(track){


    
    let response
    client.fetch(
        `*[_type == "track_link" && id_track == '${track}']{
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
                        'unity':  ref_line->ref_product->unity}
        }`
    ).then(data => response=data)
    return response
}