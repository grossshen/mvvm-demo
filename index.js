//解释一下使用_age的原因。man.age会调用age的get方法，如果get方法中return this.age的话会导致循环调用
let man = {
    age: null,
};

Object.defineProperty(man, 'age', {
    get() {
        console.log('age was got');
        return eval('this._age');
    },
    set(newVal) {
        console.log('age was modified');
        this['_age'] = newVal;
    }
});
// 自动将object转为可观测对象
let car = {
    price: 2000,
    brand: 'bmw'
};

function observable(obj) {
    if (!obj || typeof obj != 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    });
    return obj;
}

function defineReactive(obj, key, val) {
    obj['_' + key] = val;
    Object.defineProperty(obj, key, {
        get() {
            console.log(key + ' was got');
            return this['_' + key];
        },
        set(newVal) {
            console.log(key + ' was set');
            this['_' + key] = newVal;
        }
    })
}

observable(car);

// 创造消息订阅者/消息订阅者的集合
class SubContainer{
    constructor(){
        this.subs = [];
    }

    addSum(sub) {
        this.subs.push(sub);
    }

    notify(){
        this.subs.forEach((sub)=>{
            sub.update();
        })
    }
}