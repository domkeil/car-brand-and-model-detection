"""
Inference skript pre AWS SageMaker.
SageMaker očakáva tieto 4 funkcie: model_fn, input_fn, predict_fn, output_fn
"""
import io
import json
import os
import torch
import torchvision.transforms as T
from PIL import Image


def model_fn(model_dir):
    """Načíta model pri štarte SageMaker endpointu."""
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model_path = os.path.join(model_dir, "model.pt")
    model = torch.jit.load(model_path, map_location=device)
    model.eval()

    # Načítaj triedy
    with open(os.path.join(model_dir, "class_names.json")) as f:
        class_names = json.load(f)

    return {"model": model, "class_names": class_names, "device": device}


def input_fn(request_body, request_content_type):
    """Spracuje vstup od klienta (obrázok)."""
    if request_content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise ValueError(f"Unsupported content type: {request_content_type}")

    img = Image.open(io.BytesIO(request_body)).convert("RGB")
    transform = T.Compose([
        T.Resize((224, 224)),  # alebo 380 podľa modelu
        T.ToTensor(),
        T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    return transform(img).unsqueeze(0)


def predict_fn(input_tensor, model_dict):
    """Spustí inference."""
    model = model_dict["model"]
    device = model_dict["device"]
    class_names = model_dict["class_names"]

    input_tensor = input_tensor.to(device)
    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)[0]
        top_probs, top_idxs = probs.topk(5)

    results = [
        {"class_name": class_names[i.item()], "confidence": round(p.item() * 100, 2)}
        for p, i in zip(top_probs.cpu(), top_idxs.cpu())
    ]

    return {
        "top_prediction": results[0]["class_name"],
        "confidence": results[0]["confidence"],
        "top5": results
    }


def output_fn(prediction, response_content_type):
    """Vráti výsledok ako JSON."""
    return json.dumps(prediction)