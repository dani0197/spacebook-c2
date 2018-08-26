const posts = [];


let id = 0;

const addPost = function (text) {
    post = {
        text: text,
        id: id,
    }
    id++;
    posts.push(post)
    renderPosts();
}

const searchPost = function (id) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
            return posts[i]
        }
    }
}

const removePost = function (id) {
    let post = searchPost(id);
    posts.splice(posts.indexOf(post), 1);
}


const renderPosts = function () {
    $('.posts').empty();
    for (let i = 0; i < posts.length; i++) {
        $('.posts').append($('<p class="post" data-id=' + posts[i].id + '>' + posts[i].text + "      " + '<button type="button" class="remove">REMOVE</button>' + '</p>'))
    }

}


$('.remove').on('click', function () {
    let id = $(this).closest(".post").data("id");
    removePost(id);
    renderPosts();
})

$('.add-post').on('click', function () {
    let text = $('#post-name').val();
    addPost(text);
})








