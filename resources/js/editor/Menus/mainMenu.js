import {editorElement, editor}  from '../configEditor.js';
import { updateContent } from '../transformData/dataToBackend.js';

function mainMenuBtnsActions() {
    const wordCount = document.querySelector('.word-count');

    const h2Btn = document.querySelector('.h2-btn');
    const h3Btn = document.querySelector('.h3-btn');
    const h4Btn = document.querySelector('.h4-btn');
    const makeBoldBtn = document.querySelector('.bold-btn');
    const makeItalicBtn = document.querySelector('.italic-btn');
    const makeUnderlineBtn = document.querySelector('.underline-btn');
    const strikethroughBtn = document.querySelector('.strikethrough-btn');
    const olBtn = document.querySelector('.orderedlist-btn');
    const ulBtn = document.querySelector('.unorderedlist-btn');
    const quoteBtn = document.querySelector('.quote-btn');
    const linkBtn = document.querySelector('.link-btn');
    const imgBtn = document.querySelector('.img-btn');
    // const addTableBtn = document.querySelector('.add-table-btn');
    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');
    const layoutColumnsBtn = document.querySelector('.add-2-layout-columns');
    const removeLayoutColumnsBtn = document.querySelector('.remove-layout-columns-btn');



    function countWords() {
        wordCount.innerHTML = editor.storage.characterCount.words() + ' woorden';
    }

    function undoBtnStyle(action) {
        if(editor.can().undo()){
            action;
            undoBtn.style.opacity = "1";
            undoBtn.style.cursor = "pointer";
        }else{
            undoBtn.style.opacity = "0.5";
            undoBtn.style.cursor = "default";
        }
    }

    function redoBtnStyle(action) {
        if(editor.can().redo()){
            action;
            redoBtn.style.opacity = "1";
            redoBtn.style.cursor = "pointer";
        }else{
            redoBtn.style.opacity = "0.5";
            redoBtn.style.cursor = "default";
        }
    }

    countWords();
    undoBtnStyle();
    redoBtnStyle();

    // _____________________________ Buttons actions _____________________


    function makeH2() {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        updateContent();
    }

    function makeH3() {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        updateContent();
    }

    function makeH4() {
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        updateContent();

    }

    function makeBold() {
        editor.chain().focus().toggleBold().run();
        updateContent();

    }

    function makeItalic() {
        editor.chain().focus().toggleItalic().run();
        updateContent();
    }

    function makeUnderline() {
        editor.chain().focus().toggleUnderline().run();
        updateContent();
    }

    function makeStrikethrough() {
        editor.chain().focus().toggleStrike().run();
        updateContent();

    }

    function makeOrderedList() {
        editor.chain().focus().toggleOrderedList().run();
        updateContent();
    }

    function makeUnorderedList() {
        editor.chain().focus().toggleBulletList().run();
        updateContent();
    }

    function makeQuote() {
        editor.chain().focus().toggleBlockquote().run();
        updateContent();
    }


    function makeLink() {
        const givenUrl = editor.getAttributes('link').href;
        if(givenUrl === undefined){
            const url = prompt('Url:');
            editor.chain().focus().toggleLink({ href: url, target: '_blank' }).run();
        }else{
            editor.chain().focus().toggleLink().run();
        }

        updateContent();

    }

    function addImg() {
        const imgUrl = prompt('Adres van de afbeelding:');
        if (imgUrl) {
            editor.chain().focus().setImage({ src: imgUrl }).run();
        }

        updateContent();
    }

    // function addTable() {
    //     editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();

    //     updateContent();
    // }

    function undo() {
        undoBtnStyle(editor.chain().focus().undo().run());
        updateContent();
        redoBtnStyle()
    }

    function redo() {
        redoBtnStyle(editor.chain().focus().redo().run());
        updateContent();
        undoBtnStyle();
    }

    function createColumns() {
        editor.chain().focus().setColumns(2).run();
        updateContent();

    }


    function deleteColumns() {
        editor.chain().focus().unsetColumns().run();
        updateContent();
    }


    window.addEventListener('click', (e)=>{
        // Check if the user clicked the columns or the buttons and disable the unnecessary button.
        if(e.target.parentElement.className === "column" || e.target.parentElement.className === "column-block" || e.target.parentElement.className === "add-2-layout-columns" || e.target.parentElement.className === "remove-layout-columns-btn"){

            layoutColumnsBtn.disabled = true;
            layoutColumnsBtn.style.opacity = "0.5";

            removeLayoutColumnsBtn.disabled = false;
            removeLayoutColumnsBtn.style.opacity = "1";
        }else{
            layoutColumnsBtn.disabled = false;
            layoutColumnsBtn.style.opacity = "1";

            removeLayoutColumnsBtn.disabled = true;
            removeLayoutColumnsBtn.style.opacity = "0.5";
        }
    });


    // _________________ Link button with their action __________________

    h2Btn.addEventListener('click', makeH2);
    h3Btn.addEventListener('click', makeH3);
    h4Btn.addEventListener('click', makeH4);
    makeBoldBtn.addEventListener('click', makeBold);
    makeItalicBtn.addEventListener('click', makeItalic);
    makeUnderlineBtn.addEventListener('click', makeUnderline);
    strikethroughBtn.addEventListener('click', makeStrikethrough);
    olBtn.addEventListener('click', makeOrderedList);
    ulBtn.addEventListener('click', makeUnorderedList);
    quoteBtn.addEventListener('click', makeQuote);
    linkBtn.addEventListener('click', makeLink);
    imgBtn.addEventListener('click', addImg);
    // addTableBtn.addEventListener('click', addTable);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);
    layoutColumnsBtn.addEventListener('click', createColumns);
    removeLayoutColumnsBtn.addEventListener('click', deleteColumns);

}

export {mainMenuBtnsActions, countWords, updateContent, undoBtnStyle, redoBtnStyle}
