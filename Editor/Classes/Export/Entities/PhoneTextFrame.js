class PhoneTextFrame extends Converter {
    constructor() {
        super("phone-text");
    }

    convertToJSON(index, csvFrame, jsonGenerator) {
        let characterKey = null;
        let fields = [];

        csvFrame.formsList.forEach(field => {
            if (field.key.input === "character") {
                characterKey = field.value.input;
            }
            fields.push(field);
        });
        const values = this.simpleValueKeySerialization(fields);
        return `"frame_type": "${this.frameType}",` + (values.length != 0 ? `${values.substring(0, values.length - 1)}` : "") + (characterKey !== null ? `,"frame_settings": {"frame_type": "${characterKey}"}` : '');
    }
}