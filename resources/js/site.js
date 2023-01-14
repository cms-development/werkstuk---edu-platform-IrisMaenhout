// This is all you.

// _____________________WYSIWYG editor___________________
import {
    Editor
} from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

const editorElement = document.querySelector('.wysiwyg-editor');

if (editorElement) {

    const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
    const cookie = cookieObj.get("pageContent");

    let editor = new Editor({
        element: editorElement,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                }
            }),
            Underline,
            Image,
            Link.configure({
                validate: href => /^https?:\/\//.test(href),
            }),
            CharacterCount,
            Table.configure({
                resizable: false,
                HTMLAttributes: {
                  class: 'table-container',
                },
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        // content: "type": "doc",
        content: {
            "type": "doc",
            "content": cookie ? JSON.parse(cookie) : '',
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
    const addTableBtn = document.querySelector('.add-table-btn');

    editorElement.addEventListener('keypress', ()=>{
        wordCount.innerHTML = editor.storage.characterCount.words() + ' woorden';

        const jsonContent = editor.getJSON();

        inputPageContent.value = JSON.stringify(jsonContent);
        console.log(jsonContent);
    });


    function makeH2() {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
    }

    function makeH3() {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
    }

    function makeH4() {
        editor.chain().focus().toggleHeading({ level: 4 }).run();
    }

    function makeBold() {
        editor.chain().focus().toggleBold().run();
    }

    function makeItalic() {
        editor.chain().focus().toggleItalic().run();
    }

    function makeUnderline() {
        editor.chain().focus().toggleUnderline().run();
    }

    function makeStrikethrough() {
        editor.chain().focus().toggleStrike().run();
    }

    function makeOrderedList() {
        editor.chain().focus().toggleOrderedList().run();
    }

    function makeUnorderedList() {
        editor.chain().focus().toggleBulletList().run();
    }

    function makeQuote() {
        editor.chain().focus().toggleBlockquote().run();
    }


    function makeLink() {
        const givenUrl = editor.getAttributes('link').href;
        if(givenUrl === undefined){
            const url = prompt('Url:');
            editor.chain().focus().toggleLink({ href: url, target: '_blank' }).run();
        }else{
            editor.chain().focus().toggleLink().run();
        }

    }

    function addImg() {
        const imgUrl = prompt('Adres van de afbeelding:');
        if (imgUrl) {
            editor.chain().focus().setImage({ src: imgUrl }).run();
        }
    }

    function addTable() {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
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
    addTableBtn.addEventListener('click', addTable);

};


