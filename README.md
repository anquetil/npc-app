TO-DO

-  create subgraph,
   -  will track traits
-  \_addTokenId will preserve order, so will need to maintain the layering that we want
-  traitregistryextension stores trait data
-  weird case whether the TBA doesn't exist for the NFT
   -  force user to create TBA is none exists
   -  buying traits should be tba centric because traits automatically go to the TBA
   -  restrict from buying until its deployed

function

-  11555.ext_addTokenId to equip
-  1155Contract.mintTo
-  rails721 mintTo address
-  createAccount to deployTBA, on globalRegistry of 6551,
   -  for salt use bytes32(0)
