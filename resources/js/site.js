// This is all you.

// _____________________WYSIWYG editor___________________
import { ColumnExtension } from '@gocapsule/column-extension';
import {
    Editor,
    Node
} from '@tiptap/core';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

const editorElement = document.querySelector('.wysiwyg-editor');

if (editorElement) {

    // ________ Get cookie for data that was send from the backend _________

    const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"));
    const cookie = cookieObj.get("pageContent");
    const cookieData = JSON.parse(cookie);

    // Replace the mark textColor in textStyle, that way the tip tap editor can reder a particular color.

    for(let key in cookieData){
        // console.log('cookie',cookieData);

        if (cookieData[key].content !== undefined && cookieData[key].content[0].marks !== undefined && (cookieData[key].content[0].marks[0].type).match(/textColor/)){

            cookieData[key].content[0].marks[0].type = "textStyle";
        };

        if((cookieData[key].type).match(/set/)){
            cookieData[key].type = "columnBlock";
            // console.log(jsonContent.content[key].content);

            function colorInCulumnCookie(column) {
                column.forEach(colContent => {
                    if(colContent.content !== undefined){
                        colContent.content.forEach((contentSentence)=>{
                            if(contentSentence.marks !== undefined){
                                contentSentence.marks.forEach((mark)=>{
                                    if((mark.type).match(/textColor/)){
                                        mark.type = "textStyle";
                                    }
                                });
                            }
                        });
                    };
                });
            }

            const column1Content = cookieData[key].attrs.values.colomn1;
            colorInCulumnCookie(column1Content);
            console.log(column1Content);

            const column2Content = cookieData[key].attrs.values.colomn2;
            colorInCulumnCookie(column2Content);
            console.log(column2Content);


            delete cookieData[key].attrs;
            cookieData[key].content = [
                {
                    content: column1Content,
                    type: "column"
                },
                {
                    content: column2Content,
                    type: "column"
                }
            ];

        }
        // console.log('edit cookie',cookieData);
    };

    // _______________________ Editor configuration __________________

    let editor = new Editor({
        element: editorElement,
        extensions: [
            StarterKit.configure({
                // override Document to allow columns
                document: false,
                heading: {
                    levels: [2, 3, 4],
                }
            }),
            BubbleMenu.configure({
                element: document.querySelector('.bubble-menu-color'),
            }),
            Underline,
            Image,
            Link.configure({
                validate: href => /^https?:\/\//.test(href),
            }),
            CharacterCount,
            Color,
            TextStyle,
            // Table.configure({
            //     resizable: false,
            //     HTMLAttributes: {
            //       class: 'table-container',
            //     },
            // }),
            // TableRow,
            // TableHeader,
            // TableCell,
            ColumnExtension,
        ],
        // content: "type": "doc",
        content: {
            "type": "doc",
            "content": cookie ? cookieData : '',
        },
        autofocus: true,
        editable: true,
        injectCSS: false,
    });

    const wordCount = document.querySelector('.word-count');
    const inputPageContent = document.querySelector('.page-content');

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

    // _______________Send content from editor to the backend _________________
    function updateContent() {
        // Get content
        const jsonContent = editor.getJSON();
        // console.log('editor_content: ', jsonContent);


        // Replace textStyle with textColor, because the addon "Bard Text Color" uses the term textColor instead of textStyle, so otherwise it wouldn't display the data correctly in the backend.
        for(let key in jsonContent.content){

            if (jsonContent.content[key].content !== undefined && jsonContent.content[key].content[0].marks !== undefined && (jsonContent.content[key].content[0].marks[0].type).match(/textStyle/)){

                jsonContent.content[key].content[0].marks[0].type = "textColor";
            };

            if((jsonContent.content[key].type).match(/columnBlock/)){
                jsonContent.content[key].type = "set";

                function colorInCulumn(column) {
                    column.forEach(colContent => {
                        if(colContent.content !== undefined){
                            colContent.content.forEach((contentSentence)=>{
                                if(contentSentence.marks !== undefined){
                                    contentSentence.marks.forEach((mark)=>{
                                        if((mark.type).match(/textStyle/)){
                                            mark.type = "textColor";
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

                const column1Content = jsonContent.content[key].content[0].content;
                colorInCulumn(column1Content);

                const column2Content = jsonContent.content[key].content[1].content;
                colorInCulumn(column2Content);

                delete jsonContent.content[key].content;
                jsonContent.content[key].attrs = {
                    values: {
                        type: "2_columns",
                        colomn1: column1Content,
                        colomn2: column2Content
                    }
                }

            }

        };

        inputPageContent.value = JSON.stringify(jsonContent);
        // console.log('2de: ',jsonContent);
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

    editorElement.addEventListener('keyup', ()=>{
        countWords();
        updateContent();
        undoBtnStyle();
        redoBtnStyle();
    });


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

    // _________________________ Change text color _____________________
    window.addEventListener('mouseup', ()=>{

        // console.log(document.activeElement);
        const colorMenu = document.querySelector('.bubble-menu-color');

        if(colorMenu){
            // Colors
            const darkGreyBtn = document.querySelector('.dark-grey-btn');
            const greyBtn = document.querySelector('.grey-btn');
            const brownBtn = document.querySelector('.brown-btn');
            const orangeBtn = document.querySelector('.orange-btn');
            const yellowBtn = document.querySelector('.yellow-btn');
            const greenBtn = document.querySelector('.green-btn');
            const blueBtn = document.querySelector('.blue-btn');
            const purpleBtn = document.querySelector('.purple-btn');
            const pinkBtn = document.querySelector('.pink-btn');
            const redBtn = document.querySelector('.red-btn');


            function setDarkGrey() {
                editor.chain().focus().setColor('#474747').run();
                updateContent();
            }

            function setGrey() {
                editor.chain().focus().setColor('#787774').run();
                updateContent();
            }

            function setBrown() {
                editor.chain().focus().setColor('#9F6B53').run();
                updateContent();
            }

            function setOrange() {
                editor.chain().focus().setColor('#D9730D').run();
                updateContent();
            }

            function setYellow() {
                editor.chain().focus().setColor('#CB912F').run();
                updateContent();
            }

            function setGreen() {
                editor.chain().focus().setColor('#448361').run();
                updateContent();
            }

            function setBlue() {
                editor.chain().focus().setColor('#337EA9').run();
                updateContent();
            }


            function setPurple() {
                editor.chain().focus().setColor('#9065B0').run();
                updateContent();
            }

            function setPink() {
                editor.chain().focus().setColor('#C14C8A').run();
                updateContent();
            }

            function setRed() {
                editor.chain().focus().setColor('#D44C47').run();
                updateContent();
            }

            darkGreyBtn.addEventListener('click', setDarkGrey);
            greyBtn.addEventListener('click', setGrey);
            brownBtn.addEventListener('click', setBrown);
            orangeBtn.addEventListener('click', setOrange);
            yellowBtn.addEventListener('click', setYellow);
            greenBtn.addEventListener('click', setGreen);
            blueBtn.addEventListener('click', setBlue);
            purpleBtn.addEventListener('click', setPurple);
            pinkBtn.addEventListener('click', setPink);
            redBtn.addEventListener('click', setRed);
        }
    });

};


