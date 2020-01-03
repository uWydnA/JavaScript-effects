var map = document.querySelector(".map");
var game = document.querySelector(".game");
var startbtn = document.querySelector(".start .btn")
var startdiv = document.querySelector(".start");
var score = document.querySelector(".score");
var plane = document.querySelector(".plane");
var scores = 0;
var t1;
var backgroundPositionY = 0;
var flag = 0;
var flag1 = 0;
var bullets = [];
var enemeys = [];
document.onmousedown = function (eve) {
    var e = eve || window.event;
    e.preventDefault();
}

function random(a, b) {
    return Math.round(Math.random() * (a - b) + b);
}

function start() {
    flag++;
    new Map();
    new Plane();
    if (flag % 3 == 0) {
        bullets.push(new Bullet(parseInt(plane.style.left) + 31, parseInt(plane.style.top) - 10, 6, 14));
    }
    if (flag % 20 == 0) {
        flag1++;
        flag = 0;
        if (flag1 % 5 == 0) {
            enemeys.push(new Enemey(0, 0, 46, 60, "image/enemy3_fly_1.png", "image/中飞机爆炸.gif", 3))
        }
        if (flag1 == 20) {
            enemeys.push(new Enemey(1, 0, 110, 164, "image/enemy2_fly_1.png", "image/大飞机爆炸.gif", 5))
            flag1 = 0;
        } else {
            enemeys.push(new Enemey(0, 0, 34, 24, "image/enemy1_fly_1.png", "image/小飞机爆炸.gif", 1))
        }
    }
    var bulletslen = bullets.length;
    for (var i = 0; i < bulletslen; i++) {
        bullets[i].bulletMove();
        if (bullets[i].bullet.offsetTop <= 0) {
            bullets[i].bullet.remove();
            bullets.splice(i, 1);
            bulletslen--;
        }
    }
    var enemeyslen = enemeys.length;
    for (var j = 0; j < enemeyslen; j++) {
        enemeys[j].enemeyMove();
        if (enemeys[j].enemey.offsetTop >= game.offsetHeight) {
            enemeys[j].enemey.remove();
            enemeys.splice(j, 1);
            enemeyslen--;
        }
        if (enemeys[j].del == true) {
            enemeys[j].count += 10;
            if (enemeys[j].count == enemeys[j].deltime) {
                enemeys[j].enemey.remove();
                enemeys.splice(j, 1);
                enemeyslen--;
            }
        }
    }
    for (var k = 0; k < bulletslen; k++) {
        for (var l = 0; l < enemeyslen; l++) {
            if ((bullets[k].bullet.offsetLeft + bullets[k].SIZEX > enemeys[l].enemey.offsetLeft) && (bullets[k].bullet.offsetLeft < enemeys[l].enemey.offsetLeft + enemeys[l].SIZEX)) {
                if (bullets[k].bullet.offsetTop <= enemeys[l].enemey.offsetTop + enemeys[l].SIZEY) {
                    enemeys[l].hp = enemeys[l].hp - bullets[k].bulletattach;
                    if (enemeys[l].hp == 0) {
                        enemeys[l].enemey.src = enemeys[l].deadimg;
                        enemeys[l].speed = 0;
                        enemeys[l].del = true;
                    }
                    bullets[k].bullet.remove();
                    bullets.splice(k, 1);
                    bulletslen--;
                    break;
                }
            }
        }
    }
}

function begin() {
    startdiv.style.display = "none";
    game.style.display = "block";
    score.style.display = "block";
    t1 = setInterval(start, 30);
}

function Map() {
    this.game = document.querySelector(".game");
    this.backgroundPositionY = backgroundPositionY;
    this.mapMove()
}
Map.prototype.mapMove = function () {
    game.style.backgroundPositionY = backgroundPositionY + "px";
    backgroundPositionY += 4;
    if (backgroundPositionY == this.game.offsetHeigh) {
        backgroundPositionY = 0;
    }
}

function Plane() {
    this.plane = document.querySelector(".plane");
    this.map = document.querySelector(".map");
    this.game = document.querySelector(".game");
    this.plane.x = parseInt(getComputedStyle(this.plane).left);
    this.plane.y = parseInt(getComputedStyle(this.plane).top);
    this.planeMove();
}
Plane.prototype.planeMove = function () {
    var that = this;
    this.game.onmousemove = function (eve) {
        var e = eve || window.event;
        that.plane.x = e.clientX - that.map.offsetLeft - that.plane.offsetWidth / 2;
        that.plane.y = e.clientY - that.plane.offsetHeight / 2;
        if (that.plane.x >= that.map.offsetWidth - that.plane.offsetWidth) {
            that.plane.x = that.map.offsetWidth - that.plane.offsetWidth
        }
        if (that.plane.x <= 0) {
            that.plane.x = 0;
        }
        if (that.plane.y >= that.map.offsetHeight - that.plane.offsetHeight) {
            that.plane.y = that.map.offsetHeight - that.plane.offsetHeigh;
        }
        if (that.plane.y <= 0) {
            that.plane.y = 0;
        }
        that.plane.style.left = that.plane.x + "px"
        that.plane.style.top = that.plane.y + "px"
    }
}

function Bullet(X, Y, SIZEX, SIZEY) {
    this.game = document.querySelector(".game");
    this.plane = document.querySelector(".plane");
    this.bullet = document.createElement("img");
    this.bullet.className = "bullet";
    this.bulletattach = 1;
    this.speed = 20;
    this.bulletx = X;
    this.bullety = Y;
    this.SIZEX = SIZEX;
    this.SIZEY = SIZEY;
    this.bullet.style.width = this.SIZEX + "px";
    this.bullet.style.height = this.SIZEY + "px";
    this.bullet.style.left = this.bulletx + "px";
    this.bullet.style.top = this.bullety + "px";
    this.game.appendChild(this.bullet);
}
Bullet.prototype.bulletMove = function () {
    this.bullet.style.top = this.bullet.offsetTop - this.speed + "px";
}

function Enemey(X, Y, SIZEX, SIZEY, imgsrc, deadimg, hp) {
    this.game = document.querySelector(".game");
    this.enemey = document.createElement("img");
    this.enemey.x = X;
    this.enemey.y = Y;
    this.hp = hp;
    this.del = false;
    this.deltime = 200;
    this.count = 0;
    this.speed = 5;
    this.SIZEX = SIZEX;
    this.SIZEY = SIZEY;
    this.enemey.style.position = "absolute";
    this.enemey.style.left = X == 1 ? X + random(0, 210) + "px" : X + random(0, 270) + "px";
    this.enemey.style.top = Y + "px";
    this.enemey.style.width = this.SIZEX + "px";
    this.enemey.style.height = this.SIZEY + "px";
    this.enemey.src = imgsrc;
    this.deadimg = deadimg;
    this.game.appendChild(this.enemey);
}
Enemey.prototype.enemeyMove = function () {
    this.enemey.style.top = this.enemey.offsetTop + this.speed + "px";
}

startbtn.onclick = function () {
    begin();
};