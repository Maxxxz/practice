var inversify = require("inversify");
require("reflect-metadata");

var TYPES = {
    Ninja: "Ninja",
    Katana: "Katana",
    Shuriken: "Shuriken"
};

class Katana {
    hit() {
        return "cut!";
    }
}

inversify.decorate(inversify.injectable(), Katana);

class Shuriken {
    throw() {
        return "hit!";
    }
}

inversify.decorate(inversify.injectable(), Shuriken);

class Ninja {
    constructor(katana, shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() { return this._katana.hit(); };
    sneak() { return this._shuriken.throw(); };
}

inversify.decorate(inversify.injectable(), Ninja);
inversify.decorate(inversify.inject(TYPES.Katana), Ninja, 0);
inversify.decorate(inversify.inject(TYPES.Shuriken), Ninja, 1);

console.log('inversify.Container', inversify)

// 声明绑定
// var container = new inversify.Container();
// container.bind(TYPES.Ninja).to(Ninja);
// container.bind(TYPES.Katana).to(Katana);
// container.bind(TYPES.Shuriken).to(Shuriken);

// 解决依赖
// var ninja = container.get(TYPES.Ninja);
// return ninja;