// import PostsRenderer from "./posts-renderer";

    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    getPosts() {
        return $.get('/posts').then((data)=> {
            this.posts = data;
        })
    }

    addPost(postText) {
        let post = { text: postText, comments: [] }
        return $.post('/posts', post).then((data)=> {
            this.posts.push(data);
        })
    }

    removePost(index) {
       let id = this.posts[index]._id
       return $.ajax({
           method: 'DELETE',
           url: '/posts/' + id,
       }).then((data)=>{
           this.posts.splice(index, 1);
       })
    }
    
    addComment(newComment, postIndex) {
        let id = this.posts[postIndex]._id
        return $.post('/posts/' + id + '/comments', newComment).then((data)=> {
            this.posts[postIndex].comments.push(newComment);
        })
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository