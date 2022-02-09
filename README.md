# Build Multi Stack Communication Extension in Contentstack using React JS

React.js is a JavaScript library for dynamic websites with rich user interfaces.

This guide will help you build and use the multi stack communication extension using React.js. This extension helps to communicate between more than one stack, accessing their data and assets based on various options/parameters.

Let&#39;s look at the steps to build the multi stack communication extension using React.js.

## Prerequisites

- Basic understanding of React.js
- [Contentstack](https://app.contentstack.com/#!/login) account
- Node.js version 12 or later

**Note** : For this tutorial, we have assumed that you are familiar with Contentstack and React.js. If not, please refer to the [Contentstack docs](https://www.contentstack.com/docs), and [React](https://reactjs.org/docs/getting-started.html) docs for more details.

## Set Up Your App

This involves three parts:

1. Setting up the Multi Stack Communication extension in Contentstack
2. Setting up React.js code for the extension
3. Using the extension in content type entry

## 1. Setting up the Multi Stack Communication extension in Contentstack

To set up the extension, [log in](https://www.contentstack.com/login/) to your Contentstack account and proceed with the following steps:

1. Go to your [stack](https://www.contentstack.com/docs/developers/set-up-stack/about-stack/), navigate to the **Settings** icon, and select **Extensions**.

2. On the **Extensions** page, click on the **+ Add Extension** button and then on **Create new**. Alternatively, you can click on the **+ Add Extension** button at the bottom, as shown below:

![New Extension](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/blt99f41a352766c2b3/61fbbeb72f5ed026e153c91a/image1.png)

3. In the **Select Extension Type** window, select **Custom Field**.

![Extension Type](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/bltf890ff669decc2b3/61fbbeb8ce30533458034fd8/image8.png)

4. On the **Create New Extension** page, enter values in the fields as given below:

  a) **Title** (required): Provide a suitable title, for example **Multi Stack Communication** , for your custom field. This title will be visible when you select the extension in the custom field in your content type.

  b) **Field data type** (required): Select the data type in which the input data of the field should be saved in Contentstack. In this case, select **JSON**.

  c) **Multiple** (optional): Leave this field unchecked.

  d) **Hosting method** (required): Select **External Hosting** as the hosting method for this content type and enter the url which contains the React.js extension code. In this case, enter url as **http://localhost:3000/**

  e) **Config parameter** : (optional): Specify the required config. This is based on the structure of your extension code. In this case, please refer the following config as shown below:

```
{
	"stackA": [
	{
		"api_key": "YOUR API KEY",
		"management_token": "YOUR MANAGEMENT TOKEN",
		"access_token": "YOUR ACCESS TOKEN",
		"baseUrl": "api.contentstack.io",
		"assetsType": [
			"image/svg+xml",
			"image/gif",
			"image/png",
			"application/json",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"video/webm",
			"application/pdf",
			"video/quicktime",
			"application/zip"
		]
	}
	],
	"stackB": [
	{
		"api_key": "YOUR API KEY",
		"management_token": "YOUR MANAGEMENT TOKEN",
		"access_token": "YOUR ACCESS TOKEN",
		"baseUrl": "api.contentstack.io",
		"assetsType": [
			"image/svg+xml",
			"image/jpeg",
			"image/png",
			"application/json"
		]
	}
	]
}
```

The config is an object which stores multiple Stack information which is used for fetching their content type data and assets. You can choose any name for each Stack object. In this case, it&#39;s **stackA** and **stackB**. Each Stack is an array which contains following key value pairs:

