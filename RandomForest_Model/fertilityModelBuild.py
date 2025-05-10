import pickle

import pandas as pd

import matplotlib.pyplot as plt

from sklearn.metrics import ConfusionMatrixDisplay, accuracy_score, confusion_matrix
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("Soil Fertility Data (Modified Data).csv")
features = ['N', 'P', 'K', 'ph', 'oc', 'zn', 'B']

X = df[features]
Y = df['fertility']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)


model = RandomForestClassifier()
model.fit(X_train, Y_train)

Y_pred = model.predict(X_test)

# Save the model to a .pkl file
with open("RFmodel.pkl", "wb") as f:
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



