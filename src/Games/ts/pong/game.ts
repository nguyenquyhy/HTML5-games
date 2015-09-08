var lastUpdate;

function tick() {
    var now = Date.now();

    if (lastUpdate) {
        var elapsed = (now - lastUpdate) / 1000;
        lastUpdate = now;

        update(elapsed);

        render(elapsed);
    } else {
        lastUpdate = now;
    }

    window.requestAnimationFrame(tick);
}

function update(elapsed: number) {

}

function render(elapsed: number) {

}

tick();