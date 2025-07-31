import React, { useState } from "react";
import axios from "axios";

function ViewFiles() {
    const [files, setFiles] = useState([]);

    const viewFiles = async () => {
		try {
			const response = await axios.get("http://localhost:3000/dropbox/files", {
				headers: {
					'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTk5Mzg4OGEyZjkzMzBkNWVlMDNkZSIsImlhdCI6MTc0MzM2MDkwNCwiZXhwIjoxNzQzMzY0NTA0fQ.Qzq0wuEe2A3pKREUmnxpaLw4tHW4ERuXWOi96F9J5ws
`
				}
			});
			console.log(response.data.data);
			setFiles(response.data.data);
		} catch (error) {
			console.error("Error fetching files:", error);
		}
	};
	

	const deleteFile = async (fileName) => {
        try {
            await axios.get(`http://localhost:3000/dropbox/delete/${fileName}`);
            alert("File deleted successfully");
            
            setFiles((prevFiles) => {
                const updatedFiles = { ...prevFiles };
                for (const type in updatedFiles) {
                    updatedFiles[type] = updatedFiles[type].filter(file => file.name !== fileName);
                    if (updatedFiles[type].length === 0) delete updatedFiles[type];
                }
                return updatedFiles;
            });
        } catch (error) {
            alert("Error deleting file:", error);
        }
    };

	const downloadFile = async (fileName) => {
		try {
			const response = await axios.get(`http://localhost:3000/dropbox/download/${fileName}`);
			console.log("Download link generated successfully:", response.data.link);
	
			// Optionally, trigger the download
			window.open(response.data.link, "_blank");
		} catch (error) {
			alert("Error downloading file:", error);
		}
	};
	



	

	return (
        <div>
            <button onClick={viewFiles}>Fetch Files</button>
            <div>
                {Object.keys(files).length === 0 ? (
                    <p>No files available.</p>
                ) : (
                    Object.entries(files).map(([fileType, fileList]) => (
                        <div key={fileType}>
                            <h3>{fileType.toUpperCase()} Files</h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                {fileList.map((file, index) => (
                                    <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                                        <p>{file.name}</p>
                                        {file.imglink && (
                                            <img src={file.imglink.replace("dl=0", "raw=1")} alt={file.name} style={{ width: "150px" }} />
                                        )}
                                        <div>
                                            <a href={file.link} target="_blank" rel="noopener noreferrer">View</a>
                                        </div>
                                        <button onClick={() => deleteFile(file.name)}>Delete</button>
                                        <button onClick={() => downloadFile(file.name)}>Download</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ViewFiles;
