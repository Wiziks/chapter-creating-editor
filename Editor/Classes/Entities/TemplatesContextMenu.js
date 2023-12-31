let lastMousePosition;
const contextMenu = document.getElementById('template-context-menu')
let reservedArrow;
const divList = [];

function invokeContextMenu() {
    if (state !== State.NONE && state !== State.ARROW_MOVING) return;

    lastMousePosition = mousePosition

    contextMenu.style.display = 'block'
    contextMenu.style.left = mousePosition.x + "px"
    contextMenu.style.top = mousePosition.y + "px"

    contextMenu.style.transformOrigin = '0% 0%';
    contextMenu.style.transform = 'scale(' + 1 / scale + ')';

    reservedArrow = state === State.ARROW_MOVING ? arrowToMove : null;
    arrowToMove = null;

    setTimeout(() => state = State.TEMPLATE_SELECTING, 10);
}

document.addEventListener('DOMContentLoaded', () => {
    const workplace = document.getElementById('workplace')
    contextMenu.style.display = "none"
    contextMenu.style.overflowY = 'auto';

    contextMenu.addEventListener('wheel', function (e) {
        if ((contextMenu.scrollHeight - contextMenu.scrollTop <= contextMenu.clientHeight && e.deltaY > 0) || (contextMenu.scrollTop === 0 && e.deltaY < 0)) {
            e.preventDefault();
        }
    }, { passive: false });

    const list = [...frameTypes.keys()]
    list.forEach(type => {
        const div = document.createElement('div');
        div.textContent = type
        contextMenu.appendChild(div)
        scrollable.push(div);
        divList.push(div);

        div.addEventListener('click', (e) => {
            contextMenu.style.display = 'none'
            if (type == 'Dialog') dialogTemplate()
            else if (type == 'Text') textTemplate()
            else if (type == 'Customize') customizeTemplate()
            else if (type == 'Animation') animationTemplate()
            else if (type == 'Item') itemTemplate()
            else if (type == 'Love') loveTemplate()
            else if (type == 'Option') optionTemplate()
            else if (type == 'Item-check') itemCheckTemplate()
            else if (type == 'Choice') choiceTemplate()
            else if (type == 'Choice-by-character') choiceByCharacterTemplate()
            else if (type == 'Choice-by-choice') choiceByChoiceTemplate()
            else if (type == 'Bubble') bubbleTemplate()
        })
    })

    document.addEventListener('click', (e) => {
        if (state !== State.TEMPLATE_SELECTING) return;

        if (reservedArrow != null) {
            reservedArrow.deleteArrow();
            reservedArrow = null;
        }

        contextMenu.style.display = 'none';

        state = State.NONE;
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (e.button === 2) {
            if (e.target === workplace) {
                invokeContextMenu();
            }
        }
    });

    function createBlock(position = lastMousePosition) {
        let adjustedPosition = new Vector2(
            Math.round(position.x / cellSize.x) * cellSize.x,
            Math.round(position.y / cellSize.y) * cellSize.y
        );
        const id = blocks.length == 0 ? 0 : blocks[blocks.length - 1].id + 1
        let block = new Block(adjustedPosition, blockSize, workplace)

        if (reservedArrow !== null) {
            reservedArrow.setTo(block.topPoint, block)
            block.arrowsList.push(reservedArrow)
            reservedArrow.fromBlock.arrowsList.push(reservedArrow)
            arrows.push(reservedArrow)
            reservedArrow.placeArrow()
            reservedArrow = null;
        }

        blocks.push(block)

        state = State.NONE;

        return block
    }

    function dialogTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Dialog"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "character"
        keyValuePairForm.valueForm.list = fieldTypes["character"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "location"
        keyValuePairForm1.valueForm.list = fieldTypes["location"]
        block.formsList.push(keyValuePairForm1)

        const keyValuePairForm2 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm2.keyForm.input.textContent = "text"
        keyValuePairForm2.valueForm.list = fieldTypes["text"]
        block.formsList.push(keyValuePairForm2)

        const keyValuePairForm3 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm3.keyForm.input.textContent = "emotion"
        keyValuePairForm3.valueForm.list = fieldTypes["emotion"]
        block.formsList.push(keyValuePairForm3)
    }

    function textTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Text"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "location"
        keyValuePairForm.valueForm.list = fieldTypes["location"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "text"
        keyValuePairForm1.valueForm.list = fieldTypes["text"]
        block.formsList.push(keyValuePairForm1)
    }

    function bubbleTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Bubble"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "text"
        keyValuePairForm.valueForm.list = fieldTypes["text"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "bubble-type"
        keyValuePairForm1.valueForm.list = fieldTypes["bubble-type"]
        block.formsList.push(keyValuePairForm1)
    }

    function customizeTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Customize"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "character"
        keyValuePairForm.valueForm.list = fieldTypes["character"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "location"
        keyValuePairForm1.valueForm.list = fieldTypes["location"]
        block.formsList.push(keyValuePairForm1)

        const keyValuePairForm2 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm2.keyForm.input.textContent = "outfit-set"
        keyValuePairForm2.valueForm.list = fieldTypes["outfit-set"]
        block.formsList.push(keyValuePairForm2)
    }

    function animationTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Animation"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "animation"
        keyValuePairForm.valueForm.list = fieldTypes["animation"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "location"
        keyValuePairForm1.valueForm.list = fieldTypes["location"]
        block.formsList.push(keyValuePairForm1)
    }

    function itemTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Item"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "item-name"
        keyValuePairForm.valueForm.list = fieldTypes["item-name"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "add"
        keyValuePairForm1.valueForm.list = fieldTypes["add"]
        block.formsList.push(keyValuePairForm1)
    }

    function loveTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Love"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "character"
        keyValuePairForm.valueForm.list = fieldTypes["character"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "add"
        keyValuePairForm1.valueForm.list = fieldTypes["add"]
        block.formsList.push(keyValuePairForm1)
    }

    function optionTemplate(position = lastMousePosition) {
        const block = createBlock(position)

        block.header.input.textContent = "Option"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "text"
        keyValuePairForm.valueForm.list = fieldTypes["text"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "premium"
        keyValuePairForm1.valueForm.list = fieldTypes["premium"]
        block.formsList.push(keyValuePairForm1)

        return block
    }

    function itemCheckTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Item-check"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "item-name"
        keyValuePairForm.valueForm.list = fieldTypes["item-name"]
        block.formsList.push(keyValuePairForm)

        const block0 = createBlock(new Vector2(lastMousePosition.x - 250, lastMousePosition.y + 500))
        const block1 = createBlock(new Vector2(lastMousePosition.x + 250, lastMousePosition.y + 500))

        const arrow0 = new Arrow(workplace, block)
        arrow0.form.input.textContent = "0"
        arrow0.setFrom(block.bottomPoint)
        arrow0.setTo(block0.topPoint, block0)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)
        arrows.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.form.input.textContent = "1"
        arrow1.setFrom(block.bottomPoint)
        arrow1.setTo(block1.topPoint, block1)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)
        arrows.push(arrow1)
    }

    function choiceTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Choice"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "text"
        keyValuePairForm.valueForm.list = fieldTypes["text"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "location"
        keyValuePairForm1.valueForm.list = fieldTypes["location"]
        block.formsList.push(keyValuePairForm1)

        const block0 = optionTemplate(new Vector2(lastMousePosition.x - 500, lastMousePosition.y + 500))
        const block1 = optionTemplate(new Vector2(lastMousePosition.x, lastMousePosition.y + 500))
        const block2 = optionTemplate(new Vector2(lastMousePosition.x + 500, lastMousePosition.y + 500))

        const arrow0 = new Arrow(workplace, block)
        arrow0.setFrom(block.bottomPoint)
        arrow0.setTo(block0.topPoint, block0)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)
        arrows.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.setFrom(block.bottomPoint)
        arrow1.setTo(block1.topPoint, block1)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)
        arrows.push(arrow1)

        const arrow2 = new Arrow(workplace, block)
        arrow2.setFrom(block.bottomPoint)
        arrow2.setTo(block2.topPoint, block2)
        arrow2.placeArrow()
        block2.arrowsList.push(arrow2)
        block.arrowsList.push(arrow2)
        arrows.push(arrow2)
    }

    function choiceByCharacterTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Choice-by-character"

        const keyValuePairForm = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.textContent = "character"
        keyValuePairForm.valueForm.list = fieldTypes["character"]
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block, Object.keys(fieldTypes), block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.textContent = "outfit-set"
        keyValuePairForm1.valueForm.list = fieldTypes["outfit-set"]
        block.formsList.push(keyValuePairForm1)

        const block0 = createBlock(new Vector2(lastMousePosition.x - 500, lastMousePosition.y + 500))
        const block1 = createBlock(new Vector2(lastMousePosition.x, lastMousePosition.y + 500))
        const block2 = createBlock(new Vector2(lastMousePosition.x + 500, lastMousePosition.y + 500))

        const arrow0 = new Arrow(workplace, block)
        arrow0.form.input.textContent = "0"
        arrow0.setFrom(block.bottomPoint)
        arrow0.setTo(block0.topPoint, block0)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)
        arrows.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.form.input.textContent = "clothes-id1"
        arrow1.setFrom(block.bottomPoint)
        arrow1.setTo(block1.topPoint, block1)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)
        arrows.push(arrow1)
        const arrow2 = new Arrow(workplace, block)
        arrow2.form.input.textContent = "clothes-id2"
        arrow2.setFrom(block.bottomPoint)
        arrow2.setTo(block2.topPoint, block2)
        arrow2.placeArrow()
        block2.arrowsList.push(arrow2)
        block.arrowsList.push(arrow2)
        arrows.push(arrow2)
    }

    function choiceByChoiceTemplate() {
        const block = createBlock()

        block.header.input.textContent = "Choice-by-choice"

        const block0 = createBlock(new Vector2(lastMousePosition.x - 500, lastMousePosition.y + 500))
        const block1 = createBlock(new Vector2(lastMousePosition.x, lastMousePosition.y + 500))
        const block2 = createBlock(new Vector2(lastMousePosition.x + 500, lastMousePosition.y + 500))
        const block3 = createBlock(new Vector2(lastMousePosition.x - 750, lastMousePosition.y + 200))

        const arrow0 = new Arrow(workplace, block)
        arrow0.form.input.textContent = "0"
        arrow0.setFrom(block.bottomPoint)
        arrow0.setTo(block0.topPoint, block0)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)
        arrows.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.setFrom(block.bottomPoint)
        arrow1.setTo(block1.topPoint, block1)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)
        arrows.push(arrow1)

        const arrow2 = new Arrow(workplace, block)
        arrow2.setFrom(block.bottomPoint)
        arrow2.setTo(block2.topPoint, block2)
        arrow2.placeArrow()
        block2.arrowsList.push(arrow2)
        block.arrowsList.push(arrow2)
        arrows.push(arrow2)

        const arrow3 = new Arrow(workplace, block)
        arrow3.form.input.textContent = "cbc"
        arrow3.setFrom(block.bottomPoint)
        arrow3.setTo(block3.topPoint, block3)
        arrow3.placeArrow()
        block3.arrowsList.push(arrow3)
        block.arrowsList.push(arrow3)
        arrows.push(arrow3)
    }
})