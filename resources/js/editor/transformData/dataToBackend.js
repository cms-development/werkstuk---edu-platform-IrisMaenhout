import {editorElement, editor}  from '../configEditor.js';

// _______________Send content from editor to the backend _________________
const inputPageContent = document.querySelector('.page-content');



function updateContent() {

    // Get content
    const jsonContent = editor.getJSON();


    // Replace textStyle with textColor, because the addon "Bard Text Color" uses the term textColor instead of textStyle, so otherwise it wouldn't display the data correctly in the backend.
    for(let key in jsonContent.content){

        // Change color in sentences
        if (jsonContent.content[key].content !== undefined){
            // console.log('content',jsonContent.content[key])

            jsonContent.content[key].content.forEach(element => {
                console.log('element', element);
                if(element.marks !== undefined){
                    element.marks.forEach( mark => {
                        if(mark.type.match(/textStyle/)){
                            mark.type = "textColor";
                        }
                    })
                }

                // Change color in bullet lists or ordered lists.
                if(element.content !== undefined){
                    if(Array.isArray(element.content)){
                        element.content.forEach( listElement => {
                            // console.log('test', listElement);
                            if(listElement.content !== undefined){
                                listElement.content.forEach(part => {
                                    if(part.marks !== undefined){
                                        part.marks.forEach( mark =>{
                                            if(mark.type.match(/textStyle/)){
                                                mark.type = "textColor";
                                            }
                                        });
                                    }
                                });
                            }


                        })
                    }

                }


            });

        };

        console.log(jsonContent.content[key]);
        // Replace bullet_list and list_item with the camelCase name
        if((jsonContent.content[key].type).match(/bulletList/)){
            jsonContent.content[key].type = "bullet_list";
            jsonContent.content[key].content.forEach(sentenceContent => {
                if((sentenceContent.type).match(/listItem/)){
                    sentenceContent.type = "list_item";
                }
            });
        }

        if((jsonContent.content[key].type).match(/orderedList/)){
            jsonContent.content[key].type = "ordered_list";
            jsonContent.content[key].content.forEach(sentenceContent => {
                if((sentenceContent.type).match(/listItem/)){
                    sentenceContent.type = "list_item";
                }
            });
        }

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


                            if(contentSentence.content !== undefined){
                                contentSentence.content.forEach(part => {
                                    if(part.marks !== undefined){
                                        part.marks.forEach( mark =>{
                                            if(mark.type.match(/textStyle/)){
                                                mark.type = "textColor";
                                            }
                                        });
                                    }
                                });
                            }
                        });

                        // Colors in al list item
                        // if(Array.isArray(element.content)){
                        //     element.content.forEach( listElement => {
                        //         // console.log('test', listElement);



                        //     })
                        // }
                    }




                });
            }

            function bulletPointInCulumn(column) {
                column.forEach(colContent => {
                    if(colContent.type.match(/bulletList/)){
                        colContent.type = "bullet_list";
                        colContent.content.forEach(sentenceContent => {
                            if((sentenceContent.type).match(/listItem/)){
                                sentenceContent.type = "list_item"
                            }
                        });
                    }
                });

            }

            function orderedListInCulumn(column) {

                column.forEach(colContent => {
                    if(colContent.type.match(/orderedList/)){
                        colContent.type = "ordered_list";
                        colContent.content.forEach(sentenceContent => {
                            if((sentenceContent.type).match(/listItem/)){
                                sentenceContent.type = "list_item"
                            }
                        });
                    }
                });

            }

            const column1Content = jsonContent.content[key].content[0].content;
            colorInCulumn(column1Content);
            bulletPointInCulumn(column1Content);
            orderedListInCulumn(column1Content);

            const column2Content = jsonContent.content[key].content[1].content;
            colorInCulumn(column2Content);
            bulletPointInCulumn(column2Content);
            orderedListInCulumn(column2Content);

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
    console.log('2de: ',jsonContent);
}

export {updateContent};
