import {Indicator} from "./Indicator.js";

window.onload = () => {
    let fields = document.querySelectorAll("[type=password]");
    console.log(fields);
    if(fields !== []){
        for(let field of fields){
            let indicator = new Indicator(field);
            indicator.showIndicator();
        }
    }
}