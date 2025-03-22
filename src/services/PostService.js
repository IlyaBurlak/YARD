class PostService {
    constructor(apiClient, storage) {
        this.apiClient = apiClient;
        this.storage = storage;
    }

    async getPost(id) {
        const apiData = await this.apiClient.get(`/posts/${id}`);
        const localData = this.storage.getItem(`post-${id}`);
        return localData ? {...apiData.data, ...JSON.parse(localData)} : apiData.data;
    }

    async savePost(id, data) {
        this.storage.setItem(`post-${id}`, JSON.stringify(data));
        return { ...data, id };
    }

    async getPaginatedPosts(page, limit = 10) {
        const response = await this.apiClient.get(`/posts`, {
            params: {
                _page: page,
                _limit: limit
            }
        });
        const total = parseInt(response.headers['x-total-count'], 10) || 0;
        const posts = response.data.map(post => {
            const localData = this.storage.getItem(`post-${post.id}`);
            return localData ? {...post, ...JSON.parse(localData)} : post;
        });
        return { posts, total };
    }
}

export default PostService;