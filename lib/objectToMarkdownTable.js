var moment = require('moment');
var objectToMarkdownTable = require('../lib/objectToMarkdownTable.js');

exports.convertObjectToMarkdownTable = function(obj, depth) {
    var output = '';

    if (!depth)
        depth = 0;

    if (depth > 0) {
        output += '<table>';
        output += getHeaderRowAsHtml(obj);
        output += '<tbody><tr>'
    }
    else {
        output += getHeaderRow(obj);
        output += getRowSeparator(obj);
    }



    for (var prop in obj) {
        if (depth > 0)
            output += '<td>';
        else
            output += ' | ';

        if (Object.prototype.toString.call( obj[prop] ) === '[object Object]' || Object.prototype.toString.call( obj[prop]) === '[object Array]')
            output += this.convertObjectToMarkdownTable(obj[prop], depth + 1);
        else
            output += obj[prop];

        if (depth > 0)
            output += '</td>'
    }

    if (depth > 0)
        output += '</tr></tbody></table>';

    return output;
}

exports.convertObjectToMarkdownList = function(obj, depth) {
    var output = '';

    if (!depth)
        depth = 0;

    if (depth > 0) {
        output += '<ul>';
    }

    for (var prop in obj) {

        if (depth > 0)
            output += '<li>' + prop + ': ';
        else
            output += '* ' + prop + ': ';

        if (Object.prototype.toString.call( obj[prop] ) === '[object Object]' || Object.prototype.toString.call( obj[prop]) === '[object Array]')
            output += this.convertObjectToMarkdownList(obj[prop], depth + 1);
        else
            output += obj[prop];

        if (depth > 0)
            output += '</li>';
        else
            output += '\r\n';

    }

    if (depth > 0) {
        output += '</ul>';
    }

    return output;
};

exports.convertObjectToHtmlTable = function(obj, depth) {
    var output = '';

    output += '<table>'
    output += getHeaderRowAsHtml(obj);
    output += '<tr>';

    for (var prop in obj) {
        output += '<td>';
        if (Object.prototype.toString.call( obj[prop] ) === '[object Object]' || Object.prototype.toString.call( obj[prop]) === '[object Array]')
            output += this.convertObjectToHtmlTable(obj[prop], depth + 1);
        else
            output += obj[prop];
        output += '</td>';
    }

    output += '</tr>';
    output += '</table>';

    return output;
};

exports.convertObjectToHtmlList = function(obj, depth) {
    var output = '';

    output += '<ul>';

    for (var prop in obj) {
        output += '<li>' + prop + ': ';
        if (Object.prototype.toString.call( obj[prop] ) === '[object Object]' || Object.prototype.toString.call( obj[prop]) === '[object Array]')
            output += this.convertObjectToHtmlList(obj[prop], depth + 1);
        else
            output += obj[prop];
        output += '</li>';
    }

    output += '</ul>';
    return output;
}

var getHeaderRowAsHtml = function(obj) {
    var output = '<thead><tr>';

    for (var prop in obj) {
        output += '<th>' + prop + '</th>';
    }

    output += '</tr></thead>'

    return output;
}

var getHeaderRow = function(obj) {
    var output = '';

    for (var prop in obj) {
        output += ' | ' + prop;
    };
    output += ' | \r\n';

    return output;
};

var getRowSeparator = function(obj) {
    var output = '';

    for (var prop in obj) {
        output += '|---';
    };
    output += '| \r\n';

    return output;
};
