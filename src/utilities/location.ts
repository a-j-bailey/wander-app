export interface LatLng {
    latitude: number;
    longitude: number;
}

export interface Location {
    id: number;
    address: string;
    name: string;
    coordinates: LatLng;
    lsp: number;
    t: string;
}

export function parseLocationFromAppleMapsUrl(url: string) : Location {

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = <any>{},
      match;

    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }

    const latlng = params.ll.split(',');

    const LatLng = <LatLng>{
        latitude: latlng[0],
        longitude: latlng[1],
    };

    const location = <Location>{
        id: params.auid,
        address: params.address,
        name: params.q,
        coordinates: LatLng,
        lsp: params.lsp,
        t: params.t,
    }

    return location;
}