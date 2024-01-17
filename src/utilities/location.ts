export interface Location {
    id?: number;
    title: string;
    latitude: number;
    longitude: number;
    auid?: number;
    address?: string;
    lsp?: number;
    t?: string;
}

export function parseLocationFromAppleMapsUrl(url: string) : Location {

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = <any>{},
      match;

    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }

    const latlng = params.ll.split(',');

    const location = <Location>{
        auid: params.auid,
        address: params.address.replace(/%20/g, " "),
        title: params.q.replace(/%20/g, " "),
        latitude: latlng[0],
        longitude: latlng[1],
        lsp: params.lsp,
        t: params.t,
    }

    return location;
}