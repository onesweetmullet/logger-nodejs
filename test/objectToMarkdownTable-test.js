var expect = require('chai').expect;
var moment = require('moment');

describe("objectToMarkdown list tests", function() {

    var testObj;
    var numEntries = 10;

    // build out a test object
    before(function () {

        testObj = { items:[
            {
                title:'title 1',
                innerArray: [
                    {
                        innertitle:'inner title 1',
                        innerdescription:'inner description 1',
                        innerInnerArray:[
                            {
                                innerInnerTitle:'inner inner title 1',
                                innerInnerDescription:'inner inner description 1',
                                tripleInnerArray:[
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 1',
                                        tripleInnerArrayDescription:'triple inner array description 1'
                                    },
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 2',
                                        tripleInnerArrayDescription:'triple inner array description 2'
                                    },
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 3',
                                        tripleInnerArrayDescription:'triple inner array description 3'
                                    }
                                ]
                            },
                            {
                                innerInnerTitle:'inner inner title 2',
                                innerInnerDescription:'inner inner description 2',
                                tripleInnerArray:[
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 1',
                                        tripleInnerArrayDescription:'triple inner array description 1'
                                    },
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 2',
                                        tripleInnerArrayDescription:'triple inner array description 2'
                                    },
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 3',
                                        tripleInnerArrayDescription:'triple inner array description 3'
                                    }
                                ]
                            },
                            {
                                innerInnerTitle:'inner inner title 3',
                                innerInnerDescription:'inner inner description 3',
                                tripleInnerArray:[
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 1',
                                        tripleInnerArrayDescription:'triple inner array description 1'
                                    },
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 2',
                                        tripleInnerArrayDescription:'triple inner array description 2'
                                    },
                                    {
                                        tripleInnerArrayTitle:'triple inner array title 3',
                                        tripleInnerArrayDescription:'triple inner array description 3'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        innertitle:'inner title 2',
                        innerdescription:'inner description 2',
                        innerInnerArray:[
                            {
                                innerInnerTitle:'inner inner title 1',
                                innerInnerDescription:'inner inner description 1'
                            },
                            {
                                innerInnerTitle:'inner inner title 2',
                                innerInnerDescription:'inner inner description 2'
                            },
                            {
                                innerInnerTitle:'inner inner title 3',
                                innerInnerDescription:'inner inner description 3'
                            },
                        ]
                    },
                    {
                        innertitle:'inner title 3',
                        innerdescription:'inner description 3',
                        innerInnerArray:[
                            {
                                innerInnerTitle:'inner inner title 1',
                                innerInnerDescription:'inner inner description 1'
                            },
                            {
                                innerInnerTitle:'inner inner title 2',
                                innerInnerDescription:'inner inner description 2'
                            },
                            {
                                innerInnerTitle:'inner inner title 3',
                                innerInnerDescription:'inner inner description 3'
                            },
                        ]
                    }
                ],
                description:'desc 1'
            },
            {
                title:'title 2',
                innerArray: [
                    {
                        innertitle:'inner title 1',
                        innerdescription:'inner description 1'
                    },
                    {
                        innertitle:'inner title 2',
                        innerdescription:'inner description 2'
                    },
                    {
                        innertitle:'inner title 3',
                        innerdescription:'inner description 3'
                    }
                ],
                description:'desc 2'
            },
            {
                title:'title 3',
                innerArray: [
                    {
                        innertitle:'inner title 1',
                        innerdescription:'inner description 1'
                    },
                    {
                        innertitle:'inner title 2',
                        innerdescription:'inner description 2'
                    },
                    {
                        innertitle:'inner title 3',
                        innerdescription:'inner description 3'
                    }
                ],
                description:'desc 3'
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
        var output = convertObjectToMarkdown(testObj);
        console.log(output);
        done();
    });
});

var convertArrayToMarkdownTable = function(arr, depth) {
    var output = '';

    if (!depth) {
        depth = 0;
    }

    if (depth > 0) {
        if (depth > 1)
            output += '<td>'

        output += '<table>';
        output += getHeaderRowAsHtml(arr[0]);
        output += '<tbody>';
    } else {
        // generate the header row
        output += getHeaderRow(arr[0]);

        // generate a separator row
        output += getRowSeparator(arr[0]);
    }

    for (var item in arr) {

        if (depth > 0) {
            output += '<tr>'
        }

        var obj = arr[item];

        for (var prop in obj) {

            if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
                // array - go further down
                if (depth === 0)
                    output += ' | ';
                output += convertArrayToMarkdownTable(obj[prop], depth + 1);
            } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
                // it's an object! loop through the properties
                output += convertObjectToMarkdown(obj[prop], depth + 1);
            } else {
                // not array or an object
                if (depth > 0)
                    output += '<td>' + obj[prop] + '</td>';
                else
                    output += ' | ' + obj[prop];
            }
        }

        // close the row
        if (depth > 0) {
            output += '</tr>'
        } else {
            output += ' |';
            output += '\r\n';
        }
    }

    if (depth > 0) {
        output += '</tbody></table>'

        if (depth > 1)
            output += '</td>';
    }

    return output;
};

var convertObjectToMarkdown = function(obj, depth) {
    var output = '';

    for (var prop in obj) {
        if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
            // array - go further down
            output += convertArrayToMarkdownTable(obj[prop], depth + 1);
        } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
            // the property is an object... we need to go deeper!
            output += convertObjectToMarkdown(obj[prop], depth + 1);
        } else {
            // not array or an object
            output += obj[prop];
        }
    }

    return output;
}

var getHeaderRowAsHtml = function(obj) {
    var output = '<thead><tr>';

    for (var prop in obj) {
        output += '<td>' + prop + '</td>';
    }

    output += '</tr></thead>'

    return output;
}

var getHeaderRow = function(obj) {
    var output = '';

    for (var prop in obj) {
        output += '| ' + prop;
    };
    output += ' | \r\n';

    return output;
};

var getRowSeparator = function(obj) {
    var output = '';

    for (var prop in obj) {
        output += '|---';
    };
    output += ' | \r\n';

    return output;
};