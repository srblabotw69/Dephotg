<template>
    <!-- <div class="container mx-auto p-4 w-1/3"> -->
  
    <myHeader />
  
    <mySidebar />
  
    <div class="p-4 sm:ml-64 mt-14">
      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          id="default-tab"
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li class="me-2" role="presentation">
            <button
              id="connect-tab"
              class="inline-block p-4 border-b-2 rounded-t-lg"
              data-tabs-target="#connect"
              type="button"
              role="tab"
              aria-controls="connect"
              aria-selected="false"
            >
              Get Wallet
            </button>
          </li>
          <li class="me-2" role="presentation">
            <button
              id="profile-tab"
              class="inline-block p-4 border-b-2 rounded-t-lg"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Create Wallet
            </button>
          </li>
          <li class="me-2" role="presentation">
            <button
              id="settings-tab"
              class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              data-tabs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Authenticate
            </button>
          </li>
          <li class="me-2" role="presentation">
            <button
              id="dashboard-tab"
              class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Delete Wallet
            </button>
          </li>
          <li class="me-2" role="presentation">
            <button
              id="info-tab"
              class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              data-tabs-target="#info"
              type="button"
              role="tab"
              aria-controls="info"
              aria-selected="false"
            >
              Get Wallet Info
            </button>
          </li>
          <li class="me-2" role="presentation">
            <button
              id="search-tab"
              class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              data-tabs-target="#search"
              type="button"
              role="tab"
              aria-controls="search"
              aria-selected="false"
            >
              Search Wallet 
            </button>
          </li>
          <!-- 
          <li role="presentation">
              <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Contacts</button>
          </li> -->
        </ul>
      </div>
      <div id="default-tab-content">
        <div id="connect" class="hidden p-4 rounded-lg dark:bg-gray-800" role="tabpanel" aria-labelledby="connect-tab">
          <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Get Wallet</h1>
  
            <!-- Main modal -->
            <!-- <div id="authentication-modal"  class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> -->
            <!-- <div class="relative p-4 w-full max-w-md max-h-full"> -->
            <div class="relative p-4 max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                  <!-- <form class="space-y-4" action="#"> -->
                  <div class="space-y-4">
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <!-- <input
                        v-model="email1"
                        type="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      /> -->
  
                      <input
                        id="email2"
                        v-model="email2"
                        type="email"
                        name="email2"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
  
                    <!-- <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a> -->
                    <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?
                      <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="createWallet">
                        Create Wallet
                      </button>
                    </div> -->
  
                    <button class="btn" @click="getWalletFromExternalIdentity">Get Wallet From External Identity</button>
                    <br />
                    <button class="btn" @click="removeExternalIdentity">Remove External Identity Confirm</button>
                  </div>
                  <!-- </form> -->
                </div>
              </div>
            </div>
            <!-- </div>  -->
          </header>
        </div>
  
        <div id="profile" class="hidden p-4 rounded-lg dark:bg-gray-800" role="tabpanel" aria-labelledby="profile-tab">
          <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Create Wallet</h1>
  
            <!-- Main modal -->
            <!-- <div id="authentication-modal"  class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> -->
            <!-- <div class="relative p-4 w-full max-w-md max-h-full"> -->
            <div class="relative p-4 max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                  <!-- <form class="space-y-4" action="#"> -->
                  <div class="space-y-4">
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <!-- <input
                        v-model="email1"
                        type="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      /> -->
  
                      <input
                        id="email1"
                        v-model="email1"
                        type="email"
                        name="email1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
  
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?
                      <!-- <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a> -->
                      <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="createWallet">
                        Create Wallet
                      </button>
                    </div>
                  </div>
                  <!-- </form> -->
                </div>
              </div>
            </div>
            <!-- </div>  -->
          </header>
        </div>
  
        <div id="settings" class="hidden p-4 rounded-lg dark:bg-gray-800" role="tabpanel" aria-labelledby="settings-tab">
          <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Authenticate Wallet</h1>
  
            <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
              <!-- <template #item1> -->
              <!-- <v-card title="Step One" flat> -->
  
              <v-card title="Sign in" flat>
                <!-- Main modal -->
                <!-- <div id="authentication-modal"  class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> -->
                <!-- <div class="relative p-4 w-full max-w-md max-h-full"> -->
                <div class="relative p-4 max-h-full">
                  <!-- Modal content -->
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal body -->
                    <div class="p-4 md:p-5">
                      <!-- <form class="space-y-4" action="#"> -->
                      <div class="space-y-4">
                        <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Your email</label
                          >
  
                          <input
                            id="email"
                            v-model="email"
                            type="email"
                            name="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                            required
                          />
                        </div>
  
                        <!-- <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button> -->
                        <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="authenticateInit">
                          Authenticate
                        </button>
                        <!-- <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a> -->
                        <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Not registered?
                          <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="createWallet">
                            Create Wallet
                          </button>
                        </div> -->
                        <!-- </form> -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- </div>  -->
              </v-card>
              <!-- </template> -->
  
              <!-- <template #item.2> -->
              <!-- <v-card title="Step Two" flat> -->
              <v-card title="Enter Code" flat>
                <div class="mb-4">
                  <!-- <label for="title" class="block mb-2">Enter Code:</label> -->
                  <input id="code" v-model="code" type="text" class="mb-4 p-2 border rounded" required />
                  <p />
                  <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="authenticateConfirm">
                    Confirm code
                  </button>
                </div>
              </v-card>
              <!-- </template> -->
  
              <template #item3>
                <v-card title="Step Three" flat>
                  <br />
                  <br />
  
                  <button class="btn" @click="getWalletInfo">Get Wallet Info</button>
                  &nbsp;
                  <button class="btn" @click="searchWallet">Search Wallet Items</button>
  
                  <br />
                  <br />
                  <button class="btn" @click="addExternalIdentityInit">Add External Identity Init</button>
                  &nbsp;
                  <!-- <div class="mb-4">
  <label for="title" class="block mb-2">Email:</label>
  <input type="text" id="email" class="mb-4 p-2 border rounded" required />
  </div> -->
  
                  <br />
                  <div>
                    <label for="email2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Your External email</label
                    >
                    <input
                      id="email2"
                      v-model="email2"
                      type="email2"
                      name="email2"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
  
                  <br />
                  <button class="btn" @click="addExternalIdentityConfirm">Add External Identity Confirm</button>
                  &nbsp;
                  <div class="mb-4">
                    <label for="title" class="block mb-2">External Code:</label>
                    <input
                      id="externalCode"
                      v-model="externalCode"
                      type="text"
                      class="mb-4 p-2 border rounded"
                      required
                    />
                  </div>
                  <!-- <button class="btn" @click="removeExternalIdentity">Remove External Identity Confirm</button>
                  <br />
                  <br /> -->
  
                  <!-- <button class="btn" @click="getWalletFromExternalIdentity">Get Wallet From External Identity</button> -->
                </v-card>
              </template>
            </v-stepper>
          </header>
        </div>
  
        <div
          id="dashboard"
          class="hidden p-4 rounded-lg dark:bg-gray-800"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <!-- <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p> -->
  
          <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Delete Wallet</h1>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your wallet Id</label
              >
              <input
                id="walletId"
                type="text"
                name="walletId"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder=""
                required
              />
            </div>
            <br />
            <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="deleteWallet">
              Delete Wallet
            </button>
            <br />
          </header>
        </div>
  
        <div
          id="info"
          class="hidden p-4 rounded-lg dark:bg-gray-800"
          role="tabpanel"
          aria-labelledby="info-tab"
        >
          <!-- <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p> -->
  
          <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Get Wallet Info</h1>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your wallet Id</label
              >
              <input
                id="walletId"
                type="text"
                name="walletId"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder=""
                required
              />
            </div>
            <br />
            <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="deleteWallet">
              Delete Wallet
            </button>
            <br />
          </header>
        </div>
  
  
        <div id="info" class="hidden p-4 rounded-lg dark:bg-gray-800" role="tabpanel" aria-labelledby="info-tab">
          <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Create Wallet</h1>
  
            <!-- Main modal -->
            <!-- <div id="authentication-modal"  class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> -->
            <!-- <div class="relative p-4 w-full max-w-md max-h-full"> -->
            <div class="relative p-4 max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                  <!-- <form class="space-y-4" action="#"> -->
                  <div class="space-y-4">
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <!-- <input
                        v-model="email1"
                        type="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      /> -->
  
                      <input
                        id="email1"
                        v-model="email1"
                        type="email"
                        name="email1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
  
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?
                      <!-- <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a> -->
                      <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="createWallet">
                        Create Wallet
                      </button>
                    </div>
                  </div>
                  <!-- </form> -->
                </div>
              </div>
            </div>
            <!-- </div>  -->
          </header>
        </div>
  
  
  
        <div id="search" class="hidden p-4 rounded-lg dark:bg-gray-800" role="tabpanel" aria-labelledby="search-tab">
          <header class="flex-col text-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Search Wallet</h1>
  
            <!-- Main modal -->
            <!-- <div id="authentication-modal"  class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> -->
            <!-- <div class="relative p-4 w-full max-w-md max-h-full"> -->
            <div class="relative p-4 max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                  <!-- <form class="space-y-4" action="#"> -->
                  <div class="space-y-4">
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <!-- <input
                        v-model="email1"
                        type="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      /> -->
  
                      <input
                        id="email1"
                        v-model="email1"
                        type="email"
                        name="email1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
  
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?
                      <!-- <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a> -->
                      <button class="btn text-blue-700 hover:underline dark:text-blue-500" @click="createWallet">
                        Create Wallet
                      </button>
                    </div>
                  </div>
                  <!-- </form> -->
                </div>
              </div>
            </div>
            <!-- </div>  -->
          </header>
        </div>
  
  
  
        <!-- 
      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
          <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
      </div> -->
      </div>
  
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result</label>
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="result"
      ></textarea>
    </div>
  </template>
  

