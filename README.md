# Car Detection WebApp

Automated car brand and model detection from images using deep learning.

## Architecture

| Component | Service | Technology |
|-----------|---------|-----------|
| Frontend | Azure Static Web Apps | React, Vite |
| Backend | Azure App Service | FastAPI, Python |
| Database | Azure PostgreSQL | PostgreSQL |
| Storage | AWS S3 | Image Storage |
| ML Model | Container | PyTorch, EfficientNet-B4 |

## Local Development

### Backend
\`\`\`bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:
- DATABASE_URL
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- S3_BUCKET_NAME
- FRONTEND_URL

## License

MIT
