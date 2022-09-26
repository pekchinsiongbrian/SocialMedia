import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'absoluteUrl'
})
export class AbsoluteUrlPipe implements PipeTransform {

    constructor() {}

    transform(value: string) {
        if (value.length > 8 && 
            (value.substring(0,8) != "https://" && value.substring(0,7) != "http://")) {
            return "//" + value;
        }
        return value;
    }
}