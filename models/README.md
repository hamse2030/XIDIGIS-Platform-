# XIDIGIS Forecasting Models

This directory contains scripts for training and deploying predictive models for regional risk assessment.

## Models

### 1. Drought Risk Predictor (`train_drought_model.py`)
Predicts the composite drought score (Risk Index) 2–8 weeks ahead.

**Features:**
- Lagged precipitation anomalies (1, 2, 4 weeks).
- Rolling average temperature trends.
- Historical seasonal patterns.

## Installation

```bash
pip install -r models/requirements.txt
```

## Usage

### Training
To train the model on historical data from Supabase:

```bash
python models/train_drought_model.py --train
```

### Prediction
The model outputs metadata that can be used by the ingestion pipeline to append forecasts to the `indices` table.
