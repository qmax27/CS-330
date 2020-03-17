<<<<<<< HEAD
/*jshint esversion: 8 */
/*jshint node: true */
/*jshint jquery: true */
/* jshint browser: true */

'use strict';


=======
/* jshint esversion: 8 */
/* jshint node: true */
/* jshint jquery: true */
'use strict';

>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json));

async function getData(url) {
    // return fetch(url, {mode: 'no-cors'})
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function populate() {
<<<<<<< HEAD
    // let [posts, users, comments] = await Promise.all([
    //     getData("http://jsonplaceholder.typicode.com/posts"),
    //     getData("http://jsonplaceholder.typicode.com/users"),
    //     getData("http://jsonplaceholder.typicode.com/comments")
    // ]);

    let [posts] = await Promise.all([
        getData("http://jsonplaceholder.typicode.com/posts")
    ]);

    console.log(posts);

=======
    let posts = await fetch("http://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .catch(error => console.log(error));

    let [users, comments] = await Promise.all([
        getData("http://jsonplaceholder.typicode.com/users"),
        getData("http://jsonplaceholder.typicode.com/comments")
    ]);

>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
    let allPostsDiv = document.querySelector("#posts");

    for (let p of posts) {
        let p_id = p["id"];
        let p_user = p.user;
        let p_title = p.title;
        let p_body = p.body;
<<<<<<< HEAD
        let postDiv = document.createElement("div");
=======
        
        let postDiv = document.createElement("div");
        postDiv.classList = "container border rounded mt-3";
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
        postDiv.innerHTML = p_body;
        allPostsDiv.appendChild(postDiv);
    }
}

<<<<<<< HEAD
$(document).ready(function () {
    populate();
});
=======
$(document).ready(function() {
    populate();
});
>>>>>>> cea0dc56332c93aeed7190b701acfdeaba323862
