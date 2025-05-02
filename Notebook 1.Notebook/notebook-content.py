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
    SELECT * FROM School_Level_Data_Historic_Actual_and_Projection_NoR
""")

df.coalesce(1).write.mode("overwrite").option("header", True).csv("Files/NoRFull")

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }

# CELL ********************

df = spark.read.format("csv").option("header","true").load("Files/NoRFull/part-00000-f67d4b0d-d6cd-45e7-990e-f6d28c953af3-c000.csv")
# df now is a Spark DataFrame containing CSV data from "Files/NoRFull/part-00000-f67d4b0d-d6cd-45e7-990e-f6d28c953af3-c000.csv".
display(df)

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }
