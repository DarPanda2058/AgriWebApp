import sys
import json
import pickle
import pandas as pd

# Load model (use raw string for Windows paths)
try:
    with open(r"D:\British Course Books\Year 4\Sem 2\Production Project\Software\RandomForest_Model\RF_fertilityModel.pkl",'rb') as file:
        model = pickle.load(file)
    # Parse input JSON
    input_data = json.loads(sys.argv[1])
    
    # Extract features in the CORRECT ORDER (match training data)
    features = [
        float(input_data['N']),
        float(input_data['P']),
        float(input_data['K']),
        float(input_data['ph']),
        float(input_data['oc']),
        float(input_data['zn']),
        float(input_data['B'])
    ]
    features_df = pd.DataFrame([features], columns=['N', 'P', 'K', 'ph', 'oc', 'zn', 'B'])
    
    # Predict (reshape to 2D array: [[N, P, K, ph, oc, zn, B]])
    prediction = model.predict(features_df)
    print(json.dumps({"prediction": prediction.tolist()[0]}))  # Return first prediction
    
except Exception as e:
    print(json.dumps({"error": str(e)}))
    print("RAW ARG:", sys.argv[1])
    sys.exit(1)