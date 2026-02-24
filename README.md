1. getElementById : it is used to grab a particular tag using the id name . there can only be one unique id.
getElementsByClassName: it can select every tag that has this class name 
querySelector: this grabs the first id/class it sees.
querySelectorAll: it grabs every match it finds
2. we create it with createElement, give it content, then use appendChild to attach it to a parentnode
3.if we create some boxes in html and give them smaller boxes inside then we can give it js console.log() and see that it reacts according to parent/child relation. this is event bubbling
4. we can put one listener on a parent element to manage all its children at once . its useful because it saves memory and handles future elements automatically.
5. preventDefault() works like a preventing button . it stops default job of an element. stopPropagation() stops the event buubbling of that element 
