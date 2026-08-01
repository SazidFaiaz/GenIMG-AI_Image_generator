# GenIMG - AI Image Generator

Full-stack MERN app to generate AI images (Hugging Face FLUX) and share them in a community feed.

## Why Hugging Face?

| Provider | Fit for this project |
|----------|----------------------|
| **Hugging Face FLUX** (used) | Free token, built for image gen, fast |
| Gemini | Strong for text; image gen needs paid Imagen |
| DALL-E | High quality but paid OpenAI credits |

## Quick start

### 1. Install

```bash
npm run install-all
```

### 2. Configure `server/.env`

```
PORT=8080
MONGODB_URL=mongodb://127.0.0.1:27017/genimg
HF_ACCESS_TOKEN=hf_your_token_here
HF_MODEL=black-forest-labs/FLUX.1-schnell
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- Get a free HF token: https://huggingface.co/settings/tokens
- MongoDB: local or Atlas connection string
- Cloudinary: optional but recommended for permanent image URLs

### 3. Configure `client/.env`

```
REACT_APP_API_URL=http://localhost:8080
```

### 4. Run frontend + backend together

```bash
npm run dev
```

- Backend: http://localhost:8080
- Frontend: http://localhost:3000

## API

| Method | Endpoint | Body |
|--------|----------|------|
| GET | `/api/post` | - |
| POST | `/api/post` | `{ name, prompt, photo }` |
| POST | `/api/generateImage` | `{ prompt }` |
