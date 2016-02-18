var expect = require('chai').expect;
var objectToMarkdownTable = require('../lib/objectToMarkdownTable.js');

describe("objectToMarkdown list tests", function() {

    var testObj;
    var numEntries = 10;

    // build out a test object
    before(function () {

        testObj = { "items":[
            {
                "title":"title 1",
                "innerArray": [
                    {
                        "innerTitle":"inner title 1",
                        "innerDescription":"inner description 1",
                        "innerInnerArray":[
                            {
                                "innerInnerTitle":"inner inner title 1",
                                "innerInnerDescription":"inner inner description 1",
                                "tripleInnerArray":[
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 1",
                                        "tripleInnerArrayDescription":"triple inner array description 1"
                                    },
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 2",
                                        "tripleInnerArrayDescription":"triple inner array description 2"
                                    },
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 3",
                                        "tripleInnerArrayDescription":"triple inner array description 3"
                                    }
                                ]
                            },
                            {
                                "innerInnerTitle":"inner inner title 2",
                                "innerInnerDescription":"inner inner description 2",
                                "tripleInnerArray":[
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 1",
                                        "tripleInnerArrayDescription":"triple inner array description 1"
                                    },
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 2",
                                        "tripleInnerArrayDescription":"triple inner array description 2"
                                    },
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 3",
                                        "tripleInnerArrayDescription":"triple inner array description 3"
                                    }
                                ]
                            },
                            {
                                "innerInnerTitle":"inner inner title 3",
                                "innerInnerDescription":"inner inner description 3",
                                "tripleInnerArray":[
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 1",
                                        "tripleInnerArrayDescription":"triple inner array description 1"
                                    },
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 2",
                                        "tripleInnerArrayDescription":"triple inner array description 2"
                                    },
                                    {
                                        "tripleInnerArrayTitle":"triple inner array title 3",
                                        "tripleInnerArrayDescription":"triple inner array description 3"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "innerTitle":"inner title 2",
                        "innerDescription":"inner description 2",
                        "innerInnerArray":[
                            {
                                "innerInnerTitle":"inner inner title 1",
                                "innerInnerDescription":"inner inner description 1"
                            },
                            {
                                "innerInnerTitle":"inner inner title 2",
                                "innerInnerDescription":"inner inner description 2"
                            },
                            {
                                "innerInnerTitle":"inner inner title 3",
                                "innerInnerDescription":"inner inner description 3"
                            }
                        ]
                    },
                    {
                        "innerTitle":"inner title 3",
                        "innerDescription":"inner description 3",
                        "innerInnerArray":[
                            {
                                "innerInnerTitle":"inner inner title 1",
                                "innerInnerDescription":"inner inner description 1"
                            },
                            {
                                "innerInnerTitle":"inner inner title 2",
                                "innerInnerDescription":"inner inner description 2"
                            },
                            {
                                "innerInnerTitle":"inner inner title 3",
                                "innerInnerDescription":"inner inner description 3"
                            }
                        ]
                    }
                ],
                "description":"desc 1"
            },
            {
                "title":"title 2",
                "innerArray": [
                    {
                        "innerTitle":"inner title 1",
                        "innerDescription":"inner description 1"
                    },
                    {
                        "innerTitle":"inner title 2",
                        "innerDescription":"inner description 2"
                    },
                    {
                        "innerTitle":"inner title 3",
                        "innerDescription":"inner description 3"
                    }
                ],
                "description":"desc 2"
            },
            {
                "title":"title 3",
                "innerArray": [
                    {
                        "innerTitle":"inner title 1",
                        "innerDescription":"inner description 1"
                    },
                    {
                        "innerTitle":"inner title 2",
                        "innerDescription":"inner description 2"
                    },
                    {
                        "innerTitle":"inner title 3",
                        "innerDescription":"inner description 3"
                    }
                ],
                "description":"desc 3"
            }
        ]};

        //testObj = {
        //    title: 'this is my entry title',
        //    dateEntered: moment().format('MMMM Do YYYY, h:mm:ss a'),
        //    message: 'this is just a message for the parent object',
        //    application: 'TestApp 2.0',
        //    items: [],
        //    items2: [{title: 'something here 1', description: 'description 1'}, {
        //        title: 'something here 2',
        //        description: 'description 2'
        //    }]
        //};
        //
        //for (var i = 0; i < numEntries; i++) {
        //    testObj.items.push({
        //        innerObject: {
        //            name: 'inner object name',
        //            description: 'inner object description'
        //        },
        //        title: 'title goes here ' + i,
        //        dateEntered: moment().format('MMMM Do YYYY, h:mm:ss a'),
        //        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        //        statusCode: 1,
        //        stackTrace: null,
        //        callingMethod: null
        //    });
        //};
    });

    it("attempt to convert a json object into a MarkDown table", function(done) {
        var output = objectToMarkdownTable.convertObjectToMarkdown(testObj);
        console.log(output);
        done();
    });
});
