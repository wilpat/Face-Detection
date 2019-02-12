import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({buttonClicked, inputChange}) =>{
	return (
		<div>
			<p className="f4">
				This app would detect faces in images. Give it an image url!
			</p>
			<div className="center">
				<div className = "form center pa4 br3 shadow-5">
					<input className="f4 pa2 w-70 center" type="text" onChange = { inputChange } />
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light purple" onClick={ buttonClicked }>Detect</button>
				</div>
			</div>
			<p className="f6">
				I know you'd rather a click to upload button, i know please don't stress me :/
			</p>
		</div>
	)
}

export default ImageLinkForm;