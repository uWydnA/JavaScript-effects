require(["js/module/clickdom"], function (cd) {
    class Menu {
        constructor() {
            this.aonebtn = document.querySelectorAll(".onebtn");
            this.shownum = 2;
            this.hui = document.querySelector(".hui");
            this.cont = document.querySelector(".cont");
            this.ali = document.querySelectorAll(".box li");
            this.aone = document.querySelectorAll(".one")
            this.atwo = document.querySelectorAll(".two");
            this.cheack = document.querySelector(".cheack");
            this.abutton = document.querySelectorAll("button");
            this.count = 0;
            this.init();

        }
        init() {
            this.showli();
            for (let i = 0; i < this.aone.length; i++) {
                this.aone[i].setAttribute("index", i);
                this.atwo[i].setAttribute("index", i);
                this.aonebtn[i].setAttribute("index", i);
                this.ali[i].setAttribute("index", i);
                var atwo = this.aone[i].nextElementSibling.children;
                for (let j = 0; j < atwo.length; j++) {
                    atwo[j].setAttribute("index", j);
                    atwo[j].children[1].setAttribute("index1", i)
                    atwo[j].children[1].setAttribute("index2", j)
                }
            }
            this.addEvent();
        }
        addEvent() {
            var that = this;
            let cd1 = new cd;
            let cd2 = new cd;
            cd1.init({
                dom: that.cheack,
                flag: 1,
                shownum: 2
            })
            cd2.init({
                dom: that.aonebtn,
                flag: 1,
                shownum: 2
            })
            for (var i of this.abutton) {
                i.onclick = function () {
                    that.hui.style.display = "block"
                    that.cont.innerHTML = `${this.getAttribute("index1")} - ${this.getAttribute("index2")}`
                }
            }
            that.hui.onclick = function () {
                this.style.display = "none";
            }
            that.cont.onclick = function (eve) {
                var e = eve || window.event;
                e.stopPropagation();
                this.parentNode.display = "block";

            }
        }
        showli() {
            for (var i = this.shownum; i < this.ali.length; i++) {
                this.ali[i].style.height = 0;
            }
            for (var i = 0; i < this.shownum; i++) {
                this.ali[i].style.height = "auto";
            }
            this.cheack.innerHTML = `<p>查看剩余${1}级标题</p>`;
            this.cheack.style.display = "block";
        }
    }
    new Menu;
})