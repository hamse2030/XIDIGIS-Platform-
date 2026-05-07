import os
import pandas as pd
import numpy as np
from supabase import create_client
from dotenv import load_dotenv
import json
from datetime import datetime, timedelta

/**
 * XIDIGIS Drought Forecasting Script
 * Trains a model to predict risk scores based on historical indices.
 */

def train_model():
    # 1. Setup
    load_dotenv(dotenv_path='.env.local')
    url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    
    if not url or not key:
        print("❌ Missing Supabase credentials.")
        return

    supabase = create_client(url, key)

    # 2. Pull Data
    print("📥 Fetching historical indices...")
    response = supabase.table("indices").select("*").execute()
    data = response.data

    if not data:
        print("⚠️ No data found in indices table. Simulation mode active.")
        # Create dummy data for demonstration
        dates = pd.date_range(start='2025-01-01', end='2026-05-07', freq='D')
        data = []
        for d in dates:
            data.append({
                'name': 'CHIRPS_90D_ANOMALY',
                'value': -20 + np.sin(d.dayofyear / 20) * 15 + np.random.normal(0, 5),
                'calculated_at': d.isoformat()
            })

    df = pd.DataFrame(data)
    df['calculated_at'] = pd.to_datetime(df['calculated_at'])
    df = df.sort_values('calculated_at')

    # 3. Feature Engineering
    print("🛠 Engineering features...")
    df['target'] = df['value'].shift(-14) # Predict 2 weeks ahead
    df['lag_1'] = df['value'].shift(1)
    df['lag_7'] = df['value'].shift(7)
    df['rolling_mean_30'] = df['value'].rolling(window=30).mean()
    
    df = df.dropna()

    # 4. Training (Simplified Linear Regression for baseline)
    from sklearn.linear_model import LinearRegression
    from sklearn.model_selection import train_test_split

    X = df[['value', 'lag_1', 'lag_7', 'rolling_mean_30']]
    y = df['target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

    model = LinearRegression()
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"✅ Model trained. R^2 Score: {score:.2f}")

    # 5. Export Metadata
    metadata = {
        "model_type": "LinearRegression",
        "features": list(X.columns),
        "coefficients": list(model.coef_),
        "intercept": model.intercept_,
        "trained_at": datetime.now().isoformat(),
        "horizon_days": 14
    }

    with open('models/drought_model_metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print("💾 Model metadata exported to models/drought_model_metadata.json")

if __name__ == "__main__":
    try:
        from sklearn.linear_model import LinearRegression
        train_model()
    except ImportError:
        print("❌ Scikit-learn not installed. Please run: pip install scikit-learn")
