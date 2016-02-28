# colorWorks.js

colorWorks.js is a library provides nestable color function which can create colorful messages in node.js console.

## Features

- Nestable, you can have yellow in red in green text without considering close other color first.
- Support background color mixed with text color and they will not influence each other.
- Individual configuration.
- Super fast, paid a lot of work on optimization.
- Define your own style easily.

## Install

> npm install colorworks

## Quick example

    'use strict';

	var cw = require('colorworks').create();
	console.info(cw.compile('[[red|This message will be displayed in red.]]'));
	console.info(cw.compile('[[yellow|Only [[red|these three words]] in this sentence will be displayed in red.]]'));
	console.info(cw.compile('[[bgYellow|Background color and [[green|text [[bgBlue|color]]]] will [[bgRed|not]] [[cyan|influence]] each other.]]'));
	cw.setStartTag('--[');
	cw.setMiddleTag('||');
	cw.setEndTag(']--');
	console.info(cw.compile('--[red||You can change the tag so it will fit you better.]--'));
	console.info(cw.compile('[[red|But in this case, the old way will not work.]]'));
	var cw2 = require('colorworks').create();
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
	
After running that, you will get:
![alt tag](http://i.imgur.com/b7B82Xo.png)

## Usage
### Create a colorWorksObj
Actually, this step is really easy, just call `.create()` method.

    var cw = require('colorworks').create();

### Compile a string with color codes
Compile a string to string with color codes.

    var compiled = cw.compile('[[red|This sentence should be red.]]');
    console.info(compiled);

### Modify the tags
Modify the tags so you can create your own colorWorks syntax. This operation only effects current colorWorksObj. So do not worry about other scripts. The one below is a terrible usage. ._.

	cw.setStartTag('NewStartTag');
	cw.setMiddleTag('NewMiddleTag');
	cw.setEndTag('NewEndTag');
	console.info(cw.compile('NewStartTagredNewMiddleTagThis sentence should be red.NewEndTag'));
	
### Enable or disable compile
You can diable the `.compile()` method if you detect the user's console do not support color codes. In this case, `.compile()` will not do anything to the input string. This operation also only effects current colorWorksObj.

    cw.enable();
    cw.disable();
    cw.toggle();
    cw.isActive();
    
### [Advanced] Create your own style
You are able to create your own styles or modify already exist styles by modifing `.codes` property of a colorWorksObj. It only works for current colorWorksObj, too.

    cw.codes.<styleName> = [<nestGroup>, <startCode>, <closeCode>];

#### styleName
The name of the style you want to create or modify.

#### nestGroup
This is the hardest argument to understand. Basically, when a style is applied, colorWorks will put close the last style with same nestGroup. For example, in `cw.compile('[[red|The red line with some [[yellow|yellow stuff]] and some [[bgYellow|yellow-backgrounded stuff]].]]')`, red and yellow are two styles with nestGroup `textColor` while bgYellow with nestGroup `bgColor`.When the compiler's pointer meets the code `yellow`, it will realize that code `red` is in use and `red` is also in nestGroup `textColor`, so it will put `red`'s closeCode first and then yellow's start code. When `yellow`'s end is detected, it will restore red by put `red`'s startTag again. However, when the pointer meets `bgYellow`, it will do nothing since `bgYellow`'s nestGroup is `bgColor`, not `textColor`.

#### startCode
The start code of this style. When this style is applied, we will put startCode there.

#### endCode
The end code of this style, When this style is closed, we will put endCode there.

## Default supported styles
### textColor
- black
- red darkRed
- green darkGreen
- yellow darkYellow
- blue darkBlue
- purple darkPurple
- cyan darkCyan
- white
- normal
- gray

### bgColor
- bgBlack
- bgRed
- bgGreen
- bgYellow
- bgBlue
- bgPurple
- bgCyan
- bgWhite

## License
MIT