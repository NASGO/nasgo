# NASGO NODE HTTP API LIST

[TOC]



## 1 NASGO-JS

All the writing operations in Nasgo system are finished by starting a transaction. The transaction data is generated through a JS library named "nasgo-js", and then broadcasted by a POST API.

**Install the library**
`npm install nasgo-js`

## 2 QUERY DATA

### 2.1 Accounts

#### 2.1.1 Get Account Information By Public Key

Interface Address: /api/accounts/open2/
Request Type: post
Supported Format: json
Comment: Public key needs to be generated locally according to user's master secret

Request Parameter Description:

| Name      | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| publicKey | string | Y        | Nasgo account public key |

Response Parameter Description:

| Name             | Type | Description                 |
| ---------------- | ---- | --------------------------- |
| success          | bool | Whether login is successful |
| account          | json | Account Information         |
| Request Example: |      |                             |

```
var NasgoJS = require('nasgo-js'); 
var publicKey = NasgoJS.crypto.getKeys(secret).publicKey;  //Generate public key according to master secret 
// var address = NasgoJS.crypto.getAddress(publicKey);   //Generate address according to public key

// Submit the  data to Nasgo node through post method   
curl -X POST -H "Content-Type: application/json" -k -d '{"publicKey":"USER'S PUBLICKEY"}' http://NASGONODEIP:9040/api/accounts/open2/   
```

JSON Response Example:

```
{
"success":true,
"account":{"address":"NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85",
"unconfirmedBalance":97925502295945,
"balance":97925502295945,
"publicKey":"eec16080247e802ed2e1b9ca14a8f64a3263bcd65a954db1edadfb98be131f86",
"unconfirmedSignature":true,
"secondSignature":true,
"secondPublicKey":"727cefc1827e46404b93373fcbd79b6d03126ec452191e4a44c55c4d6caaa3d9",
"multisignatures":[],
"u_multisignatures":[],
"lockHeight":0
},
"latestBlock":
{"height":2049227,
"timestamp":22419850},
"version":
{"version":"1.0.0",
"build":"14:49:46 11/02/2018",
"net":"mainnet"}
}  
```

#### 2.1.2 Get Account Information by address

Interface Address: /api/accounts
Request Method:get
Supported Format: urlencoded
Request Parameter Description:

| Name    | Type   | Required | Description                        |
| ------- | ------ | -------- | ---------------------------------- |
| address | string | Y        | Client's address, minimum length:1 |

Response Parameter Description:

| Name        | Type | Description                           |
| ----------- | ---- | ------------------------------------- |
| success     | bool | whether response data can be returned |
| account     | json | account information                   |
| latestBlock | json | latest block information              |
| version     | json | version information                   |

Request Example:

```
curl -k -X GET http://NASGONODEIP:9040/api/accounts?address=NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85   
```

JSON Response Example:

```
{"success":true,
"account":
{
"address":"NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85",
"unconfirmedBalance":97925502295945,
"balance":97925502295945,
"publicKey":"eec16080247e802ed2e1b9ca14a8f64a3263bcd65a954db1edadfb98be131f86",
"unconfirmedSignature":true,
"secondSignature":true,
"secondPublicKey":"727cefc1827e46404b93373fcbd79b6d03126ec452191e4a44c55c4d6caaa3d9",
"multisignatures":[],
"u_multisignatures":[],
"lockHeight":0
},
"latestBlock":
{
"height":2049238,
"timestamp":22419960
},
"version":
{
"version":"1.0.0",
"build":"14:49:46 11/02/2018",
"net":"mainnet"
}
}
```

#### 2.1.3 Get Balance of Account by Address

Interface Address: /api/accounts/getBalance
Request Method: get
Supported Format: urlencoded
Request Parameter Description:

| Name    | Type   | Required | Description                        |
| ------- | ------ | -------- | ---------------------------------- |
| address | string | Y        | Client's address, minimum length:1 |

Response Parameter Description:

| Name               | Type    | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| success            | bool    | true: response data return successfully  |
| balance            | integer | balance                                  |
| unconfirmedBalance | integer | the sum of unconfirmed and confirmed balance, that should be larger than or equal to balance |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/accounts/getBalance?address=NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85'   
```

JSON Response Example:

```
{
"success":true,
"balance":97925502295945,
"unconfirmedBalance":97925502295945
}  
```

#### 2.1.4 Get Account's Public Key by Address

Interface Address: /api/accounts/getPublickey
Request Method:get
Supported Format: urlencoded
Request Parameter Description:

| Name    | Type   | Required | Description                        |
| ------- | ------ | -------- | ---------------------------------- |
| address | string | Y        | Client's address, minimum length:1 |

Response Parameter Description:

| Name      | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| success   | bool   | true: response data return successfully |
| publicKey | string | public key                              |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/accounts/getPublickey?address=NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85'   
```

JSON Response Example:

```
{
"success":true,
"publicKey":"eec16080247e802ed2e1b9ca14a8f64a3263bcd65a954db1edadfb98be131f86"
}  
```

#### 2.1.5 Get Voting List by Address

Interface Address: /api/accounts/delegates
Request Method: get
Supported Format: urlencoded
Request Parameter Description:

| Name    | Type   | Required | Description     |
| ------- | ------ | -------- | --------------- |
| address | string | Y        | Voter's address |

Response Parameter Description:

