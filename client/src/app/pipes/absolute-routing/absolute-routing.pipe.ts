import { Pipe, PipeTransform } from '@angular/core';
import * as routesModule from '../../constant/routes';

const routes: {[key: string]: any} = routesModule; 

@Pipe({
  name: 'absolutePath'
})

export class AbsoluteRoutingPipe implements PipeTransform {
  transform(route:any) {
    return routes[route as string].fullUrl;
  }
}
