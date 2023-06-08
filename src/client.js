import { SanityClient } from "@sanity/client";

export default SanityClient({
    projectId: 'sl9wi3dd',
    dataset: 'production',
    apiVersion: '2023-06-06',
    token: import.meta.env.REACT_APP_FIRTRACK_TOKEN,
    useCdn: true
})