| Name      | Type  | Description                              |
| --------- | ----- | ---------------------------------------- |
| success   | bool  | true: response data return successfully  |
| delegates | Array | A list that contains detail information of those delegates who have already voted |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/accounts/delegates?address=NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85'   
```

JSON Response Example:

```
{"success":true,"delegates":
[
{
"username":"bloosom",
"address":"ND924N5pEobTDZA6TYxpXpGSRD3ii5gu4a",
"publicKey":"3761ef6a41707c9e7deda92cc54720a43f980bbff9f6f3188104cf30caa318cd",
"vote":20113709261339920,
"producedblocks":20802,
"missedblocks":0,
"rate":1,
"approval":"18.08",
"productivity":"100.00"
},
........
{
"username":"purpel",
"address":"NKQBZMvgn3gYWhbAftusP9aM9RVGtqaWMP",
"publicKey":"7f61e7b0e27c6df91cd9f0ba2be1d5bfd6b2008e573e0a7585458c8a61d3e1c8",
"vote":20048178644295944,
"producedblocks":20839,
"missedblocks":0,
"rate":60,
"approval":"18.02",
"productivity":"100.00"
}
]
}
```



### 2.2 Transactions

#### 2.2.1 Get NSG Transactions List 

Interface Address: /api/transactions
Request Method: get
Supported Format: urlencoded
Comment： if there is no parameter in request data, all network transactions will be returned.
Request Parameter Description:

| Name            | Type    | Required | Description                              |
| --------------- | ------- | -------- | ---------------------------------------- |
| blockId         | string  | N        | block id                                 |
| limit           | integer | N        | the limitation of returned records，minimum：0,maximum：100 |
| type            | integer | N        | see column explaination table            |
| orderBy         | string  | N        | sort with a field in the table，senderPublicKey:desc |
| offset          | integer | N        | offset, minimum 0                        |
| senderPublicKey | string  | N        | sender's public key                      |
| senderId        | string  | N        | sender's address                         |
| recipientId     | string  | N        | recipient's address, minimum:1           |
| amount          | integer | N        | amount                                   |

Response Parameter Description:

| Name         | Type  | Description                              |
| ------------ | ----- | ---------------------------------------- |
| success      | bool  | true: response data return successfully  |
| transactions | Array | A JSON object list containing multiple transactions' detail |
| count        | int   | the total number of retrieved transactions |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/transactions?recipientId=NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85&senderPublicKey=eec16080247e802ed2e1b9ca14a8f64a3263bcd65a954db1edadfb98be131f86&orderBy=t_timestamp:desc&limit=5&offset=0'   
```

JSON Response Example:

```
{"success":true,"transactions":[
{
"id":"3ef0953d4821089d85489e88128d87a4d809ad17dbabcf8e7aa1298ec60a517c",
"height":"2021878",
"blockId":"72f772ede7c5da8df82517ecb4cf47faf528f4e2f6c780697974606db3c7a74d",
"type":0,
"timestamp":22137922,
"senderPublicKey":"eec16080247e802ed2e1b9ca14a8f64a3263bcd65a954db1edadfb98be131f86",
"senderId":"NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85",
"recipientId":"NDyPWCBfesWihfqaJy8SZHHfYnyRRNRw4Y",
"amount":5549697541,
"fee":1000000,
"signature":"f371bb1205cbb0bf9b6bf9e55da482f5b879e5a75d8b4ab0ce17af4051369c5315c7998f6e4146ff7a76d3cc69946e07cfdd401df5e34b1c9750648e39948001",
"signSignature":"0478b63666b800d637f00d0d8e91bfed60169aa68a8a76afb3d4b4dcc7ce7782e00a80ca06ab2de8a089bf85d01ec9d3b2f8a00cf4b4bde2a7392c971613d506",
"signatures":null,
"confirmations":"27469",
"args":[],
"message":"",
"asset":{}
},
{
"id":"bd74c6cda36b7821aa88ad88eb65b685ae9daeedc00f3954ae2645d1c04e69b5",
"height":"2021877",
"blockId":"f1d305b883b84fda38befd06d8867b741cd139520fd9305a478e96672a431a1d",
"type":0,
"timestamp":22137910,
"senderPublicKey":"eec16080247e802ed2e1b9ca14a8f64a3263bcd65a954db1edadfb98be131f86",
"senderId":"NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85",
"recipientId":"NCYYtJA9414je1DWMGkFs7rpehwTQieUph",
"amount":20027662517,
"fee":1000000,
"signature":"282cc5a1629c8ed1cdc86d451951af5b1fae0cd1ac43c5c280ac6332eeb997f5e78beed598e2b3afb5432902305291ba770435b3e9a48da97381f96992f14e06",
"signSignature":"36b30458b58a8a2a1be4482699696815e11172777dedb1b87ba23eca6670f8d886bd5c4c0ea9a00730370ebd97de24abc0370cafaac4437e34a488314aca8c0b",
"signatures":null,
"confirmations":"27470",
"args":[],
"message":"",
"asset":{}
}
],
"count":2370}  
```

2.2.1.1 column explaination

type:

| value | Description                   |
| ----- | ----------------------------- |
| 0     | NSG Transactions              |
| 1     | Set secure code               |
| 2     | Register as a delegator       |
| 3     | Submit a vote                 |
| 4     | multisignature                |
| 5     | Publish a dapp in mainnet     |
| 6     | deposit to a Dapp             |
| 7     | withdrawal from a dapp        |
| 9     | register as a asset publisher |
| 10    | register an asset in mainnet  |
| 13    | issue an asset                |
| 14    | asset transactions            |

message:

when user transfer asset to another account ,the can leave a message 

#### 2.2.2 Get the Transaction Detail Information by Transaction ID

Interface Address: /api/transactions/get
Request Method:get
Supported Format: urlencoded
Request Parameter Description:

| Name | Type   | Required | Description    |
| ---- | ------ | -------- | -------------- |
| Id   | string | Y        | transaction id |

Response Parameter Description:

| Name         | Type | Description                             |
| ------------ | ---- | --------------------------------------- |
| success      | bool | true: response data return successfully |
| transactions | json | transaction detail information          |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/transactions/get?id=14093929199102906687'   
```

JSON Response Example:

```
{   
	"success": true,   
	"transaction": {   
		"id": "14093929199102906687",   
		"height": "105460",   
		"blockId": "2237504897174225512",   
		"type": 0,   
		"timestamp": 4380024,   
		"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
		"senderId": "16358246403719868041",   
		"recipientId": "16723473400748954103",   
		"amount": 10000000000,   
		"fee": 10000000,   
		"signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
		"signSignature": "",   
		"signatures": null,   
		"confirmations": "34268",   
		"asset": {   
		}   
	}   
}   
```

### 2.3 Blocks

#### 2.3.1 Get the Block Detail Information of the Given ID

Interface Address: /api/blocks/
Request Method:get
Supported Format: urlencoded
Request Parameter Description:

| Name   | Type   | Required                                 | Description      |
| ------ | ------ | ---------------------------------------- | ---------------- |
| id     | string | only choose one of these three parameters | block ID         |
| height | string | ditto                                    | block height     |
| hash   | string | ditto                                    | block hash value |

Response Parameter Description:

| Name    | Type | Description                             |
| ------- | ---- | --------------------------------------- |
| success | bool | true: response data return successfully |
| block   | json | the block detail information            |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/blocks/get?id=25781bf03085914a48966c485562c7ef84d40bed16c884c005a1fb1cf08295e7'   
```

