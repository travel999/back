
const PostRepository = require('../repositories/posts.repository');


class PostService {
    postRepository = new PostRepository();
    
    findPost = async (postId) => {
        const post = await this.postRepository.findPost(postId);
        if(!post){
            return { message: '일정을 찾을수 없습니다.' }
        }
        return post
            
    }

    createPost = async ({  nickname, title, day : [cardNum,[placeName ,locate, content]]   }) => {
        if ( !nickname || !title || !cardNum || !placeName || !locate || !content ) { 
           
            return { message: '데이터 형식이 올바르지 않습니다.' }
        }
        const post = await this.postRepository.createPost({ nickname, title, day : [cardNum,[placeName ,locate, content]]   });  
        return post
    }

    updatepost =  async ({ postId, nickname, title, day : [cardNum,[placeName ,locate, content]]   }) => {
        if ( !nickname || !title || !cardNum || !placeName || !locate || !content ) { 
            return  { message: '데이터 형식이 올바르지 않습니다.' };
        }
        const targetPost = await this.postRepository.targetPost({ _id : postId } );
        
        if (!targetPost) {
            return { message: '일정을 찾을수 없습니다. ' }
        }
        if (!targetPost.nickname.includes(nickname)){
            return { message: '수정권한이 없습니다. ' }
        }
        const post = await this.postRepository.updatepost({ _id : postId, nickname, title, day : [cardNum,[placeName ,locate, content]]   });  
        return  { message: '일정이 수정되었습니다.' }
    }

    deletepost = async ({ postId, nickname }) => {
        const targetPost = await this.postRepository.targetPost({ _id : postId } );
        
        if (!targetPost) {
            return { message: '일정을 찾을수 없습니다. ' }
        }
        if (!targetPost.nickname.includes(nickname)){
            return { message: '삭제권한이 없습니다. ' }
        }
        const post = await this.postRepository.deletepost({ _id: postId });  
        return { message: '일정을 삭제하였습니다.' }
        
        }
        
}


module.exports = PostService;