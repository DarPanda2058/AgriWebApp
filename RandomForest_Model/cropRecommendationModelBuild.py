import pickle

import pandas as pd

import matplotlib.pyplot as plt

from sklearn.metrics import ConfusionMatrixDisplay, accuracy_score, confusion_matrix
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("Crop_recommendation.csv")
features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph']

X = df[features]
Y = df['label']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)


model = RandomForestClassifier()
model.fit(X_train, Y_train)

Y_pred = model.predict(X_test)

# Save the model to a .pkl file
with open("RF_cropRecommendModel.pkl", "wb") as f:
    pickle.dump(model, f)
    
# accuracy = model.score(X_test, Y_test)
accuracy = accuracy_score(Y_test, Y_pred)

print("Model Accuracy:", accuracy)

classification = classification_report(Y_test,Y_pred)
print ("Classification Report",classification)

cm = confusion_matrix(Y_test, Y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=model.classes_)
disp.plot()
plt.show()

#Saving labels to a text file
# Get unique labels
unique_labels = df['label'].unique()

# Write them to a text file
with open("unique_crop_labels.txt", "w") as f:
    for label in unique_labels:
        f.write(f"{label}\n")
print("Unique labels saved to unique_labels.txt")



