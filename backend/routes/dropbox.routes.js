const express = require('express');
const router = express.Router();
const upload = require("../multer.setup")
const { Dropbox } = require('dropbox');

const fileModel = require("../models/files.model")
const {userAuthentication} = require("../middleware/auth.middleware")


router.post("/upload", upload.array('files'), userAuthentication, async (req, res) => {
	console.log("chlllllla")
	const authHeader = req.headers.authorization
	
	const raw = req.headers['dropboxauthorization'];  // note all lower‑case
if (!raw) {
  return res.status(401).json({ error: 'Missing dropboxAuthorization header' });
}
const access_Token = raw.split(' ')[1];
	console.log(access_Token)
	if (!req.files) {
		return res.status(400).json({ message: "No file uploaded" })
	}
	if (!access_Token) {
		return res.status(401).json({ error: 'Unauthorized - No token provided' });
	  }
	
	  const dbx = new Dropbox({ accessToken:`${access_Token}` });
	console.log(req.user)
	const uploadedResponse = []
	try { 
		for (const file of req.files) {
			const response = await dbx.filesUpload({
				path: "/" + file.originalname,
				contents: file.buffer, 
			})

			const newFile = await fileModel.create({
				name: file.originalname,
				type: file.originalname.split(".").pop().toLowerCase(),
				path: response.result.path_display,
				userId: req.user._id,
				size: file.size,
			})
			uploadedResponse.push(response)
		}
		res.status(200).json({ message: "File uploaded successfully", data:uploadedResponse })
		console.log(uploadedResponse)
	}
	catch (error) {
		res.status(500).json({ message: error.message })
		console.log(error)
    }
	
})

// router.get("/share/:path", async (req, res) => {
// 	try {
// 		const response = await dbx.sharingCreateSharedLinkWithSettings({ path: "/" + req.params.path })
// 		res.json({ message: "File shared successfully", data:response })
// 	}
// 	catch (error) {
// 		res.status(500).json({ message: error.message })
// 	}
// })

router.get("/delete/:path", async (req, res) => {
	const access_Token = req.headers.dropboxtoken;
	
	if (!access_Token) {
		return res.status(401).json({ error: 'Unauthorized - No token provided' });
	  }
	
	  const dbx = new Dropbox({ access_Token });
	try {
		const response = await dbx.filesDeleteV2({ path: "/" + req.params.path })
		const deletedFile = await fileModel.findOneAndDelete({ path: "/" + req.params.path })
		console.log(deletedFile)
        res.json({ message: "File deleted successfully", data:response })
	}
	catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get("/files", userAuthentication, async (req, res) => {
	console.log("files fetching")
	
	
	const raw = req.headers['dropboxauthorization'];  // note all lower‑case
	console.log("raw:"+raw)
if (!raw) {
  return res.status(401).json({ error: 'Missing dropboxAuthorization header' });
}
	const access_Token = raw.split(' ')[1];
	console.log("Access toke:"+access_Token)
	const dbx = new Dropbox({ accessToken: `${access_Token}` });
	console.log("fetching")
	try {
		const userFiles = await fileModel.aggregate([
			{ $match: { userId: req.user._id } }, {
				$group: {
					_id: "$type",
					files: {
						$push: {
							name: "$name",
						    path: "$path", 
                            size: "$size",
                            created_at: "$created_at"
					}}
				}
			}
		])
		console.log("fetching file:"+userFiles)
		

		async function delay(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		const categroizedFiles = {}
		for (const category of userFiles) {
			categroizedFiles[category._id] = await Promise.all(category.files.map(async (file) => {
				try {
					await delay(1000);
					const existingLinks = await dbx.sharingListSharedLinks({ path: file.path });
					let fileLink;
					if (existingLinks.result.links.length > 0) {
						fileLink = existingLinks.result.links[0].url;
					}
					else {
						const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({ path: file.path });
						fileLink = linkResponse.result.url;
					}
					const dbFile = await fileModel.findOne({ path: file.path });
					
					return {
						name: file.name,
						imglink: fileLink.replace("?dl=0", "?raw=1"), 
						link: fileLink,
						size: file.size,
                        created_at: dbFile.created,
				
					}
				}
				catch (error) {
                    console.error(`Error fetching shared link for file "${file.name}":`, error);
                    return { name: file.name, link: "Error fetching link" }
                }
			}))
		}
		res.json({ message: "Files retrieved successfully", data: categroizedFiles });

       

    } catch (error) {
        console.error("Error listing files:", error);
        res.status(500).json({ message: "Failed to retrieve files", error: error.message });
    }
});

router.get("/download/:path", async (req, res) => {
	const access_Token = req.headers.dropboxtoken;
	
	if (!access_Token) {
		return res.status(401).json({ error: 'Unauthorized - No token provided' });
	  }
	
	  const dbx = new Dropbox({ access_Token });
    try {
        const response = await dbx.filesGetTemporaryLink({ path: "/" + req.params.path });
        res.json({ message: "File ready to download", link: response.result.link });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 



module.exports = router;