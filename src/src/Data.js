/**
 *Class Styles
 */
function Data() {

    // symbols data
    
    this.gamename = "Pixi Slot Test 1";
    this.author = "Sylwester K. Mielniczuk - flaboy.com@gmail.com";
    
    this.gamerounds = 10;
    
    this.inam = "symbol";
    this.msg1 = "You are the winner";
    this.msg2 = "Points"
    
    this.sc = {} 

    
    this.items = [
        {id:1, name:"9", msg1: "Just nine points", points:9, basket:3},
        {id:2, name:"Wild", msg1: "This is Wild", points:100, basket:2},
        {id:3, name:"Dolphin", msg1: "This is amazin Dolphin", points:200, basket:1},
        {id:4, name:"Bonus", msg1: "You have a luck!", points:10000, basket:1},
        {id:5, name:"10", msg1: "Just TEN points", points: 10, basket:3},
        {id:6, name:"J", msg1: "J like J", points:20, basket:3},
        {id:7, name:"Q", msg1: "Q like Q", points:30, basket:2},
        {id:8, name:"K", msg1: "Just OK?", points:50, basket:1},
        {id:9, name:"A", msg1: "A is a for loosers", points:0, basket:2},
        {id:10, name:"Neo", msg1: "Simple fish", points:10000, basket:1},
        {id:11, name:"Dora", msg1: "Crazy fish", points:5000, basket:3},
        {id:12, name:"Sting Fish", msg1: "Can be dangerous", points:2000, basket:2}       
    ]
    
    
}

Data.prototype.hello = function(str) {
    
    console.log('hello from Data');
    
}

