export interface Photo {
  _id: string
  originalname: string
  mimetype: string
  imageUrl: string
  description?: string
  title?: string
  size: string
  createdAt: string
  updatedAt?: string
  [key: string]: any
}

const apiBaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

export async function listPhotos(): Promise<Photo[]> {
  const response = await fetch(`${apiBaseURL}/photos`)

  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.status}`)
  }

  return response.json()
}

export async function createPhoto(
	title: string,
	file: File,
	description?: string
): Promise<Photo> {
	const formData = new FormData()
	formData.append('title', title)
	formData.append('image', file)

	if (description) {
		formData.append('description', description)
	}

	const response = await fetch(`${apiBaseURL}/photos/`, {
		method: 'POST',
		body: formData,
	})

	if (!response.ok) {
		throw new Error(`Failed to create photo: ${response.status}`)
	}

	return response.json()
}

export async function getPhoto(id: string): Promise<Photo | undefined> {
	const response = await fetch(`${apiBaseURL}/photos/${id}`)

	if (response.status === 404) {
		return undefined
	}

	if (!response.ok) {
		throw new Error(`Failed to fetch photo: ${response.status}`)
	}

	return response.json()
}

export async function updatePhoto(photo: Photo): Promise<Photo | undefined> {
	const response = await fetch(`${apiBaseURL}/photos/${photo._id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(photo),
	})

	if (response.status === 404) {
		return undefined
	}

	if (!response.ok) {
		throw new Error(`Failed to update photo: ${response.status}`)
	}

	return response.json()
}

export async function deletePhoto(id: string): Promise<boolean | undefined> {
	const response = await fetch(`${apiBaseURL}/photos/${id}`, {
		method: 'DELETE',
	})

	if (response.status === 404) {
		return undefined
	}

	if (!response.ok) {
		throw new Error(`Failed to delete photo: ${response.status}`)
	}

	return true
}

export const photos: Photo[] = [
	{
		"_id": "69b45b4b2dc14d5702d0cc9e",
		"originalname": "three_pups.jpg",
		"mimetype": "image/jpeg",
		"imageUrl": "https://res.cloudinary.com/du8ksou8p/image/upload/v1773427531/pi2tygqeho8ttchqmhau.jpg",
		"description": "Baxter (the hound), Ripley (the Doberman), and Tilda (the heeler)",
		"title": "Three Pups!",
		"size": "415",
		"createdAt": "2026-03-13T18:45:31.699Z",
		"__v": 0
	},
	{
		"_id": "69b45bc97d6eb8bb00e256f3",
		"originalname": "20220215_005153.jpg",
		"mimetype": "image/jpeg",
		"imageUrl": "https://res.cloudinary.com/du8ksou8p/image/upload/v1773427656/n9jscmlxcjkhyyfnv2zn.jpg",
		"description": "Let sleeping dogs lie...",
		"title": "Pups again",
		"size": "1842",
		"createdAt": "2026-03-13T18:47:37.140Z",
		"__v": 0
	},
	{
		"_id": "69bddbd9f7c26dafa6b2d45f",
		"originalname": "IMG_0165-001.JPG",
		"mimetype": "image/jpeg",
		"imageUrl": "https://res.cloudinary.com/du8ksou8p/image/upload/v1774050264/dt7bp1mfkchqfxulyvrv.jpg",
		"description": "Low tide!",
		"title": "Bay of Fundy",
		"size": "195",
		"createdAt": "2026-03-20T23:44:25.276Z",
		"__v": 0
	},
	{
		"_id": "69bddca1f7c26dafa6b2d463",
		"originalname": "three_pups.jpg",
		"mimetype": "image/jpeg",
		"imageUrl": "https://res.cloudinary.com/du8ksou8p/image/upload/v1774050464/pvhksljyndjuxrnjfk7g.jpg",
		"description": "Three pups!, uploaded via REST API",
		"title": "Happy dogs",
		"size": "415",
		"createdAt": "2026-03-20T23:47:45.722Z",
		"__v": 0
	},
	{
		"_id": "69c4805ac498b9716ac8dd90",
		"originalname": "couple-of-old-guys.jpg",
		"mimetype": "image/jpeg",
		"imageUrl": "https://res.cloudinary.com/du8ksou8p/image/upload/v1774485594/q385c7myit6sapotlas0.jpg",
		"description": "Baxter and Me on the Beach",
		"title": "Couple of Old Guys",
		"size": "202",
		"createdAt": "2026-03-26T00:39:54.384Z",
		"__v": 0
	},
	{
		"_id": "69c486327c308e0411132d69",
		"originalname": "puppies.jpg",
		"mimetype": "image/jpeg",
		"imageUrl": "https://res.cloudinary.com/du8ksou8p/image/upload/v1774487089/smbxh91fqoo3y2rxdx29.jpg",
		"description": "Two younguns, Msabu (10 months old heeler, on right) and Chidi (2 months old corgi mix, on left)",
		"title": "Happy dogs",
		"size": "2375",
		"createdAt": "2026-03-26T01:04:50.160Z",
		"__v": 0,
		"updatedAt": "2026-03-26T01:05:20.801Z"
	}
]