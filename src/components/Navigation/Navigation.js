import React from 'react';

const Navigation = ({ routeChange, route }) =>{
	return (
			route === 'home' ?
				<nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick ={ () => routeChange('signin') } className="f3 link dim black underline p3 pointer">
						Sign out
					</p>
				</nav>
				:
				<nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick ={ () => routeChange('signin') } className="f3 link dim black underline p3 pointer">
					Sign In</p>
					<p onClick ={ () => routeChange('register') } className="f3 ml3 link dim black underline p3 pointer">
					Register</p>
				</nav>

			
	)
}

export default Navigation;