<script setup>
import { ref } from 'vue';
import protocolDefinition from "assets/shared-todo-protocol.json";
 
import myHeader from "../header.vue";
import mySidebar from "../sidebar.vue";
  
import { initFlowbite, Modal } from 'flowbite';
 

import {
    TrinsicService, IdentityProvider,
    CreateWalletRequest,
    GetWalletInfoRequest,
    GetWalletFromExternalIdentityRequest,
    AuthenticateInitRequest, AuthenticateConfirmRequest,
    AddExternalIdentityInitRequest, AddExternalIdentityConfirmRequest,
    RemoveExternalIdentityRequest,
    IssueFromTemplateRequest,
} from "@trinsic/trinsic";
 
 
const mywalletId = ref("")
const myecosystemId = ref("")
const myauthToken = ref("")


const myChallenge = ref("")
const myExternalChallenge = ref("")


 
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
 

const createWallet = async () => {
    console.log("Running createWallet...")
    console.log('email1:', email1.value)
    try {
        let getWalletInfoResponse = await trinsic.wallet().createWallet(
            CreateWalletRequest.fromPartial({
                ecosystemId: myecosystemId.value,
                description: "user123",
                identity: {
                    identity: email1.value,
                    provider: IdentityProvider.Email,
                },
  
            }),
        );
        console.log("walletId", getWalletInfoResponse.wallet.walletId)
        mywalletId.value = getWalletInfoResponse.wallet.walletId;
 
        console.log('getWalletInfoResponse', getWalletInfoResponse);
    } catch (e) {

        console.log(e)
    }

}
 

