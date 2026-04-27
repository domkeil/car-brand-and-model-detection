"""
Skript na nasadenie modelu na AWS SageMaker.
Spustíš ho RAZ — vytvorí endpoint ktorý beží trvalo.
"""
import boto3
import sagemaker
from sagemaker.pytorch import PyTorchModel
import tarfile
import os

# AWS región (free tier)
REGION = "us-east-1"

# Vytvor session
boto3.setup_default_session(region_name=REGION)
sess = sagemaker.Session()
role = "arn:aws:iam::TVOJE_ACCOUNT_ID:role/SageMakerExecutionRole"
# ↑ Vytvoríš túto rolu v IAM (návod nižšie)

bucket = sess.default_bucket()

# 1. Zabaľ model + inference skript
print("Balím model.tar.gz...")
with tarfile.open("model.tar.gz", "w:gz") as tar:
    tar.add("model/model.pt", arcname="model.pt")
    tar.add("model/class_names.json", arcname="class_names.json")
    tar.add("inference.py", arcname="code/inference.py")

# 2. Nahraj na S3
print("Uploadujem na S3...")
model_s3 = sess.upload_data("model.tar.gz", bucket=bucket, key_prefix="car-classifier")
print(f"Model na S3: {model_s3}")

# 3. Vytvor SageMaker model
pytorch_model = PyTorchModel(
    model_data=model_s3,
    role=role,
    framework_version="2.0",
    py_version="py310",
    entry_point="inference.py",
    source_dir="."
)

# 4. Deploy ako endpoint
print("Deploying endpoint... (môže trvať 5-10 minút)")
predictor = pytorch_model.deploy(
    initial_instance_count=1,
    instance_type="ml.t2.medium",  # FREE TIER!
    endpoint_name="car-classifier-endpoint"
)

print(f"\n✅ Endpoint vytvorený: {predictor.endpoint_name}")
print("V backende nastav SAGEMAKER_ENDPOINT_NAME=car-classifier-endpoint")