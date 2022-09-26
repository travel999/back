

const PostRepository = require('../repositories/posts.repository');


class PostService {
    postRepository = new PostRepository();
    
    
    searchKey = async (nickname,keyword,page,pageSize) => {
        
        let start = 0;
        if (page <= 0) {
            page = 1;
        } else {
            start = (page - 1) * pageSize;
        }
        // const listSize = page * pageSize;

        const posts = await this.postRepository.searchKey(nickname,keyword,start,pageSize);

        if(!posts || !posts.length){
            return {result:false, message: "검색 결과가 존재하지 않습니다." };
        }
        else{
            return posts;
        }
    }
    
    findMain = async (nickname) => {
        const posts = await this.postRepository.findMain(nickname);
        
        if(!posts || !posts.length){
            return { result:false, message: "일정을 찾을수 없습니다" };
        }

        return posts;
            
    }

    findMain2 = async (nickname) => {
        const posts = await this.postRepository.findMain2(nickname);
        
        if(!posts || !posts.length){
            return { result:false, message: "좋아요 한 일정이 없습니다" };
        }

        return posts;
            
    }

    findMain3 = async (openStatus,nickname,page,pageSize) => {
        
        let start = 0;
        if (page <= 0) {
            page = 1;
        } else {
            start = (page - 1) * pageSize;
        }
        // const listSize = page * pageSize;
                        
        const posts = await this.postRepository.findMain3(openStatus,nickname,start,pageSize);

        if (!posts || !posts.length){
            return { result:false, message: "공개된 일정이 없습니다."};
        }

        return posts;
    }
    
    
    findPost = async (postId) => {
        const post = await this.postRepository.findPost(postId);
        if(!post){
            return { errormessage: '일정을 찾을수 없습니다.' }
        }
        return post
            
    }

    createPost = async ({ nickname, title, date  }) => {
            const post = await this.postRepository.createPost({ nickname, title, date });  
            
            return post 
    }

    updatepost =  async (nickname, _id, title, date, day1, day2, day3, day4, day5, day6, day7) => {
        const targetPost = await this.postRepository.findPost(_id)
        if (!targetPost){
            return 1
            // return { message: '일정을 찾을수 없습니다.' }
        }
        if (!targetPost.nickname.includes(nickname)){
            return 2
            // { message: '수정권한이 없습니다. ' }
        }
        const filter = { _id }
        const update = { title, date, day1, day2, day3, day4, day5, day6, day7 }
        const post = await this.postRepository.updatepost(filter, update);  
        return post 
    }

    updatetitle = async (nickname, _id, title, date) => {
        const targetPost = await this.postRepository.findPost(_id)
        if (!targetPost){
            return 1
            // return { message: '일정을 찾을수 없습니다.' }
        } 
        if (!targetPost.nickname.includes(nickname)){
            return 2
            // { message: '수정권한이 없습니다. ' }
        } 
        const filter = { _id }
        const update = { title, date }
        const post = await this.postRepository.updatepost(filter, update);  
        return post 
        
        
    }

    deletepost = async ({ postId, nickname }) => {
        const targetPost = await this.postRepository.targetPost({ _id : postId });
        
        if (!targetPost) {
            return { message: '일정을 찾을수 없습니다. ' }
        }
        if (!targetPost.nickname.includes(nickname)){
            return { message: '삭제권한이 없습니다. ' }
        }
        await this.postRepository.deletepost({ _id: postId });  
        return { message: '일정을 삭제하였습니다.' }
        
        }
    
    publicPost = async ({ postId, nickname, openPublic }) =>{
        const targetPost = await this.postRepository.targetPost({ _id : postId });
        if (!targetPost) {
            return 1
            // return { message: '일정을 찾을수 없습니다.' }
        }
        if (!targetPost.nickname.includes(nickname)){
            return 2
            // return { message: '권한이 없습니다. ' }
        }
        if(openPublic){
            await this.postRepository.publicPost({ openPublic, _id : postId});  
            return { message: '일정이 공개상태로 변경되었습니다.' }
        }else{
            await this.postRepository.publicPost({ openPublic, _id : postId });  
            return { message: '일정이 비공개상태로 변경되었습니다.' }
        }
        
        
        }

    recommend = async (openStatus) => {
        const posts = await this.postRepository.recommend(openStatus);
        
        if( !posts || !posts.length){
            return {result:false, message: "공유된 일정이 없습니다"};
        }

        return posts;

    }

    invite = async ({nickname, nickname2, postId}) => {
        const targetPost = await this.postRepository.targetPost({ _id : postId });
        if(!targetPost){
            return 1
            // return { message: '일정을 찾을수 없습니다.' }
        }
        if(!targetPost.nickname.includes(nickname)){
            return 2
            // return { message: '권한이 없습니다.' }
        }
        const targetUser = await this.postRepository.findUser({ nickname })
        if(!targetUser){
            return 3
            // return { message: '존재하지 않는 닉네임입니다.'}
        }
        else{
            const post = await this.postRepository.invite({nickname2, postId})
            return post
        }

       

    }
    }


module.exports = PostService;