
const PostService = require('../services/posts.service');

class PostsController {
    postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.


    search = async (req, res, next) => {
        const { keyword } = req.params;
        const { page } = req.params;
        const { nickname } = res.locals.user;
        const pageSize = 7;
        const posts = await this.postService.searchKey(nickname, keyword, page, pageSize);

        try{
            if (posts.result === false) {
                return res.status(200).json({ data: posts });
            }
            else {
                return res.status(200).json({ data: posts });
            }
        }catch(err){
            return res.status(400).json({result:false, message: "통신 오류"});
        }
        
    }


    //메인페이지 게시글 조회
    getMain = async (req, res, next) => {
        const { nickname } = res.locals.user;
        const { page } = req.params;
        const pageSize = 7;
        const openStatus = true;
        try {
            const posts = await this.postService.findMain(nickname);
            const likedPosts = await this.postService.findMain2(nickname);
            const openPosts = await this.postService.findMain3(openStatus, nickname, page, pageSize);
            res.status(200).json({ data1: posts, data2: likedPosts, data3: openPosts });
        } catch (error) {
            res.status(400).json({ statusCode: "400: 정보 호출 오류" });
        }

    }


    //일정 조회
    getPost = async (req, res, next) => {
        const { postId } = req.params;
        const posts = await this.postService.findPost(postId);
        if (posts.errormessage){
            return res.status(400).json({posts})
        }else{
            res.status(200).json({ data: posts })
        }
        
    }

    //일정 초기 생성
    createPost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { title, date } = req.body;
            if ( !title || !date ) {
                res.status(400).json({ message: '제목 및 날짜를 입력해주세요' });
            }else{
                const createPostData = await this.postService.createPost({nickname, title, date });
                res.status(200).json({ postId : createPostData._id, title : createPostData.title, date : createPostData.date });
            }
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    //일정 수정
    updatePost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const _id = req.params.postId
            const { title, date, day1, day2, day3, day4, day5, day6, day7  } = req.body;
            const updateData = await this.postService.updatepost(nickname, _id, title, date, day1, day2, day3, day4, day5, day6, day7)
            if (updateData === 1){
                res.status(400).json({ message: '일정을 찾을수 없습니다.' })
            }else if(updateData === 2){
                res.status(400).json({ message: '수정권한이 없습니다.' })
            }else{
                res.status(200).json( updateData );
            }
        } catch (err) {
            console.log(err)
            err.status = 400
            next(err);
        }

    }
    //일정 수정 (날짜,제목)
    updateTitle = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const _id = req.params.postId
            const { title, date } = req.body;
            const updateData = await this.postService.updatetitle(nickname, _id, title, date)
            if (updateData === 1){
                res.status(400).json({ message: '일정을 찾을수 없습니다.' })
            }else if(updateData === 2){
                res.status(400).json({ message: '수정권한이 없습니다.' })
            }else{
                res.status(200).json( updateData );
            }
        } catch (err) {
            console.log(err)
            err.status = 400
            next(err);
        }

    }
    //일정 삭제
    deletePost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { postId } = req.params;
            const deleteData = await this.postService.deletepost({ postId, nickname })
            res.status(200).json(deleteData);
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }

    }

    //일정 공개/비공개
    publicPost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { postId } = req.params;
            const { openPublic } = req.body;
            const publicData = await this.postService.publicPost({ postId, nickname, openPublic })
            if (publicData == 1) {
                res.status(400).json({ message: '일정을 찾을수 없습니다.' });
            } else if (publicData == 2) {
                res.status(400).json({ message: '권한이 없습니다.' })
            } else {
                res.status(200).json(publicData);
            }
        } catch (err) {
            console.log(err)
            err.status = 400
            next(err);
        }

    }

    recommendation = async (req, res, next) => {
        const openStatus = true;
        const posts = await this.postService.recommend(openStatus);

        if (posts.result === false) {
            return res.status(400).json(posts);
        }
        else {
            return res.status(200).json({ data: posts });
        }
    }

    invitePost = async(req, res, next) => {
        try {
            const { nickname } = res.locals.user;
            const { postId } = req.params;
            const { nickname2 } = req.body;
            const post = await this.postService.invite({ postId, nickname, nickname2 })
            if (post === 1){
                res.status(400).json({ message: '일정을 찾을수 없습니다.' })
            }else if(post === 2){
                res.status(400).json({ message: '권한이 없습니다.' })
            }else if(post === 3){
                res.status(400).json({ message: '존재하지 않는 닉네임입니다.'})
            }else{
                res.status(200).json({ message: `${nickname2}님을 일정에 초대하엿습니다.`, });
            }

        } catch (err) {
            console.log(err)
            err.status = 400
            next(err);
        }
    }

    

}

module.exports = PostsController;