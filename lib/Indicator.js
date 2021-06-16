export class Indicator {
    constructor(element, options = {}) {
        this.element = element;
        this.indicator = "";
        this.mask = "";
        this.uppercase = options.hasOwnProperty("uppercase") ? options.uppercase : true;
        this.lowercase = options.hasOwnProperty("lowercase") ? options.lowercase : true;
        this.numeric = options.hasOwnProperty("numeric") ? options.numeric : true;
        this.special = options.hasOwnProperty("special") ? options.special : true;
        this.minLength = options.hasOwnProperty("minLength") ? options.minLength : 12;
        this.response = {};
        try {
            if (typeof this.uppercase !== "boolean") {
                throw "uppercase option should be boolean";
            }
            if (typeof this.lowercase !== "boolean") {
                throw "lowercase option should be boolean";
            }
            if (typeof this.numeric !== "boolean") {
                throw "numeric option should be boolean";
            }
            if (typeof this.special !== "boolean") {
                throw "special option should be boolean";
            }
            if (typeof this.minLength !== "number") {
                throw "minLength option should be a number";
            }
        } catch (e) {
            /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
            console.error(e);
        }
        this.element.addEventListener("input", this.calculate.bind(this));
    }

    showIndicator() {
        this.indicator = document.createElement("div");
        this.indicator.style.height = "5px";
        this.indicator.style.backgroundImage = this.getCssValuePrefix() + "linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) 10%, rgba(255,158,0,1) 50%, rgba(0,255,25,1) 90%, rgba(0,255,25,1) 100%)";
        this.indicator.style.width = this.element.offsetWidth + "px";
        this.mask = document.createElement("div");
        this.mask.style.height = "5px";
        this.mask.style.backgroundColor = "#ffffff";
        this.mask.style.marginLeft = "auto";
        this.indicator.appendChild(this.mask);
        this.element.insertAdjacentElement('afterend', this.indicator);
    }
    getCssValuePrefix() {
        var rtrnVal = ''; //default to standard syntax
        var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

        // Create a temporary DOM object for testing
        var dom = document.createElement('div');

        for (var i = 0; i < prefixes.length; i++) {
            // Attempt to set the style
            dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

            // Detect if the style was successfully set
            if (dom.style.background) {
                rtrnVal = prefixes[i];
            }
        }

        dom = null;
        // delete dom;

        return rtrnVal;
    }
    calculate() {
        // On initialise le score
        let score = 0;

        // On récupère ce qui a été saisi
        let mdp = this.element.value;

        // On vérifie qu'on a une minuscule
        if (/[a-z]/.test(mdp)) {
            score++;
        }

        // On vérifie qu'on a une majuscule
        if (/[A-Z]/.test(mdp)) {
            score++;
        }

        // On vérifie qu'on a un chiffre
        if (/[0-9]/.test(mdp)) {
            score++;
        } 

        // On vérifie qu'on a un caractère special
        if (/[$@/\]!%*\\#&]/.test(mdp)) {
            score++;
        }

        // On vérifie la longueur
        if (mdp.length >= 12) {
            score++;
        } 

        this.mask.style.width = (100 - score * 20) + "%";

    }
}