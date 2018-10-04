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
           this.posts = data;
       })
    }
    
    addComment(newComment, postIndex) {
        let id = this.posts[postIndex]._id
        return $.post('/posts/' + id + '/comments', newComment).then((data)=> {
            this.posts = data;
        })
    };

    deleteComment(postIndex, commentIndex) {
        let postId = this.posts[postIndex]._id
        let commentId = this.posts[postIndex].comments[commentIndex]._id
        return $.ajax({
            method: 'DELETE',
            url: '/posts/' + postId + '/comments/' + commentId
        }).then((data)=>{
            this.posts = data;
        })
    };
}

export default PostsRepository