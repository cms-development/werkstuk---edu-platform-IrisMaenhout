import {editorElement, editor}  from '../configEditor.js';
import { updateContent } from '../transformData/dataToBackend.js';

// _________________________ Change text color _____________________

export function colorMenuBtnsActions() {

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


        // ________________ Buttons actions ____________________________
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


        // _________________ Link button with their action __________________

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
};
