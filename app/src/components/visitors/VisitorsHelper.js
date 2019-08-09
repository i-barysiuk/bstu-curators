import { 
    faThermometerEmpty,
    faThermometerQuarter,
    faThermometerHalf,
    faThermometerThreeQuarters,
    faThermometerFull
} from "@fortawesome/free-solid-svg-icons";

var not_respectful = 100;
var respectful = 200;
var all = 1000;
var percent = ((not_respectful+respectful*0.5)/all)*100;

class ThermChoose {
    color() {
        var ret = 'green';
        if (percent <= 100)
            ret = 'red';
        if (percent <= 66)
            ret = 'orange';
        if (percent <= 33)
            ret = 'green';
        return ret;
    }

    temp() {
        return (percent*4.4+36.6);
    }

    thermIcon() {
        var ret = faThermometerEmpty;
        if(percent <= 100)
            ret = faThermometerFull;
        if(percent <= 80)
            ret = faThermometerThreeQuarters;
        if(percent <= 60)
            ret = faThermometerHalf;
        if(percent <= 40)
            ret = faThermometerQuarter;
        if(percent <= 20)
            ret = faThermometerEmpty;
        return ret;
    }
}

export default ThermChoose;