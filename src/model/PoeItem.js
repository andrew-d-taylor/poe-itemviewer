
class PoeItem {

    constructor(json) {
        this.substance = json;
    }

    get category() {
        return this.substance.category;
    }

    get name() {
        return this.substance.name;
    }

    get typeLine() {
        return this.substance.typeLine;
    }

    get text() {
        return this.substance.text;
    }

    get id() {
        return this.substance.id;
    }

    get explicitMods() {
        return this.substance.explicitMods;
    }

    get flavourText() {
        return this.substance.flavourText;
    }

    get icon() {
        return this.substance.icon;
    }

    get properties() {
        return this.substance.properties;
    }

    get ilvl() {
        return this.substance.ilvl;
    }

    get note() {
        return this.normalizeNote(this.substance.note);
    }

    get currencyIcon() {

    }

    normalizeNote(note) {
        if (note) {
            if (note.indexOf("~") > -1) {
                note = note.substring(note.indexOf(" "), note.length);
            }
        }
        return note;
    }

}

export default PoeItem;