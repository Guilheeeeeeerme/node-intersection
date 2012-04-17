var intersection = require('../index');

exports.descriptionTest = function(test) {
    var seg1 = {start:{x:3,y:0},end:{x:3,y:4}};
    
    // colinear with seg1
    var seg1a = {start:{x:3,y:-2},end:{x:3, y:9}}; 

    // parallel but not colinear with seg1
    var seg1b = {start:{x:1, y:-1}, end:{x:1, y:5}};

 
    var seg2 = {start:{x:-1,y:2}, end:{x:5,y:2}};
    var seg3 = {start:{x:1,y:-1}, end:{x:4,y:4}};
    
    test.expect(3);
    test.deepEqual({colinear:false, parallel:false, intersection:{x:3,y:2}},intersection.descriptionSegments(seg1,seg2));
    test.deepEqual({colinear:true, parallel:true,intersection:undefined}, intersection.descriptionSegments(seg1,seg1a));
    test.deepEqual({colinear:false, parallel:true,intersection:undefined}, intersection.descriptionSegments(seg1,seg1b));
    test.done();
};

exports.basicTest = function(test) {
    var seg1 = {start:{x:3,y:0},end:{x:3,y:4}};
    var seg2 = {start:{x:-1,y:2}, end:{x:5,y:2}};
    var seg3 = {start:{x:1,y:-1}, end:{x:4,y:4}};

    var res1 = { x: 3, y: 2 };
    var res2 = { x: 3, y: 2.3333333333333335 };
    var res3 = { x: 2.8, y: 2 };

    test.expect(4);
    var i1 = intersection.intersectSegments(seg1,seg2);
    var i2 = intersection.intersectSegments(seg1,seg3);
    var i3 = intersection.intersectSegments(seg2,seg3);
    test.deepEqual(res1, i1);
    test.equal(res2.x, i2.x);
    test.equal(res2.y.toFixed(3), i2.y.toFixed(3));
    test.deepEqual(res3, i3);
    test.done();
};


exports.safeIntersectionTest = function(test) {
    var seg1 = {start:{x:3,y:0},end:{x:3,y:4}};
    
    // colinear with seg1
    var seg1a = {start:{x:3,y:-2},end:{x:3, y:9}}; 

    // parallel but not colinear with seg1
    var seg1b = {start:{x:1, y:-1}, end:{x:1, y:5}};

 
    var seg2 = {start:{x:-1,y:2}, end:{x:5,y:2}};
    test.expect(3);
    test.equal(false, intersection().safeIntersect(seg1,seg1a)); 
    test.equal(false, intersection().safeIntersect(seg1,seg1b)); 
    test.deepEqual({x:3,y:2}, intersection().safeIntersect(seg1,seg2));
    test.done();
};
