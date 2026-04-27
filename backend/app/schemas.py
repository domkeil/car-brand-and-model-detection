from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class PredictionResult(BaseModel):
    class_name: str
    confidence: float


class DetectionResponse(BaseModel):
    id: int
    image_url: str
    top_prediction: str
    confidence: float
    top5: List[PredictionResult]
    created_at: datetime

    class Config:
        from_attributes = True


class StatsResponse(BaseModel):
    total_detections: int
    most_common_brand: str
    most_common_model: str
