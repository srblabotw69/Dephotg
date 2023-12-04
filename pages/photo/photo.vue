<!-- pages/todos/index.vue -->
<template>
    <!-- <div class="container mx-auto p-4 w-1/3"> -->



    <myHeader />


    <mySidebar />


    <div class="p-4 sm:ml-64 mt-14">


        <!-- <div class="container mx-auto p-4"> -->


            <!-- <header class="flex-col text-center mb-4"> -->



                <!-- <nav class="bg-white border-gray-200 dark:bg-gray-900"> -->
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                        <h1 class="text-2xl font-bold mb-4">Photo Gallery</h1>
                        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <div v-if="!showForm" class="text-left">

                                <button @click="showForm = true" class="btn btn-primary">Add a new photo</button>
                            </div>
                        </div>

                    </div>
                <!-- </nav> -->


 

                <div class="container mx-auto p-4">



                    <div v-if="sharedList.length === 0" class="empty-state text-center pt-20">
                        <p class="mb-4 text-gray-500">No Shared Todos yet.</p>
                    </div>


                    <form v-if="showForm" @submit.prevent="createSharedList" class="mb-4">
                        <div class="mb-4">
                            <label for="title" class="block mb-2"> Title:</label>
                            <input type="text" id="title" v-model="newTodo.title" class="w-full p-2 border rounded"
                                required />
                        </div>
                        <div class="mb-4">
                            <label for="description" class="block mb-2">Description:</label>
                            <textarea id="description" v-model="newTodo.description" class="w-full p-2 border rounded"
                                required></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="image" class="block mb-2">Image:</label>
                            <!-- <textarea id="image" v-model="newTodo.image" class="w-full p-2 border rounded"
            required></textarea>
 -->

                            <!-- <imageUpload /> -->

                            <!-- <img :src="newTodo.image" class="uploading-image" />   -->

                            <img :src=previewImage class="uploading-image" />

                            <input id="image" type="file" accept="image/jpeg" @change=uploadImage>

                        </div>
                        <div class="mb-4">
                            <label for="userId" class="block mb-2">Recipient's DID:</label>
                            <input type="text" id="userId" v-model="newTodo.recipientDID" class="w-full p-2 border rounded"
                                required />
                        </div>
                        <button type="submit" class="btn btn-primary">Create</button>

                        <button class="btn" @click="createCredentialOffer">Create credential offer</button>

                        <button type="button" class="btn ml-4 btn-secondary" @click="showForm = false">Cancel</button>
                        <!-- Cancel button -->
                    </form>


                    <div v-else>



                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div v-for="(todo, index) in sharedList" :key="index" class="mb-2 p-4 border rounded">
                                <div>

                                    <div @click="toggleTodoComplete(todo)" class="cursor-pointer"
                                            v-show="myDID == todo.data.author">
                                            <CheckCircleIcon active class="h-8 text-gray-200 w-8"
                                                :class="{ 'text-green-500': todo.data.completed }" />
                                        </div>
 
                                    <!-- <img class="h-auto max-w-full rounded-lg" :src="`${todo.data.image}`" alt=""> -->
                                    <nuxt-link :to="`/todos/${todo.id}`" class="text-blue-500">



                                        <h2 class="text-xl font-bold">Title: {{ todo.data.title }}</h2>
                                        <p>Description: {{ todo.data.description }}</p>
                                        <p></p>
                                        <img :src="`${todo.data.image}`" class="h-auto max-w-full rounded-lg" />
                                        <hr />
                                        <p class="text-gray-500">Created by: {{ todo.data.author.substr(0, 22) }}...</p>

                                    </nuxt-link>


                                    <br /> 
                                <button class="btn" @click="createCredentialOffer">Create credential offer</button>
                                <br />
                                        <button @click="acceptCredential" class="btn btn-secondary">Accept Credential</button>
                                        <br />
                                        <button @click="insertItem" class="btn btn-secondary">insert Credential to Wallet</button>


                                        
                                </div>
                            </div>
                        </div>


                        <!-- <ul class="mb-10"> -->
                        <!-- <ul class="mb-4">
        <li v-for="(todo, index) in sharedList" :key="index" class="mb-2 p-4 border rounded"> -->


                        <!-- <Image alt="Image" preview>
    <template #indicatoricon>
        <i class="pi pi-search"></i>
    </template>
    <template #image>
        <img :src="`${todo.data.image}`" alt="image" />
    </template>
    <template #preview="slotProps">
        <img src="./imageUpload/logo192.png" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />

        <img :src="`${todo.data.image}`" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
    </template>
