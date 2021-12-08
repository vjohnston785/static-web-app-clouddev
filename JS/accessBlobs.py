import logging

import azure.functions as func

from azure.storage.blob import BlobClient,BlobServiceClient

def main():
    logging.info(' start Python Main function processed a request.')

    #CONNECTION STRING
    blob_service_client = BlobServiceClient.from_connection_string(CONN_STR)

    # MAP SOURCE FILE
    blob_client = blob_service_client.get_blob_client(container="source", blob="source.txt")

    #SOURCE CONTENTS
    content=  blob_client.download_blob().content_as_text()
        
    # WRITE HEADER TO A OUT PUTFILE
    output_file_dest = blob_service_client.get_blob_client(container="target", blob="target.csv")

    #INITIALIZE OUTPUT               
    output_str = ""

    #STORE COULMN HEADERS
    data= list()
        
    data.append(list(["column1", "column2", "column3", "column4"]))

    output_str += ('"' + '","'.join(data[0]) + '"\n')

    output_file_dest.upload_blob(output_str,overwrite=True)
    logging.info(' END OF FILE UPLOAD')

if __name__ == "__main__":
    main()