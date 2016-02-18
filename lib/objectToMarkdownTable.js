var moment = require('moment');
var objectToMarkdownTable = require('../lib/objectToMarkdownTable.js');


exports.convertObjectToMarkdown = function(obj, depth) {
    var output = '';

    for (var prop in obj) {
        if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
            // array - go further down
            output += this.convertArrayToMarkdownTable(obj[prop], depth);
        } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
            // the property is an object... we need to go deeper!
            output += this.convertObjectToMarkdown(obj[prop], depth);
        } else {
            // not array or an object
            output += obj[prop];
        }
    }

    return output;
}

exports.convertArrayToMarkdownTable = function(arr, depth) {
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
                output += this.convertArrayToMarkdownTable(obj[prop], depth + 1);
            } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
                // it's an object! loop through the properties
                output += this.convertObjectToMarkdown(obj[prop], depth + 1);
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

    return output.toString();
};


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