# Fabric notebook source

# METADATA ********************

# META {
# META   "kernel_info": {
# META     "name": "synapse_pyspark"
# META   },
# META   "dependencies": {}
# META }

# CELL ********************

from git import Repo
import os
from datetime import datetime

# Paths
lakehouse_file = "/lakehouse/default/Files/github_export/your_table.csv"
repo_path = "/lakehouse/default/Files/github_repo"

# Clone GitHub repo if not already present
if not os.path.exists(repo_path):
    Repo.clone_from("https://<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
 >@github.com/elliott.needham/Prototype.git", repo_path)

# Copy the exported file into the repo folder
os.system(f"cp {lakehouse_file} {repo_path}/your_table.csv")

# Git operations
repo = Repo(repo_path)
repo.git.add("your_table.csv")
repo.index.commit(f"Update table - {datetime.now().isoformat()}")
origin = repo.remote(name="origin")
origin.set_url("https://<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
 >@github.com/elliott.needham/Prototype.git")
origin.push()

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }
