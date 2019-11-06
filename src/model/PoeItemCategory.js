class PoeItemCategory {

    constructor(substance) {
        this.substance = substance;
    }

    get label() {
        return this.substance.label;
    }
}

export default PoeItemCategory;