</Image> -->

                        <!-- 
            <nuxt-link :to="`/todos/${todo.id}`" class="text-blue-500">
                <h2 class="text-xl font-bold">{{ todo.data.title }}</h2>
                <p>{{ todo.data.description }}</p>
                <p></p>
                <img :src="`${todo.data.image}`" />
                <hr />
                <p class="text-gray-500">Created by: {{ todo.data.author.substr(0, 22) }}...</p>
            </nuxt-link> -->


                        <!-- </li>
    </ul> -->
                    </div>


                </div>
            <!-- </header> -->
        <!-- </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import protocolDefinition from "assets/shared-todo-protocol.json";
// import imageUpload from './imageUpload/imageUpload.vue'
import myHeader from "../header.vue";
import mySidebar from "../sidebar.vue";


import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/outline';
import { initFlowbite, Modal } from 'flowbite';
// import Galleria from 'primevue/galleria';
// import Image from 'primevue/image';
// import Button from 'primevue/button';

import {
    TrinsicService, IdentityProvider,
    CreateWalletRequest,
    GetWalletInfoRequest, GetWalletFromExternalIdentityRequest,
    AuthenticateInitRequest, AuthenticateConfirmRequest,
    AddExternalIdentityInitRequest, AddExternalIdentityConfirmRequest,
    RemoveExternalIdentityRequest,
    IssueFromTemplateRequest,
    AcceptCredentialRequest,
    CreateCredentialOfferRequest,
    SignatureType,
    InsertItemRequest,
} from "@trinsic/trinsic";


const mywalletId = ref("urn:trinsic:wallets:z9zWJ2q3YkLEQfAz1uB1dMp")
// const mywalletId = ref("")

const myecosystemId = ref("urn:trinsic:ecosystems:hopeful-robinson-zhmrdhqnfhaq")
const myauthToken = ref("CiVodHRwczovL3RyaW5zaWMuaWQvc2VjdXJpdHkvdjEvb2Jlcm9uEmMKK3Vybjp0cmluc2ljOndhbGxldHM6elNrbUh4cTdRMld5UXBFeTZSbzF1algiNHVybjp0cmluc2ljOmVjb3N5c3RlbXM6aG9wZWZ1bC1yb2JpbnNvbi16aG1yZGhxbmZoYXEaMI0RIFLDofs8hGHqRN2h2mkFhI8tR5qIjzBV7S6gi9kW95jitwfYtHTvMTBXSVzBLCIA")
const mytemplateId = "https://schema.trinsic.cloud/hopeful-robinson-zhmrdhqnfhaq/hack1"

const myCredentialOffer = ref(null)

const myChallenge = ref("")
const myExternalChallenge = ref("")



const items = ref(["item1", "item2", "item3"])

/////////////////////////////
// Instantiate
/////////////////////////////

// instantiate the service without parameters

let trinsic = new TrinsicService()


/////////////////////////////
// Search Wallet
/////////////////////////////

const searchWallet = async () => {
    console.log('Running searchWallet...')
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    let items = await trinsic.wallet().searchWallet();
    console.log('items', items)
}


/////////////////////////////
// Create Wallet
/////////////////////////////

//  
// const createWallet = async () => {
// let getWalletInfoResponse = await trinsic.wallet().createWallet (
//     CreateWalletRequest.fromPartial({
//         EcosystemId: myecosystemId,
//     }),
// );
// }

