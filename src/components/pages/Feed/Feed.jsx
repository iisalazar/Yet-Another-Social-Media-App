import React, { useContext, useEffect } from "react";
import { PostContext } from "../../../context/post";
import { AuthContext } from "../../../context/auth";
import { useHistory } from "react-router-dom";
import UserAvatar from "../../atoms/UserAvatar";
import PostItem from "../../molecules/PostItem";
import ChirpForm from "../../molecules/Chipform";
import Button from "../../atoms/Button";
import { Feed } from "../../templates";

const ads = [
	{
		name: "Benjie for President",
		meta: new Date(),
		content:
			"My ingenuity is a thrill, and I want to wake up. Seeing fine dates, you understand. #happydancing #randomtweet",
	},
	{
		name: "Sophia's B-day",
		meta: new Date(),
		content:
			"My dad is amazing, and I want to get more sleep. Let there be grand weirdness, or something. #myism #randomtweet",
	},
	{
		name: "Reamonn's Fine Art Museum",
		meta: new Date(),
		content:
			"My dad is funky, and I want to go to Mars. Let there be mail order glamour, in a way. #happyfest #randomtweet",
	},
	{
		name: "Joan's Awesome Store",
		meta: new Date(),
		content:
			"My job is a shadow, and I want to start a business. Fabulous grand trials, in the end. #randombling #randomtweet",
	},
	{
		name: "Reinalyn, Corporation",
		meta: new Date(),
		content:
			"My home is over the top, and I want to wake up. Come for the perfect glitter, my friend. #jinglerun #randomtweet",
	},
];

const Main = () => {
	const postContext = useContext(PostContext);
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const { getPosts, posts } = postContext;
	const { user } = authContext;
	useEffect(() => {
		getPosts();
		// eslint-disable-next-line
	}, []);

	const goToProfile = (email) => {
		history.push(`/profile/${email}`);
	};
	return (
		<Feed
			renderLeftContent={() => (
				<>
					<h2>Friends List</h2>
					<div className="mg-top-30">
						{user && user.friends && user.friends.length > 0 ? (
							user.friends.map((friend, idx) => (
								<UserAvatar
									onClick={() => goToProfile(friend.email)}
									key={idx}
									title={`${friend.firstName} ${friend.lastName}`}
									className="mg-top-20"
								/>
							))
						) : (
							<p>No friends {"asdadsa"} sadge </p>
						)}
					</div>
					<Button className="mg-top-30 btn btn-large btn-rounded bg-green text-white">
						Chirp
					</Button>
				</>
			)}
			renderMain={() => (
				<>
					<ChirpForm />
					{posts && posts.length > 0
						? posts.map((post, index) => (
								<PostItem
									handleAvatarClick={() => goToProfile(post.author.email)}
									key={index}
									hasLine
									title={
										post && post.author
											? `${post.author.firstName} ${post.author.lastName}`
											: "Unknown user"
									}
									// meta={post.meta.toISOString()}
									content={post.content}
								/>
						  ))
						: null}
				</>
			)}
			renderRightContent={() => (
				<>
					<h2>Promotions</h2>
					{ads.map((ad, index) => (
						<PostItem
							key={index}
							title={ad.name}
							meta={ad.meta.toISOString()}
							content={ad.content}
						/>
					))}
				</>
			)}
		/>
	);
};

export default Main;