JSON Response Example:

```
{
"success":true,
"block":
{
"id":"25781bf03085914a48966c485562c7ef84d40bed16c884c005a1fb1cf08295e7",
"version":0,
"timestamp":3036410,
"height":170795,
"previousBlock":"e6fae02dba196e9817e667e170ab6f89de23a67ad0b665528bd4339fbc19380b",
"numberOfTransactions":1,
"totalAmount":0,
"totalFee":10000000000,
"reward":5000000000,
"payloadLength":757,
"payloadHash":"158bd05eb61626675a35974c4032c80f5411b4c5a4dd7500746a41b8c6c2afeb",
"generatorPublicKey":"1f9af8d853252e9befec742008b89dad81f959b69033518cb8772db4ae7d2bd2",
"blockSignature":"0910b4ce0d5f1e3e9bbc5cdeafac696a5d5d80e9307b18c49c2dceb35768dedf456eeed093efaa6cfa035e313bca0b8e65c41269258aa67397df121a47a5fa0e",
"confirmations":"1878855",
"generatorId":"N4EvBZ2wbHsBuHJzY7vHroAA3Mjicit5vC",
"totalForged":15000000000
}
}
```

#### 2.3.2 Get the Latest Block

Interface Address: /api/blocks
Request Method: get
Supported Format: urlencoded
Comment: if there is no parameter, the detail of all the blocks in the whole network will be returned
Request Parameter Description:

| Name               | Type    | Required | Description                              |
| ------------------ | ------- | -------- | ---------------------------------------- |
| limit              | integer | N        | maximum number of returned records, between 0 and 100 |
| orderBy            | string  | N        | sort by a field in the table, for example, height:desc |
| offset             | integer | N        | offset, minimum 0                        |
| generatorPublicKey | string  | N        | public key of the block generator        |
| totalAmount        | integer | N        | total amount of transactions, from 0 to 10000000000000000 |
| totalFee           | integer | N        | total fee of transaction, from 0 to 10000000000000000 |
| reward             | integer | N        | the amount of reward, minimum: 0         |
| previousBlock      | string  | N        | previous block                           |
| height             | integer | N        | block height                             |

Response Parameter Description:

| Name    | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| success | bool    | true: response data return successfully  |
| blocks  | Array   | a list of JSON objects containing block detail |
| count   | integer | block height                             |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/blocks?limit=2&offset=0&orderBy=height:desc'   
```

JSON Response Example:

```
{
"success":true,"blocks":
[
{"id":"1a6c444c2bbcfedd9027ee9e5bfada98f4e5f6460aea2cc0d5ff7d04a167f05f",
"version":0,
"timestamp":22424310,
"height":2049658,
"previousBlock":"914f55b595141c3bb0ea5ad8f2ba45cbb3ef48529191ecb5f70de0a675228a1a",
"numberOfTransactions":0,
"totalAmount":0,
"totalFee":0,
"reward":5000000000,
"payloadLength":0,
"payloadHash":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
"generatorPublicKey":"5b80a1a41947a0115feb69cc9cf90a9e3c31ce86417493c6984e65bf81e50022",
"blockSignature":"9d1d5f14cfe481e4c0cad6c7d47a01928d691d8e15868af48e6de9d166a2bde0a0427636ef13d64ad13ec3e5bd67022facd385d311b0b0afa910839177823f0d",
"confirmations":"1",
"generatorId":"NQHVjGYpBRYT4dRdjTuAhrjKfbqqSYQrMR",
"totalForged":5000000000
},{
"id":"914f55b595141c3bb0ea5ad8f2ba45cbb3ef48529191ecb5f70de0a675228a1a",
"version":0,
"timestamp":22424300,
"height":2049657,
"previousBlock":"9436bc3e1613e5cf04bbe5aa637e71bffeda97ef446de935fd2ee69fd8cf834c",
"numberOfTransactions":0,
"totalAmount":0,
"totalFee":0,
"reward":5000000000,
"payloadLength":0,
"payloadHash":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
"generatorPublicKey":"6d14e0aeeb26e4990c23476558cd53eed93dba603a55fd1a30fbfae8e13688eb",
"blockSignature":"348f3fe8bf028ed46313f2f975f7dc28d69e844c88270123c3e3e1f5da3affa00072b34462979da0281f9f59c603213dca27fd9d5c10e0203abaa1c2840c3a0a",
"confirmations":"2",
"generatorId":"NAmYMaiWc294j6igdgiFzVrjnrscCPYqet",
"totalForged":5000000000
}
],
"count":2049658}  
```

#### 2.3.3 Get the Block Height

Interface Address: /api/blocks/getHeight
Request Method:get
Supported Format: none
Request Parameter Description: none

Response Parameter Description:

| Name    | Type    | Description                             |
| ------- | ------- | --------------------------------------- |
| success | bool    | true: response data return successfully |
| height  | integer | block height                            |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/blocks/getheight'    
```

JSON Response Example:

```
{"success":true,"height":2049668}   
```

  

#### 2.3.4 Get the Reward Information of a Block

Interface Address: /api/blocks/getReward
Request Method:get
Supported Format: none
Request Parameter Description: none

Response Parameter Description:

