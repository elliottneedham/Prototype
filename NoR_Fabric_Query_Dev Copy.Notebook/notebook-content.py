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
  WHERE URN = '100225'
    AND Rationalised_School_Type = '02 - Mainstream - Primary'
    AND Phase != 'Totals'
    AND Yr_Group NOT IN ('Early Years Total', 'Post 16 Total', 'Primary Total', 'Secondary Total', 'Total')
    AND Year NOT IN (202829, 202930)
""")

df.write.mode("overwrite").save("Tables/NoR_Chart_Results")

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }
