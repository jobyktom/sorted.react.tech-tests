import React, { useEffect, useState } from "react";
import getPosts from "../../services/posts";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Lister = () => {
	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then((data) => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	const onDeletePost = (id) => {
		setPosts(allPosts.filter((post) => post.id !== id));
	};
	const onCreatePost = (post) => {
		setPosts([
			...allPosts,
			{
				...post,
				id: allPosts.length+1,
			},
		]);
	};

	return (
		<div className="postList">
			{loading && <h3>Loading...</h3>}
			{!loading && allPosts.length === 0 && <h3>No posts available...</h3>}
			<CreatePost onCreate={onCreatePost} />
			{allPosts.map((post) => {
				return (
					<Post
						{...post}
						key={post.id}
						onDelete={() => onDeletePost(post.id)}
					/>
				);
			})}
		</div>
	);
};

export default Lister;
