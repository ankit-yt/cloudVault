import React, { useState } from 'react'
import axios from 'axios'

function FilesUpload() {
	const [file, setFile] = useState([])
	const handleFileUpload = async () => {
		if (!file) return alert('No file selected')
		const formData = new FormData()
		file.forEach((f) => {
			formData.append('files', f)
		})
		console.log("hiiiiiii")
		const dropboxToken = localStorage.getItem('dropBoxToken');
		console.log(dropboxToken)
		console.log(formData.get('files'))
		try {
			const response = await fetch('http://localhost:3000/dropbox/upload', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('username')}`,
				},
				method: 'POST', 
				body: formData,
				
			});
			if (response.status !== 200) {
				console.log('File upload failed')
			}
			else if (response.status === 401) {
				alert('File upload failed')
			}
			else {
				alert('File uploaded successfully') 
			}
		}
		catch (error) {
			console.error('Error:', error)
			alert('Cloud error') 
        }
	}


  return (
	  <div>
		  <label  htmlFor="fileUpload">Upload File:</label>
		  <input multiple type="file" id="fileUpload" onChange={(e) => setFile(Array.from(e.target.files))} />
		  <button onClick={handleFileUpload}>Upload</button>
	  
	</div>
  )
}

export default FilesUpload