const createWallet = async () => {
    console.log("Running createWallet...")
    let getWalletInfoResponse = await trinsic.wallet().createWallet(
        CreateWalletRequest.fromPartial({
            ecosystemId: myecosystemId.value,
            description: "user123",
            identity: {
                identity: email.value,
                provider: IdentityProvider.Email,
            },
            // identity: CreateWalletRequest.ExternalIdentity.fromPartial({
            //     identity: "mus56789@gmail.com",
            //     provider: IdentityProvider.Email,
            // }),
        }),
    );
    console.log("walletId", getWalletInfoResponse.wallet.walletId)
    mywalletId.value = getWalletInfoResponse.wallet.walletId;
    // trinsic = new TrinsicService({ authToken: myauthToken.value });

    // myauthToken.value = getWalletInfoResponse.authToken
    console.log('getWalletInfoResponse', getWalletInfoResponse);
}

// const createWallet = async () => {

//     // instantiate the service without parameters 
//     const walletResponse = await trinsic.wallet().createWallet({ ecosystemId: myecosystemId.value });

//     // walletId.value = walletResponse.wallet.walletId
//     myauthToken.value = walletResponse.authToken
//     mywalletId.value = walletResponse.wallet.walletId

//     // instantiate the service with 'authToken' from the response
//     trinsic = new TrinsicService({ authToken: walletResponse.authToken });
//     const infoResponse = await trinsic.wallet().getMyInfo();

//     console.log('walletResponse', walletResponse);
//     console.log('infoResponse', infoResponse);
// }


/////////////////////////////
// Add External Identity
/////////////////////////////

/////// AddExternalIdentityInit ///////

const addExternalIdentityInit = async () => {
    console.log("Running addExternalIdentityInit...")
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const addExternalIdentityInitResponse = await trinsic.wallet().addExternalIdentityInit(
        AddExternalIdentityInitRequest.fromPartial({
            identity: email.value, provider: IdentityProvider.Email,
        }),
    );

    myExternalChallenge.value = addExternalIdentityInitResponse.challenge

    console.log('addExternalIdentityInitResponse', addExternalIdentityInitResponse)
    // console.log(JSON.stringify(addExternalIdentityInitResponse))
}

/////// AddExternalIdentityConfirm ///////

const addExternalIdentityConfirm = async () => {
    console.log("Running addExternalIdentityConfirm...")
    console.log(myExternalChallenge.value)
    console.log(externalCode.value)

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const addExternalIdentityConfirmResponse = await trinsic.wallet().addExternalIdentityConfirm(
        AddExternalIdentityConfirmRequest.fromPartial({
            challenge: myExternalChallenge.value,
            response: externalCode.value,
        }),
    );

    console.log('addExternalIdentityConfirmResponse', addExternalIdentityConfirmResponse)
    // console.log(JSON.stringify(addExternalIdentityConfirmResponse))
}


/////////////////////////////
// Remove External Identity
/////////////////////////////

const removeExternalIdentity = async () => {
    console.log("Running removeExternalIdentity...")
    console.log(email.value)
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const removeExternalIdentityResponse = await trinsic.wallet().removeExternalIdentity(
        RemoveExternalIdentityRequest.fromPartial({
            identity: email.value,
        }),
    );

    console.log('removeExternalIdentityResponse', removeExternalIdentityResponse)
    // console.log(JSON.stringify(removeExternalIdentityResponse))
}


/////////////////////////////
// Get Wallet
/////////////////////////////

/////// GetWalletInfo ///////

const getWalletInfo = async () => {
    console.log("Running getWalletInfo...")
    console.log("myauthToken.value ", myauthToken.value.value)

    console.log("walletId", mywalletId.value)

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const getWalletInfoResponse = await trinsic.wallet().getWalletInfo(
        GetWalletInfoRequest.fromPartial({
            walletId: mywalletId.value,
            // walletId: walletResponse.wallet.id, 
        }),
    );
    console.log('getWalletInfoResponse', getWalletInfoResponse)
    // console.log(JSON.stringify(getWalletInfoResponse))
}

/////// GetWalletFromExternalIdentity ///////

