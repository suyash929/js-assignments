'use strict';

var assert = require('assert');
var tasks = require('../task/08-objects-tasks');
it.optional = require('../extensions/it-optional');

describe('08-objects-tasks', function() {

    it.optional('Rectangle constructor should return the rectangle object', function () {
        var rect = new tasks.Rectangle(10,20);

        assert.equal(
            typeof rect,
            'object',
            'Result of Rectangle constructor should be an object'
        );
        assert(
            rect.hasOwnProperty('width'),
            'Result of Rectangle constructor should be an object with "width" property'
        );
        assert.equal(
            rect.width,
            10,
            'Result of new Rectangle(10,20) should be an object with "width" property equals to 10'
        );
        assert(
            rect.hasOwnProperty('height'),
            'Result of new Rectangle(10,20) should be an object with "height" property'
        );
        assert.equal(
            rect.width,
            10,
            'Result of new Rectangle(10,20) should be an object with "height" property equals to 20'
        );
        assert.equal(
            typeof rect.getArea,
            'function',
            'Result of Rectangle constructor should be an object with "getArea" method'
        );
        assert.equal(
            rect.getArea(),
            200,
            'Result of (new Rectangle(10,20)).getArea() should return the correct area of specified rectangle'
        );
        assert.equal(
            (new tasks.Rectangle(3,8)).getArea(),
            24,
            'Result of (new Rectangle(3,8)).getArea() should return the correct area of specified rectangle'
        );
    });


    it.optional('getJSON should return the JSON representation of specified object', function () {
        [
            {
                obj: [ 1, 2, 3],
                expected: '[1,2,3]'
            },{
                obj: { height: 10, width: 20 },
                expected: '{"height":10,"width":20}'
            }
        ].forEach(data => {
            assert.equal(
                tasks.getJSON(data.obj),
                data.expected
            );
        });
    });


    it.optional('fromJSON should return the object of specified type from JSON representation', function () {
        var MockType = function(a,b,c) {
            this.a = a;
            this.b = b;
            this.c = c;
        };

        [
            {
                proto: tasks.Rectangle.prototype,
                json: '{ "width":10, "height":20 }',
                expected: new tasks.Rectangle(10, 20)
            },{
                proto: MockType.prototype,
                json: '{ "a":10, "b":20, "c":30 }',
                expected: new MockType(10,20,30)
            }
        ].forEach(data => {
            var actual = tasks.fromJSON(data.proto, data.json);
            assert.deepEqual(
                actual,
                data.expected,
                'fromJson method shoud restore all properties from json'
            );
            assert.equal(
                actual.__proto__,
                data.expected.__proto__,
                'fromJson method shoud restore type from prototype argument'
            );
        });
    });

});