| Name    | Type    | Description                             |
| ------- | ------- | --------------------------------------- |
| success | bool    | true: response data return successfully |
| reward  | integer | the reward of the block                 |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/blocks/getReward'   
```

JSON Response Example:

```
{"success":true,"reward":500000000} 
```

#### 2.3.5 Get the Current Maximum Supply of the Blockchain

Interface Address: /api/blocks/getSupply
Request Method:get
Supported Format: none
Request Parameter Description: none

Response Parameter Description:

| Name    | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| success | bool    | true: response data return successfully  |
| supply  | integer | the total amount of NSG in the whole network |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/blocks/getSupply'   
```

JSON Response Example:

```
{"success":true,"supply":111247960000000000} 
```

#### 2.3.6 Get Current Status of Blockchain

Interface Address: /api/blocks/getStatus
Request Method:get
Supported Format: none
Request Parameter Description: none

Response Parameter Description:

| Name      | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| success   | bool    | true: response data return successfully  |
| height    | integer | blockchain height                        |
| fee       | integer | transaction fee                          |
| milestone | integer |                                          |
| reward    | integer | block reward                             |
| supply    | integer | total amount of NSG in the whole network |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/blocks/getStatus'   
```

JSON Response Example:

```
{
"success":true,
"height":2049677,
"fee":1000000,
"milestone":0,
"reward":5000000000,
"supply":111247960000000000
} 
```



### 2.4 Delegates

#### 2.4.1 Get the Total Number of Delegates

Interface Address: /api/delegates/count
Request Method: get
Supported Format: none
Request Parameter Description: none

Response Parameter Description:

| Name    | Type    | Description                             |
| ------- | ------- | --------------------------------------- |
| success | bool    | true: response data return successfully |
| count   | integer | total number of delegates               |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/delegates/count'   
```

JSON Response Example:

```
{"success":true,"count":235}   
```

#### 2.4.2 Get the Voters of Delegates by Public Key

Interface Address: /api/delegates/voters
Request Method:get
Supported Format: urlencoded
Request Parameter Description:

| Name      | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| publicKey | string | Y        | public key of the delegate |

Response Parameter Description:

| Name     | Type  | Description                             |
| -------- | ----- | --------------------------------------- |
| success  | bool  | true: response data return successfully |
| accounts | Array | a JSON object list of account           |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/delegates/voters?publicKey=af79cf18eaed6865fa4c9bab03eee0daba0e8f0ca38fb4ff38de01776f827b01'   
```

JSON Response Example:

```
{
"success":true,
"accounts":
[
{
"username":"btcnz",
"address":"N6jNrmosccaBqcB94Sfmbr9HBLNAiicUhW",
"publicKey":"c2765c535d9490e4713b44c51a16dbd7db214da2e541cece4fb786cf5655f489",
"balance":383369000000,
"weight":0.00034460610310443386
},
{
"username":"",
"address":"NLEbUv8bAmjN4RfJwwSMZkfrX8UUtYiRdU",
"publicKey":"7a4bf010299762ed689915b33cafc32dc2a48f46c0fb0654661090344d395723",
"balance":19949869773000000,
"weight":17.93271464284923
}
]
}  
```

#### 2.4.3 Get the Delegate's Detail by Public Key or Name

Interface Address: /api/delegates/get/
Request Method:get
Supported Format: urlencoded
Comment:Get the delegate's detail by his/her public key or user name
Request Parameter Description:

| Name      | Type   | Required                               | Description           |
| --------- | ------ | -------------------------------------- | --------------------- |
| publickey | string | choose only one parameter of these two | delegate's public key |
| username  | string |                                        | delegate's user name  |

Response Parameter Description:

| Name     | Type | Description                             |
| -------- | ---- | --------------------------------------- |
| success  | bool | true: response data return successfully |
| delegate | json | the detail information of this delegate |

Request Example:

```
curl -k -X GET http://NASGONODEIP:9040/api/delegates/get?publicKey=af79cf18eaed6865fa4c9bab03eee0daba0e8f0ca38fb4ff38de01776f827b01   
curl -k -X GET http://NASGONODEIP:9040/api/delegates/get?username=steve   
```

JSON Response Example:

```
{
"success":true,
"delegate":
{
"username":"steve",
"address":"N28ChcNxCuu9AroexhKMbuAobrA1iCuxot",
"publicKey":"af79cf18eaed6865fa4c9bab03eee0daba0e8f0ca38fb4ff38de01776f827b01",
"balance":104255084317019,
"vote":19950253142000000,
"producedblocks":20833,
"missedblocks":0,
"fees":90084317019,
"rewards":104165000000000,
"rate":89,
"approval":17.93,
"productivity":100,
"forged":"104255084317019"
}
}  
```

#### 2.4.4 Get the List of Delegates

Interface Address: /api/delegates
Request Method:get
Supported Format: urlencoded
Comment: if there is no parameter, all delegates in the whole network will be returned. Request Parameter Description:

| Name    | Type    | Required | Description                              |
| ------- | ------- | -------- | ---------------------------------------- |
| address | string  | N        | delegate's address                       |
| limit   | int     | N        | maximum return records                   |
| offset  | integer | N        | offset, minimum: 0                       |
| orderBy | string  | N        | [field used to sort]:[sort type] e.g., address:desc |

Response Parameter Description:

| Name      | Type  | Description                              |
| --------- | ----- | ---------------------------------------- |
| success   | bool  | true: response data return successfully  |
| delegates | Array | a list containing delegates' detail information |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/delegates?orderby=approval:desc&limit=2'
```

JSON Response Example:

```
{
"success":true,
"delegates":[
{
"username":"bloosom",
"address":"ND924N5pEobTDZA6TYxpXpGSRD3ii5gu4a",
"publicKey":"3761ef6a41707c9e7deda92cc54720a43f980bbff9f6f3188104cf30caa318cd",
"balance":104118812148394,
"vote":20113709261339920,
"producedblocks":20806,
"missedblocks":0,
"fees":88812148394,
"rewards":104030000000000,
"rate":1,
"approval":18.08,
"productivity":100,
"forged":"104118812148394"
},
{
"username":"pangpang",
"address":"NGG7tAYq21xoyScj9LWidVMhyAzMJGRcW2",
"publicKey":"2944409c221cf06710eefd35cbf628e1c0511a3f35fd62262e33a9d3c314497a",
"balance":104256079138184,
"vote":20113329265670176,
"producedblocks":20833,
"missedblocks":0,
"fees":91079138184,
"rewards":104165000000000,
"rate":2,
"approval":18.08,
"productivity":100,
"forged":"104256079138184"
}
],
"totalCount":235
}
```

   

