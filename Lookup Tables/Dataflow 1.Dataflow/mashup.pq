[StagingDefinition = [Kind = "FastCopy"]]
section Section1;
shared Updated_LSOA_Codes_against_PA = let
  Source = Lakehouse.Contents(null),
  Navigation = Source{[workspaceId = "00e8e364-022f-45ca-8e66-a809f10dafcd"]}[Data],
  #"Navigation 1" = Navigation{[lakehouseId = "6206f2ff-b8f0-4ed2-bbd1-a7baa4329434"]}[Data],
  #"Navigation 2" = #"Navigation 1"{[Id = "Updated_LSOA_Codes_against_PA", ItemKind = "Table"]}[Data]
in
  #"Navigation 2";