/////////////////////////////
// Delete Wallet
/////////////////////////////

const deleteWallet = async () => {
    console.log('Running deleteWallet...')
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    let items = await trinsic.wallet().deleteWallet({
        walletId: walletId.value,
    });
    console.log('items', items)
}


/////////////////////////////
// Add External Identity
/////////////////////////////

/////// AddExternalIdentityInit ///////

const addExternalIdentityInit = async () => {
    console.log("Running addExternalIdentityInit...")
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const addExternalIdentityInitResponse = await trinsic.wallet().addExternalIdentityInit(
        AddExternalIdentityInitRequest.fromPartial({
            identity: email.value,
            provider: IdentityProvider.Email,
        }),
    );
    trinsic.wallet().getMyInfo()
    myExternalChallenge.value = addExternalIdentityInitResponse.challenge

    console.log('addExternalIdentityInitResponse', addExternalIdentityInitResponse)
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
 }


/////////////////////////////
// Get Wallet
/////////////////////////////

/////// GetWalletInfo ///////

const getWalletInfo = async () => {
    console.log("Running getWalletInfo...")
    console.log("myauthToken.value ", myauthToken.value)

    console.log("walletId", mywalletId.value)

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const getWalletInfoResponse = await trinsic.wallet().getWalletInfo(
        GetWalletInfoRequest.fromPartial({
            walletId: mywalletId.value,
            // walletId: walletResponse.wallet.id, 
        }),
    );
    console.log('getWalletInfoResponse', getWalletInfoResponse)
 }



/////// GetWalletInfo ///////

const getMyInfo = async () => {
    console.log("Running getMyInfo...")
    console.log("myauthToken.value ", myauthToken.value)

    console.log("walletId", mywalletId.value)

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const getMyInfoResponse = await trinsic.wallet().GetMyInfo(
        GetMyInfoRequest.fromPartial({
            walletId: mywalletId.value, 
        }),
    );
    console.log('getMyInfo', getMyInfo)
 }

/////// GetWalletFromExternalIdentity ///////

const getWalletFromExternalIdentity = async () => {
    console.log("Running getWalletFromExternalIdentity...")
 
    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const getWalletFromExternalIdentityResponse = await trinsic.wallet().getWalletFromExternalIdentity(
        GetWalletFromExternalIdentityRequest.fromPartial({
            identity: {
                id: email2.value,
                provider: IdentityProvider.Email,
            }
        }),
    );
    console.log('getWalletFromExternalIdentityResponse', getWalletFromExternalIdentityResponse)
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
    console.log(email.value)

    trinsic = new TrinsicService({ authToken: myauthToken.value });
    const issueFromTemplateResponse = await trinsic.credential().issueFromTemplate(
        IssueFromTemplateRequest.fromPartial({
            templateId: "https://schema.trinsic.cloud/hopeful-robinson-zhmrdhqnfhaq/hack1",
            include_governance: true,
            valuesJson: JSON.stringify({
                "name": "John Doe",
                "email": "john.doe@example.com"
            })
        }),
    );

    console.log('issueFromTemplateResponse', issueFromTemplateResponse)
    // console.log(JSON.stringify(issueFromTemplateResponse))
}

 

/////////////////////////////

const { $web5: web5, $myDID: myDID } = useNuxtApp();
 

const showForm = ref(false);
const newTodo = ref({
    title: '',
    description: '',
    image: '',
    recipientDID: '',
});

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
