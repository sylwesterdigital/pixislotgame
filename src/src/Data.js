/**
 *Class Data
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
        {id:1, frame:"symbol1.png", name:"9", msg1: "Just nine points", points:9, basket:10},
        {id:2, frame:"symbol2.png", name:"Wild", msg1: "This is Wild", points:100, basket:2},
        {id:3, frame:"symbol3.png", name:"Dolphin", msg1: "This is amazin Dolphin", points:200, basket:10},
        {id:4, frame:"symbol4.png", name:"Bonus", msg1: "You have a luck!", points:10000, basket:1},
        {id:5, frame:"symbol5.png", name:"10", msg1: "Just TEN points", points: 10, basket:3},
        {id:6, frame:"symbol6.png", name:"J", msg1: "J like J", points:20, basket:30},
        {id:7, frame:"symbol7.png", name:"Q", msg1: "Q like Q", points:30, basket:52},
        {id:8, frame:"symbol8.png", name:"K", msg1: "Just OK?", points:50, basket:1},
        {id:9, frame:"symbol9.png", name:"A", msg1: "A is a for loosers", points:0, basket:50},
        {id:10, frame:"symbol10.png", name:"Neo", msg1: "Simple fish", points:10000, basket:1},
        {id:11, frame:"symbol11.png", name:"Dora", msg1: "Crazy fish", points:5000, basket:3},
        {id:12, frame:"symbol12.png", name:"Sting Fish", msg1: "Can be dangerous", points:2000, basket:2}       
    ]
    
    
}

Data.prototype.hello = function(str) {
    
    console.log('hello from Data');
    
}