const getWalletFromExternalIdentity = async () => {
    console.log("Running getWalletFromExternalIdentity...")

    //trinsic.options.authToken = trinsic.provider().options.authToken;

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const getWalletFromExternalIdentityResponse = await trinsic.wallet().getWalletFromExternalIdentity(
        GetWalletFromExternalIdentityRequest.fromPartial({
            identity: {
                id: email.value,
                provider: IdentityProvider.Email,
            }
        }),
    );
    console.log('getWalletFromExternalIdentityResponse', getWalletFromExternalIdentityResponse)
    // console.log(JSON.stringify(getWalletFromExternalIdentityResponse))
}


/////////////////////////////
// Authenticate
//
// IdentityProvider¶
// Name	Number	Description
// Unknown	0	Identity provider is unknown
// Email	1	Identity provider is email
// Phone	2	Identity provider is phone
// Passkey	3	Identity provider is passkey (WebAuthn) -- for Trinsic internal use only
/////////////////////////////

// Step 1 - initiate authentication challenge 
const authenticateInit = async () => {
    console.log("Running authenticateInit...")

    const authenticateInitResponse = await trinsic.wallet().authenticateInit(
        AuthenticateInitRequest.fromPartial({
            identity: email.value,
            provider: IdentityProvider.Email,
            ecosystemId: myecosystemId.value  // short name or full ecosystem ID
        })
    );

    myChallenge.value = authenticateInitResponse.challenge

    console.log('authenticateInitResponse', authenticateInitResponse)
    console.log('authenticateInitResponse.challenge', authenticateInitResponse.challenge)
}

// Step 2 - confirm authentication response
const authenticateConfirm = async () => {
    console.log("Running authenticateConfirm...")
    // console.log('code', code.value) 

    console.log('myChallenge', myChallenge.value)

    const mycode = ref(code.value)
    console.log('mycode', mycode.value)

    const authenticateConfirmResponse = await trinsic.wallet().authenticateConfirm(
        AuthenticateConfirmRequest.fromPartial({
            challenge: myChallenge.value,
            response: mycode.value
        })
    );
    console.log('authenticateConfirmResponse', authenticateConfirmResponse)

    myauthToken.value = authenticateConfirmResponse.authToken

    // use the new token to make authenticated calls
    trinsic = new TrinsicService({ authToken: authenticateConfirmResponse.authToken });
}


//////////////////////////////////////////////////////////
// Issue Credential from Credential Template
//////////////////////////////////////////////////////////

const issueFromTemplate = async () => {
    console.log("Running issueFromTemplate...")
    // console.log(email.value)

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const issueFromTemplateResponse = await trinsic.credential().issueFromTemplate(
        IssueFromTemplateRequest.fromPartial({
            templateId: "https://schema.trinsic.cloud/hopeful-robinson-zhmrdhqnfhaq/hack1",
            include_governance: true,
            valuesJson: JSON.stringify({
                // "name": "John Doe",
                // "email": "john.doe@example.com"
                "email": "dooblecorp@gmail.com"
            })
        }),
    );

    console.log('issueFromTemplateResponse', issueFromTemplateResponse)
    return issueFromTemplateResponse
}


//////////////////////////////////////////////////////////
// Accept Credential
//////////////////////////////////////////////////////////

const acceptCredential = async () => {
    console.log("Running acceptCredential...")
 
    const createCredentialOfferResponse = myCredentialOffer.value

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const acceptCredentialResponse = await trinsic.credential().acceptCredential(
        AcceptCredentialRequest.fromPartial({
            documentJson: createCredentialOfferResponse.documentJson,
        }),
    );

    console.log('acceptCredentialResponse', acceptCredentialResponse)
    // console.log(JSON.stringify(issueFromTemplateResponse))
}


//////////////////////////////////////////////////////////
// Create Credential Offer
//////////////////////////////////////////////////////////

const createCredentialOffer = async () => {
    console.log("Running createCredentialOffer...")

    const issueResponse = await issueFromTemplate()  
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const createCredentialOfferResponse = await trinsic.credential().createCredentialOffer(
        CreateCredentialOfferRequest.fromPartial({
            templateId: mytemplateId,
            valuesJson: issueResponse.documentJson,
            holderBinding: true,
            includeGovernance: true,
            generateShareUrl: true,
            signatureType: SignatureType.EXPERIMENTAL,
        })
    );

    console.log('createCredentialOfferResponse', createCredentialOfferResponse) 

    myCredentialOffer.value = createCredentialOfferResponse
}



