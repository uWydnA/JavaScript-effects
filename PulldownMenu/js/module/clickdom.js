define(["js/module/move"], function (move) {
    class Click {
        init(options) {
            this.dom = options.dom;
            this.flag = options.flag;
            this.shownum = options.shownum;
            this.move = new move;
            this.addEvent();
        }
        addEvent() {
            var that = this;
            let arr = [];
            if (this.dom.length > 1) {
                for (var i of this.dom) {
                    arr.push(i);
                }
                for (var i of arr) {
                    i.onclick = function () {
                        if (this.count == undefined || this.count == 1) {
                            this.count = 0;
                            var atwo = document.querySelectorAll(".two")
                            that.show(this)
                            that.showNum((atwo[this.getAttribute("index")]).children)
                        } else {
                            this.count = 1;
                            that.hide(this)

                        }
                    }
                }
            } else {
                this.dom.onclick = function () {
                    if (that.flag == 1) {
                        let index = 0;
                        var ali = document.querySelectorAll(".box li");
                        for (var i = that.shownum; i < ali.length; i++) {
                            let nowlong = 0;
                            let moveli = new move;
                            nowlong = ali[i].children[0]
                                .offsetHeight;
                            moveli.init({
                                dom: ali[i],
                                data: {
                                    height: nowlong
                                },
                                end: function () {
                                    this.dom.style.height = "auto"
                                }
                            })

                        }
                        this.style.display = "none"
                    }
                }
            }

        }
        hide(dom) {
            let index = dom.getAttribute("index");
            if (this.flag) {
                var now = document.querySelectorAll(".one")[index];
                this.move.init({
                    dom: now.nextElementSibling,
                    data: {
                        height: 0,
                    }
                })

            }

        }
        show(dom) {
            var that = this;
            let index = dom.getAttribute("index");
            if (this.flag) {
                var now = document.querySelectorAll(".one")[index];
                let nowlong = 0;
                for (var i of now.nextElementSibling.children) {
                    if (i.getAttribute("index") >= this.shownum) {
                        break;
                    }
                    nowlong += i.offsetHeight;
                }
                var check;
                if (now.nextElementSibling.children[2].className != "cheacked") {
                    check = document.createElement("b");
                } else {
                    check = now.nextElementSibling.children[2];
                }
                var atwo = document.querySelectorAll(".two")
                check.className = "cheacked";
                check.innerHTML = `<p>查看剩余${2}级标题</p>`;
                atwo[index].insertBefore(check, atwo[index].children[this.shownum]);
                nowlong += 45;
                this.move.init({
                    dom: now.nextElementSibling,
                    data: {
                        height: nowlong,
                    },
                    end: function () {
                        var i = this.dom.children[2];
                        i.onclick = function () {
                            let index = 0;
                            var atwo = this.parentNode.children;
                            let arr = [];
                            for (var i = 0; i < atwo.length; i++) {
                                if (i != 2) {
                                    arr.push(atwo[i])
                                }
                            }
                            for (var i = that.shownum; i < arr.length; i++) {
                                let nowlong = 0;
                                let moveli = new move;
                                nowlong = arr[i]
                                    .offsetHeight;
                                moveli.init({
                                    dom: arr[i],
                                    data: {
                                        height: nowlong
                                    },
                                    end: function () {

                                    }
                                })
                            }
                            this.style.display = "none"
                            this.parentNode.style.height = "auto"
                        }
                    }
                });
            }
        }
        showNum(dom) {
            for (var i = this.shownum; i < dom.length; i++) {
                dom[i].style.height = 0;
            }
        }
    }
    return Click;
})