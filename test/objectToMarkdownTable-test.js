var expect = require('chai').expect;
var objectToMarkdownTable = require('../lib/objectToMarkdownTable.js');

describe("objectToMarkdown list tests", function() {

    var testObj;
    var numEntries = 10;

    // build out a test object
    before(function () {

        //testObj = { "items":[
        //    {
        //        "title":"title 1",
        //        "innerArray": [
        //            {
        //                "innerTitle":"inner title 1",
        //                "innerDescription":"inner description 1",
        //                "innerInnerArray":[
        //                    {
        //                        "innerInnerTitle":"inner inner title 1",
        //                        "innerInnerDescription":"inner inner description 1",
        //                        "tripleInnerArray":[
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 1",
        //                                "tripleInnerArrayDescription":"triple inner array description 1"
        //                            },
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 2",
        //                                "tripleInnerArrayDescription":"triple inner array description 2"
        //                            },
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 3",
        //                                "tripleInnerArrayDescription":"triple inner array description 3"
        //                            }
        //                        ]
        //                    },
        //                    {
        //                        "innerInnerTitle":"inner inner title 2",
        //                        "innerInnerDescription":"inner inner description 2",
        //                        "tripleInnerArray":[
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 1",
        //                                "tripleInnerArrayDescription":"triple inner array description 1"
        //                            },
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 2",
        //                                "tripleInnerArrayDescription":"triple inner array description 2"
        //                            },
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 3",
        //                                "tripleInnerArrayDescription":"triple inner array description 3"
        //                            }
        //                        ]
        //                    },
        //                    {
        //                        "innerInnerTitle":"inner inner title 3",
        //                        "innerInnerDescription":"inner inner description 3",
        //                        "tripleInnerArray":[
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 1",
        //                                "tripleInnerArrayDescription":"triple inner array description 1"
        //                            },
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 2",
        //                                "tripleInnerArrayDescription":"triple inner array description 2"
        //                            },
        //                            {
        //                                "tripleInnerArrayTitle":"triple inner array title 3",
        //                                "tripleInnerArrayDescription":"triple inner array description 3"
        //                            }
        //                        ]
        //                    }
        //                ]
        //            },
        //            {
        //                "innerTitle":"inner title 2",
        //                "innerDescription":"inner description 2",
        //                "innerInnerArray":[
        //                    {
        //                        "innerInnerTitle":"inner inner title 1",
        //                        "innerInnerDescription":"inner inner description 1"
        //                    },
        //                    {
        //                        "innerInnerTitle":"inner inner title 2",
        //                        "innerInnerDescription":"inner inner description 2"
        //                    },
        //                    {
        //                        "innerInnerTitle":"inner inner title 3",
        //                        "innerInnerDescription":"inner inner description 3"
        //                    }
        //                ]
        //            },
        //            {
        //                "innerTitle":"inner title 3",
        //                "innerDescription":"inner description 3",
        //                "innerInnerArray":[
        //                    {
        //                        "innerInnerTitle":"inner inner title 1",
        //                        "innerInnerDescription":"inner inner description 1"
        //                    },
        //                    {
        //                        "innerInnerTitle":"inner inner title 2",
        //                        "innerInnerDescription":"inner inner description 2"
        //                    },
        //                    {
        //                        "innerInnerTitle":"inner inner title 3",
        //                        "innerInnerDescription":"inner inner description 3"
        //                    }
        //                ]
        //            }
        //        ],
        //        "description":"desc 1"
        //    },
        //    {
        //        "title":"title 2",
        //        "innerArray": [
        //            {
        //                "innerTitle":"inner title 1",
        //                "innerDescription":"inner description 1"
        //            },
        //            {
        //                "innerTitle":"inner title 2",
        //                "innerDescription":"inner description 2"
        //            },
        //            {
        //                "innerTitle":"inner title 3",
        //                "innerDescription":"inner description 3"
        //            }
        //        ],
        //        "description":"desc 2"
        //    },
        //    {
        //        "title":"title 3",
        //        "innerArray": [
        //            {
        //                "innerTitle":"inner title 1",
        //                "innerDescription":"inner description 1"
        //            },
        //            {
        //                "innerTitle":"inner title 2",
        //                "innerDescription":"inner description 2"
        //            },
        //            {
        //                "innerTitle":"inner title 3",
        //                "innerDescription":"inner description 3"
        //            }
        //        ],
        //        "description":"desc 3"
        //    }
        //]};

        testObj = {
            "fieldName1":"fieldValue1",
            "fieldNameWithDepth": {
                "innerFieldName1":"innerFieldValue1",
                "innerFieldName2":"innerFieldValue2",
                "innerFieldName3":"innerFieldValue3",
            },
            "fieldName2":"fieldValue2",
            "fieldName3":"fieldValue3",
            "fieldName4":"fieldValue4",
            "array1":[
                {
                    "fieldName1":"fieldValue1",
                    "innerArray1":[
                        {
                            "innerFieldName1":"innerFieldValue1",
                            "innerFieldName2":"innerFieldValue2",
                            "innerObject1":{
                                "innerObjectFieldName1":"innerObjectFieldValue1",
                                "innerObjectFieldName2":"innerObjectFieldValue1",
                                "innerObjectFieldName3":"innerObjectFieldValue1",
                            }
                        },
                        {
                            "innerFieldName1":"innerFieldValue1",
                            "innerFieldName2":"innerFieldValue2"
                        },
                        {
                            "innerFieldName1":"innerFieldValue1",
                            "innerFieldName2":"innerFieldValue2"
                        }
                    ]
                },
                {
                    "fieldName2":"fieldValue2"
                },
            ],
            "fieldName5":"fieldValue5"
        };
    });

    it("attempt to convert a json object into a MarkDown table", function(done) {
        //var output = objectToMarkdownTable.convertObjectToMarkdown(testObj);
        var output = objectToMarkdownTable.convertObjectToMarkdown(testObj, null);
        console.log(output);
        done();
    });
});
