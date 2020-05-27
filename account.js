function test() {
    var zipcode = document.getElementById("zipcode").value;
    var distance = document.getElementById("distance").value;
    var type = document.getElementById("type").value;
    var gender = document.getElementById("gender").value;
    var size = document.getElementById("size").value;
    var age = document.getElementById("age").value;

    // array of serach items is returned for breed, color, coat
    var breed = $('#breed').val();
    var color = $('#color').val();
    var coat = $('#coat').val();

    var good_with_cats = document.getElementById("good_with_cats").checked;
    var good_with_dogs = document.getElementById("good_with_dogs").checked;
    var good_with_children = document.getElementById("good_with_children").checked;


    //console.log("name: " + name);
    //console.log("email: " + email);
    //console.log("comments: " + comments);
    //console.log("newsletter: " + newsletter);

    // testing: 
    alert("Zipcode: " + zipcode + " distance: " + distance + " type: " + type 
    + " gender: " + gender + " size: " + size + " age: " + age + " good with cats: " + good_with_cats
    + " good with dogs: " + good_with_dogs + " good with children: " + good_with_children
    + " breeds: " + breed + " colors: " + color + " coats: " + coat);
}

