# Fabric notebook source

# METADATA ********************

# META {
# META   "kernel_info": {
# META     "name": "synapse_pyspark"
# META   },
# META   "dependencies": {
# META     "lakehouse": {
# META       "default_lakehouse": "fc0e23ae-4565-4652-aa94-d5a96ea04b74",
# META       "default_lakehouse_name": "Insites_Lakehouse_Gold",
# META       "default_lakehouse_workspace_id": "00e8e364-022f-45ca-8e66-a809f10dafcd",
# META       "known_lakehouses": [
# META         {
# META           "id": "fc0e23ae-4565-4652-aa94-d5a96ea04b74"
# META         }
# META       ]
# META     }
# META   }
# META }

# CELL ********************

df = spark.sql("""
    SELECT *
    FROM School_Level_Data_Historic_Actual_and_Projection_NoR
    LIMIT 10
""")

display(df)

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }
