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

import {cookie, cookieData} from './transformData/dataToFrondend.js';

const editorElement = document.querySelector('.wysiwyg-editor');

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

export {editorElement, editor};
