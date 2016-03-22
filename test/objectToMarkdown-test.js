var expect = require('chai').expect;
var moment = require('moment');

describe("objectToMarkdown list tests", function() {

    var testObj;
    var numEntries = 10;

    // build out a test object
    before(function() {

        testObj = {
            title:'this is my entry title',
            dateEntered:moment().format('MMMM Do YYYY, h:mm:ss a'),
            message:'this is just a message for the parent object',
            application:'TestApp 2.0',
            items:[],
            items2:[{title:'something here 1', description:'description 1'}, {title:'something here 2', description:'description 2'}]
        };

        for (var i = 0; i < numEntries; i++) {
            testObj.items.push({
                innerObject:{
                    name:'inner object name',
                    description:'inner object description'
                },
                title:'title goes here ' + i,
                dateEntered:moment().format('MMMM Do YYYY, h:mm:ss a'),
                message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                statusCode:1,
                stackTrace:null,
                callingMethod:null
            });
        };
    });

    it("attempt to convert a json object to a MarkDown list", function(done) {
        var output = convertObjectToNestedList(testObj);

        //console.log(output);

        done();
    });
});

var convertObjectToNestedList = function(obj, depth) {
    var output = '';

    if (!depth) {
        depth = 0;
    }

    for (var prop in obj) {
        if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
            // array - go further down
            output += buildListWithDepth(depth);
            output += prop + ': \r\n';

            output += convertObjectToNestedList(obj[prop], depth + 1);
        } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
            output += buildListWithDepth(depth);
            output += prop + ': \r\n';

            // the property is an object... we need to go deeper!
            output += convertObjectToNestedList(obj[prop], depth + 1);
        } else {

            // not array or an object
            output += buildListWithDepth(depth);
            output += prop + ': ' + obj[prop];
            output += ' \r\n';
        }
    }

    return output;
};

var buildListWithDepth = function(depth) {
    var output = '';
    var spaces = depth * 2;

    // not array or an object
    for (var i = 0; i < spaces; i++) {
        output += ' ';
    }

    output += '* ';
    return output;
};


