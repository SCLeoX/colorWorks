/*
 * There is no license for this file (example.js). You can do whatever you want
 * to this file. :)
 */
 /* jslint node: true */
'use strict';

var cw = require('./colorWorks.js').create();
console.info(cw.compile('[[red|This message will be displayed in red.]]'));
console.info(cw.compile('[[yellow|Only [[red|these three words]] in this sentence will be displayed in red.]]'));
console.info(cw.compile('[[bgYellow|Background color and [[green|text [[bgBlue|color]]]] will [[bgRed|not]] [[cyan|influence]] each other.]]'));
cw.setStartTag('--[');
cw.setMiddleTag('||');
cw.setEndTag(']--');
console.info(cw.compile('--[red||You can change the tag so it will fit you better.]--'));
console.info(cw.compile('[[red|But in this case, the old way will not work.]]'));
var cw2 = require('./colorWorks.js').create();
console.info(cw2.compile('[[red|The good thing is, you can keep two ways at the same time by calling [[yellow|.create()]] again.]]'));
cw2.codes.quote = ['quote', '"', '"'];
console.info(cw2.compile('[[quote|The most amazing thing is that you can create your own style by modify [[yellow|.code]] property.]]'));
console.info(cw2.compile('[[quote|Look, this line and the last line is quoted in quotation marks!]]'));
cw2.disable();
console.info(cw2.compile('[[yellow|You can also disable this library by calling [[red|.disable()]].]]'));
cw2.enable();
console.info(cw2.compile('[[yellow|Same, you can enable this library by calling [[red|.enable()]].]]'));
console.info(cw2.compile(cw2.pack('yellow', 'If you want, you can even use ' + cw2.pack('red', '.pack(codeName, str)') + ' to create not compiled strings.')));
console.info(cw2.compile('[[yellow|Just one hint at last, this library works best with Template Strings in ECMA 6.]]'));