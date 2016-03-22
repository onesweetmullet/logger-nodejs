var moment = require('moment');
var objectToMarkdownTable = require('../lib/objectToMarkdownTable.js');

var depth = 0;

exports.convertToMarkdown = function(obj, parentObjectType) {
    var output = '';

    // prepend
    if (parentObjectType === 'object') {
        if (depth > 0) {
            output += '<ul>'
        }
    } else if (parentObjectType === 'array') {
        if (depth > 0) {
            output += '<table><tr>';
        }
    }

    for (var prop in obj) {
        if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
            output += this.convertToMarkdown(obj[prop], 'array');
        } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
            output += this.convertToMarkdown(obj[prop], 'object');
        } else {

            if (parentObjectType === 'object') {
                if (depth > 0) {
                    output += '<li>' + prop + ': ' + obj[prop] + '</li>'
                } else {
                    output += '* ' + prop + ': ' + obj[prop] + '\r\n';
                }
            } else if (parentObjectType === 'array') {
                depth++;
                if (depth > 0) {
                    output += '<td>' + obj[prop] + '</td>';
                } else {
                    output += '| ' + obj[prop];
                }
            }

        }
    }

    if (parentObjectType === 'object') {
        if (depth > 0)
            output += '</ul>'
    } else if (parentObjectType === 'array') {
        if (depth > 0) {
            output += '</tr></tbody></table>';
        } else {
            output += ' | \r\n';
        }
    }

    return output;
}

exports.convertObjectToMarkdown = function(obj, depth) {
    var output = '';

    if (!depth)
        depth = 0;

    if (depth > 0) {
        output += '<ul>';
    }

    for (var prop in obj) {
        if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
            // array - go further down
            output += '\r\n';
            output += this.convertArrayToMarkdownTable(obj[prop], depth);
        } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
            // the property is an object... we need to go deeper!
            output += buildListWithDepth(depth);
            output += prop + ':';
            output += '\r\n';
            output += this.convertObjectToMarkdown(obj[prop], depth + 1);
        } else {
            // not array or an object
            //output += '* ' + prop + ': ' + obj[prop] + '\r\n';

            if (depth > 0) {
                output += '<li>' + prop + ': ' + obj[prop] + '</li>';
            } else {
                output += buildListWithDepth(depth);
                output += prop + ': ' + obj[prop];
                output += ' \r\n';
            }
        }
    }

    if (depth > 0) {
        output += '</ul>'
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
                // the property is an object... we need to go deeper!
                output += buildListWithDepth(depth);
                output += prop + ':';
                output += '\r\n';
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

//exports.convertObjectToMarkdown = function(obj, depth) {
//    var output = '';
//
//    if (!depth)
//        depth = 0;
//
//    if (depth > 0) {
//        output += '<ul>';
//    }
//
//    for (var prop in obj) {
//        if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
//            // array - go further down
//            output += '\r\n';
//            output += this.convertArrayToMarkdownTable(obj[prop], depth);
//        } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
//            // the property is an object... we need to go deeper!
//            output += buildListWithDepth(depth);
//            output += prop + ':';
//            output += '\r\n';
//            output += this.convertObjectToMarkdown(obj[prop], depth + 1);
//        } else {
//            // not array or an object
//            //output += '* ' + prop + ': ' + obj[prop] + '\r\n';
//
//            if (depth > 0) {
//                output += '<li>' + prop + ': ' + obj[prop] + '</li>';
//            } else {
//                output += buildListWithDepth(depth);
//                output += prop + ': ' + obj[prop];
//                output += ' \r\n';
//            }
//        }
//    }
//
//    if (depth > 0) {
//        output += '</ul>'
//    }
//
//    return output;
//}
//
//exports.convertArrayToMarkdownTable = function(arr, depth) {
//    var output = '';
//
//    if (!depth) {
//        depth = 0;
//    }
//
//    if (depth > 0) {
//        if (depth > 1)
//            output += '<td>'
//
//        output += '<table>';
//        output += getHeaderRowAsHtml(arr[0]);
//        output += '<tbody>';
//    } else {
//        // generate the header row
//        output += getHeaderRow(arr[0]);
//
//        // generate a separator row
//        output += getRowSeparator(arr[0]);
//    }
//
//    for (var item in arr) {
//
//        if (depth > 0) {
//            output += '<tr>'
//        }
//
//        var obj = arr[item];
//
//        for (var prop in obj) {
//
//            if( Object.prototype.toString.call( obj[prop] ) === '[object Array]' ) {
//                // array - go further down
//                if (depth === 0)
//                    output += ' | ';
//                output += this.convertArrayToMarkdownTable(obj[prop], depth + 1);
//            } else if (Object.prototype.toString.call( obj[prop] ) === '[object Object]') {
//                // the property is an object... we need to go deeper!
//                output += buildListWithDepth(depth);
//                output += prop + ':';
//                output += '\r\n';
//                output += this.convertObjectToMarkdown(obj[prop], depth + 1);
//            } else {
//                // not array or an object
//                if (depth > 0)
//                    output += '<td>' + obj[prop] + '</td>';
//                else
//                    output += ' | ' + obj[prop];
//            }
//        }
//
//        // close the row
//        if (depth > 0) {
//            output += '</tr>'
//        } else {
//            output += ' |';
//            output += '\r\n';
//        }
//    }
//
//    if (depth > 0) {
//        output += '</tbody></table>'
//
//        if (depth > 1)
//            output += '</td>';
//    }
//
//    return output.toString();
//};


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