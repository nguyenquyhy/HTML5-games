QUnit.test("1 Circle collides with 1 ControlBar", function (assert) {
    var circle1 = new Circle(null, 0, 0, 10, 10, 1);
    var circle2 = new Circle(null, 0, 0, -10, 10, 1);
    var circle3 = new Circle(null, 0, 0, 10, -10, 1);
    var circle4 = new Circle(null, 0, 0, -10, -10, 1);
    var bar1 = new ControlBar(null, 10, 5, 0, 0, 10, 10);
    var bar2 = new ControlBar(null, -20, 5, 0, 0, 10, 10);
    var bar5 = new ControlBar(null, 10, 10, 0, 0, 10, 10);
    var bar6 = new ControlBar(null, -20, 10, 0, 0, 10, 10);
    var bar7 = new ControlBar(null, 10, -20, 0, 0, 10, 10);
    var bar8 = new ControlBar(null, -20, -20, 0, 0, 10, 10);
    //============ Edges ============
    // Left vertical
    var collision = circle1.checkCollisions(0.89, [bar1]);
    assert.equal(collision, null, 'No collision if the circle does not touch the edge of the bar during elapsed time.');
    collision = circle1.checkCollisions(0.9, [bar1]);
    assert.equal(collision, null, 'No collision if the circle just touches the edge of the bar at elapsed time.');
    collision = circle1.checkCollisions(1.0, [bar1]);
    assert.notEqual(collision, null, 'Collision of the circle with the edge of the bar.');
    assert.equal(collision.time, 0.9, 'Collision of the circle with the edge of the bar after 0.9 second.');
    assert.equal(collision.normal.toString(), "-1 0", 'Collision of the circle with the left vertical edge with normal=(-1,0).');
    // Right vertical
    collision = circle1.checkCollisions(0.89, [bar2]);
    assert.equal(collision, null, 'No collision if the circle does not touch the edge of the bar during elapsed time.');
    collision = circle2.checkCollisions(0.9, [bar2]);
    assert.equal(collision, null, 'No collision if the circle just touches the edge of the bar at elapsed time.');
    collision = circle2.checkCollisions(1.0, [bar2]);
    assert.notEqual(collision, null, 'Collision of the circle with the edge of the bar.');
    assert.equal(collision.time, 0.9, 'Collision of the circle with the edge of the bar after 0.9 second.');
    assert.equal(collision.normal.toString(), "1 0", 'Collision of the circle with the right vertical edge with normal=(1,0).');
    //============ Corners ============
    // Top left
    collision = circle1.checkCollisions(0.89, [bar5]);
    assert.equal(collision, null, 'No collision if the circle does not touch the corner of the bar during elapsed time.');
    collision = circle1.checkCollisions(0.9, [bar5]);
    assert.equal(collision, null, 'No collision if the circle just touches the corner of the bar at elapsed time.');
    collision = circle1.checkCollisions(1.0, [bar5]);
    assert.notEqual(collision, null, 'Collision of the circle with the corner of the bar.');
    assert.equal(collision.time, 0.9292893218813453, 'Collision of the circle with the corner of the bar after 0.9 second.');
    assert.equal(collision.normal.toString(), "-1 -1", 'Collision of the circle with the top left corner with normal=(-1,-1).');
    // Top right
    collision = circle2.checkCollisions(0.89, [bar6]);
    assert.equal(collision, null, 'No collision if the circle does not touch the corner of the bar during elapsed time.');
    collision = circle2.checkCollisions(0.9, [bar6]);
    assert.equal(collision, null, 'No collision if the circle just touches the corner of the bar at elapsed time.');
    collision = circle2.checkCollisions(1.0, [bar6]);
    assert.notEqual(collision, null, 'Collision of the circle with the corner of the bar.');
    assert.equal(collision.time, 0.9292893218813453, 'Collision of the circle with the corner of the bar after 0.9 second.');
    assert.equal(collision.normal.toString(), "1 -1", 'Collision of the circle with the top right corner with normal=(1,-1).');
    // Bottom left
    collision = circle3.checkCollisions(0.89, [bar7]);
    assert.equal(collision, null, 'No collision if the circle does not touch the corner of the bar during elapsed time.');
    collision = circle3.checkCollisions(0.9, [bar7]);
    assert.equal(collision, null, 'No collision if the circle just touches the corner of the bar at elapsed time.');
    collision = circle3.checkCollisions(1.0, [bar7]);
    assert.notEqual(collision, null, 'Collision of the circle with the corner of the bar.');
    assert.equal(collision.time, 0.9292893218813453, 'Collision of the circle with the corner of the bar after 0.9 second.');
    assert.equal(collision.normal.toString(), "-1 1", 'Collision of the circle with the bottom left corner with normal=(-1,1).');
    // Bottom right
    collision = circle4.checkCollisions(0.89, [bar8]);
    assert.equal(collision, null, 'No collision if the circle does not touch the corner of the bar during elapsed time.');
    collision = circle4.checkCollisions(0.9, [bar8]);
    assert.equal(collision, null, 'No collision if the circle just touches the corner of the bar at elapsed time.');
    collision = circle4.checkCollisions(1.0, [bar8]);
    assert.notEqual(collision, null, 'Collision of the circle with the corner of the bar.');
    assert.equal(collision.time, 0.9292893218813453, 'Collision of the circle with the corner of the bar after 0.9 second.');
    assert.equal(collision.normal.toString(), "1 1", 'Collision of the circle with the bottom right corner with normal=(1,1).');
});
