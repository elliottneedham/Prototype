import azure.functions as func
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
import pandas as pd
import io
import json
import azure.functions as func
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient
import json

app = func.FunctionApp()

@app.function_name(name="fetch_nor_data")
@app.route(route="fetch-nor-data", auth_level=func.AuthLevel.ANONYMOUS)
def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        credential = DefaultAzureCredential()
        blob_service_client = BlobServiceClient(
            account_url="https://fabricdashdata.blob.core.windows.net",
            credential=credential
        )

        # Adjust container + blob name if different
        blob_client = blob_service_client.get_blob_client(container="nor-data", blob="nor_data_combined.csv")
        download_stream = blob_client.download_blob()
        csv_bytes = download_stream.readall()

        df = pd.read_csv(io.BytesIO(csv_bytes))

        # Optional filtering logic can go here if needed (e.g. by URN)
        json_data = df.to_dict(orient="records")

        return func.HttpResponse(
            json.dumps(json_data),
            mimetype="application/json"
        )

    except Exception as e:
        return func.HttpResponse(str(e), status_code=500)