1. **api\_key** (required): Specifies the api key of the stack. For more info, click [here](https://www.contentstack.com/docs/developers/set-up-stack/stack-faqs/#where-can-i-find-the-api-key-and-access-token-of-my-stack-).

2. **management\_token** (required): Specifies the management token of the stack. For more info, click [here](https://www.contentstack.com/docs/developers/create-tokens/generate-a-management-token/).

3. **access\_token** (required): Specifies the access token of the stack. For more info, click [here](https://www.contentstack.com/docs/developers/set-up-stack/stack-faqs/#where-can-i-find-the-api-key-and-access-token-of-my-stack-).

4. **baseUrl** (required): Specifies the base url to be used for the Contentstack client. The urls can be as follows -

     - NA Region - https://api.contentstack.io
     - EU Region - https://eu-api.contentstack.com/


5. **assetsType** (required): Specifies the list of asset types.
5. Once you have added these details, click on **Save**.

## 2. Setting up React.js code for the extension

To set up the React code for the extension, proceed with the following steps:

1. Clone the code from our repository.

2. Open the code in any appropriate code editor application.

3. Open the command prompt and move inside the project root directory. Then, run the command **npm install** to install the required dependencies.

4. In the command terminal, execute the command:
**npm start**

5. In your web-browser enter the following address:
[**http://localhost:3000/**](http://localhost:3000/)

To understand the code structure, please visit [here](#4-understanding-the-code-structure-for-the-extension).

## 3. Using the extension in content type entry

To integrate Multi Stack Communication extension with Contentstack, we have created a content type named **Multi-Communication Extension** that has the following structure (Please note that the following content type is created for demo purpose only. You can add this extension to any existing content types or create your own new one) :

![Extension Usage](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/blt7e0e1d104556a0a6/61fbbeb7ce30533458034fd4/image2.png)

As you can see above, its content type consists of [Title field](https://www.contentstack.com/docs/developers/create-content-types/title) and [Custom field](https://www.contentstack.com/docs/developers/create-content-types/custom/) which is used to add the extension that we created.

The entry of this Multi-Communication Extension is shown below:

![Entries And Assets](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/blt6a641d69d53a5d15/61fbbec613bbb628521ffeca/image5.gif)

As seen above, the Multi-Stack field(which is our extension) contains the following fields:

1. **Entries** - This section is used to create multiple entries that will fetch required data from multiple stacks and content types.

2. **Assets** - This section is used to create multiple assets that will fetch required assets from multiple stacks.

The **Entries** section has the following structure:

![Entries Section](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/blt7683cf8912d27514/61fbe036bd7acb345ace704c/image_6.gif)

As seen above, the Entries section contains the following fields in the order of their selection:

1. **Select Stack** - This field shows a list of stacks that we configured before in the **Config Parameter** section in the extension. In this case, we selected **Stack B**.

2. **Select ContentType** - Upon selection of Stack, this field shows the list of respective Content Types. In this case, we selected **Page**.

3. **Select Environment** - Upon selection of ContentType, this field shows the list of respective Environments. In this case, we selected **development**.

1. **Select Locale** - Upon selection of Environment, this field shows the list of respective Locales. In this case, we selected **en-us**.

2. **Select Entry** - Upon selection of Locale, this field shows the list of respective Entries. In this case, we selected **Home**. We can select multiple entries.

The **Assets** section has the following structure:

![Assets Section](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/blt01f01ba9c97de5aa/61fbe11ece30533458034ff2/image_7.gif)

As seen above, the Assets section contains the following fields in the order of their selection:

1. **Select Stack** - This field shows a list of stacks that we configured before in the **Config Parameter** section in the extension. In this case, we selected **Stack B**.

2. **Select Folder** - Upon selection of Folder, this field shows the list of respective asset folders available in the Stack. If there are no folders, this field will not be visible. In this case, we selected **Authors**. We can select multiple folders.

3. **Select AssetType** - Upon selection of Folder, this field shows the list of respective Asset types. In this case, we selected **image/png**. We can select multiple asset types.

4. **Select Assets** - Upon selection of AssetType, this field shows the list of respective assets. We can select multiple assets.

Other features of this extension are as follows:

![Other Features](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/blt3261db32cd551b27/61fbce5f8624ed26d399d3cc/image_10.png)

1. We can create more than one entry and asset.

2. For the fields that contain multiple selection, you can search for the data.

3. Using the delete icon, any of the entries and assets can be deleted.

Once you have added required entries and assets, click on **Save**. To check if the data entry is saved successfully, click on the **three dots icon** and select **Export**. This will download a JSON file which will contain the JSON object for the extension which has the following structure. We can achieve this JSON output using our Contentstack Management API as well. To know more you can click [here](https://www.contentstack.com/docs/developers/apis/content-management-api/#export-an-entry).

**Entries structure** :

![Entries JSON](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/bltae189378aadcc082/62026950e9cebb4707ebeb83/entry_json.png)

**Assets structure** :

![Assets JSON](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/bltae189378aadcc082/620375b89149cc493bb9b85d/entry_json.png)

This JSON object contains the data that we captured for entries/assets.

## 4. Understanding the code structure for the extension

![Understanding the code structure](https://images.contentstack.io/v3/assets/blt1c11a1ad74628afa/blt27e0574bd259c26f/61fbbeb62f1ba82848b68a82/image4.png)

- The entry point for the extension is the &#39;App.js&#39; file. It initializes the extension and passes the data to the required components for &#39;Entries&#39; and &#39;Assets&#39;. The extension makes use of Venus components and extension sdk.

- &#39;Components&#39; folder contains separate components for &#39;Entries&#39; and &#39;Assets&#39;, namely, &#39;AddEntry&#39; and &#39;AddAssets&#39;, respectively.

- &#39;AddEntry&#39; manages the data fields &#39;content\_type&#39;, &#39;entry&#39;, &#39;local&#39; and &#39;environment&#39;. The &#39;index.js&#39; file manages the state of these fields and accordingly handles fetching and adding of entries.

- &#39;AddAssets&#39; manages the data fields &#39;assets&#39;, &#39;file\_types&#39; and &#39;folders&#39;. The &#39;index.js&#39; file manages the state of these fields and accordingly handles fetching and adding of assets.

- The extension uses an SDK for fetching entries and Management API for fetching assets.
