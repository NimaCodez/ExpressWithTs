import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService {
    /**
     * Create e new post
     */
    public async createPost(title: string, body: string): Promise<Post> {
        try {
            const post = await PostModel.create({ title, body });
            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    /**
     * Get all posts
     */
    public async getPosts(): Promise<Post[]> {
        try {
            const posts = await PostModel.find({});
            return posts;
        } catch (error) {
            throw new Error('Unable to get posts');
        }
    }
}

export default PostService;
