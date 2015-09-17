/*
 *  Hack support for 'const'
 */

/*---
{
    "custom": true
}
---*/

/*===
123 234 357
===*/

/* Normal intended use. */

function testConstBasic() {
    const x = 123;
    var y = 234;
    print(x, y, x + y);
}

try {
    testConstBasic();
} catch (e) {
    print(e.stack || e);
}

/*===
1000 234 1234
===*/

/* The hack 'const' implementation treats a 'const' like 'var' so that the
 * constant is actually a normal variable and thus writable.
 */

function testConstWrite() {
    const x = 123;
    var y = 234;
    x = 1000;
    print(x, y, x + y);
}

try {
    testConstWrite();
} catch (e) {
    print(e.stack || e);
}

/*===
SyntaxError
===*/

/* The hack 'const' implementation requires an initializer for 'const'
 * (which is not required for 'var').
 */

function testConstNoInitializer() {
    try {
        eval('(function test() { const x; print(x); })')();
    } catch (e) {
        print(e.name);
    }
}

try {
    testConstNoInitializer();
} catch (e) {
    print(e.stack || e);
}