//////////////////////////////////////////////////////////
// Insert Item
//////////////////////////////////////////////////////////

const insertItem = async () => {
    console.log("Running insertItem...")
 
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    console.log('trinsic', trinsic )
    console.log(trinsic.mywalletId )
    //  = "urn:trinsic:wallets:zQw7UqZzZre38FfemLMnJ65";

    trinsic.mywalletId = "urn:trinsic:wallets:zQw7UqZzZre38FfemLMnJ65";

    const insertItemResponse = await trinsic.wallet().insertItem(
        InsertItemRequest.fromPartial({
            itemJson: myCredentialOffer.value.documentJson,
        })
    );

    console.log('insertItemResponse', insertItemResponse) 
}


/////////////////////////////
//  API
/////////////////////////////


// const request = {
//     templateId: "https://schema.trinsic.cloud/hopeful-robinson-zhmrdhqnfhaq/hack1",
//     include_governance: true,
//     valuesJson: JSON.stringify({
//         "name": "John Doe",
//         "email": "john.doe@example.com"
//     })
// };
// const response = await trinsic.credential().issueFromTemplate(request);

// console.log(response)


// const getItemResponse = await trinsic.wallet().getItem({
//     itemId: walletId,
// });
// console.log('getItemResponse', getItemResponse)

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'CiVodHRwczovL3RyaW5zaWMuaWQvc2VjdXJpdHkvdjEvb2Jlcm9uEmMKK3Vybjp0cmluc2ljOndhbGxldHM6elNrbUh4cTdRMld5UXBFeTZSbzF1algiNHVybjp0cmluc2ljOmVjb3N5c3RlbXM6aG9wZWZ1bC1yb2JpbnNvbi16aG1yZGhxbmZoYXEaMI0RIFLDofs8hGHqRN2h2mkFhI8tR5qIjzBV7S6gi9kW95jitwfYtHTvMTBXSVzBLCIA'
//   }
// };

// fetch('https://api.trinsic.id/wallet/v1/api/urn%3Atrinsic%3Awallets%3AzSkmHxq7Q2WyQpEy6Ro1ujX/connections', options)
// //   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));



//   const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'CiVodHRwczovL3RyaW5zaWMuaWQvc2VjdXJpdHkvdjEvb2Jlcm9uEmMKK3Vybjp0cmluc2ljOndhbGxldHM6elNrbUh4cTdRMld5UXBFeTZSbzF1algiNHVybjp0cmluc2ljOmVjb3N5c3RlbXM6aG9wZWZ1bC1yb2JpbnNvbi16aG1yZGhxbmZoYXEaMI0RIFLDofs8hGHqRN2h2mkFhI8tR5qIjzBV7S6gi9kW95jitwfYtHTvMTBXSVzBLCIA'
//   }
// };

// fetch('https://api.trinsic.id/wallet/v1/api/' + walletId + '/connections/connectionId', options)
// //   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

/////////////////////////////

const { $web5: web5, $myDID: myDID } = useNuxtApp();


let todoRecipient;


const codeForm = ref(false);

const showForm = ref(false);
const newTodo = ref({
    title: '',
    description: '',
    image: '',
    recipientDID: '',
});


const getTodoRecipient = () => {
    console.log('Running getTodoRecipient...', sharedList.author)
    if (myDID === sharedList.author) {
        return sharedList.recipient;
    } else {
        return sharedList.author;
    }
}

const sharedList = ref([]);

const previewImage = ref(null);
const photo = ref(null);

