import { stringify } from "wellknown";
import toGeoJSON from "./toGeoJSON";

declare var shp: any

const VALID_EXTENSIONS = ['zip', 'kml', 'shp', 'wkt'];

export function parseFileToWkt(file: File): Promise<string> {
  return new Promise((resolve, reject) => {

    if(!file)
      reject('Arquivo vazio');

    const extension: string = file.name.split('.').pop();

    if(!VALID_EXTENSIONS.includes(extension))
      reject(`Arquivos do tipo ${extension} não são reconhecidos.`);

    const reader: FileReader = new FileReader();
    reader.onload = (readEvent: ProgressEvent<FileReader>) => {
      if(extension === 'wkt') {
        resolve(readEvent.target.result.toString());
      } else if(extension === 'zip' || extension === 'shp') {
        shp(readEvent.target.result)
          .then(geojson => {
            resolve(stringify(geojson.features[0]));
        })
      } else {
        const geojson = toGeoJSON.kml(new DOMParser().parseFromString(readEvent.target.result.toString(), 'text/xml') );
        resolve(stringify(geojson.features[0]));
      }
    }    

    if(extension === 'wkt' || extension === 'kml') {
      reader.readAsText(file);
    } else if(extension === 'zip' || 'shp') {
      reader.readAsArrayBuffer(file);
    }    
  });
}