
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

    updatepost =  async ({ _id, nickname, title, day : [cardNum,[placeName ,locate, content]]   }) => {
        if ( !nickname || !title || !cardNum || !placeName || !locate || !content ) { 
            return  { message: '데이터 형식이 올바르지 않습니다.' };
        }
        // const targetPost = await this.postRepository.targetPost({ _id, nickname } );
        // if (!targetPost) {
        //     return { message: '일정 수정에 실패하였습니다.' }
        // }
        const post = await this.postRepository.updatepost({ _id, nickname, title, day : [cardNum,[placeName ,locate, content]]   });  
        return  { message: '일정이 수정되었습니다.' }
    }

    deletepost = async ({ _id, nickname }) => {
        const targetPost = await this.postRepository.targetPost({ _id, nickname } );
        if (!targetPost) {
            return { message: '일정 삭제에 실패하였습니다.' }
        }
        const post = await this.postRepository.deletepost({ _id });  
        return { message: '일정을 삭제하였습니다.' }
        
        }
        
}


module.exports = PostService;