onBeforeMount(async () => {
    console.log("this is your DID", myDID);

    await configureProtocol();

    // Fetch shared todo lists.
    const { records } = await web5.dwn.records.query({
        message: {
            filter: {
                schema: protocolDefinition.types.list.schema,
            },
            dateSort: 'createdAscending'
        }
    });

    // console.log("Saved records", records);

    todoRecipient = await getTodoRecipient();

    // sharedList.value.splice(0) 

    // add entry to sharedList
    for (let record of records) {
        const data = await record.data.json();
        const list = { record, data, id: record.id };
        // console.log('data', data.image)
        // console.log('list', list.data.image)

        sharedList.value.push(list);
    }
    // console.log(sharedList.value.length) 

    // sharedList.value.forEach((element) => {
    //       console.log('element.data.image', element.data.image)
    // })

    initFlowbite();


    if (myauthToken.value !== "") {
        trinsic = new TrinsicService({ authToken: myauthToken.value });
    }

})

const createSharedList = async () => {
    let recipientDID = newTodo.value.recipientDID;

    console.log('photo.value', photo.value)
    const sharedListData = {
        "@type": "list",
        "title": newTodo.value.title,
        "description": newTodo.value.description,
        "image": previewImage.value,
        "author": myDID,
        "recipient": newTodo.value.recipientDID,
    }

    newTodo.value = { title: '', description: '', image: '', recipientDID: '' }

    try {
        const { record } = await web5.dwn.records.create({
            data: sharedListData,
            message: {
                protocol: protocolDefinition.protocol,
                protocolPath: 'list',
                schema: protocolDefinition.types.list.schema,
                dataFormat: protocolDefinition.types.list.dataFormats[0],
                recipient: recipientDID
            }
        });


        const data = await record.data.json();
        const list = { record, data, id: record.id };

        sharedList.value.push(list);
        showForm.value = false

        const { status: sendStatus } = await record.send(recipientDID);

        if (sendStatus.code !== 202) {
            console.log("Unable to send to target did:" + sendStatus);
            return;
        }
        else {
            console.log("Shared list sent to recipient");
        }
    } catch (e) {
        console.error(e);
        return;
    }
}

const copyDID = async () => {
    if (myDID) {
        await navigator.clipboard.writeText(myDID);
        alert('DID copied to clipboard');
    }
}

const configureProtocol = async () => {
    const { protocols, status } = await web5.dwn.protocols.query({
        message: {
            filter: {
                protocol: protocolDefinition.protocol,
            }
        }
    });

    if (status.code !== 200) {
        alert('Error querying protocols');
        console.error('Error querying protocols', status);
        return;
    }

    if (protocols.length > 0) {
        console.log('Protocol already exists');
        return;
    }

    // configure protocol on local DWN
    const { status: configureStatus, protocol } = await web5.dwn.protocols.configure({
        message: {
            definition: protocolDefinition,
        }
    });

    console.log('Protocol configured', configureStatus, protocol);

    // configuring protocol on remote DWN
    const { status: configureRemoteStatus } = protocol.send(myDID);
    console.log('Protocol configured on remote DWN', configureRemoteStatus);
}


async function toggleTodoComplete(todoItem) {
    let toggledTodo;
    let updatedTodoData;
    
    for (let todo of sharedList.value) {
        // console.log('todo', todo.id)
        // console.log('todoItem', todoItem.id)
        if (todoItem.id === todo.id) {
        
            toggledTodo = todo;
            todo.data.completed = !todo.data.completed;
            updatedTodoData = { ...toRaw(todo.data) };
            break;
        }
    }

    // Get record in DWN
    const { record } = await web5.dwn.records.read({
        message: {
            recordId: toggledTodo.id,
        }
    });

    // Update the record in DWN
    await record.update({ data: updatedTodoData });

    const { status: sendStatus } = await record.send(todoRecipient);

    if (sendStatus.code !== 202) {
        console.log("Unable to send updated data to target did:", sendStatus);
        return;
    }
    else {
        console.log("Sent todo update to recipient");
    }
}

const uploadImage = async (e) => {
    const image = e.target.files[0];
    console.log(image)

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
        previewImage.value = e.target.result;

        // console.log(previewImage.value);
        // console.log(e.target.result);

        photo.value = previewImage.value;
    };
}


</script>


<style scoped>
.btn {
    padding: 0.5rem 1rem;
    background-color: #3490dc;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary {
    padding: 0.5rem 1rem;
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary:hover {
    background-color: #aaa;
}

.btn:hover {
    background-color: #2779bd;
}
</style>
