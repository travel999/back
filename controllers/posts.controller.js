
const PostService = require('../services/posts.service');

class PostsController {
    postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

    
    search = async (req,res,next) => {
        const {keyword} = req.params;
        const { page } = req.params;
        const pageSize = 7;
        const posts = await this.postService.searchKey(keyword,page,pageSize);

        if(posts.result === false ){
            return res.status(400).json({ data:posts, message: "해당 정보가 존재하지 않습니다" });
        }
        else{
            return res.status(200).json({data:posts});
        }
    }
    
    
    //메인페이지 게시글 조회
    getMain = async (req, res, next) => {
        const { nickname } = res.locals.user;
        const { page } = req.params;
        const pageSize = 7;
        const openStatus = true;
        try{
            const posts = await this.postService.findMain(nickname);
            const likedPosts = await this.postService.findMain2(nickname);
            const openPosts = await this.postService.findMain3(openStatus,page,pageSize);
            res.status(200).json({ data1: posts, data2:likedPosts, data3:openPosts });
        }catch(error){
            res.status(400).json({statusCode: "400: 정보 호출 오류"});
        }
        
    }
        
    
    //일정 조회
    getPost = async (req, res, next) => {
        const { postId } = req.params;
        const posts = await this.postService.findPost(postId);
        res.status(200).json({ data: posts })
    }

    //일정 생성
    createPost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user
            const { nickname2, title, day: [cardNum, [placeName, locate, content]] } = req.body;
            
            const createPostData = await this.postService.createPost({ nickname : [nickname].concat(nickname2), title, day: [cardNum, [placeName, locate, content]] });

            res.status(201).json({ data: createPostData });
            

        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }
    }

    //일정 수정
    updatePost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { postId }= req.params;
            const { nickname2, title, day: [cardNum, [placeName, locate, content]] } = req.body;
            const updateData = await this.postService.updatepost({ postId, nickname : [nickname].concat(nickname2), title, day: [cardNum, [placeName, locate, content]] });
            res.status(201).json( updateData );
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }

    }

    //일정 삭제
    deletePost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { postId }= req.params;
            const deleteData = await this.postService.deletepost({ postId, nickname })
            res.status(201).json( deleteData );
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }

    }

    //일정 공개/비공개
    publicPost = async (req, res, next) => {
        try{
            const { nickname } = res.locals.user;
            const { postId }= req.params;
            const { openPublic } = req.body;
            const publicData = await this.postService.publicPost({ postId, nickname, openPublic })
            if (publicData == 1 ){
                res.status(400).json( { message: '일정을 찾을수 없습니다.' } );
            }else if(publicData == 2 ){
                res.status(400).json( { message: '권한이 없습니다.' } )
            }else{
                res.status(200).json( publicData );
            }
        }catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }
        
    }

    recommendation = async (req,res,next) => {
        const openStatus = true;
        const posts = await this.postService.recommend(openStatus);

        if(posts.result === false){
            return res.status(400).json(posts);
        }
        else{
            return res.status(200).json({data:posts});
        }
    }

}

module.exports = PostsController;