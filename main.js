var SpacebookApp = function () {
  return {
    posts: [
      {
        text: "Hello world", id: 1, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      },
      {
        text: "Hello world", id: 2, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      },
      {
        text: "Hello world", id: 3, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      }
    ],

    // the current id to assign to a post
    currentId: 4,
    $posts: $('.posts'),

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },

    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId,
        comments: []
      }

      this.currentId += 1;

      this.posts.push(post);
    },

    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];

        var commentsContainer = `<div class="comments-container">
                                  <input type="text" class="comment-name">
                                  <button class="btn btn-primary add-comment">Post Comment</button> 
                                  ${this.getCommentsHTML(post)}
                                </div>`;

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>');
      }
    },

    removePost: function (postID) {

      var post = this._findPostById(postID);

      this.posts.splice(this.posts.indexOf(post), 1);
    },

    toggleComments: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    },

    createComment: function (text, postID) {
      let comment = {
        text: text,
        id: id
      }
      this._findPostById(postID).comments.push(comment)
    },

    removeComment: function () { //TODO
      
    },

    getCommentsHTML: function (post) {
      let strComment = "";
      for (let i = 0; i < post.comments.length; i++) {
        strComment += '<li>' + post.comments[i].text + '  <a href="#" class="remove-comment">remove</a>' + '</li>'
      }
      return strComment;
    }
  };
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;
  
  app.removePost(postID);
  app.renderPosts();
});

$('.posts').on('click', '.add-comment', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;
  let comment = $clickedPost.find('.comment-name').val()

  
  app.createComment(comment, postID);
  app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});
