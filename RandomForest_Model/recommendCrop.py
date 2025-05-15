import sys
import json
import pickle
import numpy as np
import pandas as pd

# Load the model
try:
    with open(r"RF_cropRecommendModel.pkl",'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    print(json.dumps({"error": "Model file not found"}))
    sys.exit(1)

# Read input from command line
try:
    input_data = json.loads(sys.argv[1])
    
    # Extract features in correct order
    features = [
        float(input_data['N']),
        float(input_data['P']),
        float(input_data['K']),
        float(input_data['temperature']),
        float(input_data['humidity']),
        float(input_data['ph']),
    ]
    
    # Make prediction
    input_df = pd.DataFrame([features], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph'])
    probabilities = model.predict_proba(input_df)[0]
    classes = model.classes_
    
    # Get top 3 predictions
    top_indices = np.argsort(probabilities)[-3:][::-1]
    top_crops = [(classes[i], round(probabilities[i] * 100, 2)) for i in top_indices]
    
    # Prepare result
    result = {
        "recommendations": [
            {"crop": crop, "confidence": f"{confidence}%"} for crop, confidence in top_crops
        ]
    }

    print(json.dumps(result))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)