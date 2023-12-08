document.addEventListener('DOMContentLoaded', () => {
    let lastMousePosition

    const workplace = document.getElementById('workplace')
    const contextMenu = document.getElementById('template-context-menu')
    contextMenu.style.display = "none"

    const list = [...frameTypes.keys()]
    list.forEach(type => {
        const div = document.createElement('div');
        div.textContent = type
        contextMenu.appendChild(div)
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
        contextMenu.style.display = 'none'
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (e.button === 2) {
            if (e.target === workplace) {
                lastMousePosition = mousePosition

                contextMenu.style.display = 'block'
                contextMenu.style.left = mousePosition.x + "px"
                contextMenu.style.top = mousePosition.y + "px"
            }
        }
    });

    function createBlock(position = lastMousePosition) {
        let adjustedPosition = new Vector2(
            Math.round(position.x / cellSize.x) * cellSize.x,
            Math.round(position.y / cellSize.y) * cellSize.y
        );

        let block = new Block(adjustedPosition, blockSize, workplace, blocks.length, blocks, arrowToMove, blockToMove)
        blocks.push(block)

        return block
    }

    function dialogTemplate() {
        const block = createBlock()

        block.header.input.value = "Dialog"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "character"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "location"
        block.formsList.push(keyValuePairForm1)

        const keyValuePairForm2 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm2.keyForm.input.value = "text"
        block.formsList.push(keyValuePairForm2)

        const keyValuePairForm3 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm3.keyForm.input.value = "emotion"
        block.formsList.push(keyValuePairForm3)
    }

    function textTemplate() {
        const block = createBlock()

        block.header.input.value = "Text"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "location"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "text"
        block.formsList.push(keyValuePairForm1)
    }

    function bubbleTemplate() {
        const block = createBlock()

        block.header.input.value = "Bubble"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "text"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "bubble-type"
        block.formsList.push(keyValuePairForm1)
    }

    function customizeTemplate() {
        const block = createBlock()

        block.header.input.value = "Customize"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "character"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "location"
        block.formsList.push(keyValuePairForm1)

        const keyValuePairForm2 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm2.keyForm.input.value = "outfit-set"
        block.formsList.push(keyValuePairForm2)
    }

    function animationTemplate() {
        const block = createBlock()

        block.header.input.value = "Animation"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "animation"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "location"
        block.formsList.push(keyValuePairForm1)
    }

    function itemTemplate() {
        const block = createBlock()

        block.header.input.value = "Item"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "item-name"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "add"
        block.formsList.push(keyValuePairForm1)
    }

    function loveTemplate() {
        const block = createBlock()

        block.header.input.value = "Love"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "character"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "add"
        block.formsList.push(keyValuePairForm1)
    }

    function optionTemplate(position = lastMousePosition) {
        const block = createBlock(position)

        block.header.input.value = "Option"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "text"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "premium"
        block.formsList.push(keyValuePairForm1)

        return block
    }

    function itemCheckTemplate() {
        const block = createBlock()

        block.header.input.value = "Item-check"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "item-name"
        block.formsList.push(keyValuePairForm)

        const block0 = createBlock(new Vector2(lastMousePosition.x - 250, lastMousePosition.y + 500))
        const block1 = createBlock(new Vector2(lastMousePosition.x + 250, lastMousePosition.y + 500))

        const arrow0 = new Arrow(workplace, block)
        arrow0.form.input.value = "0"
        arrow0.setFrom(block.bottomPoint, block.id, false)
        arrow0.setTo(block0.topPoint, block0, true)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.form.input.value = "1"
        arrow1.setFrom(block.bottomPoint, block.id, false)
        arrow1.setTo(block1.topPoint, block1, true)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)
    }

    function choiceTemplate() {
        const block = createBlock()

        block.header.input.value = "Choice"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "text"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "location"
        block.formsList.push(keyValuePairForm1)

        const block0 = optionTemplate(new Vector2(lastMousePosition.x - 500, lastMousePosition.y + 500))
        const block1 = optionTemplate(new Vector2(lastMousePosition.x, lastMousePosition.y + 500))
        const block2 = optionTemplate(new Vector2(lastMousePosition.x + 500, lastMousePosition.y + 500))

        const arrow0 = new Arrow(workplace, block)
        arrow0.setFrom(block.bottomPoint, block.id, false)
        arrow0.setTo(block0.topPoint, block0, true)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.setFrom(block.bottomPoint, block.id, false)
        arrow1.setTo(block1.topPoint, block1, true)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)

        const arrow2 = new Arrow(workplace, block)
        arrow2.setFrom(block.bottomPoint, block.id, false)
        arrow2.setTo(block2.topPoint, block2, true)
        arrow2.placeArrow()
        block2.arrowsList.push(arrow2)
        block.arrowsList.push(arrow2)
    }

    function choiceByCharacterTemplate() {
        const block = createBlock()

        block.header.input.value = "Choice-by-character"

        const keyValuePairForm = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm.keyForm.input.value = "character"
        block.formsList.push(keyValuePairForm)

        const keyValuePairForm1 = new KeyValuePairForm(block.docElement, fieldTypes, fieldTypes, block.addButton, block.formsList.length)
        keyValuePairForm1.keyForm.input.value = "outfit-set"
        block.formsList.push(keyValuePairForm1)

        const block0 = createBlock(new Vector2(lastMousePosition.x - 500, lastMousePosition.y + 500))
        const block1 = createBlock(new Vector2(lastMousePosition.x, lastMousePosition.y + 500))
        const block2 = createBlock(new Vector2(lastMousePosition.x + 500, lastMousePosition.y + 500))

        const arrow0 = new Arrow(workplace, block)
        arrow0.form.input.value = "0"
        arrow0.setFrom(block.bottomPoint, block.id, false)
        arrow0.setTo(block0.topPoint, block0, true)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.form.input.value = "clothes-id1"
        arrow1.setFrom(block.bottomPoint, block.id, false)
        arrow1.setTo(block1.topPoint, block1, true)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)

        const arrow2 = new Arrow(workplace, block)
        arrow2.form.input.value = "clothes-id2"
        arrow2.setFrom(block.bottomPoint, block.id, false)
        arrow2.setTo(block2.topPoint, block2, true)
        arrow2.placeArrow()
        block2.arrowsList.push(arrow2)
        block.arrowsList.push(arrow2)
    }

    function choiceByChoiceTemplate() {
        const block = createBlock()

        block.header.input.value = "Choice-by-choice"

        const block0 = createBlock(new Vector2(lastMousePosition.x - 500, lastMousePosition.y + 500))
        const block1 = createBlock(new Vector2(lastMousePosition.x, lastMousePosition.y + 500))
        const block2 = createBlock(new Vector2(lastMousePosition.x + 500, lastMousePosition.y + 500))
        const block3 = createBlock(new Vector2(lastMousePosition.x - 750, lastMousePosition.y + 200))

        const arrow0 = new Arrow(workplace, block)
        arrow0.form.input.value = "0"
        arrow0.setFrom(block.bottomPoint, block.id, false)
        arrow0.setTo(block0.topPoint, block0, true)
        arrow0.placeArrow()
        block0.arrowsList.push(arrow0)
        block.arrowsList.push(arrow0)

        const arrow1 = new Arrow(workplace, block)
        arrow1.setFrom(block.bottomPoint, block.id, false)
        arrow1.setTo(block1.topPoint, block1, true)
        arrow1.placeArrow()
        block1.arrowsList.push(arrow1)
        block.arrowsList.push(arrow1)

        const arrow2 = new Arrow(workplace, block)
        arrow2.setFrom(block.bottomPoint, block.id, false)
        arrow2.setTo(block2.topPoint, block2, true)
        arrow2.placeArrow()
        block2.arrowsList.push(arrow2)
        block.arrowsList.push(arrow2)

        const arrow3 = new Arrow(workplace, block)
        arrow3.form.input.value = "cbc"
        arrow3.setFrom(block.bottomPoint, block.id, false)
        arrow3.setTo(block3.topPoint, block3, true)
        arrow3.placeArrow()
        block3.arrowsList.push(arrow3)
        block.arrowsList.push(arrow3)
    }
})