import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({buttonClicked, inputChange}) =>{
	return (
		<div>
			<p className="f3">
				This app would detect faces in images. Give it a shot!
			</p>
			<div className="center">
				<div className = "form center pa4 br3 shadow-5">
					<input className="f4 pa2 w-70 center" type="text" onChange = { inputChange } />
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light purple" onClick={ buttonClicked }>Detect</button>
				</div>
			</div>

		</div>
	)
}

export default ImageLinkForm;