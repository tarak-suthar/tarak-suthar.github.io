import "./ProfileBar.css"
export default function ProfileBar({user}){
    return(
        <div className="top-container">
			<img src="https://i.imgur.com/G1pXs7D.jpg" className="img-fluid profile-image" width="50" />
			<div className="user-info">
				<h5 className="name">{user.name}</h5>
				<p className="mail">{user.email}</p>
			</div>
		</div>
    )   
}