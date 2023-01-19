// ________ Get cookie for data that was send from the backend _________

const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"));
const cookie = cookieObj.get("pageContent");
const cookieData = JSON.parse(cookie);
console.log(cookieData);


// change some parts of the received object, that way the tip tap editor can reder the data correctly.
for(let key in cookieData){

    // Replace the mark textColor in textStyle
    if (cookieData[key].content !== undefined){
        cookieData[key].content.forEach(element => {

            if(element.marks !== undefined){
                element.marks.forEach( mark => {
                    if(mark.type.match(/textColor/)){
                        mark.type = "textStyle";
                    }
                })
            }



            if(element.content !== undefined){
                if(Array.isArray(element.content)){
                    element.content.forEach( listElement => {
                        console.log('blabla', listElement);
                        if(listElement.content !== undefined){

                            listElement.content.forEach(part => {
                                if(part.marks !== undefined){
                                    part.marks.forEach( mark =>{
                                        if(mark.type.match(/textColor/)){
                                            mark.type = "textStyle";
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

    // Replace bullet_list and list_item with the camelCase name
    if((cookieData[key].type).match(/bullet_list/)){
        cookieData[key].type = "bulletList";
        cookieData[key].content.forEach(sentenceContent => {
            if((sentenceContent.type).match(/list_item/)){
                sentenceContent.type = "listItem"
            }
        });
    }

    if((cookieData[key].type).match(/ordered_list/)){
        cookieData[key].type = "orderedList";
        cookieData[key].content.forEach(sentenceContent => {
            if((sentenceContent.type).match(/list_item/)){
                sentenceContent.type = "listItem"
            }
        });
    }

    // Replace set with columnBlock
    if((cookieData[key].type).match(/set/)){
        cookieData[key].type = "columnBlock";
        // console.log(jsonContent.content[key].content);

        // Replace the mark textColor in textStyle
        function colorInCulumnCookie(column) {
            if(Array.isArray(column)){
                console.log('column', column);
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
        }

        function bulletPointInCulumn(column) {

            if(Array.isArray(column)){
                column.forEach(colContent => {
                    if(colContent.type.match(/bullet_list/)){
                        colContent.type = "bulletList";
                        colContent.content.forEach(sentenceContent => {
                            if((sentenceContent.type).match(/list_item/)){
                                sentenceContent.type = "listItem"
                            }
                        });
                    }
                });
            }
        }

        function orderedListInCulumn(column) {

            if(Array.isArray(column)){
                column.forEach(colContent => {
                    if(colContent.type.match(/ordered_list/)){
                        colContent.type = "orderedList";
                        colContent.content.forEach(sentenceContent => {
                            if((sentenceContent.type).match(/list_item/)){
                                sentenceContent.type = "listItem"
                            }
                        });
                    }
                });
            }
        }

        const column1Content = cookieData[key].attrs.values.colomn1;
        colorInCulumnCookie(column1Content);
        bulletPointInCulumn(column1Content);
        orderedListInCulumn(column1Content);
        console.log(column1Content);

        const column2Content = cookieData[key].attrs.values.colomn2;
        colorInCulumnCookie(column2Content);
        bulletPointInCulumn(column2Content);
        orderedListInCulumn(column2Content);
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
};

export {cookie, cookieData};