### 2.5 Peers

#### 2.5.1 Get all Peers' Information in the Whole Network

Interface Address: /api/peers
Request Method:get
Supported Format: urlencoded
Request Parameter Description:

| Name    | Type    | Required | Description                              |
| ------- | ------- | -------- | ---------------------------------------- |
| state   | integer | N        | peer's status: 0:,1:,2:,3:               |
| os      | string  | N        | Linux kernel version                     |
| version | string  | N        | Nasgo system version                     |
| limit   | integer | N        | maximum return records, minimum:0, maximum: 100 |
| orderBy | string  | N        |                                          |
| offset  | integer | N        | offset, minimum 0                        |
| port    | integer | N        | port number，1~65535                      |

Response Parameter Description:

| Name       | Type    | Description                             |
| ---------- | ------- | --------------------------------------- |
| success    | bool    | true: response data return successfully |
| peers      | Array   | a JSON array of peers' information      |
| totalCount | integer | the number of currently running peers   |

Request Example:

```
curl -k -X GET 'http://NASGONODEIP:9040/api/peers?limit=2'   
```

JSON Response Example:

```
{
"success":true,
"peers":
[
{
"ip":"xx.xx.xx.xx",
"port":9040,
"state":1,
"os":"linux4.4.0-105-generic",
"version":"1.0.0"
},
{
"ip":"xx.xx.xx.xx",
"port":9040,
"state":2,
"os":"linux4.4.0-105-generic",
"version":"1.0.0"
}
],
"totalCount":["5"]
}
```

### 2.6 Sync and Loader

#### 2.6.1 Get the local blockchain loadig status

Interface Address: /api/loader/status
Request Method: get
Supported Format: none
Request Parameter Description: none

Response Parameter Description:

| Name        | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| success     | bool    | true: response data return successfully |
| loaded      | bool    |                                         |
| blocksCount | integer |                                         |

Request Example:

```
curl -k http://NASGONODEIP:9040/api/loader/status -X GET   
```

JSON Response Example:

```
{   
	"success": true,   
	"loaded": true,   
	"blocksCount": 0   
}   
```

#### 2.6.2 Get the block syncing status

Interface Address: /api/loader/status/sync
Request Method: get
Supported Format: none
Request Parameter Description: none

Response Parameter Description:

| Name    | Type | Description                             |
| ------- | ---- | --------------------------------------- |
| success | bool | true: response data return successfully |
| height  | int  | block height                            |

Request Example:

```
curl -k http://NASGONODEIP:9040/api/loader/status/sync -X GET   
```

JSON Response Example:

```
{   
	"success": true,   
	"syncing": false,  // show whether in synchronising. if yes, it will be "true". if there is no data to synchronise, it will be "false" 
	"blocks": 0,   
	"height": 2049757   
}    
```

### 2.7 Assets

#### 2.7.1 Get all issuers

Interface Address: api/uia/issuers
Request Method: get
Supported Format: none
Request Parameter Description: 

| Name   | Type    | Required | Description                              |
| ------ | ------- | -------- | ---------------------------------------- |
| limit  | integer | N        | maximum return records, minimum:0, maximum: 100 |
| offset | integer | N        | offset, minimum 0                        |

Response Parameter Description:

| Name    | Type | Description                             |
| ------- | ---- | --------------------------------------- |
| success | bool | true: response data return successfully |
| issuers | json |                                         |

Request Example:

```
curl -k http://NASGONODEIP:9040/api/uia/issuers?limit=3&offset=0 -X GET  
```

JSON Response Example:

````
{
"success":true,
"issuers":
[
{"name":"NASGO",
"desc":"NASGO",
"issuerId":"14762548536863074694"},
{"name":"Joeyyyy",
"desc":"currency for projectx",
"issuerId":"NB7xeozZHVnN1X7vAvbH7fjcXagu8JPSkE"},
{"name":"Andy",
"desc":"Test",
"issuerId":"N8HBg9j8G8eJNmg4K8EBHvbQb8v5HuxA3f"}
],
"count":132
}
````

#### 2.7.2  Get issuer information  by address

API Endpoint: /api/v2/uia/issuers/:address
HTTP Verb: GET
Format: urlencoded

Request Parameter Description:

| Name    | Type   | Required | Description                      |
| ------- | ------ | -------- | -------------------------------- |
| address | string | Y        | Can be the Nasgo account address |

Response Parameter Description:

| Name    | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| success | boolean | Whether operation was successful         |
| issuers | JSON    | Contains the publisher name, description and id (Nasgo address) |

Request example:

```
curl -X GET -H "Content-Type: application/JSON"  'http://localhost:4096/api/uia/issuers/NB7xeozZHVnN1X7vAvbH7fjcXagu8JPSkE' 
```

JSON Response:

```
{"success":true,
"issuer":
{
"name":"Joeyyyy",
"desc":"currency for projectx"
}
}
```

#### 2.7.3 Get all assets in mainnet

API Endpoint: /api/uia/assets
HTTP Verb: GET
Format: urlencoded

Request Parameter Description:

| Name   | Type    | Required | Description                              |
| ------ | ------- | -------- | ---------------------------------------- |
| limit  | integer | N        | maximum number of records to return, between 0 and 100 |
| offset | integer | N        | Offset, minimum 0                        |

Response Parameter Description:

| Name    | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| success | boolean | Whether operation was successful         |
| assets  | Array   | Array of assets, each item is an asset detail, including asset name, description, cap, precision, strategy, current circulation, issue height, publisher id, acl, whether to log off |
| count   | integer | Number of all assets                     |

Request example:

```
curl -X GET -H "Content-Type: application/JSON"  'http://localhost:4096/api/uia/assets?offset=5&limit=2' && echo
```

JSON Response:

