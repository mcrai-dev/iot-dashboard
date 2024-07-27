from prophet import Prophet
import pandas as pd
import joblib

file_path = 'model/household_power_consumption.csv'

df = pd.read_csv(file_path, sep=',', parse_dates={'datetime': ['Date', 'Time']}, infer_datetime_format=True, low_memory=False, na_values=['nan','?'])


# Préparer les données pour Prophet
df_prophet = df[['datetime', 'Global_active_power']].rename(columns={'datetime': 'ds', 'Global_active_power': 'y'})

# Créer et entraîner le modèle
model = Prophet()
model.fit(df_prophet)

# Sauvegarder le modèle
import joblib
joblib.dump(model, 'prophet_model.pkl')

"""
                    FOR GOOGLE COLLAB
---------------------------------------------------------------
!pip install -U -q PyDrive
!pip install -U prophet
!pip install -U joblib

from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from google.colab import auth
from oauth2client.client import GoogleCredentials

import joblib
from prophet import Prophet
import pandas as pd

# Authenticate and create the PyDrive client.
auth.authenticate_user()
gauth = GoogleAuth()
gauth.credentials = GoogleCredentials.get_application_default()
drive = GoogleDrive(gauth)

link = 'https://drive.google.com/file/d/1LPbi9IYh1OGuwSWv1bKFqSeta7TGElp5/view'

# to get the id part of the file
id = link.split("/")[-2]

downloaded = drive.CreateFile({'id': id})
downloaded.GetContentFile('data.csv')

# Load the dataset
df = pd.read_csv('data.csv', sep=',', low_memory=False, na_values=['nan','?'])

print(df.columns)
print(df.head())


# Merge Date and Time columns into a single datetime column
df['datetime'] = pd.to_datetime(df['Date'] + ' ' + df['Time'], format='%d/%m/%Y %H:%M:%S')

# Convert columns to numeric, ignoring errors for non-numeric columns
for col in df.columns:
    if col not in ['Date', 'Time', 'datetime']:
        df[col] = pd.to_numeric(df[col], errors='coerce')

# Drop rows with missing values
df = df.dropna()

# Prepare the data for Prophet
df_prophet = df[['datetime', 'Global_active_power']].rename(columns={'datetime': 'ds', 'Global_active_power': 'y'})

# Create and train the Prophet model
model = Prophet()
model.fit(df_prophet)

# Save the model
joblib.dump(model, 'prophet_model.pkl')
print("Model training done and saved as prophet_model.pkl")

"""