const ValueTypes = {
    Boolean: "Boolean",
    String: "String",
    Integer: "Integer",
};

const parametersList = {
    "character": { name: "character_key", type: ValueTypes.String },
    "emotion": { name: "emotion_key", type: ValueTypes.String },
    "location": { name: "background", type: ValueTypes.String },
    "text": { name: "dialog_text", type: ValueTypes.String },
    "thought": { name: "thoughts", type: ValueTypes.Boolean },
    "luck": { name: "lucky_level_change", type: ValueTypes.Integer },
    "luck_check": { name: "needed_lucky_level", type: ValueTypes.Integer },
    "love": { name: "needed_love_level", type: ValueTypes.Integer },
    "animation": { name: "animation", type: ValueTypes.String },
    "item": { name: "needed_prop", type: ValueTypes.String },
    "bubble": { name: "bubble", type: ValueTypes.String },
    "paid": { name: "paid", type: ValueTypes.Boolean },
    "outfit_set": { name: "outfit_bundle_key", type: ValueTypes.String },
    "chapter": { name: "chapter", type: ValueTypes.Integer },
    "clothes_id": { name: "clothes_id", type: ValueTypes.Integer },
    "item_name": { name: "frame_type", type: ValueTypes.String },
    "add": { name: "take", type: ValueTypes.Boolean },
    "timer": { name: "frame_type", type: ValueTypes.Boolean }
};

function tryGetParameterPair(key, rawValue) {
    key = key.toLowerCase();
    rawValue = rawValue.toLowerCase();
    if (parametersList.hasOwnProperty(key)) {
        const name = parametersList[key].name;
        let value;
        switch (parametersList[key].type) {
            case ValueTypes.Boolean:
                value = JSON.stringify(Boolean(rawValue));
                break;
            case ValueTypes.String:
                value = `"${rawValue}"`;
                break;
            case ValueTypes.Integer:
                value = parseInt(rawValue, 10);
                break;
            default:
                value = null;
                break;
        }
        return [name, value, true];
    }

    return ["", null, false];
}