```
{"success":true,
"assets":
[
{"name":"EXCHANGE.BTC",
"desc":"for btc exchange",
"maximum":"10000000000000000",
"precision":8,
"strategy":"",
"quantity":"10000000000000000",
"height":388167,
"issuerId":"NFoAosRG8Ycnrj68aYuJnLe9FB7VVtgmt1",
"acl":0,
"writeoff":0,
"allowWriteoff":0,
"allowWhitelist":0,
"allowBlacklist":0,
"maximumShow":"100000000",
"quantityShow":"100000000"},
{"name":"nasgo.ETH",
"desc":"for eth exchange",
"maximum":"10000000000000000",
"precision":8,
"strategy":"",
"quantity":"10000000000000000",
"height":388179,
"issuerId":"NGfdpSrNzKebjSFpYzwzxYBkEvthrxWn85",
"acl":0,
"writeoff":0,
"allowWriteoff":0,
"allowWhitelist":0,
"allowBlacklist":0,
"maximumShow":"100000000",
"quantityShow":"100000000"}
],
"count":142
}
```

#### 2.7.4 Get the balance of all assets created by a account

API Endpoint: /api/uia/balances/:address
HTTP Verb: GET
Format: urlencoded

Request Parameter Description:

| Name    | Type    | Required | Description                              |
| ------- | ------- | -------- | ---------------------------------------- |
| address | string  | Y        | Nasgo account address                    |
| limit   | integer | N        | maximum number of records to return, between 0 and 100 |
| offset  | integer | N        | Offset, minimum 0                        |

Response Parameter Description:

| Name     | Type    | Description                              |
| -------- | ------- | ---------------------------------------- |
| success  | boolean | Whether operation was successful         |
| balances | Array   | Asset array, details owned, each element is an asset, including asset name, balance, cap, precision, current circulation, whether to cancel (0: not cancelled, 1: cancelled) |
| count    | integer | The number of assets currently owned by this address |

Request example:

```
curl -X GET -H "Content-Type: application/JSON" 'http://localhost:4096/api/uia/balances/NFoAosRG8Ycnrj68aYuJnLe9FB7VVtgmt1' && echo
```

JSON Response:

```
{
"success":true,"balances":[
{"currency":"EXCHANGE.BTC",
"balance":"9999010000000000",
"maximum":"10000000000000000",
"precision":8,
"quantity":"10000000000000000",
"writeoff":0,
"allowWriteoff":0,
"allowWhitelist":0,
"allowBlacklist":0,
"maximumShow":"100000000",
"quantityShow":"100000000",
"balanceShow":"99990100"},
{"currency":"EXCHANGE.ETH",
"balance":"10000000000000000",
"maximum":"10000000000000000",
"precision":8,
"quantity":"10000000000000000",
"writeoff":0,"allowWriteoff":0,
"allowWhitelist":0,
"allowBlacklist":0,
"maximumShow":"100000000",
"quantityShow":"100000000",
"balanceShow":"100000000"}
],
"count":2}
```

#### 2.7.5 Get specified asset information

API Endpoint: /api/uia/assets/:name
HTTP Verb: GET
Format: urlencoded

Request Parameter Description:

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
| name | string | Y        | Asset name  |

Response Parameter Description:

| Name    | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| success | boolean | Whether operation was successful         |
| assets  | JSON    | Contains asset name, description, cap, precision, current circulation, issue height, publisher id |

Request example:

```
curl -X GET -H "Content-Type: application/JSON"  'http://localhost:4096/api/uia/assets/EXCHANGE.BTC'
```

JSON Response:

````
{

"success":true,
"asset":
{"name":"EXCHANGE.BTC",
"desc":"for btc exchange",
"maximum":"10000000000000000",
"precision":8,
"strategy":"",
"quantity":"10000000000000000",
"height":388167,
"issuerId":"NFoAosRG8Ycnrj68aYuJnLe9FB7VVtgmt1",
"acl":0,
"writeoff":0,
"allowWriteoff":0,
"allowWhitelist":0,
"allowBlacklist":0,
"maximumShow":"100000000",
"quantityShow":"100000000"}
}

````



#### 2.7.6 Get Assets Transactions List by address

API Endpoint:/api/uia/transactions/my/:address
HTTP Verb: GET
Format: urlencoded

Request Parameter Description:

| Name    | Type   | Required | Description      |
| ------- | ------ | -------- | ---------------- |
| orderBy | string | N        | t_timestamp:desc |
| limit   | int    | N        |                  |
| offset  | int    | N        |                  |

Response Parameter Description:

| Name         | Type    | Description                      |
| ------------ | ------- | -------------------------------- |
| success      | boolean | Whether operation was successful |
| transactions | JSON    |                                  |

Request example:

````
{"success":true,
"transactions":
[
{"id":"78703bb935052445070ecf69f5818ec7a190d167500e2166c3420b976f861207",
"height":"388164",
"blockId":"e1a495fbc8ad6c379031d0752ed6981695bda4a69e88adba9d64a68befe1d280",
"type":9,
"timestamp":5300860,
"senderPublicKey":"275bd24dceaf27d45f8a5b8d1cf0dafc4291ae32730a7899d2693a9bff981c2f",
"senderId":"NFoAosRG8Ycnrj68aYuJnLe9FB7VVtgmt1",
"recipientId":"",
"amount":0,
"fee":10000000000,
"signature":"8947df2b3991f3afb243a8d701902193253c1dbc7d93c40694f6fa846d7baaef0f5bd2803e63b35ad624c788c2f36c6b4d5fc5cc5f6d27ad042d1297b4a2120c",
"signSignature":"",
"signatures":null,
"confirmations":"1661764",
"args":[],
"message":"",
"asset":
{
"uiaIssuer":
{
"transactionId":"78703bb935052445070ecf69f5818ec7a190d167500e2166c3420b976f861207",
"name":"EXCHANGE",
"desc":"Coin Exchange"
}
}
},
{
"id":"a1d60e0e6ef9f49f05f7cf4642811d3735f1f37cc28664d8d923d8a105c7004b",
"height":"388167",
"blockId":"aa33fc4003bccfc751e6dc7076ba4d7a88b2daa799b16b39e099dbe1bdceaf90",
"type":10,
"timestamp":5300887,
"senderPublicKey":"275bd24dceaf27d45f8a5b8d1cf0dafc4291ae32730a7899d2693a9bff981c2f",
"senderId":"NFoAosRG8Ycnrj68aYuJnLe9FB7VVtgmt1",
"recipientId":"",
"amount":0,
"fee":50000000000,
"signature":"8aa2c9e5c2142bd0d552be048f1973c5b38dd2d284adad3be7b74f59541b0dffbc993867d03fcd970a0c84b25a714e18daec0ade2ee02afdab5fc48871d6db0f",
"signSignature":"",
"signatures":null,
"confirmations":"1661761",
"args":[],
"message":"",
"asset":
{
"uiaAsset":
{
"transactionId":"a1d60e0e6ef9f49f05f7cf4642811d3735f1f37cc28664d8d923d8a105c7004b",
"name":"EXCHANGE.BTC",
"desc":"for btc exchange",
"maximum":"10000000000000000",
"precision":"8",
"strategy":""
}
}
}
],
"count":7}
````

