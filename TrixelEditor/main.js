(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { x: a[0], y: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.x, r.y]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2], w: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z, r.w]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.m11;
    m[1] = r.m21;
    m[2] = r.m31;
    m[3] = r.m41;
    m[4] = r.m12;
    m[5] = r.m22;
    m[6] = r.m32;
    m[7] = r.m42;
    m[8] = r.m13;
    m[9] = r.m23;
    m[10] = r.m33;
    m[11] = r.m43;
    m[12] = r.m14;
    m[13] = r.m24;
    m[14] = r.m34;
    m[15] = r.m44;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        m11: m[0], m21: m[1], m31: m[2], m41: m[3],
        m12: m[4], m22: m[5], m32: m[6], m42: m[7],
        m13: m[8], m23: m[9], m33: m[10], m43: m[11],
        m14: m[12], m24: m[13], m34: m[14], m44: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});


var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {
  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (cache, setting) {
  var blend = cache.blend;
  blend.toggle = cache.toggle;

  if (!blend.enabled) {
    cache.gl.enable(cache.gl.BLEND);
    blend.enabled = true;
  }

  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  if (blend.a !== setting.a || blend.d !== setting.d) {
    cache.gl.blendEquationSeparate(setting.a, setting.d);
    blend.a = setting.a;
    blend.d = setting.d;
  }
  if (blend.b !== setting.b || blend.c !== setting.c || blend.e !== setting.e || blend.f !== setting.f) {
    cache.gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
    blend.b = setting.b;
    blend.c = setting.c;
    blend.e = setting.e;
    blend.f = setting.f;
  }
  if (blend.g !== setting.g || blend.h !== setting.h || blend.i !== setting.i || blend.j !== setting.j) {
    cache.gl.blendColor(setting.g, setting.h, setting.i, setting.j);
    blend.g = setting.g;
    blend.h = setting.h;
    blend.i = setting.i;
    blend.j = setting.j;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (cache, setting) {
  var depthTest = cache.depthTest;
  depthTest.toggle = cache.toggle;

  if (!depthTest.enabled) {
    cache.gl.enable(cache.gl.DEPTH_TEST);
    depthTest.enabled = true;
  }

  // a    b    c    d
  // func mask near far
  if (depthTest.a !== setting.a) {
    cache.gl.depthFunc(setting.a);
    depthTest.a = setting.a;
  }
  if (depthTest.b !== setting.b) {
    cache.gl.depthMask(setting.b);
    depthTest.b = setting.b;
  }
  if (depthTest.c !== setting.c || depthTest.d !== setting.d) {
    cache.gl.depthRange(setting.c, setting.d);
    depthTest.c = setting.c;
    depthTest.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (cache, setting) {
  var stencilTest = cache.stencilTest;
  stencilTest.toggle = cache.toggle;

  if (!stencilTest.enabled) {
    cache.gl.enable(cache.gl.STENCIL_TEST);
    stencilTest.enabled = true;
  }

  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  if (stencilTest.d !== setting.d || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.FRONT, setting.d, setting.a, setting.b);
    stencilTest.d = setting.d;
    // a and b are set in the cache.gl.BACK diffing because they should be the same
  }
  if (stencilTest.e !== setting.e || stencilTest.f !== setting.f || stencilTest.g !== setting.g) {
    cache.gl.stencilOpSeparate(cache.gl.FRONT, setting.e, setting.f, setting.g);
    stencilTest.e = setting.e;
    stencilTest.f = setting.f;
    stencilTest.g = setting.g;
  }
  if (stencilTest.c !== setting.c) {
    cache.gl.stencilMask(setting.c);
    stencilTest.c = setting.c;
  }
  if (stencilTest.h !== setting.h || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.BACK, setting.h, setting.a, setting.b);
    stencilTest.h = setting.h;
    stencilTest.a = setting.a;
    stencilTest.b = setting.b;
  }
  if (stencilTest.i !== setting.i || stencilTest.j !== setting.j || stencilTest.k !== setting.k) {
    cache.gl.stencilOpSeparate(cache.gl.BACK, setting.i, setting.j, setting.k);
    stencilTest.i = setting.i;
    stencilTest.j = setting.j;
    stencilTest.k = setting.k;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (cache, setting) {
  var scissor = cache.scissor;
  scissor.toggle = cache.toggle;

  if (!scissor.enabled) {
    cache.gl.enable(cache.gl.SCISSOR_TEST);
    scissor.enabled = true;
  }

  if (scissor.a !== setting.a || scissor.b !== setting.b || scissor.c !== setting.c || scissor.d !== setting.d) {
    cache.gl.scissor(setting.a, setting.b, setting.c, setting.d);
    scissor.a = setting.a;
    scissor.b = setting.b;
    scissor.c = setting.c;
    scissor.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (cache, setting) {
  var colorMask = cache.colorMask;
  colorMask.toggle = cache.toggle;
  colorMask.enabled = true;

  if (colorMask.a !== setting.a || colorMask.b !== setting.b || colorMask.c !== setting.c || colorMask.d !== setting.d) {
    cache.gl.colorMask(setting.a, setting.b, setting.c, setting.d);
    colorMask.a = setting.a;
    colorMask.b = setting.b;
    colorMask.c = setting.c;
    colorMask.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (cache, setting) {
  var cullFace = cache.cullFace;
  cullFace.toggle = cache.toggle;

  if (!cullFace.enabled) {
    cache.gl.enable(cache.gl.CULL_FACE);
    cullFace.enabled = true;
  }

  if (cullFace.a !== setting.a) {
    cache.gl.cullFace(setting.a);
    cullFace.a = setting.a;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (cache, setting) {
  var polygonOffset = cache.polygonOffset;
  polygonOffset.toggle = cache.toggle;

  if (!polygonOffset.enabled) {
    cache.gl.enable(cache.gl.POLYGON_OFFSET_FILL);
    polygonOffset.enabled = true;
  }

  if (polygonOffset.a !== setting.a || polygonOffset.b !== setting.b) {
    cache.gl.polygonOffset(setting.a, setting.b);
    polygonOffset.a = setting.a;
    polygonOffset.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (cache, setting) {
  var sampleCoverage = cache.sampleCoverage;
  sampleCoverage.toggle = cache.toggle;

  if (!sampleCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_COVERAGE);
    sampleCoverage.enabled = true;
  }

  if (sampleCoverage.a !== setting.a || sampleCoverage.b !== setting.b) {
    cache.gl.sampleCoverage(setting.a, setting.b);
    sampleCoverage.a = setting.a;
    sampleCoverage.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = function (cache) {
  var sampleAlphaToCoverage = cache.sampleAlphaToCoverage;
  sampleAlphaToCoverage.toggle = cache.toggle;

  if (!sampleAlphaToCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
    sampleAlphaToCoverage.enabled = true;
  }
};

var _WebGL_disableBlend = function (cache) {
  if (cache.blend.enabled) {
    cache.gl.disable(cache.gl.BLEND);
    cache.blend.enabled = false;
  }
};

var _WebGL_disableDepthTest = function (cache) {
  if (cache.depthTest.enabled) {
    cache.gl.disable(cache.gl.DEPTH_TEST);
    cache.depthTest.enabled = false;
  }
};

var _WebGL_disableStencilTest = function (cache) {
  if (cache.stencilTest.enabled) {
    cache.gl.disable(cache.gl.STENCIL_TEST);
    cache.stencilTest.enabled = false;
  }
};

var _WebGL_disableScissor = function (cache) {
  if (cache.scissor.enabled) {
    cache.gl.disable(cache.gl.SCISSOR_TEST);
    cache.scissor.enabled = false;
  }
};

var _WebGL_disableColorMask = function (cache) {
  var colorMask = cache.colorMask;
  if (!colorMask.a || !colorMask.b || !colorMask.c || !colorMask.d) {
    cache.gl.colorMask(true, true, true, true);
    colorMask.a = true;
    colorMask.b = true;
    colorMask.c = true;
    colorMask.d = true;
  }
};

var _WebGL_disableCullFace = function (cache) {
  cache.gl.disable(cache.gl.CULL_FACE);
};

var _WebGL_disablePolygonOffset = function (cache) {
  cache.gl.disable(cache.gl.POLYGON_OFFSET_FILL);
};

var _WebGL_disableSampleCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_COVERAGE);
};

var _WebGL_disableSampleAlphaToCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
};

var _WebGL_settings = ['blend', 'depthTest', 'stencilTest', 'scissor', 'colorMask', 'cullFace', 'polygonOffset', 'sampleCoverage', 'sampleAlphaToCoverage'];
var _WebGL_disableFunctions = [_WebGL_disableBlend, _WebGL_disableDepthTest, _WebGL_disableStencilTest, _WebGL_disableScissor, _WebGL_disableColorMask, _WebGL_disableCullFace, _WebGL_disablePolygonOffset, _WebGL_disableSampleCoverage, _WebGL_disableSampleAlphaToCoverage];

function _WebGL_doCompile(gl, src, type) {
  var shader = gl.createShader(type);
  // Enable OES_standard_derivatives extension
  gl.shaderSource(shader, '#extension GL_OES_standard_derivatives : enable\n' + src);
  gl.compileShader(shader);
  return shader;
}

function _WebGL_doLink(gl, vshader, fshader) {
  var program = gl.createProgram();

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw ('Link failed: ' + gl.getProgramInfoLog(program) +
      '\nvs info-log: ' + gl.getShaderInfoLog(vshader) +
      '\nfs info-log: ' + gl.getShaderInfoLog(fshader));
  }

  return program;
}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_MAT4:
      return { size: 4, arraySize: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, arraySize: 1, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.elemSize;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var dataOffset = attributeInfo.size * attributeInfo.arraySize * elemSize;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * dataOffset);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size * attributeInfo.arraySize, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += dataOffset;
  }, mesh.b);

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer|null} buffer.indexBuffer - optional index buffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  if (mesh.a.indexSize > 0) {
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.indexSize);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.elemSize * _WebGL_listLength(mesh.b),
      indexBuffer: null,
      buffers: {}
    };
  }
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint32Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint32Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {
  var cache = model.f;
  var gl = cache.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  if (!cache.depthTest.b) {
    gl.depthMask(true);
    cache.depthTest.b = true;
  }
  if (cache.stencilTest.c !== cache.STENCIL_WRITEMASK) {
    gl.stencilMask(cache.STENCIL_WRITEMASK);
    cache.stencilTest.c = cache.STENCIL_WRITEMASK;
  }
  _WebGL_disableScissor(cache);
  _WebGL_disableColorMask(cache);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    var i;

    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = cache.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = cache.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        cache.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = cache.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        cache.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        currentUniforms: {},
        activeAttributes: [],
        activeAttributeLocations: []
      };

      program.uniformSetters = _WebGL_createUniformSetters(
        gl,
        model,
        program,
        Object.assign({}, entity.b.uniforms, entity.c.uniforms)
      );

      var numActiveAttributes = gl.getProgramParameter(glProgram, gl.ACTIVE_ATTRIBUTES);
      for (i = 0; i < numActiveAttributes; i++) {
        var attribute = gl.getActiveAttrib(glProgram, i);
        var attribLocation = gl.getAttribLocation(glProgram, attribute.name);
        program.activeAttributes.push(attribute);
        program.activeAttributeLocations.push(attribLocation);
      }

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      cache.programs[progid] = program;
    }

    if (cache.lastProgId !== progid) {
      gl.useProgram(program.glProgram);
      cache.lastProgId = progid;
    }

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = cache.buffers.get(entity.d);

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      cache.buffers.set(entity.d, buffer);
    }

    for (i = 0; i < program.activeAttributes.length; i++) {
      attribute = program.activeAttributes[i];
      attribLocation = program.activeAttributeLocations[i];

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffers[attribute.name]);

      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);
      if (attributeInfo.arraySize === 1) {
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      } else {
        // Point to four vec4 in case of mat4
        var offset = attributeInfo.size * 4; // float32 takes 4 bytes
        var stride = offset * attributeInfo.arraySize;
        for (var m = 0; m < attributeInfo.arraySize; m++) {
          gl.enableVertexAttribArray(attribLocation + m);
          gl.vertexAttribPointer(attribLocation + m, attributeInfo.size, attributeInfo.baseType, false, stride, offset * m);
        }
      }
    }

    // Apply all the new settings
    cache.toggle = !cache.toggle;
    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$enableSetting(cache), entity.a);
    // Disable the settings that were applied in the previous draw call
    for (i = 0; i < _WebGL_settings.length; i++) {
      var setting = cache[_WebGL_settings[i]];
      if (setting.toggle !== cache.toggle && setting.enabled) {
        _WebGL_disableFunctions[i](cache);
        setting.enabled = false;
        setting.toggle = cache.toggle;
      }
    }

    if (buffer.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);
      gl.drawElements(entity.d.a.mode, buffer.numIndices, gl.UNSIGNED_INT, 0);
    } else {
      gl.drawArrays(entity.d.a.mode, 0, buffer.numIndices);
    }
  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var glProgram = program.glProgram;
  var currentUniforms = program.currentUniforms;
  var textureCounter = 0;
  var cache = model.f;
  function createUniformSetter(glProgram, uniform) {
    var uniformName = uniform.name;
    var uniformLocation = gl.getUniformLocation(glProgram, uniformName);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1f(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform2f(uniformLocation, value[0], value[1]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform3f(uniformLocation, value[0], value[1], value[2]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform4f(uniformLocation, value[0], value[1], value[2], value[3]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
            currentUniforms[uniformName] = value;
          }
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = cache.textures.get(texture);
          if (!tex) {
            tex = texture.createTexture(gl);
            cache.textures.set(texture, tex);
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          if (currentUniforms[uniformName] !== texture) {
            gl.uniform1i(uniformLocation, currentTexture);
            currentUniforms[uniformName] = texture;
          }
        };
      case gl.BOOL:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      default:
        return function () { };
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(glProgram, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(glProgram, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePreserveDrawingBuffer = F2(function (options, option) {
  options.contextAttributes.preserveDrawingBuffer = true;
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2($elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl && typeof WeakMap !== 'undefined') {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });

    // Activate extensions
    gl.getExtension('OES_standard_derivatives');
    gl.getExtension('OES_element_index_uint');

    model.f.gl = gl;

    // Cache the current settings in order to diff them to avoid redundant calls
    // https://emscripten.org/docs/optimizing/Optimizing-WebGL.html#avoid-redundant-calls
    model.f.toggle = false; // used to diff the settings from the previous and current draw calls
    model.f.blend = { enabled: false, toggle: false };
    model.f.depthTest = { enabled: false, toggle: false };
    model.f.stencilTest = { enabled: false, toggle: false };
    model.f.scissor = { enabled: false, toggle: false };
    model.f.colorMask = { enabled: false, toggle: false };
    model.f.cullFace = { enabled: false, toggle: false };
    model.f.polygonOffset = { enabled: false, toggle: false };
    model.f.sampleCoverage = { enabled: false, toggle: false };
    model.f.sampleAlphaToCoverage = { enabled: false, toggle: false };

    model.f.shaders = [];
    model.f.programs = {};
    model.f.lastProgId = null;
    model.f.buffers = new WeakMap();
    model.f.textures = new WeakMap();
    // Memorize the initial stencil write mask, because
    // browsers may have different number of stencil bits
    model.f.STENCIL_WRITEMASK = gl.getParameter(gl.STENCIL_WRITEMASK);

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet
    _WebGL_rAF(function () {
      return A2(_WebGL_drawGL, model, canvas);
    });

  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $author$project$TrixelEditor$ColorPalette$Magma = {$: 'Magma'};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $turboMaCk$any_dict$Dict$Any$AnyDict = function (a) {
	return {$: 'AnyDict', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $turboMaCk$any_dict$Dict$Any$empty = function (toKey) {
	return $turboMaCk$any_dict$Dict$Any$AnyDict(
		{dict: $elm$core$Dict$empty, toKey: toKey});
};
var $author$project$TrixelEditor$TrixelGrid$Face$toComparable = function (_v0) {
	var lr = _v0.a;
	var u = _v0.b;
	var v = _v0.c;
	return _Utils_Tuple2(
		_Utils_Tuple2(u, v),
		function () {
			if (lr.$ === 'L') {
				return 0;
			} else {
				return 1;
			}
		}());
};
var $author$project$TrixelEditor$World$empty = {
	backgroundColorIndex: 150,
	palette: $author$project$TrixelEditor$ColorPalette$Magma,
	trixels: $turboMaCk$any_dict$Dict$Any$empty($author$project$TrixelEditor$TrixelGrid$Face$toComparable)
};
var $author$project$Levels$Levels = function (a) {
	return {$: 'Levels', a: a};
};
var $author$project$SelectList$SelectList = function (a) {
	return {$: 'SelectList', a: a};
};
var $author$project$SelectList$init = function (_v0) {
	var first = _v0.a;
	var rest = _v0.b;
	return $author$project$SelectList$SelectList(
		{after: rest, beforeReversed: _List_Nil, current: first});
};
var $author$project$Levels$init = F4(
	function (encodeLevel, levelDecoder, first, rest) {
		return $author$project$Levels$Levels(
			{
				encodeLevel: encodeLevel,
				levelDecoder: levelDecoder,
				selectList: $author$project$SelectList$init(
					_Utils_Tuple2(first, rest)),
				textAreaContentForExportingJson: '',
				textAreaContentForImportingJson: ''
			});
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $author$project$TrixelEditor$Main$init = function (computer) {
	return {
		editorIsOn: true,
		pages: A4(
			$author$project$Levels$init,
			$elm$core$Basics$always(
				$elm$json$Json$Encode$string('')),
			$elm$json$Json$Decode$succeed($author$project$TrixelEditor$World$empty),
			{level: $author$project$TrixelEditor$World$empty, name: '1'},
			_List_Nil),
		pointerOveredUV: {u: 0, v: 0},
		selectedColorIndex: 0
	};
};
var $author$project$Playground$Configurations$Block = F2(
	function (name, configs) {
		return {configs: configs, name: name};
	});
var $author$project$Playground$Configurations$configBlock = F2(
	function (name, configList) {
		return A2($author$project$Playground$Configurations$Block, name, configList);
	});
var $author$project$Play$configBlock = $author$project$Playground$Configurations$configBlock;
var $author$project$Playground$Configurations$FloatConfig = F2(
	function (a, b) {
		return {$: 'FloatConfig', a: a, b: b};
	});
var $author$project$Play$floatConfig = F3(
	function (name, _v0, value) {
		var min = _v0.a;
		var max = _v0.b;
		return _Utils_Tuple2(
			name,
			A2(
				$author$project$Playground$Configurations$FloatConfig,
				_Utils_Tuple2(min, max),
				value));
	});
var $author$project$TrixelEditor$Main$initialConfigurations = _List_fromArray(
	[
		A2(
		$author$project$Play$configBlock,
		'Parameters',
		_List_fromArray(
			[
				A3(
				$author$project$Play$floatConfig,
				'camera distance',
				_Utils_Tuple2(5, 80),
				10),
				A3(
				$author$project$Play$floatConfig,
				'trixel scale',
				_Utils_Tuple2(0.5, 1),
				1)
			]))
	]);
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Play$FromApp = function (a) {
	return {$: 'FromApp', a: a};
};
var $author$project$Play$ShowingNothing = {$: 'ShowingNothing'};
var $author$project$Playground$Senso$initSensoPress = {f: 0, x: 0, y: 0};
var $author$project$Playground$Senso$init = {
	center: $author$project$Playground$Senso$initSensoPress,
	down: $author$project$Playground$Senso$initSensoPress,
	left: $author$project$Playground$Senso$initSensoPress,
	right: $author$project$Playground$Senso$initSensoPress,
	target: {center: $author$project$Playground$Senso$initSensoPress, down: $author$project$Playground$Senso$initSensoPress, left: $author$project$Playground$Senso$initSensoPress, right: $author$project$Playground$Senso$initSensoPress, up: $author$project$Playground$Senso$initSensoPress},
	up: $author$project$Playground$Senso$initSensoPress
};
var $author$project$Playground$Computer$Android = {$: 'Android'};
var $author$project$Playground$Computer$Ios = {$: 'Ios'};
var $author$project$Playground$Computer$Linux = {$: 'Linux'};
var $author$project$Playground$Computer$Mac = {$: 'Mac'};
var $author$project$Playground$Computer$UnknownOperatingSystem = {$: 'UnknownOperatingSystem'};
var $author$project$Playground$Computer$Windows = {$: 'Windows'};
var $author$project$Playground$Computer$operatingSystemFromString = function (str) {
	switch (str) {
		case 'windows':
			return $author$project$Playground$Computer$Windows;
		case 'mac':
			return $author$project$Playground$Computer$Mac;
		case 'linux':
			return $author$project$Playground$Computer$Linux;
		case 'android':
			return $author$project$Playground$Computer$Android;
		case 'ios':
			return $author$project$Playground$Computer$Ios;
		default:
			return $author$project$Playground$Computer$UnknownOperatingSystem;
	}
};
var $author$project$Playground$Computer$init = F2(
	function (initialConfigurations, inputs) {
		return {
			boundingClientRects: _List_Nil,
			clock: inputs.clock,
			configurations: initialConfigurations,
			devicePixelRatio: inputs.devicePixelRatio,
			dt: inputs.dt,
			keyboard: inputs.keyboard,
			operatingSystem: $author$project$Playground$Computer$operatingSystemFromString(inputs.operatingSystem),
			pointer: inputs.pointer,
			screen: inputs.screen,
			senso: $author$project$Playground$Senso$init,
			wheel: inputs.wheel
		};
	});
var $author$project$Playground$Tape$Recording = {$: 'Recording'};
var $author$project$Playground$Tape$Tape = F2(
	function (a, b) {
		return {$: 'Tape', a: a, b: b};
	});
var $author$project$SelectList$singleton = function (el) {
	return $author$project$SelectList$init(
		_Utils_Tuple2(el, _List_Nil));
};
var $author$project$Playground$Tape$init = F2(
	function (initialComputer, initialAppModel) {
		return A2(
			$author$project$Playground$Tape$Tape,
			$author$project$Playground$Tape$Recording,
			$author$project$SelectList$singleton(
				_Utils_Tuple2(initialComputer, initialAppModel)));
	});
var $author$project$Playground$Tape$NoTape = {$: 'NoTape'};
var $author$project$Playground$Tape$initNoTape = F2(
	function (initialComputer, initialAppModel) {
		return A2(
			$author$project$Playground$Tape$Tape,
			$author$project$Playground$Tape$NoTape,
			$author$project$SelectList$singleton(
				_Utils_Tuple2(initialComputer, initialAppModel)));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Play$init = F2(
	function (app, flags) {
		var initialComputer = A2($author$project$Playground$Computer$init, app.initialConfigurations, flags.inputs);
		var _v0 = app.init(initialComputer);
		var initialAppModel = _v0.a;
		var initialAppCmd = _v0.b;
		return _Utils_Tuple2(
			{
				distractionFree: true,
				leftBarState: $author$project$Play$ShowingNothing,
				tape: A2(
					app.hasTape ? $author$project$Playground$Tape$init : $author$project$Playground$Tape$initNoTape,
					initialComputer,
					initialAppModel)
			},
			A2($elm$core$Platform$Cmd$map, $author$project$Play$FromApp, initialAppCmd));
	});
var $author$project$Play$InputsArrived = function (a) {
	return {$: 'InputsArrived', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$SelectList$getCurrent = function (_v0) {
	var p = _v0.a;
	return p.current;
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Playground$Tape$currentAppModel = function (_v0) {
	var timeline = _v0.b;
	return $author$project$SelectList$getCurrent(timeline).b;
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Play$tick = _Platform_incomingPort(
	'tick',
	A2(
		$elm$json$Json$Decode$andThen,
		function (wheel) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (sensoState) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (screen) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (pointer) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (operatingSystem) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (keyboard) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (dt) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (devicePixelRatio) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (clock) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (boundingClientRects) {
																					return $elm$json$Json$Decode$succeed(
																						{boundingClientRects: boundingClientRects, clock: clock, devicePixelRatio: devicePixelRatio, dt: dt, keyboard: keyboard, operatingSystem: operatingSystem, pointer: pointer, screen: screen, sensoState: sensoState, wheel: wheel});
																				},
																				A2(
																					$elm$json$Json$Decode$field,
																					'boundingClientRects',
																					$elm$json$Json$Decode$list(
																						A2(
																							$elm$json$Json$Decode$andThen,
																							function (id) {
																								return A2(
																									$elm$json$Json$Decode$andThen,
																									function (boundingClientRect) {
																										return $elm$json$Json$Decode$succeed(
																											{boundingClientRect: boundingClientRect, id: id});
																									},
																									A2(
																										$elm$json$Json$Decode$field,
																										'boundingClientRect',
																										A2(
																											$elm$json$Json$Decode$andThen,
																											function (top) {
																												return A2(
																													$elm$json$Json$Decode$andThen,
																													function (right) {
																														return A2(
																															$elm$json$Json$Decode$andThen,
																															function (left) {
																																return A2(
																																	$elm$json$Json$Decode$andThen,
																																	function (bottom) {
																																		return $elm$json$Json$Decode$succeed(
																																			{bottom: bottom, left: left, right: right, top: top});
																																	},
																																	A2($elm$json$Json$Decode$field, 'bottom', $elm$json$Json$Decode$float));
																															},
																															A2($elm$json$Json$Decode$field, 'left', $elm$json$Json$Decode$float));
																													},
																													A2($elm$json$Json$Decode$field, 'right', $elm$json$Json$Decode$float));
																											},
																											A2($elm$json$Json$Decode$field, 'top', $elm$json$Json$Decode$float))));
																							},
																							A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string)))));
																		},
																		A2($elm$json$Json$Decode$field, 'clock', $elm$json$Json$Decode$float));
																},
																A2($elm$json$Json$Decode$field, 'devicePixelRatio', $elm$json$Json$Decode$float));
														},
														A2($elm$json$Json$Decode$field, 'dt', $elm$json$Json$Decode$float));
												},
												A2(
													$elm$json$Json$Decode$field,
													'keyboard',
													A2(
														$elm$json$Json$Decode$andThen,
														function (up) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (shift) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (right) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (pressedKeys) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (left) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (downs) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (down) {
																											return A2(
																												$elm$json$Json$Decode$andThen,
																												function (control) {
																													return A2(
																														$elm$json$Json$Decode$andThen,
																														function (alt) {
																															return $elm$json$Json$Decode$succeed(
																																{alt: alt, control: control, down: down, downs: downs, left: left, pressedKeys: pressedKeys, right: right, shift: shift, up: up});
																														},
																														A2($elm$json$Json$Decode$field, 'alt', $elm$json$Json$Decode$bool));
																												},
																												A2($elm$json$Json$Decode$field, 'control', $elm$json$Json$Decode$bool));
																										},
																										A2($elm$json$Json$Decode$field, 'down', $elm$json$Json$Decode$bool));
																								},
																								A2(
																									$elm$json$Json$Decode$field,
																									'downs',
																									$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
																						},
																						A2($elm$json$Json$Decode$field, 'left', $elm$json$Json$Decode$bool));
																				},
																				A2(
																					$elm$json$Json$Decode$field,
																					'pressedKeys',
																					$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
																		},
																		A2($elm$json$Json$Decode$field, 'right', $elm$json$Json$Decode$bool));
																},
																A2($elm$json$Json$Decode$field, 'shift', $elm$json$Json$Decode$bool));
														},
														A2($elm$json$Json$Decode$field, 'up', $elm$json$Json$Decode$bool))));
										},
										A2($elm$json$Json$Decode$field, 'operatingSystem', $elm$json$Json$Decode$string));
								},
								A2(
									$elm$json$Json$Decode$field,
									'pointer',
									A2(
										$elm$json$Json$Decode$andThen,
										function (y) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (x) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (up) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (rightUp) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (rightDown) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (move) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (isDown) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (elementIdsForLastDown) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (down) {
																											return $elm$json$Json$Decode$succeed(
																												{down: down, elementIdsForLastDown: elementIdsForLastDown, isDown: isDown, move: move, rightDown: rightDown, rightUp: rightUp, up: up, x: x, y: y});
																										},
																										A2($elm$json$Json$Decode$field, 'down', $elm$json$Json$Decode$bool));
																								},
																								A2(
																									$elm$json$Json$Decode$field,
																									'elementIdsForLastDown',
																									$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
																						},
																						A2($elm$json$Json$Decode$field, 'isDown', $elm$json$Json$Decode$bool));
																				},
																				A2($elm$json$Json$Decode$field, 'move', $elm$json$Json$Decode$bool));
																		},
																		A2($elm$json$Json$Decode$field, 'rightDown', $elm$json$Json$Decode$bool));
																},
																A2($elm$json$Json$Decode$field, 'rightUp', $elm$json$Json$Decode$bool));
														},
														A2($elm$json$Json$Decode$field, 'up', $elm$json$Json$Decode$bool));
												},
												A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
										},
										A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
						},
						A2(
							$elm$json$Json$Decode$field,
							'screen',
							A2(
								$elm$json$Json$Decode$andThen,
								function (width) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (height) {
											return $elm$json$Json$Decode$succeed(
												{height: height, width: width});
										},
										A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$float));
								},
								A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$float))));
				},
				A2(
					$elm$json$Json$Decode$field,
					'sensoState',
					A2(
						$elm$json$Json$Decode$andThen,
						function (up) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (right) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (left) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (down) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (center) {
															return $elm$json$Json$Decode$succeed(
																{center: center, down: down, left: left, right: right, up: up});
														},
														A2(
															$elm$json$Json$Decode$field,
															'center',
															A2(
																$elm$json$Json$Decode$andThen,
																function (y) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (x) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (f) {
																					return $elm$json$Json$Decode$succeed(
																						{f: f, x: x, y: y});
																				},
																				A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
																		},
																		A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
																},
																A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
												},
												A2(
													$elm$json$Json$Decode$field,
													'down',
													A2(
														$elm$json$Json$Decode$andThen,
														function (y) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (x) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (f) {
																			return $elm$json$Json$Decode$succeed(
																				{f: f, x: x, y: y});
																		},
																		A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
																},
																A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
														},
														A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
										},
										A2(
											$elm$json$Json$Decode$field,
											'left',
											A2(
												$elm$json$Json$Decode$andThen,
												function (y) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (x) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (f) {
																	return $elm$json$Json$Decode$succeed(
																		{f: f, x: x, y: y});
																},
																A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
														},
														A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
												},
												A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
								},
								A2(
									$elm$json$Json$Decode$field,
									'right',
									A2(
										$elm$json$Json$Decode$andThen,
										function (y) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (x) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (f) {
															return $elm$json$Json$Decode$succeed(
																{f: f, x: x, y: y});
														},
														A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
												},
												A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
										},
										A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
						},
						A2(
							$elm$json$Json$Decode$field,
							'up',
							A2(
								$elm$json$Json$Decode$andThen,
								function (y) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (x) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (f) {
													return $elm$json$Json$Decode$succeed(
														{f: f, x: x, y: y});
												},
												A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
										},
										A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
								},
								A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))))));
		},
		A2(
			$elm$json$Json$Decode$field,
			'wheel',
			A2(
				$elm$json$Json$Decode$andThen,
				function (pinchScaleForSafari) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (pinchDeltaForChrome) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (elementIdsForLastWheel) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (deltaY) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (deltaX) {
													return $elm$json$Json$Decode$succeed(
														{deltaX: deltaX, deltaY: deltaY, elementIdsForLastWheel: elementIdsForLastWheel, pinchDeltaForChrome: pinchDeltaForChrome, pinchScaleForSafari: pinchScaleForSafari});
												},
												A2($elm$json$Json$Decode$field, 'deltaX', $elm$json$Json$Decode$float));
										},
										A2($elm$json$Json$Decode$field, 'deltaY', $elm$json$Json$Decode$float));
								},
								A2(
									$elm$json$Json$Decode$field,
									'elementIdsForLastWheel',
									$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
						},
						A2($elm$json$Json$Decode$field, 'pinchDeltaForChrome', $elm$json$Json$Decode$float));
				},
				A2(
					$elm$json$Json$Decode$field,
					'pinchScaleForSafari',
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
								A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$float)
							])))))));
var $author$project$Play$subscriptions = F2(
	function (app, model) {
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					$author$project$Play$tick($author$project$Play$InputsArrived),
					A2(
					$elm$core$Platform$Sub$map,
					$author$project$Play$FromApp,
					app.subscriptions(
						$author$project$Playground$Tape$currentAppModel(model.tape)))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles = function (a) {
	return {$: 'UnscopedStyles', a: a};
};
var $elm$core$String$cons = _String_cons;
var $robinheghan$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $robinheghan$murmur3$Murmur3$c1 = 3432918353;
var $robinheghan$murmur3$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $robinheghan$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$or = _Bitwise_or;
var $robinheghan$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $robinheghan$murmur3$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$robinheghan$murmur3$Murmur3$multiplyBy,
		$robinheghan$murmur3$Murmur3$c2,
		A2(
			$robinheghan$murmur3$Murmur3$rotlBy,
			15,
			A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $robinheghan$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$robinheghan$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				$robinheghan$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$robinheghan$murmur3$Murmur3$multiplyBy,
					$robinheghan$murmur3$Murmur3$c2,
					A2(
						$robinheghan$murmur3$Murmur3$rotlBy,
						15,
						A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var $robinheghan$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($robinheghan$murmur3$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $robinheghan$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return $robinheghan$murmur3$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$robinheghan$murmur3$Murmur3$hashFold,
				A4($robinheghan$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$initialSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($robinheghan$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$initialSeed, str)));
};
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				return styles;
			} else {
				return A3(
					$elm$core$Dict$insert,
					cssTemplate,
					$rtfeldman$elm_css$Hash$fromString(cssTemplate),
					styles);
			}
		} else {
			return styles;
		}
	});
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string(classname));
			} else {
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string('_unstyled'));
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', classname);
			} else {
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', '_unstyled');
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin = '\u0007';
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration = F3(
	function (template, classname, declaration) {
		return declaration + ('\n' + A3($elm$core$String$replace, $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, classname, template));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return A3($elm$core$Dict$foldl, $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration, '', dict);
};
var $rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration = F2(
	function (scopingPrefix, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (template, classname, declaration) {
					return declaration + ('\n' + A3($elm$core$String$replace, '.' + $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, '#' + (scopingPrefix + ('.' + classname)), template));
				}),
			'',
			dict);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = F2(
	function (maybeNonce, accumulatedStyles) {
		var cssText = function () {
			if (accumulatedStyles.$ === 'UnscopedStyles') {
				var allStyles = accumulatedStyles.a;
				return $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(allStyles);
			} else {
				var scope = accumulatedStyles.a.a;
				var rootStyles = accumulatedStyles.b;
				var descendantStyles = accumulatedStyles.c;
				return A2($rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration, scope, rootStyles) + ('\n' + A2($rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration, scope + ' ', descendantStyles));
			}
		}();
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			'span',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'style', 'display: none;'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'class', 'elm-css-style-wrapper')
				]),
			_List_fromArray(
				[
					A3(
					$elm$virtual_dom$VirtualDom$node,
					'style',
					function () {
						if (maybeNonce.$ === 'Just') {
							var nonce = maybeNonce.a.a;
							return _List_fromArray(
								[
									A2($elm$virtual_dom$VirtualDom$attribute, 'nonce', nonce)
								]);
						} else {
							return _List_Nil;
						}
					}(),
					$elm$core$List$singleton(
						$elm$virtual_dom$VirtualDom$text(cssText)))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F4(
	function (maybeNonce, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2(
			$rtfeldman$elm_css$VirtualDom$Styled$toStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles));
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F3(
	function (maybeNonce, accumulatedStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, accumulatedStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F4(
	function (maybeNonce, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3(
			$rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles),
			keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F5(
	function (maybeNonce, ns, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3(
			$rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles),
			keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F5(
	function (maybeNonce, ns, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2(
			$rtfeldman$elm_css$VirtualDom$Styled$toStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles));
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyle, $elm$core$Maybe$Nothing, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, $elm$core$Maybe$Nothing, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Playground$Tape$Message = function (a) {
	return {$: 'Message', a: a};
};
var $author$project$SelectList$setCurrent = F2(
	function (newCurrent, _v0) {
		var p = _v0.a;
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{current: newCurrent}));
	});
var $author$project$Playground$Tape$updateOnAppMsg = F3(
	function (updateApp, appMsg, _v0) {
		var state = _v0.a;
		var timeLine = _v0.b;
		var _v1 = $author$project$SelectList$getCurrent(timeLine);
		var computer = _v1.a;
		var appModel = _v1.b;
		var _v2 = A3(
			updateApp,
			computer,
			$author$project$Playground$Tape$Message(appMsg),
			appModel);
		var newAppModel = _v2.a;
		var cmd = _v2.b;
		return _Utils_Tuple2(
			A2(
				$author$project$Playground$Tape$Tape,
				state,
				A2(
					$author$project$SelectList$setCurrent,
					_Utils_Tuple2(computer, newAppModel),
					timeLine)),
			cmd);
	});
var $author$project$Playground$Tape$Paused = {$: 'Paused'};
var $author$project$Playground$Tape$Playing = function (a) {
	return {$: 'Playing', a: a};
};
var $author$project$Playground$Tape$Tick = {$: 'Tick'};
var $author$project$SelectList$add = F2(
	function (a, _v0) {
		var p = _v0.a;
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{
					beforeReversed: A2($elm$core$List$cons, p.current, p.beforeReversed),
					current: a
				}));
	});
var $author$project$Playground$Tape$currentComputer = function (_v0) {
	var timeline = _v0.b;
	return $author$project$SelectList$getCurrent(timeline).a;
};
var $author$project$SelectList$goToNext = function (_v0) {
	var p = _v0.a;
	var _v1 = p.after;
	if (_v1.b) {
		var nextLevel = _v1.a;
		var rest = _v1.b;
		return $author$project$SelectList$SelectList(
			{
				after: rest,
				beforeReversed: A2($elm$core$List$cons, p.current, p.beforeReversed),
				current: nextLevel
			});
	} else {
		return $author$project$SelectList$SelectList(p);
	}
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$SelectList$isAtEnd = function (_v0) {
	var p = _v0.a;
	return $elm$core$List$isEmpty(p.after);
};
var $author$project$Playground$Tape$goToNext = function (_v0) {
	var state = _v0.a;
	var timeline = _v0.b;
	return $author$project$SelectList$isAtEnd(timeline) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
		A2(
			$author$project$Playground$Tape$Tape,
			state,
			$author$project$SelectList$goToNext(timeline)));
};
var $author$project$SelectList$removeAfter = function (_v0) {
	var p = _v0.a;
	return $author$project$SelectList$SelectList(
		_Utils_update(
			p,
			{after: _List_Nil}));
};
var $author$project$Playground$Senso$lerpTo = F2(
	function (target, current) {
		var interpolationFactor = 0.3;
		return {f: current.f + ((target.f - current.f) * interpolationFactor), x: current.x + ((target.x - current.x) * interpolationFactor), y: current.y + ((target.y - current.y) * interpolationFactor)};
	});
var $author$project$Playground$Senso$normalizeCoordinates = function (_v0) {
	var x = _v0.x;
	var y = _v0.y;
	var f = _v0.f;
	return {f: f, x: ((x / 3) * 2) - 1, y: -(((y / 3) * 2) - 1)};
};
var $author$project$Playground$Senso$update = F2(
	function (sensoState, senso) {
		return {
			center: A2(
				$author$project$Playground$Senso$lerpTo,
				sensoState.center,
				$author$project$Playground$Senso$normalizeCoordinates(senso.center)),
			down: A2(
				$author$project$Playground$Senso$lerpTo,
				sensoState.down,
				$author$project$Playground$Senso$normalizeCoordinates(senso.down)),
			left: A2(
				$author$project$Playground$Senso$lerpTo,
				sensoState.left,
				$author$project$Playground$Senso$normalizeCoordinates(senso.left)),
			right: A2(
				$author$project$Playground$Senso$lerpTo,
				sensoState.right,
				$author$project$Playground$Senso$normalizeCoordinates(senso.right)),
			target: sensoState,
			up: A2(
				$author$project$Playground$Senso$lerpTo,
				sensoState.up,
				$author$project$Playground$Senso$normalizeCoordinates(senso.up))
		};
	});
var $author$project$Playground$Computer$tick = F2(
	function (inputs, computer) {
		return _Utils_update(
			computer,
			{
				boundingClientRects: inputs.boundingClientRects,
				clock: computer.clock + inputs.dt,
				devicePixelRatio: inputs.devicePixelRatio,
				dt: inputs.dt,
				keyboard: inputs.keyboard,
				pointer: inputs.pointer,
				screen: inputs.screen,
				senso: A2($author$project$Playground$Senso$update, inputs.sensoState, computer.senso),
				wheel: inputs.wheel
			});
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Playground$Tape$updateOnTick = F3(
	function (updateApp, inputs, tape) {
		var state = tape.a;
		var timeLine = tape.b;
		switch (state.$) {
			case 'Paused':
				return _Utils_Tuple2(tape, $elm$core$Platform$Cmd$none);
			case 'Playing':
				var tapeClock = state.a.tapeClock;
				return _Utils_Tuple2(
					((_Utils_cmp(
						tapeClock + inputs.dt,
						$author$project$Playground$Tape$currentComputer(tape).clock) > 0) ? A2(
						$elm$core$Basics$composeR,
						$author$project$Playground$Tape$goToNext,
						$elm$core$Maybe$withDefault(
							A2($author$project$Playground$Tape$Tape, $author$project$Playground$Tape$Paused, timeLine))) : $elm$core$Basics$identity)(
						A2(
							$author$project$Playground$Tape$Tape,
							$author$project$Playground$Tape$Playing(
								{tapeClock: tapeClock + inputs.dt}),
							timeLine)),
					$elm$core$Platform$Cmd$none);
			case 'Recording':
				var _v1 = $author$project$SelectList$getCurrent(timeLine);
				var lastComputer = _v1.a;
				var lastAppModel = _v1.b;
				var newComputer = A2($author$project$Playground$Computer$tick, inputs, lastComputer);
				var _v2 = A3(updateApp, newComputer, $author$project$Playground$Tape$Tick, lastAppModel);
				var newAppModel = _v2.a;
				var cmd = _v2.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Playground$Tape$Tape,
						$author$project$Playground$Tape$Recording,
						$author$project$SelectList$removeAfter(
							A2(
								$author$project$SelectList$add,
								_Utils_Tuple2(newComputer, newAppModel),
								timeLine))),
					cmd);
			default:
				var _v3 = $author$project$SelectList$getCurrent(timeLine);
				var lastComputer = _v3.a;
				var lastAppModel = _v3.b;
				var newComputer = A2($author$project$Playground$Computer$tick, inputs, lastComputer);
				var _v4 = A3(updateApp, newComputer, $author$project$Playground$Tape$Tick, lastAppModel);
				var newAppModel = _v4.a;
				var cmd = _v4.b;
				return _Utils_Tuple2(
					A2(
						$author$project$Playground$Tape$Tape,
						$author$project$Playground$Tape$NoTape,
						A2(
							$author$project$SelectList$setCurrent,
							_Utils_Tuple2(newComputer, newAppModel),
							timeLine)),
					cmd);
		}
	});
var $author$project$Play$handleAppUpdate = F3(
	function (app, msg, model) {
		switch (msg.$) {
			case 'FromApp':
				var appMsg = msg.a;
				var _v1 = A3($author$project$Playground$Tape$updateOnAppMsg, app.update, appMsg, model.tape);
				var newTape = _v1.a;
				var appCmd = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{tape: newTape}),
					A2($elm$core$Platform$Cmd$map, $author$project$Play$FromApp, appCmd));
			case 'InputsArrived':
				var inputs = msg.a;
				var _v2 = A3($author$project$Playground$Tape$updateOnTick, app.update, inputs, model.tape);
				var newTape = _v2.a;
				var appCmd = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{tape: newTape}),
					A2($elm$core$Platform$Cmd$map, $author$project$Play$FromApp, appCmd));
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Play$handleClickOnDistractionFreeButton = F2(
	function (msg, model) {
		if (msg.$ === 'ClickedDistractionFreeButton') {
			return _Utils_update(
				model,
				{distractionFree: !model.distractionFree});
		} else {
			return model;
		}
	});
var $author$project$Play$ShowingConfigurations = {$: 'ShowingConfigurations'};
var $author$project$Play$ShowingInputs = {$: 'ShowingInputs'};
var $author$project$Play$handleClickOnLeftBarButtonsButton = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'ClickedOnShowInputsButton':
				return _Utils_update(
					model,
					{
						leftBarState: function () {
							var _v1 = model.leftBarState;
							if (_v1.$ === 'ShowingInputs') {
								return $author$project$Play$ShowingNothing;
							} else {
								return $author$project$Play$ShowingInputs;
							}
						}()
					});
			case 'ClickedOnShowConfigurationsButton':
				return _Utils_update(
					model,
					{
						leftBarState: function () {
							var _v2 = model.leftBarState;
							if (_v2.$ === 'ShowingConfigurations') {
								return $author$project$Play$ShowingNothing;
							} else {
								return $author$project$Play$ShowingConfigurations;
							}
						}()
					});
			default:
				return model;
		}
	});
var $author$project$SelectList$mapCurrent = F2(
	function (up, _v0) {
		var p = _v0.a;
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{
					current: up(p.current)
				}));
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $author$project$Playground$Configurations$mapConfigs = F2(
	function (up, block) {
		return _Utils_update(
			block,
			{
				configs: up(block.configs)
			});
	});
var $author$project$Playground$Configurations$BoolConfig = function (a) {
	return {$: 'BoolConfig', a: a};
};
var $author$project$Playground$Configurations$ColorConfig = function (a) {
	return {$: 'ColorConfig', a: a};
};
var $author$project$Playground$Configurations$IntConfig = F2(
	function (a, b) {
		return {$: 'IntConfig', a: a, b: b};
	});
var $author$project$Playground$Configurations$OptionsConfig = function (a) {
	return {$: 'OptionsConfig', a: a};
};
var $author$project$Playground$Configurations$StringConfig = function (a) {
	return {$: 'StringConfig', a: a};
};
var $elmcraft$core_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elmcraft$core_extra$List$Extra$findIndex = $elmcraft$core_extra$List$Extra$findIndexHelp(0);
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$SelectList$toList = function (_v0) {
	var p = _v0.a;
	return _Utils_ap(
		$elm$core$List$reverse(p.beforeReversed),
		A2($elm$core$List$cons, p.current, p.after));
};
var $author$project$SelectList$goTo = F2(
	function (i, _v0) {
		var p = _v0.a;
		var l = $author$project$SelectList$toList(
			$author$project$SelectList$SelectList(p));
		var i_ = A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(l),
			i);
		var _v1 = A2($elm$core$List$drop, i_, l);
		if (_v1.b) {
			var head = _v1.a;
			var tail = _v1.b;
			return $author$project$SelectList$SelectList(
				{
					after: tail,
					beforeReversed: $elm$core$List$reverse(
						A2($elm$core$List$take, i_, l)),
					current: head
				});
		} else {
			return $author$project$SelectList$SelectList(p);
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$toFloat = _String_toFloat;
var $myrho$elm_round$Round$funNum = F3(
	function (fun, s, fl) {
		return A2(
			$elm$core$Maybe$withDefault,
			0 / 0,
			$elm$core$String$toFloat(
				A2(fun, s, fl)));
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				_Utils_chr('0'),
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				$elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					$elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _v0.a.a.valueOf()) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $myrho$elm_round$Round$roundNum = $myrho$elm_round$Round$funNum($myrho$elm_round$Round$round);
var $author$project$Playground$Configurations$roundFloatValue = F3(
	function (min, max, value) {
		var scale = A2(
			$elm$core$Basics$logBase,
			10,
			$elm$core$Basics$abs(max - min));
		var n = (scale < 0) ? 3 : ((scale < 1) ? 2 : ((scale < 2) ? 1 : 0));
		return A2($myrho$elm_round$Round$roundNum, n, value);
	});
var $elmcraft$core_extra$List$Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			$elm$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var $author$project$Playground$Configurations$updateConfigs = function (msg) {
	switch (msg.$) {
		case 'SetInt':
			var name = msg.a;
			var newValue = msg.b;
			return A2(
				$elmcraft$core_extra$List$Extra$updateIf,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					$elm$core$Basics$eq(name)),
				$elm$core$Tuple$mapSecond(
					function (config) {
						if (config.$ === 'IntConfig') {
							var _v2 = config.a;
							var min = _v2.a;
							var max = _v2.b;
							return A2(
								$author$project$Playground$Configurations$IntConfig,
								_Utils_Tuple2(min, max),
								newValue);
						} else {
							return config;
						}
					}));
		case 'SetString':
			var name = msg.a;
			var newValue = msg.b;
			return A2(
				$elmcraft$core_extra$List$Extra$updateIf,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					$elm$core$Basics$eq(name)),
				$elm$core$Tuple$mapSecond(
					function (config) {
						if (config.$ === 'StringConfig') {
							return $author$project$Playground$Configurations$StringConfig(newValue);
						} else {
							return config;
						}
					}));
		case 'SetFloat':
			var name = msg.a;
			var newValue = msg.b;
			return A2(
				$elmcraft$core_extra$List$Extra$updateIf,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					$elm$core$Basics$eq(name)),
				$elm$core$Tuple$mapSecond(
					function (config) {
						if (config.$ === 'FloatConfig') {
							var _v5 = config.a;
							var min = _v5.a;
							var max = _v5.b;
							return A2(
								$author$project$Playground$Configurations$FloatConfig,
								_Utils_Tuple2(min, max),
								A3($author$project$Playground$Configurations$roundFloatValue, min, max, newValue));
						} else {
							return config;
						}
					}));
		case 'SetColor':
			var name = msg.a;
			var newValue = msg.b;
			return A2(
				$elmcraft$core_extra$List$Extra$updateIf,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					$elm$core$Basics$eq(name)),
				$elm$core$Tuple$mapSecond(
					function (config) {
						if (config.$ === 'ColorConfig') {
							return $author$project$Playground$Configurations$ColorConfig(newValue);
						} else {
							return config;
						}
					}));
		case 'SetBool':
			var name = msg.a;
			var newValue = msg.b;
			return A2(
				$elmcraft$core_extra$List$Extra$updateIf,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					$elm$core$Basics$eq(name)),
				$elm$core$Tuple$mapSecond(
					function (config) {
						if (config.$ === 'BoolConfig') {
							return $author$project$Playground$Configurations$BoolConfig(newValue);
						} else {
							return config;
						}
					}));
		default:
			var name = msg.a;
			var selectedOption = msg.b;
			return A2(
				$elmcraft$core_extra$List$Extra$updateIf,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Tuple$first,
					$elm$core$Basics$eq(name)),
				$elm$core$Tuple$mapSecond(
					function (config) {
						if (config.$ === 'OptionsConfig') {
							var value = config.a;
							return $author$project$Playground$Configurations$OptionsConfig(
								A2(
									$elm$core$Maybe$withDefault,
									value,
									A2(
										$elm$core$Maybe$map,
										function (index) {
											return A2($author$project$SelectList$goTo, index, value);
										},
										A2(
											$elmcraft$core_extra$List$Extra$findIndex,
											$elm$core$Basics$eq(selectedOption),
											$author$project$SelectList$toList(value)))));
						} else {
							return config;
						}
					}));
	}
};
var $author$project$Playground$Configurations$updateBlock = function (msg) {
	return $author$project$Playground$Configurations$mapConfigs(
		$author$project$Playground$Configurations$updateConfigs(msg));
};
var $author$project$Playground$Configurations$update = F2(
	function (msg, configurations) {
		return A2(
			$elm$core$List$map,
			$author$project$Playground$Configurations$updateBlock(msg),
			configurations);
	});
var $author$project$Playground$Computer$updateConfigurations = F2(
	function (configurationsMsg, computer) {
		return _Utils_update(
			computer,
			{
				configurations: A2($author$project$Playground$Configurations$update, configurationsMsg, computer.configurations)
			});
	});
var $author$project$Playground$Tape$updateConfigurations = F2(
	function (configurationsMsg, _v0) {
		var state = _v0.a;
		var timeLine = _v0.b;
		return A2(
			$author$project$Playground$Tape$Tape,
			state,
			A2(
				$author$project$SelectList$mapCurrent,
				$elm$core$Tuple$mapFirst(
					$author$project$Playground$Computer$updateConfigurations(configurationsMsg)),
				timeLine));
	});
var $author$project$Play$handleConfigurationsMsg = F2(
	function (msg, model) {
		if (msg.$ === 'FromConfigurationsEditor') {
			var configurationsMsg = msg.a;
			return _Utils_update(
				model,
				{
					tape: A2($author$project$Playground$Tape$updateConfigurations, configurationsMsg, model.tape)
				});
		} else {
			return model;
		}
	});
var $author$project$Playground$Tape$goTo = F2(
	function (tickIndex, tape) {
		var timeline = tape.b;
		return A2(
			$author$project$Playground$Tape$Tape,
			$author$project$Playground$Tape$Paused,
			A2($author$project$SelectList$goTo, tickIndex, timeline));
	});
var $author$project$Playground$Tape$pause = function (_v0) {
	var timeLine = _v0.b;
	return A2($author$project$Playground$Tape$Tape, $author$project$Playground$Tape$Paused, timeLine);
};
var $author$project$Playground$Tape$startPlaying = function (tape) {
	var timeLine = tape.b;
	return A2(
		$author$project$Playground$Tape$Tape,
		$author$project$Playground$Tape$Playing(
			{
				tapeClock: $author$project$Playground$Tape$currentComputer(tape).clock
			}),
		timeLine);
};
var $author$project$Playground$Tape$startRecording = function (_v0) {
	var timeLine = _v0.b;
	return A2($author$project$Playground$Tape$Tape, $author$project$Playground$Tape$Recording, timeLine);
};
var $author$project$Playground$Tape$updateOnTapeMsg = F2(
	function (msg, tape) {
		switch (msg.$) {
			case 'PressedPauseButton':
				return $author$project$Playground$Tape$pause(tape);
			case 'PressedRecordButton':
				return $author$project$Playground$Tape$startRecording(tape);
			case 'PressedPlayButton':
				return $author$project$Playground$Tape$startPlaying(tape);
			default:
				var tickIndex = msg.a;
				return A2($author$project$Playground$Tape$goTo, tickIndex, tape);
		}
	});
var $author$project$Play$handleTapeScreenControls = F2(
	function (msg, model) {
		if (msg.$ === 'FromTapeControls') {
			var tapeMsg = msg.a;
			return _Utils_update(
				model,
				{
					tape: A2($author$project$Playground$Tape$updateOnTapeMsg, tapeMsg, model.tape)
				});
		} else {
			return model;
		}
	});
var $author$project$Play$update = F3(
	function (app, msg, model) {
		return A3(
			$author$project$Play$handleAppUpdate,
			app,
			msg,
			A2(
				$author$project$Play$handleConfigurationsMsg,
				msg,
				A2(
					$author$project$Play$handleTapeScreenControls,
					msg,
					A2(
						$author$project$Play$handleClickOnLeftBarButtonsButton,
						msg,
						A2($author$project$Play$handleClickOnDistractionFreeButton, msg, model)))));
	});
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $rtfeldman$elm_css$Css$absolute = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Property = function (a) {
	return {$: 'Property', a: a};
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactDeclarations = function (declarations) {
	var _v0 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v0.a;
	var compactedDeclarations = _v0.b;
	return A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
};
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return {
		charset: charset,
		declarations: $rtfeldman$elm_css$Css$Structure$compactDeclarations(declarations),
		imports: imports,
		namespaces: namespaces
	};
};
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $rtfeldman$elm_css$Css$String$mapJoinHelp = F4(
	function (map, sep, strs, result) {
		mapJoinHelp:
		while (true) {
			if (!strs.b) {
				return result;
			} else {
				if (!strs.b.b) {
					var first = strs.a;
					return result + (map(first) + '');
				} else {
					var first = strs.a;
					var rest = strs.b;
					var $temp$map = map,
						$temp$sep = sep,
						$temp$strs = rest,
						$temp$result = result + (map(first) + (sep + ''));
					map = $temp$map;
					sep = $temp$sep;
					strs = $temp$strs;
					result = $temp$result;
					continue mapJoinHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$Css$String$mapJoin = F3(
	function (map, sep, strs) {
		return A4($rtfeldman$elm_css$Css$String$mapJoinHelp, map, sep, strs, '');
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, ' and ', expressions);
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
		'\n',
		mediaQueries);
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		function (_v0) {
			var prop = _v0.a;
			return prop + ';';
		},
		'',
		properties);
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors);
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return $rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator) + (' ' + $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$Maybe$withDefault,
		'',
		A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement));
	return A2(
		$elm$core$String$append,
		A2($elm$core$String$join, ' ', segments),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = function (_v0) {
	var firstSelector = _v0.a;
	var otherSelectors = _v0.b;
	var properties = _v0.c;
	var selectorStr = A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
		',',
		A2($elm$core$List$cons, firstSelector, otherSelectors));
	return selectorStr + ('{' + ($rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties) + '}'));
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, ', ', mediaQueries);
			var blocks = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, '\n', styleBlocks);
			return '@media ' + (query + ('{' + (blocks + '}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + ('{' + (declaration + '}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return $rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$importToString, '\n', imports) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, '\n', namespaces) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, '\n', declarations) + '')));
};
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = function (a) {
	return {$: 'PageRule', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$PageRule(properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = $rtfeldman$elm_css$Css$Structure$Property('animation-name:' + name);
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$PageRule(properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$templateSelector = $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$ClassSelector($rtfeldman$elm_css$VirtualDom$Styled$classnameStandin)
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate = function (styles) {
	if (!styles.b) {
		return '';
	} else {
		var otherwise = styles;
		return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$VirtualDom$Styled$makeSnippet, styles, $rtfeldman$elm_css$VirtualDom$Styled$templateSelector)
					])));
	}
};
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var cssTemplate = $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate(styles);
	var classProperty = A2($elm$virtual_dom$VirtualDom$attribute, '', '');
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, true, cssTemplate);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$height = $rtfeldman$elm_css$Css$prop1('height');
var $rtfeldman$elm_css$Css$hidden = {borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'hidden', visibility: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$VirtualDom$Styled$KeyedNode = F3(
	function (a, b, c) {
		return {$: 'KeyedNode', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
	function (a, b, c, d) {
		return {$: 'KeyedNodeNS', a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 'NodeNS', a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $rtfeldman$elm_css$VirtualDom$Styled$mapAttribute = F2(
	function (transform, _v0) {
		var prop = _v0.a;
		var isCssStyle = _v0.b;
		var cssTemplate = _v0.c;
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$mapAttribute, transform, prop),
			isCssStyle,
			cssTemplate);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$map = F2(
	function (transform, vdomNode) {
		switch (vdomNode.$) {
			case 'Node':
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					$rtfeldman$elm_css$VirtualDom$Styled$Node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 'NodeNS':
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					$rtfeldman$elm_css$VirtualDom$Styled$NodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 'KeyedNode':
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					$rtfeldman$elm_css$VirtualDom$Styled$KeyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						function (_v1) {
							var key = _v1.a;
							var child = _v1.b;
							return _Utils_Tuple2(
								key,
								A2($rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			case 'KeyedNodeNS':
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					$rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						$elm$core$List$map,
						function (_v2) {
							var key = _v2.a;
							var child = _v2.b;
							return _Utils_Tuple2(
								key,
								A2($rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			default:
				var vdom = vdomNode.a;
				return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
					A2($elm$virtual_dom$VirtualDom$map, transform, vdom));
		}
	});
var $rtfeldman$elm_css$Html$Styled$map = $rtfeldman$elm_css$VirtualDom$Styled$map;
var $rtfeldman$elm_css$Css$overflow = $rtfeldman$elm_css$Css$prop1('overflow');
var $rtfeldman$elm_css$Css$position = $rtfeldman$elm_css$Css$prop1('position');
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			lineHeight: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ',', args) + ')'));
	});
var $rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			alpha: alpha,
			blue: b,
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'rgba',
				_Utils_ap(
					A2(
						$elm$core$List$map,
						$elm$core$String$fromInt,
						_List_fromArray(
							[r, g, b])),
					_List_fromArray(
						[
							$elm$core$String$fromFloat(alpha)
						])))
		};
	});
var $elm$core$Basics$round = _Basics_round;
var $avh4$elm_color$Color$toRgba = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {alpha: a, blue: b, green: g, red: r};
};
var $author$project$DesignSystem$Color$toCssColor = function (color) {
	var c = $avh4$elm_color$Color$toRgba(color);
	return A4(
		$rtfeldman$elm_css$Css$rgba,
		$elm$core$Basics$round(c.red * 255),
		$elm$core$Basics$round(c.green * 255),
		$elm$core$Basics$round(c.blue * 255),
		c.alpha);
};
var $author$project$Play$ClickedDistractionFreeButton = {$: 'ClickedDistractionFreeButton'};
var $author$project$Play$ClickedOnShowConfigurationsButton = {$: 'ClickedOnShowConfigurationsButton'};
var $author$project$Play$ClickedOnShowInputsButton = {$: 'ClickedOnShowInputsButton'};
var $author$project$Play$FromConfigurationsEditor = function (a) {
	return {$: 'FromConfigurationsEditor', a: a};
};
var $author$project$Play$FromTapeControls = function (a) {
	return {$: 'FromTapeControls', a: a};
};
var $rtfeldman$elm_css$Css$auto = {alignItemsOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, justifyContentOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, textRendering: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'auto'};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $rtfeldman$elm_css$Css$batch = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles;
var $rtfeldman$elm_css$Css$borderTopLeftRadius = $rtfeldman$elm_css$Css$prop1('border-top-left-radius');
var $rtfeldman$elm_css$Css$bottom = $rtfeldman$elm_css$Css$prop1('bottom');
var $rtfeldman$elm_css$Css$row = {flexDirection: $rtfeldman$elm_css$Css$Structure$Compatible, flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'row'};
var $rtfeldman$elm_css$Css$column = _Utils_update(
	$rtfeldman$elm_css$Css$row,
	{value: 'column'});
var $rtfeldman$elm_css$Css$display = $rtfeldman$elm_css$Css$prop1('display');
var $rtfeldman$elm_css$Css$displayFlex = A2($rtfeldman$elm_css$Css$property, 'display', 'flex');
var $rtfeldman$elm_css$Css$fillAvailable = {lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, minMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'fill-available'};
var $rtfeldman$elm_css$Css$fitContent = _Utils_update(
	$rtfeldman$elm_css$Css$fillAvailable,
	{value: 'fit-content'});
var $rtfeldman$elm_css$Css$flexDirection = $rtfeldman$elm_css$Css$prop1('flex-direction');
var $rtfeldman$elm_css$Html$Styled$a = $rtfeldman$elm_css$Html$Styled$node('a');
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.value);
};
var $rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var $rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return $rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		$rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var $rtfeldman$elm_css$Css$hover = $rtfeldman$elm_css$Css$pseudoClass('hover');
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Css$RemUnits = {$: 'RemUnits'};
var $rtfeldman$elm_css$Css$rem = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$RemUnits, 'rem');
var $rtfeldman$elm_css$Html$Styled$Attributes$title = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('title');
var $rtfeldman$elm_css$Css$width = $rtfeldman$elm_css$Css$prop1('width');
var $author$project$Play$iconLink = F3(
	function (title, linkAddress, icon) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$a,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$padding(
							$rtfeldman$elm_css$Css$rem(0.5)),
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$color(
							A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.4)),
							$rtfeldman$elm_css$Css$hover(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$color(
									A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.8))
								]))
						])),
					$rtfeldman$elm_css$Html$Styled$Attributes$href(linkAddress),
					$rtfeldman$elm_css$Html$Styled$Attributes$title(title)
				]),
			_List_fromArray(
				[icon]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$attribute, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Svg$Styled$Attributes$clipRule = $rtfeldman$elm_css$VirtualDom$Styled$attribute('clip-rule');
var $rtfeldman$elm_css$Svg$Styled$Attributes$d = $rtfeldman$elm_css$VirtualDom$Styled$attribute('d');
var $rtfeldman$elm_css$Svg$Styled$Internal$css = function (styles) {
	var cssTemplate = $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate(styles);
	var classAttribute = A2($elm$virtual_dom$VirtualDom$attribute, '', '');
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classAttribute, true, cssTemplate);
};
var $rtfeldman$elm_css$Svg$Styled$Attributes$css = $rtfeldman$elm_css$Svg$Styled$Internal$css;
var $rtfeldman$elm_css$Svg$Styled$Attributes$fill = $rtfeldman$elm_css$VirtualDom$Styled$attribute('fill');
var $rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PercentageUnits, '%');
var $rtfeldman$elm_css$VirtualDom$Styled$nodeNS = $rtfeldman$elm_css$VirtualDom$Styled$NodeNS;
var $rtfeldman$elm_css$Svg$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$nodeNS('http://www.w3.org/2000/svg');
var $rtfeldman$elm_css$Svg$Styled$svg = $rtfeldman$elm_css$Svg$Styled$node('svg');
var $rtfeldman$elm_css$Svg$Styled$Attributes$viewBox = $rtfeldman$elm_css$VirtualDom$Styled$attribute('viewBox');
var $elm$virtual_dom$VirtualDom$attributeNS = F3(
	function (namespace, key, value) {
		return A3(
			_VirtualDom_attributeNS,
			namespace,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$attributeNS = F3(
	function (namespace, key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A3($elm$virtual_dom$VirtualDom$attributeNS, namespace, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Svg$Styled$Attributes$xmlSpace = A2($rtfeldman$elm_css$VirtualDom$Styled$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var $author$project$Icons$draw = $rtfeldman$elm_css$Svg$Styled$svg(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Svg$Styled$Attributes$viewBox('0 0 24 24'),
			$rtfeldman$elm_css$Svg$Styled$Attributes$fill('currentColor'),
			$rtfeldman$elm_css$Svg$Styled$Attributes$css(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$width(
					$rtfeldman$elm_css$Css$pct(100)),
					$rtfeldman$elm_css$Css$height(
					$rtfeldman$elm_css$Css$pct(100))
				])),
			$rtfeldman$elm_css$Svg$Styled$Attributes$xmlSpace('http://www.w3.org/2000/svg')
		]));
var $rtfeldman$elm_css$Svg$Styled$Attributes$fillRule = $rtfeldman$elm_css$VirtualDom$Styled$attribute('fill-rule');
var $rtfeldman$elm_css$Svg$Styled$path = $rtfeldman$elm_css$Svg$Styled$node('path');
var $author$project$Icons$icons = {
	chevronDown: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$fillRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$clipRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289Z')
					]),
				_List_Nil)
			])),
	chevronRight: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$fillRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$clipRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z')
					]),
				_List_Nil)
			])),
	chevronUp: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$fillRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$clipRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M5.29289 15.7071C4.90237 15.3166 4.90237 14.6834 5.29289 14.2929L11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L18.7071 14.2929C19.0976 14.6834 19.0976 15.3166 18.7071 15.7071C18.3166 16.0976 17.6834 16.0976 17.2929 15.7071L12 10.4142L6.70711 15.7071C6.31658 16.0976 5.68342 16.0976 5.29289 15.7071Z')
					]),
				_List_Nil)
			])),
	computer: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M4.00005 16H20V5H4.00005V16ZM13.0001 18V20H17.0001V22H7.00005V20H11.0001V18H2.99205C2.86065 17.9992 2.7307 17.9725 2.60965 17.9214C2.48861 17.8702 2.37885 17.7957 2.28668 17.702C2.19452 17.6084 2.12175 17.4975 2.07256 17.3756C2.02337 17.2538 1.99873 17.1234 2.00005 16.992V4.008C2.00005 3.451 2.45505 3 2.99205 3H21.008C21.556 3 22 3.449 22 4.007V16.992C22 17.549 21.545 18 21.008 18H13.0001Z')
					]),
				_List_Nil)
			])),
	cross: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M11.7143 9.78571L17.5 4L19.4286 5.92857L13.6429 11.7143L19.4286 17.5L17.5 19.4286L11.7143 13.6429L5.92857 19.4286L4 17.5L9.78571 11.7143L4 5.92857L5.92857 4L11.7143 9.78571Z')
					]),
				_List_Nil)
			])),
	folder: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z')
					]),
				_List_Nil)
			])),
	gear: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M20.0601 11.6104C20.0639 11.7454 20.0639 11.8804 20.0601 12.0154L21.4588 13.7629C21.5322 13.8547 21.583 13.9624 21.6071 14.0773C21.6312 14.1923 21.6279 14.3113 21.5976 14.4248C21.3679 15.2866 21.0249 16.1141 20.5776 16.8857C20.519 16.9867 20.4376 17.0726 20.34 17.1365C20.2423 17.2005 20.1311 17.2408 20.0151 17.2542L17.7914 17.5017C17.6989 17.5992 17.6051 17.6929 17.5101 17.7829L17.2476 20.0123C17.2341 20.1283 17.1937 20.2396 17.1295 20.3373C17.0654 20.435 16.9794 20.5163 16.8782 20.5748C16.1067 21.0217 15.2791 21.3641 14.4173 21.5929C14.3038 21.6232 14.1848 21.6265 14.0698 21.6024C13.9549 21.5783 13.8472 21.5275 13.7554 21.4542L12.0126 20.0629H11.6076L9.8601 21.4589C9.76835 21.5322 9.66065 21.583 9.54569 21.6071C9.43073 21.6312 9.31171 21.6279 9.19823 21.5976C8.33643 21.3679 7.5089 21.0249 6.73729 20.5776C6.63634 20.519 6.55046 20.4376 6.4865 20.34C6.42254 20.2423 6.38225 20.1311 6.36885 20.0151L6.12135 17.7876C6.02385 17.6945 5.9301 17.6007 5.8401 17.5064L3.61073 17.2504C3.49468 17.2369 3.38338 17.1965 3.28572 17.1324C3.18806 17.0682 3.10674 16.9822 3.04823 16.881C2.60136 16.1093 2.2587 15.2818 2.02916 14.4201C1.99897 14.3065 1.99589 14.1875 2.02015 14.0725C2.04441 13.9576 2.09535 13.8499 2.16885 13.7582L3.5601 12.0154V11.6104L2.16416 9.86292C2.09082 9.77116 2.04006 9.66347 2.01596 9.5485C1.99186 9.43354 1.9951 9.31452 2.02541 9.20104C2.25513 8.33924 2.59812 7.51172 3.04541 6.7401C3.10403 6.63915 3.18541 6.55328 3.28306 6.48931C3.38071 6.42535 3.49195 6.38507 3.60791 6.37167L5.83166 6.12417C5.92479 6.02667 6.01854 5.93292 6.11291 5.84292L6.3726 3.61354C6.3861 3.49749 6.42653 3.3862 6.49066 3.28854C6.55479 3.19088 6.64085 3.10955 6.74198 3.05104C7.51369 2.60418 8.3412 2.26151 9.20291 2.03198C9.31647 2.00179 9.43553 1.9987 9.55049 2.02296C9.66546 2.04723 9.77312 2.09816 9.86479 2.17167L11.6076 3.56292C11.7426 3.55917 11.8776 3.55917 12.0126 3.56292L13.7601 2.16417C13.8519 2.09082 13.9595 2.04006 14.0745 2.01596C14.1895 1.99186 14.3085 1.9951 14.422 2.02542C15.2839 2.25472 16.1115 2.59773 16.8829 3.04542C16.9839 3.10403 17.0697 3.18541 17.1337 3.28306C17.1977 3.38072 17.2379 3.49195 17.2513 3.60792L17.4988 5.83167C17.5963 5.92417 17.6901 6.01792 17.7801 6.11292L20.0095 6.37542C20.1255 6.38892 20.2368 6.42934 20.3345 6.49347C20.4321 6.5576 20.5135 6.64366 20.572 6.74479C21.0188 7.51651 21.3615 8.34402 21.591 9.20573C21.6212 9.31928 21.6243 9.43834 21.6001 9.55331C21.5758 9.66828 21.5249 9.77593 21.4513 9.8676L20.0601 11.6104ZM11.8101 8.06292C11.0684 8.06292 10.3434 8.28285 9.72671 8.6949C9.11003 9.10696 8.62938 9.69263 8.34555 10.3779C8.06172 11.0631 7.98746 11.8171 8.13216 12.5445C8.27685 13.2719 8.634 13.9401 9.15845 14.4646C9.6829 14.989 10.3511 15.3462 11.0785 15.4909C11.8059 15.6356 12.5599 15.5613 13.2452 15.2775C13.9304 14.9936 14.5161 14.513 14.9281 13.8963C15.3402 13.2796 15.5601 12.5546 15.5601 11.8129C15.5601 10.8184 15.165 9.86453 14.4618 9.16127C13.7585 8.458 12.8047 8.06292 11.8101 8.06292Z')
					]),
				_List_Nil)
			])),
	githubCat: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M11.8972 2.16C7.00414 2.15938 2.83301 5.70798 2.0496 10.5379C1.26619 15.3679 4.1018 20.053 8.74421 21.599C9.2442 21.689 9.42319 21.382 9.42319 21.118C9.42319 20.881 9.4152 20.253 9.4122 19.418C6.6372 20.018 6.05119 18.08 6.05119 18.08C5.86851 17.477 5.47577 16.9593 4.94419 16.621C4.04419 16.002 5.01319 16.016 5.01319 16.016C5.65387 16.1038 6.21775 16.4834 6.54019 17.044C6.81315 17.5403 7.27296 17.907 7.8175 18.0626C8.36206 18.2183 8.94622 18.15 9.44021 17.873C9.48663 17.367 9.71175 16.8941 10.0752 16.539C7.8612 16.288 5.5332 15.432 5.5332 11.609C5.52091 10.6202 5.88809 9.66431 6.5592 8.93799C6.25555 8.07731 6.29131 7.13327 6.65921 6.29799C6.65921 6.29799 7.49621 6.029 9.40121 7.319C11.0351 6.87102 12.7594 6.87102 14.3932 7.319C16.2992 6.02799 17.1352 6.29799 17.1352 6.29799C17.5048 7.13286 17.5406 8.07757 17.2352 8.93799C17.9088 9.66423 18.2756 10.6226 18.2592 11.613C18.2592 15.446 15.9292 16.288 13.7072 16.535C14.1865 17.0251 14.4324 17.6973 14.3822 18.381C14.3822 19.715 14.3702 20.791 14.3702 21.118C14.3702 21.385 14.5482 21.695 15.0572 21.597C19.6977 20.0484 22.5302 15.363 21.7452 10.5343C20.9602 5.70565 16.7893 2.15888 11.8972 2.16Z')
					]),
				_List_Nil)
			])),
	heart: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M11.92 21.23L10.47 19.91C5.32002 15.24 1.92001 12.16 1.92001 8.38001C1.92001 5.3 4.34 2.88 7.42002 2.88C9.16002 2.88 10.83 3.69 11.92 4.97C13.01 3.69 14.68 2.88 16.42 2.88C19.5 2.88 21.92 5.3 21.92 8.38001C21.92 12.16 18.52 15.24 13.37 19.92L11.92 21.23Z')
					]),
				_List_Nil)
			])),
	home: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M6 19h3v-6h6v6h3v-9l-6-4.5L6 10v9Zm-2 2V9l8-6l8 6v12h-7v-6h-2v6H4Zm8-8.75Z')
					]),
				_List_Nil)
			])),
	layout: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M6 5C5.73478 5 5.48043 5.10536 5.29289 5.29289C5.10536 5.48043 5 5.73478 5 6V7C5 7.26522 5.10536 7.51957 5.29289 7.70711C5.48043 7.89464 5.73478 8 6 8H8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6C9 5.73478 8.89464 5.48043 8.70711 5.29289C8.51957 5.10536 8.26522 5 8 5H6ZM3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H8C8.79565 3 9.55871 3.31607 10.1213 3.87868C10.6839 4.44129 11 5.20435 11 6V7C11 7.79565 10.6839 8.55871 10.1213 9.12132C9.55871 9.68393 8.79565 10 8 10H6C5.20435 10 4.44129 9.68393 3.87868 9.12132C3.31607 8.55871 3 7.79565 3 7V6C3 5.20435 3.31607 4.44129 3.87868 3.87868ZM16 5C15.7348 5 15.4804 5.10536 15.2929 5.29289C15.1054 5.48043 15 5.73478 15 6V9C15 9.26522 15.1054 9.51957 15.2929 9.70711C15.4804 9.89464 15.7348 10 16 10H18C18.2652 10 18.5196 9.89464 18.7071 9.70711C18.8946 9.51957 19 9.26522 19 9V6C19 5.73478 18.8946 5.48043 18.7071 5.29289C18.5196 5.10536 18.2652 5 18 5H16ZM13.8787 3.87868C14.4413 3.31607 15.2044 3 16 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7957 12 18 12H16C15.2043 12 14.4413 11.6839 13.8787 11.1213C13.3161 10.5587 13 9.79565 13 9V6C13 5.20435 13.3161 4.44129 13.8787 3.87868ZM6 14C5.73478 14 5.48043 14.1054 5.29289 14.2929C5.10536 14.4804 5 14.7348 5 15V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H8C8.26522 19 8.51957 18.8946 8.70711 18.7071C8.89464 18.5196 9 18.2652 9 18V15C9 14.7348 8.89464 14.4804 8.70711 14.2929C8.51957 14.1054 8.26522 14 8 14H6ZM3.87868 12.8787C4.44129 12.3161 5.20435 12 6 12H8C8.79565 12 9.55871 12.3161 10.1213 12.8787C10.6839 13.4413 11 14.2043 11 15V18C11 18.7957 10.6839 19.5587 10.1213 20.1213C9.55871 20.6839 8.79565 21 8 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V15C3 14.2044 3.31607 13.4413 3.87868 12.8787ZM16 16C15.7348 16 15.4804 16.1054 15.2929 16.2929C15.1054 16.4804 15 16.7348 15 17V18C15 18.2652 15.1054 18.5196 15.2929 18.7071C15.4804 18.8946 15.7348 19 16 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V17C19 16.7348 18.8946 16.4804 18.7071 16.2929C18.5196 16.1054 18.2652 16 18 16H16ZM13.8787 14.8787C14.4413 14.3161 15.2043 14 16 14H18C18.7957 14 19.5587 14.3161 20.1213 14.8787C20.6839 15.4413 21 16.2043 21 17V18C21 18.7957 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7957 21 18 21H16C15.2043 21 14.4413 20.6839 13.8787 20.1213C13.3161 19.5587 13 18.7957 13 18V17C13 16.2043 13.3161 15.4413 13.8787 14.8787Z')
					]),
				_List_Nil)
			])),
	moon: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M12 22C17.523 22 22 17.523 22 12C22 11.537 21.306 11.46 21.067 11.857C20.5572 12.7013 19.862 13.4186 19.034 13.9545C18.206 14.4903 17.2669 14.8307 16.2878 14.9499C15.3088 15.0691 14.3154 14.9639 13.383 14.6423C12.4507 14.3207 11.6037 13.7911 10.9063 13.0937C10.2089 12.3963 9.67932 11.5493 9.35772 10.617C9.03613 9.68457 8.93093 8.69123 9.0501 7.71217C9.16926 6.73311 9.50967 5.794 10.0455 4.96599C10.5814 4.13797 11.2987 3.44275 12.143 2.933C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z')
					]),
				_List_Nil)
			])),
	moveDown: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M20 9.77778L4 9.77778L12 22L20 9.77778Z')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M14.2857 9.77778L9.71428 9.77778L9.71428 2L14.2857 2L14.2857 9.77778Z')
					]),
				_List_Nil)
			])),
	moveUp: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M4 14.2222L20 14.2222L12 2L4 14.2222Z')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M9.71429 14.2222H14.2857V22H9.71429V14.2222Z')
					]),
				_List_Nil)
			])),
	pause: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M6 19H10V5H6V19ZM14 5V19H18V5H14Z')
					]),
				_List_Nil)
			])),
	pen: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z')
					]),
				_List_Nil)
			])),
	play: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M7 5V19L18 12L7 5Z')
					]),
				_List_Nil)
			])),
	plus: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M9.5 9.5V2H14.5V9.5H22V14.5H14.5V22H9.5V14.5H2V9.5H9.5Z')
					]),
				_List_Nil)
			])),
	pointer: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M3.97609 22.5975L0.523555 0.939237L19.0232 12.719L9.03003 13.8965L3.97609 22.5975Z')
					]),
				_List_Nil)
			])),
	redo: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M18.4 10.6C16.55 8.99 14.15 8 11.5 8C7.34001 8 3.76001 10.42 2.06001 13.93C1.74001 14.6 2.10001 15.4 2.81001 15.64C3.40001 15.84 4.04001 15.56 4.31001 15C5.61001 12.34 8.34001 10.5 11.5 10.5C13.45 10.5 15.23 11.22 16.62 12.38L14.71 14.29C14.08 14.92 14.52 16 15.41 16H21C21.55 16 22 15.55 22 15V9.41C22 8.52 20.92 8.07 20.29 8.7L18.4 10.6Z')
					]),
				_List_Nil)
			])),
	reset: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M7.20679 2.29279C7.39426 2.48031 7.49957 2.73462 7.49957 2.99979C7.49957 3.26495 7.39426 3.51926 7.20679 3.70679L5.41379 5.49979H13.2498C14.832 5.49979 16.3788 5.96898 17.6943 6.84803C19.0099 7.72708 20.0353 8.97651 20.6408 10.4383C21.2463 11.9001 21.4048 13.5087 21.0961 15.0605C20.7874 16.6124 20.0255 18.0378 18.9066 19.1566C17.7878 20.2755 16.3624 21.0374 14.8105 21.3461C13.2587 21.6548 11.6501 21.4963 10.1883 20.8908C8.72651 20.2853 7.47708 19.2599 6.59803 17.9443C5.71898 16.6288 5.24979 15.082 5.24979 13.4998C5.24979 13.2346 5.35514 12.9802 5.54268 12.7927C5.73022 12.6051 5.98457 12.4998 6.24979 12.4998C6.515 12.4998 6.76936 12.6051 6.95689 12.7927C7.14443 12.9802 7.24979 13.2346 7.24979 13.4998C7.24979 14.6865 7.60168 15.8465 8.26097 16.8332C8.92026 17.8199 9.85733 18.5889 10.9537 19.0431C12.05 19.4972 13.2564 19.616 14.4203 19.3845C15.5842 19.153 16.6533 18.5815 17.4924 17.7424C18.3315 16.9033 18.903 15.8342 19.1345 14.6703C19.366 13.5064 19.2472 12.3 18.7931 11.2037C18.3389 10.1073 17.5699 9.17026 16.5832 8.51097C15.5965 7.85168 14.4365 7.49979 13.2498 7.49979H5.41379L7.20679 9.29279C7.38894 9.48139 7.48974 9.73399 7.48746 9.99619C7.48518 10.2584 7.38001 10.5092 7.1946 10.6946C7.0092 10.88 6.75838 10.9852 6.49619 10.9875C6.23399 10.9897 5.98139 10.8889 5.79279 10.7068L2.29279 7.20679C2.10532 7.01926 2 6.76495 2 6.49979C2 6.23462 2.10532 5.98031 2.29279 5.79279L5.79279 2.29279C5.98031 2.10532 6.23462 2 6.49979 2C6.76495 2 7.01926 2.10532 7.20679 2.29279Z')
					]),
				_List_Nil)
			])),
	save: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M21 7V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H17L21 7ZM12 18C12.8333 18 13.5417 17.7083 14.125 17.125C14.7083 16.5417 15 15.8333 15 15C15 14.1667 14.7083 13.4583 14.125 12.875C13.5417 12.2917 12.8333 12 12 12C11.1667 12 10.4583 12.2917 9.875 12.875C9.29167 13.4583 9 14.1667 9 15C9 15.8333 9.29167 16.5417 9.875 17.125C10.4583 17.7083 11.1667 18 12 18ZM6 10H15V6H6V10Z')
					]),
				_List_Nil)
			])),
	sun: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M11.9989 19C12.2641 19 12.5185 19.1054 12.706 19.2929C12.8935 19.4804 12.9989 19.7348 12.9989 20V21C12.9989 21.2652 12.8935 21.5196 12.706 21.7071C12.5185 21.8946 12.2641 22 11.9989 22C11.7337 22 11.4793 21.8946 11.2918 21.7071C11.1042 21.5196 10.9989 21.2652 10.9989 21V20C10.9989 19.7348 11.1042 19.4804 11.2918 19.2929C11.4793 19.1054 11.7337 19 11.9989 19ZM18.3629 16.95L19.0699 17.657C19.252 17.8456 19.3528 18.0982 19.3506 18.3604C19.3483 18.6226 19.2431 18.8734 19.0577 19.0588C18.8723 19.2442 18.6215 19.3494 18.3593 19.3517C18.0971 19.354 17.8445 19.2532 17.6559 19.071L16.9489 18.364C16.7667 18.1754 16.6659 17.9228 16.6682 17.6606C16.6705 17.3984 16.7757 17.1476 16.9611 16.9622C17.1465 16.7768 17.3973 16.6716 17.6595 16.6693C17.9217 16.667 18.1743 16.7678 18.3629 16.95ZM5.63489 16.95C5.81485 16.7707 6.05633 16.6665 6.31028 16.6588C6.56423 16.651 6.81161 16.7402 7.00217 16.9082C7.19274 17.0763 7.3122 17.3106 7.33629 17.5635C7.36038 17.8164 7.2873 18.069 7.13189 18.27L7.04889 18.364L6.34189 19.071C6.16193 19.2503 5.92046 19.3545 5.66651 19.3622C5.41256 19.37 5.16518 19.2808 4.97461 19.1128C4.78405 18.9447 4.66459 18.7104 4.64049 18.4575C4.6164 18.2046 4.68948 17.952 4.84489 17.751L4.92789 17.657L5.63489 16.95ZM11.9989 6C13.5902 6 15.1163 6.63214 16.2415 7.75736C17.3668 8.88258 17.9989 10.4087 17.9989 12C17.9989 13.5913 17.3668 15.1174 16.2415 16.2426C15.1163 17.3679 13.5902 18 11.9989 18C10.4076 18 8.88147 17.3679 7.75625 16.2426C6.63103 15.1174 5.99889 13.5913 5.99889 12C5.99889 10.4087 6.63103 8.88258 7.75625 7.75736C8.88147 6.63214 10.4076 6 11.9989 6ZM3.99889 11C4.25377 11.0003 4.49892 11.0979 4.68426 11.2728C4.8696 11.4478 4.98113 11.687 4.99606 11.9414C5.011 12.1958 4.92822 12.4464 4.76463 12.6418C4.60104 12.8373 4.36899 12.9629 4.11589 12.993L3.99889 13H2.99889C2.74401 12.9997 2.49886 12.9021 2.31352 12.7272C2.12819 12.5522 2.01666 12.313 2.00172 12.0586C1.98678 11.8042 2.06957 11.5536 2.23316 11.3582C2.39675 11.1627 2.6288 11.0371 2.88189 11.007L2.99889 11H3.99889ZM20.9989 11C21.2641 11 21.5185 11.1054 21.706 11.2929C21.8935 11.4804 21.9989 11.7348 21.9989 12C21.9989 12.2652 21.8935 12.5196 21.706 12.7071C21.5185 12.8946 21.2641 13 20.9989 13H19.9989C19.7337 13 19.4793 12.8946 19.2918 12.7071C19.1042 12.5196 18.9989 12.2652 18.9989 12C18.9989 11.7348 19.1042 11.4804 19.2918 11.2929C19.4793 11.1054 19.7337 11 19.9989 11H20.9989ZM4.92789 4.929C5.10008 4.75682 5.32918 4.65339 5.57221 4.63811C5.81524 4.62283 6.05549 4.69675 6.24789 4.846L6.34189 4.929L7.04889 5.636C7.22824 5.81596 7.33237 6.05743 7.34012 6.31138C7.34787 6.56533 7.25868 6.81271 7.09064 7.00328C6.92261 7.19384 6.68834 7.31331 6.43542 7.3374C6.18249 7.36149 5.92988 7.28841 5.72889 7.133L5.63489 7.05L4.92789 6.343C4.74042 6.15547 4.63511 5.90116 4.63511 5.636C4.63511 5.37084 4.74042 5.11653 4.92789 4.929ZM19.0699 4.929C19.2574 5.11653 19.3627 5.37084 19.3627 5.636C19.3627 5.90116 19.2574 6.15547 19.0699 6.343L18.3629 7.05C18.2706 7.14551 18.1603 7.22169 18.0383 7.2741C17.9163 7.32651 17.7851 7.3541 17.6523 7.35525C17.5195 7.3564 17.3878 7.3311 17.2649 7.28082C17.142 7.23054 17.0304 7.15629 16.9365 7.0624C16.8426 6.9685 16.7684 6.85685 16.7181 6.73395C16.6678 6.61106 16.6425 6.47938 16.6436 6.3466C16.6448 6.21382 16.6724 6.0826 16.7248 5.9606C16.7772 5.83859 16.8534 5.72825 16.9489 5.636L17.6559 4.929C17.8434 4.74153 18.0977 4.63621 18.3629 4.63621C18.6281 4.63621 18.8824 4.74153 19.0699 4.929ZM11.9989 2C12.2641 2 12.5185 2.10536 12.706 2.29289C12.8935 2.48043 12.9989 2.73478 12.9989 3V4C12.9989 4.26522 12.8935 4.51957 12.706 4.70711C12.5185 4.89464 12.2641 5 11.9989 5C11.7337 5 11.4793 4.89464 11.2918 4.70711C11.1042 4.51957 10.9989 4.26522 10.9989 4V3C10.9989 2.73478 11.1042 2.48043 11.2918 2.29289C11.4793 2.10536 11.7337 2 11.9989 2Z')
					]),
				_List_Nil)
			])),
	tape: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$fillRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$clipRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M10.0874 4H13.9126C15.6223 4 16.9767 4 18.0363 4.13989C19.1265 4.28434 20.0093 4.58789 20.706 5.27177C21.4019 5.95657 21.7107 6.82423 21.8577 7.89577C22 8.93806 22 10.2683 22 11.9488V12.0512C22 13.7317 22 15.0629 21.8577 16.1042C21.7107 17.1758 21.4019 18.0434 20.706 18.7282C20.0093 19.4121 19.1265 19.7157 18.0363 19.8601C16.9758 20 15.6223 20 13.9126 20H10.0874C8.37767 20 7.02326 20 5.96372 19.8601C4.87349 19.7157 3.9907 19.4121 3.29395 18.7282C2.59814 18.0434 2.2893 17.1758 2.14233 16.1042C2 15.0619 2 13.7317 2 12.0512V11.9488C2 10.2683 2 8.93714 2.14233 7.89577C2.2893 6.82423 2.59814 5.95657 3.29395 5.27177C3.9907 4.58789 4.87349 4.28434 5.96372 4.13989C7.02419 4 8.37767 4 10.0874 4ZM11.3023 5.37143H10.1395C9.2 5.37143 8.40558 5.37143 7.72372 5.39063L8.02698 6.18606C8.25116 6.77486 8.40093 7.16251 8.54791 7.44777C8.68744 7.71931 8.79628 7.83634 8.90605 7.9104C9.01581 7.98537 9.16558 8.04389 9.47163 8.07771C9.79628 8.11337 10.2186 8.11429 10.8577 8.11429H11.3023V5.37143ZM12.6977 8.11429V5.37143H13.8605C14.8 5.37143 15.5944 5.37143 16.2763 5.39063L15.973 6.18606C15.7488 6.77486 15.5991 7.16251 15.4521 7.44777C15.3126 7.71931 15.2037 7.83634 15.094 7.9104C14.9842 7.98537 14.8344 8.04389 14.5284 8.07771C14.2037 8.11337 13.7814 8.11429 13.1423 8.11429H12.6977ZM10.8205 9.48571C10.2288 9.48571 9.72744 9.48571 9.31721 9.44C8.88093 9.39337 8.48 9.28914 8.11163 9.03771C7.74326 8.7872 7.50326 8.4544 7.30419 8.06857C7.11721 7.70743 6.9414 7.24663 6.73395 6.70263L6.26884 5.48389L6.14977 5.49943C5.21395 5.62286 4.67442 5.85509 4.28 6.24183C3.88744 6.62857 3.65116 7.15886 3.52558 8.07863C3.39721 9.01851 3.39535 10.2565 3.39535 12C3.39535 13.7435 3.39721 14.9815 3.52558 15.9223C3.65116 16.8411 3.88744 17.3714 4.28093 17.7582C4.67442 18.1449 5.21395 18.3771 6.14977 18.5006C7.10605 18.6267 8.36558 18.6286 10.1395 18.6286H13.8605C15.6344 18.6286 16.8949 18.6267 17.8512 18.5006C18.786 18.3771 19.3256 18.1449 19.7191 17.7582C20.1126 17.3714 20.3488 16.8411 20.4744 15.9214C20.6028 14.9815 20.6047 13.7435 20.6047 12C20.6047 10.2565 20.6028 9.01851 20.4744 8.07771C20.3488 7.15886 20.1126 6.62857 19.7191 6.24183C19.3256 5.85509 18.786 5.62286 17.8502 5.49943C17.8106 5.49398 17.7709 5.4888 17.7312 5.48389L17.266 6.70263C17.0586 7.24663 16.8828 7.70743 16.6958 8.06949C16.4977 8.45349 16.2567 8.7872 15.8884 9.03863C15.52 9.28914 15.1191 9.39337 14.6828 9.44091C14.2726 9.48571 13.7712 9.48571 13.1795 9.48571H10.8205ZM5.72093 13.6C5.72093 13.2398 5.79311 12.8831 5.93336 12.5504C6.07361 12.2176 6.27917 11.9152 6.53831 11.6605C6.79745 11.4058 7.10509 11.2038 7.44367 11.0659C7.78226 10.9281 8.14515 10.8571 8.51163 10.8571C8.87811 10.8571 9.241 10.9281 9.57958 11.0659C9.91816 11.2038 10.2258 11.4058 10.485 11.6605C10.7441 11.9152 10.9497 12.2176 11.0899 12.5504C11.2301 12.8831 11.3023 13.2398 11.3023 13.6C11.3023 14.3275 11.0083 15.0251 10.485 15.5395C9.96159 16.0539 9.25177 16.3429 8.51163 16.3429C7.77149 16.3429 7.06166 16.0539 6.53831 15.5395C6.01495 15.0251 5.72093 14.3275 5.72093 13.6ZM8.51163 12.2286C8.14156 12.2286 7.78665 12.3731 7.52497 12.6303C7.26329 12.8874 7.11628 13.2363 7.11628 13.6C7.11628 13.9637 7.26329 14.3126 7.52497 14.5697C7.78665 14.8269 8.14156 14.9714 8.51163 14.9714C8.8817 14.9714 9.23661 14.8269 9.49829 14.5697C9.75997 14.3126 9.90698 13.9637 9.90698 13.6C9.90698 13.2363 9.75997 12.8874 9.49829 12.6303C9.23661 12.3731 8.8817 12.2286 8.51163 12.2286ZM12.6977 13.6C12.6977 12.8725 12.9917 12.1749 13.5151 11.6605C14.0384 11.1461 14.7482 10.8571 15.4884 10.8571C16.2285 10.8571 16.9383 11.1461 17.4617 11.6605C17.9851 12.1749 18.2791 12.8725 18.2791 13.6C18.2791 14.3275 17.9851 15.0251 17.4617 15.5395C16.9383 16.0539 16.2285 16.3429 15.4884 16.3429C14.7482 16.3429 14.0384 16.0539 13.5151 15.5395C12.9917 15.0251 12.6977 14.3275 12.6977 13.6ZM15.4884 12.2286C15.1183 12.2286 14.7634 12.3731 14.5017 12.6303C14.24 12.8874 14.093 13.2363 14.093 13.6C14.093 13.9637 14.24 14.3126 14.5017 14.5697C14.7634 14.8269 15.1183 14.9714 15.4884 14.9714C15.8584 14.9714 16.2134 14.8269 16.475 14.5697C16.7367 14.3126 16.8837 13.9637 16.8837 13.6C16.8837 13.2363 16.7367 12.8874 16.475 12.6303C16.2134 12.3731 15.8584 12.2286 15.4884 12.2286Z')
					]),
				_List_Nil)
			])),
	trash: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$fillRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$clipRule('evenodd'),
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M10.2 3.81818C9.96131 3.81818 9.73239 3.91396 9.5636 4.08445C9.39482 4.25494 9.3 4.48617 9.3 4.72727V5.63636H14.7V4.72727C14.7 4.48617 14.6052 4.25494 14.4364 4.08445C14.2676 3.91396 14.0387 3.81818 13.8 3.81818H10.2ZM16.5 5.63636V4.72727C16.5 4.00395 16.2155 3.31026 15.7092 2.7988C15.2028 2.28734 14.5161 2 13.8 2H10.2C9.48392 2 8.79716 2.28734 8.29081 2.7988C7.78446 3.31026 7.5 4.00395 7.5 4.72727V5.63636H3.9C3.40294 5.63636 3 6.04338 3 6.54545C3 7.04753 3.40294 7.45455 3.9 7.45455H4.8V19.2727C4.8 19.996 5.08446 20.6897 5.59081 21.2012C6.09716 21.7127 6.78391 22 7.5 22H16.5C17.2161 22 17.9028 21.7127 18.4092 21.2012C18.9155 20.6897 19.2 19.996 19.2 19.2727V7.45455H20.1C20.5971 7.45455 21 7.04753 21 6.54545C21 6.04338 20.5971 5.63636 20.1 5.63636H16.5ZM6.6 7.45455V19.2727C6.6 19.5138 6.69482 19.7451 6.8636 19.9156C7.03239 20.086 7.26131 20.1818 7.5 20.1818H16.5C16.7387 20.1818 16.9676 20.086 17.1364 19.9156C17.3052 19.7451 17.4 19.5138 17.4 19.2727V7.45455H6.6ZM10.2 10.1818C10.6971 10.1818 11.1 10.5888 11.1 11.0909V16.5455C11.1 17.0475 10.6971 17.4545 10.2 17.4545C9.70294 17.4545 9.3 17.0475 9.3 16.5455V11.0909C9.3 10.5888 9.70294 10.1818 10.2 10.1818ZM12.9 11.0909C12.9 10.5888 13.3029 10.1818 13.8 10.1818C14.2971 10.1818 14.7 10.5888 14.7 11.0909V16.5455C14.7 17.0475 14.2971 17.4545 13.8 17.4545C13.3029 17.4545 12.9 17.0475 12.9 16.5455V11.0909Z')
					]),
				_List_Nil)
			])),
	twitter: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M19.894 6.27921C20.7904 5.74329 21.4612 4.89945 21.781 3.90521C20.9387 4.40501 20.017 4.75709 19.056 4.94621C17.7236 3.53673 15.6125 3.19373 13.9024 4.10887C12.1923 5.02399 11.3065 6.9707 11.74 8.86121C8.2896 8.68797 5.07497 7.05813 2.89601 4.37721C1.75884 6.33864 2.33995 8.84599 4.224 10.1072C3.54271 10.0853 2.87652 9.90084 2.281 9.56921C2.281 9.58721 2.281 9.60521 2.281 9.62321C2.2814 11.6664 3.72137 13.4263 5.724 13.8312C5.09206 14.0031 4.4292 14.0285 3.786 13.9052C4.34921 15.6525 5.95956 16.8495 7.79501 16.8852C6.27483 18.0783 4.39747 18.7254 2.46499 18.7222C2.12247 18.7227 1.78021 18.703 1.44 18.6632C3.40239 19.9242 5.68637 20.5936 8.019 20.5912C11.2643 20.6135 14.383 19.3341 16.6777 17.0392C18.9724 14.7443 20.2516 11.6255 20.229 8.3802C20.229 8.1942 20.2247 8.00921 20.216 7.8252C21.0564 7.21781 21.7818 6.46536 22.358 5.60321C21.575 5.95027 20.7445 6.17813 19.894 6.27921Z')
					]),
				_List_Nil)
			])),
	undo: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M12.5 8C9.85 8 7.45 8.99 5.6 10.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15C2 15.55 2.45 16 3 16H8.59C9.48 16 9.93 14.92 9.3 14.29L7.39 12.38C8.78 11.22 10.55 10.5 12.51 10.5C15.67 10.5 18.4 12.34 19.7 15C19.97 15.56 20.61 15.84 21.2 15.64C21.91 15.41 22.27 14.6 21.95 13.92C20.23 10.42 16.65 8 12.5 8Z')
					]),
				_List_Nil)
			])),
	warning: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M4.47 21H19.53C21.07 21 22.03 19.33 21.26 18L13.73 4.98999C12.96 3.65999 11.04 3.65999 10.27 4.98999L2.74 18C1.97 19.33 2.93 21 4.47 21ZM12 14C11.45 14 11 13.55 11 13V11C11 10.45 11.45 9.99999 12 9.99999C12.55 9.99999 13 10.45 13 11V13C13 13.55 12.55 14 12 14ZM13 18H11V16H13V18Z')
					]),
				_List_Nil)
			])),
	yinYang: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M13.2247 16.2055C13.2247 16.4243 13.1598 16.6382 13.0382 16.8202C12.9166 17.0021 12.7438 17.1439 12.5417 17.2277C12.3395 17.3114 12.117 17.3333 11.9024 17.2906C11.6878 17.248 11.4907 17.1426 11.3359 16.9878C11.1812 16.8331 11.0758 16.636 11.0331 16.4213C10.9904 16.2067 11.0123 15.9843 11.0961 15.7821C11.1798 15.5799 11.3216 15.4071 11.5036 15.2856C11.6855 15.164 11.8994 15.0991 12.1183 15.0991C12.2637 15.0988 12.4077 15.1272 12.542 15.1827C12.6764 15.2382 12.7985 15.3197 12.9013 15.4225C13.0041 15.5253 13.0856 15.6473 13.1411 15.7817C13.1966 15.9161 13.225 16.0601 13.2247 16.2055V16.2055ZM16.3207 7.8055C16.3188 8.9188 15.8752 9.98585 15.0873 10.7724C14.2994 11.5589 13.2316 12.0007 12.1183 12.0007C11.0187 11.9937 9.96018 12.4181 9.16985 13.1826C8.37953 13.9471 7.92034 14.991 7.89082 16.0902C7.8613 17.1894 8.26379 18.2564 9.01194 19.0623C9.76009 19.8681 10.7943 20.3486 11.8927 20.4007C9.66485 20.3721 7.53966 19.4596 5.98461 17.864C4.42955 16.2685 3.57203 14.1205 3.60067 11.8927C3.62931 9.66488 4.54178 7.53969 6.13734 5.98464C7.7329 4.42959 9.88085 3.57206 12.1087 3.6007C12.6613 3.59944 13.2088 3.70721 13.7198 3.91783C14.2308 4.12846 14.6952 4.4378 15.0864 4.82816C15.4777 5.21851 15.7881 5.68221 15.9999 6.19269C16.2117 6.70318 16.3207 7.25043 16.3207 7.8031V7.8055ZM13.2247 7.8055C13.2251 7.58657 13.1607 7.37243 13.0394 7.19017C12.9181 7.0079 12.7455 6.86572 12.5433 6.78161C12.3412 6.6975 12.1187 6.67525 11.9039 6.71767C11.6891 6.76009 11.4918 6.86527 11.3368 7.01991C11.1818 7.17455 11.0762 7.37168 11.0333 7.58637C10.9904 7.80105 11.0122 8.02364 11.0959 8.22595C11.1795 8.42825 11.3213 8.60119 11.5033 8.72287C11.6853 8.84455 11.8993 8.9095 12.1183 8.9095C12.2637 8.90982 12.4077 8.88142 12.542 8.82593C12.6764 8.77044 12.7985 8.68895 12.9013 8.58615C13.0041 8.48335 13.0856 8.36125 13.1411 8.22688C13.1966 8.0925 13.225 7.94848 13.2247 7.8031V7.8055Z')
					]),
				_List_Nil)
			])),
	zoomToFit: $author$project$Icons$draw(
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Svg$Styled$path,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Svg$Styled$Attributes$d('M9.31445 17.5469L8.43555 18.4355L12 22L15.5645 18.4355L14.6855 17.5469L12 20.2324L9.31445 17.5469ZM14.6855 6.45312L15.5645 5.56445L12 2L8.43555 5.56445L9.31445 6.45312L12 3.76758L14.6855 6.45312ZM6.45312 14.6855L3.76758 12L6.45312 9.31445L5.56445 8.43555L2 12L5.56445 15.5645L6.45312 14.6855ZM22 12L18.4355 8.43555L17.5469 9.31445L20.2324 12L17.5469 14.6855L18.4355 15.5645L22 12ZM8.25 15.75H15.75V8.25H8.25V15.75ZM9.5 9.5H14.5V14.5H9.5V9.5Z')
					]),
				_List_Nil)
			]))
};
var $author$project$Play$githubLink = A3($author$project$Play$iconLink, 'GitHub', 'https://github.com/erkal', $author$project$Icons$icons.githubCat);
var $author$project$Play$homeButton = A3($author$project$Play$iconLink, 'Home', '../index.html', $author$project$Icons$icons.home);
var $author$project$Playground$Tape$isNoTape = function (_v0) {
	var state = _v0.a;
	return _Utils_eq(state, $author$project$Playground$Tape$NoTape);
};
var $author$project$Playground$Tape$isRecording = function (_v0) {
	var state = _v0.a;
	return _Utils_eq(state, $author$project$Playground$Tape$Recording);
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var $rtfeldman$elm_css$Css$justifyContent = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'justifyContent',
		'justify-content',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$left = $rtfeldman$elm_css$Css$prop1('left');
var $rtfeldman$elm_css$Css$active = $rtfeldman$elm_css$Css$pseudoClass('active');
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Css$none = {backgroundImage: $rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, display: $rtfeldman$elm_css$Css$Structure$Compatible, hoverCapability: $rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, outline: $rtfeldman$elm_css$Css$Structure$Compatible, pointerDevice: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, resize: $rtfeldman$elm_css$Css$Structure$Compatible, scriptingSupport: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, textTransform: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, transform: $rtfeldman$elm_css$Css$Structure$Compatible, updateFrequency: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Css$rgb = F3(
	function (r, g, b) {
		return {
			alpha: 1,
			blue: b,
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'rgb',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					_List_fromArray(
						[r, g, b])))
		};
	});
var $author$project$Play$leftBarButton = F5(
	function (hidden, isSelected, msg, title, icon) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$button,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$padding(
							$rtfeldman$elm_css$Css$rem(0.5)),
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$color(
							A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.4)),
							$rtfeldman$elm_css$Css$hover(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$color(
									A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.8))
								])),
							$rtfeldman$elm_css$Css$active(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$color(
									A3($rtfeldman$elm_css$Css$rgb, 255, 255, 255))
								])),
							isSelected ? $rtfeldman$elm_css$Css$backgroundColor(
							A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.1)) : $rtfeldman$elm_css$Css$batch(_List_Nil),
							hidden ? $rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none) : $rtfeldman$elm_css$Css$batch(_List_Nil)
						])),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(msg),
					$rtfeldman$elm_css$Html$Styled$Attributes$title(title)
				]),
			_List_fromArray(
				[icon]));
	});
var $rtfeldman$elm_css$Css$maxWidth = $rtfeldman$elm_css$Css$prop1('max-width');
var $rtfeldman$elm_css$Css$overflowY = $rtfeldman$elm_css$Css$prop1('overflow-y');
var $rtfeldman$elm_css$Css$right = $rtfeldman$elm_css$Css$prop1('right');
var $rtfeldman$elm_css$Css$spaceBetween = $rtfeldman$elm_css$Css$prop1('space-between');
var $author$project$Play$NoOp = {$: 'NoOp'};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $author$project$Play$stopPropagationOfInputs = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2($author$project$Play$NoOp, true))),
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'pointerdown',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2($author$project$Play$NoOp, true))),
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'wheel',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2($author$project$Play$NoOp, true))),
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'keydown',
		A2(
			$elm$json$Json$Decode$andThen,
			function (key) {
				return A2(
					$elm$core$List$member,
					key,
					_List_fromArray(
						['Meta', 'Control', 'Shift', 'Alt', ' '])) ? $elm$json$Json$Decode$fail('allow these keys') : $elm$json$Json$Decode$succeed(
					_Utils_Tuple2($author$project$Play$NoOp, true));
			},
			A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string)))
	]);
var $rtfeldman$elm_css$Css$top = $rtfeldman$elm_css$Css$prop1('top');
var $author$project$Play$twitterLink = A3($author$project$Play$iconLink, 'Twitter', 'https://twitter.com/AzizErkalSelman', $author$project$Icons$icons.twitter);
var $author$project$Playground$Tape$SliderMovedTo = function (a) {
	return {$: 'SliderMovedTo', a: a};
};
var $rtfeldman$elm_css$Css$alignItems = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$borderRadius = $rtfeldman$elm_css$Css$prop1('border-radius');
var $rtfeldman$elm_css$Css$center = $rtfeldman$elm_css$Css$prop1('center');
var $author$project$SelectList$getCurrentIndex = function (_v0) {
	var p = _v0.a;
	return $elm$core$List$length(p.beforeReversed);
};
var $author$project$Playground$Tape$getCurrentFrameIndex = function (_v0) {
	var timeline = _v0.b;
	return $author$project$SelectList$getCurrentIndex(timeline);
};
var $author$project$SelectList$size = function (_v0) {
	var p = _v0.a;
	return (1 + $elm$core$List$length(p.beforeReversed)) + $elm$core$List$length(p.after);
};
var $author$project$Playground$Tape$getTotalSize = function (_v0) {
	var timeline = _v0.b;
	return $author$project$SelectList$size(timeline);
};
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $rtfeldman$elm_css$Html$Styled$Attributes$max = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('max');
var $rtfeldman$elm_css$Html$Styled$Attributes$min = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('min');
var $rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $rtfeldman$elm_css$Html$Styled$Events$targetValue)));
};
var $rtfeldman$elm_css$Css$paddingLeft = $rtfeldman$elm_css$Css$prop1('padding-left');
var $rtfeldman$elm_css$Css$paddingRight = $rtfeldman$elm_css$Css$prop1('padding-right');
var $author$project$Playground$Tape$PressedPauseButton = {$: 'PressedPauseButton'};
var $author$project$Playground$Tape$PressedPlayButton = {$: 'PressedPlayButton'};
var $rtfeldman$elm_css$Css$disabled = $rtfeldman$elm_css$Css$pseudoClass('disabled');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$disabled = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('disabled');
var $rtfeldman$elm_css$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var $rtfeldman$elm_css$Css$num = function (val) {
	return {
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		lineHeight: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessFloat,
		value: $elm$core$String$fromFloat(val)
	};
};
var $rtfeldman$elm_css$Css$opacity = $rtfeldman$elm_css$Css$prop1('opacity');
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $author$project$Playground$Tape$playPauseButton = function (_v0) {
	var state = _v0.a;
	var timeline = _v0.b;
	var tapeButtonWithIcon = F3(
		function (isDisabled, icon, msg) {
			return A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$padding(
								$rtfeldman$elm_css$Css$rem(0.5)),
								$rtfeldman$elm_css$Css$backgroundColor(
								A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.6)),
								$rtfeldman$elm_css$Css$hover(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$backgroundColor(
										A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.8))
									])),
								$rtfeldman$elm_css$Css$active(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$backgroundColor(
										A3($rtfeldman$elm_css$Css$rgb, 0, 0, 0))
									])),
								$rtfeldman$elm_css$Css$disabled(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$opacity(
										$rtfeldman$elm_css$Css$num(0.3)),
										$rtfeldman$elm_css$Css$backgroundColor(
										A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.6))
									])),
								$rtfeldman$elm_css$Css$borderRadius(
								$rtfeldman$elm_css$Css$rem(0.5))
							])),
						$rtfeldman$elm_css$Html$Styled$Attributes$disabled(isDisabled),
						$rtfeldman$elm_css$Html$Styled$Events$onClick(msg)
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$width(
										$rtfeldman$elm_css$Css$rem(1.5)),
										$rtfeldman$elm_css$Css$height(
										$rtfeldman$elm_css$Css$rem(1.5)),
										$rtfeldman$elm_css$Css$color(
										A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.6)),
										$rtfeldman$elm_css$Css$hover(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$color(
												A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.8))
											]))
									]))
							]),
						_List_fromArray(
							[icon]))
					]));
		});
	switch (state.$) {
		case 'NoTape':
			return $rtfeldman$elm_css$Html$Styled$text('');
		case 'Recording':
			return $rtfeldman$elm_css$Html$Styled$text('');
		case 'Paused':
			return A3(
				tapeButtonWithIcon,
				$author$project$SelectList$isAtEnd(timeline),
				$author$project$Icons$icons.play,
				$author$project$Playground$Tape$PressedPlayButton);
		default:
			return A3(tapeButtonWithIcon, false, $author$project$Icons$icons.pause, $author$project$Playground$Tape$PressedPauseButton);
	}
};
var $rtfeldman$elm_css$Html$Styled$Attributes$step = function (n) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'step', n);
};
var $author$project$Playground$Tape$PressedRecordButton = {$: 'PressedRecordButton'};
var $author$project$Playground$Tape$tapeToggleButton = function (_v0) {
	var state = _v0.a;
	var timeline = _v0.b;
	var recButton = F2(
		function (msg, icon) {
			return A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$rem(2)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$rem(2)),
								$rtfeldman$elm_css$Css$color(
								A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.6)),
								$rtfeldman$elm_css$Css$hover(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$color(
										A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.8))
									]))
							])),
						$rtfeldman$elm_css$Html$Styled$Events$onClick(msg)
					]),
				_List_fromArray(
					[icon]));
		});
	switch (state.$) {
		case 'NoTape':
			return $rtfeldman$elm_css$Html$Styled$text('');
		case 'Recording':
			return A2(recButton, $author$project$Playground$Tape$PressedPauseButton, $author$project$Icons$icons.tape);
		case 'Paused':
			return A2(recButton, $author$project$Playground$Tape$PressedRecordButton, $author$project$Icons$icons.cross);
		default:
			return A2(recButton, $author$project$Playground$Tape$PressedRecordButton, $author$project$Icons$icons.cross);
	}
};
var $rtfeldman$elm_css$Html$Styled$Attributes$type_ = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('type');
var $rtfeldman$elm_css$Html$Styled$Attributes$value = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var $author$project$DesignSystem$Color$whiteAlpha500 = A4($avh4$elm_color$Color$rgba, 0.98, 0.96, 0.9, 0.36);
var $author$project$Playground$Tape$view = function (tape) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$pct(100)),
						$rtfeldman$elm_css$Css$height(
						$rtfeldman$elm_css$Css$pct(100)),
						$rtfeldman$elm_css$Css$paddingLeft(
						$rtfeldman$elm_css$Css$rem(0.5)),
						$rtfeldman$elm_css$Css$paddingRight(
						$rtfeldman$elm_css$Css$rem(0.5)),
						$rtfeldman$elm_css$Css$borderTopLeftRadius(
						$rtfeldman$elm_css$Css$rem(0.5)),
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
						A2($rtfeldman$elm_css$Css$property, 'gap', '1rem'),
						$author$project$Playground$Tape$isNoTape(tape) ? $rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none) : $rtfeldman$elm_css$Css$batch(_List_Nil)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row),
								$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
								A2($rtfeldman$elm_css$Css$property, 'gap', '0.5rem'),
								$author$project$Playground$Tape$isRecording(tape) ? $rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none) : $rtfeldman$elm_css$Css$batch(_List_Nil)
							]))
					]),
				_List_fromArray(
					[
						$author$project$Playground$Tape$playPauseButton(tape),
						A2(
						$rtfeldman$elm_css$Html$Styled$input,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$type_('range'),
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$width(
										$rtfeldman$elm_css$Css$px(260)),
										$rtfeldman$elm_css$Css$height(
										$rtfeldman$elm_css$Css$px(8)),
										$rtfeldman$elm_css$Css$borderRadius(
										$rtfeldman$elm_css$Css$px(4)),
										$rtfeldman$elm_css$Css$backgroundColor(
										$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha500))
									])),
								$rtfeldman$elm_css$Html$Styled$Attributes$min(
								$elm$core$String$fromInt(0)),
								$rtfeldman$elm_css$Html$Styled$Attributes$max(
								$elm$core$String$fromInt(
									$author$project$Playground$Tape$getTotalSize(tape) - 1)),
								$rtfeldman$elm_css$Html$Styled$Attributes$value(
								$elm$core$String$fromInt(
									$author$project$Playground$Tape$getCurrentFrameIndex(tape))),
								$rtfeldman$elm_css$Html$Styled$Attributes$step(
								$elm$core$String$fromInt(1)),
								$rtfeldman$elm_css$Html$Styled$Events$onInput(
								A2(
									$elm$core$Basics$composeR,
									$elm$core$String$toFloat,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$Maybe$withDefault(42),
										A2($elm$core$Basics$composeR, $elm$core$Basics$round, $author$project$Playground$Tape$SliderMovedTo))))
							]),
						_List_Nil)
					])),
				$author$project$Playground$Tape$tapeToggleButton(tape)
			]));
};
var $rtfeldman$elm_css$Css$bold = {fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'bold'};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $rtfeldman$elm_css$Css$fontWeight = function (_v0) {
	var value = _v0.value;
	return A2($rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $author$project$Play$maybeFloatToString = function (maybeFloat) {
	if (maybeFloat.$ === 'Nothing') {
		return 'Nothing';
	} else {
		var f = maybeFloat.a;
		return $elm$core$String$fromFloat(f);
	}
};
var $author$project$Play$viewComputer = function (model) {
	var computer = $author$project$Playground$Tape$currentComputer(model.tape);
	var boolAsText = function (bool) {
		return bool ? 'True' : 'False';
	};
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$padding(
						$rtfeldman$elm_css$Css$rem(1.5)),
						$rtfeldman$elm_css$Css$fontSize(
						$rtfeldman$elm_css$Css$rem(0.875)),
						$rtfeldman$elm_css$Css$color(
						A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.8)),
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						A2($rtfeldman$elm_css$Css$property, 'gap', '2rem')
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
								A2($rtfeldman$elm_css$Css$property, 'gap', '0.5rem')
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$fontSize(
										$rtfeldman$elm_css$Css$rem(1.5)),
										$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
									]))
							]),
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Tape')
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'frame: ' + $elm$core$String$fromInt(
									$author$project$Playground$Tape$getCurrentFrameIndex(model.tape)))
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
								A2($rtfeldman$elm_css$Css$property, 'gap', '0.5rem')
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$fontSize(
										$rtfeldman$elm_css$Css$rem(1.5)),
										$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
									]))
							]),
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Inputs')
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'pressedKeys: ' + $elm$core$String$concat(
									A2($elm$core$List$intersperse, ' ', computer.keyboard.pressedKeys)))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'keyboard.shift: ' + boolAsText(computer.keyboard.shift))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'keyboard.control: ' + boolAsText(computer.keyboard.control))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'downs: ' + $elm$core$String$concat(
									A2($elm$core$List$intersperse, ' ', computer.keyboard.downs)))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'delta time: ' + A2($myrho$elm_round$Round$round, 4, computer.dt))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'clock: ' + A2($myrho$elm_round$Round$round, 4, computer.clock))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'pointer is down: ' + (computer.pointer.isDown ? 'yes' : 'no'))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'pointer.x: ' + A2($myrho$elm_round$Round$round, 2, computer.pointer.x))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'pointer.y: ' + A2($myrho$elm_round$Round$round, 2, computer.pointer.y))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'wheel.deltaX: ' + $elm$core$String$fromFloat(computer.wheel.deltaX))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'wheel.deltaY: ' + $elm$core$String$fromFloat(computer.wheel.deltaY))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'wheel.pinchDeltaForChrome: ' + $elm$core$String$fromFloat(computer.wheel.pinchDeltaForChrome))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(
								'pinchScaleForSafari: ' + $author$project$Play$maybeFloatToString(computer.wheel.pinchScaleForSafari))
							]))
					]))
			]));
};
var $author$project$Playground$Configurations$SetBool = F2(
	function (a, b) {
		return {$: 'SetBool', a: a, b: b};
	});
var $author$project$Playground$Configurations$SetColor = F2(
	function (a, b) {
		return {$: 'SetColor', a: a, b: b};
	});
var $author$project$Playground$Configurations$SetFloat = F2(
	function (a, b) {
		return {$: 'SetFloat', a: a, b: b};
	});
var $author$project$Playground$Configurations$SetInt = F2(
	function (a, b) {
		return {$: 'SetInt', a: a, b: b};
	});
var $author$project$Playground$Configurations$SetOption = F2(
	function (a, b) {
		return {$: 'SetOption', a: a, b: b};
	});
var $author$project$Playground$Configurations$SetString = F2(
	function (a, b) {
		return {$: 'SetString', a: a, b: b};
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$checked = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('checked');
var $rtfeldman$elm_css$Css$cursor = $rtfeldman$elm_css$Css$prop1('cursor');
var $rtfeldman$elm_css$Html$Styled$Attributes$for = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('htmlFor');
var $rtfeldman$elm_css$Html$Styled$Attributes$id = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var $author$project$DesignSystem$Color$whiteAlpha700 = A4($avh4$elm_color$Color$rgba, 0.98, 0.96, 0.9, 0.64);
var $author$project$DesignSystem$inputLabel = function (str) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$fontSize(
						$rtfeldman$elm_css$Css$px(12)),
						$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold),
						$rtfeldman$elm_css$Css$color(
						$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha700))
					]))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(str)
			]));
};
var $rtfeldman$elm_css$Html$Styled$label = $rtfeldman$elm_css$Html$Styled$node('label');
var $rtfeldman$elm_css$Html$Styled$Attributes$name = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('name');
var $rtfeldman$elm_css$Html$Styled$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $rtfeldman$elm_css$Html$Styled$Events$onCheck = function (tagger) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $rtfeldman$elm_css$Html$Styled$Events$targetChecked));
};
var $rtfeldman$elm_css$Css$pointer = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'pointer'};
var $author$project$DesignSystem$Color$whiteAlpha800 = A4($avh4$elm_color$Color$rgba, 0.98, 0.96, 0.9, 0.8);
var $author$project$DesignSystem$checkbox = function (_v0) {
	var name = _v0.name;
	var value = _v0.value;
	var onCheck = _v0.onCheck;
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
						A2($rtfeldman$elm_css$Css$property, 'gap', '8px'),
						$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$input,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$type_('checkbox'),
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$px(16)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(16)),
								$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
							])),
						$rtfeldman$elm_css$Html$Styled$Attributes$id(name),
						$rtfeldman$elm_css$Html$Styled$Attributes$name(name),
						$rtfeldman$elm_css$Html$Styled$Attributes$checked(value),
						$rtfeldman$elm_css$Html$Styled$Events$onCheck(onCheck)
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$label,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$for(name),
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer),
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha800))
							]))
					]),
				_List_fromArray(
					[
						$author$project$DesignSystem$inputLabel(name)
					]))
			]));
};
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.value + (' ' + (argB.value + (' ' + argC.value))));
	});
var $rtfeldman$elm_css$Css$border3 = $rtfeldman$elm_css$Css$prop3('border');
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $noahzgordon$elm_color_extra$Color$Convert$toRadix = function (n) {
	var getChr = function (c) {
		return (c < 10) ? $elm$core$String$fromInt(c) : $elm$core$String$fromChar(
			$elm$core$Char$fromCode(87 + c));
	};
	return (n < 16) ? getChr(n) : _Utils_ap(
		$noahzgordon$elm_color_extra$Color$Convert$toRadix((n / 16) | 0),
		getChr(
			A2($elm$core$Basics$modBy, 16, n)));
};
var $noahzgordon$elm_color_extra$Color$Convert$toHex = A2(
	$elm$core$Basics$composeR,
	$noahzgordon$elm_color_extra$Color$Convert$toRadix,
	A2(
		$elm$core$String$padLeft,
		2,
		_Utils_chr('0')));
var $noahzgordon$elm_color_extra$Color$Convert$colorToHex = function (cl) {
	var _v0 = $avh4$elm_color$Color$toRgba(cl);
	var red = _v0.red;
	var green = _v0.green;
	var blue = _v0.blue;
	return A2(
		$elm$core$String$join,
		'',
		A2(
			$elm$core$List$cons,
			'#',
			A2(
				$elm$core$List$map,
				A2($elm$core$Basics$composeR, $elm$core$Basics$round, $noahzgordon$elm_color_extra$Color$Convert$toHex),
				_List_fromArray(
					[red * 255, green * 255, blue * 255]))));
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$findAtMost = _Regex_findAtMost;
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $fredcy$elm_parseint$ParseInt$InvalidRadix = function (a) {
	return {$: 'InvalidRadix', a: a};
};
var $fredcy$elm_parseint$ParseInt$InvalidChar = function (a) {
	return {$: 'InvalidChar', a: a};
};
var $fredcy$elm_parseint$ParseInt$OutOfRange = function (a) {
	return {$: 'OutOfRange', a: a};
};
var $fredcy$elm_parseint$ParseInt$charOffset = F2(
	function (basis, c) {
		return $elm$core$Char$toCode(c) - $elm$core$Char$toCode(basis);
	});
var $fredcy$elm_parseint$ParseInt$isBetween = F3(
	function (lower, upper, c) {
		var ci = $elm$core$Char$toCode(c);
		return (_Utils_cmp(
			$elm$core$Char$toCode(lower),
			ci) < 1) && (_Utils_cmp(
			ci,
			$elm$core$Char$toCode(upper)) < 1);
	});
var $fredcy$elm_parseint$ParseInt$intFromChar = F2(
	function (radix, c) {
		var validInt = function (i) {
			return (_Utils_cmp(i, radix) < 0) ? $elm$core$Result$Ok(i) : $elm$core$Result$Err(
				$fredcy$elm_parseint$ParseInt$OutOfRange(c));
		};
		var toInt = A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('0'),
			_Utils_chr('9'),
			c) ? $elm$core$Result$Ok(
			A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('0'),
				c)) : (A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('a'),
			_Utils_chr('z'),
			c) ? $elm$core$Result$Ok(
			10 + A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('a'),
				c)) : (A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('A'),
			_Utils_chr('Z'),
			c) ? $elm$core$Result$Ok(
			10 + A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('A'),
				c)) : $elm$core$Result$Err(
			$fredcy$elm_parseint$ParseInt$InvalidChar(c))));
		return A2($elm$core$Result$andThen, validInt, toInt);
	});
var $fredcy$elm_parseint$ParseInt$parseIntR = F2(
	function (radix, rstring) {
		var _v0 = $elm$core$String$uncons(rstring);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Ok(0);
		} else {
			var _v1 = _v0.a;
			var c = _v1.a;
			var rest = _v1.b;
			return A2(
				$elm$core$Result$andThen,
				function (ci) {
					return A2(
						$elm$core$Result$andThen,
						function (ri) {
							return $elm$core$Result$Ok(ci + (ri * radix));
						},
						A2($fredcy$elm_parseint$ParseInt$parseIntR, radix, rest));
				},
				A2($fredcy$elm_parseint$ParseInt$intFromChar, radix, c));
		}
	});
var $fredcy$elm_parseint$ParseInt$parseIntRadix = F2(
	function (radix, string) {
		return ((2 <= radix) && (radix <= 36)) ? A2(
			$fredcy$elm_parseint$ParseInt$parseIntR,
			radix,
			$elm$core$String$reverse(string)) : $elm$core$Result$Err(
			$fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var $fredcy$elm_parseint$ParseInt$parseIntHex = $fredcy$elm_parseint$ParseInt$parseIntRadix(16);
var $avh4$elm_color$Color$rgb = F3(
	function (r, g, b) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
	});
var $elm$core$Basics$pow = _Basics_pow;
var $noahzgordon$elm_color_extra$Color$Convert$roundToPlaces = F2(
	function (places, number) {
		var multiplier = A2($elm$core$Basics$pow, 10, places);
		return $elm$core$Basics$round(number * multiplier) / multiplier;
	});
var $elm$core$String$toLower = _String_toLower;
var $noahzgordon$elm_color_extra$Color$Convert$hexToColor = function () {
	var pattern = '' + ('^' + ('#?' + ('(?:' + ('(?:([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2}))' + ('|' + ('(?:([a-f\\d])([a-f\\d])([a-f\\d]))' + ('|' + ('(?:([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2}))' + ('|' + ('(?:([a-f\\d])([a-f\\d])([a-f\\d])([a-f\\d]))' + (')' + '$')))))))))));
	var extend = function (token) {
		var _v6 = $elm$core$String$toList(token);
		if (_v6.b && (!_v6.b.b)) {
			var token_ = _v6.a;
			return $elm$core$String$fromList(
				_List_fromArray(
					[token_, token_]));
		} else {
			return token;
		}
	};
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$String$toLower,
		A2(
			$elm$core$Basics$composeR,
			function (str) {
				return A2(
					$elm$core$Maybe$map,
					function (regex) {
						return A3($elm$regex$Regex$findAtMost, 1, regex, str);
					},
					$elm$regex$Regex$fromString(pattern));
			},
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$andThen($elm$core$List$head),
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$map(
						function ($) {
							return $.submatches;
						}),
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Maybe$map(
							$elm$core$List$filterMap($elm$core$Basics$identity)),
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Result$fromMaybe('Parsing hex regex failed'),
							$elm$core$Result$andThen(
								function (colors) {
									var _v0 = A2(
										$elm$core$List$map,
										A2(
											$elm$core$Basics$composeR,
											extend,
											A2(
												$elm$core$Basics$composeR,
												$fredcy$elm_parseint$ParseInt$parseIntHex,
												$elm$core$Result$map($elm$core$Basics$toFloat))),
										colors);
									_v0$2:
									while (true) {
										if (((((_v0.b && (_v0.a.$ === 'Ok')) && _v0.b.b) && (_v0.b.a.$ === 'Ok')) && _v0.b.b.b) && (_v0.b.b.a.$ === 'Ok')) {
											if (_v0.b.b.b.b) {
												if ((_v0.b.b.b.a.$ === 'Ok') && (!_v0.b.b.b.b.b)) {
													var r = _v0.a.a;
													var _v1 = _v0.b;
													var g = _v1.a.a;
													var _v2 = _v1.b;
													var b = _v2.a.a;
													var _v3 = _v2.b;
													var a = _v3.a.a;
													return $elm$core$Result$Ok(
														A4(
															$avh4$elm_color$Color$rgba,
															r / 255,
															g / 255,
															b / 255,
															A2($noahzgordon$elm_color_extra$Color$Convert$roundToPlaces, 2, a / 255)));
												} else {
													break _v0$2;
												}
											} else {
												var r = _v0.a.a;
												var _v4 = _v0.b;
												var g = _v4.a.a;
												var _v5 = _v4.b;
												var b = _v5.a.a;
												return $elm$core$Result$Ok(
													A3($avh4$elm_color$Color$rgb, r / 255, g / 255, b / 255));
											}
										} else {
											break _v0$2;
										}
									}
									return $elm$core$Result$Err('Parsing ints from hex failed');
								})))))));
}();
var $rtfeldman$elm_css$Css$marginBottom = $rtfeldman$elm_css$Css$prop1('margin-bottom');
var $rtfeldman$elm_css$Css$solid = {borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'solid'};
var $author$project$DesignSystem$Color$whiteAlpha400 = A4($avh4$elm_color$Color$rgba, 0.98, 0.96, 0.9, 0.24);
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $rtfeldman$elm_css$Css$UnitlessInteger = {$: 'UnitlessInteger'};
var $rtfeldman$elm_css$Css$zero = {length: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible, number: $rtfeldman$elm_css$Css$Structure$Compatible, numericValue: 0, outline: $rtfeldman$elm_css$Css$Structure$Compatible, unitLabel: '', units: $rtfeldman$elm_css$Css$UnitlessInteger, value: '0'};
var $author$project$DesignSystem$colorPicker = function (_v0) {
	var name = _v0.name;
	var value = _v0.value;
	var onChange = _v0.onChange;
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$marginBottom(
								$rtfeldman$elm_css$Css$px(8))
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$label,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$for(name)
							]),
						_List_fromArray(
							[
								$author$project$DesignSystem$inputLabel(name)
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$input,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$type_('color'),
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(100)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(32)),
								$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
								$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer),
								A3(
								$rtfeldman$elm_css$Css$border3,
								$rtfeldman$elm_css$Css$px(1),
								$rtfeldman$elm_css$Css$solid,
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha400)),
								$rtfeldman$elm_css$Css$borderRadius(
								$rtfeldman$elm_css$Css$px(4))
							])),
						$rtfeldman$elm_css$Html$Styled$Attributes$id(name),
						$rtfeldman$elm_css$Html$Styled$Attributes$name(name),
						$rtfeldman$elm_css$Html$Styled$Events$onInput(
						A2(
							$elm$core$Basics$composeR,
							$noahzgordon$elm_color_extra$Color$Convert$hexToColor,
							A2(
								$elm$core$Basics$composeR,
								$elm$core$Result$withDefault($avh4$elm_color$Color$black),
								onChange))),
						$rtfeldman$elm_css$Html$Styled$Attributes$value(
						$noahzgordon$elm_color_extra$Color$Convert$colorToHex(value))
					]),
				_List_Nil)
			]));
};
var $author$project$DesignSystem$Color$blackAlpha600 = A4($avh4$elm_color$Color$rgba, 0.08, 0.08, 0.12, 0.48);
var $rtfeldman$elm_css$Html$Styled$option = $rtfeldman$elm_css$Html$Styled$node('option');
var $rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.value + (' ' + argB.value));
	});
var $rtfeldman$elm_css$Css$padding2 = $rtfeldman$elm_css$Css$prop2('padding');
var $rtfeldman$elm_css$Html$Styled$select = $rtfeldman$elm_css$Html$Styled$node('select');
var $author$project$DesignSystem$Color$whiteAlpha900 = A4($avh4$elm_color$Color$rgba, 0.98, 0.96, 0.9, 0.92);
var $author$project$DesignSystem$optionSelection = function (_v0) {
	var name = _v0.name;
	var options = _v0.options;
	var optionToString = _v0.optionToString;
	var onChange = _v0.onChange;
	var optionWith = function (optionStr) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$option,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$value(optionStr)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(optionStr)
				]));
	};
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$marginBottom(
								$rtfeldman$elm_css$Css$px(8))
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$label,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$for(name)
							]),
						_List_fromArray(
							[
								$author$project$DesignSystem$inputLabel(name)
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$select,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$maxWidth($rtfeldman$elm_css$Css$fitContent),
								A2(
								$rtfeldman$elm_css$Css$padding2,
								$rtfeldman$elm_css$Css$px(4),
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$borderRadius(
								$rtfeldman$elm_css$Css$px(4)),
								$rtfeldman$elm_css$Css$backgroundColor(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$blackAlpha600)),
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha900)),
								A3(
								$rtfeldman$elm_css$Css$border3,
								$rtfeldman$elm_css$Css$px(1),
								$rtfeldman$elm_css$Css$solid,
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha400))
							])),
						$rtfeldman$elm_css$Html$Styled$Attributes$id(name),
						$rtfeldman$elm_css$Html$Styled$Attributes$name(name),
						A2(
						$rtfeldman$elm_css$Html$Styled$Events$on,
						'change',
						A2($elm$json$Json$Decode$map, onChange, $rtfeldman$elm_css$Html$Styled$Events$targetValue)),
						$rtfeldman$elm_css$Html$Styled$Attributes$value(
						optionToString(
							$author$project$SelectList$getCurrent(options)))
					]),
				A2(
					$elm$core$List$map,
					A2($elm$core$Basics$composeR, optionToString, optionWith),
					$author$project$SelectList$toList(options)))
			]));
};
var $author$project$DesignSystem$Color$cyan400 = A4($avh4$elm_color$Color$rgba, 0.22, 0.78, 0.74, 1);
var $rtfeldman$elm_css$Css$float = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'float',
		'float',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$inlineBlock = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline-block'};
var $rtfeldman$elm_css$Css$relative = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'relative'};
var $author$project$DesignSystem$slider = function (_v0) {
	var name = _v0.name;
	var value = _v0.value;
	var min = _v0.min;
	var max = _v0.max;
	var step = _v0.step;
	var onChange = _v0.onChange;
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$pct(100)),
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						A2($rtfeldman$elm_css$Css$property, 'gap', '8px')
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$label,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$for(name)
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
										$rtfeldman$elm_css$Css$width(
										$rtfeldman$elm_css$Css$pct(100))
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
												$rtfeldman$elm_css$Css$color(
												$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha700))
											]))
									]),
								_List_fromArray(
									[
										$author$project$DesignSystem$inputLabel(name)
									])),
								A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
												$rtfeldman$elm_css$Css$float($rtfeldman$elm_css$Css$right),
												$rtfeldman$elm_css$Css$color(
												$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$cyan400))
											]))
									]),
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text(
										$elm$core$String$fromFloat(value))
									]))
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$input,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$type_('range'),
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(100)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$backgroundColor(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$blackAlpha600)),
								$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer),
								$rtfeldman$elm_css$Css$borderRadius(
								$rtfeldman$elm_css$Css$px(4))
							])),
						$rtfeldman$elm_css$Html$Styled$Attributes$id(name),
						$rtfeldman$elm_css$Html$Styled$Attributes$name(name),
						$rtfeldman$elm_css$Html$Styled$Attributes$min(
						$elm$core$String$fromFloat(min)),
						$rtfeldman$elm_css$Html$Styled$Attributes$max(
						$elm$core$String$fromFloat(max)),
						$rtfeldman$elm_css$Html$Styled$Attributes$value(
						$elm$core$String$fromFloat(value)),
						$rtfeldman$elm_css$Html$Styled$Attributes$step(
						$elm$core$String$fromFloat(step)),
						$rtfeldman$elm_css$Html$Styled$Events$onInput(
						A2(
							$elm$core$Basics$composeR,
							$elm$core$String$toFloat,
							A2(
								$elm$core$Basics$composeR,
								$elm$core$Maybe$withDefault(42),
								onChange)))
					]),
				_List_Nil)
			]));
};
var $rtfeldman$elm_css$Css$borderBottom3 = $rtfeldman$elm_css$Css$prop3('border-bottom');
var $rtfeldman$elm_css$Css$focus = $rtfeldman$elm_css$Css$pseudoClass('focus');
var $rtfeldman$elm_css$Css$stringsToValue = function (list) {
	return $elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A2($elm$core$String$join, ', ', list)
	};
};
var $rtfeldman$elm_css$Css$fontFamilies = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('font-family'),
	$rtfeldman$elm_css$Css$stringsToValue);
var $rtfeldman$elm_css$Css$outline = $rtfeldman$elm_css$Css$prop1('outline');
var $author$project$DesignSystem$textInput = function (_v0) {
	var name = _v0.name;
	var value = _v0.value;
	var onChange = _v0.onChange;
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						A2($rtfeldman$elm_css$Css$property, 'gap', '8px')
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$label,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$for(name)
					]),
				_List_fromArray(
					[
						$author$project$DesignSystem$inputLabel(name)
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$input,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$padding(
										$rtfeldman$elm_css$Css$px(8)),
										$rtfeldman$elm_css$Css$width(
										$rtfeldman$elm_css$Css$pct(100)),
										$rtfeldman$elm_css$Css$color(
										$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha900)),
										$rtfeldman$elm_css$Css$backgroundColor(
										$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$blackAlpha600)),
										$rtfeldman$elm_css$Css$fontFamilies(
										_List_fromArray(
											['monospace'])),
										$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold),
										$rtfeldman$elm_css$Css$borderRadius(
										$rtfeldman$elm_css$Css$px(4)),
										$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$none),
										A3(
										$rtfeldman$elm_css$Css$borderBottom3,
										$rtfeldman$elm_css$Css$px(2),
										$rtfeldman$elm_css$Css$solid,
										$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha400)),
										$rtfeldman$elm_css$Css$focus(
										_List_fromArray(
											[
												A3(
												$rtfeldman$elm_css$Css$borderBottom3,
												$rtfeldman$elm_css$Css$px(2),
												$rtfeldman$elm_css$Css$solid,
												$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha700))
											]))
									])),
								$rtfeldman$elm_css$Html$Styled$Events$onInput(onChange),
								$rtfeldman$elm_css$Html$Styled$Attributes$value(value)
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Playground$ConfigurationsView$viewConfig = function (_v0) {
	var name = _v0.a;
	var config = _v0.b;
	switch (config.$) {
		case 'BoolConfig':
			var value = config.a;
			return $author$project$DesignSystem$checkbox(
				{
					name: name,
					onCheck: $author$project$Playground$Configurations$SetBool(name),
					value: value
				});
		case 'StringConfig':
			var value = config.a;
			return $author$project$DesignSystem$textInput(
				{
					name: name,
					onChange: $author$project$Playground$Configurations$SetString(name),
					value: value
				});
		case 'FloatConfig':
			var _v2 = config.a;
			var min = _v2.a;
			var max = _v2.b;
			var value = config.b;
			return $author$project$DesignSystem$slider(
				{
					max: max,
					min: min,
					name: name,
					onChange: $author$project$Playground$Configurations$SetFloat(name),
					step: 0.01 * (max - min),
					value: value
				});
		case 'IntConfig':
			var _v3 = config.a;
			var min = _v3.a;
			var max = _v3.b;
			var value = config.b;
			return $author$project$DesignSystem$slider(
				{
					max: max,
					min: min,
					name: name,
					onChange: A2(
						$elm$core$Basics$composeR,
						$elm$core$Basics$round,
						$author$project$Playground$Configurations$SetInt(name)),
					step: 1,
					value: value
				});
		case 'ColorConfig':
			var value = config.a;
			return $author$project$DesignSystem$colorPicker(
				{
					name: name,
					onChange: $author$project$Playground$Configurations$SetColor(name),
					value: value
				});
		default:
			var options = config.a;
			return $author$project$DesignSystem$optionSelection(
				{
					name: name,
					onChange: $author$project$Playground$Configurations$SetOption(name),
					optionToString: $elm$core$Basics$identity,
					options: options
				});
	}
};
var $author$project$Playground$ConfigurationsView$viewBlock = function (block) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						A2($rtfeldman$elm_css$Css$property, 'gap', '1rem')
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$rem(1.5)),
								$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(block.name)
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$rem(0.875)),
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
								A2($rtfeldman$elm_css$Css$property, 'gap', '1rem')
							]))
					]),
				A2($elm$core$List$map, $author$project$Playground$ConfigurationsView$viewConfig, block.configs))
			]));
};
var $author$project$Playground$ConfigurationsView$viewConfigurations = function (configurations) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$padding(
						$rtfeldman$elm_css$Css$rem(1.5)),
						$rtfeldman$elm_css$Css$color(
						A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.7)),
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						A2($rtfeldman$elm_css$Css$property, 'gap', '3rem')
					]))
			]),
		A2($elm$core$List$map, $author$project$Playground$ConfigurationsView$viewBlock, configurations));
};
var $author$project$Play$viewPointer = F2(
	function (computer, model) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$rem(2)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$rem(2)),
							$rtfeldman$elm_css$Css$left(
							$rtfeldman$elm_css$Css$px(computer.pointer.x + (0.5 * computer.screen.width))),
							$rtfeldman$elm_css$Css$top(
							$rtfeldman$elm_css$Css$px((-computer.pointer.y) + (0.5 * computer.screen.height)))
						]))
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$color(
									computer.pointer.isDown ? A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.8) : A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.4))
								]))
						]),
					_List_fromArray(
						[$author$project$Icons$icons.pointer]))
				]));
	});
var $author$project$Play$viewHUD = F2(
	function (computer, model) {
		var yinYangButton = A5($author$project$Play$leftBarButton, false, false, $author$project$Play$ClickedDistractionFreeButton, 'Distraction Free Mode', $author$project$Icons$icons.yinYang);
		var viewTape = A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
							$rtfeldman$elm_css$Css$bottom($rtfeldman$elm_css$Css$zero),
							$rtfeldman$elm_css$Css$right($rtfeldman$elm_css$Css$zero),
							$rtfeldman$elm_css$Css$maxWidth($rtfeldman$elm_css$Css$fitContent),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$backgroundColor(
							A3($rtfeldman$elm_css$Css$rgb, 0, 0, 0)),
							$rtfeldman$elm_css$Css$borderTopLeftRadius(
							$rtfeldman$elm_css$Css$rem(0.5))
						]))
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Play$FromTapeControls,
					$author$project$Playground$Tape$view(model.tape))
				]));
		var viewInputs = A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$overflowY($rtfeldman$elm_css$Css$auto),
							$rtfeldman$elm_css$Css$left(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$backgroundColor(
							A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.4)),
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$px(260)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(
								$author$project$Playground$Tape$currentComputer(model.tape).screen.height)),
							(!_Utils_eq(model.leftBarState, $author$project$Play$ShowingInputs)) ? $rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none) : $rtfeldman$elm_css$Css$batch(_List_Nil)
						]))
				]),
			_List_fromArray(
				[
					$author$project$Play$viewComputer(model)
				]));
		var viewConfigurations = A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$overflowY($rtfeldman$elm_css$Css$auto),
							$rtfeldman$elm_css$Css$left(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$backgroundColor(
							A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.4)),
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$px(260)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(computer.screen.height)),
							(!_Utils_eq(model.leftBarState, $author$project$Play$ShowingConfigurations)) ? $rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none) : $rtfeldman$elm_css$Css$batch(_List_Nil)
						]))
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Play$FromConfigurationsEditor,
					$author$project$Playground$ConfigurationsView$viewConfigurations(
						$author$project$Playground$Tape$currentComputer(model.tape).configurations))
				]));
		var inputsButton = A5(
			$author$project$Play$leftBarButton,
			false,
			_Utils_eq(model.leftBarState, $author$project$Play$ShowingInputs),
			$author$project$Play$ClickedOnShowInputsButton,
			'Inputs',
			$author$project$Icons$icons.computer);
		var configurationsButton = A5(
			$author$project$Play$leftBarButton,
			$elm$core$List$isEmpty(
				$author$project$Playground$Tape$currentComputer(model.tape).configurations),
			_Utils_eq(model.leftBarState, $author$project$Play$ShowingConfigurations),
			$author$project$Play$ClickedOnShowConfigurationsButton,
			'Configurations',
			$author$project$Icons$icons.gear);
		var leftStripe = A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$rem(3)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$pct(100)),
							$rtfeldman$elm_css$Css$backgroundColor(
							A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.8)),
							$rtfeldman$elm_css$Css$displayFlex,
							$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
							$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$spaceBetween)
						]))
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$displayFlex,
									$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column)
								]))
						]),
					_List_fromArray(
						[
							yinYangButton,
							configurationsButton,
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[
											$author$project$Playground$Tape$isNoTape(model.tape) ? $rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none) : $rtfeldman$elm_css$Css$batch(_List_Nil)
										]))
								]),
							_List_fromArray(
								[inputsButton]))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$displayFlex,
									$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column)
								]))
						]),
					_List_fromArray(
						[$author$project$Play$twitterLink, $author$project$Play$githubLink, $author$project$Play$homeButton]))
				]));
		return model.distractionFree ? A2(
			$rtfeldman$elm_css$Html$Styled$div,
			$author$project$Play$stopPropagationOfInputs,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
									$rtfeldman$elm_css$Css$top($rtfeldman$elm_css$Css$zero),
									$rtfeldman$elm_css$Css$left($rtfeldman$elm_css$Css$zero),
									$rtfeldman$elm_css$Css$width(
									$rtfeldman$elm_css$Css$rem(3)),
									$rtfeldman$elm_css$Css$height(
									$rtfeldman$elm_css$Css$rem(3))
								]))
						]),
					_List_fromArray(
						[yinYangButton]))
				])) : A2(
			$rtfeldman$elm_css$Html$Styled$div,
			$author$project$Play$stopPropagationOfInputs,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
									$rtfeldman$elm_css$Css$left($rtfeldman$elm_css$Css$zero),
									$rtfeldman$elm_css$Css$top($rtfeldman$elm_css$Css$zero),
									$rtfeldman$elm_css$Css$height(
									$rtfeldman$elm_css$Css$pct(100)),
									$rtfeldman$elm_css$Css$displayFlex,
									$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row)
								]))
						]),
					_List_fromArray(
						[leftStripe, viewConfigurations, viewInputs])),
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
									$rtfeldman$elm_css$Css$left($rtfeldman$elm_css$Css$zero),
									$rtfeldman$elm_css$Css$top($rtfeldman$elm_css$Css$zero),
									($author$project$Playground$Tape$isRecording(model.tape) || $author$project$Playground$Tape$isNoTape(model.tape)) ? $rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none) : $rtfeldman$elm_css$Css$batch(_List_Nil)
								]))
						]),
					_List_fromArray(
						[
							A2($author$project$Play$viewPointer, computer, model)
						])),
					viewTape
				]));
	});
var $author$project$DesignSystem$Color$white = A4($avh4$elm_color$Color$rgba, 1, 1, 1, 1);
var $author$project$Play$view = F2(
	function (app, model) {
		var computer = $author$project$Playground$Tape$currentComputer(model.tape);
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
							$rtfeldman$elm_css$Css$backgroundColor(
							$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$white)),
							$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$hidden),
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$px(computer.screen.width)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(computer.screen.height))
						]))
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$map,
					$author$project$Play$FromApp,
					A2(
						app.view,
						computer,
						$author$project$Playground$Tape$currentAppModel(model.tape))),
					A2($author$project$Play$viewHUD, computer, model)
				]));
	});
var $author$project$Play$application = function (app) {
	return $elm$browser$Browser$element(
		{
			init: $author$project$Play$init(app),
			subscriptions: $author$project$Play$subscriptions(app),
			update: $author$project$Play$update(app),
			view: A2(
				$elm$core$Basics$composeR,
				$author$project$Play$view(app),
				$rtfeldman$elm_css$Html$Styled$toUnstyled)
		});
};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Play$simpleApplication = function (simpleApp) {
	return $author$project$Play$application(
		{
			hasTape: simpleApp.hasTape,
			init: function (computer) {
				return _Utils_Tuple2(
					simpleApp.init(computer),
					$elm$core$Platform$Cmd$none);
			},
			initialConfigurations: simpleApp.initialConfigurations,
			subscriptions: function (_v0) {
				return $elm$core$Platform$Sub$none;
			},
			update: F3(
				function (computer, msg, appModel) {
					return _Utils_Tuple2(
						A3(simpleApp.update, computer, msg, appModel),
						$elm$core$Platform$Cmd$none);
				}),
			view: simpleApp.view
		});
};
var $author$project$Levels$mapSelectList = F2(
	function (up, _v0) {
		var p = _v0.a;
		return $author$project$Levels$Levels(
			_Utils_update(
				p,
				{
					selectList: up(p.selectList)
				}));
	});
var $author$project$Levels$mapCurrent = function (up) {
	return $author$project$Levels$mapSelectList(
		$author$project$SelectList$mapCurrent(
			function (item) {
				return _Utils_update(
					item,
					{
						level: up(item.level)
					});
			}));
};
var $author$project$TrixelEditor$Main$mapCurrentWorld = F2(
	function (up, model) {
		return _Utils_update(
			model,
			{
				pages: A2($author$project$Levels$mapCurrent, up, model.pages)
			});
	});
var $author$project$TrixelEditor$World$setBackgroundColorIndex = F2(
	function (colorIndex, world) {
		return _Utils_update(
			world,
			{backgroundColorIndex: colorIndex});
	});
var $author$project$TrixelEditor$World$setPalette = F2(
	function (palette, world) {
		return _Utils_update(
			world,
			{palette: palette});
	});
var $author$project$Levels$addNewLevel = F2(
	function (msg, _v0) {
		var p = _v0.a;
		if (msg.$ === 'PressedAddLevelButton') {
			var currentLevel = $author$project$SelectList$getCurrent(p.selectList);
			return A2(
				$author$project$Levels$mapSelectList,
				$author$project$SelectList$add(
					_Utils_update(
						currentLevel,
						{name: currentLevel.name + ' copy'})),
				$author$project$Levels$Levels(p));
		} else {
			return $author$project$Levels$Levels(p);
		}
	});
var $author$project$Levels$changeLevelName = F2(
	function (msg, _v0) {
		var p = _v0.a;
		if (msg.$ === 'ChangedCurrentLevelsNameTo') {
			var newName = msg.a;
			return A2(
				$author$project$Levels$mapSelectList,
				$author$project$SelectList$mapCurrent(
					function (item) {
						return _Utils_update(
							item,
							{name: newName});
					}),
				$author$project$Levels$Levels(p));
		} else {
			return $author$project$Levels$Levels(p);
		}
	});
var $author$project$Levels$Item = F2(
	function (name, level) {
		return {level: level, name: name};
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Levels$importJSON = F2(
	function (json, _v0) {
		var p = _v0.a;
		return $author$project$Levels$Levels(
			_Utils_update(
				p,
				{
					selectList: function () {
						var itemDecoder = A3(
							$elm$json$Json$Decode$map2,
							$author$project$Levels$Item,
							A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
							A2($elm$json$Json$Decode$field, 'level', p.levelDecoder));
						return A2(
							$elm$core$Result$withDefault,
							p.selectList,
							A2(
								$elm$json$Json$Decode$decodeString,
								A2(
									$elm$json$Json$Decode$andThen,
									function (l) {
										if (!l.b) {
											return $elm$json$Json$Decode$fail('List of levels is empty');
										} else {
											var first = l.a;
											var rest = l.b;
											return $elm$json$Json$Decode$succeed(
												$author$project$SelectList$init(
													_Utils_Tuple2(first, rest)));
										}
									},
									$elm$json$Json$Decode$list(itemDecoder)),
								json));
					}()
				}));
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Levels$handleImportExport = F2(
	function (msg, _v0) {
		var p = _v0.a;
		switch (msg.$) {
			case 'ClickedExportLevelsButton':
				return $author$project$Levels$Levels(
					_Utils_update(
						p,
						{
							textAreaContentForExportingJson: A2(
								$elm$json$Json$Encode$encode,
								2,
								A2(
									$elm$json$Json$Encode$list,
									function (item) {
										return $elm$json$Json$Encode$object(
											_List_fromArray(
												[
													_Utils_Tuple2(
													'name',
													$elm$json$Json$Encode$string(item.name)),
													_Utils_Tuple2(
													'level',
													p.encodeLevel(item.level))
												]));
									},
									$author$project$SelectList$toList(p.selectList)))
						}));
			case 'ClickedImportLevelsButton':
				return A2(
					$author$project$Levels$importJSON,
					p.textAreaContentForImportingJson,
					$author$project$Levels$Levels(p));
			case 'EditedTextAreaForImportingLevels':
				var string = msg.a;
				return $author$project$Levels$Levels(
					_Utils_update(
						p,
						{textAreaContentForImportingJson: string}));
			default:
				return $author$project$Levels$Levels(p);
		}
	});
var $author$project$SelectList$moveElementDown = function (_v0) {
	var p = _v0.a;
	var _v1 = p.after;
	if (_v1.b) {
		var next = _v1.a;
		var rest = _v1.b;
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{
					after: rest,
					beforeReversed: A2($elm$core$List$cons, next, p.beforeReversed)
				}));
	} else {
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{
					after: $elm$core$List$reverse(p.beforeReversed),
					beforeReversed: _List_Nil
				}));
	}
};
var $author$project$Levels$moveLevelOneDown = F2(
	function (msg, _v0) {
		var p = _v0.a;
		if (msg.$ === 'PressedMoveLevelDownButton') {
			return A2(
				$author$project$Levels$mapSelectList,
				$author$project$SelectList$moveElementDown,
				$author$project$Levels$Levels(p));
		} else {
			return $author$project$Levels$Levels(p);
		}
	});
var $author$project$SelectList$moveElementUp = function (_v0) {
	var p = _v0.a;
	var _v1 = p.beforeReversed;
	if (_v1.b) {
		var next = _v1.a;
		var rest = _v1.b;
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{
					after: A2($elm$core$List$cons, next, p.after),
					beforeReversed: rest
				}));
	} else {
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{
					after: _List_Nil,
					beforeReversed: $elm$core$List$reverse(p.after)
				}));
	}
};
var $author$project$Levels$moveLevelOneUp = F2(
	function (msg, _v0) {
		var p = _v0.a;
		if (msg.$ === 'PressedMoveLevelUpButton') {
			return A2(
				$author$project$Levels$mapSelectList,
				$author$project$SelectList$moveElementUp,
				$author$project$Levels$Levels(p));
		} else {
			return $author$project$Levels$Levels(p);
		}
	});
var $author$project$SelectList$removeCurrent = function (_v0) {
	var p = _v0.a;
	var _v1 = p.beforeReversed;
	if (_v1.b) {
		var x = _v1.a;
		var xs = _v1.b;
		return $author$project$SelectList$SelectList(
			_Utils_update(
				p,
				{beforeReversed: xs, current: x}));
	} else {
		var _v2 = p.after;
		if (_v2.b) {
			var x = _v2.a;
			var xs = _v2.b;
			return $author$project$SelectList$SelectList(
				_Utils_update(
					p,
					{after: xs, current: x}));
		} else {
			return $author$project$SelectList$SelectList(p);
		}
	}
};
var $author$project$Levels$removeCurrentLevel = F2(
	function (msg, _v0) {
		var p = _v0.a;
		if (msg.$ === 'PressedRemoveLevelButton') {
			return A2(
				$author$project$Levels$mapSelectList,
				$author$project$SelectList$removeCurrent,
				$author$project$Levels$Levels(p));
		} else {
			return $author$project$Levels$Levels(p);
		}
	});
var $author$project$Levels$selectLevel = F2(
	function (msg, _v0) {
		var p = _v0.a;
		if (msg.$ === 'MouseDownOnLevelItem') {
			var index = msg.a;
			return A2(
				$author$project$Levels$mapSelectList,
				$author$project$SelectList$goTo(index),
				$author$project$Levels$Levels(p));
		} else {
			return $author$project$Levels$Levels(p);
		}
	});
var $author$project$Levels$update = F2(
	function (msg, selectListComponent) {
		return A2(
			$author$project$Levels$handleImportExport,
			msg,
			A2(
				$author$project$Levels$changeLevelName,
				msg,
				A2(
					$author$project$Levels$selectLevel,
					msg,
					A2(
						$author$project$Levels$moveLevelOneUp,
						msg,
						A2(
							$author$project$Levels$moveLevelOneDown,
							msg,
							A2(
								$author$project$Levels$removeCurrentLevel,
								msg,
								A2($author$project$Levels$addNewLevel, msg, selectListComponent)))))));
	});
var $author$project$TrixelEditor$Main$handleMsgFromEditor = F2(
	function (editorMsg, model) {
		switch (editorMsg.$) {
			case 'PressedEditorOnOffButton':
				return _Utils_update(
					model,
					{editorIsOn: !model.editorIsOn});
			case 'SelectPalette':
				var palette = editorMsg.a;
				return A2(
					$author$project$TrixelEditor$Main$mapCurrentWorld,
					$author$project$TrixelEditor$World$setPalette(palette),
					model);
			case 'SelectColor':
				var colorIndex = editorMsg.a;
				return _Utils_update(
					model,
					{selectedColorIndex: colorIndex});
			case 'PressedButtonForSettingBackgroundColor':
				return A2(
					$author$project$TrixelEditor$Main$mapCurrentWorld,
					$author$project$TrixelEditor$World$setBackgroundColorIndex(model.selectedColorIndex),
					model);
			case 'FromLevelEditor':
				var levelEditorMsg = editorMsg.a;
				return _Utils_update(
					model,
					{
						pages: A2($author$project$Levels$update, levelEditorMsg, model.pages)
					});
			default:
				return model;
		}
	});
var $author$project$TrixelEditor$TrixelGrid$Face$Face = F3(
	function (a, b, c) {
		return {$: 'Face', a: a, b: b, c: c};
	});
var $author$project$TrixelEditor$TrixelGrid$Face$L = {$: 'L'};
var $author$project$TrixelEditor$TrixelGrid$Face$R = {$: 'R'};
var $author$project$TrixelEditor$TrixelGrid$Face$at = function (_v0) {
	var u = _v0.u;
	var v = _v0.v;
	var frac = function (f) {
		return f - $elm$core$Basics$floor(f);
	};
	return ((frac(u) + frac(v)) < 1) ? A3(
		$author$project$TrixelEditor$TrixelGrid$Face$Face,
		$author$project$TrixelEditor$TrixelGrid$Face$L,
		$elm$core$Basics$floor(u),
		$elm$core$Basics$floor(v)) : A3(
		$author$project$TrixelEditor$TrixelGrid$Face$Face,
		$author$project$TrixelEditor$TrixelGrid$Face$R,
		$elm$core$Basics$floor(u),
		$elm$core$Basics$floor(v));
};
var $turboMaCk$any_dict$Dict$Any$insert = F3(
	function (k, v, _v0) {
		var inner = _v0.a;
		return $turboMaCk$any_dict$Dict$Any$AnyDict(
			_Utils_update(
				inner,
				{
					dict: A3(
						$elm$core$Dict$insert,
						inner.toKey(k),
						_Utils_Tuple2(k, v),
						inner.dict)
				}));
	});
var $author$project$TrixelEditor$World$insert = F3(
	function (triangle, colorIndex, world) {
		return _Utils_update(
			world,
			{
				trixels: A3($turboMaCk$any_dict$Dict$Any$insert, triangle, colorIndex, world.trixels)
			});
	});
var $author$project$TrixelEditor$Main$insertTrixelOnPointerDown = F2(
	function (computer, model) {
		return computer.pointer.isDown ? A2(
			$author$project$TrixelEditor$Main$mapCurrentWorld,
			A2(
				$author$project$TrixelEditor$World$insert,
				$author$project$TrixelEditor$TrixelGrid$Face$at(model.pointerOveredUV),
				model.selectedColorIndex),
			model) : model;
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $turboMaCk$any_dict$Dict$Any$remove = F2(
	function (k, _v0) {
		var inner = _v0.a;
		return $turboMaCk$any_dict$Dict$Any$AnyDict(
			_Utils_update(
				inner,
				{
					dict: A2(
						$elm$core$Dict$remove,
						inner.toKey(k),
						inner.dict)
				}));
	});
var $author$project$TrixelEditor$World$remove = F2(
	function (triangle, world) {
		return _Utils_update(
			world,
			{
				trixels: A2($turboMaCk$any_dict$Dict$Any$remove, triangle, world.trixels)
			});
	});
var $author$project$TrixelEditor$Main$removeTrixelOnShiftMouseDown = F2(
	function (computer, model) {
		return (computer.keyboard.shift && computer.pointer.isDown) ? A2(
			$author$project$TrixelEditor$Main$mapCurrentWorld,
			$author$project$TrixelEditor$World$remove(
				$author$project$TrixelEditor$TrixelGrid$Face$at(model.pointerOveredUV)),
			model) : model;
	});
var $elmcraft$core_extra$List$Extra$findMap = F2(
	function (f, list) {
		findMap:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var a = list.a;
				var tail = list.b;
				var _v1 = f(a);
				if (_v1.$ === 'Just') {
					var b = _v1.a;
					return $elm$core$Maybe$Just(b);
				} else {
					var $temp$f = f,
						$temp$list = tail;
					f = $temp$f;
					list = $temp$list;
					continue findMap;
				}
			}
		}
	});
var $author$project$Playground$Configurations$getFloatFromBlock = F2(
	function (name, block) {
		return A2(
			$elmcraft$core_extra$List$Extra$findMap,
			function (_v0) {
				var k = _v0.a;
				var config = _v0.b;
				var _v1 = _Utils_Tuple2(
					_Utils_eq(k, name),
					config);
				if (_v1.a && (_v1.b.$ === 'FloatConfig')) {
					var _v2 = _v1.b;
					var value = _v2.b;
					return $elm$core$Maybe$Just(value);
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			block.configs);
	});
var $author$project$Playground$Configurations$getFloat = F2(
	function (name, configurations) {
		return A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elmcraft$core_extra$List$Extra$findMap,
				$author$project$Playground$Configurations$getFloatFromBlock(name),
				configurations));
	});
var $author$project$Playground$Computer$getFloat = F2(
	function (name, computer) {
		return A2($author$project$Playground$Configurations$getFloat, name, computer.configurations);
	});
var $author$project$Play$getFloat = $author$project$Playground$Computer$getFloat;
var $elm$core$Basics$atan = _Basics_atan;
var $ianmackenzie$elm_geometry$Geometry$Types$Direction3d = function (a) {
	return {$: 'Direction3d', a: a};
};
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $ianmackenzie$elm_geometry$Direction3d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0.a;
		var p2 = _v1.a;
		var deltaZ = p2.z - p1.z;
		var deltaY = p2.y - p1.y;
		var deltaX = p2.x - p1.x;
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(deltaX),
			A2(
				$elm$core$Basics$max,
				$elm$core$Basics$abs(deltaY),
				$elm$core$Basics$abs(deltaZ)));
		if (!largestComponent) {
			return $elm$core$Maybe$Nothing;
		} else {
			var scaledZ = deltaZ / largestComponent;
			var scaledY = deltaY / largestComponent;
			var scaledX = deltaX / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
			return $elm$core$Maybe$Just(
				$ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
					{x: scaledX / scaledLength, y: scaledY / scaledLength, z: scaledZ / scaledLength}));
		}
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Point3d = function (a) {
	return {$: 'Point3d', a: a};
};
var $ianmackenzie$elm_geometry$Point3d$fromMeters = function (givenCoordinates) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(givenCoordinates);
};
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d = function (a) {
	return {$: 'Viewpoint3d', a: a};
};
var $ianmackenzie$elm_geometry$Geometry$Types$Vector3d = function (a) {
	return {$: 'Vector3d', a: a};
};
var $ianmackenzie$elm_geometry$Vector3d$cross = F2(
	function (_v0, _v1) {
		var v2 = _v0.a;
		var v1 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: (v1.y * v2.z) - (v1.z * v2.y), y: (v1.z * v2.x) - (v1.x * v2.z), z: (v1.x * v2.y) - (v1.y * v2.x)});
	});
var $ianmackenzie$elm_geometry$Vector3d$direction = function (_v0) {
	var v = _v0.a;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.x),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.y),
			$elm$core$Basics$abs(v.z)));
	if (!largestComponent) {
		return $elm$core$Maybe$Nothing;
	} else {
		var scaledZ = v.z / largestComponent;
		var scaledY = v.y / largestComponent;
		var scaledX = v.x / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $elm$core$Maybe$Just(
			$ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: scaledX / scaledLength, y: scaledY / scaledLength, z: scaledZ / scaledLength}));
	}
};
var $ianmackenzie$elm_geometry$Vector3d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0.a;
		var p2 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z});
	});
var $ianmackenzie$elm_units$Quantity$Quantity = function (a) {
	return {$: 'Quantity', a: a};
};
var $ianmackenzie$elm_geometry$Vector3d$dot = F2(
	function (_v0, _v1) {
		var v2 = _v0.a;
		var v1 = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(((v1.x * v2.x) + (v1.y * v2.y)) + (v1.z * v2.z));
	});
var $ianmackenzie$elm_units$Quantity$greaterThan = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return _Utils_cmp(x, y) > 0;
	});
var $ianmackenzie$elm_units$Quantity$lessThan = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return _Utils_cmp(x, y) < 0;
	});
var $ianmackenzie$elm_geometry$Vector3d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0.a;
		var v1 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z});
	});
var $ianmackenzie$elm_geometry$Vector3d$projectionIn = F2(
	function (_v0, _v1) {
		var d = _v0.a;
		var v = _v1.a;
		var projectedLength = ((v.x * d.x) + (v.y * d.y)) + (v.z * d.z);
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: d.x * projectedLength, y: d.y * projectedLength, z: d.z * projectedLength});
	});
var $ianmackenzie$elm_geometry$Vector3d$reverse = function (_v0) {
	var v = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
		{x: -v.x, y: -v.y, z: -v.z});
};
var $ianmackenzie$elm_units$Quantity$zero = $ianmackenzie$elm_units$Quantity$Quantity(0);
var $ianmackenzie$elm_geometry$Vector3d$zero = $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
	{x: 0, y: 0, z: 0});
var $ianmackenzie$elm_geometry$Direction3d$orthonormalize = F3(
	function (xVector, xyVector, xyzVector) {
		return A2(
			$elm$core$Maybe$andThen,
			function (xDirection) {
				var yVector = A2(
					$ianmackenzie$elm_geometry$Vector3d$minus,
					A2($ianmackenzie$elm_geometry$Vector3d$projectionIn, xDirection, xyVector),
					xyVector);
				return A2(
					$elm$core$Maybe$andThen,
					function (yDirection) {
						var rightHandedZVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, xyVector, xVector);
						var tripleProduct = A2($ianmackenzie$elm_geometry$Vector3d$dot, xyzVector, rightHandedZVector);
						var zVector = A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? rightHandedZVector : (A2($ianmackenzie$elm_units$Quantity$lessThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? $ianmackenzie$elm_geometry$Vector3d$reverse(rightHandedZVector) : $ianmackenzie$elm_geometry$Vector3d$zero);
						return A2(
							$elm$core$Maybe$map,
							function (zDirection) {
								return _Utils_Tuple3(xDirection, yDirection, zDirection);
							},
							$ianmackenzie$elm_geometry$Vector3d$direction(zVector));
					},
					$ianmackenzie$elm_geometry$Vector3d$direction(yVector));
			},
			$ianmackenzie$elm_geometry$Vector3d$direction(xVector));
	});
var $ianmackenzie$elm_geometry$Direction3d$perpendicularTo = function (_v0) {
	var d = _v0.a;
	var absZ = $elm$core$Basics$abs(d.z);
	var absY = $elm$core$Basics$abs(d.y);
	var absX = $elm$core$Basics$abs(d.x);
	if (_Utils_cmp(absX, absY) < 1) {
		if (_Utils_cmp(absX, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.z * d.z) + (d.y * d.y));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: 0, y: (-d.z) / scale, z: d.y / scale});
		} else {
			var scale = $elm$core$Basics$sqrt((d.y * d.y) + (d.x * d.x));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: (-d.y) / scale, y: d.x / scale, z: 0});
		}
	} else {
		if (_Utils_cmp(absY, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.z * d.z) + (d.x * d.x));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: d.z / scale, y: 0, z: (-d.x) / scale});
		} else {
			var scale = $elm$core$Basics$sqrt((d.x * d.x) + (d.y * d.y));
			return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
				{x: (-d.y) / scale, y: d.x / scale, z: 0});
		}
	}
};
var $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis = function (direction) {
	var xDirection = $ianmackenzie$elm_geometry$Direction3d$perpendicularTo(direction);
	var _v0 = xDirection;
	var dX = _v0.a;
	var _v1 = direction;
	var d = _v1.a;
	var yDirection = $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
		{x: (d.y * dX.z) - (d.z * dX.y), y: (d.z * dX.x) - (d.x * dX.z), z: (d.x * dX.y) - (d.y * dX.x)});
	return _Utils_Tuple2(xDirection, yDirection);
};
var $ianmackenzie$elm_geometry$Direction3d$toVector = function (_v0) {
	var directionComponents = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(directionComponents);
};
var $ianmackenzie$elm_geometry$Geometry$Types$Frame3d = function (a) {
	return {$: 'Frame3d', a: a};
};
var $ianmackenzie$elm_geometry$Frame3d$unsafe = function (properties) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Frame3d(properties);
};
var $ianmackenzie$elm_geometry$Frame3d$withZDirection = F2(
	function (givenZDirection, givenOrigin) {
		var _v0 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(givenZDirection);
		var computedXDirection = _v0.a;
		var computedYDirection = _v0.b;
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{originPoint: givenOrigin, xDirection: computedXDirection, yDirection: computedYDirection, zDirection: givenZDirection});
	});
var $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt = function (_arguments) {
	var zVector = A2($ianmackenzie$elm_geometry$Vector3d$from, _arguments.focalPoint, _arguments.eyePoint);
	var yVector = $ianmackenzie$elm_geometry$Direction3d$toVector(_arguments.upDirection);
	var xVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, zVector, yVector);
	var _v0 = A3($ianmackenzie$elm_geometry$Direction3d$orthonormalize, zVector, yVector, xVector);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var normalizedZDirection = _v1.a;
		var normalizedYDirection = _v1.b;
		var normalizedXDirection = _v1.c;
		return $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d(
			$ianmackenzie$elm_geometry$Frame3d$unsafe(
				{originPoint: _arguments.eyePoint, xDirection: normalizedXDirection, yDirection: normalizedYDirection, zDirection: normalizedZDirection}));
	} else {
		var _v2 = $ianmackenzie$elm_geometry$Vector3d$direction(zVector);
		if (_v2.$ === 'Just') {
			var zDirection = _v2.a;
			return $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d(
				A2($ianmackenzie$elm_geometry$Frame3d$withZDirection, zDirection, _arguments.eyePoint));
		} else {
			var _v3 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(_arguments.upDirection);
			var arbitraryZDirection = _v3.a;
			var arbitraryXDirection = _v3.b;
			return $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d(
				$ianmackenzie$elm_geometry$Frame3d$unsafe(
					{originPoint: _arguments.eyePoint, xDirection: arbitraryXDirection, yDirection: _arguments.upDirection, zDirection: arbitraryZDirection}));
		}
	}
};
var $ianmackenzie$elm_geometry$Point3d$origin = $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
	{x: 0, y: 0, z: 0});
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Camera3d = function (a) {
	return {$: 'Camera3d', a: a};
};
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective = function (a) {
	return {$: 'Perspective', a: a};
};
var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(
		$elm$core$Basics$abs(value));
};
var $ianmackenzie$elm_units$Quantity$half = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(0.5 * value);
};
var $elm$core$Basics$tan = _Basics_tan;
var $ianmackenzie$elm_units$Angle$tan = function (_v0) {
	var angle = _v0.a;
	return $elm$core$Basics$tan(angle);
};
var $ianmackenzie$elm_3d_camera$Camera3d$perspective = function (_arguments) {
	var halfFieldOfView = $ianmackenzie$elm_units$Quantity$half(
		$ianmackenzie$elm_units$Quantity$abs(_arguments.verticalFieldOfView));
	var frustumSlope = $ianmackenzie$elm_units$Angle$tan(halfFieldOfView);
	return $ianmackenzie$elm_3d_camera$Camera3d$Types$Camera3d(
		{
			projection: $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective(frustumSlope),
			viewpoint: _arguments.viewpoint
		});
};
var $ianmackenzie$elm_geometry$Direction3d$unsafe = function (givenComponents) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(givenComponents);
};
var $ianmackenzie$elm_geometry$Direction3d$positiveY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 0, y: 1, z: 0});
var $ianmackenzie$elm_units$Angle$radians = function (numRadians) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numRadians);
};
var $author$project$SceneWebGL$Camera$perspective = function (_v0) {
	var focalPoint = _v0.focalPoint;
	var eyePoint = _v0.eyePoint;
	var upDirection = _v0.upDirection;
	return $ianmackenzie$elm_3d_camera$Camera3d$perspective(
		{
			verticalFieldOfView: $ianmackenzie$elm_units$Angle$radians(
				2 * $elm$core$Basics$atan(0.5)),
			viewpoint: $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt(
				{
					eyePoint: $ianmackenzie$elm_geometry$Point3d$fromMeters(eyePoint),
					focalPoint: $ianmackenzie$elm_geometry$Point3d$fromMeters(focalPoint),
					upDirection: A2(
						$elm$core$Maybe$withDefault,
						$ianmackenzie$elm_geometry$Direction3d$positiveY,
						A2(
							$ianmackenzie$elm_geometry$Direction3d$from,
							$ianmackenzie$elm_geometry$Point3d$origin,
							$ianmackenzie$elm_geometry$Point3d$fromMeters(upDirection)))
				})
		});
};
var $author$project$TrixelEditor$Main$camera = function (computer) {
	return $author$project$SceneWebGL$Camera$perspective(
		{
			eyePoint: {
				x: 0,
				y: 0,
				z: A2($author$project$Play$getFloat, 'camera distance', computer)
			},
			focalPoint: {x: 0, y: 0, z: 0},
			upDirection: {x: 0, y: 1, z: 0}
		});
};
var $author$project$TrixelEditor$TrixelGrid$CoordinateTransformations$fromCanvasCoordinates = function (_v0) {
	var x = _v0.x;
	var y = _v0.y;
	return {
		u: (2 / $elm$core$Basics$sqrt(3)) * x,
		v: (((-1) / $elm$core$Basics$sqrt(3)) * x) + y
	};
};
var $ianmackenzie$elm_units$Length$meters = function (numMeters) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numMeters);
};
var $author$project$Geometry3d$Point = F3(
	function (x, y, z) {
		return {x: x, y: y, z: z};
	});
var $elm$core$Basics$pi = _Basics_pi;
var $ianmackenzie$elm_units$Angle$degrees = function (numDegrees) {
	return $ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi * (numDegrees / 180));
};
var $ianmackenzie$elm_units$Pixels$float = function (numPixels) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numPixels);
};
var $ianmackenzie$elm_units$Length$inMeters = function (_v0) {
	var numMeters = _v0.a;
	return numMeters;
};
var $ianmackenzie$elm_geometry$Direction3d$componentIn = F2(
	function (_v0, _v1) {
		var d2 = _v0.a;
		var d1 = _v1.a;
		return ((d1.x * d2.x) + (d1.y * d2.y)) + (d1.z * d2.z);
	});
var $ianmackenzie$elm_geometry$Axis3d$direction = function (_v0) {
	var axis = _v0.a;
	return axis.direction;
};
var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _v0) {
		var value = _v0.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(scale * value);
	});
var $ianmackenzie$elm_geometry$Axis3d$originPoint = function (_v0) {
	var axis = _v0.a;
	return axis.originPoint;
};
var $ianmackenzie$elm_geometry$Point3d$signedDistanceFrom = F2(
	function (_v0, _v1) {
		var plane = _v0.a;
		var p = _v1.a;
		var _v2 = plane.originPoint;
		var p0 = _v2.a;
		var _v3 = plane.normalDirection;
		var n = _v3.a;
		return $ianmackenzie$elm_units$Quantity$Quantity((((p.x - p0.x) * n.x) + ((p.y - p0.y) * n.y)) + ((p.z - p0.z) * n.z));
	});
var $ianmackenzie$elm_geometry$Point3d$translateIn = F3(
	function (_v0, _v1, _v2) {
		var d = _v0.a;
		var distance = _v1.a;
		var p = _v2.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: p.x + (distance * d.x), y: p.y + (distance * d.y), z: p.z + (distance * d.z)});
	});
var $ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane = F2(
	function (plane, axis) {
		var axisDirection = $ianmackenzie$elm_geometry$Axis3d$direction(axis);
		var _v0 = plane;
		var normalDirection = _v0.a.normalDirection;
		var normalComponent = A2($ianmackenzie$elm_geometry$Direction3d$componentIn, normalDirection, axisDirection);
		if (!normalComponent) {
			return $elm$core$Maybe$Nothing;
		} else {
			var axisOrigin = $ianmackenzie$elm_geometry$Axis3d$originPoint(axis);
			var normalDistance = A2($ianmackenzie$elm_geometry$Point3d$signedDistanceFrom, plane, axisOrigin);
			var axialDistance = A2($ianmackenzie$elm_units$Quantity$multiplyBy, (-1) / normalComponent, normalDistance);
			return $elm$core$Maybe$Just(
				A3($ianmackenzie$elm_geometry$Point3d$translateIn, axisDirection, axialDistance, axisOrigin));
		}
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Point2d = function (a) {
	return {$: 'Point2d', a: a};
};
var $ianmackenzie$elm_geometry$Point2d$pixels = F2(
	function (x, y) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Point2d(
			{x: x, y: y});
	});
var $ianmackenzie$elm_units$Quantity$at = F2(
	function (_v0, _v1) {
		var rateOfChange = _v0.a;
		var independentValue = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(rateOfChange * independentValue);
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Frame2d = function (a) {
	return {$: 'Frame2d', a: a};
};
var $ianmackenzie$elm_geometry$Frame2d$copy = function (_v0) {
	var properties = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Frame2d(properties);
};
var $ianmackenzie$elm_geometry$Rectangle2d$axes = function (_v0) {
	var rectangle = _v0.a;
	return $ianmackenzie$elm_geometry$Frame2d$copy(rectangle.axes);
};
var $ianmackenzie$elm_geometry$Rectangle2d$dimensions = function (_v0) {
	var rectangle = _v0.a;
	return rectangle.dimensions;
};
var $ianmackenzie$elm_units$Quantity$divideBy = F2(
	function (divisor, _v0) {
		var value = _v0.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(value / divisor);
	});
var $ianmackenzie$elm_geometry$Frame3d$originPoint = function (_v0) {
	var properties = _v0.a;
	return properties.originPoint;
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Frame3d$originPoint(frame);
};
var $ianmackenzie$elm_units$Quantity$negate = function (_v0) {
	var value = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(-value);
};
var $ianmackenzie$elm_geometry$Direction3d$negativeZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 0, y: 0, z: -1});
var $ianmackenzie$elm_units$Quantity$per = F2(
	function (_v0, _v1) {
		var independentValue = _v0.a;
		var dependentValue = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(dependentValue / independentValue);
	});
var $ianmackenzie$elm_geometry$Direction3d$placeIn = F2(
	function (_v0, _v1) {
		var frame = _v0.a;
		var d = _v1.a;
		var _v2 = frame.zDirection;
		var k = _v2.a;
		var _v3 = frame.yDirection;
		var j = _v3.a;
		var _v4 = frame.xDirection;
		var i = _v4.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{x: ((i.x * d.x) + (j.x * d.y)) + (k.x * d.z), y: ((i.y * d.x) + (j.y * d.y)) + (k.y * d.z), z: ((i.z * d.x) + (j.z * d.y)) + (k.z * d.z)});
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Axis3d = function (a) {
	return {$: 'Axis3d', a: a};
};
var $ianmackenzie$elm_geometry$Axis3d$through = F2(
	function (givenPoint, givenDirection) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Axis3d(
			{direction: givenDirection, originPoint: givenPoint});
	});
var $ianmackenzie$elm_geometry$Direction3d$reverse = function (_v0) {
	var d = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
		{x: -d.x, y: -d.y, z: -d.z});
};
var $ianmackenzie$elm_geometry$Frame3d$zDirection = function (_v0) {
	var properties = _v0.a;
	return properties.zDirection;
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Direction3d$reverse(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
};
var $ianmackenzie$elm_geometry$Point2d$xCoordinateIn = F2(
	function (_v0, _v1) {
		var frame = _v0.a;
		var p = _v1.a;
		var _v2 = frame.originPoint;
		var p0 = _v2.a;
		var _v3 = frame.xDirection;
		var d = _v3.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(((p.x - p0.x) * d.x) + ((p.y - p0.y) * d.y));
	});
var $ianmackenzie$elm_geometry$Vector3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0.a;
		var y = _v1.a;
		var z = _v2.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: x, y: y, z: z});
	});
var $ianmackenzie$elm_geometry$Point3d$xyzIn = F4(
	function (_v0, _v1, _v2, _v3) {
		var frame = _v0.a;
		var x = _v1.a;
		var y = _v2.a;
		var z = _v3.a;
		var _v4 = frame.originPoint;
		var p0 = _v4.a;
		var _v5 = frame.zDirection;
		var k = _v5.a;
		var _v6 = frame.yDirection;
		var j = _v6.a;
		var _v7 = frame.xDirection;
		var i = _v7.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: ((p0.x + (x * i.x)) + (y * j.x)) + (z * k.x), y: ((p0.y + (x * i.y)) + (y * j.y)) + (z * k.y), z: ((p0.z + (x * i.z)) + (y * j.z)) + (z * k.z)});
	});
var $ianmackenzie$elm_geometry$Point2d$yCoordinateIn = F2(
	function (_v0, _v1) {
		var frame = _v0.a;
		var p = _v1.a;
		var _v2 = frame.originPoint;
		var p0 = _v2.a;
		var _v3 = frame.yDirection;
		var d = _v3.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(((p.x - p0.x) * d.x) + ((p.y - p0.y) * d.y));
	});
var $ianmackenzie$elm_3d_camera$Camera3d$ray = F3(
	function (_v0, screen, point) {
		var camera = _v0.a;
		var screenY = A2(
			$ianmackenzie$elm_geometry$Point2d$yCoordinateIn,
			$ianmackenzie$elm_geometry$Rectangle2d$axes(screen),
			point);
		var screenX = A2(
			$ianmackenzie$elm_geometry$Point2d$xCoordinateIn,
			$ianmackenzie$elm_geometry$Rectangle2d$axes(screen),
			point);
		var _v1 = camera.viewpoint;
		var viewpointFrame = _v1.a;
		var _v2 = $ianmackenzie$elm_geometry$Rectangle2d$dimensions(screen);
		var screenWidth = _v2.a;
		var screenHeight = _v2.b;
		var _v3 = camera.projection;
		if (_v3.$ === 'Perspective') {
			var frustumSlope = _v3.a;
			var screenZ = $ianmackenzie$elm_units$Quantity$negate(
				A2(
					$ianmackenzie$elm_units$Quantity$divideBy,
					frustumSlope,
					A2($ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, screenHeight)));
			var direction = A2(
				$ianmackenzie$elm_geometry$Direction3d$placeIn,
				viewpointFrame,
				A2(
					$elm$core$Maybe$withDefault,
					$ianmackenzie$elm_geometry$Direction3d$negativeZ,
					$ianmackenzie$elm_geometry$Vector3d$direction(
						A3($ianmackenzie$elm_geometry$Vector3d$xyz, screenX, screenY, screenZ))));
			return A2(
				$ianmackenzie$elm_geometry$Axis3d$through,
				$ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(camera.viewpoint),
				direction);
		} else {
			var viewpointHeight = _v3.a;
			var resolution = A2($ianmackenzie$elm_units$Quantity$per, screenHeight, viewpointHeight);
			var origin = A4(
				$ianmackenzie$elm_geometry$Point3d$xyzIn,
				viewpointFrame,
				A2($ianmackenzie$elm_units$Quantity$at, resolution, screenX),
				A2($ianmackenzie$elm_units$Quantity$at, resolution, screenY),
				$ianmackenzie$elm_units$Quantity$zero);
			return A2(
				$ianmackenzie$elm_geometry$Axis3d$through,
				origin,
				$ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection(camera.viewpoint));
		}
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Rectangle2d = function (a) {
	return {$: 'Rectangle2d', a: a};
};
var $ianmackenzie$elm_geometry$Geometry$Types$Direction2d = function (a) {
	return {$: 'Direction2d', a: a};
};
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sin = _Basics_sin;
var $ianmackenzie$elm_geometry$Direction2d$fromAngle = function (_v0) {
	var angle = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Direction2d(
		{
			x: $elm$core$Basics$cos(angle),
			y: $elm$core$Basics$sin(angle)
		});
};
var $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise = function (_v0) {
	var d = _v0.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$Direction2d(
		{x: -d.y, y: d.x});
};
var $ianmackenzie$elm_geometry$Frame2d$unsafe = function (properties) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Frame2d(properties);
};
var $ianmackenzie$elm_geometry$Frame2d$withXDirection = F2(
	function (givenDirection, givenOrigin) {
		return $ianmackenzie$elm_geometry$Frame2d$unsafe(
			{
				originPoint: givenOrigin,
				xDirection: givenDirection,
				yDirection: $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise(givenDirection)
			});
	});
var $ianmackenzie$elm_geometry$Frame2d$withAngle = F2(
	function (givenAngle, givenOrigin) {
		return A2(
			$ianmackenzie$elm_geometry$Frame2d$withXDirection,
			$ianmackenzie$elm_geometry$Direction2d$fromAngle(givenAngle),
			givenOrigin);
	});
var $ianmackenzie$elm_geometry$Rectangle2d$withDimensions = F3(
	function (_v0, givenAngle, givenCenter) {
		var givenWidth = _v0.a;
		var givenHeight = _v0.b;
		return $ianmackenzie$elm_geometry$Geometry$Types$Rectangle2d(
			{
				axes: A2($ianmackenzie$elm_geometry$Frame2d$withAngle, givenAngle, givenCenter),
				dimensions: _Utils_Tuple2(
					$ianmackenzie$elm_units$Quantity$abs(givenWidth),
					$ianmackenzie$elm_units$Quantity$abs(givenHeight))
			});
	});
var $ianmackenzie$elm_geometry$Point3d$xCoordinate = function (_v0) {
	var p = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(p.x);
};
var $ianmackenzie$elm_geometry$Point2d$xy = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point2d(
			{x: x, y: y});
	});
var $ianmackenzie$elm_geometry$Point3d$yCoordinate = function (_v0) {
	var p = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(p.y);
};
var $ianmackenzie$elm_geometry$Point3d$zCoordinate = function (_v0) {
	var p = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(p.z);
};
var $author$project$SceneWebGL$Camera$mouseOverPlane = F4(
	function (camera, screen, _v0, plane) {
		var x = _v0.x;
		var y = _v0.y;
		var toPoint = function (p) {
			return A3(
				$author$project$Geometry3d$Point,
				$ianmackenzie$elm_units$Length$inMeters(
					$ianmackenzie$elm_geometry$Point3d$xCoordinate(p)),
				$ianmackenzie$elm_units$Length$inMeters(
					$ianmackenzie$elm_geometry$Point3d$yCoordinate(p)),
				$ianmackenzie$elm_units$Length$inMeters(
					$ianmackenzie$elm_geometry$Point3d$zCoordinate(p)));
		};
		var screenRect = A3(
			$ianmackenzie$elm_geometry$Rectangle2d$withDimensions,
			_Utils_Tuple2(
				$ianmackenzie$elm_units$Pixels$float(screen.width),
				$ianmackenzie$elm_units$Pixels$float(screen.height)),
			$ianmackenzie$elm_units$Angle$degrees(0),
			A2($ianmackenzie$elm_geometry$Point2d$pixels, 0, 0));
		var mousePosition = A2(
			$ianmackenzie$elm_geometry$Point2d$xy,
			$ianmackenzie$elm_units$Pixels$float(x),
			$ianmackenzie$elm_units$Pixels$float(y));
		return A2(
			$elm$core$Maybe$map,
			toPoint,
			A2(
				$ianmackenzie$elm_geometry$Axis3d$intersectionWithPlane,
				plane,
				A3($ianmackenzie$elm_3d_camera$Camera3d$ray, camera, screenRect, mousePosition)));
	});
var $ianmackenzie$elm_geometry$Point3d$translateBy = F2(
	function (_v0, _v1) {
		var v = _v0.a;
		var p = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: p.x + v.x, y: p.y + v.y, z: p.z + v.z});
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Plane3d = function (a) {
	return {$: 'Plane3d', a: a};
};
var $ianmackenzie$elm_geometry$Plane3d$withNormalDirection = F2(
	function (givenNormalDirection, givenPoint) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Plane3d(
			{normalDirection: givenNormalDirection, originPoint: givenPoint});
	});
var $ianmackenzie$elm_geometry$Plane3d$translateBy = F2(
	function (vector, _v0) {
		var plane = _v0.a;
		return A2(
			$ianmackenzie$elm_geometry$Plane3d$withNormalDirection,
			plane.normalDirection,
			A2($ianmackenzie$elm_geometry$Point3d$translateBy, vector, plane.originPoint));
	});
var $ianmackenzie$elm_geometry$Plane3d$through = F2(
	function (givenPoint, givenNormalDirection) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Plane3d(
			{normalDirection: givenNormalDirection, originPoint: givenPoint});
	});
var $ianmackenzie$elm_geometry$Direction3d$positiveZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 0, y: 0, z: 1});
var $ianmackenzie$elm_geometry$Direction3d$z = $ianmackenzie$elm_geometry$Direction3d$positiveZ;
var $ianmackenzie$elm_geometry$Plane3d$xy = A2($ianmackenzie$elm_geometry$Plane3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$z);
var $author$project$SceneWebGL$Camera$mouseOverXYAtZ = F4(
	function (z, camera, screen, mouse) {
		return A4(
			$author$project$SceneWebGL$Camera$mouseOverPlane,
			camera,
			screen,
			mouse,
			A2(
				$ianmackenzie$elm_geometry$Plane3d$translateBy,
				A3(
					$ianmackenzie$elm_geometry$Vector3d$xyz,
					$ianmackenzie$elm_units$Length$meters(0),
					$ianmackenzie$elm_units$Length$meters(0),
					$ianmackenzie$elm_units$Length$meters(z)),
				$ianmackenzie$elm_geometry$Plane3d$xy));
	});
var $author$project$SceneWebGL$Camera$mouseOverXY = $author$project$SceneWebGL$Camera$mouseOverXYAtZ(0);
var $author$project$TrixelEditor$Main$updateMouseOverUV = F2(
	function (computer, model) {
		var _v0 = A3(
			$author$project$SceneWebGL$Camera$mouseOverXY,
			$author$project$TrixelEditor$Main$camera(computer),
			computer.screen,
			computer.pointer);
		if (_v0.$ === 'Nothing') {
			return model;
		} else {
			var p = _v0.a;
			return _Utils_update(
				model,
				{
					pointerOveredUV: $author$project$TrixelEditor$TrixelGrid$CoordinateTransformations$fromCanvasCoordinates(
						{x: p.x, y: p.y})
				});
		}
	});
var $author$project$TrixelEditor$Main$update = F3(
	function (computer, message, model) {
		if (message.$ === 'Tick') {
			return A2(
				$author$project$TrixelEditor$Main$removeTrixelOnShiftMouseDown,
				computer,
				A2(
					$author$project$TrixelEditor$Main$insertTrixelOnPointerDown,
					computer,
					A2($author$project$TrixelEditor$Main$updateMouseOverUV, computer, model)));
		} else {
			var editorMsg = message.a;
			return A2($author$project$TrixelEditor$Main$handleMsgFromEditor, editorMsg, model);
		}
	});
var $rtfeldman$elm_css$Css$fixed = {backgroundAttachment: $rtfeldman$elm_css$Css$Structure$Compatible, position: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'fixed'};
var $author$project$TrixelEditor$Main$FromLevelEditor = function (a) {
	return {$: 'FromLevelEditor', a: a};
};
var $author$project$Levels$ChangedCurrentLevelsNameTo = function (a) {
	return {$: 'ChangedCurrentLevelsNameTo', a: a};
};
var $author$project$Levels$MouseDownOnLevelItem = function (a) {
	return {$: 'MouseDownOnLevelItem', a: a};
};
var $author$project$Levels$PressedAddLevelButton = {$: 'PressedAddLevelButton'};
var $author$project$Levels$PressedMoveLevelDownButton = {$: 'PressedMoveLevelDownButton'};
var $author$project$Levels$PressedMoveLevelUpButton = {$: 'PressedMoveLevelUpButton'};
var $author$project$Levels$PressedRemoveLevelButton = {$: 'PressedRemoveLevelButton'};
var $rtfeldman$elm_css$Html$Styled$Attributes$autocomplete = function (bool) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var $author$project$DesignSystem$Color$black = A4($avh4$elm_color$Color$rgba, 0, 0, 0, 1);
var $author$project$Levels$ClickedExportLevelsButton = {$: 'ClickedExportLevelsButton'};
var $avh4$elm_color$Color$fromRgba = function (components) {
	return A4($avh4$elm_color$Color$RgbaSpace, components.red, components.green, components.blue, components.alpha);
};
var $author$project$DesignSystem$Color$setOpacity = F2(
	function (opacity, color) {
		var c = $avh4$elm_color$Color$toRgba(color);
		return $avh4$elm_color$Color$fromRgba(
			{alpha: opacity, blue: c.blue, green: c.green, red: c.red});
	});
var $author$project$Levels$makeButton = F2(
	function (msg, string) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$button,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$marginBottom(
							$rtfeldman$elm_css$Css$px(4)),
							$rtfeldman$elm_css$Css$padding(
							$rtfeldman$elm_css$Css$px(8)),
							$rtfeldman$elm_css$Css$borderRadius(
							$rtfeldman$elm_css$Css$px(4)),
							$rtfeldman$elm_css$Css$color(
							$author$project$DesignSystem$Color$toCssColor(
								A2($author$project$DesignSystem$Color$setOpacity, 0.6, $author$project$DesignSystem$Color$white))),
							$rtfeldman$elm_css$Css$backgroundColor(
							$author$project$DesignSystem$Color$toCssColor(
								A2($author$project$DesignSystem$Color$setOpacity, 0.4, $author$project$DesignSystem$Color$black))),
							$rtfeldman$elm_css$Css$hover(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$backgroundColor(
									$author$project$DesignSystem$Color$toCssColor(
										A2($author$project$DesignSystem$Color$setOpacity, 0.8, $author$project$DesignSystem$Color$black)))
								])),
							A2($rtfeldman$elm_css$Css$property, 'transition', 'background-color 0.3s ease')
						])),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(msg)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(string)
				]));
	});
var $rtfeldman$elm_css$Html$Styled$pre = $rtfeldman$elm_css$Html$Styled$node('pre');
var $rtfeldman$elm_css$Css$scroll = {backgroundAttachment: $rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, scroll: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'scroll'};
var $author$project$Levels$exportingLevels = function (_v0) {
	var p = _v0.a;
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2($author$project$Levels$makeButton, $author$project$Levels$ClickedExportLevelsButton, 'Export'),
				A2(
				$rtfeldman$elm_css$Html$Styled$pre,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(100)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(112)),
								$rtfeldman$elm_css$Css$overflowY($rtfeldman$elm_css$Css$scroll),
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha800)),
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$backgroundColor(
								$author$project$DesignSystem$Color$toCssColor(
									A2($author$project$DesignSystem$Color$setOpacity, 0.4, $author$project$DesignSystem$Color$black))),
								A2($rtfeldman$elm_css$Css$property, 'user-select', 'text')
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(p.textAreaContentForExportingJson)
					]))
			]));
};
var $author$project$Levels$ClickedImportLevelsButton = {$: 'ClickedImportLevelsButton'};
var $author$project$Levels$EditedTextAreaForImportingLevels = function (a) {
	return {$: 'EditedTextAreaForImportingLevels', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Attributes$cols = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'cols',
		$elm$core$String$fromInt(n));
};
var $rtfeldman$elm_css$Html$Styled$Attributes$rows = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $rtfeldman$elm_css$Html$Styled$textarea = $rtfeldman$elm_css$Html$Styled$node('textarea');
var $author$project$Levels$importingLevels = function (_v0) {
	var p = _v0.a;
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2($author$project$Levels$makeButton, $author$project$Levels$ClickedImportLevelsButton, 'Import'),
				A2(
				$rtfeldman$elm_css$Html$Styled$textarea,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(100)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(112)),
								$rtfeldman$elm_css$Css$overflowY($rtfeldman$elm_css$Css$scroll),
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha800)),
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$backgroundColor(
								$author$project$DesignSystem$Color$toCssColor(
									A2($author$project$DesignSystem$Color$setOpacity, 0.4, $author$project$DesignSystem$Color$black))),
								A2($rtfeldman$elm_css$Css$property, 'user-select', 'text')
							])),
						$rtfeldman$elm_css$Html$Styled$Attributes$rows(150),
						$rtfeldman$elm_css$Html$Styled$Attributes$cols(10),
						$rtfeldman$elm_css$Html$Styled$Events$onInput($author$project$Levels$EditedTextAreaForImportingLevels),
						$rtfeldman$elm_css$Html$Styled$Attributes$value(p.textAreaContentForImportingJson)
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('todo')
					]))
			]));
};
var $rtfeldman$elm_css$Css$marginLeft = $rtfeldman$elm_css$Css$prop1('margin-left');
var $rtfeldman$elm_css$Css$noWrap = {flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'nowrap', whiteSpace: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$Html$Styled$Events$onMouseDown = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'mousedown',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Html$Styled$Attributes$placeholder = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('placeholder');
var $author$project$DesignSystem$Color$red500 = A4($avh4$elm_color$Color$rgba, 1.0, 0, 0.3, 1);
var $author$project$DesignSystem$Color$red = $author$project$DesignSystem$Color$red500;
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$transparent = {color: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'transparent'};
var $rtfeldman$elm_css$Css$whiteSpace = $rtfeldman$elm_css$Css$prop1('white-space');
var $author$project$Levels$view = function (_v0) {
	var p = _v0.a;
	var moveLevelUpButton = A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
						$rtfeldman$elm_css$Css$marginLeft(
						$rtfeldman$elm_css$Css$px(4)),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$px(16)),
						$rtfeldman$elm_css$Css$color(
						$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha400)),
						$rtfeldman$elm_css$Css$hover(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha800))
							]))
					])),
				$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Levels$PressedMoveLevelUpButton),
				$rtfeldman$elm_css$Html$Styled$Attributes$title('Move Level Up')
			]),
		_List_fromArray(
			[$author$project$Icons$icons.moveUp]));
	var moveLevelDownButton = A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
						$rtfeldman$elm_css$Css$marginLeft(
						$rtfeldman$elm_css$Css$px(4)),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$px(16)),
						$rtfeldman$elm_css$Css$color(
						$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha400)),
						$rtfeldman$elm_css$Css$hover(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha800))
							]))
					])),
				$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Levels$PressedMoveLevelDownButton),
				$rtfeldman$elm_css$Html$Styled$Attributes$title('Move Level Down')
			]),
		_List_fromArray(
			[$author$project$Icons$icons.moveDown]));
	var deleteCurrentLevelButton = A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
						$rtfeldman$elm_css$Css$marginLeft(
						$rtfeldman$elm_css$Css$px(4)),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$px(16)),
						$rtfeldman$elm_css$Css$color(
						$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha400)),
						$rtfeldman$elm_css$Css$hover(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$red))
							]))
					])),
				$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Levels$PressedRemoveLevelButton),
				$rtfeldman$elm_css$Html$Styled$Attributes$title('Delete Level')
			]),
		_List_fromArray(
			[$author$project$Icons$icons.trash]));
	var addNewLevelButton = A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
						$rtfeldman$elm_css$Css$marginLeft(
						$rtfeldman$elm_css$Css$px(4)),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$px(16)),
						$rtfeldman$elm_css$Css$color(
						$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha400)),
						$rtfeldman$elm_css$Css$hover(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha800))
							]))
					])),
				$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Levels$PressedAddLevelButton),
				$rtfeldman$elm_css$Html$Styled$Attributes$title('Duplicate Level')
			]),
		_List_fromArray(
			[$author$project$Icons$icons.plus]));
	var levelItem = F2(
		function (index, levelName) {
			return A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(100)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(32)),
								$rtfeldman$elm_css$Css$padding(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$left),
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor(
									A2($author$project$DesignSystem$Color$setOpacity, 0.8, $author$project$DesignSystem$Color$white))),
								A3(
								$rtfeldman$elm_css$Css$borderBottom3,
								$rtfeldman$elm_css$Css$px(1),
								$rtfeldman$elm_css$Css$solid,
								$author$project$DesignSystem$Color$toCssColor(
									A2($author$project$DesignSystem$Color$setOpacity, 0.2, $author$project$DesignSystem$Color$white))),
								A2($rtfeldman$elm_css$Css$property, 'transition', 'background-color 0.3s ease'),
								_Utils_eq(
								index,
								$author$project$SelectList$getCurrentIndex(p.selectList)) ? $rtfeldman$elm_css$Css$batch(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$backgroundColor(
										$author$project$DesignSystem$Color$toCssColor(
											A2($author$project$DesignSystem$Color$setOpacity, 0.4, $author$project$DesignSystem$Color$black))),
										$rtfeldman$elm_css$Css$hover(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$backgroundColor(
												$author$project$DesignSystem$Color$toCssColor(
													A2($author$project$DesignSystem$Color$setOpacity, 0.6, $author$project$DesignSystem$Color$black)))
											])),
										$rtfeldman$elm_css$Css$active(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$backgroundColor(
												$author$project$DesignSystem$Color$toCssColor(
													A2($author$project$DesignSystem$Color$setOpacity, 0.8, $author$project$DesignSystem$Color$black)))
											]))
									])) : $rtfeldman$elm_css$Css$hover(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$backgroundColor(
										$author$project$DesignSystem$Color$toCssColor(
											A2($author$project$DesignSystem$Color$setOpacity, 0.2, $author$project$DesignSystem$Color$black)))
									]))
							])),
						$rtfeldman$elm_css$Html$Styled$Events$onMouseDown(
						$author$project$Levels$MouseDownOnLevelItem(index))
					]),
				_List_fromArray(
					[
						_Utils_eq(
						index,
						$author$project$SelectList$getCurrentIndex(p.selectList)) ? A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$input,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$width(
												$rtfeldman$elm_css$Css$px(100)),
												$rtfeldman$elm_css$Css$backgroundColor($rtfeldman$elm_css$Css$transparent)
											])),
										$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('Enter Level Name'),
										$rtfeldman$elm_css$Html$Styled$Attributes$value(
										$author$project$SelectList$getCurrent(p.selectList).name),
										$rtfeldman$elm_css$Html$Styled$Events$onInput($author$project$Levels$ChangedCurrentLevelsNameTo),
										$rtfeldman$elm_css$Html$Styled$Attributes$autocomplete(false)
									]),
								_List_Nil),
								A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$float($rtfeldman$elm_css$Css$right)
											]))
									]),
								_List_fromArray(
									[addNewLevelButton, moveLevelUpButton, moveLevelDownButton, deleteCurrentLevelButton]))
							])) : A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$noWrap)
									]))
							]),
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(levelName)
							]))
					]));
		});
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						A2($rtfeldman$elm_css$Css$property, 'gap', '16px')
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(200)),
								$rtfeldman$elm_css$Css$overflowY($rtfeldman$elm_css$Css$scroll),
								A3(
								$rtfeldman$elm_css$Css$border3,
								$rtfeldman$elm_css$Css$px(1),
								$rtfeldman$elm_css$Css$solid,
								A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.1))
							]))
					]),
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (index, _v1) {
							var name = _v1.name;
							return A2(levelItem, index, name);
						}),
					$author$project$SelectList$toList(p.selectList))),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Levels$exportingLevels(
						$author$project$Levels$Levels(p))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Levels$importingLevels(
						$author$project$Levels$Levels(p))
					]))
			]));
};
var $author$project$DesignSystem$Color$whiteAlpha200 = A4($avh4$elm_color$Color$rgba, 0.98, 0.96, 0.9, 0.08);
var $author$project$TrixelEditor$Main$pageSelection = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$padding(
						$rtfeldman$elm_css$Css$px(16)),
						A3(
						$rtfeldman$elm_css$Css$border3,
						$rtfeldman$elm_css$Css$px(0.5),
						$rtfeldman$elm_css$Css$solid,
						$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha200))
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$px(20))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Levels')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$padding(
								$rtfeldman$elm_css$Css$px(16))
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$map,
						$author$project$TrixelEditor$Main$FromLevelEditor,
						$author$project$Levels$view(model.pages))
					]))
			]));
};
var $author$project$TrixelEditor$Main$PressedButtonForSettingBackgroundColor = {$: 'PressedButtonForSettingBackgroundColor'};
var $author$project$DesignSystem$Color$blackAlpha400 = A4($avh4$elm_color$Color$rgba, 0.08, 0.08, 0.12, 0.24);
var $author$project$DesignSystem$Color$blackAlpha800 = A4($avh4$elm_color$Color$rgba, 0.08, 0.08, 0.12, 0.8);
var $rtfeldman$elm_css$Css$margin = $rtfeldman$elm_css$Css$prop1('margin');
var $author$project$TrixelEditor$Main$makeButton = F2(
	function (msg, string) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$button,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$margin(
							$rtfeldman$elm_css$Css$px(4)),
							$rtfeldman$elm_css$Css$padding(
							$rtfeldman$elm_css$Css$px(8)),
							$rtfeldman$elm_css$Css$borderRadius(
							$rtfeldman$elm_css$Css$px(8)),
							$rtfeldman$elm_css$Css$backgroundColor(
							$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$blackAlpha400)),
							$rtfeldman$elm_css$Css$hover(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$backgroundColor(
									$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$blackAlpha800))
								]))
						])),
					$rtfeldman$elm_css$Html$Styled$Events$onClick(msg)
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(string)
				]));
	});
var $author$project$TrixelEditor$ColorPalette$Inferno = {$: 'Inferno'};
var $author$project$TrixelEditor$ColorPalette$Parula = {$: 'Parula'};
var $author$project$TrixelEditor$ColorPalette$Plasma = {$: 'Plasma'};
var $author$project$TrixelEditor$Main$SelectPalette = function (a) {
	return {$: 'SelectPalette', a: a};
};
var $author$project$TrixelEditor$ColorPalette$Viridis = {$: 'Viridis'};
var $author$project$Levels$current = function (_v0) {
	var p = _v0.a;
	return $author$project$SelectList$getCurrent(p.selectList).level;
};
var $author$project$TrixelEditor$Main$currentPalette = A2(
	$elm$core$Basics$composeR,
	function ($) {
		return $.pages;
	},
	A2(
		$elm$core$Basics$composeR,
		$author$project$Levels$current,
		function ($) {
			return $.palette;
		}));
var $author$project$TrixelEditor$ColorPalette$fromString = function (string) {
	switch (string) {
		case 'Inferno':
			return $author$project$TrixelEditor$ColorPalette$Inferno;
		case 'Magma':
			return $author$project$TrixelEditor$ColorPalette$Magma;
		case 'Parula':
			return $author$project$TrixelEditor$ColorPalette$Parula;
		case 'Plasma':
			return $author$project$TrixelEditor$ColorPalette$Plasma;
		case 'Viridis':
			return $author$project$TrixelEditor$ColorPalette$Viridis;
		default:
			return $author$project$TrixelEditor$ColorPalette$Inferno;
	}
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyledAttribute = function (prop) {
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, prop, false, '');
};
var $rtfeldman$elm_css$Html$Styled$Attributes$fromUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$unstyledAttribute;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm_community$html_extra$Html$Events$Extra$onChange = function (onChangeAction) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, onChangeAction, $elm$html$Html$Events$targetValue));
};
var $author$project$TrixelEditor$ColorPalette$toString = function (palette) {
	switch (palette.$) {
		case 'Inferno':
			return 'Inferno';
		case 'Magma':
			return 'Magma';
		case 'Parula':
			return 'Parula';
		case 'Plasma':
			return 'Plasma';
		default:
			return 'Viridis';
	}
};
var $author$project$TrixelEditor$Main$optionWith = function (palette) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$option,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$value(
				$author$project$TrixelEditor$ColorPalette$toString(palette))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(
				$author$project$TrixelEditor$ColorPalette$toString(palette))
			]));
};
var $rtfeldman$elm_css$Html$Styled$span = $rtfeldman$elm_css$Html$Styled$node('span');
var $author$project$TrixelEditor$Main$selectColorPalette = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$padding(
						$rtfeldman$elm_css$Css$px(8))
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$padding(
								$rtfeldman$elm_css$Css$px(8))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Choose a palette:')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$select,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$padding(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha800)),
								$rtfeldman$elm_css$Css$backgroundColor(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha200))
							])),
						$rtfeldman$elm_css$Html$Styled$Attributes$fromUnstyled(
						$elm_community$html_extra$Html$Events$Extra$onChange(
							A2($elm$core$Basics$composeR, $author$project$TrixelEditor$ColorPalette$fromString, $author$project$TrixelEditor$Main$SelectPalette))),
						$rtfeldman$elm_css$Html$Styled$Attributes$value(
						$author$project$TrixelEditor$ColorPalette$toString(
							$author$project$TrixelEditor$Main$currentPalette(model)))
					]),
				A2(
					$elm$core$List$map,
					$author$project$TrixelEditor$Main$optionWith,
					_List_fromArray(
						[$author$project$TrixelEditor$ColorPalette$Parula, $author$project$TrixelEditor$ColorPalette$Inferno, $author$project$TrixelEditor$ColorPalette$Magma, $author$project$TrixelEditor$ColorPalette$Plasma, $author$project$TrixelEditor$ColorPalette$Viridis])))
			]));
};
var $author$project$TrixelEditor$Main$SelectColor = function (a) {
	return {$: 'SelectColor', a: a};
};
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 'Nonempty', a: a, b: b};
	});
var $newmana$chroma_elm$Chroma$Colors$Inferno$inferno = A2(
	$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	A3($avh4$elm_color$Color$rgb, 0.001462, 0.000466, 0.013866),
	_List_fromArray(
		[
			A3($avh4$elm_color$Color$rgb, 0.002267, 0.00127, 0.01857),
			A3($avh4$elm_color$Color$rgb, 0.003299, 0.002249, 0.024239),
			A3($avh4$elm_color$Color$rgb, 0.004547, 0.003392, 0.030909),
			A3($avh4$elm_color$Color$rgb, 0.006006, 0.004692, 0.038558),
			A3($avh4$elm_color$Color$rgb, 0.007676, 0.006136, 0.046836),
			A3($avh4$elm_color$Color$rgb, 0.009561, 0.007713, 0.055143),
			A3($avh4$elm_color$Color$rgb, 0.011663, 0.009417, 0.06346),
			A3($avh4$elm_color$Color$rgb, 0.013995, 0.011225, 0.071862),
			A3($avh4$elm_color$Color$rgb, 0.016561, 0.013136, 0.080282),
			A3($avh4$elm_color$Color$rgb, 0.019373, 0.015133, 0.088767),
			A3($avh4$elm_color$Color$rgb, 0.022447, 0.017199, 0.097327),
			A3($avh4$elm_color$Color$rgb, 0.025793, 0.019331, 0.10593),
			A3($avh4$elm_color$Color$rgb, 0.029432, 0.021503, 0.114621),
			A3($avh4$elm_color$Color$rgb, 0.033385, 0.023702, 0.123397),
			A3($avh4$elm_color$Color$rgb, 0.037668, 0.025921, 0.132232),
			A3($avh4$elm_color$Color$rgb, 0.042253, 0.028139, 0.141141),
			A3($avh4$elm_color$Color$rgb, 0.046915, 0.030324, 0.150164),
			A3($avh4$elm_color$Color$rgb, 0.051644, 0.032474, 0.159254),
			A3($avh4$elm_color$Color$rgb, 0.056449, 0.034569, 0.168414),
			A3($avh4$elm_color$Color$rgb, 0.06134, 0.03659, 0.177642),
			A3($avh4$elm_color$Color$rgb, 0.066331, 0.038504, 0.186962),
			A3($avh4$elm_color$Color$rgb, 0.071429, 0.040294, 0.196354),
			A3($avh4$elm_color$Color$rgb, 0.076637, 0.041905, 0.205799),
			A3($avh4$elm_color$Color$rgb, 0.081962, 0.043328, 0.215289),
			A3($avh4$elm_color$Color$rgb, 0.087411, 0.044556, 0.224813),
			A3($avh4$elm_color$Color$rgb, 0.09299, 0.045583, 0.234358),
			A3($avh4$elm_color$Color$rgb, 0.098702, 0.046402, 0.243904),
			A3($avh4$elm_color$Color$rgb, 0.104551, 0.047008, 0.25343),
			A3($avh4$elm_color$Color$rgb, 0.110536, 0.047399, 0.262912),
			A3($avh4$elm_color$Color$rgb, 0.116656, 0.047574, 0.272321),
			A3($avh4$elm_color$Color$rgb, 0.122908, 0.047536, 0.281624),
			A3($avh4$elm_color$Color$rgb, 0.129285, 0.047293, 0.290788),
			A3($avh4$elm_color$Color$rgb, 0.135778, 0.046856, 0.299776),
			A3($avh4$elm_color$Color$rgb, 0.142378, 0.046242, 0.308553),
			A3($avh4$elm_color$Color$rgb, 0.149073, 0.045468, 0.317085),
			A3($avh4$elm_color$Color$rgb, 0.15585, 0.044559, 0.325338),
			A3($avh4$elm_color$Color$rgb, 0.162689, 0.043554, 0.333277),
			A3($avh4$elm_color$Color$rgb, 0.169575, 0.042489, 0.340874),
			A3($avh4$elm_color$Color$rgb, 0.176493, 0.041402, 0.348111),
			A3($avh4$elm_color$Color$rgb, 0.183429, 0.040329, 0.354971),
			A3($avh4$elm_color$Color$rgb, 0.190367, 0.039309, 0.361447),
			A3($avh4$elm_color$Color$rgb, 0.197297, 0.0384, 0.367535),
			A3($avh4$elm_color$Color$rgb, 0.204209, 0.037632, 0.373238),
			A3($avh4$elm_color$Color$rgb, 0.211095, 0.03703, 0.378563),
			A3($avh4$elm_color$Color$rgb, 0.217949, 0.036615, 0.383522),
			A3($avh4$elm_color$Color$rgb, 0.224763, 0.036405, 0.388129),
			A3($avh4$elm_color$Color$rgb, 0.231538, 0.036405, 0.3924),
			A3($avh4$elm_color$Color$rgb, 0.238273, 0.036621, 0.396353),
			A3($avh4$elm_color$Color$rgb, 0.244967, 0.037055, 0.400007),
			A3($avh4$elm_color$Color$rgb, 0.25162, 0.037705, 0.403378),
			A3($avh4$elm_color$Color$rgb, 0.258234, 0.038571, 0.406485),
			A3($avh4$elm_color$Color$rgb, 0.26481, 0.039647, 0.409345),
			A3($avh4$elm_color$Color$rgb, 0.271347, 0.040922, 0.411976),
			A3($avh4$elm_color$Color$rgb, 0.27785, 0.042353, 0.414392),
			A3($avh4$elm_color$Color$rgb, 0.284321, 0.043933, 0.416608),
			A3($avh4$elm_color$Color$rgb, 0.290763, 0.045644, 0.418637),
			A3($avh4$elm_color$Color$rgb, 0.297178, 0.04747, 0.420491),
			A3($avh4$elm_color$Color$rgb, 0.303568, 0.049396, 0.422182),
			A3($avh4$elm_color$Color$rgb, 0.309935, 0.051407, 0.423721),
			A3($avh4$elm_color$Color$rgb, 0.316282, 0.05349, 0.425116),
			A3($avh4$elm_color$Color$rgb, 0.32261, 0.055634, 0.426377),
			A3($avh4$elm_color$Color$rgb, 0.328921, 0.057827, 0.427511),
			A3($avh4$elm_color$Color$rgb, 0.335217, 0.06006, 0.428524),
			A3($avh4$elm_color$Color$rgb, 0.3415, 0.062325, 0.429425),
			A3($avh4$elm_color$Color$rgb, 0.347771, 0.064616, 0.430217),
			A3($avh4$elm_color$Color$rgb, 0.354032, 0.066925, 0.430906),
			A3($avh4$elm_color$Color$rgb, 0.360284, 0.069247, 0.431497),
			A3($avh4$elm_color$Color$rgb, 0.366529, 0.071579, 0.431994),
			A3($avh4$elm_color$Color$rgb, 0.372768, 0.073915, 0.4324),
			A3($avh4$elm_color$Color$rgb, 0.379001, 0.076253, 0.432719),
			A3($avh4$elm_color$Color$rgb, 0.385228, 0.078591, 0.432955),
			A3($avh4$elm_color$Color$rgb, 0.391453, 0.080927, 0.433109),
			A3($avh4$elm_color$Color$rgb, 0.397674, 0.083257, 0.433183),
			A3($avh4$elm_color$Color$rgb, 0.403894, 0.08558, 0.433179),
			A3($avh4$elm_color$Color$rgb, 0.410113, 0.087896, 0.433098),
			A3($avh4$elm_color$Color$rgb, 0.416331, 0.090203, 0.432943),
			A3($avh4$elm_color$Color$rgb, 0.422549, 0.092501, 0.432714),
			A3($avh4$elm_color$Color$rgb, 0.428768, 0.09479, 0.432412),
			A3($avh4$elm_color$Color$rgb, 0.434987, 0.097069, 0.432039),
			A3($avh4$elm_color$Color$rgb, 0.441207, 0.099338, 0.431594),
			A3($avh4$elm_color$Color$rgb, 0.447428, 0.101597, 0.43108),
			A3($avh4$elm_color$Color$rgb, 0.453651, 0.103848, 0.430498),
			A3($avh4$elm_color$Color$rgb, 0.459875, 0.106089, 0.429846),
			A3($avh4$elm_color$Color$rgb, 0.4661, 0.108322, 0.429125),
			A3($avh4$elm_color$Color$rgb, 0.472328, 0.110547, 0.428334),
			A3($avh4$elm_color$Color$rgb, 0.478558, 0.112764, 0.427475),
			A3($avh4$elm_color$Color$rgb, 0.484789, 0.114974, 0.426548),
			A3($avh4$elm_color$Color$rgb, 0.491022, 0.117179, 0.425552),
			A3($avh4$elm_color$Color$rgb, 0.497257, 0.119379, 0.424488),
			A3($avh4$elm_color$Color$rgb, 0.503493, 0.121575, 0.423356),
			A3($avh4$elm_color$Color$rgb, 0.50973, 0.123769, 0.422156),
			A3($avh4$elm_color$Color$rgb, 0.515967, 0.12596, 0.420887),
			A3($avh4$elm_color$Color$rgb, 0.522206, 0.12815, 0.419549),
			A3($avh4$elm_color$Color$rgb, 0.528444, 0.130341, 0.418142),
			A3($avh4$elm_color$Color$rgb, 0.534683, 0.132534, 0.416667),
			A3($avh4$elm_color$Color$rgb, 0.54092, 0.134729, 0.415123),
			A3($avh4$elm_color$Color$rgb, 0.547157, 0.136929, 0.413511),
			A3($avh4$elm_color$Color$rgb, 0.553392, 0.139134, 0.411829),
			A3($avh4$elm_color$Color$rgb, 0.559624, 0.141346, 0.410078),
			A3($avh4$elm_color$Color$rgb, 0.565854, 0.143567, 0.408258),
			A3($avh4$elm_color$Color$rgb, 0.572081, 0.145797, 0.406369),
			A3($avh4$elm_color$Color$rgb, 0.578304, 0.148039, 0.404411),
			A3($avh4$elm_color$Color$rgb, 0.584521, 0.150294, 0.402385),
			A3($avh4$elm_color$Color$rgb, 0.590734, 0.152563, 0.40029),
			A3($avh4$elm_color$Color$rgb, 0.59694, 0.154848, 0.398125),
			A3($avh4$elm_color$Color$rgb, 0.603139, 0.157151, 0.395891),
			A3($avh4$elm_color$Color$rgb, 0.60933, 0.159474, 0.393589),
			A3($avh4$elm_color$Color$rgb, 0.615513, 0.161817, 0.391219),
			A3($avh4$elm_color$Color$rgb, 0.621685, 0.164184, 0.388781),
			A3($avh4$elm_color$Color$rgb, 0.627847, 0.166575, 0.386276),
			A3($avh4$elm_color$Color$rgb, 0.633998, 0.168992, 0.383704),
			A3($avh4$elm_color$Color$rgb, 0.640135, 0.171438, 0.381065),
			A3($avh4$elm_color$Color$rgb, 0.64626, 0.173914, 0.378359),
			A3($avh4$elm_color$Color$rgb, 0.652369, 0.176421, 0.375586),
			A3($avh4$elm_color$Color$rgb, 0.658463, 0.178962, 0.372748),
			A3($avh4$elm_color$Color$rgb, 0.66454, 0.181539, 0.369846),
			A3($avh4$elm_color$Color$rgb, 0.670599, 0.184153, 0.366879),
			A3($avh4$elm_color$Color$rgb, 0.676638, 0.186807, 0.363849),
			A3($avh4$elm_color$Color$rgb, 0.682656, 0.189501, 0.360757),
			A3($avh4$elm_color$Color$rgb, 0.688653, 0.192239, 0.357603),
			A3($avh4$elm_color$Color$rgb, 0.694627, 0.195021, 0.354388),
			A3($avh4$elm_color$Color$rgb, 0.700576, 0.197851, 0.351113),
			A3($avh4$elm_color$Color$rgb, 0.7065, 0.200728, 0.347777),
			A3($avh4$elm_color$Color$rgb, 0.712396, 0.203656, 0.344383),
			A3($avh4$elm_color$Color$rgb, 0.718264, 0.206636, 0.340931),
			A3($avh4$elm_color$Color$rgb, 0.724103, 0.20967, 0.337424),
			A3($avh4$elm_color$Color$rgb, 0.729909, 0.212759, 0.333861),
			A3($avh4$elm_color$Color$rgb, 0.735683, 0.215906, 0.330245),
			A3($avh4$elm_color$Color$rgb, 0.741423, 0.219112, 0.326576),
			A3($avh4$elm_color$Color$rgb, 0.747127, 0.222378, 0.322856),
			A3($avh4$elm_color$Color$rgb, 0.752794, 0.225706, 0.319085),
			A3($avh4$elm_color$Color$rgb, 0.758422, 0.229097, 0.315266),
			A3($avh4$elm_color$Color$rgb, 0.76401, 0.232554, 0.311399),
			A3($avh4$elm_color$Color$rgb, 0.769556, 0.236077, 0.307485),
			A3($avh4$elm_color$Color$rgb, 0.775059, 0.239667, 0.303526),
			A3($avh4$elm_color$Color$rgb, 0.780517, 0.243327, 0.299523),
			A3($avh4$elm_color$Color$rgb, 0.785929, 0.247056, 0.295477),
			A3($avh4$elm_color$Color$rgb, 0.791293, 0.250856, 0.29139),
			A3($avh4$elm_color$Color$rgb, 0.796607, 0.254728, 0.287264),
			A3($avh4$elm_color$Color$rgb, 0.801871, 0.258674, 0.283099),
			A3($avh4$elm_color$Color$rgb, 0.807082, 0.262692, 0.278898),
			A3($avh4$elm_color$Color$rgb, 0.812239, 0.266786, 0.274661),
			A3($avh4$elm_color$Color$rgb, 0.817341, 0.270954, 0.27039),
			A3($avh4$elm_color$Color$rgb, 0.822386, 0.275197, 0.266085),
			A3($avh4$elm_color$Color$rgb, 0.827372, 0.279517, 0.26175),
			A3($avh4$elm_color$Color$rgb, 0.832299, 0.283913, 0.257383),
			A3($avh4$elm_color$Color$rgb, 0.837165, 0.288385, 0.252988),
			A3($avh4$elm_color$Color$rgb, 0.841969, 0.292933, 0.248564),
			A3($avh4$elm_color$Color$rgb, 0.846709, 0.297559, 0.244113),
			A3($avh4$elm_color$Color$rgb, 0.851384, 0.30226, 0.239636),
			A3($avh4$elm_color$Color$rgb, 0.855992, 0.307038, 0.235133),
			A3($avh4$elm_color$Color$rgb, 0.860533, 0.311892, 0.230606),
			A3($avh4$elm_color$Color$rgb, 0.865006, 0.316822, 0.226055),
			A3($avh4$elm_color$Color$rgb, 0.869409, 0.321827, 0.221482),
			A3($avh4$elm_color$Color$rgb, 0.873741, 0.326906, 0.216886),
			A3($avh4$elm_color$Color$rgb, 0.878001, 0.33206, 0.212268),
			A3($avh4$elm_color$Color$rgb, 0.882188, 0.337287, 0.207628),
			A3($avh4$elm_color$Color$rgb, 0.886302, 0.342586, 0.202968),
			A3($avh4$elm_color$Color$rgb, 0.890341, 0.347957, 0.198286),
			A3($avh4$elm_color$Color$rgb, 0.894305, 0.353399, 0.193584),
			A3($avh4$elm_color$Color$rgb, 0.898192, 0.358911, 0.18886),
			A3($avh4$elm_color$Color$rgb, 0.902003, 0.364492, 0.184116),
			A3($avh4$elm_color$Color$rgb, 0.905735, 0.37014, 0.17935),
			A3($avh4$elm_color$Color$rgb, 0.90939, 0.375856, 0.174563),
			A3($avh4$elm_color$Color$rgb, 0.912966, 0.381636, 0.169755),
			A3($avh4$elm_color$Color$rgb, 0.916462, 0.387481, 0.164924),
			A3($avh4$elm_color$Color$rgb, 0.919879, 0.393389, 0.16007),
			A3($avh4$elm_color$Color$rgb, 0.923215, 0.399359, 0.155193),
			A3($avh4$elm_color$Color$rgb, 0.92647, 0.405389, 0.150292),
			A3($avh4$elm_color$Color$rgb, 0.929644, 0.411479, 0.145367),
			A3($avh4$elm_color$Color$rgb, 0.932737, 0.417627, 0.140417),
			A3($avh4$elm_color$Color$rgb, 0.935747, 0.423831, 0.13544),
			A3($avh4$elm_color$Color$rgb, 0.938675, 0.430091, 0.130438),
			A3($avh4$elm_color$Color$rgb, 0.941521, 0.436405, 0.125409),
			A3($avh4$elm_color$Color$rgb, 0.944285, 0.442772, 0.120354),
			A3($avh4$elm_color$Color$rgb, 0.946965, 0.449191, 0.115272),
			A3($avh4$elm_color$Color$rgb, 0.949562, 0.45566, 0.110164),
			A3($avh4$elm_color$Color$rgb, 0.952075, 0.462178, 0.105031),
			A3($avh4$elm_color$Color$rgb, 0.954506, 0.468744, 0.099874),
			A3($avh4$elm_color$Color$rgb, 0.956852, 0.475356, 0.094695),
			A3($avh4$elm_color$Color$rgb, 0.959114, 0.482014, 0.089499),
			A3($avh4$elm_color$Color$rgb, 0.961293, 0.488716, 0.084289),
			A3($avh4$elm_color$Color$rgb, 0.963387, 0.495462, 0.079073),
			A3($avh4$elm_color$Color$rgb, 0.965397, 0.502249, 0.073859),
			A3($avh4$elm_color$Color$rgb, 0.967322, 0.509078, 0.068659),
			A3($avh4$elm_color$Color$rgb, 0.969163, 0.515946, 0.063488),
			A3($avh4$elm_color$Color$rgb, 0.970919, 0.522853, 0.058367),
			A3($avh4$elm_color$Color$rgb, 0.97259, 0.529798, 0.053324),
			A3($avh4$elm_color$Color$rgb, 0.974176, 0.53678, 0.048392),
			A3($avh4$elm_color$Color$rgb, 0.975677, 0.543798, 0.043618),
			A3($avh4$elm_color$Color$rgb, 0.977092, 0.55085, 0.03905),
			A3($avh4$elm_color$Color$rgb, 0.978422, 0.557937, 0.034931),
			A3($avh4$elm_color$Color$rgb, 0.979666, 0.565057, 0.031409),
			A3($avh4$elm_color$Color$rgb, 0.980824, 0.572209, 0.028508),
			A3($avh4$elm_color$Color$rgb, 0.981895, 0.579392, 0.02625),
			A3($avh4$elm_color$Color$rgb, 0.982881, 0.586606, 0.024661),
			A3($avh4$elm_color$Color$rgb, 0.983779, 0.593849, 0.02377),
			A3($avh4$elm_color$Color$rgb, 0.984591, 0.601122, 0.023606),
			A3($avh4$elm_color$Color$rgb, 0.985315, 0.608422, 0.024202),
			A3($avh4$elm_color$Color$rgb, 0.985952, 0.61575, 0.025592),
			A3($avh4$elm_color$Color$rgb, 0.986502, 0.623105, 0.027814),
			A3($avh4$elm_color$Color$rgb, 0.986964, 0.630485, 0.030908),
			A3($avh4$elm_color$Color$rgb, 0.987337, 0.63789, 0.034916),
			A3($avh4$elm_color$Color$rgb, 0.987622, 0.64532, 0.039886),
			A3($avh4$elm_color$Color$rgb, 0.987819, 0.652773, 0.045581),
			A3($avh4$elm_color$Color$rgb, 0.987926, 0.66025, 0.05175),
			A3($avh4$elm_color$Color$rgb, 0.987945, 0.667748, 0.058329),
			A3($avh4$elm_color$Color$rgb, 0.987874, 0.675267, 0.065257),
			A3($avh4$elm_color$Color$rgb, 0.987714, 0.682807, 0.072489),
			A3($avh4$elm_color$Color$rgb, 0.987464, 0.690366, 0.07999),
			A3($avh4$elm_color$Color$rgb, 0.987124, 0.697944, 0.087731),
			A3($avh4$elm_color$Color$rgb, 0.986694, 0.70554, 0.095694),
			A3($avh4$elm_color$Color$rgb, 0.986175, 0.713153, 0.103863),
			A3($avh4$elm_color$Color$rgb, 0.985566, 0.720782, 0.112229),
			A3($avh4$elm_color$Color$rgb, 0.984865, 0.728427, 0.120785),
			A3($avh4$elm_color$Color$rgb, 0.984075, 0.736087, 0.129527),
			A3($avh4$elm_color$Color$rgb, 0.983196, 0.743758, 0.138453),
			A3($avh4$elm_color$Color$rgb, 0.982228, 0.751442, 0.147565),
			A3($avh4$elm_color$Color$rgb, 0.981173, 0.759135, 0.156863),
			A3($avh4$elm_color$Color$rgb, 0.980032, 0.766837, 0.166353),
			A3($avh4$elm_color$Color$rgb, 0.978806, 0.774545, 0.176037),
			A3($avh4$elm_color$Color$rgb, 0.977497, 0.782258, 0.185923),
			A3($avh4$elm_color$Color$rgb, 0.976108, 0.789974, 0.196018),
			A3($avh4$elm_color$Color$rgb, 0.974638, 0.797692, 0.206332),
			A3($avh4$elm_color$Color$rgb, 0.973088, 0.805409, 0.216877),
			A3($avh4$elm_color$Color$rgb, 0.971468, 0.813122, 0.227658),
			A3($avh4$elm_color$Color$rgb, 0.969783, 0.820825, 0.238686),
			A3($avh4$elm_color$Color$rgb, 0.968041, 0.828515, 0.249972),
			A3($avh4$elm_color$Color$rgb, 0.966243, 0.836191, 0.261534),
			A3($avh4$elm_color$Color$rgb, 0.964394, 0.843848, 0.273391),
			A3($avh4$elm_color$Color$rgb, 0.962517, 0.851476, 0.285546),
			A3($avh4$elm_color$Color$rgb, 0.960626, 0.859069, 0.29801),
			A3($avh4$elm_color$Color$rgb, 0.95872, 0.866624, 0.31082),
			A3($avh4$elm_color$Color$rgb, 0.956834, 0.874129, 0.323974),
			A3($avh4$elm_color$Color$rgb, 0.954997, 0.881569, 0.337475),
			A3($avh4$elm_color$Color$rgb, 0.953215, 0.888942, 0.351369),
			A3($avh4$elm_color$Color$rgb, 0.951546, 0.896226, 0.365627),
			A3($avh4$elm_color$Color$rgb, 0.950018, 0.903409, 0.380271),
			A3($avh4$elm_color$Color$rgb, 0.948683, 0.910473, 0.395289),
			A3($avh4$elm_color$Color$rgb, 0.947594, 0.917399, 0.410665),
			A3($avh4$elm_color$Color$rgb, 0.946809, 0.924168, 0.426373),
			A3($avh4$elm_color$Color$rgb, 0.946392, 0.930761, 0.442367),
			A3($avh4$elm_color$Color$rgb, 0.946403, 0.937159, 0.458592),
			A3($avh4$elm_color$Color$rgb, 0.946903, 0.943348, 0.47497),
			A3($avh4$elm_color$Color$rgb, 0.947937, 0.949318, 0.491426),
			A3($avh4$elm_color$Color$rgb, 0.949545, 0.955063, 0.50786),
			A3($avh4$elm_color$Color$rgb, 0.95174, 0.960587, 0.524203),
			A3($avh4$elm_color$Color$rgb, 0.954529, 0.965896, 0.540361),
			A3($avh4$elm_color$Color$rgb, 0.957896, 0.971003, 0.556275),
			A3($avh4$elm_color$Color$rgb, 0.961812, 0.975924, 0.571925),
			A3($avh4$elm_color$Color$rgb, 0.966249, 0.980678, 0.587206),
			A3($avh4$elm_color$Color$rgb, 0.971162, 0.985282, 0.602154),
			A3($avh4$elm_color$Color$rgb, 0.976511, 0.989753, 0.61676),
			A3($avh4$elm_color$Color$rgb, 0.982257, 0.994109, 0.631017),
			A3($avh4$elm_color$Color$rgb, 0.988362, 0.998364, 0.644924)
		]));
var $newmana$chroma_elm$Chroma$Colors$Magma$magma = A2(
	$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	A3($avh4$elm_color$Color$rgb, 0.001462, 0.000466, 0.013866),
	_List_fromArray(
		[
			A3($avh4$elm_color$Color$rgb, 0.002258, 0.001295, 0.018331),
			A3($avh4$elm_color$Color$rgb, 0.003279, 0.002305, 0.023708),
			A3($avh4$elm_color$Color$rgb, 0.004512, 0.00349, 0.029965),
			A3($avh4$elm_color$Color$rgb, 0.007588, 0.006356, 0.044973),
			A3($avh4$elm_color$Color$rgb, 0.009426, 0.008022, 0.052844),
			A3($avh4$elm_color$Color$rgb, 0.011465, 0.009828, 0.06075),
			A3($avh4$elm_color$Color$rgb, 0.013708, 0.011771, 0.068667),
			A3($avh4$elm_color$Color$rgb, 0.016156, 0.01384, 0.076603),
			A3($avh4$elm_color$Color$rgb, 0.018815, 0.016026, 0.084584),
			A3($avh4$elm_color$Color$rgb, 0.021692, 0.01832, 0.09261),
			A3($avh4$elm_color$Color$rgb, 0.024792, 0.020715, 0.100676),
			A3($avh4$elm_color$Color$rgb, 0.028123, 0.023201, 0.108787),
			A3($avh4$elm_color$Color$rgb, 0.031696, 0.025765, 0.116965),
			A3($avh4$elm_color$Color$rgb, 0.03552, 0.028397, 0.125209),
			A3($avh4$elm_color$Color$rgb, 0.039608, 0.03109, 0.133515),
			A3($avh4$elm_color$Color$rgb, 0.04383, 0.03383, 0.141886),
			A3($avh4$elm_color$Color$rgb, 0.048062, 0.036607, 0.150327),
			A3($avh4$elm_color$Color$rgb, 0.05232, 0.039407, 0.158841),
			A3($avh4$elm_color$Color$rgb, 0.056615, 0.04216, 0.167446),
			A3($avh4$elm_color$Color$rgb, 0.060949, 0.044794, 0.176129),
			A3($avh4$elm_color$Color$rgb, 0.06533, 0.047318, 0.184892),
			A3($avh4$elm_color$Color$rgb, 0.069764, 0.049726, 0.193735),
			A3($avh4$elm_color$Color$rgb, 0.074257, 0.052017, 0.20266),
			A3($avh4$elm_color$Color$rgb, 0.078815, 0.054184, 0.211667),
			A3($avh4$elm_color$Color$rgb, 0.083446, 0.056225, 0.220755),
			A3($avh4$elm_color$Color$rgb, 0.088155, 0.058133, 0.229922),
			A3($avh4$elm_color$Color$rgb, 0.092949, 0.059904, 0.239164),
			A3($avh4$elm_color$Color$rgb, 0.097833, 0.061531, 0.248477),
			A3($avh4$elm_color$Color$rgb, 0.102815, 0.06301, 0.257854),
			A3($avh4$elm_color$Color$rgb, 0.107899, 0.064335, 0.267289),
			A3($avh4$elm_color$Color$rgb, 0.113094, 0.065492, 0.276784),
			A3($avh4$elm_color$Color$rgb, 0.118405, 0.066479, 0.286321),
			A3($avh4$elm_color$Color$rgb, 0.123833, 0.067295, 0.295879),
			A3($avh4$elm_color$Color$rgb, 0.12938, 0.067935, 0.305443),
			A3($avh4$elm_color$Color$rgb, 0.135053, 0.068391, 0.315),
			A3($avh4$elm_color$Color$rgb, 0.140858, 0.068654, 0.324538),
			A3($avh4$elm_color$Color$rgb, 0.146785, 0.068738, 0.334011),
			A3($avh4$elm_color$Color$rgb, 0.152839, 0.068637, 0.343404),
			A3($avh4$elm_color$Color$rgb, 0.159018, 0.068354, 0.352688),
			A3($avh4$elm_color$Color$rgb, 0.165308, 0.067911, 0.361816),
			A3($avh4$elm_color$Color$rgb, 0.171713, 0.067305, 0.370771),
			A3($avh4$elm_color$Color$rgb, 0.178212, 0.066576, 0.379497),
			A3($avh4$elm_color$Color$rgb, 0.184801, 0.065732, 0.387973),
			A3($avh4$elm_color$Color$rgb, 0.19146, 0.064818, 0.396152),
			A3($avh4$elm_color$Color$rgb, 0.198177, 0.063862, 0.404009),
			A3($avh4$elm_color$Color$rgb, 0.204935, 0.062907, 0.411514),
			A3($avh4$elm_color$Color$rgb, 0.211718, 0.061992, 0.418647),
			A3($avh4$elm_color$Color$rgb, 0.218512, 0.061158, 0.425392),
			A3($avh4$elm_color$Color$rgb, 0.225302, 0.060445, 0.431742),
			A3($avh4$elm_color$Color$rgb, 0.232077, 0.059889, 0.437695),
			A3($avh4$elm_color$Color$rgb, 0.238826, 0.059517, 0.443256),
			A3($avh4$elm_color$Color$rgb, 0.245543, 0.059352, 0.448436),
			A3($avh4$elm_color$Color$rgb, 0.25222, 0.059415, 0.453248),
			A3($avh4$elm_color$Color$rgb, 0.258857, 0.059706, 0.45771),
			A3($avh4$elm_color$Color$rgb, 0.265447, 0.060237, 0.46184),
			A3($avh4$elm_color$Color$rgb, 0.271994, 0.060994, 0.46566),
			A3($avh4$elm_color$Color$rgb, 0.278493, 0.061978, 0.46919),
			A3($avh4$elm_color$Color$rgb, 0.284951, 0.063168, 0.472451),
			A3($avh4$elm_color$Color$rgb, 0.291366, 0.064553, 0.475462),
			A3($avh4$elm_color$Color$rgb, 0.29774, 0.066117, 0.478243),
			A3($avh4$elm_color$Color$rgb, 0.304081, 0.067835, 0.480812),
			A3($avh4$elm_color$Color$rgb, 0.310382, 0.069702, 0.483186),
			A3($avh4$elm_color$Color$rgb, 0.316654, 0.07169, 0.48538),
			A3($avh4$elm_color$Color$rgb, 0.322899, 0.073782, 0.487408),
			A3($avh4$elm_color$Color$rgb, 0.329114, 0.075972, 0.489287),
			A3($avh4$elm_color$Color$rgb, 0.335308, 0.078236, 0.491024),
			A3($avh4$elm_color$Color$rgb, 0.341482, 0.080564, 0.492631),
			A3($avh4$elm_color$Color$rgb, 0.347636, 0.082946, 0.494121),
			A3($avh4$elm_color$Color$rgb, 0.353773, 0.085373, 0.495501),
			A3($avh4$elm_color$Color$rgb, 0.359898, 0.087831, 0.496778),
			A3($avh4$elm_color$Color$rgb, 0.366012, 0.090314, 0.49796),
			A3($avh4$elm_color$Color$rgb, 0.372116, 0.092816, 0.499053),
			A3($avh4$elm_color$Color$rgb, 0.378211, 0.095332, 0.500067),
			A3($avh4$elm_color$Color$rgb, 0.384299, 0.097855, 0.501002),
			A3($avh4$elm_color$Color$rgb, 0.390384, 0.100379, 0.501864),
			A3($avh4$elm_color$Color$rgb, 0.396467, 0.102902, 0.502658),
			A3($avh4$elm_color$Color$rgb, 0.402548, 0.10542, 0.503386),
			A3($avh4$elm_color$Color$rgb, 0.408629, 0.10793, 0.504052),
			A3($avh4$elm_color$Color$rgb, 0.414709, 0.110431, 0.504662),
			A3($avh4$elm_color$Color$rgb, 0.420791, 0.11292, 0.505215),
			A3($avh4$elm_color$Color$rgb, 0.426877, 0.115395, 0.505714),
			A3($avh4$elm_color$Color$rgb, 0.432967, 0.117855, 0.50616),
			A3($avh4$elm_color$Color$rgb, 0.439062, 0.120298, 0.506555),
			A3($avh4$elm_color$Color$rgb, 0.445163, 0.122724, 0.506901),
			A3($avh4$elm_color$Color$rgb, 0.451271, 0.125132, 0.507198),
			A3($avh4$elm_color$Color$rgb, 0.457386, 0.127522, 0.507448),
			A3($avh4$elm_color$Color$rgb, 0.463508, 0.129893, 0.507652),
			A3($avh4$elm_color$Color$rgb, 0.46964, 0.132245, 0.507809),
			A3($avh4$elm_color$Color$rgb, 0.47578, 0.134577, 0.507921),
			A3($avh4$elm_color$Color$rgb, 0.481929, 0.136891, 0.507989),
			A3($avh4$elm_color$Color$rgb, 0.488088, 0.139186, 0.508011),
			A3($avh4$elm_color$Color$rgb, 0.494258, 0.141462, 0.507988),
			A3($avh4$elm_color$Color$rgb, 0.500438, 0.143719, 0.50792),
			A3($avh4$elm_color$Color$rgb, 0.506629, 0.145958, 0.507806),
			A3($avh4$elm_color$Color$rgb, 0.512831, 0.148179, 0.507648),
			A3($avh4$elm_color$Color$rgb, 0.519045, 0.150383, 0.507443),
			A3($avh4$elm_color$Color$rgb, 0.52527, 0.152569, 0.507192),
			A3($avh4$elm_color$Color$rgb, 0.531507, 0.154739, 0.506895),
			A3($avh4$elm_color$Color$rgb, 0.537755, 0.156894, 0.506551),
			A3($avh4$elm_color$Color$rgb, 0.544015, 0.159033, 0.506159),
			A3($avh4$elm_color$Color$rgb, 0.550287, 0.161158, 0.505719),
			A3($avh4$elm_color$Color$rgb, 0.556571, 0.163269, 0.50523),
			A3($avh4$elm_color$Color$rgb, 0.562866, 0.165368, 0.504692),
			A3($avh4$elm_color$Color$rgb, 0.569172, 0.167454, 0.504105),
			A3($avh4$elm_color$Color$rgb, 0.57549, 0.16953, 0.503466),
			A3($avh4$elm_color$Color$rgb, 0.581819, 0.171596, 0.502777),
			A3($avh4$elm_color$Color$rgb, 0.588158, 0.173652, 0.502035),
			A3($avh4$elm_color$Color$rgb, 0.594508, 0.175701, 0.501241),
			A3($avh4$elm_color$Color$rgb, 0.600868, 0.177743, 0.500394),
			A3($avh4$elm_color$Color$rgb, 0.607238, 0.179779, 0.499492),
			A3($avh4$elm_color$Color$rgb, 0.613617, 0.181811, 0.498536),
			A3($avh4$elm_color$Color$rgb, 0.620005, 0.18384, 0.497524),
			A3($avh4$elm_color$Color$rgb, 0.626401, 0.185867, 0.496456),
			A3($avh4$elm_color$Color$rgb, 0.632805, 0.187893, 0.495332),
			A3($avh4$elm_color$Color$rgb, 0.639216, 0.189921, 0.49415),
			A3($avh4$elm_color$Color$rgb, 0.645633, 0.191952, 0.49291),
			A3($avh4$elm_color$Color$rgb, 0.652056, 0.193986, 0.491611),
			A3($avh4$elm_color$Color$rgb, 0.658483, 0.196027, 0.490253),
			A3($avh4$elm_color$Color$rgb, 0.664915, 0.198075, 0.488836),
			A3($avh4$elm_color$Color$rgb, 0.671349, 0.200133, 0.487358),
			A3($avh4$elm_color$Color$rgb, 0.677786, 0.202203, 0.485819),
			A3($avh4$elm_color$Color$rgb, 0.684224, 0.204286, 0.484219),
			A3($avh4$elm_color$Color$rgb, 0.690661, 0.206384, 0.482558),
			A3($avh4$elm_color$Color$rgb, 0.697098, 0.208501, 0.480835),
			A3($avh4$elm_color$Color$rgb, 0.703532, 0.210638, 0.479049),
			A3($avh4$elm_color$Color$rgb, 0.709962, 0.212797, 0.477201),
			A3($avh4$elm_color$Color$rgb, 0.716387, 0.214982, 0.47529),
			A3($avh4$elm_color$Color$rgb, 0.722805, 0.217194, 0.473316),
			A3($avh4$elm_color$Color$rgb, 0.729216, 0.219437, 0.471279),
			A3($avh4$elm_color$Color$rgb, 0.735616, 0.221713, 0.46918),
			A3($avh4$elm_color$Color$rgb, 0.742004, 0.224025, 0.467018),
			A3($avh4$elm_color$Color$rgb, 0.748378, 0.226377, 0.464794),
			A3($avh4$elm_color$Color$rgb, 0.754737, 0.228772, 0.462509),
			A3($avh4$elm_color$Color$rgb, 0.761077, 0.231214, 0.460162),
			A3($avh4$elm_color$Color$rgb, 0.767398, 0.233705, 0.457755),
			A3($avh4$elm_color$Color$rgb, 0.773695, 0.236249, 0.455289),
			A3($avh4$elm_color$Color$rgb, 0.779968, 0.238851, 0.452765),
			A3($avh4$elm_color$Color$rgb, 0.786212, 0.241514, 0.450184),
			A3($avh4$elm_color$Color$rgb, 0.792427, 0.244242, 0.447543),
			A3($avh4$elm_color$Color$rgb, 0.798608, 0.24704, 0.444848),
			A3($avh4$elm_color$Color$rgb, 0.804752, 0.249911, 0.442102),
			A3($avh4$elm_color$Color$rgb, 0.810855, 0.252861, 0.439305),
			A3($avh4$elm_color$Color$rgb, 0.816914, 0.255895, 0.436461),
			A3($avh4$elm_color$Color$rgb, 0.822926, 0.259016, 0.433573),
			A3($avh4$elm_color$Color$rgb, 0.828886, 0.262229, 0.430644),
			A3($avh4$elm_color$Color$rgb, 0.834791, 0.26554, 0.427671),
			A3($avh4$elm_color$Color$rgb, 0.840636, 0.268953, 0.424666),
			A3($avh4$elm_color$Color$rgb, 0.846416, 0.272473, 0.421631),
			A3($avh4$elm_color$Color$rgb, 0.852126, 0.276106, 0.418573),
			A3($avh4$elm_color$Color$rgb, 0.857763, 0.279857, 0.415496),
			A3($avh4$elm_color$Color$rgb, 0.86332, 0.283729, 0.412403),
			A3($avh4$elm_color$Color$rgb, 0.868793, 0.287728, 0.409303),
			A3($avh4$elm_color$Color$rgb, 0.874176, 0.291859, 0.406205),
			A3($avh4$elm_color$Color$rgb, 0.879464, 0.296125, 0.403118),
			A3($avh4$elm_color$Color$rgb, 0.884651, 0.30053, 0.400047),
			A3($avh4$elm_color$Color$rgb, 0.889731, 0.305079, 0.397002),
			A3($avh4$elm_color$Color$rgb, 0.8947, 0.309773, 0.393995),
			A3($avh4$elm_color$Color$rgb, 0.899552, 0.314616, 0.391037),
			A3($avh4$elm_color$Color$rgb, 0.904281, 0.31961, 0.388137),
			A3($avh4$elm_color$Color$rgb, 0.908884, 0.324755, 0.385308),
			A3($avh4$elm_color$Color$rgb, 0.913354, 0.330052, 0.382563),
			A3($avh4$elm_color$Color$rgb, 0.917689, 0.3355, 0.379915),
			A3($avh4$elm_color$Color$rgb, 0.921884, 0.341098, 0.377376),
			A3($avh4$elm_color$Color$rgb, 0.925937, 0.346844, 0.374959),
			A3($avh4$elm_color$Color$rgb, 0.929845, 0.352734, 0.372677),
			A3($avh4$elm_color$Color$rgb, 0.933606, 0.358764, 0.370541),
			A3($avh4$elm_color$Color$rgb, 0.937221, 0.364929, 0.368567),
			A3($avh4$elm_color$Color$rgb, 0.940687, 0.371224, 0.366762),
			A3($avh4$elm_color$Color$rgb, 0.944006, 0.377643, 0.365136),
			A3($avh4$elm_color$Color$rgb, 0.94718, 0.384178, 0.363701),
			A3($avh4$elm_color$Color$rgb, 0.95021, 0.39082, 0.362468),
			A3($avh4$elm_color$Color$rgb, 0.953099, 0.397563, 0.361438),
			A3($avh4$elm_color$Color$rgb, 0.955849, 0.4044, 0.360619),
			A3($avh4$elm_color$Color$rgb, 0.958464, 0.411324, 0.360014),
			A3($avh4$elm_color$Color$rgb, 0.960949, 0.418323, 0.35963),
			A3($avh4$elm_color$Color$rgb, 0.96331, 0.42539, 0.359469),
			A3($avh4$elm_color$Color$rgb, 0.965549, 0.432519, 0.359529),
			A3($avh4$elm_color$Color$rgb, 0.967671, 0.439703, 0.35981),
			A3($avh4$elm_color$Color$rgb, 0.96968, 0.446936, 0.360311),
			A3($avh4$elm_color$Color$rgb, 0.971582, 0.45421, 0.36103),
			A3($avh4$elm_color$Color$rgb, 0.973381, 0.46152, 0.361965),
			A3($avh4$elm_color$Color$rgb, 0.975082, 0.468861, 0.363111),
			A3($avh4$elm_color$Color$rgb, 0.97669, 0.476226, 0.364466),
			A3($avh4$elm_color$Color$rgb, 0.97821, 0.483612, 0.366025),
			A3($avh4$elm_color$Color$rgb, 0.979645, 0.491014, 0.367783),
			A3($avh4$elm_color$Color$rgb, 0.981, 0.498428, 0.369734),
			A3($avh4$elm_color$Color$rgb, 0.982279, 0.505851, 0.371874),
			A3($avh4$elm_color$Color$rgb, 0.983485, 0.51328, 0.374198),
			A3($avh4$elm_color$Color$rgb, 0.984622, 0.520713, 0.376698),
			A3($avh4$elm_color$Color$rgb, 0.985693, 0.528148, 0.379371),
			A3($avh4$elm_color$Color$rgb, 0.9867, 0.535582, 0.38221),
			A3($avh4$elm_color$Color$rgb, 0.987646, 0.543015, 0.38521),
			A3($avh4$elm_color$Color$rgb, 0.988533, 0.550446, 0.388365),
			A3($avh4$elm_color$Color$rgb, 0.989363, 0.557873, 0.391671),
			A3($avh4$elm_color$Color$rgb, 0.990138, 0.565296, 0.395122),
			A3($avh4$elm_color$Color$rgb, 0.990871, 0.572706, 0.398714),
			A3($avh4$elm_color$Color$rgb, 0.991558, 0.580107, 0.402441),
			A3($avh4$elm_color$Color$rgb, 0.992196, 0.587502, 0.406299),
			A3($avh4$elm_color$Color$rgb, 0.992785, 0.594891, 0.410283),
			A3($avh4$elm_color$Color$rgb, 0.993326, 0.602275, 0.41439),
			A3($avh4$elm_color$Color$rgb, 0.993834, 0.609644, 0.418613),
			A3($avh4$elm_color$Color$rgb, 0.994309, 0.616999, 0.42295),
			A3($avh4$elm_color$Color$rgb, 0.994738, 0.62435, 0.427397),
			A3($avh4$elm_color$Color$rgb, 0.995122, 0.631696, 0.431951),
			A3($avh4$elm_color$Color$rgb, 0.99548, 0.639027, 0.436607),
			A3($avh4$elm_color$Color$rgb, 0.99581, 0.646344, 0.441361),
			A3($avh4$elm_color$Color$rgb, 0.996096, 0.653659, 0.446213),
			A3($avh4$elm_color$Color$rgb, 0.996341, 0.660969, 0.45116),
			A3($avh4$elm_color$Color$rgb, 0.99658, 0.668256, 0.456192),
			A3($avh4$elm_color$Color$rgb, 0.996775, 0.675541, 0.461314),
			A3($avh4$elm_color$Color$rgb, 0.996925, 0.682828, 0.466526),
			A3($avh4$elm_color$Color$rgb, 0.997077, 0.690088, 0.471811),
			A3($avh4$elm_color$Color$rgb, 0.997186, 0.697349, 0.477182),
			A3($avh4$elm_color$Color$rgb, 0.997254, 0.704611, 0.482635),
			A3($avh4$elm_color$Color$rgb, 0.997325, 0.711848, 0.488154),
			A3($avh4$elm_color$Color$rgb, 0.997351, 0.719089, 0.493755),
			A3($avh4$elm_color$Color$rgb, 0.997351, 0.726324, 0.499428),
			A3($avh4$elm_color$Color$rgb, 0.997341, 0.733545, 0.505167),
			A3($avh4$elm_color$Color$rgb, 0.997285, 0.740772, 0.510983),
			A3($avh4$elm_color$Color$rgb, 0.997228, 0.747981, 0.516859),
			A3($avh4$elm_color$Color$rgb, 0.997138, 0.75519, 0.522806),
			A3($avh4$elm_color$Color$rgb, 0.997019, 0.762398, 0.528821),
			A3($avh4$elm_color$Color$rgb, 0.996898, 0.769591, 0.534892),
			A3($avh4$elm_color$Color$rgb, 0.996727, 0.776795, 0.541039),
			A3($avh4$elm_color$Color$rgb, 0.996571, 0.783977, 0.547233),
			A3($avh4$elm_color$Color$rgb, 0.996369, 0.791167, 0.553499),
			A3($avh4$elm_color$Color$rgb, 0.996162, 0.798348, 0.55982),
			A3($avh4$elm_color$Color$rgb, 0.995932, 0.805527, 0.566202),
			A3($avh4$elm_color$Color$rgb, 0.99568, 0.812706, 0.572645),
			A3($avh4$elm_color$Color$rgb, 0.995424, 0.819875, 0.57914),
			A3($avh4$elm_color$Color$rgb, 0.995131, 0.827052, 0.585701),
			A3($avh4$elm_color$Color$rgb, 0.994851, 0.834213, 0.592307),
			A3($avh4$elm_color$Color$rgb, 0.994524, 0.841387, 0.598983),
			A3($avh4$elm_color$Color$rgb, 0.994222, 0.84854, 0.605696),
			A3($avh4$elm_color$Color$rgb, 0.993866, 0.855711, 0.612482),
			A3($avh4$elm_color$Color$rgb, 0.993545, 0.862859, 0.619299),
			A3($avh4$elm_color$Color$rgb, 0.99317, 0.870024, 0.626189),
			A3($avh4$elm_color$Color$rgb, 0.992831, 0.877168, 0.633109),
			A3($avh4$elm_color$Color$rgb, 0.99244, 0.88433, 0.640099),
			A3($avh4$elm_color$Color$rgb, 0.992089, 0.89147, 0.647116),
			A3($avh4$elm_color$Color$rgb, 0.991688, 0.898627, 0.654202),
			A3($avh4$elm_color$Color$rgb, 0.991332, 0.905763, 0.661309),
			A3($avh4$elm_color$Color$rgb, 0.99093, 0.912915, 0.668481),
			A3($avh4$elm_color$Color$rgb, 0.99057, 0.920049, 0.675675),
			A3($avh4$elm_color$Color$rgb, 0.990175, 0.927196, 0.682926),
			A3($avh4$elm_color$Color$rgb, 0.989815, 0.934329, 0.690198),
			A3($avh4$elm_color$Color$rgb, 0.989434, 0.94147, 0.697519),
			A3($avh4$elm_color$Color$rgb, 0.989077, 0.948604, 0.704863),
			A3($avh4$elm_color$Color$rgb, 0.988717, 0.955742, 0.712242),
			A3($avh4$elm_color$Color$rgb, 0.988367, 0.962878, 0.719649),
			A3($avh4$elm_color$Color$rgb, 0.988033, 0.970012, 0.727077),
			A3($avh4$elm_color$Color$rgb, 0.987691, 0.977154, 0.734536),
			A3($avh4$elm_color$Color$rgb, 0.987387, 0.984288, 0.742002),
			A3($avh4$elm_color$Color$rgb, 0.987053, 0.991438, 0.749504)
		]));
var $newmana$chroma_elm$Chroma$Colors$Parula$parula = A2(
	$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	A3($avh4$elm_color$Color$rgb, 0.2081, 0.1663, 0.5292),
	_List_fromArray(
		[
			A3($avh4$elm_color$Color$rgb, 0.2091, 0.1721, 0.5411),
			A3($avh4$elm_color$Color$rgb, 0.2101, 0.1779, 0.553),
			A3($avh4$elm_color$Color$rgb, 0.2109, 0.1837, 0.565),
			A3($avh4$elm_color$Color$rgb, 0.2116, 0.1895, 0.5771),
			A3($avh4$elm_color$Color$rgb, 0.2121, 0.1954, 0.5892),
			A3($avh4$elm_color$Color$rgb, 0.2124, 0.2013, 0.6013),
			A3($avh4$elm_color$Color$rgb, 0.2125, 0.2072, 0.6135),
			A3($avh4$elm_color$Color$rgb, 0.2123, 0.2132, 0.6258),
			A3($avh4$elm_color$Color$rgb, 0.2118, 0.2192, 0.6381),
			A3($avh4$elm_color$Color$rgb, 0.2111, 0.2253, 0.6505),
			A3($avh4$elm_color$Color$rgb, 0.2099, 0.2315, 0.6629),
			A3($avh4$elm_color$Color$rgb, 0.2084, 0.2377, 0.6753),
			A3($avh4$elm_color$Color$rgb, 0.2063, 0.244, 0.6878),
			A3($avh4$elm_color$Color$rgb, 0.2038, 0.2503, 0.7003),
			A3($avh4$elm_color$Color$rgb, 0.2006, 0.2568, 0.7129),
			A3($avh4$elm_color$Color$rgb, 0.1968, 0.2632, 0.7255),
			A3($avh4$elm_color$Color$rgb, 0.1921, 0.2698, 0.7381),
			A3($avh4$elm_color$Color$rgb, 0.1867, 0.2764, 0.7507),
			A3($avh4$elm_color$Color$rgb, 0.1802, 0.2832, 0.7634),
			A3($avh4$elm_color$Color$rgb, 0.1728, 0.2902, 0.7762),
			A3($avh4$elm_color$Color$rgb, 0.1641, 0.2975, 0.789),
			A3($avh4$elm_color$Color$rgb, 0.1541, 0.3052, 0.8017),
			A3($avh4$elm_color$Color$rgb, 0.1427, 0.3132, 0.8145),
			A3($avh4$elm_color$Color$rgb, 0.1295, 0.3217, 0.8269),
			A3($avh4$elm_color$Color$rgb, 0.1147, 0.3306, 0.8387),
			A3($avh4$elm_color$Color$rgb, 0.0986, 0.3397, 0.8495),
			A3($avh4$elm_color$Color$rgb, 0.0816, 0.3486, 0.8588),
			A3($avh4$elm_color$Color$rgb, 0.0646, 0.3572, 0.8664),
			A3($avh4$elm_color$Color$rgb, 0.0482, 0.3651, 0.8722),
			A3($avh4$elm_color$Color$rgb, 0.0329, 0.3724, 0.8765),
			A3($avh4$elm_color$Color$rgb, 0.0213, 0.3792, 0.8796),
			A3($avh4$elm_color$Color$rgb, 0.0136, 0.3853, 0.8815),
			A3($avh4$elm_color$Color$rgb, 0.0086, 0.3911, 0.8827),
			A3($avh4$elm_color$Color$rgb, 0.006, 0.3965, 0.8833),
			A3($avh4$elm_color$Color$rgb, 0.0051, 0.4017, 0.8834),
			A3($avh4$elm_color$Color$rgb, 0.0054, 0.4066, 0.8831),
			A3($avh4$elm_color$Color$rgb, 0.0067, 0.4113, 0.8825),
			A3($avh4$elm_color$Color$rgb, 0.0089, 0.4159, 0.8816),
			A3($avh4$elm_color$Color$rgb, 0.0116, 0.4203, 0.8805),
			A3($avh4$elm_color$Color$rgb, 0.0148, 0.4246, 0.8793),
			A3($avh4$elm_color$Color$rgb, 0.0184, 0.4288, 0.8779),
			A3($avh4$elm_color$Color$rgb, 0.0223, 0.4329, 0.8763),
			A3($avh4$elm_color$Color$rgb, 0.0264, 0.437, 0.8747),
			A3($avh4$elm_color$Color$rgb, 0.0306, 0.441, 0.8729),
			A3($avh4$elm_color$Color$rgb, 0.0349, 0.4449, 0.8711),
			A3($avh4$elm_color$Color$rgb, 0.0394, 0.4488, 0.8692),
			A3($avh4$elm_color$Color$rgb, 0.0437, 0.4526, 0.8672),
			A3($avh4$elm_color$Color$rgb, 0.0477, 0.4564, 0.8652),
			A3($avh4$elm_color$Color$rgb, 0.0514, 0.4602, 0.8632),
			A3($avh4$elm_color$Color$rgb, 0.0549, 0.464, 0.8611),
			A3($avh4$elm_color$Color$rgb, 0.0582, 0.4677, 0.8589),
			A3($avh4$elm_color$Color$rgb, 0.0612, 0.4714, 0.8568),
			A3($avh4$elm_color$Color$rgb, 0.064, 0.4751, 0.8546),
			A3($avh4$elm_color$Color$rgb, 0.0666, 0.4788, 0.8525),
			A3($avh4$elm_color$Color$rgb, 0.0689, 0.4825, 0.8503),
			A3($avh4$elm_color$Color$rgb, 0.071, 0.4862, 0.8481),
			A3($avh4$elm_color$Color$rgb, 0.0729, 0.4899, 0.846),
			A3($avh4$elm_color$Color$rgb, 0.0746, 0.4937, 0.8439),
			A3($avh4$elm_color$Color$rgb, 0.0761, 0.4974, 0.8418),
			A3($avh4$elm_color$Color$rgb, 0.0773, 0.5012, 0.8398),
			A3($avh4$elm_color$Color$rgb, 0.0782, 0.5051, 0.8378),
			A3($avh4$elm_color$Color$rgb, 0.0789, 0.5089, 0.8359),
			A3($avh4$elm_color$Color$rgb, 0.0794, 0.5129, 0.8341),
			A3($avh4$elm_color$Color$rgb, 0.0795, 0.5169, 0.8324),
			A3($avh4$elm_color$Color$rgb, 0.0793, 0.521, 0.8308),
			A3($avh4$elm_color$Color$rgb, 0.0788, 0.5251, 0.8293),
			A3($avh4$elm_color$Color$rgb, 0.0778, 0.5295, 0.828),
			A3($avh4$elm_color$Color$rgb, 0.0764, 0.5339, 0.827),
			A3($avh4$elm_color$Color$rgb, 0.0746, 0.5384, 0.8261),
			A3($avh4$elm_color$Color$rgb, 0.0724, 0.5431, 0.8253),
			A3($avh4$elm_color$Color$rgb, 0.0698, 0.5479, 0.8247),
			A3($avh4$elm_color$Color$rgb, 0.0668, 0.5527, 0.8243),
			A3($avh4$elm_color$Color$rgb, 0.0636, 0.5577, 0.8239),
			A3($avh4$elm_color$Color$rgb, 0.06, 0.5627, 0.8237),
			A3($avh4$elm_color$Color$rgb, 0.0562, 0.5677, 0.8234),
			A3($avh4$elm_color$Color$rgb, 0.0523, 0.5727, 0.8231),
			A3($avh4$elm_color$Color$rgb, 0.0484, 0.5777, 0.8228),
			A3($avh4$elm_color$Color$rgb, 0.0445, 0.5826, 0.8223),
			A3($avh4$elm_color$Color$rgb, 0.0408, 0.5874, 0.8217),
			A3($avh4$elm_color$Color$rgb, 0.0372, 0.5922, 0.8209),
			A3($avh4$elm_color$Color$rgb, 0.0342, 0.5968, 0.8198),
			A3($avh4$elm_color$Color$rgb, 0.0317, 0.6012, 0.8186),
			A3($avh4$elm_color$Color$rgb, 0.0296, 0.6055, 0.8171),
			A3($avh4$elm_color$Color$rgb, 0.0279, 0.6097, 0.8154),
			A3($avh4$elm_color$Color$rgb, 0.0265, 0.6137, 0.8135),
			A3($avh4$elm_color$Color$rgb, 0.0255, 0.6176, 0.8114),
			A3($avh4$elm_color$Color$rgb, 0.0248, 0.6214, 0.8091),
			A3($avh4$elm_color$Color$rgb, 0.0243, 0.625, 0.8066),
			A3($avh4$elm_color$Color$rgb, 0.0239, 0.6285, 0.8039),
			A3($avh4$elm_color$Color$rgb, 0.0237, 0.6319, 0.801),
			A3($avh4$elm_color$Color$rgb, 0.0235, 0.6352, 0.798),
			A3($avh4$elm_color$Color$rgb, 0.0233, 0.6384, 0.7948),
			A3($avh4$elm_color$Color$rgb, 0.0231, 0.6415, 0.7916),
			A3($avh4$elm_color$Color$rgb, 0.023, 0.6445, 0.7881),
			A3($avh4$elm_color$Color$rgb, 0.0229, 0.6474, 0.7846),
			A3($avh4$elm_color$Color$rgb, 0.0227, 0.6503, 0.781),
			A3($avh4$elm_color$Color$rgb, 0.0227, 0.6531, 0.7773),
			A3($avh4$elm_color$Color$rgb, 0.0232, 0.6558, 0.7735),
			A3($avh4$elm_color$Color$rgb, 0.0238, 0.6585, 0.7696),
			A3($avh4$elm_color$Color$rgb, 0.0246, 0.6611, 0.7656),
			A3($avh4$elm_color$Color$rgb, 0.0263, 0.6637, 0.7615),
			A3($avh4$elm_color$Color$rgb, 0.0282, 0.6663, 0.7574),
			A3($avh4$elm_color$Color$rgb, 0.0306, 0.6688, 0.7532),
			A3($avh4$elm_color$Color$rgb, 0.0338, 0.6712, 0.749),
			A3($avh4$elm_color$Color$rgb, 0.0373, 0.6737, 0.7446),
			A3($avh4$elm_color$Color$rgb, 0.0418, 0.6761, 0.7402),
			A3($avh4$elm_color$Color$rgb, 0.0467, 0.6784, 0.7358),
			A3($avh4$elm_color$Color$rgb, 0.0516, 0.6808, 0.7313),
			A3($avh4$elm_color$Color$rgb, 0.0574, 0.6831, 0.7267),
			A3($avh4$elm_color$Color$rgb, 0.0629, 0.6854, 0.7221),
			A3($avh4$elm_color$Color$rgb, 0.0692, 0.6877, 0.7173),
			A3($avh4$elm_color$Color$rgb, 0.0755, 0.6899, 0.7126),
			A3($avh4$elm_color$Color$rgb, 0.082, 0.6921, 0.7078),
			A3($avh4$elm_color$Color$rgb, 0.0889, 0.6943, 0.7029),
			A3($avh4$elm_color$Color$rgb, 0.0956, 0.6965, 0.6979),
			A3($avh4$elm_color$Color$rgb, 0.1031, 0.6986, 0.6929),
			A3($avh4$elm_color$Color$rgb, 0.1104, 0.7007, 0.6878),
			A3($avh4$elm_color$Color$rgb, 0.118, 0.7028, 0.6827),
			A3($avh4$elm_color$Color$rgb, 0.1258, 0.7049, 0.6775),
			A3($avh4$elm_color$Color$rgb, 0.1335, 0.7069, 0.6723),
			A3($avh4$elm_color$Color$rgb, 0.1418, 0.7089, 0.6669),
			A3($avh4$elm_color$Color$rgb, 0.1499, 0.7109, 0.6616),
			A3($avh4$elm_color$Color$rgb, 0.1585, 0.7129, 0.6561),
			A3($avh4$elm_color$Color$rgb, 0.1671, 0.7148, 0.6507),
			A3($avh4$elm_color$Color$rgb, 0.1758, 0.7168, 0.6451),
			A3($avh4$elm_color$Color$rgb, 0.1849, 0.7186, 0.6395),
			A3($avh4$elm_color$Color$rgb, 0.1938, 0.7205, 0.6338),
			A3($avh4$elm_color$Color$rgb, 0.2033, 0.7223, 0.6281),
			A3($avh4$elm_color$Color$rgb, 0.2128, 0.7241, 0.6223),
			A3($avh4$elm_color$Color$rgb, 0.2224, 0.7259, 0.6165),
			A3($avh4$elm_color$Color$rgb, 0.2324, 0.7275, 0.6107),
			A3($avh4$elm_color$Color$rgb, 0.2423, 0.7292, 0.6048),
			A3($avh4$elm_color$Color$rgb, 0.2527, 0.7308, 0.5988),
			A3($avh4$elm_color$Color$rgb, 0.2631, 0.7324, 0.5929),
			A3($avh4$elm_color$Color$rgb, 0.2735, 0.7339, 0.5869),
			A3($avh4$elm_color$Color$rgb, 0.2845, 0.7354, 0.5809),
			A3($avh4$elm_color$Color$rgb, 0.2953, 0.7368, 0.5749),
			A3($avh4$elm_color$Color$rgb, 0.3064, 0.7381, 0.5689),
			A3($avh4$elm_color$Color$rgb, 0.3177, 0.7394, 0.563),
			A3($avh4$elm_color$Color$rgb, 0.3289, 0.7406, 0.557),
			A3($avh4$elm_color$Color$rgb, 0.3405, 0.7417, 0.5512),
			A3($avh4$elm_color$Color$rgb, 0.352, 0.7428, 0.5453),
			A3($avh4$elm_color$Color$rgb, 0.3635, 0.7438, 0.5396),
			A3($avh4$elm_color$Color$rgb, 0.3753, 0.7446, 0.5339),
			A3($avh4$elm_color$Color$rgb, 0.3869, 0.7454, 0.5283),
			A3($avh4$elm_color$Color$rgb, 0.3986, 0.7461, 0.5229),
			A3($avh4$elm_color$Color$rgb, 0.4103, 0.7467, 0.5175),
			A3($avh4$elm_color$Color$rgb, 0.4218, 0.7473, 0.5123),
			A3($avh4$elm_color$Color$rgb, 0.4334, 0.7477, 0.5072),
			A3($avh4$elm_color$Color$rgb, 0.4447, 0.7482, 0.5021),
			A3($avh4$elm_color$Color$rgb, 0.4561, 0.7485, 0.4972),
			A3($avh4$elm_color$Color$rgb, 0.4672, 0.7487, 0.4924),
			A3($avh4$elm_color$Color$rgb, 0.4783, 0.7489, 0.4877),
			A3($avh4$elm_color$Color$rgb, 0.4892, 0.7491, 0.4831),
			A3($avh4$elm_color$Color$rgb, 0.5, 0.7491, 0.4786),
			A3($avh4$elm_color$Color$rgb, 0.5106, 0.7492, 0.4741),
			A3($avh4$elm_color$Color$rgb, 0.5212, 0.7492, 0.4698),
			A3($avh4$elm_color$Color$rgb, 0.5315, 0.7491, 0.4655),
			A3($avh4$elm_color$Color$rgb, 0.5418, 0.749, 0.4613),
			A3($avh4$elm_color$Color$rgb, 0.5519, 0.7489, 0.4571),
			A3($avh4$elm_color$Color$rgb, 0.5619, 0.7487, 0.4531),
			A3($avh4$elm_color$Color$rgb, 0.5718, 0.7485, 0.449),
			A3($avh4$elm_color$Color$rgb, 0.5816, 0.7482, 0.4451),
			A3($avh4$elm_color$Color$rgb, 0.5913, 0.7479, 0.4412),
			A3($avh4$elm_color$Color$rgb, 0.6009, 0.7476, 0.4374),
			A3($avh4$elm_color$Color$rgb, 0.6103, 0.7473, 0.4335),
			A3($avh4$elm_color$Color$rgb, 0.6197, 0.7469, 0.4298),
			A3($avh4$elm_color$Color$rgb, 0.629, 0.7465, 0.4261),
			A3($avh4$elm_color$Color$rgb, 0.6382, 0.746, 0.4224),
			A3($avh4$elm_color$Color$rgb, 0.6473, 0.7456, 0.4188),
			A3($avh4$elm_color$Color$rgb, 0.6564, 0.7451, 0.4152),
			A3($avh4$elm_color$Color$rgb, 0.6653, 0.7446, 0.4116),
			A3($avh4$elm_color$Color$rgb, 0.6742, 0.7441, 0.4081),
			A3($avh4$elm_color$Color$rgb, 0.683, 0.7435, 0.4046),
			A3($avh4$elm_color$Color$rgb, 0.6918, 0.743, 0.4011),
			A3($avh4$elm_color$Color$rgb, 0.7004, 0.7424, 0.3976),
			A3($avh4$elm_color$Color$rgb, 0.7091, 0.7418, 0.3942),
			A3($avh4$elm_color$Color$rgb, 0.7176, 0.7412, 0.3908),
			A3($avh4$elm_color$Color$rgb, 0.7261, 0.7405, 0.3874),
			A3($avh4$elm_color$Color$rgb, 0.7346, 0.7399, 0.384),
			A3($avh4$elm_color$Color$rgb, 0.743, 0.7392, 0.3806),
			A3($avh4$elm_color$Color$rgb, 0.7513, 0.7385, 0.3773),
			A3($avh4$elm_color$Color$rgb, 0.7596, 0.7378, 0.3739),
			A3($avh4$elm_color$Color$rgb, 0.7679, 0.7372, 0.3706),
			A3($avh4$elm_color$Color$rgb, 0.7761, 0.7364, 0.3673),
			A3($avh4$elm_color$Color$rgb, 0.7843, 0.7357, 0.3639),
			A3($avh4$elm_color$Color$rgb, 0.7924, 0.735, 0.3606),
			A3($avh4$elm_color$Color$rgb, 0.8005, 0.7343, 0.3573),
			A3($avh4$elm_color$Color$rgb, 0.8085, 0.7336, 0.3539),
			A3($avh4$elm_color$Color$rgb, 0.8166, 0.7329, 0.3506),
			A3($avh4$elm_color$Color$rgb, 0.8246, 0.7322, 0.3472),
			A3($avh4$elm_color$Color$rgb, 0.8325, 0.7315, 0.3438),
			A3($avh4$elm_color$Color$rgb, 0.8405, 0.7308, 0.3404),
			A3($avh4$elm_color$Color$rgb, 0.8484, 0.7301, 0.337),
			A3($avh4$elm_color$Color$rgb, 0.8563, 0.7294, 0.3336),
			A3($avh4$elm_color$Color$rgb, 0.8642, 0.7288, 0.33),
			A3($avh4$elm_color$Color$rgb, 0.872, 0.7282, 0.3265),
			A3($avh4$elm_color$Color$rgb, 0.8798, 0.7276, 0.3229),
			A3($avh4$elm_color$Color$rgb, 0.8877, 0.7271, 0.3193),
			A3($avh4$elm_color$Color$rgb, 0.8954, 0.7266, 0.3156),
			A3($avh4$elm_color$Color$rgb, 0.9032, 0.7262, 0.3117),
			A3($avh4$elm_color$Color$rgb, 0.911, 0.7259, 0.3078),
			A3($avh4$elm_color$Color$rgb, 0.9187, 0.7256, 0.3038),
			A3($avh4$elm_color$Color$rgb, 0.9264, 0.7256, 0.2996),
			A3($avh4$elm_color$Color$rgb, 0.9341, 0.7256, 0.2953),
			A3($avh4$elm_color$Color$rgb, 0.9417, 0.7259, 0.2907),
			A3($avh4$elm_color$Color$rgb, 0.9493, 0.7264, 0.2859),
			A3($avh4$elm_color$Color$rgb, 0.9567, 0.7273, 0.2808),
			A3($avh4$elm_color$Color$rgb, 0.9639, 0.7285, 0.2754),
			A3($avh4$elm_color$Color$rgb, 0.9708, 0.7303, 0.2696),
			A3($avh4$elm_color$Color$rgb, 0.9773, 0.7326, 0.2634),
			A3($avh4$elm_color$Color$rgb, 0.9831, 0.7355, 0.257),
			A3($avh4$elm_color$Color$rgb, 0.9882, 0.739, 0.2504),
			A3($avh4$elm_color$Color$rgb, 0.9922, 0.7431, 0.2437),
			A3($avh4$elm_color$Color$rgb, 0.9952, 0.7476, 0.2373),
			A3($avh4$elm_color$Color$rgb, 0.9973, 0.7524, 0.231),
			A3($avh4$elm_color$Color$rgb, 0.9986, 0.7573, 0.2251),
			A3($avh4$elm_color$Color$rgb, 0.9991, 0.7624, 0.2195),
			A3($avh4$elm_color$Color$rgb, 0.999, 0.7675, 0.2141),
			A3($avh4$elm_color$Color$rgb, 0.9985, 0.7726, 0.209),
			A3($avh4$elm_color$Color$rgb, 0.9976, 0.7778, 0.2042),
			A3($avh4$elm_color$Color$rgb, 0.9964, 0.7829, 0.1995),
			A3($avh4$elm_color$Color$rgb, 0.995, 0.788, 0.1949),
			A3($avh4$elm_color$Color$rgb, 0.9933, 0.7931, 0.1905),
			A3($avh4$elm_color$Color$rgb, 0.9914, 0.7981, 0.1863),
			A3($avh4$elm_color$Color$rgb, 0.9894, 0.8032, 0.1821),
			A3($avh4$elm_color$Color$rgb, 0.9873, 0.8083, 0.178),
			A3($avh4$elm_color$Color$rgb, 0.9851, 0.8133, 0.174),
			A3($avh4$elm_color$Color$rgb, 0.9828, 0.8184, 0.17),
			A3($avh4$elm_color$Color$rgb, 0.9805, 0.8235, 0.1661),
			A3($avh4$elm_color$Color$rgb, 0.9782, 0.8286, 0.1622),
			A3($avh4$elm_color$Color$rgb, 0.9759, 0.8337, 0.1583),
			A3($avh4$elm_color$Color$rgb, 0.9736, 0.8389, 0.1544),
			A3($avh4$elm_color$Color$rgb, 0.9713, 0.8441, 0.1505),
			A3($avh4$elm_color$Color$rgb, 0.9692, 0.8494, 0.1465),
			A3($avh4$elm_color$Color$rgb, 0.9672, 0.8548, 0.1425),
			A3($avh4$elm_color$Color$rgb, 0.9654, 0.8603, 0.1385),
			A3($avh4$elm_color$Color$rgb, 0.9638, 0.8659, 0.1343),
			A3($avh4$elm_color$Color$rgb, 0.9623, 0.8716, 0.1301),
			A3($avh4$elm_color$Color$rgb, 0.9611, 0.8774, 0.1258),
			A3($avh4$elm_color$Color$rgb, 0.96, 0.8834, 0.1215),
			A3($avh4$elm_color$Color$rgb, 0.9593, 0.8895, 0.1171),
			A3($avh4$elm_color$Color$rgb, 0.9588, 0.8958, 0.1126),
			A3($avh4$elm_color$Color$rgb, 0.9586, 0.9022, 0.1082),
			A3($avh4$elm_color$Color$rgb, 0.9587, 0.9088, 0.1036),
			A3($avh4$elm_color$Color$rgb, 0.9591, 0.9155, 0.099),
			A3($avh4$elm_color$Color$rgb, 0.9599, 0.9225, 0.0944),
			A3($avh4$elm_color$Color$rgb, 0.961, 0.9296, 0.0897),
			A3($avh4$elm_color$Color$rgb, 0.9624, 0.9368, 0.085),
			A3($avh4$elm_color$Color$rgb, 0.9641, 0.9443, 0.0802),
			A3($avh4$elm_color$Color$rgb, 0.9662, 0.9518, 0.0753),
			A3($avh4$elm_color$Color$rgb, 0.9685, 0.9595, 0.0703),
			A3($avh4$elm_color$Color$rgb, 0.971, 0.9673, 0.0651),
			A3($avh4$elm_color$Color$rgb, 0.9736, 0.9752, 0.0597),
			A3($avh4$elm_color$Color$rgb, 0.9763, 0.9831, 0.0538)
		]));
var $newmana$chroma_elm$Chroma$Colors$Plasma$plasma = A2(
	$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	A3($avh4$elm_color$Color$rgb, 0.050383, 0.029803, 0.527975),
	_List_fromArray(
		[
			A3($avh4$elm_color$Color$rgb, 0.063536, 0.028426, 0.533124),
			A3($avh4$elm_color$Color$rgb, 0.075353, 0.027206, 0.538007),
			A3($avh4$elm_color$Color$rgb, 0.086222, 0.026125, 0.542658),
			A3($avh4$elm_color$Color$rgb, 0.096379, 0.025165, 0.547103),
			A3($avh4$elm_color$Color$rgb, 0.10598, 0.024309, 0.551368),
			A3($avh4$elm_color$Color$rgb, 0.115124, 0.023556, 0.555468),
			A3($avh4$elm_color$Color$rgb, 0.123903, 0.022878, 0.559423),
			A3($avh4$elm_color$Color$rgb, 0.132381, 0.022258, 0.56325),
			A3($avh4$elm_color$Color$rgb, 0.140603, 0.021687, 0.566959),
			A3($avh4$elm_color$Color$rgb, 0.148607, 0.021154, 0.570562),
			A3($avh4$elm_color$Color$rgb, 0.156421, 0.020651, 0.574065),
			A3($avh4$elm_color$Color$rgb, 0.16407, 0.020171, 0.577478),
			A3($avh4$elm_color$Color$rgb, 0.171574, 0.019706, 0.580806),
			A3($avh4$elm_color$Color$rgb, 0.17895, 0.019252, 0.584054),
			A3($avh4$elm_color$Color$rgb, 0.186213, 0.018803, 0.587228),
			A3($avh4$elm_color$Color$rgb, 0.193374, 0.018354, 0.59033),
			A3($avh4$elm_color$Color$rgb, 0.200445, 0.017902, 0.593364),
			A3($avh4$elm_color$Color$rgb, 0.207435, 0.017442, 0.596333),
			A3($avh4$elm_color$Color$rgb, 0.21435, 0.016973, 0.599239),
			A3($avh4$elm_color$Color$rgb, 0.221197, 0.016497, 0.602083),
			A3($avh4$elm_color$Color$rgb, 0.227983, 0.016007, 0.604867),
			A3($avh4$elm_color$Color$rgb, 0.234715, 0.015502, 0.607592),
			A3($avh4$elm_color$Color$rgb, 0.241396, 0.014979, 0.610259),
			A3($avh4$elm_color$Color$rgb, 0.248032, 0.014439, 0.612868),
			A3($avh4$elm_color$Color$rgb, 0.254627, 0.013882, 0.615419),
			A3($avh4$elm_color$Color$rgb, 0.261183, 0.013308, 0.617911),
			A3($avh4$elm_color$Color$rgb, 0.267703, 0.012716, 0.620346),
			A3($avh4$elm_color$Color$rgb, 0.274191, 0.012109, 0.622722),
			A3($avh4$elm_color$Color$rgb, 0.280648, 0.011488, 0.625038),
			A3($avh4$elm_color$Color$rgb, 0.287076, 0.010855, 0.627295),
			A3($avh4$elm_color$Color$rgb, 0.293478, 0.010213, 0.62949),
			A3($avh4$elm_color$Color$rgb, 0.299855, 0.009561, 0.631624),
			A3($avh4$elm_color$Color$rgb, 0.30621, 0.008902, 0.633694),
			A3($avh4$elm_color$Color$rgb, 0.312543, 0.008239, 0.6357),
			A3($avh4$elm_color$Color$rgb, 0.318856, 0.007576, 0.63764),
			A3($avh4$elm_color$Color$rgb, 0.32515, 0.006915, 0.639512),
			A3($avh4$elm_color$Color$rgb, 0.331426, 0.006261, 0.641316),
			A3($avh4$elm_color$Color$rgb, 0.337683, 0.005618, 0.643049),
			A3($avh4$elm_color$Color$rgb, 0.343925, 0.004991, 0.64471),
			A3($avh4$elm_color$Color$rgb, 0.35015, 0.004382, 0.646298),
			A3($avh4$elm_color$Color$rgb, 0.356359, 0.003798, 0.64781),
			A3($avh4$elm_color$Color$rgb, 0.362553, 0.003243, 0.649245),
			A3($avh4$elm_color$Color$rgb, 0.368733, 0.002724, 0.650601),
			A3($avh4$elm_color$Color$rgb, 0.374897, 0.002245, 0.651876),
			A3($avh4$elm_color$Color$rgb, 0.381047, 0.001814, 0.653068),
			A3($avh4$elm_color$Color$rgb, 0.387183, 0.001434, 0.654177),
			A3($avh4$elm_color$Color$rgb, 0.393304, 0.001114, 0.655199),
			A3($avh4$elm_color$Color$rgb, 0.399411, 0.000859, 0.656133),
			A3($avh4$elm_color$Color$rgb, 0.405503, 0.000678, 0.656977),
			A3($avh4$elm_color$Color$rgb, 0.41158, 0.000577, 0.65773),
			A3($avh4$elm_color$Color$rgb, 0.417642, 0.000564, 0.65839),
			A3($avh4$elm_color$Color$rgb, 0.423689, 0.000646, 0.658956),
			A3($avh4$elm_color$Color$rgb, 0.429719, 0.000831, 0.659425),
			A3($avh4$elm_color$Color$rgb, 0.435734, 0.001127, 0.659797),
			A3($avh4$elm_color$Color$rgb, 0.441732, 0.00154, 0.660069),
			A3($avh4$elm_color$Color$rgb, 0.447714, 0.00208, 0.66024),
			A3($avh4$elm_color$Color$rgb, 0.453677, 0.002755, 0.66031),
			A3($avh4$elm_color$Color$rgb, 0.459623, 0.003574, 0.660277),
			A3($avh4$elm_color$Color$rgb, 0.46555, 0.004545, 0.660139),
			A3($avh4$elm_color$Color$rgb, 0.471457, 0.005678, 0.659897),
			A3($avh4$elm_color$Color$rgb, 0.477344, 0.00698, 0.659549),
			A3($avh4$elm_color$Color$rgb, 0.48321, 0.00846, 0.659095),
			A3($avh4$elm_color$Color$rgb, 0.489055, 0.010127, 0.658534),
			A3($avh4$elm_color$Color$rgb, 0.494877, 0.01199, 0.657865),
			A3($avh4$elm_color$Color$rgb, 0.500678, 0.014055, 0.657088),
			A3($avh4$elm_color$Color$rgb, 0.506454, 0.016333, 0.656202),
			A3($avh4$elm_color$Color$rgb, 0.512206, 0.018833, 0.655209),
			A3($avh4$elm_color$Color$rgb, 0.517933, 0.021563, 0.654109),
			A3($avh4$elm_color$Color$rgb, 0.523633, 0.024532, 0.652901),
			A3($avh4$elm_color$Color$rgb, 0.529306, 0.027747, 0.651586),
			A3($avh4$elm_color$Color$rgb, 0.534952, 0.031217, 0.650165),
			A3($avh4$elm_color$Color$rgb, 0.54057, 0.03495, 0.64864),
			A3($avh4$elm_color$Color$rgb, 0.546157, 0.038954, 0.64701),
			A3($avh4$elm_color$Color$rgb, 0.551715, 0.043136, 0.645277),
			A3($avh4$elm_color$Color$rgb, 0.557243, 0.047331, 0.643443),
			A3($avh4$elm_color$Color$rgb, 0.562738, 0.051545, 0.641509),
			A3($avh4$elm_color$Color$rgb, 0.568201, 0.055778, 0.639477),
			A3($avh4$elm_color$Color$rgb, 0.573632, 0.060028, 0.637349),
			A3($avh4$elm_color$Color$rgb, 0.579029, 0.064296, 0.635126),
			A3($avh4$elm_color$Color$rgb, 0.584391, 0.068579, 0.632812),
			A3($avh4$elm_color$Color$rgb, 0.589719, 0.072878, 0.630408),
			A3($avh4$elm_color$Color$rgb, 0.595011, 0.07719, 0.627917),
			A3($avh4$elm_color$Color$rgb, 0.600266, 0.081516, 0.625342),
			A3($avh4$elm_color$Color$rgb, 0.605485, 0.085854, 0.622686),
			A3($avh4$elm_color$Color$rgb, 0.610667, 0.090204, 0.619951),
			A3($avh4$elm_color$Color$rgb, 0.615812, 0.094564, 0.61714),
			A3($avh4$elm_color$Color$rgb, 0.620919, 0.098934, 0.614257),
			A3($avh4$elm_color$Color$rgb, 0.625987, 0.103312, 0.611305),
			A3($avh4$elm_color$Color$rgb, 0.631017, 0.107699, 0.608287),
			A3($avh4$elm_color$Color$rgb, 0.636008, 0.112092, 0.605205),
			A3($avh4$elm_color$Color$rgb, 0.640959, 0.116492, 0.602065),
			A3($avh4$elm_color$Color$rgb, 0.645872, 0.120898, 0.598867),
			A3($avh4$elm_color$Color$rgb, 0.650746, 0.125309, 0.595617),
			A3($avh4$elm_color$Color$rgb, 0.65558, 0.129725, 0.592317),
			A3($avh4$elm_color$Color$rgb, 0.660374, 0.134144, 0.588971),
			A3($avh4$elm_color$Color$rgb, 0.665129, 0.138566, 0.585582),
			A3($avh4$elm_color$Color$rgb, 0.669845, 0.142992, 0.582154),
			A3($avh4$elm_color$Color$rgb, 0.674522, 0.147419, 0.578688),
			A3($avh4$elm_color$Color$rgb, 0.67916, 0.151848, 0.575189),
			A3($avh4$elm_color$Color$rgb, 0.683758, 0.156278, 0.57166),
			A3($avh4$elm_color$Color$rgb, 0.688318, 0.160709, 0.568103),
			A3($avh4$elm_color$Color$rgb, 0.69284, 0.165141, 0.564522),
			A3($avh4$elm_color$Color$rgb, 0.697324, 0.169573, 0.560919),
			A3($avh4$elm_color$Color$rgb, 0.701769, 0.174005, 0.557296),
			A3($avh4$elm_color$Color$rgb, 0.706178, 0.178437, 0.553657),
			A3($avh4$elm_color$Color$rgb, 0.710549, 0.182868, 0.550004),
			A3($avh4$elm_color$Color$rgb, 0.714883, 0.187299, 0.546338),
			A3($avh4$elm_color$Color$rgb, 0.719181, 0.191729, 0.542663),
			A3($avh4$elm_color$Color$rgb, 0.723444, 0.196158, 0.538981),
			A3($avh4$elm_color$Color$rgb, 0.72767, 0.200586, 0.535293),
			A3($avh4$elm_color$Color$rgb, 0.731862, 0.205013, 0.531601),
			A3($avh4$elm_color$Color$rgb, 0.736019, 0.209439, 0.527908),
			A3($avh4$elm_color$Color$rgb, 0.740143, 0.213864, 0.524216),
			A3($avh4$elm_color$Color$rgb, 0.744232, 0.218288, 0.520524),
			A3($avh4$elm_color$Color$rgb, 0.748289, 0.222711, 0.516834),
			A3($avh4$elm_color$Color$rgb, 0.752312, 0.227133, 0.513149),
			A3($avh4$elm_color$Color$rgb, 0.756304, 0.231555, 0.509468),
			A3($avh4$elm_color$Color$rgb, 0.760264, 0.235976, 0.505794),
			A3($avh4$elm_color$Color$rgb, 0.764193, 0.240396, 0.502126),
			A3($avh4$elm_color$Color$rgb, 0.76809, 0.244817, 0.498465),
			A3($avh4$elm_color$Color$rgb, 0.771958, 0.249237, 0.494813),
			A3($avh4$elm_color$Color$rgb, 0.775796, 0.253658, 0.491171),
			A3($avh4$elm_color$Color$rgb, 0.779604, 0.258078, 0.487539),
			A3($avh4$elm_color$Color$rgb, 0.783383, 0.2625, 0.483918),
			A3($avh4$elm_color$Color$rgb, 0.787133, 0.266922, 0.480307),
			A3($avh4$elm_color$Color$rgb, 0.790855, 0.271345, 0.476706),
			A3($avh4$elm_color$Color$rgb, 0.794549, 0.27577, 0.473117),
			A3($avh4$elm_color$Color$rgb, 0.798216, 0.280197, 0.469538),
			A3($avh4$elm_color$Color$rgb, 0.801855, 0.284626, 0.465971),
			A3($avh4$elm_color$Color$rgb, 0.805467, 0.289057, 0.462415),
			A3($avh4$elm_color$Color$rgb, 0.809052, 0.293491, 0.45887),
			A3($avh4$elm_color$Color$rgb, 0.812612, 0.297928, 0.455338),
			A3($avh4$elm_color$Color$rgb, 0.816144, 0.302368, 0.451816),
			A3($avh4$elm_color$Color$rgb, 0.819651, 0.306812, 0.448306),
			A3($avh4$elm_color$Color$rgb, 0.823132, 0.311261, 0.444806),
			A3($avh4$elm_color$Color$rgb, 0.826588, 0.315714, 0.441316),
			A3($avh4$elm_color$Color$rgb, 0.830018, 0.320172, 0.437836),
			A3($avh4$elm_color$Color$rgb, 0.833422, 0.324635, 0.434366),
			A3($avh4$elm_color$Color$rgb, 0.836801, 0.329105, 0.430905),
			A3($avh4$elm_color$Color$rgb, 0.840155, 0.33358, 0.427455),
			A3($avh4$elm_color$Color$rgb, 0.843484, 0.338062, 0.424013),
			A3($avh4$elm_color$Color$rgb, 0.846788, 0.342551, 0.420579),
			A3($avh4$elm_color$Color$rgb, 0.850066, 0.347048, 0.417153),
			A3($avh4$elm_color$Color$rgb, 0.853319, 0.351553, 0.413734),
			A3($avh4$elm_color$Color$rgb, 0.856547, 0.356066, 0.410322),
			A3($avh4$elm_color$Color$rgb, 0.85975, 0.360588, 0.406917),
			A3($avh4$elm_color$Color$rgb, 0.862927, 0.365119, 0.403519),
			A3($avh4$elm_color$Color$rgb, 0.866078, 0.36966, 0.400126),
			A3($avh4$elm_color$Color$rgb, 0.869203, 0.374212, 0.396738),
			A3($avh4$elm_color$Color$rgb, 0.872303, 0.378774, 0.393355),
			A3($avh4$elm_color$Color$rgb, 0.875376, 0.383347, 0.389976),
			A3($avh4$elm_color$Color$rgb, 0.878423, 0.387932, 0.3866),
			A3($avh4$elm_color$Color$rgb, 0.881443, 0.392529, 0.383229),
			A3($avh4$elm_color$Color$rgb, 0.884436, 0.397139, 0.37986),
			A3($avh4$elm_color$Color$rgb, 0.887402, 0.401762, 0.376494),
			A3($avh4$elm_color$Color$rgb, 0.89034, 0.406398, 0.37313),
			A3($avh4$elm_color$Color$rgb, 0.89325, 0.411048, 0.369768),
			A3($avh4$elm_color$Color$rgb, 0.896131, 0.415712, 0.366407),
			A3($avh4$elm_color$Color$rgb, 0.898984, 0.420392, 0.363047),
			A3($avh4$elm_color$Color$rgb, 0.901807, 0.425087, 0.359688),
			A3($avh4$elm_color$Color$rgb, 0.904601, 0.429797, 0.356329),
			A3($avh4$elm_color$Color$rgb, 0.907365, 0.434524, 0.35297),
			A3($avh4$elm_color$Color$rgb, 0.910098, 0.439268, 0.34961),
			A3($avh4$elm_color$Color$rgb, 0.9128, 0.444029, 0.346251),
			A3($avh4$elm_color$Color$rgb, 0.915471, 0.448807, 0.34289),
			A3($avh4$elm_color$Color$rgb, 0.918109, 0.453603, 0.339529),
			A3($avh4$elm_color$Color$rgb, 0.920714, 0.458417, 0.336166),
			A3($avh4$elm_color$Color$rgb, 0.923287, 0.463251, 0.332801),
			A3($avh4$elm_color$Color$rgb, 0.925825, 0.468103, 0.329435),
			A3($avh4$elm_color$Color$rgb, 0.928329, 0.472975, 0.326067),
			A3($avh4$elm_color$Color$rgb, 0.930798, 0.477867, 0.322697),
			A3($avh4$elm_color$Color$rgb, 0.933232, 0.48278, 0.319325),
			A3($avh4$elm_color$Color$rgb, 0.93563, 0.487712, 0.315952),
			A3($avh4$elm_color$Color$rgb, 0.93799, 0.492667, 0.312575),
			A3($avh4$elm_color$Color$rgb, 0.940313, 0.497642, 0.309197),
			A3($avh4$elm_color$Color$rgb, 0.942598, 0.502639, 0.305816),
			A3($avh4$elm_color$Color$rgb, 0.944844, 0.507658, 0.302433),
			A3($avh4$elm_color$Color$rgb, 0.947051, 0.512699, 0.299049),
			A3($avh4$elm_color$Color$rgb, 0.949217, 0.517763, 0.295662),
			A3($avh4$elm_color$Color$rgb, 0.951344, 0.52285, 0.292275),
			A3($avh4$elm_color$Color$rgb, 0.953428, 0.52796, 0.288883),
			A3($avh4$elm_color$Color$rgb, 0.95547, 0.533093, 0.28549),
			A3($avh4$elm_color$Color$rgb, 0.957469, 0.53825, 0.282096),
			A3($avh4$elm_color$Color$rgb, 0.959424, 0.543431, 0.278701),
			A3($avh4$elm_color$Color$rgb, 0.961336, 0.548636, 0.275305),
			A3($avh4$elm_color$Color$rgb, 0.963203, 0.553865, 0.271909),
			A3($avh4$elm_color$Color$rgb, 0.965024, 0.559118, 0.268513),
			A3($avh4$elm_color$Color$rgb, 0.966798, 0.564396, 0.265118),
			A3($avh4$elm_color$Color$rgb, 0.968526, 0.5697, 0.261721),
			A3($avh4$elm_color$Color$rgb, 0.970205, 0.575028, 0.258325),
			A3($avh4$elm_color$Color$rgb, 0.971835, 0.580382, 0.254931),
			A3($avh4$elm_color$Color$rgb, 0.973416, 0.585761, 0.25154),
			A3($avh4$elm_color$Color$rgb, 0.974947, 0.591165, 0.248151),
			A3($avh4$elm_color$Color$rgb, 0.976428, 0.596595, 0.244767),
			A3($avh4$elm_color$Color$rgb, 0.977856, 0.602051, 0.241387),
			A3($avh4$elm_color$Color$rgb, 0.979233, 0.607532, 0.238013),
			A3($avh4$elm_color$Color$rgb, 0.980556, 0.613039, 0.234646),
			A3($avh4$elm_color$Color$rgb, 0.981826, 0.618572, 0.231287),
			A3($avh4$elm_color$Color$rgb, 0.983041, 0.624131, 0.227937),
			A3($avh4$elm_color$Color$rgb, 0.984199, 0.629718, 0.224595),
			A3($avh4$elm_color$Color$rgb, 0.985301, 0.63533, 0.221265),
			A3($avh4$elm_color$Color$rgb, 0.986345, 0.640969, 0.217948),
			A3($avh4$elm_color$Color$rgb, 0.987332, 0.646633, 0.214648),
			A3($avh4$elm_color$Color$rgb, 0.98826, 0.652325, 0.211364),
			A3($avh4$elm_color$Color$rgb, 0.989128, 0.658043, 0.2081),
			A3($avh4$elm_color$Color$rgb, 0.989935, 0.663787, 0.204859),
			A3($avh4$elm_color$Color$rgb, 0.990681, 0.669558, 0.201642),
			A3($avh4$elm_color$Color$rgb, 0.991365, 0.675355, 0.198453),
			A3($avh4$elm_color$Color$rgb, 0.991985, 0.681179, 0.195295),
			A3($avh4$elm_color$Color$rgb, 0.992541, 0.68703, 0.19217),
			A3($avh4$elm_color$Color$rgb, 0.993032, 0.692907, 0.189084),
			A3($avh4$elm_color$Color$rgb, 0.993456, 0.69881, 0.186041),
			A3($avh4$elm_color$Color$rgb, 0.993814, 0.704741, 0.183043),
			A3($avh4$elm_color$Color$rgb, 0.994103, 0.710698, 0.180097),
			A3($avh4$elm_color$Color$rgb, 0.994324, 0.716681, 0.177208),
			A3($avh4$elm_color$Color$rgb, 0.994474, 0.722691, 0.174381),
			A3($avh4$elm_color$Color$rgb, 0.994553, 0.728728, 0.171622),
			A3($avh4$elm_color$Color$rgb, 0.994561, 0.734791, 0.168938),
			A3($avh4$elm_color$Color$rgb, 0.994495, 0.74088, 0.166335),
			A3($avh4$elm_color$Color$rgb, 0.994355, 0.746995, 0.163821),
			A3($avh4$elm_color$Color$rgb, 0.994141, 0.753137, 0.161404),
			A3($avh4$elm_color$Color$rgb, 0.993851, 0.759304, 0.159092),
			A3($avh4$elm_color$Color$rgb, 0.993482, 0.765499, 0.156891),
			A3($avh4$elm_color$Color$rgb, 0.993033, 0.77172, 0.154808),
			A3($avh4$elm_color$Color$rgb, 0.992505, 0.777967, 0.152855),
			A3($avh4$elm_color$Color$rgb, 0.991897, 0.784239, 0.151042),
			A3($avh4$elm_color$Color$rgb, 0.991209, 0.790537, 0.149377),
			A3($avh4$elm_color$Color$rgb, 0.990439, 0.796859, 0.14787),
			A3($avh4$elm_color$Color$rgb, 0.989587, 0.803205, 0.146529),
			A3($avh4$elm_color$Color$rgb, 0.988648, 0.809579, 0.145357),
			A3($avh4$elm_color$Color$rgb, 0.987621, 0.815978, 0.144363),
			A3($avh4$elm_color$Color$rgb, 0.986509, 0.822401, 0.143557),
			A3($avh4$elm_color$Color$rgb, 0.985314, 0.828846, 0.142945),
			A3($avh4$elm_color$Color$rgb, 0.984031, 0.835315, 0.142528),
			A3($avh4$elm_color$Color$rgb, 0.982653, 0.841812, 0.142303),
			A3($avh4$elm_color$Color$rgb, 0.98119, 0.848329, 0.142279),
			A3($avh4$elm_color$Color$rgb, 0.979644, 0.854866, 0.142453),
			A3($avh4$elm_color$Color$rgb, 0.977995, 0.861432, 0.142808),
			A3($avh4$elm_color$Color$rgb, 0.976265, 0.868016, 0.143351),
			A3($avh4$elm_color$Color$rgb, 0.974443, 0.874622, 0.144061),
			A3($avh4$elm_color$Color$rgb, 0.97253, 0.88125, 0.144923),
			A3($avh4$elm_color$Color$rgb, 0.970533, 0.887896, 0.145919),
			A3($avh4$elm_color$Color$rgb, 0.968443, 0.894564, 0.147014),
			A3($avh4$elm_color$Color$rgb, 0.966271, 0.901249, 0.14818),
			A3($avh4$elm_color$Color$rgb, 0.964021, 0.90795, 0.14937),
			A3($avh4$elm_color$Color$rgb, 0.961681, 0.914672, 0.15052),
			A3($avh4$elm_color$Color$rgb, 0.959276, 0.921407, 0.151566),
			A3($avh4$elm_color$Color$rgb, 0.956808, 0.928152, 0.152409),
			A3($avh4$elm_color$Color$rgb, 0.954287, 0.934908, 0.152921),
			A3($avh4$elm_color$Color$rgb, 0.951726, 0.941671, 0.152925),
			A3($avh4$elm_color$Color$rgb, 0.949151, 0.948435, 0.152178),
			A3($avh4$elm_color$Color$rgb, 0.946602, 0.95519, 0.150328),
			A3($avh4$elm_color$Color$rgb, 0.944152, 0.961916, 0.146861),
			A3($avh4$elm_color$Color$rgb, 0.941896, 0.96859, 0.140956),
			A3($avh4$elm_color$Color$rgb, 0.940015, 0.975158, 0.131326)
		]));
var $newmana$chroma_elm$Chroma$Colors$Viridis$viridis = A2(
	$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
	A3($avh4$elm_color$Color$rgb, 0.267004, 0.004874, 0.329415),
	_List_fromArray(
		[
			A3($avh4$elm_color$Color$rgb, 0.26851, 0.009605, 0.335427),
			A3($avh4$elm_color$Color$rgb, 0.269944, 0.014625, 0.341379),
			A3($avh4$elm_color$Color$rgb, 0.271305, 0.019942, 0.347269),
			A3($avh4$elm_color$Color$rgb, 0.272594, 0.025563, 0.353093),
			A3($avh4$elm_color$Color$rgb, 0.273809, 0.031497, 0.358853),
			A3($avh4$elm_color$Color$rgb, 0.274952, 0.037752, 0.364543),
			A3($avh4$elm_color$Color$rgb, 0.276022, 0.044167, 0.370164),
			A3($avh4$elm_color$Color$rgb, 0.277018, 0.050344, 0.375715),
			A3($avh4$elm_color$Color$rgb, 0.277941, 0.056324, 0.381191),
			A3($avh4$elm_color$Color$rgb, 0.278791, 0.062145, 0.386592),
			A3($avh4$elm_color$Color$rgb, 0.279566, 0.067836, 0.391917),
			A3($avh4$elm_color$Color$rgb, 0.280267, 0.073417, 0.397163),
			A3($avh4$elm_color$Color$rgb, 0.280894, 0.078907, 0.402329),
			A3($avh4$elm_color$Color$rgb, 0.281446, 0.08432, 0.407414),
			A3($avh4$elm_color$Color$rgb, 0.281924, 0.089666, 0.412415),
			A3($avh4$elm_color$Color$rgb, 0.282327, 0.094955, 0.417331),
			A3($avh4$elm_color$Color$rgb, 0.282656, 0.100196, 0.42216),
			A3($avh4$elm_color$Color$rgb, 0.28291, 0.105393, 0.426902),
			A3($avh4$elm_color$Color$rgb, 0.283091, 0.110553, 0.431554),
			A3($avh4$elm_color$Color$rgb, 0.283197, 0.11568, 0.436115),
			A3($avh4$elm_color$Color$rgb, 0.283229, 0.120777, 0.440584),
			A3($avh4$elm_color$Color$rgb, 0.283187, 0.125848, 0.44496),
			A3($avh4$elm_color$Color$rgb, 0.283072, 0.130895, 0.449241),
			A3($avh4$elm_color$Color$rgb, 0.282884, 0.13592, 0.453427),
			A3($avh4$elm_color$Color$rgb, 0.282623, 0.140926, 0.457517),
			A3($avh4$elm_color$Color$rgb, 0.28229, 0.145912, 0.46151),
			A3($avh4$elm_color$Color$rgb, 0.281887, 0.150881, 0.465405),
			A3($avh4$elm_color$Color$rgb, 0.281412, 0.155834, 0.469201),
			A3($avh4$elm_color$Color$rgb, 0.280868, 0.160771, 0.472899),
			A3($avh4$elm_color$Color$rgb, 0.280255, 0.165693, 0.476498),
			A3($avh4$elm_color$Color$rgb, 0.279574, 0.170599, 0.479997),
			A3($avh4$elm_color$Color$rgb, 0.278826, 0.17549, 0.483397),
			A3($avh4$elm_color$Color$rgb, 0.278012, 0.180367, 0.486697),
			A3($avh4$elm_color$Color$rgb, 0.277134, 0.185228, 0.489898),
			A3($avh4$elm_color$Color$rgb, 0.276194, 0.190074, 0.493001),
			A3($avh4$elm_color$Color$rgb, 0.275191, 0.194905, 0.496005),
			A3($avh4$elm_color$Color$rgb, 0.274128, 0.199721, 0.498911),
			A3($avh4$elm_color$Color$rgb, 0.273006, 0.20452, 0.501721),
			A3($avh4$elm_color$Color$rgb, 0.271828, 0.209303, 0.504434),
			A3($avh4$elm_color$Color$rgb, 0.270595, 0.214069, 0.507052),
			A3($avh4$elm_color$Color$rgb, 0.269308, 0.218818, 0.509577),
			A3($avh4$elm_color$Color$rgb, 0.267968, 0.223549, 0.512008),
			A3($avh4$elm_color$Color$rgb, 0.26658, 0.228262, 0.514349),
			A3($avh4$elm_color$Color$rgb, 0.265145, 0.232956, 0.516599),
			A3($avh4$elm_color$Color$rgb, 0.263663, 0.237631, 0.518762),
			A3($avh4$elm_color$Color$rgb, 0.262138, 0.242286, 0.520837),
			A3($avh4$elm_color$Color$rgb, 0.260571, 0.246922, 0.522828),
			A3($avh4$elm_color$Color$rgb, 0.258965, 0.251537, 0.524736),
			A3($avh4$elm_color$Color$rgb, 0.257322, 0.25613, 0.526563),
			A3($avh4$elm_color$Color$rgb, 0.255645, 0.260703, 0.528312),
			A3($avh4$elm_color$Color$rgb, 0.253935, 0.265254, 0.529983),
			A3($avh4$elm_color$Color$rgb, 0.252194, 0.269783, 0.531579),
			A3($avh4$elm_color$Color$rgb, 0.250425, 0.27429, 0.533103),
			A3($avh4$elm_color$Color$rgb, 0.248629, 0.278775, 0.534556),
			A3($avh4$elm_color$Color$rgb, 0.246811, 0.283237, 0.535941),
			A3($avh4$elm_color$Color$rgb, 0.244972, 0.287675, 0.53726),
			A3($avh4$elm_color$Color$rgb, 0.243113, 0.292092, 0.538516),
			A3($avh4$elm_color$Color$rgb, 0.241237, 0.296485, 0.539709),
			A3($avh4$elm_color$Color$rgb, 0.239346, 0.300855, 0.540844),
			A3($avh4$elm_color$Color$rgb, 0.237441, 0.305202, 0.541921),
			A3($avh4$elm_color$Color$rgb, 0.235526, 0.309527, 0.542944),
			A3($avh4$elm_color$Color$rgb, 0.233603, 0.313828, 0.543914),
			A3($avh4$elm_color$Color$rgb, 0.231674, 0.318106, 0.544834),
			A3($avh4$elm_color$Color$rgb, 0.229739, 0.322361, 0.545706),
			A3($avh4$elm_color$Color$rgb, 0.227802, 0.326594, 0.546532),
			A3($avh4$elm_color$Color$rgb, 0.225863, 0.330805, 0.547314),
			A3($avh4$elm_color$Color$rgb, 0.223925, 0.334994, 0.548053),
			A3($avh4$elm_color$Color$rgb, 0.221989, 0.339161, 0.548752),
			A3($avh4$elm_color$Color$rgb, 0.220057, 0.343307, 0.549413),
			A3($avh4$elm_color$Color$rgb, 0.21813, 0.347432, 0.550038),
			A3($avh4$elm_color$Color$rgb, 0.21621, 0.351535, 0.550627),
			A3($avh4$elm_color$Color$rgb, 0.214298, 0.355619, 0.551184),
			A3($avh4$elm_color$Color$rgb, 0.212395, 0.359683, 0.55171),
			A3($avh4$elm_color$Color$rgb, 0.210503, 0.363727, 0.552206),
			A3($avh4$elm_color$Color$rgb, 0.208623, 0.367752, 0.552675),
			A3($avh4$elm_color$Color$rgb, 0.206756, 0.371758, 0.553117),
			A3($avh4$elm_color$Color$rgb, 0.204903, 0.375746, 0.553533),
			A3($avh4$elm_color$Color$rgb, 0.203063, 0.379716, 0.553925),
			A3($avh4$elm_color$Color$rgb, 0.201239, 0.38367, 0.554294),
			A3($avh4$elm_color$Color$rgb, 0.19943, 0.387607, 0.554642),
			A3($avh4$elm_color$Color$rgb, 0.197636, 0.391528, 0.554969),
			A3($avh4$elm_color$Color$rgb, 0.19586, 0.395433, 0.555276),
			A3($avh4$elm_color$Color$rgb, 0.1941, 0.399323, 0.555565),
			A3($avh4$elm_color$Color$rgb, 0.192357, 0.403199, 0.555836),
			A3($avh4$elm_color$Color$rgb, 0.190631, 0.407061, 0.556089),
			A3($avh4$elm_color$Color$rgb, 0.188923, 0.41091, 0.556326),
			A3($avh4$elm_color$Color$rgb, 0.187231, 0.414746, 0.556547),
			A3($avh4$elm_color$Color$rgb, 0.185556, 0.41857, 0.556753),
			A3($avh4$elm_color$Color$rgb, 0.183898, 0.422383, 0.556944),
			A3($avh4$elm_color$Color$rgb, 0.182256, 0.426184, 0.55712),
			A3($avh4$elm_color$Color$rgb, 0.180629, 0.429975, 0.557282),
			A3($avh4$elm_color$Color$rgb, 0.179019, 0.433756, 0.55743),
			A3($avh4$elm_color$Color$rgb, 0.177423, 0.437527, 0.557565),
			A3($avh4$elm_color$Color$rgb, 0.175841, 0.44129, 0.557685),
			A3($avh4$elm_color$Color$rgb, 0.174274, 0.445044, 0.557792),
			A3($avh4$elm_color$Color$rgb, 0.172719, 0.448791, 0.557885),
			A3($avh4$elm_color$Color$rgb, 0.171176, 0.45253, 0.557965),
			A3($avh4$elm_color$Color$rgb, 0.169646, 0.456262, 0.55803),
			A3($avh4$elm_color$Color$rgb, 0.168126, 0.459988, 0.558082),
			A3($avh4$elm_color$Color$rgb, 0.166617, 0.463708, 0.558119),
			A3($avh4$elm_color$Color$rgb, 0.165117, 0.467423, 0.558141),
			A3($avh4$elm_color$Color$rgb, 0.163625, 0.471133, 0.558148),
			A3($avh4$elm_color$Color$rgb, 0.162142, 0.474838, 0.55814),
			A3($avh4$elm_color$Color$rgb, 0.160665, 0.47854, 0.558115),
			A3($avh4$elm_color$Color$rgb, 0.159194, 0.482237, 0.558073),
			A3($avh4$elm_color$Color$rgb, 0.157729, 0.485932, 0.558013),
			A3($avh4$elm_color$Color$rgb, 0.15627, 0.489624, 0.557936),
			A3($avh4$elm_color$Color$rgb, 0.154815, 0.493313, 0.55784),
			A3($avh4$elm_color$Color$rgb, 0.153364, 0.497, 0.557724),
			A3($avh4$elm_color$Color$rgb, 0.151918, 0.500685, 0.557587),
			A3($avh4$elm_color$Color$rgb, 0.150476, 0.504369, 0.55743),
			A3($avh4$elm_color$Color$rgb, 0.149039, 0.508051, 0.55725),
			A3($avh4$elm_color$Color$rgb, 0.147607, 0.511733, 0.557049),
			A3($avh4$elm_color$Color$rgb, 0.14618, 0.515413, 0.556823),
			A3($avh4$elm_color$Color$rgb, 0.144759, 0.519093, 0.556572),
			A3($avh4$elm_color$Color$rgb, 0.143343, 0.522773, 0.556295),
			A3($avh4$elm_color$Color$rgb, 0.141935, 0.526453, 0.555991),
			A3($avh4$elm_color$Color$rgb, 0.140536, 0.530132, 0.555659),
			A3($avh4$elm_color$Color$rgb, 0.139147, 0.533812, 0.555298),
			A3($avh4$elm_color$Color$rgb, 0.13777, 0.537492, 0.554906),
			A3($avh4$elm_color$Color$rgb, 0.136408, 0.541173, 0.554483),
			A3($avh4$elm_color$Color$rgb, 0.135066, 0.544853, 0.554029),
			A3($avh4$elm_color$Color$rgb, 0.133743, 0.548535, 0.553541),
			A3($avh4$elm_color$Color$rgb, 0.132444, 0.552216, 0.553018),
			A3($avh4$elm_color$Color$rgb, 0.131172, 0.555899, 0.552459),
			A3($avh4$elm_color$Color$rgb, 0.129933, 0.559582, 0.551864),
			A3($avh4$elm_color$Color$rgb, 0.128729, 0.563265, 0.551229),
			A3($avh4$elm_color$Color$rgb, 0.127568, 0.566949, 0.550556),
			A3($avh4$elm_color$Color$rgb, 0.126453, 0.570633, 0.549841),
			A3($avh4$elm_color$Color$rgb, 0.125394, 0.574318, 0.549086),
			A3($avh4$elm_color$Color$rgb, 0.124395, 0.578002, 0.548287),
			A3($avh4$elm_color$Color$rgb, 0.123463, 0.581687, 0.547445),
			A3($avh4$elm_color$Color$rgb, 0.122606, 0.585371, 0.546557),
			A3($avh4$elm_color$Color$rgb, 0.121831, 0.589055, 0.545623),
			A3($avh4$elm_color$Color$rgb, 0.121148, 0.592739, 0.544641),
			A3($avh4$elm_color$Color$rgb, 0.120565, 0.596422, 0.543611),
			A3($avh4$elm_color$Color$rgb, 0.120092, 0.600104, 0.54253),
			A3($avh4$elm_color$Color$rgb, 0.119738, 0.603785, 0.5414),
			A3($avh4$elm_color$Color$rgb, 0.119512, 0.607464, 0.540218),
			A3($avh4$elm_color$Color$rgb, 0.119423, 0.611141, 0.538982),
			A3($avh4$elm_color$Color$rgb, 0.119483, 0.614817, 0.537692),
			A3($avh4$elm_color$Color$rgb, 0.119699, 0.61849, 0.536347),
			A3($avh4$elm_color$Color$rgb, 0.120081, 0.622161, 0.534946),
			A3($avh4$elm_color$Color$rgb, 0.120638, 0.625828, 0.533488),
			A3($avh4$elm_color$Color$rgb, 0.12138, 0.629492, 0.531973),
			A3($avh4$elm_color$Color$rgb, 0.122312, 0.633153, 0.530398),
			A3($avh4$elm_color$Color$rgb, 0.123444, 0.636809, 0.528763),
			A3($avh4$elm_color$Color$rgb, 0.12478, 0.640461, 0.527068),
			A3($avh4$elm_color$Color$rgb, 0.126326, 0.644107, 0.525311),
			A3($avh4$elm_color$Color$rgb, 0.128087, 0.647749, 0.523491),
			A3($avh4$elm_color$Color$rgb, 0.130067, 0.651384, 0.521608),
			A3($avh4$elm_color$Color$rgb, 0.132268, 0.655014, 0.519661),
			A3($avh4$elm_color$Color$rgb, 0.134692, 0.658636, 0.517649),
			A3($avh4$elm_color$Color$rgb, 0.137339, 0.662252, 0.515571),
			A3($avh4$elm_color$Color$rgb, 0.14021, 0.665859, 0.513427),
			A3($avh4$elm_color$Color$rgb, 0.143303, 0.669459, 0.511215),
			A3($avh4$elm_color$Color$rgb, 0.146616, 0.67305, 0.508936),
			A3($avh4$elm_color$Color$rgb, 0.150148, 0.676631, 0.506589),
			A3($avh4$elm_color$Color$rgb, 0.153894, 0.680203, 0.504172),
			A3($avh4$elm_color$Color$rgb, 0.157851, 0.683765, 0.501686),
			A3($avh4$elm_color$Color$rgb, 0.162016, 0.687316, 0.499129),
			A3($avh4$elm_color$Color$rgb, 0.166383, 0.690856, 0.496502),
			A3($avh4$elm_color$Color$rgb, 0.170948, 0.694384, 0.493803),
			A3($avh4$elm_color$Color$rgb, 0.175707, 0.6979, 0.491033),
			A3($avh4$elm_color$Color$rgb, 0.180653, 0.701402, 0.488189),
			A3($avh4$elm_color$Color$rgb, 0.185783, 0.704891, 0.485273),
			A3($avh4$elm_color$Color$rgb, 0.19109, 0.708366, 0.482284),
			A3($avh4$elm_color$Color$rgb, 0.196571, 0.711827, 0.479221),
			A3($avh4$elm_color$Color$rgb, 0.202219, 0.715272, 0.476084),
			A3($avh4$elm_color$Color$rgb, 0.20803, 0.718701, 0.472873),
			A3($avh4$elm_color$Color$rgb, 0.214, 0.722114, 0.469588),
			A3($avh4$elm_color$Color$rgb, 0.220124, 0.725509, 0.466226),
			A3($avh4$elm_color$Color$rgb, 0.226397, 0.728888, 0.462789),
			A3($avh4$elm_color$Color$rgb, 0.232815, 0.732247, 0.459277),
			A3($avh4$elm_color$Color$rgb, 0.239374, 0.735588, 0.455688),
			A3($avh4$elm_color$Color$rgb, 0.24607, 0.73891, 0.452024),
			A3($avh4$elm_color$Color$rgb, 0.252899, 0.742211, 0.448284),
			A3($avh4$elm_color$Color$rgb, 0.259857, 0.745492, 0.444467),
			A3($avh4$elm_color$Color$rgb, 0.266941, 0.748751, 0.440573),
			A3($avh4$elm_color$Color$rgb, 0.274149, 0.751988, 0.436601),
			A3($avh4$elm_color$Color$rgb, 0.281477, 0.755203, 0.432552),
			A3($avh4$elm_color$Color$rgb, 0.288921, 0.758394, 0.428426),
			A3($avh4$elm_color$Color$rgb, 0.296479, 0.761561, 0.424223),
			A3($avh4$elm_color$Color$rgb, 0.304148, 0.764704, 0.419943),
			A3($avh4$elm_color$Color$rgb, 0.311925, 0.767822, 0.415586),
			A3($avh4$elm_color$Color$rgb, 0.319809, 0.770914, 0.411152),
			A3($avh4$elm_color$Color$rgb, 0.327796, 0.77398, 0.40664),
			A3($avh4$elm_color$Color$rgb, 0.335885, 0.777018, 0.402049),
			A3($avh4$elm_color$Color$rgb, 0.344074, 0.780029, 0.397381),
			A3($avh4$elm_color$Color$rgb, 0.35236, 0.783011, 0.392636),
			A3($avh4$elm_color$Color$rgb, 0.360741, 0.785964, 0.387814),
			A3($avh4$elm_color$Color$rgb, 0.369214, 0.788888, 0.382914),
			A3($avh4$elm_color$Color$rgb, 0.377779, 0.791781, 0.377939),
			A3($avh4$elm_color$Color$rgb, 0.386433, 0.794644, 0.372886),
			A3($avh4$elm_color$Color$rgb, 0.395174, 0.797475, 0.367757),
			A3($avh4$elm_color$Color$rgb, 0.404001, 0.800275, 0.362552),
			A3($avh4$elm_color$Color$rgb, 0.412913, 0.803041, 0.357269),
			A3($avh4$elm_color$Color$rgb, 0.421908, 0.805774, 0.35191),
			A3($avh4$elm_color$Color$rgb, 0.430983, 0.808473, 0.346476),
			A3($avh4$elm_color$Color$rgb, 0.440137, 0.811138, 0.340967),
			A3($avh4$elm_color$Color$rgb, 0.449368, 0.813768, 0.335384),
			A3($avh4$elm_color$Color$rgb, 0.458674, 0.816363, 0.329727),
			A3($avh4$elm_color$Color$rgb, 0.468053, 0.818921, 0.323998),
			A3($avh4$elm_color$Color$rgb, 0.477504, 0.821444, 0.318195),
			A3($avh4$elm_color$Color$rgb, 0.487026, 0.823929, 0.312321),
			A3($avh4$elm_color$Color$rgb, 0.496615, 0.826376, 0.306377),
			A3($avh4$elm_color$Color$rgb, 0.506271, 0.828786, 0.300362),
			A3($avh4$elm_color$Color$rgb, 0.515992, 0.831158, 0.294279),
			A3($avh4$elm_color$Color$rgb, 0.525776, 0.833491, 0.288127),
			A3($avh4$elm_color$Color$rgb, 0.535621, 0.835785, 0.281908),
			A3($avh4$elm_color$Color$rgb, 0.545524, 0.838039, 0.275626),
			A3($avh4$elm_color$Color$rgb, 0.555484, 0.840254, 0.269281),
			A3($avh4$elm_color$Color$rgb, 0.565498, 0.84243, 0.262877),
			A3($avh4$elm_color$Color$rgb, 0.575563, 0.844566, 0.256415),
			A3($avh4$elm_color$Color$rgb, 0.585678, 0.846661, 0.249897),
			A3($avh4$elm_color$Color$rgb, 0.595839, 0.848717, 0.243329),
			A3($avh4$elm_color$Color$rgb, 0.606045, 0.850733, 0.236712),
			A3($avh4$elm_color$Color$rgb, 0.616293, 0.852709, 0.230052),
			A3($avh4$elm_color$Color$rgb, 0.626579, 0.854645, 0.223353),
			A3($avh4$elm_color$Color$rgb, 0.636902, 0.856542, 0.21662),
			A3($avh4$elm_color$Color$rgb, 0.647257, 0.8584, 0.209861),
			A3($avh4$elm_color$Color$rgb, 0.657642, 0.860219, 0.203082),
			A3($avh4$elm_color$Color$rgb, 0.668054, 0.861999, 0.196293),
			A3($avh4$elm_color$Color$rgb, 0.678489, 0.863742, 0.189503),
			A3($avh4$elm_color$Color$rgb, 0.688944, 0.865448, 0.182725),
			A3($avh4$elm_color$Color$rgb, 0.699415, 0.867117, 0.175971),
			A3($avh4$elm_color$Color$rgb, 0.709898, 0.868751, 0.169257),
			A3($avh4$elm_color$Color$rgb, 0.720391, 0.87035, 0.162603),
			A3($avh4$elm_color$Color$rgb, 0.730889, 0.871916, 0.156029),
			A3($avh4$elm_color$Color$rgb, 0.741388, 0.873449, 0.149561),
			A3($avh4$elm_color$Color$rgb, 0.751884, 0.874951, 0.143228),
			A3($avh4$elm_color$Color$rgb, 0.762373, 0.876424, 0.137064),
			A3($avh4$elm_color$Color$rgb, 0.772852, 0.877868, 0.131109),
			A3($avh4$elm_color$Color$rgb, 0.783315, 0.879285, 0.125405),
			A3($avh4$elm_color$Color$rgb, 0.79376, 0.880678, 0.120005),
			A3($avh4$elm_color$Color$rgb, 0.804182, 0.882046, 0.114965),
			A3($avh4$elm_color$Color$rgb, 0.814576, 0.883393, 0.110347),
			A3($avh4$elm_color$Color$rgb, 0.82494, 0.88472, 0.106217),
			A3($avh4$elm_color$Color$rgb, 0.83527, 0.886029, 0.102646),
			A3($avh4$elm_color$Color$rgb, 0.845561, 0.887322, 0.099702),
			A3($avh4$elm_color$Color$rgb, 0.85581, 0.888601, 0.097452),
			A3($avh4$elm_color$Color$rgb, 0.866013, 0.889868, 0.095953),
			A3($avh4$elm_color$Color$rgb, 0.876168, 0.891125, 0.09525),
			A3($avh4$elm_color$Color$rgb, 0.886271, 0.892374, 0.095374),
			A3($avh4$elm_color$Color$rgb, 0.89632, 0.893616, 0.096335),
			A3($avh4$elm_color$Color$rgb, 0.906311, 0.894855, 0.098125),
			A3($avh4$elm_color$Color$rgb, 0.916242, 0.896091, 0.100717),
			A3($avh4$elm_color$Color$rgb, 0.926106, 0.89733, 0.104071),
			A3($avh4$elm_color$Color$rgb, 0.935904, 0.89857, 0.108131),
			A3($avh4$elm_color$Color$rgb, 0.945636, 0.899815, 0.112838),
			A3($avh4$elm_color$Color$rgb, 0.9553, 0.901065, 0.118128),
			A3($avh4$elm_color$Color$rgb, 0.964894, 0.902323, 0.123941),
			A3($avh4$elm_color$Color$rgb, 0.974417, 0.90359, 0.130215),
			A3($avh4$elm_color$Color$rgb, 0.983868, 0.904867, 0.136897),
			A3($avh4$elm_color$Color$rgb, 0.993248, 0.906157, 0.143936)
		]));
var $author$project$TrixelEditor$ColorPalette$colors = function (palette) {
	switch (palette.$) {
		case 'Inferno':
			return $newmana$chroma_elm$Chroma$Colors$Inferno$inferno;
		case 'Magma':
			return $newmana$chroma_elm$Chroma$Colors$Magma$magma;
		case 'Parula':
			return $newmana$chroma_elm$Chroma$Colors$Parula$parula;
		case 'Plasma':
			return $newmana$chroma_elm$Chroma$Colors$Plasma$plasma;
		default:
			return $newmana$chroma_elm$Chroma$Colors$Viridis$viridis;
	}
};
var $mgold$elm_nonempty_list$List$Nonempty$indexedMap = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		var wrapped = F2(
			function (i, d) {
				return A2(f, i + 1, d);
			});
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			A2(f, 0, x),
			A2($elm$core$List$indexedMap, wrapped, xs));
	});
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $rtfeldman$elm_css$Css$valuesOrNone = function (list) {
	return $elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A3(
			$rtfeldman$elm_css$Css$String$mapJoin,
			function ($) {
				return $.value;
			},
			' ',
			list)
	};
};
var $rtfeldman$elm_css$Css$transforms = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('transform'),
	$rtfeldman$elm_css$Css$valuesOrNone);
var $rtfeldman$elm_css$Css$translate2 = F2(
	function (tx, ty) {
		return {
			transform: $rtfeldman$elm_css$Css$Structure$Compatible,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'translate',
				_List_fromArray(
					[tx.value, ty.value]))
		};
	});
var $author$project$TrixelEditor$Main$viewColorPalette = function (model) {
	var world = $author$project$Levels$current(model.pages);
	var m = 15;
	var gutter = 0;
	var boxSize = 18;
	var showColor = F2(
		function (i, color) {
			var translateY = ((i / m) | 0) * (boxSize + gutter);
			var translateX = A2($elm$core$Basics$modBy, m, i) * (boxSize + gutter);
			var border = _Utils_eq(model.selectedColorIndex, i) ? 3 : 0;
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$px(boxSize)),
								$rtfeldman$elm_css$Css$height(
								$rtfeldman$elm_css$Css$px(boxSize)),
								$rtfeldman$elm_css$Css$backgroundColor(
								$author$project$DesignSystem$Color$toCssColor(color)),
								$rtfeldman$elm_css$Css$transforms(
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Css$translate2,
										$rtfeldman$elm_css$Css$px(translateX),
										$rtfeldman$elm_css$Css$px(translateY))
									])),
								A3(
								$rtfeldman$elm_css$Css$border3,
								$rtfeldman$elm_css$Css$px(border),
								$rtfeldman$elm_css$Css$solid,
								A3($rtfeldman$elm_css$Css$rgb, 255, 255, 255))
							])),
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						$author$project$TrixelEditor$Main$SelectColor(i))
					]),
				_List_Nil);
		});
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$height(
						$rtfeldman$elm_css$Css$px(320))
					]))
			]),
		$mgold$elm_nonempty_list$List$Nonempty$toList(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$indexedMap,
				showColor,
				$author$project$TrixelEditor$ColorPalette$colors(world.palette))));
};
var $author$project$TrixelEditor$Main$viewColorSelection = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$padding(
						$rtfeldman$elm_css$Css$px(16)),
						A3(
						$rtfeldman$elm_css$Css$border3,
						$rtfeldman$elm_css$Css$px(0.5),
						$rtfeldman$elm_css$Css$solid,
						$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha200))
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$px(20))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Color Palette')
					])),
				$author$project$TrixelEditor$Main$selectColorPalette(model),
				A2($author$project$TrixelEditor$Main$makeButton, $author$project$TrixelEditor$Main$PressedButtonForSettingBackgroundColor, 'Set selected as background'),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						$elm$core$String$fromInt(model.selectedColorIndex))
					])),
				$author$project$TrixelEditor$Main$viewColorPalette(model)
			]));
};
var $author$project$TrixelEditor$Main$viewInstructions = A2(
	$rtfeldman$elm_css$Html$Styled$div,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$padding(
					$rtfeldman$elm_css$Css$px(16)),
					A3(
					$rtfeldman$elm_css$Css$border3,
					$rtfeldman$elm_css$Css$px(0.5),
					$rtfeldman$elm_css$Css$solid,
					$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha200))
				]))
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(20))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Instructions')
				])),
			A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('- Press mouse to add trixel')
				])),
			A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('- Hold shift and press mouse to remove trixel')
				])),
			A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('- Panning: SCROLL or SPACE + DRAG')
				])),
			A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('- Zooming: CTRL + SCROLL')
				]))
		]));
var $author$project$TrixelEditor$Main$editorContent = F2(
	function (computer, model) {
		return model.editorIsOn ? A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$fixed),
							$rtfeldman$elm_css$Css$top($rtfeldman$elm_css$Css$zero),
							$rtfeldman$elm_css$Css$right($rtfeldman$elm_css$Css$zero),
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$px(300)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px(computer.screen.height - 80)),
							$rtfeldman$elm_css$Css$backgroundColor(
							A4($rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.2)),
							A3(
							$rtfeldman$elm_css$Css$border3,
							$rtfeldman$elm_css$Css$px(0.5),
							$rtfeldman$elm_css$Css$solid,
							A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.2)),
							$rtfeldman$elm_css$Css$overflowY($rtfeldman$elm_css$Css$scroll),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(12)),
							$rtfeldman$elm_css$Css$color(
							A4($rtfeldman$elm_css$Css$rgba, 255, 255, 255, 0.6))
						]))
				]),
			_List_fromArray(
				[
					$author$project$TrixelEditor$Main$viewInstructions,
					$author$project$TrixelEditor$Main$viewColorSelection(model),
					$author$project$TrixelEditor$Main$pageSelection(model)
				])) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
	});
var $author$project$TrixelEditor$Main$PressedEditorOnOffButton = {$: 'PressedEditorOnOffButton'};
var $author$project$DesignSystem$Color$whiteAlpha600 = A4($avh4$elm_color$Color$rgba, 0.98, 0.96, 0.9, 0.48);
var $author$project$TrixelEditor$Main$editorToggleButton = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$fixed),
						$rtfeldman$elm_css$Css$top($rtfeldman$elm_css$Css$zero),
						$rtfeldman$elm_css$Css$right($rtfeldman$elm_css$Css$zero)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$px(40)),
								$rtfeldman$elm_css$Css$padding(
								$rtfeldman$elm_css$Css$px(8)),
								$rtfeldman$elm_css$Css$color(
								$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha200)),
								$rtfeldman$elm_css$Css$hover(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$color(
										$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$white))
									])),
								$rtfeldman$elm_css$Css$active(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$color(
										$author$project$DesignSystem$Color$toCssColor($author$project$DesignSystem$Color$whiteAlpha600))
									]))
							])),
						$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$TrixelEditor$Main$PressedEditorOnOffButton)
					]),
				_List_fromArray(
					[
						model.editorIsOn ? $author$project$Icons$icons.cross : $author$project$Icons$icons.pen
					]))
			]));
};
var $author$project$TrixelEditor$Main$NoOp = {$: 'NoOp'};
var $author$project$TrixelEditor$Main$stopPropagationOfInputs = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'mousedown',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2($author$project$TrixelEditor$Main$NoOp, true))),
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'pointerdown',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2($author$project$TrixelEditor$Main$NoOp, true))),
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'wheel',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2($author$project$TrixelEditor$Main$NoOp, true))),
		A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'keydown',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2($author$project$TrixelEditor$Main$NoOp, true)))
	]);
var $author$project$TrixelEditor$Main$viewEditor = F2(
	function (computer, model) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			$author$project$TrixelEditor$Main$stopPropagationOfInputs,
			_List_fromArray(
				[
					A2($author$project$TrixelEditor$Main$editorContent, computer, model),
					$author$project$TrixelEditor$Main$editorToggleButton(model)
				]));
	});
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $mgold$elm_nonempty_list$List$Nonempty$length = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return $elm$core$List$length(xs) + 1;
};
var $mgold$elm_nonempty_list$List$Nonempty$get = F2(
	function (i, ne) {
		var x = ne.a;
		var xs = ne.b;
		var j = A2(
			$elm$core$Basics$modBy,
			$mgold$elm_nonempty_list$List$Nonempty$length(ne),
			i);
		var find = F2(
			function (k, ys) {
				find:
				while (true) {
					if (!ys.b) {
						return x;
					} else {
						var z = ys.a;
						var zs = ys.b;
						if (!k) {
							return z;
						} else {
							var $temp$k = k - 1,
								$temp$ys = zs;
							k = $temp$k;
							ys = $temp$ys;
							continue find;
						}
					}
				}
			});
		return (!j) ? x : A2(find, j - 1, xs);
	});
var $author$project$TrixelEditor$ColorPalette$get = F2(
	function (i, palette) {
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$get,
			i,
			$author$project$TrixelEditor$ColorPalette$colors(palette));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Constant = function (a) {
	return {$: 'Constant', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$LambertianMaterial = F3(
	function (a, b, c) {
		return {$: 'LambertianMaterial', a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$UseMeshUvs = {$: 'UseMeshUvs'};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$VerticalNormal = {$: 'VerticalNormal'};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$LinearRgb = function (a) {
	return {$: 'LinearRgb', a: a};
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma = function (u) {
	return A3(
		$elm$core$Basics$clamp,
		0,
		1,
		(u <= 0.04045) ? (u / 12.92) : A2($elm$core$Basics$pow, (u + 0.055) / 1.055, 2.4));
};
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb = function (color) {
	var _v0 = $avh4$elm_color$Color$toRgba(color);
	var red = _v0.red;
	var green = _v0.green;
	var blue = _v0.blue;
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$LinearRgb(
		A3(
			$elm_explorations$linear_algebra$Math$Vector3$vec3,
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(red),
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(green),
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$inverseGamma(blue)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Material$matte = function (materialColor) {
	return A3(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$LambertianMaterial,
		$ianmackenzie$elm_3d_scene$Scene3d$Types$UseMeshUvs,
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Constant(
			$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$colorToLinearRgb(materialColor)),
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Constant($ianmackenzie$elm_3d_scene$Scene3d$Types$VerticalNormal));
};
var $ianmackenzie$elm_geometry$Vector3d$meters = F3(
	function (x, y, z) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Vector3d(
			{x: x, y: y, z: z});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity = function (a) {
	return {$: 'Entity', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed = F2(
	function (a, b) {
		return {$: 'Transformed', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose = F2(
	function (t1, t2) {
		return {
			isRightHanded: _Utils_eq(t1.isRightHanded, t2.isRightHanded),
			ix: ((t1.ix * t2.ix) + (t1.iy * t2.jx)) + (t1.iz * t2.kx),
			iy: ((t1.ix * t2.iy) + (t1.iy * t2.jy)) + (t1.iz * t2.ky),
			iz: ((t1.ix * t2.iz) + (t1.iy * t2.jz)) + (t1.iz * t2.kz),
			jx: ((t1.jx * t2.ix) + (t1.jy * t2.jx)) + (t1.jz * t2.kx),
			jy: ((t1.jx * t2.iy) + (t1.jy * t2.jy)) + (t1.jz * t2.ky),
			jz: ((t1.jx * t2.iz) + (t1.jy * t2.jz)) + (t1.jz * t2.kz),
			kx: ((t1.kx * t2.ix) + (t1.ky * t2.jx)) + (t1.kz * t2.kx),
			ky: ((t1.kx * t2.iy) + (t1.ky * t2.jy)) + (t1.kz * t2.ky),
			kz: ((t1.kx * t2.iz) + (t1.ky * t2.jz)) + (t1.kz * t2.kz),
			px: t2.px + ((((t1.px * t2.ix) + (t1.py * t2.jx)) + (t1.pz * t2.kx)) * t2.scale),
			py: t2.py + ((((t1.px * t2.iy) + (t1.py * t2.jy)) + (t1.pz * t2.ky)) * t2.scale),
			pz: t2.pz + ((((t1.px * t2.iz) + (t1.py * t2.jz)) + (t1.pz * t2.kz)) * t2.scale),
			scale: t1.scale * t2.scale
		};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode = {$: 'EmptyNode'};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty = $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity($ianmackenzie$elm_3d_scene$Scene3d$Types$EmptyNode);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy = F2(
	function (transformation, _v0) {
		var node = _v0.a;
		switch (node.$) {
			case 'EmptyNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
			case 'Transformed':
				var existingTransformation = node.a;
				var underlyingNode = node.b;
				var compositeTransformation = A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose, existingTransformation, transformation);
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, compositeTransformation, underlyingNode));
			case 'MeshNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
			case 'PointNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
			case 'ShadowNode':
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
			default:
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
					A2($ianmackenzie$elm_3d_scene$Scene3d$Types$Transformed, transformation, node));
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$unwrap = function (_v0) {
	var givenComponents = _v0.a;
	return givenComponents;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$translateBy = function (displacement) {
	var v = $ianmackenzie$elm_geometry$Vector3d$unwrap(displacement);
	return {isRightHanded: true, ix: 1, iy: 0, iz: 0, jx: 0, jy: 1, jz: 0, kx: 0, ky: 0, kz: 1, px: v.x, py: v.y, pz: v.z, scale: 1};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy = F2(
	function (displacement, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$translateBy(displacement),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$translateBy = F2(
	function (displacement, entity) {
		return A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$translateBy, displacement, entity);
	});
var $author$project$SceneWebGL$move = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	var z = _v0.c;
	return $ianmackenzie$elm_3d_scene$Scene3d$translateBy(
		A3($ianmackenzie$elm_geometry$Vector3d$meters, x, y, z));
};
var $author$project$SceneWebGL$moveX = function (x) {
	return $author$project$SceneWebGL$move(
		_Utils_Tuple3(x, 0, 0));
};
var $author$project$SceneWebGL$moveY = function (y) {
	return $author$project$SceneWebGL$move(
		_Utils_Tuple3(0, y, 0));
};
var $ianmackenzie$elm_geometry$Direction3d$unwrap = function (_v0) {
	var coordinates = _v0.a;
	return coordinates;
};
var $ianmackenzie$elm_geometry$Point3d$unwrap = function (_v0) {
	var pointCoordinates = _v0.a;
	return pointCoordinates;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$rotateAround = F2(
	function (axis, _v0) {
		var angle = _v0.a;
		var p0 = $ianmackenzie$elm_geometry$Point3d$unwrap(
			$ianmackenzie$elm_geometry$Axis3d$originPoint(axis));
		var halfAngle = 0.5 * angle;
		var qw = $elm$core$Basics$cos(halfAngle);
		var sinHalfAngle = $elm$core$Basics$sin(halfAngle);
		var a = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Axis3d$direction(axis));
		var qx = a.x * sinHalfAngle;
		var wx = qw * qx;
		var xx = qx * qx;
		var qy = a.y * sinHalfAngle;
		var wy = qw * qy;
		var xy = qx * qy;
		var yy = qy * qy;
		var a22 = 1 - (2 * (xx + yy));
		var qz = a.z * sinHalfAngle;
		var wz = qw * qz;
		var a01 = 2 * (xy - wz);
		var a10 = 2 * (xy + wz);
		var xz = qx * qz;
		var a02 = 2 * (xz + wy);
		var a20 = 2 * (xz - wy);
		var yz = qy * qz;
		var a12 = 2 * (yz - wx);
		var a21 = 2 * (yz + wx);
		var zz = qz * qz;
		var a00 = 1 - (2 * (yy + zz));
		var a11 = 1 - (2 * (xx + zz));
		return {isRightHanded: true, ix: a00, iy: a10, iz: a20, jx: a01, jy: a11, jz: a21, kx: a02, ky: a12, kz: a22, px: ((p0.x - (a00 * p0.x)) - (a01 * p0.y)) - (a02 * p0.z), py: ((p0.y - (a10 * p0.x)) - (a11 * p0.y)) - (a12 * p0.z), pz: ((p0.z - (a20 * p0.x)) - (a21 * p0.y)) - (a22 * p0.z), scale: 1};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$rotateAround = F3(
	function (axis, angle, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$rotateAround, axis, angle),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$rotateAround = F3(
	function (axis, angle, entity) {
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$rotateAround, axis, angle, entity);
	});
var $ianmackenzie$elm_geometry$Axis3d$z = A2($ianmackenzie$elm_geometry$Axis3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$z);
var $author$project$SceneWebGL$rotateZ = F2(
	function (angle, shape) {
		return A3(
			$ianmackenzie$elm_3d_scene$Scene3d$rotateAround,
			$ianmackenzie$elm_geometry$Axis3d$z,
			$ianmackenzie$elm_units$Angle$radians(angle),
			shape);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$scaleAbout = F2(
	function (point, k) {
		var p = $ianmackenzie$elm_geometry$Point3d$unwrap(point);
		var oneMinusK = 1 - k;
		return {isRightHanded: k >= 0, ix: 1, iy: 0, iz: 0, jx: 0, jy: 1, jz: 0, kx: 0, ky: 0, kz: 1, px: oneMinusK * p.x, py: oneMinusK * p.y, pz: oneMinusK * p.z, scale: k};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$scaleAbout = F3(
	function (centerPoint, scale, givenDrawable) {
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$Entity$transformBy,
			A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$scaleAbout, centerPoint, scale),
			givenDrawable);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$scaleAbout = F3(
	function (centerPoint, scale, entity) {
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$scaleAbout, centerPoint, scale, entity);
	});
var $author$project$SceneWebGL$scale = $ianmackenzie$elm_3d_scene$Scene3d$scaleAbout($ianmackenzie$elm_geometry$Point3d$origin);
var $author$project$SceneWebGL$scaleAround = F2(
	function (_v0, factor) {
		var x = _v0.x;
		var y = _v0.y;
		var z = _v0.z;
		return A2(
			$elm$core$Basics$composeR,
			$author$project$SceneWebGL$move(
				_Utils_Tuple3(-x, -y, -z)),
			A2(
				$elm$core$Basics$composeR,
				$author$project$SceneWebGL$scale(factor),
				$author$project$SceneWebGL$move(
					_Utils_Tuple3(x, y, z))));
	});
var $author$project$TrixelEditor$TrixelGrid$CoordinateTransformations$toCanvasCoordinates = function (_v0) {
	var u = _v0.u;
	var v = _v0.v;
	return {
		x: ($elm$core$Basics$sqrt(3) / 2) * u,
		y: ((1 / 2) * u) + v
	};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Group = function (a) {
	return {$: 'Group', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$collectNodes = F2(
	function (drawables, accumulated) {
		collectNodes:
		while (true) {
			if (!drawables.b) {
				return accumulated;
			} else {
				var node = drawables.a.a;
				var rest = drawables.b;
				var $temp$drawables = rest,
					$temp$accumulated = A2($elm$core$List$cons, node, accumulated);
				drawables = $temp$drawables;
				accumulated = $temp$accumulated;
				continue collectNodes;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$group = function (drawables) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$Group(
			A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$collectNodes, drawables, _List_Nil)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces = {$: 'KeepBackFaces'};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode = F2(
	function (a, b) {
		return {$: 'MeshNode', a: a, b: b};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d = function (a) {
	return {$: 'BoundingBox3d', a: a};
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema = function (given) {
	var _v0 = given.maxZ;
	var z2 = _v0.a;
	var _v1 = given.minZ;
	var z1 = _v1.a;
	var _v2 = given.maxY;
	var y2 = _v2.a;
	var _v3 = given.minY;
	var y1 = _v3.a;
	var _v4 = given.maxX;
	var x2 = _v4.a;
	var _v5 = given.minX;
	var x1 = _v5.a;
	return $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(
		{
			maxX: A2($elm$core$Basics$max, x1, x2),
			maxY: A2($elm$core$Basics$max, y1, y2),
			maxZ: A2($elm$core$Basics$max, z1, z2),
			minX: A2($elm$core$Basics$min, x1, x2),
			minY: A2($elm$core$Basics$min, y1, y2),
			minZ: A2($elm$core$Basics$min, z1, z2)
		});
};
var $ianmackenzie$elm_units$Quantity$max = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(
			A2($elm$core$Basics$max, x, y));
	});
var $ianmackenzie$elm_units$Quantity$min = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(
			A2($elm$core$Basics$min, x, y));
	});
var $ianmackenzie$elm_geometry$Triangle3d$vertices = function (_v0) {
	var triangleVertices = _v0.a;
	return triangleVertices;
};
var $ianmackenzie$elm_geometry$Triangle3d$boundingBox = function (triangle) {
	var _v0 = $ianmackenzie$elm_geometry$Triangle3d$vertices(triangle);
	var p1 = _v0.a;
	var p2 = _v0.b;
	var p3 = _v0.c;
	var x1 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p1);
	var y1 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p1);
	var z1 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p1);
	var x2 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p2);
	var y2 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p2);
	var z2 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p2);
	var x3 = $ianmackenzie$elm_geometry$Point3d$xCoordinate(p3);
	var y3 = $ianmackenzie$elm_geometry$Point3d$yCoordinate(p3);
	var z3 = $ianmackenzie$elm_geometry$Point3d$zCoordinate(p3);
	return $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema(
		{
			maxX: A2(
				$ianmackenzie$elm_units$Quantity$max,
				x1,
				A2($ianmackenzie$elm_units$Quantity$max, x2, x3)),
			maxY: A2(
				$ianmackenzie$elm_units$Quantity$max,
				y1,
				A2($ianmackenzie$elm_units$Quantity$max, y2, y3)),
			maxZ: A2(
				$ianmackenzie$elm_units$Quantity$max,
				z1,
				A2($ianmackenzie$elm_units$Quantity$max, z2, z3)),
			minX: A2(
				$ianmackenzie$elm_units$Quantity$min,
				x1,
				A2($ianmackenzie$elm_units$Quantity$min, x2, x3)),
			minY: A2(
				$ianmackenzie$elm_units$Quantity$min,
				y1,
				A2($ianmackenzie$elm_units$Quantity$min, y2, y3)),
			minZ: A2(
				$ianmackenzie$elm_units$Quantity$min,
				z1,
				A2($ianmackenzie$elm_units$Quantity$min, z2, z3))
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantFragment = {
	src: '\n        precision lowp float;\n        \n        uniform lowp vec3 constantColor;\n        \n        void main () {\n            gl_FragColor = vec4(constantColor, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {constantColor: 'constantColor'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveFragment = {
	src: '\n        precision mediump float;\n        \n        uniform mediump vec3 emissiveColor;\n        uniform highp mat4 sceneProperties;\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main () {\n            gl_FragColor = toSrgb(emissiveColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {emissiveColor: 'emissiveColor', sceneProperties: 'sceneProperties'}
};
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 'Alpha':
				return A2(_WebGL_enableAlpha, ctx, option);
			case 'Depth':
				return A2(_WebGL_enableDepth, ctx, option);
			case 'Stencil':
				return A2(_WebGL_enableStencil, ctx, option);
			case 'Antialias':
				return A2(_WebGL_enableAntialias, ctx, option);
			case 'ClearColor':
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 'Blend':
				return A2(_WebGL_enableBlend, cache, setting);
			case 'DepthTest':
				return A2(_WebGL_enableDepthTest, cache, setting);
			case 'StencilTest':
				return A2(_WebGL_enableStencilTest, cache, setting);
			case 'Scissor':
				return A2(_WebGL_enableScissor, cache, setting);
			case 'ColorMask':
				return A2(_WebGL_enableColorMask, cache, setting);
			case 'CullFace':
				return A2(_WebGL_enableCullFace, cache, setting);
			case 'PolygonOffset':
				return A2(_WebGL_enablePolygonOffset, cache, setting);
			case 'SampleCoverage':
				return A2(_WebGL_enableSampleCoverage, cache, setting);
			default:
				return _WebGL_enableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $ianmackenzie$elm_units$Luminance$inNits = function (_v0) {
	var numNits = _v0.a;
	return numNits;
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform lowp vec3 materialColor;\n        uniform highp mat4 viewMatrix;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 lambertianLight(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                vec3 upDirection = xyz_type.xyz;\n                vec3 aboveLuminance = rgb_parameter.rgb;\n                vec3 belowLuminance = rgb_parameter.a * aboveLuminance;\n                vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, upDirection, surfaceNormal);\n                return luminance * materialColor;\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(\n                xyz_type,\n                rgb_parameter,\n                surfacePosition,\n                directionToLight,\n                normalIlluminance\n            );\n        \n            float dotNL = positiveDotProduct(directionToLight, surfaceNormal);\n            return (normalIlluminance * dotNL) * (materialColor / kPi);\n        }\n        \n        vec3 lambertianLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 materialColor,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            vec3 litColor1 = enabledLights[0] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights12[0], lights12[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights12[2], lights12[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights34[0], lights34[1]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? lambertianLight(surfacePosition, surfaceNormal, materialColor, lights34[2], lights34[3]) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights56[0], lights56[1]);\n            vec3 litColor6 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights56[2], lights56[3]);\n            vec3 litColor7 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights78[0], lights78[1]);\n            vec3 litColor8 = lambertianLight(surfacePosition, surfaceNormal, materialColor, lights78[2], lights78[3]);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal) * getNormalSign();\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = lambertianLighting(\n                interpolatedPosition,\n                normalDirection,\n                materialColor,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(linearColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {enabledLights: 'enabledLights', lights12: 'lights12', lights34: 'lights34', lights56: 'lights56', lights78: 'lights78', materialColor: 'materialColor', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $elm_explorations$webgl$WebGL$Settings$FaceMode = function (a) {
	return {$: 'FaceMode', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$back = $elm_explorations$webgl$WebGL$Settings$FaceMode(1029);
var $elm_explorations$webgl$WebGL$Internal$CullFace = function (a) {
	return {$: 'CullFace', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$cullFace = function (_v0) {
	var faceMode = _v0.a;
	return $elm_explorations$webgl$WebGL$Internal$CullFace(faceMode);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$back);
var $elm_explorations$webgl$WebGL$Settings$front = $elm_explorations$webgl$WebGL$Settings$FaceMode(1028);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$front);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings = F3(
	function (isRightHanded, backFaceSetting, settings) {
		if (backFaceSetting.$ === 'CullBackFaces') {
			return isRightHanded ? A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullBackFaceSetting, settings) : A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$cullFrontFaceSetting, settings);
		} else {
			return settings;
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalFragment = {
	src: '\n        precision highp float;\n        \n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 lights12;\n        uniform highp mat4 lights34;\n        uniform highp mat4 lights56;\n        uniform highp mat4 lights78;\n        uniform lowp vec4 enabledLights;\n        uniform lowp vec3 baseColor;\n        uniform lowp float roughness;\n        uniform lowp float metallic;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        const lowp float kPerspectiveProjection = 0.0;\n        const lowp float kOrthographicProjection = 1.0;\n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        const highp float kPi = 3.14159265359;\n        const mediump float kMediumpFloatMax = 65504.0;\n        const lowp float kDisabledLight = 0.0;\n        const lowp float kSoftLighting = 3.0;\n        \n        float getNormalSign() {\n            return 2.0 * float(gl_FrontFacing) - 1.0;\n        }\n        \n        vec3 getDirectionToCamera(vec3 surfacePosition, mat4 sceneProperties) {\n            float projectionType = sceneProperties[1].w;\n            if (projectionType == kPerspectiveProjection) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                return normalize(cameraPoint - surfacePosition);\n            } else if (projectionType == kOrthographicProjection) {\n                return sceneProperties[1].xyz;\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        void getDirectionToLightAndNormalIlluminance(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            out vec3 directionToLight,\n            out vec3 normalIlluminance\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_parameter.rgb;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - surfacePosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_parameter.rgb / (4.0 * kPi * distance * distance);\n            }\n        }\n        \n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n        \n        // Adapted from https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/normaldistributionfunction(speculard)\n        float specularD(float alpha, float dotNH, vec3 normalDirection, vec3 halfDirection) {\n            vec3 crossNH = cross(normalDirection, halfDirection);\n            float a = dotNH * alpha;\n            float k = alpha / (dot(crossNH, crossNH) + a * a);\n            float d = k * k * (1.0 / kPi);\n            return min(d, kMediumpFloatMax);\n        }\n        \n        float safeQuotient(float numerator, float denominator) {\n            if (denominator == 0.0) {\n                return 0.0;\n            } else {\n                return numerator / denominator;\n            }\n        }\n        \n        float g1(float dotNV, float alphaSquared) {\n            return safeQuotient(2.0 * dotNV, dotNV + sqrt(alphaSquared + (1.0 - alphaSquared) * dotNV * dotNV));\n        }\n        \n        float specularG(float dotNL, float dotNV, float alphaSquared) {\n            return g1(dotNV, alphaSquared) * g1(dotNL, alphaSquared);\n        }\n        \n        vec3 fresnelColor(vec3 specularBaseColor, float dotVH) {\n            vec3 one = vec3(1.0, 1.0, 1.0);\n            float scale = exp2((-5.55473 * dotVH - 6.98316) * dotVH);\n            return specularBaseColor + (one - specularBaseColor) * scale;\n        }\n        \n        vec3 brdf(vec3 normalDirection, vec3 directionToCamera, vec3 directionToLight, float alpha, float dotNV, float dotNL, vec3 specularBaseColor, vec3 normalIlluminance) {\n            vec3 halfDirection = normalize(directionToCamera + directionToLight);\n            float dotVH = positiveDotProduct(directionToCamera, halfDirection);\n            float dotNH = positiveDotProduct(normalDirection, halfDirection);\n            float dotNHSquared = dotNH * dotNH;\n        \n            float d = specularD(alpha, dotNH, normalDirection, halfDirection);\n            float g = specularG(dotNL, dotNV, alpha * alpha);\n            vec3 f = fresnelColor(specularBaseColor, dotVH);\n            return safeQuotient(d * g, 4.0 * dotNL * dotNV) * f;\n        }\n        \n        vec3 sampleFacetNormal(vec3 vH, vec3 vT1, vec3 vT2, float s, float alpha) {\n            float t2 = (1.0 - s);\n            vec3 vNh = t2 * vT2 + sqrt(max(0.0, 1.0 - t2 * t2)) * vH;\n            return normalize(vec3(alpha * vNh.x, alpha * vNh.y, max(0.0, vNh.z)));\n        }\n        \n        vec3 softLightingLuminance(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localLightDirection\n        ) {\n            float sinElevation = dot(localLightDirection, localUpDirection);\n            float t = (sinElevation + 1.0) / 2.0;\n            return aboveLuminance * t + belowLuminance * (1.0 - t);\n        }\n        \n        vec3 softLightingSpecularSample(\n            vec3 aboveLuminance,\n            vec3 belowLuminance,\n            vec3 localUpDirection,\n            vec3 localViewDirection,\n            vec3 localLightDirection,\n            vec3 localHalfDirection,\n            float alphaSquared,\n            vec3 specularBaseColor\n        ) {\n            vec3 luminance = softLightingLuminance(aboveLuminance, belowLuminance, localUpDirection, localLightDirection);\n            float dotVH = positiveDotProduct(localViewDirection, localHalfDirection);\n            float dotNL = localLightDirection.z;\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n        }\n        \n        vec3 softLighting(\n            vec3 normalDirection,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            vec3 directionToCamera,\n            vec3 viewY,\n            vec4 xyz_type,\n            vec4 rgb_parameter\n        ) {\n            float alphaSquared = alpha * alpha;\n            vec3 upDirection = xyz_type.xyz;\n            vec3 luminanceAbove = rgb_parameter.rgb;\n            vec3 luminanceBelow = rgb_parameter.a * luminanceAbove;\n            vec3 crossProduct = cross(normalDirection, directionToCamera);\n            float crossMagnitude = length(crossProduct);\n            vec3 xDirection = vec3(0.0, 0.0, 0.0);\n            vec3 yDirection = vec3(0.0, 0.0, 0.0);\n            if (crossMagnitude > 1.0e-6) {\n                yDirection = (1.0 / crossMagnitude) * crossProduct;\n                xDirection = cross(yDirection, normalDirection);\n            } else {\n                vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n                xDirection = normalize(cross(viewY, normalDirection));\n                yDirection = cross(normalDirection, xDirection);\n            }\n            float localViewX = dot(directionToCamera, xDirection);\n            float localViewZ = dot(directionToCamera, normalDirection);\n            vec3 localViewDirection = vec3(localViewX, 0, localViewZ);\n            float localUpX = dot(upDirection, xDirection);\n            float localUpY = dot(upDirection, yDirection);\n            float localUpZ = dot(upDirection, normalDirection);\n            vec3 localUpDirection = vec3(localUpX, localUpY, localUpZ);\n        \n            vec3 vH = normalize(vec3(alpha * localViewX, 0.0, localViewZ));\n            vec3 vT1 = vec3(0.0, 1.0, 0.0);\n            vec3 vT2 = cross(vH, vT1);\n            float s = 0.5 * (1.0 + vH.z);\n            \n            vec3 localHalfDirection = sampleFacetNormal(vH, vT1, vT2, s, alpha);\n            vec3 localLightDirection = vec3(0.0, 0.0, 0.0);\n            \n            localLightDirection = -reflect(localViewDirection, localHalfDirection);\n            vec3 specular = softLightingSpecularSample(luminanceAbove, luminanceBelow, localUpDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n            \n            localLightDirection = vec3(0.000000, 0.000000, 1.000000);\n            vec3 diffuse = softLightingLuminance(luminanceAbove, luminanceBelow, localUpDirection, localLightDirection) * localLightDirection.z;\n            \n            return specular + diffuse * diffuseBaseColor;\n        }\n        \n        vec3 physicalLight(\n            vec4 xyz_type,\n            vec4 rgb_parameter,\n            vec3 surfacePosition,\n            vec3 normalDirection,\n            vec3 directionToCamera,\n            vec3 viewY,\n            float dotNV,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha\n        ) {\n            float lightType = xyz_type.w;\n            if (lightType == kDisabledLight) {\n                return vec3(0.0, 0.0, 0.0);\n            } else if (lightType == kSoftLighting) {\n                return softLighting(normalDirection, diffuseBaseColor, specularBaseColor, alpha, directionToCamera, viewY, xyz_type, rgb_parameter);\n            }\n        \n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(xyz_type, rgb_parameter, surfacePosition, directionToLight, normalIlluminance);\n        \n            float dotNL = positiveDotProduct(normalDirection, directionToLight);\n            vec3 specularColor = brdf(normalDirection, directionToCamera, directionToLight, alpha, dotNV, dotNL, specularBaseColor, normalIlluminance);\n            return (normalIlluminance * dotNL) * ((diffuseBaseColor / kPi) + specularColor);\n        }\n        \n        vec3 physicalLighting(\n            vec3 surfacePosition,\n            vec3 surfaceNormal,\n            vec3 baseColor,\n            vec3 directionToCamera,\n            mat4 viewMatrix,\n            float roughness,\n            float metallic,\n            mat4 lights12,\n            mat4 lights34,\n            mat4 lights56,\n            mat4 lights78,\n            vec4 enabledLights\n        ) {\n            float dotNV = positiveDotProduct(surfaceNormal, directionToCamera);\n            float alpha = roughness * roughness;\n            float nonmetallic = 1.0 - metallic;\n            vec3 diffuseBaseColor = nonmetallic * 0.96 * baseColor;\n            vec3 specularBaseColor = nonmetallic * 0.04 * vec3(1.0, 1.0, 1.0) + metallic * baseColor;\n            vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n        \n            vec3 litColor1 = enabledLights[0] == 1.0 ? physicalLight(lights12[0], lights12[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor2 = enabledLights[1] == 1.0 ? physicalLight(lights12[2], lights12[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor3 = enabledLights[2] == 1.0 ? physicalLight(lights34[0], lights34[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor4 = enabledLights[3] == 1.0 ? physicalLight(lights34[2], lights34[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha) : vec3(0.0, 0.0, 0.0);\n            vec3 litColor5 = physicalLight(lights56[0], lights56[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor6 = physicalLight(lights56[2], lights56[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor7 = physicalLight(lights78[0], lights78[1], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            vec3 litColor8 = physicalLight(lights78[2], lights78[3], surfacePosition, surfaceNormal, directionToCamera, viewY, dotNV, diffuseBaseColor, specularBaseColor, alpha);\n            return litColor1 + litColor2 + litColor3 + litColor4 + litColor5 + litColor6 + litColor7 + litColor8;\n        }\n        \n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n        \n        vec3 gammaCorrectedColor(vec3 color) {\n            float red = gammaCorrect(color.r);\n            float green = gammaCorrect(color.g);\n            float blue = gammaCorrect(color.b);\n            return vec3(red, green, blue);\n        }\n        \n        vec3 reinhardLuminanceToneMap(vec3 color) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scale = 1.0 / (1.0 + luminance);\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 reinhardPerChannelToneMap(vec3 color) {\n            return gammaCorrectedColor(color / (color + 1.0));\n        }\n        \n        float extendedReinhardToneMap(float x, float xMax) {\n            return x * (1.0 + (x / (xMax * xMax))) / (1.0 + x);\n        }\n        \n        vec3 extendedReinhardLuminanceToneMap(vec3 color, float overexposureLimit) {\n            float luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;\n            float scaledLuminance = extendedReinhardToneMap(luminance, overexposureLimit);\n            float scale = scaledLuminance / luminance;\n            return gammaCorrectedColor(color * scale);\n        }\n        \n        vec3 extendedReinhardPerChannelToneMap(vec3 color, float overexposureLimit) {\n            float red = extendedReinhardToneMap(color.r, overexposureLimit);\n            float green = extendedReinhardToneMap(color.g, overexposureLimit);\n            float blue = extendedReinhardToneMap(color.b, overexposureLimit);\n            return gammaCorrectedColor(vec3(red, green, blue));\n        }\n        \n        vec3 hableFilmicHelper(vec3 color) {\n            float a = 0.15;\n            float b = 0.5;\n            float c = 0.1;\n            float d = 0.2;\n            float e = 0.02;\n            float f = 0.3;\n            return (color * (a * color + c * b) + d * e) / (color * (a * color + b) + d * f) - e / f;\n        }\n        \n        vec3 hableFilmicToneMap(vec3 color) {\n            float exposureBias = 2.0;\n            vec3 unscaled = hableFilmicHelper(exposureBias * color);\n            vec3 scale = 1.0 / hableFilmicHelper(vec3(11.2));\n            return gammaCorrectedColor(scale * unscaled);\n        }\n        \n        vec3 toneMap(vec3 color, float toneMapType, float toneMapParam) {\n            if (toneMapType == 0.0) {\n                return gammaCorrectedColor(color);\n            } else if (toneMapType == 1.0) {\n                return reinhardLuminanceToneMap(color);\n            } else if (toneMapType == 2.0) {\n                return reinhardPerChannelToneMap(color);\n            } else if (toneMapType == 3.0) {\n                return extendedReinhardLuminanceToneMap(color, toneMapParam);\n            } else if (toneMapType == 4.0) {\n                return extendedReinhardPerChannelToneMap(color, toneMapParam);\n            } else if (toneMapType == 5.0) {\n                return hableFilmicToneMap(color);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 toSrgb(vec3 linearColor, mat4 sceneProperties) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float unitR = linearColor.r / referenceWhite.r;\n            float unitG = linearColor.g / referenceWhite.g;\n            float unitB = linearColor.b / referenceWhite.b;\n            float toneMapType = sceneProperties[3][2];\n            float toneMapParam = sceneProperties[3][3];\n            vec3 toneMapped = toneMap(vec3(unitR, unitG, unitB), toneMapType, toneMapParam);\n            return vec4(toneMapped, 1.0);\n        }\n        \n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal) * getNormalSign();\n            vec3 directionToCamera = getDirectionToCamera(interpolatedPosition, sceneProperties);\n        \n            vec3 linearColor = physicalLighting(\n                interpolatedPosition,\n                normalDirection,\n                baseColor,\n                directionToCamera,\n                viewMatrix,\n                roughness,\n                metallic,\n                lights12,\n                lights34,\n                lights56,\n                lights78,\n                enabledLights\n            );\n        \n            gl_FragColor = toSrgb(linearColor, sceneProperties);\n        }\n    ',
	attributes: {},
	uniforms: {baseColor: 'baseColor', enabledLights: 'enabledLights', lights12: 'lights12', lights34: 'lights34', lights56: 'lights56', lights78: 'lights78', metallic: 'metallic', roughness: 'roughness', sceneProperties: 'sceneProperties', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainTriangleVertex = {
	src: '\n        precision highp float;\n        \n        attribute lowp float triangleVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 triangleVertexPositions;\n        \n        void getTriangleVertex(int triangleVertexIndex, mat4 triangleVertexPositions, out vec3 position, out vec3 normal) {\n            vec3 p1 = triangleVertexPositions[0].xyz;\n            vec3 p2 = triangleVertexPositions[1].xyz;\n            vec3 p3 = triangleVertexPositions[2].xyz;\n            normal = normalize(cross(p2 - p1, p3 - p2));\n            float t1 = float(triangleVertexIndex == 0);\n            float t2 = float(triangleVertexIndex == 1);\n            float t3 = float(triangleVertexIndex == 2);\n            position = t1 * p1 + t2 * p2 + t3 * p3;\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        void main() {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            getTriangleVertex(int(triangleVertex), triangleVertexPositions, position, normal);\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n        }\n    ',
	attributes: {triangleVertex: 'triangleVertex'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', triangleVertexPositions: 'triangleVertexPositions', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantLambertianMaterial = function (a) {
	return {$: 'ConstantLambertianMaterial', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial = F2(
	function (a, b) {
		return {$: 'TexturedLambertianMaterial', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple = F2(
	function (fallbackData, channel) {
		if (channel.$ === 'Constant') {
			var _v1 = channel.a;
			return _Utils_Tuple2(fallbackData, 0.0);
		} else {
			var data = channel.a.data;
			return _Utils_Tuple2(data, 1.0);
		}
	});
var $elm_explorations$linear_algebra$Math$Vector3$getX = _MJS_v3getX;
var $elm_explorations$linear_algebra$Math$Vector3$getY = _MJS_v3getY;
var $elm_explorations$linear_algebra$Math$Vector3$getZ = _MJS_v3getZ;
var $elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledVec3 = function (vector) {
	return A4(
		$elm_explorations$linear_algebra$Math$Vector4$vec4,
		$elm_explorations$linear_algebra$Math$Vector3$getX(vector),
		$elm_explorations$linear_algebra$Math$Vector3$getY(vector),
		$elm_explorations$linear_algebra$Math$Vector3$getZ(vector),
		1);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4 = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0, 0, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple = F2(
	function (fallbackData, texture) {
		if (texture.$ === 'Constant') {
			var baseColor = texture.a.a;
			return _Utils_Tuple2(
				fallbackData,
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledVec3(baseColor));
		} else {
			var data = texture.a.data;
			return _Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$resolveLambertian = F2(
	function (materialColorTexture, normalMapTexture) {
		var _v0 = _Utils_Tuple2(materialColorTexture, normalMapTexture);
		if (_v0.a.$ === 'Constant') {
			if (_v0.b.$ === 'Constant') {
				var materialColor = _v0.a.a;
				var _v1 = _v0.b.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantLambertianMaterial(materialColor);
			} else {
				var data = _v0.b.a.data;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, materialColorTexture),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
			}
		} else {
			var data = _v0.a.a.data;
			return A2(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedLambertianMaterial,
				_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantPbrMaterial = F3(
	function (a, b, c) {
		return {$: 'ConstantPbrMaterial', a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial = F4(
	function (a, b, c, d) {
		return {$: 'TexturedPbrMaterial', a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$Tuple4 = F4(
	function (a, b, c, d) {
		return {$: 'Tuple4', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat = function (value) {
	return A2($elm_explorations$linear_algebra$Math$Vector2$vec2, value, 1);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2 = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0);
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple = F2(
	function (fallbackData, texture) {
		if (texture.$ === 'Constant') {
			var value = texture.a;
			return _Utils_Tuple2(
				fallbackData,
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$enabledFloat(value));
		} else {
			var data = texture.a.data;
			return _Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$resolvePbr = F4(
	function (baseColorTexture, roughnessTexture, metallicTexture, normalMapTexture) {
		var _v0 = A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$Tuple4, baseColorTexture, roughnessTexture, metallicTexture, normalMapTexture);
		if (_v0.a.$ === 'Constant') {
			if (_v0.b.$ === 'Constant') {
				if (_v0.c.$ === 'Constant') {
					if (_v0.d.$ === 'Constant') {
						var baseColor = _v0.a.a;
						var roughness = _v0.b.a;
						var metallic = _v0.c.a;
						var _v1 = _v0.d.a;
						return A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$ConstantPbrMaterial, baseColor, roughness, metallic);
					} else {
						var data = _v0.d.a.data;
						return A4(
							$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, baseColorTexture),
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
							A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
							_Utils_Tuple2(data, 1.0));
					}
				} else {
					var data = _v0.c.a.data;
					return A4(
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, baseColorTexture),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
						_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2),
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
				}
			} else {
				var data = _v0.b.a.data;
				return A4(
					$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$vec3Tuple, data, baseColorTexture),
					_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec2),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
					A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
			}
		} else {
			var data = _v0.a.a.data;
			return A4(
				$ianmackenzie$elm_3d_scene$Scene3d$Entity$TexturedPbrMaterial,
				_Utils_Tuple2(data, $ianmackenzie$elm_3d_scene$Scene3d$Entity$zeroVec4),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, roughnessTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$floatTuple, data, metallicTexture),
				A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$normalMapTuple, data, normalMapTexture));
		}
	});
var $elm_explorations$linear_algebra$Math$Vector3$scale = _MJS_v3scale;
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$smoothTriangleVertex = {
	src: '\n        precision highp float;\n        \n        attribute lowp float triangleVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 triangleVertexPositions;\n        \n        varying highp vec3 interpolatedPosition;\n        varying highp vec3 interpolatedNormal;\n        \n        void getTriangleVertex(int triangleVertexIndex, mat4 triangleVertexPositions, out vec3 position, out vec3 normal) {\n            vec3 p1 = triangleVertexPositions[0].xyz;\n            vec3 p2 = triangleVertexPositions[1].xyz;\n            vec3 p3 = triangleVertexPositions[2].xyz;\n            normal = normalize(cross(p2 - p1, p3 - p2));\n            float t1 = float(triangleVertexIndex == 0);\n            float t2 = float(triangleVertexIndex == 1);\n            float t3 = float(triangleVertexIndex == 2);\n            position = t1 * p1 + t2 * p2 + t3 * p3;\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        void main() {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            getTriangleVertex(int(triangleVertex), triangleVertexPositions, position, normal);\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            gl_Position = projectionMatrix * (viewMatrix * worldPosition);\n            interpolatedPosition = worldPosition.xyz;\n            interpolatedNormal = getWorldNormal(normal, modelScale, modelMatrix);\n        }\n    ',
	attributes: {triangleVertex: 'triangleVertex'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', triangleVertexPositions: 'triangleVertexPositions', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_geometry$BoundingBox3d$centerPoint = function (boundingBox) {
	var _v0 = boundingBox;
	var b = _v0.a;
	var x1 = b.minX;
	var x2 = b.maxX;
	var y1 = b.minY;
	var y2 = b.maxY;
	var z1 = b.minZ;
	var z2 = b.maxZ;
	return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
		{x: x1 + (0.5 * (x2 - x1)), y: y1 + (0.5 * (y2 - y1)), z: z1 + (0.5 * (z2 - z1))});
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxX = function (_v0) {
	var boundingBox = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(boundingBox.maxX);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxY = function (_v0) {
	var boundingBox = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(boundingBox.maxY);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$maxZ = function (_v0) {
	var boundingBox = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(boundingBox.maxZ);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minX = function (_v0) {
	var boundingBox = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(boundingBox.minX);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minY = function (_v0) {
	var boundingBox = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(boundingBox.minY);
};
var $ianmackenzie$elm_geometry$BoundingBox3d$minZ = function (_v0) {
	var boundingBox = _v0.a;
	return $ianmackenzie$elm_units$Quantity$Quantity(boundingBox.minZ);
};
var $ianmackenzie$elm_units$Quantity$minus = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(x - y);
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$dimensions = function (boundingBox) {
	return _Utils_Tuple3(
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minX(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxX(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minY(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxY(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox3d$minZ(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox3d$maxZ(boundingBox)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds = function (boundingBox) {
	var _v0 = $ianmackenzie$elm_geometry$BoundingBox3d$dimensions(boundingBox);
	var xDimension = _v0.a.a;
	var yDimension = _v0.b.a;
	var zDimension = _v0.c.a;
	return {
		centerPoint: $ianmackenzie$elm_geometry$Point3d$unwrap(
			$ianmackenzie$elm_geometry$BoundingBox3d$centerPoint(boundingBox)),
		halfX: xDimension / 2,
		halfY: yDimension / 2,
		halfZ: zDimension / 2
	};
};
var $elm_explorations$linear_algebra$Math$Matrix4$fromRecord = _MJS_m4x4fromRecord;
var $ianmackenzie$elm_geometry$Point3d$toMeters = function (_v0) {
	var pointCoordinates = _v0.a;
	return pointCoordinates;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertexPositions = function (givenTriangle) {
	var _v0 = $ianmackenzie$elm_geometry$Triangle3d$vertices(givenTriangle);
	var firstPoint = _v0.a;
	var secondPoint = _v0.b;
	var thirdPoint = _v0.c;
	var p1 = $ianmackenzie$elm_geometry$Point3d$toMeters(firstPoint);
	var p2 = $ianmackenzie$elm_geometry$Point3d$toMeters(secondPoint);
	var p3 = $ianmackenzie$elm_geometry$Point3d$toMeters(thirdPoint);
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{m11: p1.x, m12: p2.x, m13: p3.x, m14: 0, m21: p1.y, m22: p2.y, m23: p3.y, m24: 0, m31: p1.z, m32: p2.z, m33: p3.z, m34: 0, m41: 0, m42: 0, m43: 0, m44: 0});
};
var $elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 'Mesh3', a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangles = $elm_explorations$webgl$WebGL$Mesh3(
	{elemSize: 3, indexSize: 0, mode: 4});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertices = $elm_explorations$webgl$WebGL$triangles(
	_List_fromArray(
		[
			_Utils_Tuple3(
			{triangleVertex: 0},
			{triangleVertex: 1},
			{triangleVertex: 2})
		]));
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleMesh = F2(
	function (givenMaterial, givenTriangle) {
		var boundingBox = $ianmackenzie$elm_geometry$Triangle3d$boundingBox(givenTriangle);
		var bounds = $ianmackenzie$elm_3d_scene$Scene3d$Entity$toBounds(boundingBox);
		switch (givenMaterial.$) {
			case 'UnlitMaterial':
				if (givenMaterial.b.$ === 'Constant') {
					var color = givenMaterial.b.a;
					return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
						A2(
							$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainTriangleVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$constantFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertices,
										{
											constantColor: color,
											modelMatrix: modelMatrix,
											modelScale: modelScale,
											projectionMatrix: projectionMatrix,
											sceneProperties: sceneProperties,
											triangleVertexPositions: $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertexPositions(givenTriangle),
											viewMatrix: viewMatrix
										});
								})));
				} else {
					var _v1 = givenMaterial.a;
					var data = givenMaterial.b.a.data;
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
			case 'EmissiveMaterial':
				if (givenMaterial.b.$ === 'Constant') {
					var emissiveColor = givenMaterial.b.a.a;
					var backlight = givenMaterial.c;
					return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
						A2(
							$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, lights, settings) {
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$plainTriangleVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$emissiveFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertices,
										{
											emissiveColor: A2(
												$elm_explorations$linear_algebra$Math$Vector3$scale,
												$ianmackenzie$elm_units$Luminance$inNits(backlight),
												emissiveColor),
											modelMatrix: modelMatrix,
											modelScale: modelScale,
											projectionMatrix: projectionMatrix,
											sceneProperties: sceneProperties,
											triangleVertexPositions: $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertexPositions(givenTriangle),
											viewMatrix: viewMatrix
										});
								})));
				} else {
					var _v2 = givenMaterial.a;
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
			case 'LambertianMaterial':
				var _v3 = givenMaterial.a;
				var materialColorTexture = givenMaterial.b;
				var normalMapTexture = givenMaterial.c;
				var _v4 = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolveLambertian, materialColorTexture, normalMapTexture);
				if (_v4.$ === 'ConstantLambertianMaterial') {
					var materialColor = _v4.a.a;
					return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
						A2(
							$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v5, settings) {
									var lights = _v5.a;
									var enabledLights = _v5.b;
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$smoothTriangleVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$lambertianFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertices,
										{
											enabledLights: enabledLights,
											lights12: lights.lights12,
											lights34: lights.lights34,
											lights56: lights.lights56,
											lights78: lights.lights78,
											materialColor: materialColor,
											modelMatrix: modelMatrix,
											modelScale: modelScale,
											projectionMatrix: projectionMatrix,
											sceneProperties: sceneProperties,
											triangleVertexPositions: $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertexPositions(givenTriangle),
											viewMatrix: viewMatrix
										});
								})));
				} else {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
			default:
				var _v6 = givenMaterial.a;
				var baseColorTexture = givenMaterial.b;
				var roughnessTexture = givenMaterial.c;
				var metallicTexture = givenMaterial.d;
				var normalMapTexture = givenMaterial.e;
				var _v7 = A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$resolvePbr, baseColorTexture, roughnessTexture, metallicTexture, normalMapTexture);
				if (_v7.$ === 'ConstantPbrMaterial') {
					var baseColor = _v7.a.a;
					var roughness = _v7.b;
					var metallic = _v7.c;
					return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
						A2(
							$ianmackenzie$elm_3d_scene$Scene3d$Types$MeshNode,
							bounds,
							F8(
								function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, _v8, settings) {
									var lights = _v8.a;
									var enabledLights = _v8.b;
									return A5(
										$elm_explorations$webgl$WebGL$entityWith,
										A3($ianmackenzie$elm_3d_scene$Scene3d$Entity$meshSettings, isRightHanded, $ianmackenzie$elm_3d_scene$Scene3d$Types$KeepBackFaces, settings),
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$smoothTriangleVertex,
										$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$physicalFragment,
										$ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertices,
										{
											baseColor: baseColor,
											enabledLights: enabledLights,
											lights12: lights.lights12,
											lights34: lights.lights34,
											lights56: lights.lights56,
											lights78: lights.lights78,
											metallic: metallic,
											modelMatrix: modelMatrix,
											modelScale: modelScale,
											projectionMatrix: projectionMatrix,
											roughness: roughness,
											sceneProperties: sceneProperties,
											triangleVertexPositions: $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertexPositions(givenTriangle),
											viewMatrix: viewMatrix
										});
								})));
				} else {
					return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
				}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode = function (a) {
	return {$: 'ShadowNode', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment = {
	src: '\n        precision lowp float;\n        \n        void main () {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Test = function (a) {
	return {$: 'Test', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$always = $elm_explorations$webgl$WebGL$Settings$StencilTest$Test(519);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation = function (a) {
	return {$: 'Operation', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7683);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$increment = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7682);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$keep = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7680);
var $elm_explorations$webgl$WebGL$Internal$StencilTest = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {$: 'StencilTest', a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j, k: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate = F3(
	function (_v0, options1, options2) {
		var ref = _v0.ref;
		var mask = _v0.mask;
		var writeMask = _v0.writeMask;
		var expandTest = F2(
			function (_v2, fn) {
				var expandedTest = _v2.a;
				return fn(expandedTest);
			});
		var expandOp = F2(
			function (_v1, fn) {
				var op = _v1.a;
				return fn(op);
			});
		var expand = function (options) {
			return A2(
				$elm$core$Basics$composeR,
				expandTest(options.test),
				A2(
					$elm$core$Basics$composeR,
					expandOp(options.fail),
					A2(
						$elm$core$Basics$composeR,
						expandOp(options.zfail),
						expandOp(options.zpass))));
		};
		return A2(
			expand,
			options2,
			A2(
				expand,
				options1,
				A3($elm_explorations$webgl$WebGL$Internal$StencilTest, ref, mask, writeMask)));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$leftHandedStencilTest = A3(
	$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
	{mask: 0, ref: 0, writeMask: 15},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$increment});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$rightHandedStencilTest = A3(
	$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
	{mask: 0, ref: 0, writeMask: 15},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$increment},
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$decrement});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings = F2(
	function (isRightHanded, settings) {
		return isRightHanded ? A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$rightHandedStencilTest, settings) : A2($elm$core$List$cons, $ianmackenzie$elm_3d_scene$Scene3d$Entity$leftHandedStencilTest, settings);
	});
var $elm_explorations$webgl$WebGL$MeshIndexed3 = F3(
	function (a, b, c) {
		return {$: 'MeshIndexed3', a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$indexedTriangles = $elm_explorations$webgl$WebGL$MeshIndexed3(
	{elemSize: 1, indexSize: 3, mode: 4});
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleShadowMesh = function () {
	var triangleShadowVertices = _List_fromArray(
		[
			{
			triangleShadowVertex: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 1)
		},
			{
			triangleShadowVertex: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 1)
		},
			{
			triangleShadowVertex: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 2, 1)
		},
			{
			triangleShadowVertex: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, -1)
		},
			{
			triangleShadowVertex: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, -1)
		},
			{
			triangleShadowVertex: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 2, -1)
		}
		]);
	var triangleShadowFaces = _List_fromArray(
		[
			_Utils_Tuple3(0, 1, 2),
			_Utils_Tuple3(3, 5, 4),
			_Utils_Tuple3(3, 4, 1),
			_Utils_Tuple3(3, 1, 0),
			_Utils_Tuple3(4, 5, 2),
			_Utils_Tuple3(4, 2, 1),
			_Utils_Tuple3(5, 3, 0),
			_Utils_Tuple3(5, 0, 2)
		]);
	return A2($elm_explorations$webgl$WebGL$indexedTriangles, triangleShadowVertices, triangleShadowFaces);
}();
var $ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$triangleShadowVertex = {
	src: '\n        precision highp float;\n        \n        attribute highp vec2 triangleShadowVertex;\n        \n        uniform highp vec4 modelScale;\n        uniform highp mat4 modelMatrix;\n        uniform highp mat4 viewMatrix;\n        uniform highp mat4 projectionMatrix;\n        uniform highp mat4 sceneProperties;\n        uniform highp mat4 shadowLight;\n        uniform highp mat4 triangleVertexPositions;\n        \n        const lowp float kDirectionalLight = 1.0;\n        const lowp float kPointLight = 2.0;\n        \n        void getTriangleVertex(int triangleVertexIndex, mat4 triangleVertexPositions, out vec3 position, out vec3 normal) {\n            vec3 p1 = triangleVertexPositions[0].xyz;\n            vec3 p2 = triangleVertexPositions[1].xyz;\n            vec3 p3 = triangleVertexPositions[2].xyz;\n            normal = normalize(cross(p2 - p1, p3 - p2));\n            float t1 = float(triangleVertexIndex == 0);\n            float t2 = float(triangleVertexIndex == 1);\n            float t3 = float(triangleVertexIndex == 2);\n            position = t1 * p1 + t2 * p2 + t3 * p3;\n        }\n        \n        vec4 getWorldPosition(vec3 modelPosition, vec4 modelScale, mat4 modelMatrix) {\n            vec4 scaledPosition = vec4(modelScale.xyz * modelPosition, 1.0);\n            return modelMatrix * scaledPosition;\n        }\n        \n        vec3 safeNormalize(vec3 vector) {\n            if (vector == vec3(0.0, 0.0, 0.0)) {\n                return vector;\n            } else {\n                return normalize(vector);\n            }\n        }\n        \n        vec3 getWorldNormal(vec3 modelNormal, vec4 modelScale, mat4 modelMatrix) {\n            vec3 normalScale = vec3(modelScale.w / modelScale.x, modelScale.w / modelScale.y, modelScale.w / modelScale.z);\n            return (modelMatrix * vec4(safeNormalize(normalScale * modelNormal), 0.0)).xyz;\n        }\n        \n        vec3 getDirectionToLight(vec3 surfacePosition, vec4 xyz_type, vec4 rgb_parameter) {\n            float lightType = xyz_type.w;\n            if (lightType == kDirectionalLight) {\n                return xyz_type.xyz;\n            } else if (lightType == kPointLight) {\n                vec3 lightPosition = xyz_type.xyz;\n                return normalize(lightPosition - surfacePosition);\n            } else {\n                return vec3(0.0, 0.0, 0.0);\n            }\n        }\n        \n        vec4 shadowVertexPosition(vec3 position, vec3 normal, mat4 shadowLight, vec4 modelScale, mat4 modelMatrix, mat4 viewMatrix, mat4 projectionMatrix, mat4 sceneProperties) {\n            vec4 worldPosition = getWorldPosition(position, modelScale, modelMatrix);\n            vec3 worldNormal = getWorldNormal(normal, vec4(modelScale.xyz, 1.0), modelMatrix);\n            vec4 xyz_type = shadowLight[0];\n            vec4 rgb_parameter = shadowLight[1];\n            vec3 directionToLight = getDirectionToLight(worldPosition.xyz, xyz_type, rgb_parameter);\n            vec3 offset = vec3(0.0, 0.0, 0.0);\n            float sceneDiameter = sceneProperties[3][1];\n            if (dot(directionToLight, worldNormal) <= 0.0) {\n                offset = -sceneDiameter * directionToLight;\n            } else {\n                offset = -0.001 * sceneDiameter * directionToLight;\n            }\n            vec4 offsetPosition = worldPosition + vec4(offset, 0.0);\n            return projectionMatrix * (viewMatrix * offsetPosition);\n        }\n        \n        void main () {\n            vec3 position = vec3(0.0, 0.0, 0.0);\n            vec3 normal = vec3(0.0, 0.0, 0.0);\n            getTriangleVertex(int(triangleShadowVertex.x), triangleVertexPositions, position, normal);\n            normal *= triangleShadowVertex.y;\n            gl_Position = shadowVertexPosition(\n                position,\n                normal,\n                shadowLight,\n                modelScale,\n                modelMatrix,\n                viewMatrix,\n                projectionMatrix,\n                sceneProperties\n            );\n        }\n    ',
	attributes: {triangleShadowVertex: 'triangleShadowVertex'},
	uniforms: {modelMatrix: 'modelMatrix', modelScale: 'modelScale', projectionMatrix: 'projectionMatrix', sceneProperties: 'sceneProperties', shadowLight: 'shadowLight', triangleVertexPositions: 'triangleVertexPositions', viewMatrix: 'viewMatrix'}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleShadow = function (givenTriangle) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Entity(
		$ianmackenzie$elm_3d_scene$Scene3d$Types$ShadowNode(
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, projectionMatrix, shadowLight, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$shadowSettings, isRightHanded, settings),
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$triangleShadowVertex,
						$ianmackenzie$elm_3d_scene$Scene3d$UnoptimizedShaders$shadowFragment,
						$ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleShadowMesh,
						{
							modelMatrix: modelMatrix,
							modelScale: modelScale,
							projectionMatrix: projectionMatrix,
							sceneProperties: sceneProperties,
							shadowLight: shadowLight,
							triangleVertexPositions: $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleVertexPositions(givenTriangle),
							viewMatrix: viewMatrix
						});
				})));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangle = F4(
	function (renderObject, renderShadow, givenMaterial, givenTriangle) {
		var meshEntity = A2($ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleMesh, givenMaterial, givenTriangle);
		var _v0 = _Utils_Tuple2(renderObject, renderShadow);
		if (_v0.a) {
			if (_v0.b) {
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(
					_List_fromArray(
						[
							meshEntity,
							$ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleShadow(givenTriangle)
						]));
			} else {
				return meshEntity;
			}
		} else {
			if (_v0.b) {
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$triangleShadow(givenTriangle);
			} else {
				return $ianmackenzie$elm_3d_scene$Scene3d$Entity$empty;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$facetWithShadow = F2(
	function (givenMaterial, givenTriangle) {
		return A4($ianmackenzie$elm_3d_scene$Scene3d$Entity$triangle, true, true, givenMaterial, givenTriangle);
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Triangle3d = function (a) {
	return {$: 'Triangle3d', a: a};
};
var $ianmackenzie$elm_geometry$Triangle3d$from = F3(
	function (p1, p2, p3) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Triangle3d(
			_Utils_Tuple3(p1, p2, p3));
	});
var $ianmackenzie$elm_geometry$Point3d$meters = F3(
	function (x, y, z) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: x, y: y, z: z});
	});
var $author$project$SceneWebGL$triangle = F2(
	function (material_, _v0) {
		var p = _v0.a;
		var q = _v0.b;
		var r = _v0.c;
		return A2(
			$ianmackenzie$elm_3d_scene$Scene3d$facetWithShadow,
			material_,
			A3(
				$ianmackenzie$elm_geometry$Triangle3d$from,
				A3($ianmackenzie$elm_geometry$Point3d$meters, p.x, p.y, p.z),
				A3($ianmackenzie$elm_geometry$Point3d$meters, q.x, q.y, q.z),
				A3($ianmackenzie$elm_geometry$Point3d$meters, r.x, r.y, r.z)));
	});
var $author$project$TrixelEditor$Main$drawFace = F3(
	function (computer, palette, _v0) {
		var _v1 = _v0.a;
		var lr = _v1.a;
		var u = _v1.b;
		var v = _v1.c;
		var colorIndex = _v0.b;
		var faceCenter = function () {
			var c = $author$project$TrixelEditor$TrixelGrid$CoordinateTransformations$toCanvasCoordinates(
				function () {
					if (lr.$ === 'L') {
						return {u: 1 / 3, v: 1 / 3};
					} else {
						return {u: 2 / 3, v: 2 / 3};
					}
				}());
			return {x: c.x, y: c.y, z: 0};
		}();
		var drawLeftFace = A2(
			$author$project$SceneWebGL$triangle,
			$ianmackenzie$elm_3d_scene$Scene3d$Material$matte(
				A2($author$project$TrixelEditor$ColorPalette$get, colorIndex, palette)),
			_Utils_Tuple3(
				{x: 0, y: 0, z: 0},
				{
					x: $elm$core$Basics$cos(
						$elm$core$Basics$degrees(30)),
					y: $elm$core$Basics$sin(
						$elm$core$Basics$degrees(30)),
					z: 0
				},
				{x: 0, y: 1, z: 0}));
		var drawRightFace = A2(
			$author$project$SceneWebGL$moveY,
			1 + $elm$core$Basics$sin(
				$elm$core$Basics$degrees(30)),
			A2(
				$author$project$SceneWebGL$moveX,
				$elm$core$Basics$cos(
					$elm$core$Basics$degrees(30)),
				A2(
					$author$project$SceneWebGL$rotateZ,
					$elm$core$Basics$degrees(180),
					drawLeftFace)));
		var _v2 = $author$project$TrixelEditor$TrixelGrid$CoordinateTransformations$toCanvasCoordinates(
			{u: u, v: v});
		var x = _v2.x;
		var y = _v2.y;
		return A2(
			$author$project$SceneWebGL$moveY,
			y,
			A2(
				$author$project$SceneWebGL$moveX,
				x,
				A3(
					$author$project$SceneWebGL$scaleAround,
					faceCenter,
					A2($author$project$Play$getFloat, 'trixel scale', computer),
					function () {
						if (lr.$ === 'L') {
							return drawLeftFace;
						} else {
							return drawRightFace;
						}
					}())));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$group = function (entities) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(entities);
};
var $author$project$SceneWebGL$group = $ianmackenzie$elm_3d_scene$Scene3d$group;
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $turboMaCk$any_dict$Dict$Any$toList = function (_v0) {
	var dict = _v0.a.dict;
	return $elm$core$Dict$values(dict);
};
var $author$project$TrixelEditor$Main$drawFaces = F2(
	function (computer, model) {
		var world = $author$project$Levels$current(model.pages);
		return $author$project$SceneWebGL$group(
			A2(
				$elm$core$List$map,
				A2($author$project$TrixelEditor$Main$drawFace, computer, world.palette),
				$turboMaCk$any_dict$Dict$Any$toList(world.trixels)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = $rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var $rtfeldman$elm_css$Html$Styled$fromUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var $ianmackenzie$elm_3d_scene$Scene3d$BackgroundColor = function (a) {
	return {$: 'BackgroundColor', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$backgroundColor = function (color) {
	return $ianmackenzie$elm_3d_scene$Scene3d$BackgroundColor(color);
};
var $ianmackenzie$elm_units$Length$centimeters = function (numCentimeters) {
	return $ianmackenzie$elm_units$Length$meters(0.01 * numCentimeters);
};
var $ianmackenzie$elm_units$Pixels$int = function (numPixels) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numPixels);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$CastsShadows = function (a) {
	return {$: 'CastsShadows', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows = function (flag) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Light$CastsShadows(flag);
};
var $elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 'Alpha', a: a};
};
var $elm_explorations$webgl$WebGL$alpha = $elm_explorations$webgl$WebGL$Internal$Alpha;
var $elm_explorations$webgl$WebGL$Internal$Antialias = {$: 'Antialias'};
var $elm_explorations$webgl$WebGL$antialias = $elm_explorations$webgl$WebGL$Internal$Antialias;
var $elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 'ClearColor', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$clearColor = $elm_explorations$webgl$WebGL$Internal$ClearColor;
var $elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 'Depth', a: a};
};
var $elm_explorations$webgl$WebGL$depth = $elm_explorations$webgl$WebGL$Internal$Depth;
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm_explorations$webgl$WebGL$Internal$Stencil = function (a) {
	return {$: 'Stencil', a: a};
};
var $elm_explorations$webgl$WebGL$stencil = $elm_explorations$webgl$WebGL$Internal$Stencil;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var $ianmackenzie$elm_units$Pixels$toInt = function (_v0) {
	var numPixels = _v0.a;
	return numPixels;
};
var $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 1, 1, 1, 1);
var $ianmackenzie$elm_3d_scene$Scene3d$call = F3(
	function (renderPasses, lights, settings) {
		return A2(
			$elm$core$List$map,
			function (renderPass) {
				return A2(renderPass, lights, settings);
			},
			renderPasses);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Types$CieXyz = F3(
	function (a, b, c) {
		return {$: 'CieXyz', a: a, b: b, c: c};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToCieXyz = F2(
	function (_v0, _v1) {
		var intensity = _v0.a;
		var x = _v1.a.x;
		var y = _v1.a.y;
		return A3($ianmackenzie$elm_3d_scene$Scene3d$Types$CieXyz, (intensity * x) / y, intensity, (intensity * ((1 - x) - y)) / y);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$cieXyzToLinearRgb = function (_v0) {
	var bigX = _v0.a;
	var bigY = _v0.b;
	var bigZ = _v0.c;
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$LinearRgb(
		A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ((3.2406 * bigX) - (1.5372 * bigY)) - (0.4986 * bigZ), (((-0.9689) * bigX) + (1.8758 * bigY)) + (0.0415 * bigZ), ((0.0557 * bigX) - (0.204 * bigY)) + (1.057 * bigZ)));
};
var $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb = F2(
	function (intensity, chromaticity) {
		return $ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$cieXyzToLinearRgb(
			A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToCieXyz, intensity, chromaticity));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$modelMatrix = function (transformation) {
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{m11: transformation.ix, m12: transformation.jx, m13: transformation.kx, m14: transformation.px, m21: transformation.iy, m22: transformation.jy, m23: transformation.ky, m24: transformation.py, m31: transformation.iz, m32: transformation.jz, m33: transformation.kz, m34: transformation.pz, m41: 0, m42: 0, m43: 0, m44: 1});
};
var $ianmackenzie$elm_3d_scene$Scene3d$createRenderPass = F5(
	function (sceneProperties, viewMatrix, projectionMatrix, transformation, drawFunction) {
		var normalSign = transformation.isRightHanded ? 1 : (-1);
		var modelScale = A4($elm_explorations$linear_algebra$Math$Vector4$vec4, transformation.scale, transformation.scale, transformation.scale, normalSign);
		return A6(
			drawFunction,
			sceneProperties,
			modelScale,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$modelMatrix(transformation),
			transformation.isRightHanded,
			viewMatrix,
			projectionMatrix);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses = F6(
	function (sceneProperties, viewMatrix, projectionMatrix, currentTransformation, node, accumulated) {
		collectRenderPasses:
		while (true) {
			switch (node.$) {
				case 'EmptyNode':
					return accumulated;
				case 'Transformed':
					var transformation = node.a;
					var childNode = node.b;
					var $temp$sceneProperties = sceneProperties,
						$temp$viewMatrix = viewMatrix,
						$temp$projectionMatrix = projectionMatrix,
						$temp$currentTransformation = A2($ianmackenzie$elm_3d_scene$Scene3d$Transformation$compose, transformation, currentTransformation),
						$temp$node = childNode,
						$temp$accumulated = accumulated;
					sceneProperties = $temp$sceneProperties;
					viewMatrix = $temp$viewMatrix;
					projectionMatrix = $temp$projectionMatrix;
					currentTransformation = $temp$currentTransformation;
					node = $temp$node;
					accumulated = $temp$accumulated;
					continue collectRenderPasses;
				case 'MeshNode':
					var meshDrawFunction = node.b;
					var updatedMeshes = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, meshDrawFunction),
						accumulated.meshes);
					return {meshes: updatedMeshes, points: accumulated.points, shadows: accumulated.shadows};
				case 'PointNode':
					var pointDrawFunction = node.b;
					var updatedPoints = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, pointDrawFunction),
						accumulated.points);
					return {meshes: accumulated.meshes, points: updatedPoints, shadows: accumulated.shadows};
				case 'ShadowNode':
					var shadowDrawFunction = node.a;
					var updatedShadows = A2(
						$elm$core$List$cons,
						A5($ianmackenzie$elm_3d_scene$Scene3d$createRenderPass, sceneProperties, viewMatrix, projectionMatrix, currentTransformation, shadowDrawFunction),
						accumulated.shadows);
					return {meshes: accumulated.meshes, points: accumulated.points, shadows: updatedShadows};
				default:
					var childNodes = node.a;
					return A3(
						$elm$core$List$foldl,
						A4($ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses, sceneProperties, viewMatrix, projectionMatrix, currentTransformation),
						accumulated,
						childNodes);
			}
		}
	});
var $elm_explorations$webgl$WebGL$Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {$: 'ColorMask', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$colorMask = $elm_explorations$webgl$WebGL$Internal$ColorMask;
var $elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 'DepthTest', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$greaterOrEqual = function (_v0) {
	var write = _v0.write;
	var near = _v0.near;
	var far = _v0.far;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 518, write, near, far);
};
var $elm_explorations$webgl$WebGL$Internal$PolygonOffset = F2(
	function (a, b) {
		return {$: 'PolygonOffset', a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$Settings$polygonOffset = $elm_explorations$webgl$WebGL$Internal$PolygonOffset;
var $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$greaterOrEqual(
		{far: 1, near: 0, write: false}),
		A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false),
		A2($elm_explorations$webgl$WebGL$Settings$polygonOffset, 0.0, 1.0)
	]);
var $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount = 8;
var $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits = 15;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$replace = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(7681);
var $ianmackenzie$elm_3d_scene$Scene3d$dummyFragmentShader = {
	src: '\n        precision lowp float;\n\n        void main() {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Mesh1 = F2(
	function (a, b) {
		return {$: 'Mesh1', a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangleStrip = $elm_explorations$webgl$WebGL$Mesh1(
	{elemSize: 1, indexSize: 0, mode: 5});
var $ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadMesh = $elm_explorations$webgl$WebGL$triangleStrip(
	_List_fromArray(
		[
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, -1)
		},
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, -1)
		},
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, 1)
		},
			{
			position: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 1)
		}
		]));
var $ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadVertexShader = {
	src: '\n        precision lowp float;\n\n        attribute vec2 position;\n\n        void main() {\n            gl_Position = vec4(position, 0.0, 1.0);\n        }\n    ',
	attributes: {position: 'position'},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$test = function (stencilTest) {
	return A3(
		$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
		{mask: stencilTest.mask, ref: stencilTest.ref, writeMask: stencilTest.writeMask},
		{fail: stencilTest.fail, test: stencilTest.test, zfail: stencilTest.zfail, zpass: stencilTest.zpass},
		{fail: stencilTest.fail, test: stencilTest.test, zfail: stencilTest.zfail, zpass: stencilTest.zpass});
};
var $ianmackenzie$elm_3d_scene$Scene3d$updateStencil = function (test) {
	return A5(
		$elm_explorations$webgl$WebGL$entityWith,
		_List_fromArray(
			[
				$elm_explorations$webgl$WebGL$Settings$StencilTest$test(test),
				A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false)
			]),
		$ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadVertexShader,
		$ianmackenzie$elm_3d_scene$Scene3d$dummyFragmentShader,
		$ianmackenzie$elm_3d_scene$Scene3d$fullScreenQuadMesh,
		{});
};
var $ianmackenzie$elm_3d_scene$Scene3d$resetStencil = $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, mask: 0, ref: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, writeMask: $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace});
var $elm_explorations$webgl$WebGL$Settings$StencilTest$greater = $elm_explorations$webgl$WebGL$Settings$StencilTest$Test(516);
var $elm_explorations$webgl$WebGL$Settings$StencilTest$invert = $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation(5386);
var $ianmackenzie$elm_3d_scene$Scene3d$singleLightMask = function (index) {
	return A2($elm$core$Basics$pow, 2, index + 4);
};
var $ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue = function (lightIndex) {
	return $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
		{
			fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep,
			mask: $ianmackenzie$elm_3d_scene$Scene3d$lowerFourBits,
			ref: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount,
			test: $elm_explorations$webgl$WebGL$Settings$StencilTest$greater,
			writeMask: $ianmackenzie$elm_3d_scene$Scene3d$singleLightMask(lightIndex),
			zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$invert,
			zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$invert
		});
};
var $ianmackenzie$elm_3d_scene$Scene3d$createShadow = F3(
	function (shadowRenderPasses, lightIndex, lightMatrix) {
		return $elm$core$List$concat(
			_List_fromArray(
				[
					A3($ianmackenzie$elm_3d_scene$Scene3d$call, shadowRenderPasses, lightMatrix, $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil),
					_List_fromArray(
					[
						$ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue(lightIndex),
						$ianmackenzie$elm_3d_scene$Scene3d$resetStencil
					])
				]));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$createShadows = F2(
	function (shadowRenderPasses, shadowCasters) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$indexedMap,
				$ianmackenzie$elm_3d_scene$Scene3d$createShadow(shadowRenderPasses),
				shadowCasters));
	});
var $elm_explorations$webgl$WebGL$Internal$Blend = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {$: 'Blend', a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_explorations$webgl$WebGL$Settings$Blend$custom = function (_v0) {
	var r = _v0.r;
	var g = _v0.g;
	var b = _v0.b;
	var a = _v0.a;
	var color = _v0.color;
	var alpha = _v0.alpha;
	var expand = F2(
		function (_v1, _v2) {
			var eq1 = _v1.a;
			var f11 = _v1.b;
			var f12 = _v1.c;
			var eq2 = _v2.a;
			var f21 = _v2.b;
			var f22 = _v2.c;
			return $elm_explorations$webgl$WebGL$Internal$Blend(eq1)(f11)(f12)(eq2)(f21)(f22)(r)(g)(b)(a);
		});
	return A2(expand, color, alpha);
};
var $elm_explorations$webgl$WebGL$Settings$Blend$Blender = F3(
	function (a, b, c) {
		return {$: 'Blender', a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$customAdd = F2(
	function (_v0, _v1) {
		var factor1 = _v0.a;
		var factor2 = _v1.a;
		return A3($elm_explorations$webgl$WebGL$Settings$Blend$Blender, 32774, factor1, factor2);
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$Factor = function (a) {
	return {$: 'Factor', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$Blend$one = $elm_explorations$webgl$WebGL$Settings$Blend$Factor(1);
var $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha = $elm_explorations$webgl$WebGL$Settings$Blend$Factor(771);
var $elm_explorations$webgl$WebGL$Internal$SampleAlphaToCoverage = {$: 'SampleAlphaToCoverage'};
var $elm_explorations$webgl$WebGL$Settings$sampleAlphaToCoverage = $elm_explorations$webgl$WebGL$Internal$SampleAlphaToCoverage;
var $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha = $elm_explorations$webgl$WebGL$Settings$Blend$Factor(770);
var $ianmackenzie$elm_3d_scene$Scene3d$commonSettings = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$Blend$custom(
		{
			a: 0,
			alpha: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, $elm_explorations$webgl$WebGL$Settings$Blend$one, $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha),
			b: 0,
			color: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha, $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha),
			g: 0,
			r: 0
		}),
		$elm_explorations$webgl$WebGL$Settings$sampleAlphaToCoverage
	]);
var $elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_v0) {
	var write = _v0.write;
	var near = _v0.near;
	var far = _v0.far;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$DepthTest$default = $elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{far: 1, near: 0, write: true});
var $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault = A2($elm$core$List$cons, $elm_explorations$webgl$WebGL$Settings$DepthTest$default, $ianmackenzie$elm_3d_scene$Scene3d$commonSettings);
var $ianmackenzie$elm_geometry$Point3d$unsafe = function (givenCoordinates) {
	return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(givenCoordinates);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$placementFrame = function (transformation) {
	return $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			originPoint: $ianmackenzie$elm_geometry$Point3d$unsafe(
				{x: transformation.px, y: transformation.py, z: transformation.pz}),
			xDirection: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{x: transformation.ix, y: transformation.iy, z: transformation.iz}),
			yDirection: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{x: transformation.jx, y: transformation.jy, z: transformation.jz}),
			zDirection: $ianmackenzie$elm_geometry$Direction3d$unsafe(
				{x: transformation.kx, y: transformation.ky, z: transformation.kz})
		});
};
var $ianmackenzie$elm_geometry$Direction3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0.a;
		var d = _v1.a;
		var _v2 = frame.zDirection;
		var k = _v2.a;
		var _v3 = frame.yDirection;
		var j = _v3.a;
		var _v4 = frame.xDirection;
		var i = _v4.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{x: ((d.x * i.x) + (d.y * i.y)) + (d.z * i.z), y: ((d.x * j.x) + (d.y * j.y)) + (d.z * j.z), z: ((d.x * k.x) + (d.y * k.y)) + (d.z * k.z)});
	});
var $ianmackenzie$elm_geometry$Point3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0.a;
		var p = _v1.a;
		var _v2 = frame.originPoint;
		var p0 = _v2.a;
		var deltaX = p.x - p0.x;
		var deltaY = p.y - p0.y;
		var deltaZ = p.z - p0.z;
		var _v3 = frame.zDirection;
		var k = _v3.a;
		var _v4 = frame.yDirection;
		var j = _v4.a;
		var _v5 = frame.xDirection;
		var i = _v5.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$Point3d(
			{x: ((deltaX * i.x) + (deltaY * i.y)) + (deltaZ * i.z), y: ((deltaX * j.x) + (deltaY * j.y)) + (deltaZ * j.z), z: ((deltaX * k.x) + (deltaY * k.y)) + (deltaZ * k.z)});
	});
var $ianmackenzie$elm_geometry$Frame3d$xDirection = function (_v0) {
	var properties = _v0.a;
	return properties.xDirection;
};
var $ianmackenzie$elm_geometry$Frame3d$yDirection = function (_v0) {
	var properties = _v0.a;
	return properties.yDirection;
};
var $ianmackenzie$elm_geometry$Frame3d$relativeTo = F2(
	function (otherFrame, frame) {
		return $ianmackenzie$elm_geometry$Geometry$Types$Frame3d(
			{
				originPoint: A2(
					$ianmackenzie$elm_geometry$Point3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
				xDirection: A2(
					$ianmackenzie$elm_geometry$Direction3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$xDirection(frame)),
				yDirection: A2(
					$ianmackenzie$elm_geometry$Direction3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$yDirection(frame)),
				zDirection: A2(
					$ianmackenzie$elm_geometry$Direction3d$relativeTo,
					otherFrame,
					$ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
			});
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$union = F2(
	function (firstBox, secondBox) {
		var _v0 = secondBox;
		var b2 = _v0.a;
		var _v1 = firstBox;
		var b1 = _v1.a;
		return $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(
			{
				maxX: A2($elm$core$Basics$max, b1.maxX, b2.maxX),
				maxY: A2($elm$core$Basics$max, b1.maxY, b2.maxY),
				maxZ: A2($elm$core$Basics$max, b1.maxZ, b2.maxZ),
				minX: A2($elm$core$Basics$min, b1.minX, b2.minX),
				minY: A2($elm$core$Basics$min, b1.minY, b2.minY),
				minZ: A2($elm$core$Basics$min, b1.minZ, b2.minZ)
			});
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$withDimensions = F2(
	function (givenDimensions, givenCenterPoint) {
		var _v0 = givenCenterPoint;
		var x = _v0.a.x;
		var y = _v0.a.y;
		var z = _v0.a.z;
		var _v1 = givenDimensions;
		var dx = _v1.a.a;
		var dy = _v1.b.a;
		var dz = _v1.c.a;
		var halfDx = $elm$core$Basics$abs(dx) / 2;
		var halfDy = $elm$core$Basics$abs(dy) / 2;
		var halfDz = $elm$core$Basics$abs(dz) / 2;
		return $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d(
			{maxX: x + halfDx, maxY: y + halfDy, maxZ: z + halfDz, minX: x - halfDx, minY: y - halfDy, minZ: z - halfDz});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds = F4(
	function (viewFrame, scale, modelBounds, current) {
		var originalCenter = modelBounds.centerPoint;
		var modelZDimension = (2 * modelBounds.halfZ) * scale;
		var modelYDimension = (2 * modelBounds.halfY) * scale;
		var modelXDimension = (2 * modelBounds.halfX) * scale;
		var modelCenterZ = originalCenter.z * scale;
		var modelCenterY = originalCenter.y * scale;
		var modelCenterX = originalCenter.x * scale;
		var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$zDirection(viewFrame));
		var zDimension = ($elm$core$Basics$abs(modelXDimension * k.x) + $elm$core$Basics$abs(modelYDimension * k.y)) + $elm$core$Basics$abs(modelZDimension * k.z);
		var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$yDirection(viewFrame));
		var yDimension = ($elm$core$Basics$abs(modelXDimension * j.x) + $elm$core$Basics$abs(modelYDimension * j.y)) + $elm$core$Basics$abs(modelZDimension * j.z);
		var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Frame3d$xDirection(viewFrame));
		var xDimension = ($elm$core$Basics$abs(modelXDimension * i.x) + $elm$core$Basics$abs(modelYDimension * i.y)) + $elm$core$Basics$abs(modelZDimension * i.z);
		var nodeBounds = A2(
			$ianmackenzie$elm_geometry$BoundingBox3d$withDimensions,
			_Utils_Tuple3(
				$ianmackenzie$elm_units$Quantity$Quantity(xDimension),
				$ianmackenzie$elm_units$Quantity$Quantity(yDimension),
				$ianmackenzie$elm_units$Quantity$Quantity(zDimension)),
			A2(
				$ianmackenzie$elm_geometry$Point3d$relativeTo,
				viewFrame,
				A3($ianmackenzie$elm_geometry$Point3d$meters, modelCenterX, modelCenterY, modelCenterZ)));
		if (current.$ === 'Just') {
			var currentBounds = current.a;
			return $elm$core$Maybe$Just(
				A2($ianmackenzie$elm_geometry$BoundingBox3d$union, currentBounds, nodeBounds));
		} else {
			return $elm$core$Maybe$Just(nodeBounds);
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$getViewBounds = F4(
	function (viewFrame, scale, current, nodes) {
		getViewBounds:
		while (true) {
			if (nodes.b) {
				var first = nodes.a;
				var rest = nodes.b;
				switch (first.$) {
					case 'EmptyNode':
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = current,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'MeshNode':
						var modelBounds = first.a;
						var updated = A4($ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds, viewFrame, scale, modelBounds, current);
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = updated,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'ShadowNode':
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = current,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'PointNode':
						var modelBounds = first.a;
						var updated = A4($ianmackenzie$elm_3d_scene$Scene3d$updateViewBounds, viewFrame, scale, modelBounds, current);
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = updated,
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					case 'Group':
						var childNodes = first.a;
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = A4($ianmackenzie$elm_3d_scene$Scene3d$getViewBounds, viewFrame, scale, current, childNodes),
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
					default:
						var transformation = first.a;
						var childNode = first.b;
						var localViewFrame = A2(
							$ianmackenzie$elm_geometry$Frame3d$relativeTo,
							$ianmackenzie$elm_3d_scene$Scene3d$Transformation$placementFrame(transformation),
							viewFrame);
						var localScale = scale * transformation.scale;
						var $temp$viewFrame = viewFrame,
							$temp$scale = scale,
							$temp$current = A4(
							$ianmackenzie$elm_3d_scene$Scene3d$getViewBounds,
							localViewFrame,
							localScale,
							current,
							_List_fromArray(
								[childNode])),
							$temp$nodes = rest;
						viewFrame = $temp$viewFrame;
						scale = $temp$scale;
						current = $temp$current;
						nodes = $temp$nodes;
						continue getViewBounds;
				}
			} else {
				return current;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Transformation$identity = {isRightHanded: true, ix: 1, iy: 0, iz: 0, jx: 0, jy: 1, jz: 0, kx: 0, ky: 0, kz: 1, px: 0, py: 0, pz: 0, scale: 1};
var $ianmackenzie$elm_3d_scene$Scene3d$initStencil = $ianmackenzie$elm_3d_scene$Scene3d$updateStencil(
	{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, mask: 0, ref: $ianmackenzie$elm_3d_scene$Scene3d$initialStencilCount, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, writeMask: 255, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$replace});
var $ianmackenzie$elm_geometry$Vector3d$length = function (_v0) {
	var v = _v0.a;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.x),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.y),
			$elm$core$Basics$abs(v.z)));
	if (!largestComponent) {
		return $ianmackenzie$elm_units$Quantity$zero;
	} else {
		var scaledZ = v.z / largestComponent;
		var scaledY = v.y / largestComponent;
		var scaledX = v.x / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $ianmackenzie$elm_units$Quantity$Quantity(scaledLength * largestComponent);
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Light = function (a) {
	return {$: 'Light', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled = $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(
	{b: 0, castsShadows: false, g: 0, parameter: 0, r: 0, type_: 0, x: 0, y: 0, z: 0});
var $ianmackenzie$elm_3d_scene$Scene3d$lightPair = F2(
	function (_v0, _v1) {
		var first = _v0.a;
		var second = _v1.a;
		return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{m11: first.x, m12: first.r, m13: second.x, m14: second.r, m21: first.y, m22: first.g, m23: second.y, m24: second.g, m31: first.z, m32: first.b, m33: second.z, m34: second.b, m41: first.type_, m42: first.parameter, m43: second.type_, m44: second.parameter});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled = _Utils_Tuple2(
	{
		lights12: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		lights34: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		lights56: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled),
		lights78: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled)
	},
	A4($elm_explorations$linear_algebra$Math$Vector4$vec4, 0, 0, 0, 0));
var $elm_explorations$webgl$WebGL$Settings$StencilTest$equal = $elm_explorations$webgl$WebGL$Settings$StencilTest$Test(514);
var $elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual = function (_v0) {
	var write = _v0.write;
	var near = _v0.near;
	var far = _v0.far;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 515, write, near, far);
};
var $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits = 240;
var $ianmackenzie$elm_3d_scene$Scene3d$outsideStencil = _Utils_ap(
	_List_fromArray(
		[
			$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
			{far: 1, near: 0, write: true}),
			$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
			{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, mask: $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits, ref: 0, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$equal, writeMask: 0, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep})
		]),
	$ianmackenzie$elm_3d_scene$Scene3d$commonSettings);
var $ianmackenzie$elm_units$Quantity$plus = F2(
	function (_v0, _v1) {
		var y = _v0.a;
		var x = _v1.a;
		return $ianmackenzie$elm_units$Quantity$Quantity(x + y);
	});
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$projectionMatrix = F2(
	function (_v0, _v1) {
		var camera = _v0.a;
		var nearClipDepth = _v1.nearClipDepth;
		var farClipDepth = _v1.farClipDepth;
		var aspectRatio = _v1.aspectRatio;
		var _v2 = $ianmackenzie$elm_units$Quantity$abs(nearClipDepth);
		var n = _v2.a;
		var _v3 = $ianmackenzie$elm_units$Quantity$abs(farClipDepth);
		var f = _v3.a;
		var _v4 = camera.projection;
		if (_v4.$ === 'Perspective') {
			var frustumSlope = _v4.a;
			return $elm$core$Basics$isInfinite(f) ? $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 1 / (aspectRatio * frustumSlope), m12: 0, m13: 0, m14: 0, m21: 0, m22: 1 / frustumSlope, m23: 0, m24: 0, m31: 0, m32: 0, m33: -1, m34: (-2) * n, m41: 0, m42: 0, m43: -1, m44: 0}) : $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 1 / (aspectRatio * frustumSlope), m12: 0, m13: 0, m14: 0, m21: 0, m22: 1 / frustumSlope, m23: 0, m24: 0, m31: 0, m32: 0, m33: (-(f + n)) / (f - n), m34: (((-2) * f) * n) / (f - n), m41: 0, m42: 0, m43: -1, m44: 0});
		} else {
			var viewportHeight = _v4.a.a;
			return $elm$core$Basics$isInfinite(f) ? $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 2 / (aspectRatio * viewportHeight), m12: 0, m13: 0, m14: 0, m21: 0, m22: 2 / viewportHeight, m23: 0, m24: 0, m31: 0, m32: 0, m33: 0, m34: -1, m41: 0, m42: 0, m43: 0, m44: 1}) : $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
				{m11: 2 / (aspectRatio * viewportHeight), m12: 0, m13: 0, m14: 0, m21: 0, m22: 2 / viewportHeight, m23: 0, m24: 0, m31: 0, m32: 0, m33: (-2) / (f - n), m34: (-(f + n)) / (f - n), m41: 0, m42: 0, m43: 0, m44: 1});
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$enabledFlag = F2(
	function (lightMask, lightIndex) {
		return ((1 & (lightMask >> lightIndex)) === 1) ? 0 : 1;
	});
var $ianmackenzie$elm_3d_scene$Scene3d$insideStencil = function (lightMask) {
	return _Utils_ap(
		_List_fromArray(
			[
				$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
				{far: 1, near: 0, write: true}),
				$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
				{fail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, mask: $ianmackenzie$elm_3d_scene$Scene3d$upperFourBits, ref: lightMask, test: $elm_explorations$webgl$WebGL$Settings$StencilTest$equal, writeMask: 0, zfail: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, zpass: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep})
			]),
		$ianmackenzie$elm_3d_scene$Scene3d$commonSettings);
};
var $ianmackenzie$elm_3d_scene$Scene3d$renderWithinShadows = F3(
	function (meshRenderPasses, lightMatrices, numShadowingLights) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (lightMask) {
					var stencilMask = lightMask << 4;
					var enabledLights = A4(
						$elm_explorations$linear_algebra$Math$Vector4$vec4,
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 0),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 1),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 2),
						A2($ianmackenzie$elm_3d_scene$Scene3d$enabledFlag, lightMask, 3));
					return A3(
						$ianmackenzie$elm_3d_scene$Scene3d$call,
						meshRenderPasses,
						_Utils_Tuple2(lightMatrices, enabledLights),
						$ianmackenzie$elm_3d_scene$Scene3d$insideStencil(stencilMask));
				},
				A2(
					$elm$core$List$range,
					1,
					A2($elm$core$Basics$pow, 2, numShadowingLights) - 1)));
	});
var $elm_explorations$linear_algebra$Math$Matrix4$toRecord = _MJS_m4x4toRecord;
var $ianmackenzie$elm_geometry$Direction3d$positiveX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{x: 1, y: 0, z: 0});
var $ianmackenzie$elm_geometry$Direction3d$x = $ianmackenzie$elm_geometry$Direction3d$positiveX;
var $ianmackenzie$elm_geometry$Direction3d$y = $ianmackenzie$elm_geometry$Direction3d$positiveY;
var $ianmackenzie$elm_geometry$Frame3d$atOrigin = $ianmackenzie$elm_geometry$Geometry$Types$Frame3d(
	{originPoint: $ianmackenzie$elm_geometry$Point3d$origin, xDirection: $ianmackenzie$elm_geometry$Direction3d$x, yDirection: $ianmackenzie$elm_geometry$Direction3d$y, zDirection: $ianmackenzie$elm_geometry$Direction3d$z});
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4 = function (frame) {
	var p = $ianmackenzie$elm_geometry$Point3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{m11: i.x, m12: j.x, m13: k.x, m14: p.x, m21: i.y, m22: j.y, m23: k.y, m24: p.y, m31: i.z, m32: j.z, m33: k.z, m34: p.z, m41: 0, m42: 0, m43: 0, m44: 1});
};
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$modelViewMatrix = F2(
	function (modelFrame, _v0) {
		var viewpointFrame = _v0.a;
		return $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4(
			A2($ianmackenzie$elm_geometry$Frame3d$relativeTo, viewpointFrame, modelFrame));
	});
var $ianmackenzie$elm_3d_camera$WebGL$Matrices$viewMatrix = function (camera) {
	return A2($ianmackenzie$elm_3d_camera$WebGL$Matrices$modelViewMatrix, $ianmackenzie$elm_geometry$Frame3d$atOrigin, camera);
};
var $ianmackenzie$elm_3d_camera$Camera3d$viewpoint = function (_v0) {
	var camera = _v0.a;
	return camera.viewpoint;
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$xDirection = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Frame3d$xDirection(frame);
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$yDirection = function (_v0) {
	var frame = _v0.a;
	return $ianmackenzie$elm_geometry$Frame3d$yDirection(frame);
};
var $ianmackenzie$elm_3d_scene$Scene3d$toWebGLEntities = function (_arguments) {
	var viewpoint = $ianmackenzie$elm_3d_camera$Camera3d$viewpoint(_arguments.camera);
	var viewFrame = $ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			originPoint: $ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(viewpoint),
			xDirection: $ianmackenzie$elm_3d_camera$Viewpoint3d$xDirection(viewpoint),
			yDirection: $ianmackenzie$elm_3d_camera$Viewpoint3d$yDirection(viewpoint),
			zDirection: $ianmackenzie$elm_geometry$Direction3d$reverse(
				$ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection(viewpoint))
		});
	var _v0 = $ianmackenzie$elm_3d_scene$Scene3d$Entity$group(_arguments.entities);
	var rootNode = _v0.a;
	var _v1 = A4(
		$ianmackenzie$elm_3d_scene$Scene3d$getViewBounds,
		viewFrame,
		1,
		$elm$core$Maybe$Nothing,
		_List_fromArray(
			[rootNode]));
	if (_v1.$ === 'Nothing') {
		return _List_Nil;
	} else {
		var viewBounds = _v1.a;
		var viewMatrix = $ianmackenzie$elm_3d_camera$WebGL$Matrices$viewMatrix(viewpoint);
		var nearClipDepth = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			0.99,
			A2(
				$ianmackenzie$elm_units$Quantity$max,
				$ianmackenzie$elm_units$Quantity$abs(_arguments.clipDepth),
				$ianmackenzie$elm_units$Quantity$negate(
					$ianmackenzie$elm_geometry$BoundingBox3d$maxZ(viewBounds))));
		var _v2 = $ianmackenzie$elm_geometry$BoundingBox3d$dimensions(viewBounds);
		var xDimension = _v2.a;
		var yDimension = _v2.b;
		var zDimension = _v2.c;
		var sceneDiameter = $ianmackenzie$elm_geometry$Vector3d$length(
			A3($ianmackenzie$elm_geometry$Vector3d$xyz, xDimension, yDimension, zDimension));
		var farClipDepth = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			1.01,
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				sceneDiameter,
				$ianmackenzie$elm_units$Quantity$negate(
					$ianmackenzie$elm_geometry$BoundingBox3d$minZ(viewBounds))));
		var projectionMatrix = A2(
			$ianmackenzie$elm_3d_camera$WebGL$Matrices$projectionMatrix,
			_arguments.camera,
			{aspectRatio: _arguments.aspectRatio, farClipDepth: farClipDepth, nearClipDepth: nearClipDepth});
		var projectionType = $elm_explorations$linear_algebra$Math$Matrix4$toRecord(projectionMatrix).m44;
		var eyePointOrDirectionToCamera = (!projectionType) ? $ianmackenzie$elm_geometry$Point3d$toMeters(
			$ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(viewpoint)) : $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Direction3d$reverse(
				$ianmackenzie$elm_3d_camera$Viewpoint3d$viewDirection(viewpoint)));
		var _v3 = function () {
			var _v4 = _arguments.toneMapping;
			switch (_v4.$) {
				case 'NoToneMapping':
					return _Utils_Tuple2(0, 0);
				case 'ReinhardLuminanceToneMapping':
					return _Utils_Tuple2(1, 0);
				case 'ReinhardPerChannelToneMapping':
					return _Utils_Tuple2(2, 0);
				case 'ExtendedReinhardLuminanceToneMapping':
					var overexposureLimit = _v4.a;
					return _Utils_Tuple2(3, overexposureLimit);
				case 'ExtendedReinhardPerChannelToneMapping':
					var overexposureLimit = _v4.a;
					return _Utils_Tuple2(4, overexposureLimit);
				default:
					return _Utils_Tuple2(5, 0);
			}
		}();
		var toneMapType = _v3.a;
		var toneMapParam = _v3.b;
		var _v5 = _arguments.exposure;
		var exposureLuminance = _v5.a;
		var _v6 = A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb, exposureLuminance, _arguments.whiteBalance);
		var referenceWhite = _v6.a;
		var sceneProperties = $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{
				m11: 0,
				m12: eyePointOrDirectionToCamera.x,
				m13: $elm_explorations$linear_algebra$Math$Vector3$getX(referenceWhite),
				m14: _arguments.supersampling,
				m21: 0,
				m22: eyePointOrDirectionToCamera.y,
				m23: $elm_explorations$linear_algebra$Math$Vector3$getY(referenceWhite),
				m24: $ianmackenzie$elm_units$Length$inMeters(sceneDiameter),
				m31: 0,
				m32: eyePointOrDirectionToCamera.z,
				m33: $elm_explorations$linear_algebra$Math$Vector3$getZ(referenceWhite),
				m34: toneMapType,
				m41: 0,
				m42: projectionType,
				m43: 0,
				m44: toneMapParam
			});
		var renderPasses = A6(
			$ianmackenzie$elm_3d_scene$Scene3d$collectRenderPasses,
			sceneProperties,
			viewMatrix,
			projectionMatrix,
			$ianmackenzie$elm_3d_scene$Scene3d$Transformation$identity,
			rootNode,
			{meshes: _List_Nil, points: _List_Nil, shadows: _List_Nil});
		var _v7 = _arguments.lights;
		switch (_v7.$) {
			case 'SingleUnshadowedPass':
				var lightMatrices = _v7.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.meshes,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.points, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault)
						]));
			case 'SingleShadowedPass':
				var lightMatrices = _v7.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.meshes, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault),
							_List_fromArray(
							[$ianmackenzie$elm_3d_scene$Scene3d$initStencil]),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.shadows, lightMatrices.lights12, $ianmackenzie$elm_3d_scene$Scene3d$createShadowStencil),
							_List_fromArray(
							[
								$ianmackenzie$elm_3d_scene$Scene3d$storeStencilValue(0)
							]),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.meshes,
							_Utils_Tuple2(lightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$outsideStencil),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.points, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault)
						]));
			default:
				var shadowCasters = _v7.a;
				var allLightMatrices = _v7.b;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$call,
							renderPasses.meshes,
							_Utils_Tuple2(allLightMatrices, $ianmackenzie$elm_3d_scene$Scene3d$allLightsEnabled),
							$ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault),
							_List_fromArray(
							[$ianmackenzie$elm_3d_scene$Scene3d$initStencil]),
							A2($ianmackenzie$elm_3d_scene$Scene3d$createShadows, renderPasses.shadows, shadowCasters),
							A3(
							$ianmackenzie$elm_3d_scene$Scene3d$renderWithinShadows,
							renderPasses.meshes,
							allLightMatrices,
							$elm$core$List$length(shadowCasters)),
							A3($ianmackenzie$elm_3d_scene$Scene3d$call, renderPasses.points, $ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled, $ianmackenzie$elm_3d_scene$Scene3d$depthTestDefault)
						]));
		}
	}
};
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $ianmackenzie$elm_3d_scene$Scene3d$composite = F2(
	function (_arguments, scenes) {
		var commonWebGLOptions = _List_fromArray(
			[
				$elm_explorations$webgl$WebGL$depth(1),
				$elm_explorations$webgl$WebGL$stencil(0),
				$elm_explorations$webgl$WebGL$alpha(true),
				A4($elm_explorations$webgl$WebGL$clearColor, 0, 0, 0, 0)
			]);
		var _v0 = function () {
			var _v1 = _arguments.antialiasing;
			switch (_v1.$) {
				case 'NoAntialiasing':
					return _Utils_Tuple3(commonWebGLOptions, '0', 1);
				case 'Multisampling':
					return _Utils_Tuple3(
						A2($elm$core$List$cons, $elm_explorations$webgl$WebGL$antialias, commonWebGLOptions),
						'1',
						1);
				default:
					var value = _v1.a;
					return _Utils_Tuple3(commonWebGLOptions, '0', value);
			}
		}();
		var webGLOptions = _v0.a;
		var key = _v0.b;
		var scalingFactor = _v0.c;
		var _v2 = _arguments.dimensions;
		var width = _v2.a;
		var height = _v2.b;
		var heightInPixels = $ianmackenzie$elm_units$Pixels$toInt(height);
		var heightCss = A2(
			$elm$html$Html$Attributes$style,
			'height',
			$elm$core$String$fromInt(heightInPixels) + 'px');
		var widthInPixels = $ianmackenzie$elm_units$Pixels$toInt(width);
		var aspectRatio = widthInPixels / heightInPixels;
		var webGLEntities = A2(
			$elm$core$List$concatMap,
			function (scene) {
				return $ianmackenzie$elm_3d_scene$Scene3d$toWebGLEntities(
					{aspectRatio: aspectRatio, camera: _arguments.camera, clipDepth: _arguments.clipDepth, entities: scene.entities, exposure: scene.exposure, lights: scene.lights, supersampling: scalingFactor, toneMapping: scene.toneMapping, whiteBalance: scene.whiteBalance});
			},
			scenes);
		var widthCss = A2(
			$elm$html$Html$Attributes$style,
			'width',
			$elm$core$String$fromInt(widthInPixels) + 'px');
		var _v3 = _arguments.background;
		var givenBackgroundColor = _v3.a;
		var backgroundColorString = $avh4$elm_color$Color$toCssString(givenBackgroundColor);
		return A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'padding', '0px'),
					widthCss,
					heightCss
				]),
			_List_fromArray(
				[
					_Utils_Tuple2(
					key,
					A3(
						$elm_explorations$webgl$WebGL$toHtmlWith,
						webGLOptions,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$width(
								$elm$core$Basics$round(widthInPixels * scalingFactor)),
								$elm$html$Html$Attributes$height(
								$elm$core$Basics$round(heightInPixels * scalingFactor)),
								widthCss,
								heightCss,
								A2($elm$html$Html$Attributes$style, 'display', 'block'),
								A2($elm$html$Html$Attributes$style, 'background-color', backgroundColorString)
							]),
						webGLEntities))
				]));
	});
var $ianmackenzie$elm_3d_scene$Scene3d$custom = function (_arguments) {
	return A2(
		$ianmackenzie$elm_3d_scene$Scene3d$composite,
		{antialiasing: _arguments.antialiasing, background: _arguments.background, camera: _arguments.camera, clipDepth: _arguments.clipDepth, dimensions: _arguments.dimensions},
		_List_fromArray(
			[
				{entities: _arguments.entities, exposure: _arguments.exposure, lights: _arguments.lights, toneMapping: _arguments.toneMapping, whiteBalance: _arguments.whiteBalance}
			]));
};
var $ianmackenzie$elm_3d_scene$Scene3d$Types$Chromaticity = function (a) {
	return {$: 'Chromaticity', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity = function (xy) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Chromaticity(xy);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$daylight = $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
	{x: 0.31271, y: 0.32902});
var $ianmackenzie$elm_3d_scene$Scene3d$Light$directional = F2(
	function (_v0, light) {
		var shadowFlag = _v0.a;
		var _v1 = $ianmackenzie$elm_geometry$Direction3d$unwrap(light.direction);
		var x = _v1.x;
		var y = _v1.y;
		var z = _v1.z;
		var _v2 = A2($ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb, light.intensity, light.chromaticity);
		var rgb = _v2.a;
		return $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(
			{
				b: $elm_explorations$linear_algebra$Math$Vector3$getZ(rgb),
				castsShadows: shadowFlag,
				g: $elm_explorations$linear_algebra$Math$Vector3$getY(rgb),
				parameter: 0,
				r: $elm_explorations$linear_algebra$Math$Vector3$getX(rgb),
				type_: 1,
				x: -x,
				y: -y,
				z: -z
			});
	});
var $ianmackenzie$elm_3d_scene$Scene3d$Exposure = function (a) {
	return {$: 'Exposure', a: a};
};
var $ianmackenzie$elm_units$Luminance$nits = function (numNits) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numNits);
};
var $ianmackenzie$elm_3d_scene$Scene3d$exposureValue = function (ev100) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Exposure(
		$ianmackenzie$elm_units$Luminance$nits(
			1.2 * A2($elm$core$Basics$pow, 2, ev100)));
};
var $ianmackenzie$elm_units$Illuminance$lux = function (numLux) {
	return $ianmackenzie$elm_units$Quantity$Quantity(numLux);
};
var $ianmackenzie$elm_3d_scene$Scene3d$NoToneMapping = {$: 'NoToneMapping'};
var $ianmackenzie$elm_3d_scene$Scene3d$noToneMapping = $ianmackenzie$elm_3d_scene$Scene3d$NoToneMapping;
var $ianmackenzie$elm_units$Quantity$float = function (value) {
	return $ianmackenzie$elm_units$Quantity$Quantity(value);
};
var $ianmackenzie$elm_units$Illuminance$inLux = function (_v0) {
	var numLux = _v0.a;
	return numLux;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$soft = function (light) {
	soft:
	while (true) {
		if (_Utils_eq(light.intensityAbove, $ianmackenzie$elm_units$Quantity$zero) && _Utils_eq(light.intensityBelow, $ianmackenzie$elm_units$Quantity$zero)) {
			return $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled;
		} else {
			if (A2(
				$ianmackenzie$elm_units$Quantity$greaterThan,
				$ianmackenzie$elm_units$Quantity$abs(light.intensityAbove),
				$ianmackenzie$elm_units$Quantity$abs(light.intensityBelow))) {
				var $temp$light = {
					chromaticity: light.chromaticity,
					intensityAbove: light.intensityBelow,
					intensityBelow: light.intensityAbove,
					upDirection: $ianmackenzie$elm_geometry$Direction3d$reverse(light.upDirection)
				};
				light = $temp$light;
				continue soft;
			} else {
				var nitsBelow = $elm$core$Basics$abs(
					$ianmackenzie$elm_units$Illuminance$inLux(light.intensityBelow) / $elm$core$Basics$pi);
				var nitsAbove = $elm$core$Basics$abs(
					$ianmackenzie$elm_units$Illuminance$inLux(light.intensityAbove) / $elm$core$Basics$pi);
				var _v0 = $ianmackenzie$elm_geometry$Direction3d$unwrap(light.upDirection);
				var x = _v0.x;
				var y = _v0.y;
				var z = _v0.z;
				var _v1 = A2(
					$ianmackenzie$elm_3d_scene$Scene3d$ColorConversions$chromaticityToLinearRgb,
					$ianmackenzie$elm_units$Quantity$float(1),
					light.chromaticity);
				var rgb = _v1.a;
				return $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(
					{
						b: nitsAbove * $elm_explorations$linear_algebra$Math$Vector3$getZ(rgb),
						castsShadows: false,
						g: nitsAbove * $elm_explorations$linear_algebra$Math$Vector3$getY(rgb),
						parameter: nitsBelow / nitsAbove,
						r: nitsAbove * $elm_explorations$linear_algebra$Math$Vector3$getX(rgb),
						type_: 3,
						x: x,
						y: y,
						z: z
					});
			}
		}
	}
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$overhead = function (_arguments) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Light$soft(
		{chromaticity: _arguments.chromaticity, intensityAbove: _arguments.intensity, intensityBelow: $ianmackenzie$elm_units$Quantity$zero, upDirection: _arguments.upDirection});
};
var $ianmackenzie$elm_units$Temperature$inKelvins = function (_v0) {
	var numKelvins = _v0.a;
	return numKelvins;
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature = function (temperature) {
	var t = A3(
		$elm$core$Basics$clamp,
		1667,
		25000,
		$ianmackenzie$elm_units$Temperature$inKelvins(temperature));
	var x = (t <= 4000) ? ((((((-0.2661239) * 1.0e9) / ((t * t) * t)) - ((0.2343589 * 1.0e6) / (t * t))) + ((0.8776956 * 1.0e3) / t)) + 0.17991) : ((((((-3.0258469) * 1.0e9) / ((t * t) * t)) + ((2.1070379 * 1.0e6) / (t * t))) + ((0.2226347 * 1.0e3) / t)) + 0.24039);
	var y = (t <= 2222) ? (((((-1.1063814) * ((x * x) * x)) - (1.3481102 * (x * x))) + (2.18555832 * x)) - 0.20219683) : ((t <= 4000) ? (((((-0.9549476) * ((x * x) * x)) - (1.37418593 * (x * x))) + (2.09137015 * x)) - 0.16748867) : ((((3.081758 * ((x * x) * x)) - (5.8733867 * (x * x))) + (3.75112997 * x)) - 0.37001483));
	return $ianmackenzie$elm_3d_scene$Scene3d$Light$chromaticity(
		{x: x, y: y});
};
var $ianmackenzie$elm_units$Temperature$Temperature = function (a) {
	return {$: 'Temperature', a: a};
};
var $ianmackenzie$elm_units$Temperature$kelvins = function (numKelvins) {
	return $ianmackenzie$elm_units$Temperature$Temperature(numKelvins);
};
var $ianmackenzie$elm_3d_scene$Scene3d$Light$skylight = $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature(
	$ianmackenzie$elm_units$Temperature$kelvins(12000));
var $ianmackenzie$elm_3d_scene$Scene3d$Light$sunlight = $ianmackenzie$elm_3d_scene$Scene3d$Light$colorTemperature(
	$ianmackenzie$elm_units$Temperature$kelvins(5600));
var $ianmackenzie$elm_3d_scene$Scene3d$Supersampling = function (a) {
	return {$: 'Supersampling', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$supersampling = function (factor) {
	return $ianmackenzie$elm_3d_scene$Scene3d$Supersampling(factor);
};
var $ianmackenzie$elm_3d_scene$Scene3d$MultiplePasses = F2(
	function (a, b) {
		return {$: 'MultiplePasses', a: a, b: b};
	});
var $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass = function (a) {
	return {$: 'SingleUnshadowedPass', a: a};
};
var $ianmackenzie$elm_3d_scene$Scene3d$eraseLight = function (_v0) {
	var light = _v0.a;
	return $ianmackenzie$elm_3d_scene$Scene3d$Types$Light(light);
};
var $ianmackenzie$elm_3d_scene$Scene3d$lightCastsShadows = function (_v0) {
	var properties = _v0.a;
	return properties.castsShadows;
};
var $ianmackenzie$elm_3d_scene$Scene3d$noLights = $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass($ianmackenzie$elm_3d_scene$Scene3d$lightingDisabled.a);
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $ianmackenzie$elm_3d_scene$Scene3d$singleLight = function (_v0) {
	var light = _v0.a;
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{m11: light.x, m12: light.r, m13: 0, m14: 0, m21: light.y, m22: light.g, m23: 0, m24: 0, m31: light.z, m32: light.b, m33: 0, m34: 0, m41: light.type_, m42: light.parameter, m43: 0, m44: 0});
};
var $ianmackenzie$elm_3d_scene$Scene3d$eightLights = F8(
	function (first, second, third, fourth, fifth, sixth, seventh, eigth) {
		var _v0 = A2(
			$elm$core$List$partition,
			$ianmackenzie$elm_3d_scene$Scene3d$lightCastsShadows,
			_List_fromArray(
				[
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(first),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(second),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(third),
					$ianmackenzie$elm_3d_scene$Scene3d$eraseLight(fourth)
				]));
		var enabledShadowCasters = _v0.a;
		var disabledShadowCasters = _v0.b;
		if (!enabledShadowCasters.b) {
			return $ianmackenzie$elm_3d_scene$Scene3d$SingleUnshadowedPass(
				{
					lights12: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, first, second),
					lights34: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, third, fourth),
					lights56: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, fifth, sixth),
					lights78: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, seventh, eigth)
				});
		} else {
			var sortedLights = _Utils_ap(enabledShadowCasters, disabledShadowCasters);
			if ((((sortedLights.b && sortedLights.b.b) && sortedLights.b.b.b) && sortedLights.b.b.b.b) && (!sortedLights.b.b.b.b.b)) {
				var light0 = sortedLights.a;
				var _v3 = sortedLights.b;
				var light1 = _v3.a;
				var _v4 = _v3.b;
				var light2 = _v4.a;
				var _v5 = _v4.b;
				var light3 = _v5.a;
				return A2(
					$ianmackenzie$elm_3d_scene$Scene3d$MultiplePasses,
					A2($elm$core$List$map, $ianmackenzie$elm_3d_scene$Scene3d$singleLight, enabledShadowCasters),
					{
						lights12: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, light0, light1),
						lights34: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, light2, light3),
						lights56: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, fifth, sixth),
						lights78: A2($ianmackenzie$elm_3d_scene$Scene3d$lightPair, seventh, eigth)
					});
			} else {
				return $ianmackenzie$elm_3d_scene$Scene3d$noLights;
			}
		}
	});
var $ianmackenzie$elm_3d_scene$Scene3d$threeLights = F3(
	function (first, second, third) {
		return A8($ianmackenzie$elm_3d_scene$Scene3d$eightLights, first, second, third, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled, $ianmackenzie$elm_3d_scene$Scene3d$Light$disabled);
	});
var $author$project$SceneWebGL$ModifiedFromScene3d$Scenes$sunnyWithDevicePixelRatio = function (_arguments) {
	var sun = A2(
		$ianmackenzie$elm_3d_scene$Scene3d$Light$directional,
		$ianmackenzie$elm_3d_scene$Scene3d$Light$castsShadows(_arguments.shadows),
		{
			chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$sunlight,
			direction: _arguments.sunlightDirection,
			intensity: $ianmackenzie$elm_units$Illuminance$lux(80000)
		});
	var sky = $ianmackenzie$elm_3d_scene$Scene3d$Light$overhead(
		{
			chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$skylight,
			intensity: $ianmackenzie$elm_units$Illuminance$lux(20000),
			upDirection: _arguments.upDirection
		});
	var environment = $ianmackenzie$elm_3d_scene$Scene3d$Light$overhead(
		{
			chromaticity: $ianmackenzie$elm_3d_scene$Scene3d$Light$daylight,
			intensity: $ianmackenzie$elm_units$Illuminance$lux(15000),
			upDirection: $ianmackenzie$elm_geometry$Direction3d$reverse(_arguments.upDirection)
		});
	var lights = A3($ianmackenzie$elm_3d_scene$Scene3d$threeLights, sun, sky, environment);
	return $ianmackenzie$elm_3d_scene$Scene3d$custom(
		{
			antialiasing: $ianmackenzie$elm_3d_scene$Scene3d$supersampling(_arguments.devicePixelRatio),
			background: _arguments.background,
			camera: _arguments.camera,
			clipDepth: _arguments.clipDepth,
			dimensions: _arguments.dimensions,
			entities: _arguments.entities,
			exposure: $ianmackenzie$elm_3d_scene$Scene3d$exposureValue(15),
			lights: lights,
			toneMapping: $ianmackenzie$elm_3d_scene$Scene3d$noToneMapping,
			whiteBalance: $ianmackenzie$elm_3d_scene$Scene3d$Light$daylight
		});
};
var $ianmackenzie$elm_geometry$Direction3d$xyZ = F2(
	function (_v0, _v1) {
		var theta = _v0.a;
		var phi = _v1.a;
		var cosPhi = $elm$core$Basics$cos(phi);
		return $ianmackenzie$elm_geometry$Geometry$Types$Direction3d(
			{
				x: cosPhi * $elm$core$Basics$cos(theta),
				y: cosPhi * $elm$core$Basics$sin(theta),
				z: $elm$core$Basics$sin(phi)
			});
	});
var $author$project$SceneWebGL$sunny = F2(
	function (_arguments, shapes) {
		return $author$project$SceneWebGL$ModifiedFromScene3d$Scenes$sunnyWithDevicePixelRatio(
			{
				background: $ianmackenzie$elm_3d_scene$Scene3d$backgroundColor(_arguments.backgroundColor),
				camera: _arguments.camera,
				clipDepth: $ianmackenzie$elm_units$Length$centimeters(0.5),
				devicePixelRatio: _arguments.devicePixelRatio,
				dimensions: _Utils_Tuple2(
					$ianmackenzie$elm_units$Pixels$int(
						$elm$core$Basics$round(_arguments.screen.width)),
					$ianmackenzie$elm_units$Pixels$int(
						$elm$core$Basics$round(_arguments.screen.height))),
				entities: shapes,
				shadows: true,
				sunlightDirection: A2(
					$ianmackenzie$elm_geometry$Direction3d$xyZ,
					$ianmackenzie$elm_units$Angle$radians(_arguments.sunlightAzimuth),
					$ianmackenzie$elm_units$Angle$radians(_arguments.sunlightElevation)),
				upDirection: $ianmackenzie$elm_geometry$Direction3d$z
			});
	});
var $author$project$TrixelEditor$Main$viewWebGLCanvas = F2(
	function (computer, model) {
		return $rtfeldman$elm_css$Html$Styled$fromUnstyled(
			A2(
				$author$project$SceneWebGL$sunny,
				{
					backgroundColor: A2(
						$author$project$TrixelEditor$ColorPalette$get,
						$author$project$Levels$current(model.pages).backgroundColorIndex,
						$author$project$Levels$current(model.pages).palette),
					camera: $author$project$TrixelEditor$Main$camera(computer),
					devicePixelRatio: computer.devicePixelRatio,
					screen: computer.screen,
					sunlightAzimuth: $elm$core$Basics$degrees(225),
					sunlightElevation: $elm$core$Basics$degrees(315)
				},
				_List_fromArray(
					[
						$author$project$SceneWebGL$group(
						_List_fromArray(
							[
								A2($author$project$TrixelEditor$Main$drawFaces, computer, model)
							]))
					])));
	});
var $author$project$TrixelEditor$Main$view = F2(
	function (computer, model) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$fixed),
									$rtfeldman$elm_css$Css$width(
									$rtfeldman$elm_css$Css$pct(100)),
									$rtfeldman$elm_css$Css$height(
									$rtfeldman$elm_css$Css$pct(100)),
									A2($rtfeldman$elm_css$Css$property, 'touch-action', 'none')
								]))
						]),
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$map,
							$elm$core$Basics$never,
							A2($author$project$TrixelEditor$Main$viewWebGLCanvas, computer, model))
						])),
					A2($author$project$TrixelEditor$Main$viewEditor, computer, model)
				]));
	});
var $author$project$TrixelEditor$Main$main = $author$project$Play$simpleApplication(
	{hasTape: true, init: $author$project$TrixelEditor$Main$init, initialConfigurations: $author$project$TrixelEditor$Main$initialConfigurations, update: $author$project$TrixelEditor$Main$update, view: $author$project$TrixelEditor$Main$view});
_Platform_export({'TrixelEditor':{'Main':{'init':$author$project$TrixelEditor$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (inputs) {
			return $elm$json$Json$Decode$succeed(
				{inputs: inputs});
		},
		A2(
			$elm$json$Json$Decode$field,
			'inputs',
			A2(
				$elm$json$Json$Decode$andThen,
				function (wheel) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (sensoState) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (screen) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (pointer) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (operatingSystem) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (keyboard) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (dt) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (devicePixelRatio) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (clock) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (boundingClientRects) {
																							return $elm$json$Json$Decode$succeed(
																								{boundingClientRects: boundingClientRects, clock: clock, devicePixelRatio: devicePixelRatio, dt: dt, keyboard: keyboard, operatingSystem: operatingSystem, pointer: pointer, screen: screen, sensoState: sensoState, wheel: wheel});
																						},
																						A2(
																							$elm$json$Json$Decode$field,
																							'boundingClientRects',
																							$elm$json$Json$Decode$list(
																								A2(
																									$elm$json$Json$Decode$andThen,
																									function (id) {
																										return A2(
																											$elm$json$Json$Decode$andThen,
																											function (boundingClientRect) {
																												return $elm$json$Json$Decode$succeed(
																													{boundingClientRect: boundingClientRect, id: id});
																											},
																											A2(
																												$elm$json$Json$Decode$field,
																												'boundingClientRect',
																												A2(
																													$elm$json$Json$Decode$andThen,
																													function (top) {
																														return A2(
																															$elm$json$Json$Decode$andThen,
																															function (right) {
																																return A2(
																																	$elm$json$Json$Decode$andThen,
																																	function (left) {
																																		return A2(
																																			$elm$json$Json$Decode$andThen,
																																			function (bottom) {
																																				return $elm$json$Json$Decode$succeed(
																																					{bottom: bottom, left: left, right: right, top: top});
																																			},
																																			A2($elm$json$Json$Decode$field, 'bottom', $elm$json$Json$Decode$float));
																																	},
																																	A2($elm$json$Json$Decode$field, 'left', $elm$json$Json$Decode$float));
																															},
																															A2($elm$json$Json$Decode$field, 'right', $elm$json$Json$Decode$float));
																													},
																													A2($elm$json$Json$Decode$field, 'top', $elm$json$Json$Decode$float))));
																									},
																									A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string)))));
																				},
																				A2($elm$json$Json$Decode$field, 'clock', $elm$json$Json$Decode$float));
																		},
																		A2($elm$json$Json$Decode$field, 'devicePixelRatio', $elm$json$Json$Decode$float));
																},
																A2($elm$json$Json$Decode$field, 'dt', $elm$json$Json$Decode$float));
														},
														A2(
															$elm$json$Json$Decode$field,
															'keyboard',
															A2(
																$elm$json$Json$Decode$andThen,
																function (up) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (shift) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (right) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (pressedKeys) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (left) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (downs) {
																											return A2(
																												$elm$json$Json$Decode$andThen,
																												function (down) {
																													return A2(
																														$elm$json$Json$Decode$andThen,
																														function (control) {
																															return A2(
																																$elm$json$Json$Decode$andThen,
																																function (alt) {
																																	return $elm$json$Json$Decode$succeed(
																																		{alt: alt, control: control, down: down, downs: downs, left: left, pressedKeys: pressedKeys, right: right, shift: shift, up: up});
																																},
																																A2($elm$json$Json$Decode$field, 'alt', $elm$json$Json$Decode$bool));
																														},
																														A2($elm$json$Json$Decode$field, 'control', $elm$json$Json$Decode$bool));
																												},
																												A2($elm$json$Json$Decode$field, 'down', $elm$json$Json$Decode$bool));
																										},
																										A2(
																											$elm$json$Json$Decode$field,
																											'downs',
																											$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
																								},
																								A2($elm$json$Json$Decode$field, 'left', $elm$json$Json$Decode$bool));
																						},
																						A2(
																							$elm$json$Json$Decode$field,
																							'pressedKeys',
																							$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
																				},
																				A2($elm$json$Json$Decode$field, 'right', $elm$json$Json$Decode$bool));
																		},
																		A2($elm$json$Json$Decode$field, 'shift', $elm$json$Json$Decode$bool));
																},
																A2($elm$json$Json$Decode$field, 'up', $elm$json$Json$Decode$bool))));
												},
												A2($elm$json$Json$Decode$field, 'operatingSystem', $elm$json$Json$Decode$string));
										},
										A2(
											$elm$json$Json$Decode$field,
											'pointer',
											A2(
												$elm$json$Json$Decode$andThen,
												function (y) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (x) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (up) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (rightUp) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (rightDown) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (move) {
																							return A2(
																								$elm$json$Json$Decode$andThen,
																								function (isDown) {
																									return A2(
																										$elm$json$Json$Decode$andThen,
																										function (elementIdsForLastDown) {
																											return A2(
																												$elm$json$Json$Decode$andThen,
																												function (down) {
																													return $elm$json$Json$Decode$succeed(
																														{down: down, elementIdsForLastDown: elementIdsForLastDown, isDown: isDown, move: move, rightDown: rightDown, rightUp: rightUp, up: up, x: x, y: y});
																												},
																												A2($elm$json$Json$Decode$field, 'down', $elm$json$Json$Decode$bool));
																										},
																										A2(
																											$elm$json$Json$Decode$field,
																											'elementIdsForLastDown',
																											$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
																								},
																								A2($elm$json$Json$Decode$field, 'isDown', $elm$json$Json$Decode$bool));
																						},
																						A2($elm$json$Json$Decode$field, 'move', $elm$json$Json$Decode$bool));
																				},
																				A2($elm$json$Json$Decode$field, 'rightDown', $elm$json$Json$Decode$bool));
																		},
																		A2($elm$json$Json$Decode$field, 'rightUp', $elm$json$Json$Decode$bool));
																},
																A2($elm$json$Json$Decode$field, 'up', $elm$json$Json$Decode$bool));
														},
														A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
												},
												A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
								},
								A2(
									$elm$json$Json$Decode$field,
									'screen',
									A2(
										$elm$json$Json$Decode$andThen,
										function (width) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (height) {
													return $elm$json$Json$Decode$succeed(
														{height: height, width: width});
												},
												A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$float));
										},
										A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$float))));
						},
						A2(
							$elm$json$Json$Decode$field,
							'sensoState',
							A2(
								$elm$json$Json$Decode$andThen,
								function (up) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (right) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (left) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (down) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (center) {
																	return $elm$json$Json$Decode$succeed(
																		{center: center, down: down, left: left, right: right, up: up});
																},
																A2(
																	$elm$json$Json$Decode$field,
																	'center',
																	A2(
																		$elm$json$Json$Decode$andThen,
																		function (y) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (x) {
																					return A2(
																						$elm$json$Json$Decode$andThen,
																						function (f) {
																							return $elm$json$Json$Decode$succeed(
																								{f: f, x: x, y: y});
																						},
																						A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
																				},
																				A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
																		},
																		A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
														},
														A2(
															$elm$json$Json$Decode$field,
															'down',
															A2(
																$elm$json$Json$Decode$andThen,
																function (y) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (x) {
																			return A2(
																				$elm$json$Json$Decode$andThen,
																				function (f) {
																					return $elm$json$Json$Decode$succeed(
																						{f: f, x: x, y: y});
																				},
																				A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
																		},
																		A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
																},
																A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
												},
												A2(
													$elm$json$Json$Decode$field,
													'left',
													A2(
														$elm$json$Json$Decode$andThen,
														function (y) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (x) {
																	return A2(
																		$elm$json$Json$Decode$andThen,
																		function (f) {
																			return $elm$json$Json$Decode$succeed(
																				{f: f, x: x, y: y});
																		},
																		A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
																},
																A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
														},
														A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
										},
										A2(
											$elm$json$Json$Decode$field,
											'right',
											A2(
												$elm$json$Json$Decode$andThen,
												function (y) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (x) {
															return A2(
																$elm$json$Json$Decode$andThen,
																function (f) {
																	return $elm$json$Json$Decode$succeed(
																		{f: f, x: x, y: y});
																},
																A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
														},
														A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
												},
												A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))));
								},
								A2(
									$elm$json$Json$Decode$field,
									'up',
									A2(
										$elm$json$Json$Decode$andThen,
										function (y) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (x) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (f) {
															return $elm$json$Json$Decode$succeed(
																{f: f, x: x, y: y});
														},
														A2($elm$json$Json$Decode$field, 'f', $elm$json$Json$Decode$float));
												},
												A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float));
										},
										A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float))))));
				},
				A2(
					$elm$json$Json$Decode$field,
					'wheel',
					A2(
						$elm$json$Json$Decode$andThen,
						function (pinchScaleForSafari) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (pinchDeltaForChrome) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (elementIdsForLastWheel) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (deltaY) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (deltaX) {
															return $elm$json$Json$Decode$succeed(
																{deltaX: deltaX, deltaY: deltaY, elementIdsForLastWheel: elementIdsForLastWheel, pinchDeltaForChrome: pinchDeltaForChrome, pinchScaleForSafari: pinchScaleForSafari});
														},
														A2($elm$json$Json$Decode$field, 'deltaX', $elm$json$Json$Decode$float));
												},
												A2($elm$json$Json$Decode$field, 'deltaY', $elm$json$Json$Decode$float));
										},
										A2(
											$elm$json$Json$Decode$field,
											'elementIdsForLastWheel',
											$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
								},
								A2($elm$json$Json$Decode$field, 'pinchDeltaForChrome', $elm$json$Json$Decode$float));
						},
						A2(
							$elm$json$Json$Decode$field,
							'pinchScaleForSafari',
							$elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
										A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$float)
									])))))))))(0)}}});}(this));