import pandas as pd

# Chemin vers le fichier CSV
file_path = 'household_power_consumption.csv'

# Télécharger et charger le dataset
df = pd.read_csv(file_path, sep=',', parse_dates={'datetime': ['Date', 'Time']}, infer_datetime_format=True, low_memory=False, na_values=['nan','?'])

#show column 
print(df.columns)

# Convertir les colonnes en numériques
for col in df.columns:
    if col != 'datetime':
        df[col] = pd.to_numeric(df[col])

# Filtrer les données pour une plage de dates spécifique si nécessaire
df = df[(df['datetime'] >= '2007-01-01') & (df['datetime'] < '2008-01-01')]

# Supprimer les lignes avec des valeurs manquantes
df = df.dropna()

# Afficher les premières lignes pour vérifier le résultat
print(df.head())