### 2.8 DAPP

#### 2.8.1 Get all dapps registered in mainnet

API Endpoint:/api/dapps
HTTP Verb: GET
Format: urlencoded

Request Parameter Description:

| Name   | Type | Required | Description |
| ------ | ---- | -------- | ----------- |
| limit  | int  | N        |             |
| offset | int  | N        |             |

Response Parameter Description:

| Name    | Type    | Description                      |
| ------- | ------- | -------------------------------- |
| success | boolean | Whether operation was successful |
| dapps   | JSON    |                                  |

Return example:

````
{"success":true,
"dapps":
[
{
"name":"Global Lotto",
"description":"lottery game based on blockchain",
"tags":"game",
"link":"https://github.com/NASGO/global-lotto-game/archive/lotto.zip",
"type":0,
"category":1,
"icon":"http://docs.nasgo.com/lotto.jpg",
"delegates":["13ef60173dcf2a050dacfabb21600bae54200c341fad67031231eacd02c4420e","01c07dab1eff8f9f00dcb88b6c3ba706c0fe10dbe8f0bd72cc10c998182d238e","b15d9a5c7522e38bb02c0d4c7639d16dc3395f261e48c16133a7b64bd4b571cc","3757568499c5710bc2d895d8227448a504b13cd5030e24f9ee477f638e8d1b63","ed21df88c5cca5afc14c34b613b05fc8ce55dc74256eb35a62d020a798fe48a7"],
"unlockDelegates":3,
"transactionId":"0466d2dd062aae29af34d9612d2edda1fbed370b4112c830df05e9cca1ce1e35"
},
{"name":"test",
"description":"lottery game based on blockchain",
"tags":"game",
"link":"https://github.com/NASGO/global-lotto-game/archive/lott1.zip",
"type":0,
"category":1,
"icon":"http://docs.nasgo.com/lotto.jpg",
"delegates":["afdf69f0da9ff333218f2cd10cb0a907c2e76788f752b799cb1dab3a9f03bf63","67d52a0265f9e5366660c8b384cee56d3f8b5737b2dd3c617d22df83b5ebef02","39c2322600a0c81ecfa97119ec8e2d5bfb73394914d92b54e961846a987e4e22","4740d2c16bf6c5a174eba1e0f859253a64851d30acbc9655b01394af82d3e325","b433c226645981477642491f77de7b8d63274aa51f932bbe1fe3f445a8aaecc9"],
"unlockDelegates":3,
"transactionId":"3c140d4a2d19e6b7446175341657199642c6cae4ef7ed8123a717b702e3ebe43"
}],
"count":{"count":10}
}
````



#### 2.8.2 Get all dapps installed in current node

API Endpoint:/api/dapps/installed
HTTP Verb: GET
Format: urlencoded

Request Parameter Description:

| Name   | Type | Required | Description |
| ------ | ---- | -------- | ----------- |
| limit  | int  | N        |             |
| offset | int  | N        |             |

Response Parameter Description:

| Name    | Type    | Description                      |
| ------- | ------- | -------------------------------- |
| success | boolean | Whether operation was successful |
| dapps   | JSON    |                                  |

Return example:

````
{
"success":true,
"dapps":
[
{"name":"Global Lotto Game",
"description":"lottery game based on blockchain",
"tags":"nasgov1",
"link":"https://da43cf07af3dba5e9555da1ccab242ffa2a9d8a842f840dc9dbda984a3cd7397.com/1523721392000.zip",
"type":0,
"category":2,
"icon":"https://da43cf07af3dba5e9555da1ccab242ffa2a9d8a842f840dc9dbda984a3cd7397.com/1523721392000.png",
"delegates":["66bb9269fdc37c16a36a780967fe26f2a166cb17ab2381a14fc6b1a14354c1bf","384e9bcd6b345b88ac01691daa49f5b62fb2e67d89f9fc678132bd8f2af49cf8","f05e1c1cc703d5c6b8a702041d6bda34a2fe22df177e1899cff16b5541b0bfcb","2b5e02738b1931d1c8b90af94b260ceff5777f06b0e2e103ed82526585f65e0f","cfce8b1da887a5728ada2fde6e226079b6beaa12415916e7378bd02fe2fbcf05"],
"unlockDelegates":3,
"transactionId":"89e16a09cfbc9a3a644dd488b6c415d43b7d254e11757d40d506b5b9addec63d"}
]
}
````



## 3 CREATE TRANSACTION

### 3.1 Set the secure code

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [nasgo-js.signature.createSignature] |

Response Parameter Description:

| Name    | Type | Description                           |
| ------- | ---- | ------------------------------------- |
| success | bool | whether the transaction is successful |

Request Example:

```
var Nasgo = require('nasgo-js');    
var transaction = Nasgo.signature.createSignature('measure bottom stock hospital calm hurdle come banner high edge foster cram','mysecurecode')       

// submit above data of setting secure code to NASGO Node by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions   
```

JSON Response Example:

```
{
    "success":true  //setting is successful
}	
```



