define([], function () {
    class Move {
        init(options) {
            this.dom = options.dom;
            this.data = options.data;
            this.end = options.end;
            this.display();
        }
        display() {
            clearInterval(this.dom.t);
            this.dom.t = setInterval(() => {
                var onoff = true;
                for (var i in this.data) {
                    var iNow = parseInt(this.getStyle(this.dom, i));
                    var speed = (this.data[i] - iNow) / 3;
                    speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
                    (this.data[i] != iNow) && (onoff = false);
                    this.dom.style[i] = iNow + speed + "px";
                }
                if (onoff) {
                    clearInterval(this.dom.t);
                    this.end && this.end();
                }
            }, 30);
        }
        getStyle(dom, attr) {
            if (getComputedStyle) {
                return getComputedStyle(dom, false)[attr];
            } else {
                return dom.currentStyle[attr];
            }
        }
    }
    return Move;
})