### 3.2 Transfer NSG

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [nasgo-js.transaction.createTransaction] |

Response Parameter Description:

| Name    | Type | Description                           |
| ------- | ---- | ------------------------------------- |
| success | bool | whether the transaction is successful |

Request Example:

```
var NasgoJS = require('nasgo-js');   
var targetAddress = "NFoAosRG8Ycnrj68aYuJnLe9FB7VVtgmt1";  
var amount = 100*100000000;   //100 NSG
var password = 'measure bottom stock hospital calm hurdle come banner high edge foster cram';
var secondPassword  = 'mysecurecode';
var transaction = NasgoJS.transaction.createTransaction(targetAddress, amount,message, password, secondPassword || undefined);       
// submit above data of transfer to Nasgo server by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions
```

JSON Response Example:

```
{
    "success":true  //transfer success
}		
```



### 3.3 Transfer Asset

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [nasgo-js.transaction.createTransaction] |

Response Parameter Description:

| Name    | Type | Description                           |
| ------- | ---- | ------------------------------------- |
| success | bool | whether the transaction is successful |

Request Example:

```
var NasgoJS = require('nasgo-js');
var currencyName="EXCHANGE.ETH";
var precision=8;
var targetAddress = "NFoAosRG8Ycnrj68aYuJnLe9FB7VVtgmt1";  
var amount = 100*Math.pow(10,precision);   //100 EXCHANGE.ETH
var password = 'measure bottom stock hospital calm hurdle come banner high edge foster cram';
var secondPassword  = 'mysecurecode';
var transaction = NasgoJS.uia.createTransfer(currencyName, amount,,targetAddress,message, password, secondPassword || undefined);       
// submit above data of transfer to Nasgo server by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions
```

JSON Response Example:

````
"success":true  //transfer success
````



### 3.4 Register as a delegate

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [nasgo-js.delegate.createDelegate] |

Response Parameter Description:

| Name    | Type | Description                    |
| ------- | ---- | ------------------------------ |
| success | bool | whether transaction is success |

Request Example:

```
var NasgoJS = require('nasgo-js');   
var password = 'measure bottom stock hospital calm hurdle come banner high edge foster cram';
var securecode  = 'mysecurecode';
var userName = 'NASGO_DELEGATE';  
var transaction = NasgoJS.delegate.createDelegate(userName, password, securecode || undefined);   


// submit above data of registering delegate to Nasgo server by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions
```

JSON Response Example:

```
{
    "success":true  //register successfully
}		
```

### 3.5 Vote and Cancel the vote

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [Nasgo-js.vote.createVote] |

Response Parameter Description:

| Name    | Type | Description                           |
| ------- | ---- | ------------------------------------- |
| success | bool | whether the transaction is successful |

Request Example:

```
var NasgoJS = require('nasgo-js');   
var password = 'measure bottom stock hospital calm hurdle come banner high edge foster cram';
var securecode  = 'mysecurecode';
// the voting content is a list in which each item consists of a symbol (+ or -) and the delegate's public key. The "+" means vote, and "-" means cancel the vote.
var voteContent = [
    '-ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7',
    '+c292db6ea14d518bc29e37cb227ff260be21e2e164ca575028835a1f499e4fe2'
];
var transaction = NasgoJS.vote.createVote(voteContent,password, securecode || undefined);

// submit above data of vote/cancel vote to Nasgo server by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions
```

JSON Response Example:

```
{
    "success":true  //transaction of vote/cancel the vote is success
}		
```

### 3.6 Register as an issuer

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [nasgo-js. uia.createIssuer] |

Response Parameter Description:

| Name    | Type | Description                    |
| ------- | ---- | ------------------------------ |
| success | bool | whether transaction is success |

Request Example:

```
var NasgoJS = require('nasgo-js');  
var name="ISSUER";
var desc="test";
var password = 'measure bottom stock hospital calm hurdle come banner high edge foster cram';
var securecode  = 'mysecurecode';
var userName = 'NASGO_DELEGATE';  
var transaction =NasgoJS.uia.createIssuer(name, desc, password, securecode||'');


// submit above data of registering delegate to Nasgo server by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions
```

JSON Response Example:

````
 "success":true  
````



### 3.7 Register an asset

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [nasgo-js. uia.createIssuer] |

Response Parameter Description:

| Name    | Type | Description                    |
| ------- | ---- | ------------------------------ |
| success | bool | whether transaction is success |

Request Example:

```
var NasgoJS = require('nasgo-js');  
var name="ISSUER";
var desc="test";
var maximum=100000000;
var precision=8;
var strategy=0;
var allowWriteoff=0;
var allowWhitelist=0;
var allowBlacklist=0;
var password = 'measure bottom stock hospital calm hurdle come banner high edge foster cram';
var securecode  = 'mysecurecode';
var userName = 'NASGO_DELEGATE';  
var transaction =NasgoJS.uia.createAsset(name, desc, maximum, precision, strategy, allowWriteoff, allowWhitelist, allowBlacklist, password, securecode||'');;

// submit above data of registering delegate to Nasgo server by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions
```

JSON Response Example:

```
"success":true  
```



### 3.8 Issue an asset

Request Parameter Description:

| Name        | Type | Required | Description                              |
| ----------- | ---- | -------- | ---------------------------------------- |
| transaction | json | Y        | transaction data generated by [nasgo-js. uia.createIssuer] |

Response Parameter Description:

| Name    | Type | Description                    |
| ------- | ---- | ------------------------------ |
| success | bool | whether transaction is success |

Request Example:

```
var NasgoJS = require('nasgo-js');  
var assetname="ISSUER";
var amount=100000000*8;
var password = 'measure bottom stock hospital calm hurdle come banner high edge foster cram';
var securecode  = 'mysecurecode';
var userName = 'NASGO_DELEGATE';  
var transaction =NasgoJS.uia.createIssue(assetname, amount, password, securecode||'');

// submit above data of registering delegate to Nasgo server by POST method
curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{transaction}' http://NASGONODEIP:9040/peer/transactions
```

JSON Response Example:

````
"success":true  
````

